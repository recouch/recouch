#include <assert.h>
#include <node_api.h>
#include <stdio.h>
#include "cbl/CouchbaseLite.h"
#include "Listener.h"
#include "NapiConvert.h"
#include "util.h"

static void finalize_query_external(napi_env env, void *data, void *hint)
{
  external_query_ref *queryRef = (external_query_ref *)data;

  CBLQuery_Release(queryRef->query);
  free(data);
}

// CBLDatabase_CreateQuery
napi_value Database_CreateQuery(napi_env env, napi_callback_info info)
{
  size_t argc = 3;
  napi_value args[argc]; // [database, language, query] | [database, N1QL query] | [database, JSON object]

  CBLError err;
  external_database_ref *databaseRef;

  CHECK(napi_get_cb_info(env, info, &argc, args, NULL, NULL));
  CHECK(napi_get_value_external(env, args[0], (void *)&databaseRef));

  napi_valuetype args1Type;
  CHECK(napi_typeof(env, args[1], &args1Type));

  CBLQuery *query;

  if (args1Type == napi_string)
  {
    // Assume N1QL
    FLString queryString = napiValueToFLString(env, args[1]);

    query = CBLDatabase_CreateQuery(databaseRef->database, kCBLN1QLLanguage, queryString, NULL, &err);
  }
  else if (args1Type == napi_object)
  {
    // Assume JSON
    FLMutableArray jsonArray = napiValueToFLArray(env, args[1]);
    FLString queryString = FLSliceResult_AsSlice(FLValue_ToJSON((FLValue)jsonArray));
    FLMutableArray_Release(jsonArray);

    query = CBLDatabase_CreateQuery(databaseRef->database, kCBLJSONLanguage, queryString, NULL, &err);
  }
  else
  {
    // Use language passed in
    uint32_t language;
    CHECK(napi_get_value_uint32(env, args[1], &language));
    FLString queryString = napiValueToFLString(env, args[2]);

    query = CBLDatabase_CreateQuery(databaseRef->database, language, queryString, NULL, &err);
  }

  if (!query)
  {
    throwCBLError(env, err);
    return NULL;
  }

  external_query_ref *queryRef = createExternalQueryRef(query);
  napi_value res;
  CHECK(napi_create_external(env, queryRef, finalize_query_external, NULL, &res));

  return res;
}

FLMutableArray ResultSet_ToFLMutableArray(CBLResultSet *results)
{
  FLMutableArray resultsArray = FLMutableArray_New();

  while (CBLResultSet_Next(results))
  {
    FLDict result = CBLResultSet_ResultDict(results);
    FLMutableArray_AppendDict(resultsArray, result);
  }

  return resultsArray;
}

// CBLQuery_Execute
napi_value Query_Execute(napi_env env, napi_callback_info info)
{
  size_t argc = 1;
  napi_value args[argc];

  CBLError err;

  CHECK(napi_get_cb_info(env, info, &argc, args, NULL, NULL));

  external_query_ref *queryRef;
  CHECK(napi_get_value_external(env, args[0], (void *)&queryRef));
  CBLQuery *query = queryRef->query;

  CBLResultSet *results = CBLQuery_Execute(query, &err);

  if (!results)
  {
    throwCBLError(env, err);
    return NULL;
  }

  FLMutableArray resultsArray = ResultSet_ToFLMutableArray(results);
  CBLResultSet_Release(results);

  napi_value res = flArrayToNapiValue(env, resultsArray);
  FLMutableArray_Release(resultsArray);

  return res;
}

// CBLQuery_Explain
napi_value Query_Explain(napi_env env, napi_callback_info info)
{
  size_t argc = 1;
  napi_value args[argc];

  CHECK(napi_get_cb_info(env, info, &argc, args, NULL, NULL));

  external_query_ref *queryRef;
  CHECK(napi_get_value_external(env, args[0], (void *)&queryRef));
  CBLQuery *query = queryRef->query;

  napi_value res;
  FLSliceResult explanation = CBLQuery_Explain(query);
  CHECK(napi_create_string_utf8(env, explanation.buf, explanation.size, &res));

  return res;
}

// CBLQuery_Parameters
napi_value Query_Parameters(napi_env env, napi_callback_info info)
{
  size_t argc = 1;
  napi_value args[argc];

  CHECK(napi_get_cb_info(env, info, &argc, args, NULL, NULL));

  external_query_ref *queryRef;
  CHECK(napi_get_value_external(env, args[0], (void *)&queryRef));
  CBLQuery *query = queryRef->query;

  FLDict parameters = CBLQuery_Parameters(query);
  napi_value res = flDictToNapiValue(env, parameters);

  return res;
}

// CBLQuery_SetParameters
napi_value Query_SetParameters(napi_env env, napi_callback_info info)
{
  size_t argc = 2;
  napi_value args[argc];

  CHECK(napi_get_cb_info(env, info, &argc, args, NULL, NULL));

  external_query_ref *queryRef;
  CHECK(napi_get_value_external(env, args[0], (void *)&queryRef));
  CBLQuery *query = queryRef->query;

  FLDict parameters = napiValueToFLDict(env, args[1]);

  CBLQuery_SetParameters(query, parameters);

  napi_value res;
  CHECK(napi_get_undefined(env, &res));

  return res;
}

static void QueryChangeListener(void *cb, CBLQuery *query, CBLListenerToken *token)
{
  CBLError err;
  CBLResultSet *results = CBLQuery_CopyCurrentResults(query, token, &err);

  if (!results)
  {
    return;
  }

  FLMutableArray resultsArray = ResultSet_ToFLMutableArray(results);

  CBLResultSet_Release(results);

  CHECK(napi_acquire_threadsafe_function((napi_threadsafe_function)cb));
  CHECK(napi_call_threadsafe_function((napi_threadsafe_function)cb, (void *)resultsArray, napi_tsfn_nonblocking));
  CHECK(napi_release_threadsafe_function((napi_threadsafe_function)cb, napi_tsfn_release));
}

static void QueryChangeListenerCallJS(napi_env env, napi_value js_cb, void *context, void *data)
{
  napi_value undefined;
  CHECK(napi_get_undefined(env, &undefined));

  FLMutableArray resultsArray = (FLMutableArray)data;

  napi_value args[1];
  args[0] = flArrayToNapiValue(env, resultsArray);

  CHECK(napi_call_function(env, undefined, js_cb, 1, args, NULL));

  FLMutableArray_Release(resultsArray);
}

// CBLQuery_AddChangeListener
napi_value Query_AddChangeListener(napi_env env, napi_callback_info info)
{
  size_t argc = 2;
  napi_value args[argc];

  CHECK(napi_get_cb_info(env, info, &argc, args, NULL, NULL));

  external_query_ref *queryRef;
  CHECK(napi_get_value_external(env, args[0], (void *)&queryRef));
  CBLQuery *query = queryRef->query;

  napi_value async_resource_name;
  CHECK(napi_create_string_utf8(env,
                                "couchbase-lite query change listener",
                                NAPI_AUTO_LENGTH,
                                &async_resource_name));
  napi_threadsafe_function listenerCallback;
  CHECK(napi_create_threadsafe_function(env, args[1], NULL, async_resource_name, 0, 1, NULL, NULL, NULL, QueryChangeListenerCallJS, &listenerCallback));
  CHECK(napi_unref_threadsafe_function(env, listenerCallback));

  CBLListenerToken *token = CBLQuery_AddChangeListener(query, QueryChangeListener, listenerCallback);

  if (!token)
  {
    napi_throw_error(env, "", "Error adding change listener");
    CHECK(napi_release_threadsafe_function(listenerCallback, napi_tsfn_abort));
  }

  struct StopListenerData *stopListenerData = newStopListenerData(listenerCallback, token);
  napi_value stopListener;
  CHECK(napi_create_function(env, "stopQueryChangeListener", NAPI_AUTO_LENGTH, StopChangeListener, stopListenerData, &stopListener));

  return stopListener;
}

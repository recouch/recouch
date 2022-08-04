#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(CouchbaseLitePlugin, "CouchbaseLite",
//           () => Database
           CAP_PLUGIN_METHOD(openDatabase, CAPPluginReturnPromise);
           
//           (Database)
           CAP_PLUGIN_METHOD(closeDatabase, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(addDatabaseChangeListener, CAPPluginReturnCallback);
           CAP_PLUGIN_METHOD(beginTransaction, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(deleteDatabase, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(endTransaction, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(databaseName, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(databasePath, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(addDocumentChangeListener, CAPPluginReturnCallback);
           CAP_PLUGIN_METHOD(documentExists, CAPPluginReturnPromise);
           
//           (Database) => Document
           CAP_PLUGIN_METHOD(getDocument, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getMutableDocument, CAPPluginReturnPromise);
           
//          () => Document
           CAP_PLUGIN_METHOD(createDocument, CAPPluginReturnPromise);
           
//           (Database, Document)
          CAP_PLUGIN_METHOD(saveDocument, CAPPluginReturnPromise);
           
//           (Document)
           CAP_PLUGIN_METHOD(deleteDocument, CAPPluginReturnNone);

//           (Database) => Query
           CAP_PLUGIN_METHOD(createQuery, CAPPluginReturnPromise);
//           (Query)
           CAP_PLUGIN_METHOD(addQueryChangeListener, CAPPluginReturnCallback);
           CAP_PLUGIN_METHOD(executeQuery, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(explainQuery, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getQueryParameters, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setQueryParameters, CAPPluginReturnPromise);
           
//           () => Replicator
           CAP_PLUGIN_METHOD(createReplicator, CAPPluginReturnPromise);
//           (Replicator)
           CAP_PLUGIN_METHOD(addDocumentReplicationListener, CAPPluginReturnCallback);
           CAP_PLUGIN_METHOD(addReplicatorChangeListener, CAPPluginReturnCallback);
           CAP_PLUGIN_METHOD(removeReplicatorListener, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(documentsPendingReplication, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(isDocumentPendingReplication, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(replicatorConfiguration, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(replicatorStatus, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setHostReachable, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(startReplicator, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(stopReplicator, CAPPluginReturnPromise);
           
//          () => Blob
           CAP_PLUGIN_METHOD(createBlobWithData, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(createBlobWithStream, CAPPluginReturnPromise);
           
//           (Blob)
           CAP_PLUGIN_METHOD(blobProperties, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(databaseGetBlob, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(databaseSaveBlob, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(documentGetBlob, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(documentGetBlobProperties, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(documentIsBlob, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(documentSaveBlob, CAPPluginReturnPromise);
)

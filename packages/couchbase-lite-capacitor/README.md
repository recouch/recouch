# @recouch/couchbase-lite-capacitor

Couchbase Lite bindings for iOS and Android with Capacitor

## Install

```bash
npm install @recouch/couchbase-lite-capacitor
npx cap sync
```

## API

<docgen-index>

* [`openDatabase(...)`](#opendatabase)
* [`addDatabaseChangeListener(...)`](#adddatabasechangelistener)
* [`beginTransaction(...)`](#begintransaction)
* [`closeDatabase(...)`](#closedatabase)
* [`databaseName(...)`](#databasename)
* [`databasePath(...)`](#databasepath)
* [`deleteDatabase(...)`](#deletedatabase)
* [`deleteDatabase(...)`](#deletedatabase)
* [`endTransaction(...)`](#endtransaction)
* [`removeDatabaseChangeListener(...)`](#removedatabasechangelistener)
* [`addDocumentChangeListener(...)`](#adddocumentchangelistener)
* [`deleteDocument(...)`](#deletedocument)
* [`documentExists(...)`](#documentexists)
* [`getDocument(...)`](#getdocument)
* [`saveDocument(...)`](#savedocument)
* [`createQuery(...)`](#createquery)
* [`addQueryChangeListener(...)`](#addquerychangelistener)
* [`executeQuery(...)`](#executequery)
* [`explainQuery(...)`](#explainquery)
* [`getQueryParameters(...)`](#getqueryparameters)
* [`removeQueryChangeListener(...)`](#removequerychangelistener)
* [`setQueryParameters(...)`](#setqueryparameters)
* [`addDocumentReplicationListener(...)`](#adddocumentreplicationlistener)
* [`addReplicatorChangeListener(...)`](#addreplicatorchangelistener)
* [`createReplicator(...)`](#createreplicator)
* [`documentsPendingReplication(...)`](#documentspendingreplication)
* [`isDocumentPendingReplication(...)`](#isdocumentpendingreplication)
* [`removeReplicatorListener(...)`](#removereplicatorlistener)
* [`replicatorConfiguration(...)`](#replicatorconfiguration)
* [`replicatorStatus(...)`](#replicatorstatus)
* [`setHostReachable(...)`](#sethostreachable)
* [`startReplicator(...)`](#startreplicator)
* [`stopReplicator(...)`](#stopreplicator)
* [`blobProperties(...)`](#blobproperties)
* [`databaseGetBlob(...)`](#databasegetblob)
* [`databaseSaveBlob(...)`](#databasesaveblob)
* [`documentGetBlob(...)`](#documentgetblob)
* [`documentGetBlobProperties(...)`](#documentgetblobproperties)
* [`documentIsBlob(...)`](#documentisblob)
* [`documentSaveBlob(...)`](#documentsaveblob)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### openDatabase(...)

```typescript
openDatabase(options: { name: string; directory?: string; }) => Result<DatabaseRef>
```

| Param         | Type                                               |
| ------------- | -------------------------------------------------- |
| **`options`** | <code>{ name: string; directory?: string; }</code> |

**Returns:** <code><a href="#result">Result</a>&lt;<a href="#tagged">Tagged</a>&lt;'Database'&gt;&gt;</code>

--------------------


### addDatabaseChangeListener(...)

```typescript
addDatabaseChangeListener(options: DatabaseRefOptions, handler: DatabaseChangeListener) => Result<ListenerToken>
```

| Param         | Type                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#databaserefoptions">DatabaseRefOptions</a></code>         |
| **`handler`** | <code><a href="#databasechangelistener">DatabaseChangeListener</a></code> |

**Returns:** <code><a href="#result">Result</a>&lt;<a href="#tagged">Tagged</a>&lt;'<a href="#listenertoken">ListenerToken</a>'&gt;&gt;</code>

--------------------


### beginTransaction(...)

```typescript
beginTransaction(options: DatabaseRefOptions) => Result<void>
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#databaserefoptions">DatabaseRefOptions</a></code> |

**Returns:** <code><a href="#result">Result</a>&lt;void&gt;</code>

--------------------


### closeDatabase(...)

```typescript
closeDatabase(options: DatabaseRefOptions) => Result<void>
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#databaserefoptions">DatabaseRefOptions</a></code> |

**Returns:** <code><a href="#result">Result</a>&lt;void&gt;</code>

--------------------


### databaseName(...)

```typescript
databaseName(options: DatabaseRefOptions) => Result<string>
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#databaserefoptions">DatabaseRefOptions</a></code> |

**Returns:** <code><a href="#result">Result</a>&lt;string&gt;</code>

--------------------


### databasePath(...)

```typescript
databasePath(options: DatabaseRefOptions) => Result<string>
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#databaserefoptions">DatabaseRefOptions</a></code> |

**Returns:** <code><a href="#result">Result</a>&lt;string&gt;</code>

--------------------


### deleteDatabase(...)

```typescript
deleteDatabase(options: { name: string; directory: string; }) => Result<void>
```

| Param         | Type                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code>{ name: string; directory: string; }</code> |

**Returns:** <code><a href="#result">Result</a>&lt;void&gt;</code>

--------------------


### deleteDatabase(...)

```typescript
deleteDatabase(options: DatabaseRefOptions) => Result<void>
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#databaserefoptions">DatabaseRefOptions</a></code> |

**Returns:** <code><a href="#result">Result</a>&lt;void&gt;</code>

--------------------


### endTransaction(...)

```typescript
endTransaction(options: DatabaseRefOptions & { commit: boolean; }) => Result<void>
```

| Param         | Type                                                                                     |
| ------------- | ---------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#databaserefoptions">DatabaseRefOptions</a> & { commit: boolean; }</code> |

**Returns:** <code><a href="#result">Result</a>&lt;void&gt;</code>

--------------------


### removeDatabaseChangeListener(...)

```typescript
removeDatabaseChangeListener(options: { token: ListenerToken; }) => Result<void>
```

| Param         | Type                                                                                                      |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| **`options`** | <code>{ token: <a href="#tagged">Tagged</a>&lt;'<a href="#listenertoken">ListenerToken</a>'&gt;; }</code> |

**Returns:** <code><a href="#result">Result</a>&lt;void&gt;</code>

--------------------


### addDocumentChangeListener(...)

```typescript
addDocumentChangeListener(options: DatabaseRefOptions & { id: string; }, handler: DocumentChangeListener) => Result<ListenerToken>
```

| Param         | Type                                                                                |
| ------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#databaserefoptions">DatabaseRefOptions</a> & { id: string; }</code> |
| **`handler`** | <code><a href="#documentchangelistener">DocumentChangeListener</a></code>           |

**Returns:** <code><a href="#result">Result</a>&lt;<a href="#tagged">Tagged</a>&lt;'<a href="#listenertoken">ListenerToken</a>'&gt;&gt;</code>

--------------------


### deleteDocument(...)

```typescript
deleteDocument(options: DatabaseRefOptions & { id: string; }) => Result<void>
```

| Param         | Type                                                                                |
| ------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#databaserefoptions">DatabaseRefOptions</a> & { id: string; }</code> |

**Returns:** <code><a href="#result">Result</a>&lt;void&gt;</code>

--------------------


### documentExists(...)

```typescript
documentExists(options: DatabaseRefOptions & { id: string; }) => Result<boolean>
```

| Param         | Type                                                                                |
| ------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#databaserefoptions">DatabaseRefOptions</a> & { id: string; }</code> |

**Returns:** <code><a href="#result">Result</a>&lt;boolean&gt;</code>

--------------------


### getDocument(...)

```typescript
getDocument<T = object>(options: DatabaseRefOptions & { id: string; }) => Result<T | undefined>
```

| Param         | Type                                                                                |
| ------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#databaserefoptions">DatabaseRefOptions</a> & { id: string; }</code> |

**Returns:** <code><a href="#result">Result</a>&lt;T&gt;</code>

--------------------


### saveDocument(...)

```typescript
saveDocument<T = object>(options: DatabaseRefOptions & { id: string; value: T; }) => Result<void>
```

| Param         | Type                                                                                          |
| ------------- | --------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#databaserefoptions">DatabaseRefOptions</a> & { id: string; value: T; }</code> |

**Returns:** <code><a href="#result">Result</a>&lt;void&gt;</code>

--------------------


### createQuery(...)

```typescript
createQuery<T = unknown, P = Record<string, string>>(options: DatabaseRefOptions & { query: string; }) => Result<QueryRef<T, P>>
```

| Param         | Type                                                                                   |
| ------------- | -------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#databaserefoptions">DatabaseRefOptions</a> & { query: string; }</code> |

**Returns:** <code><a href="#result">Result</a>&lt;<a href="#queryref">QueryRef</a>&lt;T, P&gt;&gt;</code>

--------------------


### addQueryChangeListener(...)

```typescript
addQueryChangeListener<T = unknown, P = Record<string, string>>(options: QueryRefOptions<T, P>, handler: QueryChangeListener<T>) => Result<ListenerToken>
```

| Param         | Type                                                                         |
| ------------- | ---------------------------------------------------------------------------- |
| **`options`** | <code><a href="#queryrefoptions">QueryRefOptions</a>&lt;T, P&gt;</code>      |
| **`handler`** | <code><a href="#querychangelistener">QueryChangeListener</a>&lt;T&gt;</code> |

**Returns:** <code><a href="#result">Result</a>&lt;<a href="#tagged">Tagged</a>&lt;'<a href="#listenertoken">ListenerToken</a>'&gt;&gt;</code>

--------------------


### executeQuery(...)

```typescript
executeQuery<T = unknown, P = Record<string, string>>(options: QueryRefOptions<T, P>) => Result<T[]>
```

| Param         | Type                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#queryrefoptions">QueryRefOptions</a>&lt;T, P&gt;</code> |

**Returns:** <code><a href="#result">Result</a>&lt;T[]&gt;</code>

--------------------


### explainQuery(...)

```typescript
explainQuery<T = unknown, P = Record<string, string>>(options: QueryRefOptions<T, P>) => Result<string>
```

| Param         | Type                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#queryrefoptions">QueryRefOptions</a>&lt;T, P&gt;</code> |

**Returns:** <code><a href="#result">Result</a>&lt;string&gt;</code>

--------------------


### getQueryParameters(...)

```typescript
getQueryParameters<T = unknown, P = Record<string, string>>(options: QueryRefOptions<T, P>) => Result<Partial<P>>
```

| Param         | Type                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#queryrefoptions">QueryRefOptions</a>&lt;T, P&gt;</code> |

**Returns:** <code><a href="#result">Result</a>&lt;<a href="#partial">Partial</a>&lt;P&gt;&gt;</code>

--------------------


### removeQueryChangeListener(...)

```typescript
removeQueryChangeListener(options: { token: ListenerToken; }) => Result<void>
```

| Param         | Type                                                                                                      |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| **`options`** | <code>{ token: <a href="#tagged">Tagged</a>&lt;'<a href="#listenertoken">ListenerToken</a>'&gt;; }</code> |

**Returns:** <code><a href="#result">Result</a>&lt;void&gt;</code>

--------------------


### setQueryParameters(...)

```typescript
setQueryParameters<T = unknown, P = Record<string, string>>(options: QueryRefOptions<T, P> & { parameters: Partial<P>; }) => Result<void>
```

| Param         | Type                                                                                                                               |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#queryrefoptions">QueryRefOptions</a>&lt;T, P&gt; & { parameters: <a href="#partial">Partial</a>&lt;P&gt;; }</code> |

**Returns:** <code><a href="#result">Result</a>&lt;void&gt;</code>

--------------------


### addDocumentReplicationListener(...)

```typescript
addDocumentReplicationListener(options: ReplicatorRefOptions, handler: DocumentReplicationListener) => Result<ListenerToken>
```

| Param         | Type                                                                                |
| ------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#replicatorrefoptions">ReplicatorRefOptions</a></code>               |
| **`handler`** | <code><a href="#documentreplicationlistener">DocumentReplicationListener</a></code> |

**Returns:** <code><a href="#result">Result</a>&lt;<a href="#tagged">Tagged</a>&lt;'<a href="#listenertoken">ListenerToken</a>'&gt;&gt;</code>

--------------------


### addReplicatorChangeListener(...)

```typescript
addReplicatorChangeListener(options: ReplicatorRefOptions, handler: ReplicatorChangeListener) => Result<ListenerToken>
```

| Param         | Type                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#replicatorrefoptions">ReplicatorRefOptions</a></code>         |
| **`handler`** | <code><a href="#replicatorchangelistener">ReplicatorChangeListener</a></code> |

**Returns:** <code><a href="#result">Result</a>&lt;<a href="#tagged">Tagged</a>&lt;'<a href="#listenertoken">ListenerToken</a>'&gt;&gt;</code>

--------------------


### createReplicator(...)

```typescript
createReplicator(options: { config: ReplicatorConfiguration; }) => Result<ReplicatorRef>
```

| Param         | Type                                                                                     |
| ------------- | ---------------------------------------------------------------------------------------- |
| **`options`** | <code>{ config: <a href="#replicatorconfiguration">ReplicatorConfiguration</a>; }</code> |

**Returns:** <code><a href="#result">Result</a>&lt;<a href="#tagged">Tagged</a>&lt;'Replicator'&gt;&gt;</code>

--------------------


### documentsPendingReplication(...)

```typescript
documentsPendingReplication(options: ReplicatorRefOptions) => Result<string[]>
```

| Param         | Type                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#replicatorrefoptions">ReplicatorRefOptions</a></code> |

**Returns:** <code><a href="#result">Result</a>&lt;string[]&gt;</code>

--------------------


### isDocumentPendingReplication(...)

```typescript
isDocumentPendingReplication(options: ReplicatorRefOptions & { documentID: string; }) => Result<boolean>
```

| Param         | Type                                                                                            |
| ------------- | ----------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#replicatorrefoptions">ReplicatorRefOptions</a> & { documentID: string; }</code> |

**Returns:** <code><a href="#result">Result</a>&lt;boolean&gt;</code>

--------------------


### removeReplicatorListener(...)

```typescript
removeReplicatorListener(options: { token: ListenerToken; }) => Result<void>
```

| Param         | Type                                                                                                      |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| **`options`** | <code>{ token: <a href="#tagged">Tagged</a>&lt;'<a href="#listenertoken">ListenerToken</a>'&gt;; }</code> |

**Returns:** <code><a href="#result">Result</a>&lt;void&gt;</code>

--------------------


### replicatorConfiguration(...)

```typescript
replicatorConfiguration(options: ReplicatorRefOptions) => Result<ReplicatorConfiguration>
```

| Param         | Type                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#replicatorrefoptions">ReplicatorRefOptions</a></code> |

**Returns:** <code><a href="#result">Result</a>&lt;<a href="#replicatorconfiguration">ReplicatorConfiguration</a>&gt;</code>

--------------------


### replicatorStatus(...)

```typescript
replicatorStatus(options: ReplicatorRefOptions) => Result<ReplicatorStatus>
```

| Param         | Type                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#replicatorrefoptions">ReplicatorRefOptions</a></code> |

**Returns:** <code><a href="#result">Result</a>&lt;<a href="#replicatorstatus">ReplicatorStatus</a>&gt;</code>

--------------------


### setHostReachable(...)

```typescript
setHostReachable(options: ReplicatorRefOptions & { reachable: boolean; }) => Result<void>
```

| Param         | Type                                                                                            |
| ------------- | ----------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#replicatorrefoptions">ReplicatorRefOptions</a> & { reachable: boolean; }</code> |

**Returns:** <code><a href="#result">Result</a>&lt;void&gt;</code>

--------------------


### startReplicator(...)

```typescript
startReplicator(options: ReplicatorRefOptions & { resetCheckpoint?: boolean; }) => Result<void>
```

| Param         | Type                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| **`options`** | <code><a href="#replicatorrefoptions">ReplicatorRefOptions</a> & { resetCheckpoint?: boolean; }</code> |

**Returns:** <code><a href="#result">Result</a>&lt;void&gt;</code>

--------------------


### stopReplicator(...)

```typescript
stopReplicator(options: ReplicatorRefOptions) => Result<void>
```

| Param         | Type                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#replicatorrefoptions">ReplicatorRefOptions</a></code> |

**Returns:** <code><a href="#result">Result</a>&lt;void&gt;</code>

--------------------


### blobProperties(...)

```typescript
blobProperties(options: BlobOptions) => Result<BlobMetadata>
```

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#bloboptions">BlobOptions</a></code> |

**Returns:** <code><a href="#result">Result</a>&lt;<a href="#blobmetadata">BlobMetadata</a>&gt;</code>

--------------------


### databaseGetBlob(...)

```typescript
databaseGetBlob(options: { database: DatabaseRef; properties: BlobMetadata; }) => Result<string>
```

| Param         | Type                                                                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code>{ database: <a href="#tagged">Tagged</a>&lt;'Database'&gt;; properties: <a href="#blobmetadata">BlobMetadata</a>; }</code> |

**Returns:** <code><a href="#result">Result</a>&lt;string&gt;</code>

--------------------


### databaseSaveBlob(...)

```typescript
databaseSaveBlob(options: BlobOptions & { database: DatabaseRef; }) => Result<void>
```

| Param         | Type                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#bloboptions">BlobOptions</a> & { database: <a href="#tagged">Tagged</a>&lt;'Database'&gt;; }</code> |

**Returns:** <code><a href="#result">Result</a>&lt;void&gt;</code>

--------------------


### documentGetBlob(...)

```typescript
documentGetBlob(options: DatabaseRefOptions & { id: string; property: string; }) => Result<string>
```

| Param         | Type                                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#databaserefoptions">DatabaseRefOptions</a> & { id: string; property: string; }</code> |

**Returns:** <code><a href="#result">Result</a>&lt;string&gt;</code>

--------------------


### documentGetBlobProperties(...)

```typescript
documentGetBlobProperties(options: DatabaseRefOptions & { id: string; property: string; }) => Result<BlobMetadata>
```

| Param         | Type                                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#databaserefoptions">DatabaseRefOptions</a> & { id: string; property: string; }</code> |

**Returns:** <code><a href="#result">Result</a>&lt;<a href="#blobmetadata">BlobMetadata</a>&gt;</code>

--------------------


### documentIsBlob(...)

```typescript
documentIsBlob(options: DatabaseRefOptions & { id: string; property: string; }) => Result<boolean>
```

| Param         | Type                                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#databaserefoptions">DatabaseRefOptions</a> & { id: string; property: string; }</code> |

**Returns:** <code><a href="#result">Result</a>&lt;boolean&gt;</code>

--------------------


### documentSaveBlob(...)

```typescript
documentSaveBlob(options: DatabaseRefOptions & BlobOptions & { id: string; property: string; }) => Result<void>
```

| Param         | Type                                                                                                                                           |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#databaserefoptions">DatabaseRefOptions</a> & <a href="#bloboptions">BlobOptions</a> & { id: string; property: string; }</code> |

**Returns:** <code><a href="#result">Result</a>&lt;void&gt;</code>

--------------------


### Interfaces


#### DatabaseRefOptions

| Prop           | Type                                                |
| -------------- | --------------------------------------------------- |
| **`database`** | <code><a href="#databaseref">DatabaseRef</a></code> |


#### QueryRefOptions

| Prop        | Type                                                      |
| ----------- | --------------------------------------------------------- |
| **`query`** | <code><a href="#queryref">QueryRef</a>&lt;T, P&gt;</code> |


#### ReplicatorRefOptions

| Prop             | Type                                                    |
| ---------------- | ------------------------------------------------------- |
| **`replicator`** | <code><a href="#replicatorref">ReplicatorRef</a></code> |


#### ReplicatorStatus

| Prop           | Type                                                                    |
| -------------- | ----------------------------------------------------------------------- |
| **`activity`** | <code>'stopped' \| 'offline' \| 'connecting' \| 'idle' \| 'busy'</code> |
| **`error`**    | <code>string</code>                                                     |
| **`progress`** | <code>{ complete: number; documentCount: number; }</code>               |


#### ReplicatorConfiguration

| Prop                     | Type                                                                                                                   |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| **`database`**           | <code><a href="#databaseref">DatabaseRef</a></code>                                                                    |
| **`endpoint`**           | <code>string \| <a href="#tagged">Tagged</a>&lt;'Database'&gt;</code>                                                  |
| **`replicatorType`**     | <code><a href="#replicatortype">ReplicatorType</a></code>                                                              |
| **`continuous`**         | <code>boolean</code>                                                                                                   |
| **`disableAutoPurge`**   | <code>boolean</code>                                                                                                   |
| **`maxAttempts`**        | <code>number</code>                                                                                                    |
| **`maxAttemptWaitTime`** | <code>number</code>                                                                                                    |
| **`heartbeat`**          | <code>number</code>                                                                                                    |
| **`conflictResolver`**   | <code>((document: { documentID: string; localDocument: object; remoteDocument: object; }) =&gt; void)</code>           |
| **`pushFilter`**         | <code>((document: { documentID: string; value: object; accessRemoved: boolean; deleted: boolean; }) =&gt; void)</code> |
| **`pullFilter`**         | <code>((document: { documentID: string; value: object; accessRemoved: boolean; deleted: boolean; }) =&gt; void)</code> |


#### BlobMetadata

| Prop               | Type                |
| ------------------ | ------------------- |
| **`'@type'`**      | <code>'blob'</code> |
| **`content_type`** | <code>string</code> |
| **`digest`**       | <code>string</code> |
| **`length`**       | <code>number</code> |


#### BlobOptions

| Prop       | Type                                              |
| ---------- | ------------------------------------------------- |
| **`blob`** | <code><a href="#blobconfig">BlobConfig</a></code> |


### Type Aliases


#### Result

<code>Promise&lt;T extends void ? void : { value: T }&gt;</code>


#### DatabaseRef

<code><a href="#opaque">Opaque</a>&lt;unknown, 'Database'&gt;</code>


#### Opaque

Create an opaque type, which hides its internal details from the public, and can only be created by being used explicitly.

The generic type parameter can be anything. It doesn't have to be an object.

[Read more about opaque types.](https://codemix.com/opaque-types-in-javascript/)

There have been several discussions about adding this feature to TypeScript via the `opaque type` operator, similar to how Flow does it. Unfortunately, nothing has (yet) moved forward:
- [Microsoft/TypeScript#202](https://github.com/microsoft/TypeScript/issues/202)
- [Microsoft/TypeScript#15408](https://github.com/Microsoft/TypeScript/issues/15408)
- [Microsoft/TypeScript#15807](https://github.com/Microsoft/TypeScript/issues/15807)

<code>Type & <a href="#tagged">Tagged</a>&lt;Token&gt;</code>


#### Tagged

<code>{ 	readonly [tag]: Token; }</code>


#### DatabaseChangeListener

<code>(docIDs: string[]): void</code>


#### ListenerToken

<code><a href="#opaque">Opaque</a>&lt;unknown, '<a href="#listenertoken">ListenerToken</a>'&gt;</code>


#### DocumentChangeListener

<code>(docID: string): void</code>


#### QueryRef

<code><a href="#opaque">Opaque</a>&lt;{ readonly [resultType]: <a href="#result">Result</a>; readonly [parametersType]: <a href="#parameters">Parameters</a>; }, 'Query'&gt;</code>


#### Parameters

Obtain the parameters of a function type in a tuple

<code>T extends (...args: infer P) =&gt; any ? P : never</code>


#### Record

Construct a type with a set of properties K of type T

<code>{ [P in K]: T; }</code>


#### QueryChangeListener

<code>(results: T[]): void</code>


#### Partial

Make all properties in T optional

<code>{ [P in keyof T]?: T[P]; }</code>


#### ReplicatorRef

<code><a href="#opaque">Opaque</a>&lt;unknown, 'Replicator'&gt;</code>


#### DocumentReplicationListener

<code>(direction: "push" | "pull", documents: ReplicatedDocInfo[]): void</code>


#### ReplicatedDocInfo

<code>{ id: string; accessRemoved: boolean; deleted: boolean; error?: string; }</code>


#### ReplicatorChangeListener

<code>(status: <a href="#replicatorstatus">ReplicatorStatus</a>): void</code>


#### ReplicatorType

<code>'pushAndPull' | 'push' | 'pull'</code>


#### BlobConfig

<code>{ data: Buffer; contentType?: string; }</code>

</docgen-api>

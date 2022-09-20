import type { CouchbaseLiteAdapter } from '@recouch/core'

import { blobProperties, databaseGetBlob, databaseSaveBlob, documentGetBlob, documentGetBlobProperties, documentIsBlob, documentSaveBlob } from './functions/blob'
import { addDatabaseChangeListener, beginTransaction, closeDatabase, databaseName, databasePath, deleteDatabase, endTransaction, openDatabase } from './functions/database'
import { addDocumentChangeListener, documentExists, getDocument, saveDocument } from './functions/document'
import { addQueryChangeListener, createQuery, executeQuery, setQueryParameters } from './functions/query'
import { addDocumentReplicationListener, addReplicatorChangeListener, createReplicator, startReplicator, stopReplicator } from './functions/replicator'

export const adapter: CouchbaseLiteAdapter = {
  addDatabaseChangeListener,
  beginTransaction,
  closeDatabase,
  deleteDatabase,
  endTransaction,
  openDatabase,
  databaseName,
  databasePath,

  addDocumentChangeListener,
  deleteDocument: async () => { throw new Error('unimplemented') },
  getDocument,
  documentExists,
  getRevisionID: async () => { throw new Error('unimplemented') },
  saveDocument,

  createQuery,
  addQueryChangeListener,
  executeQuery,
  explainQuery: async () => { throw new Error('unimplemented') },
  getQueryParameters: async () => { throw new Error('unimplemented') },
  setQueryParameters,

  addDocumentReplicationListener,
  addReplicatorChangeListener,
  createReplicator,
  documentsPendingReplication: async () => { throw new Error('unimplemented') },
  isDocumentPendingReplication: async () => { throw new Error('unimplemented') },
  replicatorConfiguration: async () => { throw new Error('unimplemented') },
  replicatorStatus: async () => { throw new Error('unimplemented') },
  setHostReachable: async () => { throw new Error('unimplemented') },
  startReplicator,
  stopReplicator,

  blobProperties,
  databaseGetBlob,
  databaseSaveBlob,
  documentGetBlob,
  documentGetBlobProperties,
  documentIsBlob,
  documentSaveBlob
}

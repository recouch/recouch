import type { CouchbaseLiteAdapter } from '@recouch/core'

import { addDatabaseChangeListener, beginTransaction, closeDatabase, databaseName, databasePath, deleteDatabase, endTransaction, openDatabase } from './functions/database'
import { getDocument, saveDocument } from './functions/document'

export const adapter: CouchbaseLiteAdapter = {
  addDatabaseChangeListener,
  beginTransaction,
  closeDatabase,
  deleteDatabase,
  endTransaction,
  openDatabase,
  databaseName,
  databasePath,

  addDocumentChangeListener: async () => { throw new Error('unimplemented') },
  deleteDocument: async () => { throw new Error('unimplemented') },
  getDocument,
  documentExists: async () => { throw new Error('unimplemented') },
  getRevisionID: async () => { throw new Error('unimplemented') },
  saveDocument,

  setQueryParameters: async () => { throw new Error('unimplemented') },
  createQuery: async () => { throw new Error('unimplemented') },
  addQueryChangeListener: async () => { throw new Error('unimplemented') },
  executeQuery: async () => { throw new Error('unimplemented') },
  explainQuery: async () => { throw new Error('unimplemented') },
  getQueryParameters: async () => { throw new Error('unimplemented') },

  addDocumentReplicationListener: async () => { throw new Error('unimplemented') },
  addReplicatorChangeListener: async () => { throw new Error('unimplemented') },
  createReplicator: async () => { throw new Error('unimplemented') },
  documentsPendingReplication: async () => { throw new Error('unimplemented') },
  isDocumentPendingReplication: async () => { throw new Error('unimplemented') },
  replicatorConfiguration: async () => { throw new Error('unimplemented') },
  replicatorStatus: async () => { throw new Error('unimplemented') },
  setHostReachable: async () => { throw new Error('unimplemented') },
  startReplicator: async () => { throw new Error('unimplemented') },
  stopReplicator: async () => { throw new Error('unimplemented') },
  blobProperties: async () => { throw new Error('unimplemented') },
  databaseGetBlob: async () => { throw new Error('unimplemented') },
  databaseSaveBlob: async () => { throw new Error('unimplemented') },
  documentGetBlob: async () => { throw new Error('unimplemented') },
  documentGetBlobProperties: async () => { throw new Error('unimplemented') },
  documentIsBlob: async () => { throw new Error('unimplemented') },
  documentSetBlob: async () => { throw new Error('unimplemented') }
}

import { AdapterDeleteDatabase, DatabaseConfig, DatabaseRef, AdapterAddQueryChangeListener, AdapterCreateQuery, AdapterExecuteQuery, BlobConfig, CouchbaseLiteAdapter } from '@recouch/core'
import { Asyncify } from 'type-fest'
import cblite from '../cblite'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const asyncify = <F extends (...args: any[]) => any>(f: F) =>
  ((...args) => Promise.resolve(f(...args))) as Asyncify<F>

export const adapter: CouchbaseLiteAdapter = {
  addDatabaseChangeListener: asyncify(cblite.addDatabaseChangeListener),
  addDocumentReplicationListener: asyncify(cblite.addDocumentReplicationListener),
  beginTransaction: asyncify(cblite.beginTransaction),
  closeDatabase: asyncify(cblite.closeDatabase),
  deleteDatabase: asyncify(cblite.deleteDatabase) as AdapterDeleteDatabase,
  endTransaction: asyncify(cblite.endTransaction),
  openDatabase: async (config: DatabaseConfig) => cblite.openDatabase(config.name, config.directory),
  databaseName: asyncify(cblite.databaseName),
  databasePath: asyncify(cblite.databasePath),

  addDocumentChangeListener: asyncify(cblite.addDocumentChangeListener),
  deleteDocument: async (db: DatabaseRef, id: string) => {
    const docRef = cblite.getDocument(db, id)
    docRef && cblite.deleteDocument(db, docRef)
  },
  getDocument: async <T = object>(db: DatabaseRef, id: string) => {
    const docRef = cblite.getDocument<T>(db, id)
    return docRef ? cblite.getDocumentProperties(docRef) : undefined
  },
  documentExists: async (db: DatabaseRef, id: string) =>
    !!cblite.getDocument(db, id),
  getRevisionID: async () => {
    throw new Error('unimplemented')
  },
  saveDocument: async <T = object>(db: DatabaseRef, id: string, value: T) => {
    const docRef = cblite.getMutableDocument<T>(db, id) ?? cblite.createDocument<T>(id)

    cblite.setDocumentProperties(docRef, value)
    cblite.saveDocument(db, docRef)
  },

  setQueryParameters: asyncify(cblite.setQueryParameters),
  createQuery: asyncify(cblite.createQuery) as AdapterCreateQuery,
  addQueryChangeListener: asyncify(cblite.addQueryChangeListener) as AdapterAddQueryChangeListener,
  executeQuery: asyncify(cblite.executeQuery) as AdapterExecuteQuery,
  explainQuery: asyncify(cblite.explainQuery),
  getQueryParameters: asyncify(cblite.getQueryParameters),
  addReplicatorChangeListener: asyncify(cblite.addReplicatorChangeListener),
  createReplicator: asyncify(cblite.createReplicator),
  documentsPendingReplication: asyncify(cblite.documentsPendingReplication),
  isDocumentPendingReplication: asyncify(cblite.isDocumentPendingReplication),
  replicatorConfiguration: asyncify(cblite.replicatorConfiguration),
  replicatorStatus: asyncify(cblite.replicatorStatus),
  setHostReachable: asyncify(cblite.setHostReachable),
  startReplicator: asyncify(cblite.startReplicator),
  stopReplicator: asyncify(cblite.stopReplicator),
  blobProperties: async () => {
    throw new Error('unimplemented')
  },
  databaseGetBlob: async () => {
    throw new Error('unimplemented')
  },
  databaseSaveBlob: async () => {
    throw new Error('unimplemented')
  },
  documentGetBlob: async (db: DatabaseRef, id: string, property: string) => {
    const docRef = cblite.getDocument(db, id)

    if (!docRef) throw new Error('Document does not exist')

    const blob = cblite.documentGetBlob(docRef, property)

    return cblite.blobContent(blob)
  },
  documentGetBlobProperties: async (db: DatabaseRef, id: string, property: string) => {
    const docRef = cblite.getDocument(db, id)

    if (!docRef) throw new Error('Document does not exist')

    const blob = cblite.documentGetBlob(docRef, property)

    return cblite.blobProperties(blob)
  },
  documentIsBlob: async (db: DatabaseRef, id: string, property: string) => {
    const docRef = cblite.getDocument(db, id)

    return docRef ? cblite.documentIsBlob(docRef, property) : false
  },
  documentSaveBlob: async (db: DatabaseRef, id: string, property: string, blob: BlobConfig) => {
    const docRef = cblite.getMutableDocument(db, id)

    if (!docRef) throw new Error('Document does not exist')

    const blobRef = cblite.createBlobWithData(blob.contentType ?? '', blob.data)

    cblite.documentSetBlob(docRef, property, blobRef)

    return cblite.saveDocument(db, docRef)
  }
}

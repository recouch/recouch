import { AdapterBlobProperties, AdapterDatabaseGetBlob, AdapterDatabaseSaveBlob, AdapterDocumentGetBlob, AdapterDocumentGetBlobProperties, AdapterDocumentIsBlob, AdapterDocumentSaveBlob, AdapterAddDatabaseChangeListener, AdapterBeginTransaction, AdapterCloseDatabase, AdapterDatabaseName, AdapterDatabasePath, AdapterDeleteDatabase, AdapterEndTransaction, AdapterAddDocumentChangeListener, AdapterDeleteDocument, AdapterGetDocument, AdapterDocumentExists, AdapterGetRevisionID, AdapterSaveDocument, AdapterCreateQuery, AdapterAddQueryChangeListener, AdapterExecuteQuery, AdapterExplainQuery, AdapterGetQueryParameters, AdapterSetQueryParameters, AdapterAddDocumentReplicationListener, AdapterAddReplicatorChangeListener, AdapterCreateReplicator, AdapterDocumentsPendingReplication, AdapterIsDocumentPendingReplication, AdapterSetHostReachable, AdapterStartReplicator, AdapterStopReplicator, AdapterOpenDatabase, AdapterGetReplicatorConfiguration, AdapterGetReplicatorStatus } from './adapterFunctions'

export interface CouchbaseLiteAdapter {
  // Blob
  blobProperties: AdapterBlobProperties
  databaseGetBlob: AdapterDatabaseGetBlob
  databaseSaveBlob: AdapterDatabaseSaveBlob
  documentGetBlob: AdapterDocumentGetBlob
  documentGetBlobProperties: AdapterDocumentGetBlobProperties
  documentIsBlob: AdapterDocumentIsBlob
  documentSaveBlob: AdapterDocumentSaveBlob

  // Database
  addDatabaseChangeListener: AdapterAddDatabaseChangeListener
  beginTransaction: AdapterBeginTransaction
  closeDatabase: AdapterCloseDatabase
  databaseName: AdapterDatabaseName
  databasePath: AdapterDatabasePath
  deleteDatabase: AdapterDeleteDatabase
  endTransaction: AdapterEndTransaction
  openDatabase: AdapterOpenDatabase

  // Document
  addDocumentChangeListener: AdapterAddDocumentChangeListener
  deleteDocument: AdapterDeleteDocument
  getDocument: AdapterGetDocument
  documentExists: AdapterDocumentExists
  getRevisionID: AdapterGetRevisionID
  saveDocument: AdapterSaveDocument

  // Query
  createQuery: AdapterCreateQuery
  addQueryChangeListener: AdapterAddQueryChangeListener
  executeQuery: AdapterExecuteQuery
  explainQuery: AdapterExplainQuery
  getQueryParameters: AdapterGetQueryParameters
  setQueryParameters: AdapterSetQueryParameters

  // Replicator
  addDocumentReplicationListener: AdapterAddDocumentReplicationListener
  addReplicatorChangeListener: AdapterAddReplicatorChangeListener
  createReplicator: AdapterCreateReplicator
  documentsPendingReplication: AdapterDocumentsPendingReplication
  isDocumentPendingReplication: AdapterIsDocumentPendingReplication
  replicatorConfiguration: AdapterGetReplicatorConfiguration
  replicatorStatus: AdapterGetReplicatorStatus
  setHostReachable: AdapterSetHostReachable
  startReplicator: AdapterStartReplicator
  stopReplicator: AdapterStopReplicator
}

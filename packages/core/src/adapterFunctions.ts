import { DatabaseRef, QueryRef, ReplicatorRef } from './ref'

export interface DatabaseConfig {
  directory?: string
  encryptionKey?: unknown // not implemented
  name: string,
}

export type BlobConfig = {
  data: Buffer
  contentType?: string
}

export interface BlobMetadata {
  '@type': 'blob'
  content_type?: string
  digest: string
  length: number
}

export type ReplicatedDocInfo = {
  id: string
  accessRemoved: boolean
  deleted: boolean
  error?: string
}
export type ReplicatorType = 'pushAndPull' | 'push' | 'pull'
export interface ReplicatorConfiguration {
  database: DatabaseRef
  endpoint: DatabaseRef | string
  replicatorType?: ReplicatorType
  continuous?: boolean
  disableAutoPurge?: boolean
  maxAttempts?: number
  maxAttemptWaitTime?: number
  heartbeat?: number,
  conflictResolver?: (document: { documentID: string; localDocument: object; remoteDocument: object }) => void
  pushFilter?: (document: { documentID: string; value: object; accessRemoved: boolean; deleted: boolean }) => void
  pullFilter?: (document: { documentID: string; value: object; accessRemoved: boolean; deleted: boolean }) => void
}
export interface ReplicatorStatus {
  activity: 'stopped' | 'offline' | 'connecting' | 'idle' | 'busy'
  error: string
  progress: {
    complete: number
    documentCount: number
  }
}

export type DatabaseChangeListener = (docIDs: string[]) => void
export type DocumentChangeListener = (docID: string) => void
export type DocumentReplicationListener = (direction: 'push' | 'pull', documents: ReplicatedDocInfo[]) => void
export type QueryChangeListener<T> = (results: T[]) => void
export type ReplicatorChangeListener = (status: ReplicatorStatus) => void
export type RemoveDatabaseChangeListener = () => void
export type RemoveDocumentChangeListener = () => void
export type RemoveQueryChangeListener = () => void
export type RemoveDocumentReplicationListener = () => void
export type RemoveReplicatorChangeListener = () => void

export type AdapterAddDatabaseChangeListener = (database: DatabaseRef, handler: DatabaseChangeListener) => Promise<RemoveDatabaseChangeListener>
export type AdapterBeginTransaction = (database: DatabaseRef) => Promise<void>
export type AdapterCloseDatabase = (database: DatabaseRef) => Promise<void>
export type AdapterDatabaseName = (database: DatabaseRef) => Promise<string>
export type AdapterDatabasePath = (database: DatabaseRef) => Promise<string>
export type AdapterDeleteDatabase = ((name: string, directory: string) => Promise<void>) & ((database: DatabaseRef) => Promise<void>)
export type AdapterEndTransaction = (database: DatabaseRef, commit: boolean) => Promise<void>
export type AdapterOpenDatabase = (config: DatabaseConfig) => Promise<DatabaseRef>

export type AdapterAddDocumentChangeListener = (database: DatabaseRef, id: string, handler: DocumentChangeListener) => Promise<RemoveDocumentChangeListener>
export type AdapterDeleteDocument = (database: DatabaseRef, id: string) => Promise<void>
export type AdapterDocumentExists = (database: DatabaseRef, id: string) => Promise<boolean>
export type AdapterGetDocument = <T = object>(database: DatabaseRef, id: string) => Promise<T | undefined>
export type AdapterGetRevisionID = (database: DatabaseRef, id: string) => Promise<string | undefined>
export type AdapterSaveDocument = <T = object>(database: DatabaseRef, id: string, value: T) => Promise<void>

export type AdapterCreateQuery = <T = unknown, P = Record<string, string>>(database: DatabaseRef, query: string) => Promise<QueryRef<T, P>>
export type AdapterAddQueryChangeListener = <T = unknown, P = Record<string, string>>(query: QueryRef<T, P>, handler: QueryChangeListener<T>) => Promise<RemoveQueryChangeListener>
export type AdapterExecuteQuery = <T = unknown, P = Record<string, string>>(query: QueryRef<T, P>) => Promise<T[]>
export type AdapterExplainQuery = <T = unknown, P = Record<string, string>>(query: QueryRef<T, P>) => Promise<string>
export type AdapterGetQueryParameters = <T = unknown, P = Record<string, string>>(query: QueryRef<T, P>) => Promise<Partial<P>>
export type AdapterSetQueryParameters = <T = unknown, P = Record<string, string>>(query: QueryRef<T, P>, parametersJSON: Partial<P>) => Promise<void>

export type AdapterAddDocumentReplicationListener = (replicator: ReplicatorRef, handler: DocumentReplicationListener) => Promise<RemoveDocumentReplicationListener>
export type AdapterAddReplicatorChangeListener = (replicator: ReplicatorRef, handler: ReplicatorChangeListener) => Promise<RemoveReplicatorChangeListener>
export type AdapterCreateReplicator = (config: ReplicatorConfiguration) => Promise<ReplicatorRef>
export type AdapterDocumentsPendingReplication = (replicator: ReplicatorRef) => Promise<string[]>
export type AdapterIsDocumentPendingReplication = (replicator: ReplicatorRef, documentID: string) => Promise<boolean>
export type AdapterGetReplicatorConfiguration = (replicator: ReplicatorRef) => Promise<ReplicatorConfiguration>
export type AdapterGetReplicatorStatus = (replicator: ReplicatorRef) => Promise<ReplicatorStatus>
export type AdapterSetHostReachable = (replicator: ReplicatorRef, reachable: boolean) => Promise<void>
export type AdapterStartReplicator = (replicator: ReplicatorRef, resetCheckpoint?: boolean) => Promise<void>
export type AdapterStopReplicator = (replicator: ReplicatorRef) => Promise<void>

export type AdapterBlobProperties = (blob: BlobConfig) => Promise<BlobMetadata>
export type AdapterDatabaseGetBlob = (database: DatabaseRef, properties: BlobMetadata) => Promise<Buffer>
export type AdapterDatabaseSaveBlob = (database: DatabaseRef, blob: BlobConfig) => Promise<void>
export type AdapterDocumentGetBlob = (database: DatabaseRef, id: string, property: string) => Promise<Buffer>
export type AdapterDocumentGetBlobProperties = (database: DatabaseRef, id: string, property: string) => Promise<BlobMetadata>
export type AdapterDocumentIsBlob = (database: DatabaseRef, id: string, property: string) => Promise<boolean>
export type AdapterDocumentSaveBlob = (database: DatabaseRef, id: string, property: string, blob: BlobConfig) => Promise<void>

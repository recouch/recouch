/* eslint-disable @typescript-eslint/ban-types */
import type { BlobConfig, BlobMetadata, DatabaseRef, QueryRef, ReplicatedDocInfo, ReplicatorConfiguration, ReplicatorRef, ReplicatorStatus } from '@recouch/core'
import type { Opaque } from 'type-fest'

export type DatabaseChangeListener = (res: { value: { docIDs: string[] } }) => void
export type DocumentChangeListener = (res: { value: { docID: string } }) => void
export type DocumentReplicationListener = (res: { value: { direction: 'push' | 'pull', documents: ReplicatedDocInfo[] } } ) => void
export type QueryChangeListener<T> = (res: { value: { results: T[] } }) => void
export type ReplicatorChangeListener = (res: { value: ReplicatorStatus }) => void
export type ListenerToken = Opaque<unknown, 'ListenerToken'>

interface DatabaseRefOptions {
  database: DatabaseRef
}

interface QueryRefOptions<T = unknown, P = Record<string, string>> {
  query: QueryRef<T, P>
}

interface ReplicatorRefOptions {
  replicator: ReplicatorRef
}

interface BlobOptions {
  blob: BlobConfig
}

type Result<T> = Promise<T extends void ? void : { value: T }>

export interface CouchbaseLitePlugin {
  openDatabase(options: { name: string, directory?: string }): Result<DatabaseRef>

  addDatabaseChangeListener(options: DatabaseRefOptions, handler: DatabaseChangeListener): Result<ListenerToken>
  beginTransaction(options: DatabaseRefOptions): Result<void>
  closeDatabase(options: DatabaseRefOptions): Result<void>
  databaseName(options: DatabaseRefOptions): Result<string>
  databasePath(options: DatabaseRefOptions): Result<string>
  deleteDatabase(options: { name: string, directory: string }): Result<void>
  deleteDatabase(options: DatabaseRefOptions): Result<void>
  endTransaction(options: DatabaseRefOptions & { commit: boolean }): Result<void>
  removeDatabaseChangeListener(options: { token: ListenerToken }): Result<void>

  addDocumentChangeListener(options: DatabaseRefOptions & { id: string }, handler: DocumentChangeListener): Result<ListenerToken>
  deleteDocument(options: DatabaseRefOptions & { id: string }): Result<void>
  getDocument<T = object>(options: DatabaseRefOptions & { id: string }): Result<T | undefined>
  removeDocumentChangeListener(options: { token: ListenerToken }): Result<void>
  saveDocument<T = object>(options: DatabaseRefOptions & { id: string, value: T }): Result<void>

  createQuery<T = unknown, P = Record<string, string>>(options: DatabaseRefOptions & { query: string }): Result<QueryRef<T, P>>
  addQueryChangeListener<T = unknown, P = Record<string, string>>(options: QueryRefOptions<T, P>, handler: QueryChangeListener<T>): Result<ListenerToken>
  executeQuery<T = unknown, P = Record<string, string>>(options: QueryRefOptions<T, P>): Result<T[]>
  explainQuery<T = unknown, P = Record<string, string>>(options: QueryRefOptions<T, P>): Result<string>
  getQueryParameters<T = unknown, P = Record<string, string>>(options: QueryRefOptions<T, P>): Result<Partial<P>>
  removeQueryChangeListener(options: { token: ListenerToken }): Result<void>
  setQueryParameters<T = unknown, P = Record<string, string>>(options: QueryRefOptions<T, P> & { parameters: Partial<P> }): Result<void>

  addDocumentReplicationListener(options: ReplicatorRefOptions, handler: DocumentReplicationListener): Result<ListenerToken>
  addReplicatorChangeListener(options: ReplicatorRefOptions, handler: ReplicatorChangeListener): Result<ListenerToken>
  createReplicator(options: { config: ReplicatorConfiguration }): Result<ReplicatorRef>
  documentsPendingReplication(options: ReplicatorRefOptions): Result<string[]>
  isDocumentPendingReplication(options: ReplicatorRefOptions & { documentID: string }): Result<boolean>
  removeDocumentReplicationListener(options: { token: ListenerToken }): Result<void>
  removeReplicatorChangeListener(options: { token: ListenerToken }): Result<void>
  replicatorConfiguration(options: ReplicatorRefOptions): Result<ReplicatorConfiguration>
  replicatorStatus(options: ReplicatorRefOptions): Result<ReplicatorStatus>
  setHostReachable(options: ReplicatorRefOptions & { reachable: boolean }): Result<void>
  startReplicator(options: ReplicatorRefOptions & { resetCheckpoint?: boolean }): Result<void>
  stopReplicator(options: ReplicatorRefOptions): Result<void>

  blobContent(options: BlobOptions): Result<Buffer>
  blobContentType(options: BlobOptions): Result<string>
  blobCreateJson(options: BlobOptions): Result<string>
  blobProperties(options: BlobOptions): Result<BlobMetadata>
  blobDigest(options: BlobOptions): Result<string>
  blobEquals(options: BlobOptions & { anotherBlob: BlobConfig }): Result<boolean>
  blobLength(options: BlobOptions): Result<number>
  databaseGetBlob(options: { database: DatabaseRef, properties: BlobMetadata }): Result<Buffer>
  databaseSaveBlob(options: BlobOptions & { database: DatabaseRef }): Result<void>
  documentGetBlob(options: DatabaseRefOptions & { id: string, property: string }): Result<Buffer>
  documentIsBlob(options: DatabaseRefOptions & { id: string, property: string }): Result<boolean>
  documentSetBlob(options: DatabaseRefOptions & BlobOptions & { id: string, property: string }): Result<void>
}

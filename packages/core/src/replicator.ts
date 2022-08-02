import { DocumentReplicationListener, RemoveDocumentReplicationListener, RemoveReplicatorChangeListener, ReplicatorChangeListener, ReplicatorConfiguration, ReplicatorStatus } from './adapterFunctions'
import { adapterFunction } from './functions'
import { ReplicatorRef } from './ref'

export type AddDocumentReplicationListener =
  & ((replicator: ReplicatorRef, handler: DocumentReplicationListener) => Promise<RemoveDocumentReplicationListener>)
  & ((replicator: ReplicatorRef) => (handler: DocumentReplicationListener) => Promise<RemoveDocumentReplicationListener>)
export type AddReplicatorChangeListener =
  & ((replicator: ReplicatorRef, handler: ReplicatorChangeListener) => Promise<RemoveReplicatorChangeListener>)
  & ((replicator: ReplicatorRef) => (handler: ReplicatorChangeListener) => Promise<RemoveReplicatorChangeListener>)
export type CreateReplicator = (config: ReplicatorConfiguration) => Promise<ReplicatorRef>
export type DocumentsPendingReplication = (replicator: ReplicatorRef) => Promise<string[]>
export type IsDocumentPendingReplication =
  & ((replicator: ReplicatorRef, documentID: string) => Promise<boolean>)
  & ((replicator: ReplicatorRef) => (documentID: string) => Promise<boolean>)
export type GetReplicatorConfiguration = (replicator: ReplicatorRef) => Promise<ReplicatorConfiguration>
export type GetReplicatorStatus = (replicator: ReplicatorRef) => Promise<ReplicatorStatus>
export type SetHostReachable =
  & ((replicator: ReplicatorRef, reachable: boolean) => Promise<void>)
  & ((replicator: ReplicatorRef) => (reachable: boolean) => Promise<void>)
export type StartReplicator = (replicator: ReplicatorRef, resetCheckpoint?: boolean) => Promise<void>
export type StopReplicator = (replicator: ReplicatorRef) => Promise<void>

export const addDocumentReplicationListener: AddDocumentReplicationListener = adapterFunction('addDocumentReplicationListener')
export const addReplicatorChangeListener: AddReplicatorChangeListener = adapterFunction('addReplicatorChangeListener')
export const createReplicator = adapterFunction('createReplicator')
export const documentsPendingReplication = adapterFunction('documentsPendingReplication')
export const isDocumentPendingReplication: IsDocumentPendingReplication = adapterFunction('isDocumentPendingReplication')
export const replicatorConfiguration = adapterFunction('replicatorConfiguration')
export const replicatorStatus = adapterFunction('replicatorStatus')
export const setHostReachable: SetHostReachable = adapterFunction('setHostReachable')
export const startReplicator = adapterFunction('startReplicator')
export const stopReplicator = adapterFunction('stopReplicator')

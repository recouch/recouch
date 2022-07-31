import type { AdapterAddDocumentReplicationListener, AdapterAddReplicatorChangeListener, AdapterCreateReplicator, AdapterDocumentsPendingReplication, AdapterGetReplicatorConfiguration, AdapterGetReplicatorStatus, AdapterIsDocumentPendingReplication, AdapterSetHostReachable, AdapterStartReplicator, AdapterStopReplicator, DocumentReplicationListener, ReplicatorChangeListener, ReplicatorConfiguration } from '@recouch/core'

import { CouchbaseLite } from '../plugin'

import { getValue } from './utils'

export type RemoveDocumentReplicationListener = () => void
export type RemoveReplicatorChangeListener = () => void

export const addDocumentReplicationListener: AdapterAddDocumentReplicationListener = (replicator, handler: DocumentReplicationListener) => 
  CouchbaseLite.addDocumentReplicationListener({ replicator }, ({ value: { direction, documents } }) => handler(direction, documents))
    .then(getValue)
    .then(token => () => CouchbaseLite.removeDocumentReplicationListener({ token }))
export const addReplicatorChangeListener: AdapterAddReplicatorChangeListener = (replicator, handler: ReplicatorChangeListener) => 
  CouchbaseLite.addReplicatorChangeListener({ replicator }, ({ value }) => handler(value))
    .then(getValue)
    .then(token => () => CouchbaseLite.removeReplicatorChangeListener({ token }))
export const createReplicator: AdapterCreateReplicator = (config: ReplicatorConfiguration) =>
  CouchbaseLite.createReplicator({ config }).then(getValue)
export const documentsPendingReplication: AdapterDocumentsPendingReplication = (replicator) =>
  CouchbaseLite.documentsPendingReplication({ replicator }).then(getValue)
export const isDocumentPendingReplication: AdapterIsDocumentPendingReplication = (replicator, documentID: string) =>
  CouchbaseLite.isDocumentPendingReplication({ documentID, replicator }).then(getValue)
export const replicatorConfiguration: AdapterGetReplicatorConfiguration = (replicator) => 
  CouchbaseLite.replicatorConfiguration({ replicator }).then(getValue)
export const replicatorStatus: AdapterGetReplicatorStatus = (replicator) => 
  CouchbaseLite.replicatorStatus({ replicator }).then(getValue)
export const setHostReachable: AdapterSetHostReachable = (replicator, reachable) => CouchbaseLite.setHostReachable({ reachable, replicator })
export const startReplicator: AdapterStartReplicator = (replicator, resetCheckpoint?) => CouchbaseLite.startReplicator({ replicator, resetCheckpoint })
export const stopReplicator: AdapterStopReplicator = (replicator) => CouchbaseLite.stopReplicator({ replicator })

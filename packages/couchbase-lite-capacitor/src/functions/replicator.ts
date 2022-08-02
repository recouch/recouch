import type { AdapterAddDocumentReplicationListener, AdapterAddReplicatorChangeListener, AdapterCreateReplicator, AdapterDocumentsPendingReplication, AdapterGetReplicatorConfiguration, AdapterGetReplicatorStatus, AdapterIsDocumentPendingReplication, AdapterSetHostReachable, AdapterStartReplicator, AdapterStopReplicator, DocumentReplicationListener, ReplicatorChangeListener, ReplicatorConfiguration } from '@recouch/core'

import { CouchbaseLite } from '../plugin'

import { getValue } from './utils'

export type RemoveDocumentReplicationListener = () => void
export type RemoveReplicatorChangeListener = () => void

export const addDocumentReplicationListener: AdapterAddDocumentReplicationListener = (replicator, handler: DocumentReplicationListener) =>
  new Promise(resolve =>
    CouchbaseLite.addDocumentReplicationListener({ replicator }, ({ direction, documents, token }) => {
      if (token) return resolve(() => CouchbaseLite.removeReplicatorListener({ token }))

      handler(direction, documents)
    })
  )
export const addReplicatorChangeListener: AdapterAddReplicatorChangeListener = (replicator, handler: ReplicatorChangeListener) =>
  new Promise(resolve =>
    CouchbaseLite.addReplicatorChangeListener({ replicator }, ({ status, token }) => {
      if (token) return resolve(() => CouchbaseLite.removeReplicatorListener({ token }))

      handler(status)
    })
  )
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

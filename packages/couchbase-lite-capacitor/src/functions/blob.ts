
import type { AdapterBlobProperties, AdapterDatabaseGetBlob, AdapterDatabaseSaveBlob, AdapterDocumentGetBlob, AdapterDocumentIsBlob, AdapterDocumentSetBlob } from '@recouch/core'

import { CouchbaseLite } from '../plugin'

import { getValue } from './utils'

export const blobProperties: AdapterBlobProperties = (blob) => 
  CouchbaseLite.blobProperties({ blob }).then(getValue)
export const databaseGetBlob: AdapterDatabaseGetBlob = (database, properties) => 
  CouchbaseLite.databaseGetBlob({ database, properties }).then(getValue)
export const databaseSaveBlob: AdapterDatabaseSaveBlob = (database, blob) => 
  CouchbaseLite.databaseSaveBlob({ blob, database })
export const documentGetBlob: AdapterDocumentGetBlob = (database, id, property) => 
  CouchbaseLite.documentGetBlob({database, id, property }).then(getValue)
export const documentIsBlob: AdapterDocumentIsBlob = (database, id, property) => 
  CouchbaseLite.documentIsBlob({database, id, property }).then(getValue)
export const documentSetBlob: AdapterDocumentSetBlob = (database, id, property, blob) =>
  CouchbaseLite.documentSetBlob({ database, blob, id, property })


import type { AdapterBlobProperties, AdapterDatabaseGetBlob, AdapterDatabaseSaveBlob, AdapterDocumentGetBlob, AdapterDocumentGetBlobProperties, AdapterDocumentIsBlob, AdapterDocumentSaveBlob } from '@recouch/core'
import { Buffer } from 'buffer'

import { CouchbaseLite } from '../plugin'

import { getValue } from './utils'

export const blobProperties: AdapterBlobProperties = (blob) => 
  CouchbaseLite.blobProperties({
    blob: {
      contentType: blob.contentType,
      data: blob.data.toString('base64')
    }
  }).then(getValue)
export const databaseGetBlob: AdapterDatabaseGetBlob = (database, properties) => 
  CouchbaseLite.databaseGetBlob({ database, properties }).then(getValue).then(data => Buffer.from(data, 'base64'))
export const databaseSaveBlob: AdapterDatabaseSaveBlob = (database, blob) => 
  CouchbaseLite.databaseSaveBlob({
    blob: {
      contentType: blob.contentType,
      data: blob.data.toString('base64')
  },
    database
  })
export const documentGetBlob: AdapterDocumentGetBlob = (database, id, property) => 
  CouchbaseLite.documentGetBlob({database, id, property }).then(getValue).then(data => Buffer.from(data, 'base64'))
export const documentGetBlobProperties: AdapterDocumentGetBlobProperties = (database, id, property) => 
  CouchbaseLite.documentGetBlobProperties({database, id, property }).then(getValue)
export const documentIsBlob: AdapterDocumentIsBlob = (database, id, property) => 
  CouchbaseLite.documentIsBlob({database, id, property }).then(getValue)
export const documentSaveBlob: AdapterDocumentSaveBlob = (database, id, property, blob) =>
  CouchbaseLite.documentSaveBlob({
    database,
    blob: {
      contentType: blob.contentType,
      data: blob.data.toString('base64')
    },
    id,
    property
  })

import { curry } from 'rambda'
import { DatabaseRef } from './ref'
import { adapterFunction } from './functions'
import { BlobConfig, BlobMetadata } from './adapterFunctions'

export type BlobProperties = (blob: BlobConfig) => Promise<BlobMetadata>

export type DatabaseGetBlob = 
  & ((database: DatabaseRef, properties: BlobMetadata) => Promise<Buffer | undefined>)
  & ((database: DatabaseRef) => (properties: BlobMetadata) => Promise<Buffer | undefined>)
export type DatabaseSaveBlob = 
  & ((database: DatabaseRef, blob: BlobConfig) => Promise<void>)
  & ((database: DatabaseRef) => (blob: BlobConfig) => Promise<void>)

export type DocumentGetBlob =
  & ((database: DatabaseRef, id: string, property: string) => Promise<Buffer | undefined>)
  & ((database: DatabaseRef) => (id: string, property: string) => Promise<Buffer | undefined>)
  & ((database: DatabaseRef) => (id: string) => (property: string) => Promise<Buffer | undefined>)
  & ((database: DatabaseRef, id: string) => (property: string) => Promise<Buffer | undefined>)
export type DocumentGetBlobProperties =
  & ((database: DatabaseRef, id: string, property: string) => Promise<BlobMetadata | undefined>)
  & ((database: DatabaseRef) => (id: string, property: string) => Promise<BlobMetadata | undefined>)
  & ((database: DatabaseRef) => (id: string) => (property: string) => Promise<BlobMetadata | undefined>)
  & ((database: DatabaseRef, id: string) => (property: string) => Promise<BlobMetadata | undefined>)
export type DocumentIsBlob =
  & ((database: DatabaseRef, id: string, property: string) => Promise<boolean>)
  & ((database: DatabaseRef) => (id: string, property: string) => Promise<boolean>)
  & ((database: DatabaseRef) => (id: string) => (property: string) => Promise<boolean>)
  & ((database: DatabaseRef, id: string) => (property: string) => Promise<boolean>)
export type DocumentSetBlob =
  & ((database: DatabaseRef, id: string, property: string, blob: BlobConfig) => Promise<void>)
  & ((database: DatabaseRef) => (id: string, property: string, blob: BlobConfig) => Promise<void>)
  & ((database: DatabaseRef) => (id: string, property: string) => (blob: BlobConfig) => Promise<void>)
  & ((database: DatabaseRef) => (id: string) => (property: string) => (blob: BlobConfig) => Promise<void>)
  & ((database: DatabaseRef) => (id: string) => (property: string, blob: BlobConfig) => Promise<void>)
  & ((database: DatabaseRef, id: string) => (property: string) => (blob: BlobConfig) => Promise<void>)
  & ((database: DatabaseRef, id: string, property: string) => (blob: BlobConfig) => Promise<void>)

export const blobProperties: BlobProperties = adapterFunction('blobProperties')
export const databaseGetBlob: DatabaseGetBlob = curry(adapterFunction('databaseGetBlob'))
export const databaseSaveBlob: DatabaseSaveBlob = curry(adapterFunction('databaseSaveBlob'))
export const documentGetBlob: DocumentGetBlob = curry(adapterFunction('documentGetBlob'))
export const documentGetBlobProperties: DocumentGetBlobProperties = curry(adapterFunction('documentGetBlobProperties'))
export const documentIsBlob: DocumentIsBlob = curry(adapterFunction('documentIsBlob'))
export const documentSetBlob: DocumentSetBlob = curry(adapterFunction('documentSetBlob'))

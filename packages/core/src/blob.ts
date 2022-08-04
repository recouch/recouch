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
export type DocumentSaveBlob =
  & ((database: DatabaseRef, id: string, property: string, blob: BlobConfig) => Promise<void>)
  & ((database: DatabaseRef) => (id: string, property: string, blob: BlobConfig) => Promise<void>)
  & ((database: DatabaseRef) => (id: string, property: string) => (blob: BlobConfig) => Promise<void>)
  & ((database: DatabaseRef) => (id: string) => (property: string) => (blob: BlobConfig) => Promise<void>)
  & ((database: DatabaseRef) => (id: string) => (property: string, blob: BlobConfig) => Promise<void>)
  & ((database: DatabaseRef, id: string) => (property: string) => (blob: BlobConfig) => Promise<void>)
  & ((database: DatabaseRef, id: string, property: string) => (blob: BlobConfig) => Promise<void>)

export const blobProperties: BlobProperties = adapterFunction('blobProperties')
export const databaseGetBlob: DatabaseGetBlob = adapterFunction('databaseGetBlob')
export const databaseSaveBlob: DatabaseSaveBlob = adapterFunction('databaseSaveBlob')
export const documentGetBlob: DocumentGetBlob = adapterFunction('documentGetBlob')
export const documentGetBlobProperties: DocumentGetBlobProperties = adapterFunction('documentGetBlobProperties')
export const documentIsBlob: DocumentIsBlob = adapterFunction('documentIsBlob')
export const documentSaveBlob: DocumentSaveBlob = adapterFunction('documentSaveBlob')

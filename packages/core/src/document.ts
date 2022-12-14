import { DatabaseRef } from './ref'
import { adapterFunction } from './functions'
import { DocumentChangeListener, RemoveDocumentChangeListener } from './adapterFunctions'

export type AddDocumentChangeListener =
  & ((database: DatabaseRef, id: string, handler: DocumentChangeListener) => Promise<RemoveDocumentChangeListener>)
  & ((database: DatabaseRef) => (
    & ((id: string, handler: DocumentChangeListener) => Promise<RemoveDocumentChangeListener>)
    & ((id: string) => (handler: DocumentChangeListener) => Promise<RemoveDocumentChangeListener>)
  ))
  & ((database: DatabaseRef, id: string) => (handler: DocumentChangeListener) => Promise<RemoveDocumentChangeListener>)
  & ((database: DatabaseRef) => (id: string) => (handler: DocumentChangeListener) => Promise<RemoveDocumentChangeListener>)
export type DeleteDocument =
  & ((database: DatabaseRef, id: string) => Promise<void>)
  & ((database: DatabaseRef) => (id: string) => Promise<void>)
export type DocumentExists =
  & ((database: DatabaseRef, id: string) => Promise<boolean>)
  & ((database: DatabaseRef) => (id: string) => Promise<boolean>)
export type GetDocument =
  & (<T = object>(database: DatabaseRef, id: string) => Promise<T | undefined>)
  & (<T = object>(database: DatabaseRef) => <U = T>(id: string) => Promise<U | undefined>)
export type GetRevisionID =
  & ((database: DatabaseRef, id: string) => Promise<string | undefined>)
  & ((database: DatabaseRef) => (id: string) => Promise<string | undefined>)
export type SaveDocument =
  & (<T = object>(database: DatabaseRef, id: string, value: T) => Promise<void>)
  & (<T = object>(database: DatabaseRef, id: string) => (value: T) => Promise<void>)
  & (<T = object>(database: DatabaseRef) => (
    & ((id: string, value: T) => Promise<void>)
    & ((id: string) => (value: T) => Promise<void>)
  ))

export const addDocumentChangeListener: AddDocumentChangeListener = adapterFunction('addDocumentChangeListener')
export const deleteDocument: DeleteDocument = adapterFunction('deleteDocument')
export const getDocument = adapterFunction('getDocument') as GetDocument
export const documentExists: DocumentExists = adapterFunction('documentExists')
export const getRevisionID: GetRevisionID = adapterFunction('getRevisionID')
export const saveDocument: SaveDocument = adapterFunction('saveDocument')

export const saveDocument2 = adapterFunction('saveDocument')

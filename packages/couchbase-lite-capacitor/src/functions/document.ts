/* eslint-disable @typescript-eslint/ban-types */

import type { AdapterAddDocumentChangeListener, AdapterDeleteDocument, AdapterGetDocument, AdapterSaveDocument, DatabaseRef } from '@recouch/core'

import { CouchbaseLite } from '../plugin'

import { getValue } from './utils'

export type RemoveDocumentChangeListener = () => void

export const addDocumentChangeListener: AdapterAddDocumentChangeListener = (database, id, handler) =>
  CouchbaseLite.addDocumentChangeListener({ database, id }, ({ value: { docID } }) => handler(docID))
    .then(getValue)
    .then(token => () => CouchbaseLite.removeDocumentChangeListener({ token }))

export const deleteDocument: AdapterDeleteDocument = (database, id) => CouchbaseLite.deleteDocument({ database, id })

export const getDocument: AdapterGetDocument = <T = object>(database: DatabaseRef, id: string): Promise<T | undefined> =>
  CouchbaseLite.getDocument<T>({ database, id }).then(res => res?.value)

export const saveDocument: AdapterSaveDocument = (database, id, value) => CouchbaseLite.saveDocument({ database, id, value })

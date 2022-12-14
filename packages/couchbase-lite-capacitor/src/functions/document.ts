/* eslint-disable @typescript-eslint/ban-types */

import type { AdapterAddDocumentChangeListener, AdapterDeleteDocument, AdapterDocumentExists, AdapterGetDocument, AdapterSaveDocument, DatabaseRef } from '@recouch/core'

import { CouchbaseLite } from '../plugin'

import { getValue } from './utils'

export type RemoveDocumentChangeListener = () => void

export const addDocumentChangeListener: AdapterAddDocumentChangeListener = (database, id, handler) =>
  new Promise(resolve =>
    CouchbaseLite.addDocumentChangeListener({ database, id }, ({ docID, token }) => {
      if (token) return resolve(() => CouchbaseLite.removeDatabaseChangeListener({ token }))

      handler(docID)
    })
  )

export const deleteDocument: AdapterDeleteDocument = (database, id) => CouchbaseLite.deleteDocument({ database, id })
export const documentExists: AdapterDocumentExists = (database, id) => CouchbaseLite.documentExists({ database, id }).then(getValue)

export const getDocument: AdapterGetDocument = <T = object>(database: DatabaseRef, id: string): Promise<T | undefined> =>
  CouchbaseLite.getDocument<T>({ database, id }).then(res => res?.value)

export const saveDocument: AdapterSaveDocument = (database, id, value) => CouchbaseLite.saveDocument({ database, id, value })

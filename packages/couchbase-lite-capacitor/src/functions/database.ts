import type {
  DatabaseConfig,
  DatabaseRef,
  AdapterAddDatabaseChangeListener,
  AdapterBeginTransaction,
  AdapterCloseDatabase,
  AdapterDatabaseName,
  AdapterDatabasePath,
  AdapterDeleteDatabase,
  AdapterEndTransaction,
  AdapterOpenDatabase
} from '@recouch/core'

import { CouchbaseLite } from '../plugin'

import { getValue } from './utils'

export type RemoveDatabaseChangeListener = () => void

export const openDatabase: AdapterOpenDatabase = (config: DatabaseConfig) => CouchbaseLite.openDatabase(config).then(getValue)
export const addDatabaseChangeListener: AdapterAddDatabaseChangeListener = (database, handler) =>
  CouchbaseLite.addDatabaseChangeListener({ database }, ({ value: { docIDs } }) => handler(docIDs))
    .then(getValue)
    .then(token => () => CouchbaseLite.removeDatabaseChangeListener({ token }))
export const beginTransaction: AdapterBeginTransaction = (database) => CouchbaseLite.beginTransaction({ database })
export const closeDatabase: AdapterCloseDatabase = (database) => CouchbaseLite.closeDatabase({ database })
export const databaseName: AdapterDatabaseName = (database) => CouchbaseLite.databaseName({ database }).then(getValue)
export const databasePath: AdapterDatabasePath = (database) => CouchbaseLite.databasePath({ database }).then(getValue)
export const deleteDatabase: AdapterDeleteDatabase = (database: DatabaseRef | string, directory?: string) => {
  if (typeof database === 'string') {
    if (!directory) throw new Error('directory not specified')

    return CouchbaseLite.deleteDatabase({ name: database, directory })
  }

  return CouchbaseLite.deleteDatabase({ database })
}
export const endTransaction: AdapterEndTransaction = (database, commit) => CouchbaseLite.endTransaction({ commit, database })

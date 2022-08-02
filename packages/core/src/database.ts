import {
  DatabaseChangeListener,
  DatabaseConfig,
  RemoveDatabaseChangeListener
} from './adapterFunctions'
import { DatabaseRef } from './ref'
import { adapterFunction } from './functions'

export type AbortTransaction = (database: DatabaseRef) => Promise<void>
export type AddDatabaseChangeListener =
  & ((database: DatabaseRef, handler: DatabaseChangeListener) => Promise<RemoveDatabaseChangeListener>)
  & ((database: DatabaseRef) => (handler: DatabaseChangeListener) => Promise<RemoveDatabaseChangeListener>)
export type BeginTransaction = (database: DatabaseRef) => Promise<void>
export type CloseDatabase = (database: DatabaseRef) => Promise<void>

export type CommitTransaction = (database: DatabaseRef) => Promise<void>
export type DatabaseName = (database: DatabaseRef) => Promise<string>
export type DatabasePath = (database: DatabaseRef) => Promise<string>
export type DeleteDatabase =
  & ((name: string, directory: string) => Promise<void>)
  & ((database: DatabaseRef) => Promise<void>)
export type EndTransaction =
  & ((database: DatabaseRef, commit: boolean) => Promise<void>)
  & ((database: DatabaseRef) => (commit: boolean) => Promise<void>)
export type OpenDatabase = (config: DatabaseConfig) => Promise<DatabaseRef>

export const abortTransaction: AbortTransaction = database => adapterFunction('endTransaction')(database, false)
export const addDatabaseChangeListener: AddDatabaseChangeListener = adapterFunction('addDatabaseChangeListener')
export const beginTransaction: BeginTransaction = adapterFunction('beginTransaction')
export const closeDatabase: CloseDatabase = adapterFunction('closeDatabase')
export const commitTransaction: CommitTransaction = database => adapterFunction('endTransaction')(database, true)
export const databaseName: DatabaseName = adapterFunction('databaseName')
export const databasePath: DatabasePath = adapterFunction('databasePath')
export const deleteDatabase = adapterFunction('deleteDatabase') as DeleteDatabase
export const endTransaction: EndTransaction = adapterFunction('endTransaction')
export const openDatabase: OpenDatabase = adapterFunction('openDatabase')

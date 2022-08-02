import { DatabaseRef, QueryRef } from './ref'
import { QueryChangeListener, RemoveQueryChangeListener } from './adapterFunctions'
import { adapterFunction } from './functions'

export type CreateQuery =
  & (<T = unknown, P = Record<string, string>>(database: DatabaseRef, query: string) => Promise<QueryRef<T, P>>)
  & (<T = unknown, P = Record<string, string>>(database: DatabaseRef) => (query: string) => Promise<QueryRef<T, P>>)
export type AddQueryChangeListener =
  & (<T = unknown, P = Record<string, string>>(query: QueryRef<T, P>, handler: QueryChangeListener<T>) => Promise<RemoveQueryChangeListener>)
  & (<T = unknown, P = Record<string, string>>(query: QueryRef<T, P>) => (handler: QueryChangeListener<T>) => Promise<RemoveQueryChangeListener>)
export type ExecuteQuery = <T = unknown, P = Record<string, string>>(query: QueryRef<T, P>) => Promise<T[]>
export type ExplainQuery = <T = unknown, P = Record<string, string>>(query: QueryRef<T, P>) => Promise<string>
export type GetQueryParameters = <T = unknown, P = Record<string, string>>(query: QueryRef<T, P>) => Promise<Partial<P>>
export type SetQueryParameters =
  & (<T = unknown, P = Record<string, string>>(query: QueryRef<T, P>, parameters: Partial<P>) => Promise<void>)
  & (<T = unknown, P = Record<string, string>>(query: QueryRef<T, P>) => (parameters: Partial<P>) => Promise<void>)

export const createQuery: CreateQuery = adapterFunction('createQuery')
export const addQueryChangeListener: AddQueryChangeListener = adapterFunction('addQueryChangeListener')
export const executeQuery = adapterFunction('executeQuery') as ExecuteQuery
export const explainQuery: ExplainQuery = adapterFunction('explainQuery')
export const getQueryParameters: GetQueryParameters = adapterFunction('getQueryParameters')
export const setQueryParameters: SetQueryParameters = adapterFunction('setQueryParameters')

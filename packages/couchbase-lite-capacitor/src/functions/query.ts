
import type { AdapterCreateQuery, DatabaseRef, AdapterAddQueryChangeListener, AdapterExecuteQuery, AdapterExplainQuery, AdapterGetQueryParameters, AdapterSetQueryParameters } from '@recouch/core'

import { CouchbaseLite } from '../plugin'

import { getValue } from './utils'

export type RemoveQueryChangeListener = () => void

export const createQuery: AdapterCreateQuery = <T = unknown, P = Record<string, string>>(database: DatabaseRef, query: string) =>
  CouchbaseLite.createQuery<T, P>({ database, query }).then(getValue)
export const addQueryChangeListener: AdapterAddQueryChangeListener = (query, handler): Promise<RemoveQueryChangeListener> =>
  new Promise(resolve =>
    CouchbaseLite.addQueryChangeListener({ query }, ({ results, token }) => {
      if (token) return resolve(() => CouchbaseLite.removeQueryChangeListener({ token }))

      handler(results)
    })
  )
export const executeQuery: AdapterExecuteQuery = (query) => CouchbaseLite.executeQuery({ query }).then(getValue)
export const explainQuery: AdapterExplainQuery = (query) => CouchbaseLite.explainQuery({ query }).then(getValue)
export const getQueryParameters: AdapterGetQueryParameters = (query) => CouchbaseLite.getQueryParameters({ query }).then(res => res?.value ?? {})
export const setQueryParameters: AdapterSetQueryParameters = (query, parameters) => CouchbaseLite.setQueryParameters({ query, parameters })

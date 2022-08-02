import { Curried, curry } from './curry'
import { CouchbaseLiteAdapter } from './adapter'

type AdapterFunctionName = keyof CouchbaseLiteAdapter
type AdapterFunction<N extends AdapterFunctionName> = CouchbaseLiteAdapter[N]
type AdapterFunctionParameters<N extends AdapterFunctionName> = Parameters<AdapterFunction<N>>
type AdapterFunctionReturnType<N extends AdapterFunctionName> = ReturnType<AdapterFunction<N>>
type CurriedAdapterFunction<N extends AdapterFunctionName> = Curried<AdapterFunctionParameters<N>, AdapterFunctionReturnType<N>>

let adapter: CouchbaseLiteAdapter | undefined
export const adapterFunction = <N extends AdapterFunctionName>(functionName: N): CurriedAdapterFunction<N> =>
  ((...args: AdapterFunctionParameters<N>) => {
    if (!adapter) throw new Error('No Couchbase Lite adapter has been set')
    if (!adapter[functionName]) throw new Error(`Couchbase Lite method '${functionName}' not implemented`)

    return curry(adapter[functionName] as (...params: unknown[]) => unknown)(...args)
  }) as CurriedAdapterFunction<N>
export const use = (couchbaseLiteAdapter: CouchbaseLiteAdapter) => { adapter = couchbaseLiteAdapter }

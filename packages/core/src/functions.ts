import { CouchbaseLiteAdapter } from './adapter'

type AdapterFunctionName = keyof CouchbaseLiteAdapter

let adapter: CouchbaseLiteAdapter | undefined
export const adapterFunction = <FN extends AdapterFunctionName>(functionName: FN) =>
  (...args: Parameters<CouchbaseLiteAdapter[FN]>): Promise<Awaited<ReturnType<CouchbaseLiteAdapter[FN]>>> => {
    if (!adapter) throw new Error('No Couchbase Lite adapter has been set')
    if (!adapter[functionName]) throw new Error(`Couchbase Lite method '${functionName}' not implemented`)

    return (adapter[functionName] as Function)(...args)
  }
export const use = (couchbaseLiteAdapter: CouchbaseLiteAdapter) => { adapter = couchbaseLiteAdapter }

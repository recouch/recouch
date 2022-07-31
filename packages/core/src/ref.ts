import { Opaque } from 'type-fest'

declare const resultType: unique symbol;
declare const parametersType: unique symbol;

export type DatabaseRef = Opaque<unknown, 'Database'>
export type QueryRef<Result = unknown, Parameters = Record<string, string>> = Opaque<{
  readonly [resultType]: Result,
  readonly [parametersType]: Parameters
}, 'Query'>
export type ReplicatorRef = Opaque<unknown, 'Replicator'>

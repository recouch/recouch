import { databaseName, getDocument, openDatabase, saveDocument, use } from '@recouch/core'
import { adapter } from './adapter'
import { testDirectory } from './test-util'

describe('node adapter', () => {
  it('opens a database', async () => {
    const db = await adapter.openDatabase({ name: 'test1', directory: testDirectory })

    await expect(adapter.databaseName(db)).resolves.toBe('test1')
  })
})

describe('couchbase-lite-core', () => {
  use(adapter)

  it('opens a database', async () => {
    const db = await openDatabase({ name: 'test1', directory: testDirectory })

    await expect(databaseName(db)).resolves.toBe('test1')
  })

  it('saves and retrieves a document', async () => {
    const db = await openDatabase({ name: 'test1', directory: testDirectory })

    await saveDocument(db, 'atest', { name: 'testee' })

    await expect(getDocument(db, 'atest')).resolves.toEqual({ name: 'testee' })
  })
})

import { bindDatabase, openDatabase } from '@recouch/core'
import { createTestDatabase } from './test-util'

describe('bindDatabase', () => {
  describe('createDocument', () => {
    it('returns mutable document methods scoped to the parent database and a new document', async () => {
      const sdb = await openDatabase('test1').then(bindDatabase)
      const doc = await sdb.createDocument('doc1')

      await expect(doc.getID()).resolves.toBe('doc1')
      await expect(doc.setProperties({ name: 'Fiona' })).resolves.not.toThrow()
      await expect(doc.getProperties()).resolves.toEqual({ name: 'Fiona' })
      await expect(doc.save()).resolves.not.toThrow()
      await expect(sdb.getDocument('doc1').getProperties()).resolves.toEqual({ name: 'Fiona' })
      await expect(doc.delete()).resolves.not.toThrow()
      await expect(sdb.getDocument('doc1')).resolves.toBeUndefined()

      sdb.delete()
    })

    it('returns mutable document methods scoped to the parent database and a new document promise', async () => {
      const sdb = await openDatabase('test1').then(bindDatabase)
      const doc = sdb.createDocument('doc1')

      await expect(doc.getID()).resolves.toBe('doc1')
      await expect(doc.setProperties({ name: 'Fiona' })).resolves.not.toThrow()
      await expect(doc.getProperties()).resolves.toEqual({ name: 'Fiona' })
      await expect(doc.save()).resolves.not.toThrow()
      await expect(sdb.getDocument('doc1').getProperties()).resolves.toEqual({ name: 'Fiona' })
      await expect(doc.delete()).resolves.not.toThrow()
      await expect(sdb.getDocument('doc1')).resolves.toBeUndefined()

      sdb.delete()
    })
  })

  describe('createQuery', () => {
    it('returns query methods scoped to the parent database and query', async () => {
      const { cleanup, db } = createTestDatabase({ doc1: { name: 'Fiona' }, doc2: { name: 'Milo' } })
      const sdb = bindDatabase(db)
      const query = await sdb.createQuery<{ name: string }, { id: string }>(`
        SELECT *
        FROM _ WHERE _id = $id
      `)

      await expect(query.setParameters({ id: 'doc2' })).resolves.not.toThrow()
      await expect(query.getParameters()).resolves.toEqual({ id: 'doc2' })
      await expect(query.execute()).resolves.toEqual([{ _: { name: 'Milo' } }])

      cleanup()
    })
  })

  describe('getDocument', () => {
    it('returns document methods scoped to the parent database and document', async () => {
      const { cleanup, db } = createTestDatabase({ doc1: { name: 'Fiona' }, doc2: { name: 'Milo' } })
      const sdb = bindDatabase(db)
      const doc = sdb.getDocument('doc1')

      await expect(doc.getID()).resolves.toBe('doc1')
      await expect(doc.getProperties()).resolves.toEqual({ name: 'Fiona' })
      await expect(doc.delete()).resolves.not.toThrow()
      await expect(sdb.getDocument('doc1')).resolves.toBeUndefined()

      cleanup()
    })
  })

  describe('getMutableDocument', () => {
    it('returns mutable document methods scoped to the parent database and document', async () => {
      const { cleanup, db } = createTestDatabase({ doc1: { name: 'Fiona' }, doc2: { name: 'Milo' } })
      const sdb = bindDatabase(db)
      const doc = sdb.getMutableDocument('doc1')

      await expect(doc.getID()).resolves.toBe('doc1')
      await expect(doc.getProperties()).resolves.toEqual({ name: 'Fiona' })
      await expect(doc.setProperties({ name: 'Vienna' })).resolves.not.toThrow()
      await expect(doc.getProperties()).resolves.toEqual({ name: 'Vienna' })
      await expect(doc.save()).resolves.not.toThrow()
      await expect(sdb.getDocument('doc1').getProperties()).resolves.toEqual({ name: 'Vienna' })
      await expect(doc.delete()).resolves.not.toThrow()
      await expect(sdb.getDocument('doc1')).resolves.toBeUndefined()

      cleanup()
    })
  })
})

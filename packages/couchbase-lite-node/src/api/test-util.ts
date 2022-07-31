import fs from 'fs'
import { join } from 'path'
import { nanoid } from 'nanoid'
import { DatabaseRef } from '@recouch/core'
import { deleteDatabase, openDatabase, createDocument, saveDocument, setDocumentProperties } from '../cblite'

export const testDirectory = join(__dirname, '../../test-output')

export function createTestDatabase(initDocs: { [id: string]: Record<string, unknown> } = {}): {
  cleanup: () => void
  db: DatabaseRef
  dbName: string
  dbPath: string
} {
  if (!fs.existsSync(testDirectory)) fs.mkdirSync(testDirectory)

  const dbName = `tmp-db-${nanoid()}`
  const dbPath = join(testDirectory, `${dbName}.cblite2`)
  const db = openDatabase(dbName, testDirectory)
  const cleanup = () => {
    try {
      deleteDatabase(db)
    } catch (e) {
      console.error('An error occured while deleting the database:', e)

      deleteDatabase(dbName, testDirectory)
    }
  }

  Object.entries(initDocs).forEach(([id, data]) => {
    const doc = createDocument(id)

    setDocumentProperties(doc, data)
    saveDocument(db, doc)
  })

  return { cleanup, db, dbName, dbPath }
}

export const timeout = (ms = 10) => new Promise(resolve => setTimeout(resolve, ms))

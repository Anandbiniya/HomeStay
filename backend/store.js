import fs from 'fs/promises'
import path from 'path'
import { backendConfig } from './config.js'

const DB_PATH = path.join(backendConfig.dataDir, 'store.json')

const emptyDb = () => ({
  visitors: {},
  events: [],
  leads: [],
  notifications: [],
})

let queue = Promise.resolve()

async function ensureDb() {
  await fs.mkdir(backendConfig.dataDir, { recursive: true })
  try {
    await fs.access(DB_PATH)
  } catch {
    await fs.writeFile(DB_PATH, JSON.stringify(emptyDb(), null, 2))
  }
}

export async function readDb() {
  await ensureDb()
  const raw = await fs.readFile(DB_PATH, 'utf8')
  try {
    return { ...emptyDb(), ...JSON.parse(raw) }
  } catch {
    return emptyDb()
  }
}

export async function writeDb(db) {
  await ensureDb()
  const tmp = `${DB_PATH}.tmp`
  await fs.writeFile(tmp, JSON.stringify(db, null, 2))
  await fs.rename(tmp, DB_PATH)
}

export async function updateDb(mutator) {
  const run = queue.then(async () => {
    const db = await readDb()
    const next = (await mutator(db)) || db
    await writeDb(next)
    return next
  })

  // Keep the queue alive even if one mutation fails.
  queue = run.catch(() => {})
  return run
}

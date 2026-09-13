import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { after, before, test } from 'node:test'
import { createAnswerMiddleware } from './answers.ts'

let directory: string
let origin: string
const server = createServer()
before(async () => {
  directory = await mkdtemp(path.join(tmpdir(), 'dfn-workshop-'))
  await writeFile(path.join(directory, 'slides.md'), 'questionId: TEST-001\nquestionId: PAY-001\n')
  const middleware = createAnswerMiddleware(directory)
  server.on('request', (req, res) => { void middleware(req, res, () => { res.writeHead(404); res.end() }) })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  const address = server.address()
  if (!address || typeof address === 'string') throw new Error('Missing server address')
  origin = `http://127.0.0.1:${address.port}`
})
after(async () => {
  await new Promise<void>(resolve => server.close(() => resolve()))
  await rm(directory, { recursive: true, force: true })
})
const request = (id: string, content: string, revision: string | null, requestOrigin = origin) => fetch(`${origin}/__workshop/answers/${id}`, {
  method: 'PUT', headers: { Origin: requestOrigin, 'Content-Type': 'application/json' }, body: JSON.stringify({ content, revision }),
})

test('reading or saving an untouched template creates no answer file', async () => {
  const response = await fetch(`${origin}/__workshop/answers/TEST-001`)
  const draft = await response.json()
  assert.equal(draft.exists, false)
  assert.equal((await request('TEST-001', draft.content, null)).status, 200)
  await assert.rejects(stat(path.join(directory, 'answers')), { code: 'ENOENT' })
})

test('first edit creates Markdown; reads and retries preserve its exact bytes', async () => {
  const content = '# TEST-001\n\nAnswer: café — 日本語\n'
  const saved = await request('TEST-001', content, null)
  assert.equal(saved.status, 200)
  const record = await saved.json()
  assert.equal(record.exists, true)
  assert.equal(await readFile(path.join(directory, 'answers/TEST-001.md'), 'utf8'), content)
  assert.equal((await request('TEST-001', content, null)).status, 200)
  const reloaded = await (await fetch(`${origin}/__workshop/answers/TEST-001`)).json()
  assert.equal(reloaded.content, content)
  assert.equal(reloaded.revision, record.revision)
})

test('simultaneous stale saves cannot silently overwrite one another', async () => {
  const results = await Promise.all([request('PAY-001', 'First draft', null), request('PAY-001', 'Other draft', null)])
  assert.deepEqual(results.map(r => r.status).sort(), [200, 409])
})

test('only questions in the deck and same-origin writes are accepted', async () => {
  assert.equal((await request('UNKNOWN-001', 'No', null)).status, 404)
  assert.equal((await request('TEST-001', 'No', null, 'https://example.com')).status, 403)
  assert.equal((await fetch(`${origin}/__workshop/answers/%2e%2e%2fpackage.json`)).status, 404)
})

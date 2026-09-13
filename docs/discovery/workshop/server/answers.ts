import { createHash, randomUUID } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { ANSWER_ENDPOINT, answerTemplate } from '../shared/answers.ts'

const revision = (content: string) => createHash('sha256').update(content).digest('hex')

export function createAnswerMiddleware(directory: string) {
  // Serialize writes so an earlier autosave cannot overwrite a newer response.
  let writes: Promise<void> = Promise.resolve()
  return async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const pathname = new URL(req.url || '/', 'http://localhost').pathname
    if (!pathname.startsWith(ANSWER_ENDPOINT)) return next()
    const send = (status: number, body: object) => {
      res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
      res.end(JSON.stringify(body))
    }
    try {
      const id = pathname.slice(ANSWER_ENDPOINT.length)
      const slides = await readFile(path.join(directory, 'slides.md'), 'utf8')
      const ids = new Set([...slides.matchAll(/^questionId: ([A-Z]+-\d{3,})$/gm)].map(match => match[1]))
      if (!ids.has(id)) return send(404, { error: 'Unknown question.' })
      const file = path.join(directory, 'answers', `${id}.md`)
      const read = async () => {
        try {
          const content = await readFile(file, 'utf8')
          return { content, revision: revision(content), exists: true }
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
          return { content: answerTemplate(id), revision: null, exists: false }
        }
      }
      if (req.method === 'GET') return send(200, await read())
      if (req.method !== 'PUT') return send(405, { error: 'Method not allowed.' })
      // This writer is for the local presentation, not cross-origin submissions.
      if (req.headers.origin !== `http://${req.headers.host}`) return send(403, { error: 'Local presentation origin required.' })
      if (!req.headers['content-type']?.startsWith('application/json')) return send(415, { error: 'JSON required.' })
      const chunks: Buffer[] = []
      let bytes = 0
      for await (const chunk of req) {
        const buffer = Buffer.from(chunk)
        bytes += buffer.length
        if (bytes > 256_000) return send(413, { error: 'Response is too large.' })
        chunks.push(buffer)
      }
      let input: { content?: unknown; revision?: unknown }
      try { input = JSON.parse(Buffer.concat(chunks).toString('utf8')) } catch { return send(400, { error: 'Invalid JSON.' }) }
      if (typeof input.content !== 'string' || !(input.revision === null || typeof input.revision === 'string')) {
        return send(400, { error: 'Content and revision required.' })
      }
      const content = input.content
      const save = async () => {
        const current = await read()
        if (current.revision !== input.revision) {
          // A retry after a lost acknowledgement is safe when the bytes match.
          if (current.content === content && current.exists) return send(200, current)
          return send(409, { error: 'This answer changed elsewhere. Your draft is kept in this browser.' })
        }
        if (!current.exists && content === answerTemplate(id)) return send(200, current)
        await mkdir(path.dirname(file), { recursive: true })
        const temporary = `${file}.${randomUUID()}.tmp`
        await writeFile(temporary, content, 'utf8')
        await rename(temporary, file)
        send(200, { content, revision: revision(content), exists: true })
      }
      const operation = writes.then(save)
      writes = operation.then(() => {}, () => {})
      await operation
    } catch {
      send(500, { error: 'Could not save or load this answer. Your draft is kept in this browser.' })
    }
  }
}

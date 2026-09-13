import { fileURLToPath } from 'node:url'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { defineConfig } from 'vite'
import { createAnswerMiddleware } from './server/answers.ts'

const workshopDirectory = fileURLToPath(new URL('.', import.meta.url))
const snapshotId = '\0virtual:workshop-answers'
let building = false

export default defineConfig({
  plugins: [{
    name: 'workshop-answers',
    configResolved(config) { building = config.command === 'build' },
    resolveId(id) { if (id === 'virtual:workshop-answers') return snapshotId },
    async load(id) {
      if (id !== snapshotId) return
      const answers: Record<string, string> = {}
      if (building) {
        const directory = path.join(workshopDirectory, 'answers')
        const files = await readdir(directory).catch(error => {
          if (error.code !== 'ENOENT') throw error
          return [] as string[]
        })
        for (const file of files.filter(file => /^[A-Z]+-\d{3,}\.md$/.test(file))) {
          answers[file.slice(0, -3)] = await readFile(path.join(directory, file), 'utf8')
        }
      }
      return `export default ${JSON.stringify(answers)}`
    },
    configureServer(server) {
      server.middlewares.use(createAnswerMiddleware(workshopDirectory))
    },
  }],
})

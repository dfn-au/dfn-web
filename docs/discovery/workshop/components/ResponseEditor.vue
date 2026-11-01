<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import savedAnswers from 'virtual:workshop-answers'
import { ANSWER_ENDPOINT, AUTOSAVE_DELAY } from '../shared/answers'

const props = defineProps<{ questionId: string }>()
const container = ref<HTMLElement>()
const status = ref('Loading…')
const error = ref('')
const ready = ref(false)
const conflict = ref(false)
const preview = import.meta.env.PROD
const endpoint = `${ANSWER_ENDPOINT}${props.questionId}`
const draftKey = `dfn-workshop:${props.questionId}`
let content = ''
let savedContent = ''
let revision: string | null = null
let exists = false
let timer: ReturnType<typeof setTimeout> | undefined
let saving = false
let disposed = false
let disposeEditor: (() => void) | undefined

function rememberDraft() {
  try { localStorage.setItem(draftKey, JSON.stringify({ content, revision })) } catch { /* Disk saving still works. */ }
}

async function save() {
  clearTimeout(timer)
  if (!ready.value || saving || conflict.value || content === savedContent || preview) return
  saving = true
  status.value = 'Saving…'
  error.value = ''
  const snapshot = content
  try {
    const response = await fetch(endpoint, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: snapshot, revision }), keepalive: true,
    })
    const result = await response.json()
    if (!response.ok) {
      conflict.value = response.status === 409
      throw new Error(result.error || 'Could not save.')
    }
    revision = result.revision
    exists = result.exists
    savedContent = snapshot
    if (content === savedContent) {
      status.value = exists ? 'Saved' : 'No response yet'
      try { localStorage.removeItem(draftKey) } catch { /* No browser draft available. */ }
    } else {
      rememberDraft()
    }
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'Could not save.'
    status.value = 'Unsaved'
    rememberDraft()
  } finally {
    saving = false
    if (!error.value && content !== savedContent) void save()
  }
}

function reloadSaved() {
  if (content !== savedContent && !window.confirm('Discard this browser draft and load the saved answer? Copy any text you want to keep first.')) return
  localStorage.removeItem(draftKey)
  window.location.reload()
}

function beforeUnload(event: BeforeUnloadEvent) {
  if (!ready.value || content === savedContent) return
  void save()
  event.preventDefault()
  event.returnValue = ''
}

function onVisibilityChange() {
  if (document.visibilityState === 'hidden') void save()
}

onMounted(async () => {
  try {
    const initial = preview
      ? { content: savedAnswers[props.questionId] ?? '', revision: null, exists: props.questionId in savedAnswers }
      : await fetch(endpoint).then(async response => {
          const result = await response.json()
          if (!response.ok) throw new Error(result.error || 'Could not load answer.')
          return result
        })
    savedContent = initial.content
    content = initial.content
    revision = initial.revision
    exists = initial.exists
    let recovered = false
    if (!preview) {
      try {
        const draft = JSON.parse(localStorage.getItem(draftKey) || 'null')
        if (draft && typeof draft.content === 'string' && draft.content !== content) {
          content = draft.content
          recovered = true
          if (draft.revision !== revision) {
            conflict.value = true
            error.value = 'The saved answer and browser draft differ. Copy your draft before reloading the saved answer.'
          }
        }
      } catch { /* Ignore an unavailable or malformed browser draft. */ }
    }
    const { default: setup } = await import('@slidev/client/setup/monaco.ts')
    const { monaco, editorOptions } = await setup()
    if (disposed || !container.value) return
    const model = monaco.editor.createModel(content, 'plaintext')
    const editor = monaco.editor.create(container.value, {
      // Slidev selects a registered theme during setup, including after live updates.
      ...editorOptions, model, automaticLayout: true,
      readOnly: preview, overviewRulerLanes: 0, lineDecorationsWidth: 0,
      scrollbar: { verticalScrollbarSize: 7 },
    })
    const change = model.onDidChangeContent(() => {
      content = model.getValue()
      if (!conflict.value) error.value = ''
      status.value = content === savedContent ? (exists ? 'Saved' : 'No response yet') : 'Unsaved'
      rememberDraft()
      clearTimeout(timer)
      timer = setTimeout(save, AUTOSAVE_DELAY)
    })
    const blur = editor.onDidBlurEditorWidget(() => { void save() })
    editor.addAction({ id: 'workshop-save', label: 'Save response', keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS], run: save })
    disposeEditor = () => { change.dispose(); blur.dispose(); editor.dispose(); model.dispose() }
    ready.value = true
    status.value = preview ? 'Preview only' : recovered ? 'Recovered draft' : exists ? 'Saved' : 'No response yet'
    if (recovered && !error.value) timer = setTimeout(save, AUTOSAVE_DELAY)
    window.addEventListener('beforeunload', beforeUnload)
    document.addEventListener('visibilitychange', onVisibilityChange)
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'Could not load answer.'
    status.value = 'Unavailable'
  }
})

onBeforeUnmount(() => {
  disposed = true
  clearTimeout(timer)
  void save()
  disposeEditor?.()
  window.removeEventListener('beforeunload', beforeUnload)
  document.removeEventListener('visibilitychange', onVisibilityChange)
})
</script>

<template>
  <section class="response-panel" :aria-label="`Response for ${questionId}`">
    <div class="response-heading">
      <span>Response &amp; follow-up</span>
      <span class="save-status" role="status" aria-live="polite">{{ status }}</span>
    </div>
    <div ref="container" class="response-editor" />
    <div v-if="error" class="save-error" role="alert">
      {{ error }}
      <button v-if="ready && !conflict" type="button" @click="save">Retry save</button>
      <button v-else type="button" @click="reloadSaved">Reload saved answer</button>
    </div>
    <div class="response-caption">{{ preview ? 'Preview only · run locally to record answers' : 'Saves automatically after a short pause' }}</div>
  </section>
</template>

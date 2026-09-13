import { defineMonacoSetup } from '@slidev/types'

export default defineMonacoSetup(() => ({
  editorOptions: {
    fontFamily: '"DM Sans Variable", sans-serif',
    fontSize: 16,
    lineHeight: 25,
    wordWrap: 'on',
    lineNumbers: 'off',
    minimap: { enabled: false },
    folding: false,
    glyphMargin: false,
    renderLineHighlight: 'none',
    quickSuggestions: false,
    suggestOnTriggerCharacters: false,
    wordBasedSuggestions: 'off',
    scrollBeyondLastLine: false,
    padding: { top: 16, bottom: 16 },
  },
}))

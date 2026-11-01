import { defineShikiSetup } from '@slidev/types'

export default defineShikiSetup(() => ({
  theme: {
    name: 'dfn-workshop',
    type: 'dark',
    colors: {
      'editor.background': '#282624',
      'editor.foreground': '#f3eee7',
      'editorCursor.foreground': '#f5a078',
      'editor.selectionBackground': '#684333',
      'editor.lineHighlightBackground': '#282624',
      'editorWidget.background': '#302925',
    },
    tokenColors: [],
  },
}))

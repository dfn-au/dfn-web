import tokens from '@slidev/client/.generated/unocss-tokens.ts'

// Supply the array explicitly: Slidev 52.19.1 passes a module namespace to
// UnoCSS for its built-in UI safelist, leaving navigation utilities unstyled.
export default {
  safelist: tokens,
}

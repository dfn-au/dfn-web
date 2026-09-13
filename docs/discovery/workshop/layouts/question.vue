<script setup lang="ts">
defineProps<{
  questionId: string
  section: string
  source?: string
  sourceLabel?: string
}>()
</script>

<template>
  <div class="slidev-layout question-layout">
    <header class="question-meta">
      <span><img src="/brand/logo.png" alt="DFN" class="question-logo" />{{ section }}</span>
      <strong>{{ questionId }}</strong>
    </header>
    <div class="question-columns">
      <section class="question-copy"><slot /></section>
      <ResponseEditor :question-id="questionId" />
    </div>
    <footer class="question-footer">
      <a v-if="source" :href="source" target="_blank" rel="noopener noreferrer">{{ sourceLabel || 'Source question' }} ↗</a>
      <span v-else />
      <span>DFN Website Q&amp;A</span>
    </footer>
  </div>
</template>

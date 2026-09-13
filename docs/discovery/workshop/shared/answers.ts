export const ANSWER_ENDPOINT = '/__workshop/answers/'
export const AUTOSAVE_DELAY = 700

export function answerTemplate(id: string): string {
  if (id === 'TEST-001') {
    return '# TEST-001\n\nEXAMPLE ONLY — not a project decision.\n\n## Response\n\nWelcoming, clear, and easy to navigate.\n\nTry replacing this sentence. Your changes save automatically.\n\nStatus: Example\nConfirmed by/date: Fictional example\n\n## Incorporated into\n\nExcluded — editor practice only.\n'
  }
  return `# ${id}\n\n## Response\n\nAwaiting discussion.\n\n## Follow-up\n\nNone recorded.\n\nStatus: Open\nConfirmed by/date: —\nFollow-up owner: —\n\n## Incorporated into\n\nPending.\n`
}

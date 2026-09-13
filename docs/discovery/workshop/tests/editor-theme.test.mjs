import assert from 'node:assert/strict'
import { test } from 'node:test'
import { chromium } from 'playwright-core'

// Run against `pnpm workshop`; intercept only theme setup, never answer requests.
for (const staleSetup of [false, true]) {
  test(`response editor loads with ${staleSetup ? 'stale' : 'current'} theme setup`, async () => {
    const browser = await chromium.launch({
      executablePath: process.env.BROWSER_EXECUTABLE_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true,
    })
    try {
      const page = await browser.newPage()
      if (staleSetup) {
        await page.route('**/@slidev/setups/shiki', route => route.fulfill({
          contentType: 'application/javascript', body: 'export default []',
        }))
      }
      await page.goto(`${process.env.WORKSHOP_URL || 'http://localhost:3030'}/TEST-001`)
      const slide = page.locator('.slidev-page:visible')
      const status = slide.getByRole('status')
      await status.filter({ hasText: /^(Saved|No response yet|Unavailable)$/ }).waitFor({ timeout: 15_000 })
      const errors = await slide.getByRole('alert').allTextContents()
      assert.deepEqual(errors, [], 'Editor must not fail on an unregistered theme')
      assert.notEqual(await status.innerText(), 'Unavailable')
      await slide.locator('.monaco-editor').waitFor()
    } finally {
      await browser.close()
    }
  })
}

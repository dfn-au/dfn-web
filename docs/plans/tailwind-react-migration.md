# Tailwind to React migration

## Objective

Replace the legacy WordPress/Beaver Builder reference with maintainable React pages and components without losing the verified visual match.

## Current hand-off — 2026-09-05

Continue on `ah/react-tailwind-preview`. Latest implementation commit: `ae48ae6` (`refactor: migrate shared chrome and focus areas to Tailwind utilities`). The implementation was committed with a clean worktree; no push was performed in that batch.

This document is the migration's rolling status and hand-off. Update this section after each batch and append a short entry to the update log below, including the implementation commit, validation, and remaining work. The log was added on 2026-09-05; earlier entries are reconstructed from commits.

### Next batch

Migrate the remaining **home-page sections together**: the static hero, introduction/hover cards, and newsletter signup presentation. Extract maintained, typed React components, replace their builder styling hooks with explicit Tailwind utilities, and update the JSX generator to insert those components. Preserve existing hover/focus styling and add coverage for newly extracted sections. Run focused checks while implementing, then one full acceptance gate for the completed batch—the user prefers larger coherent batches to amortize test time.

Keep this batch on the preview routes. Slider playback, mobile-menu behaviour, signup submission, About tabs, Sanity integration, and production cutover are separate work; do not imply that extracting their markup implements those behaviours. After the remaining home sections, migrate About sections as the next styling batch.

### Where to work

- `apps/web/src/app/tailwind-migration/_components/`: maintained components and their tests. `site-chrome.tsx` owns header/navigation/footer; `home-sections.tsx` owns all four focus areas.
- `apps/web/src/app/tailwind-migration/components.css`: utilities compiled by Next.js for maintained components, with Preflight disabled.
- `apps/web/src/app/tailwind-migration/_generated/`: remaining mechanical JSX snapshots; do not hand-edit without updating the generator.
- `scripts/react-migration/generate-reference-jsx.mjs`: generates only the two `_generated/` pages. It must never overwrite maintained components.
- `scripts/react-migration/check-component-states.mjs`: desktop dropdown and focus-area CTA hover/focus comparisons.
- `scripts/style-parity/`: frozen-reference DOM/computed-style/layout comparator.

### Constraints and known limits

- Extracted chrome and focus areas no longer use builder classes or `data-node` attributes. Remaining generated sections still do; migration is not finished.
- `legacy-max-768:`, `legacy-min-993:`, `legacy-before:`, and similar names in maintained components are Tailwind custom variants for the original breakpoints/pseudo-elements, not Beaver Builder classes.
- Keep the archived stylesheet and asset routes for now: unmigrated sections, fonts, and inherited page defaults still depend on them. Do not enable Preflight yet.
- The current parity gate compares DOM order/tags/text as well as styles and geometry. Preserve wrapper topology during this phase. That is a test constraint, not a permanent requirement to retain the original DOM; deliberate structural simplification needs suitable replacement coverage, not silently weakened assertions.
- Passing computed-style/layout comparisons is not screenshot pixel-diff certification or proof that interactive features work.
- Regenerating JSX must leave maintained components untouched and produce no unexplained generated-page diff. Do not rebuild or modify the frozen original to make a candidate pass.

### Last verified implementation

For `ae48ae6`: lint, typecheck, all 5 component tests, all 4 parity-comparator tests, and production build passed. Production `.fl-page` parity reported zero differences for home and About at 390, 768, 1024, and 1440 pixels (8 cases). All 11 desktop hover/focus state comparisons passed against both development and production. Generator reproducibility and `git diff --check` passed.

No server process should be assumed to survive a hand-off. Start or check the dev server before opening the previews.

## Sources of truth

- `docs/references/legacy-site/site/` is the frozen original.
- `docs/references/tailwind-migration/site/` is the editable, zero-difference Tailwind overlay.
- `/tailwind-migration` and `/tailwind-migration/about` are the React parity checkpoints.
- The production `/` and `/about` routes remain untouched until a later cutover.

The overlay's `fl-*`, `pp-*`, `n2-*`, and `wp-*` classes are temporary migration hooks. They are not the intended component API and are removed only alongside the CSS rules that still depend on them.

## Sequence

1. **Mechanical JSX checkpoint — complete.** Render the exact home and About overlay DOM as server-rendered JSX, serve its archived assets, and compare the `.fl-page` subtree against the frozen reference.
2. **Extract shared chrome — styling complete.** Header, navigation, and footer are maintained React components with explicit Tailwind utilities. Their builder classes, instance attributes, and custom overlay styling hooks have been removed. Current-page styling uses `aria-current`. Mobile menu behaviour remains a separate implementation task.
3. **Extract page sections — in progress.** All four home focus areas render through a typed `FocusAreaSection` with explicit Tailwind utilities and no builder styling hooks. The hero, introduction/cards, signup form, and About sections still need migration.
4. **Retire the compatibility stylesheet — in progress.** `apps/web/src/app/tailwind-migration/components.css` compiles the extracted components through Next.js/PostCSS. The archived stylesheet still supplies fonts, inherited page defaults, and the remaining sections. Keep Preflight disabled until those sections are migrated; do not delete the archived rules yet.
5. **Connect content and cut over.** Map the components to Sanity content, repeat visual/regression checks, then replace the production routes.

## Acceptance gate for every batch

Group related component changes before running the full gate. Use focused checks to resolve failures, then validate the completed batch together.

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:parity`
- visual/computed-style parity for the affected preview subtree at 390, 768, 1024, and 1440 pixels
- `pnpm reference:react-states` for desktop navigation and focus-area CTA hover/focus styles

The remaining generated page snapshots intentionally keep legacy class names. The generator writes only `_generated/`; it must not overwrite maintained components. Direct React rendering and removal of builder styling dependencies are separate milestones.

Run `pnpm dev` in one terminal and `pnpm reference:react-parity` in another to execute the React checkpoint against the frozen reference.

When changing CSS compilation, also run the parity and state checks against a production server, because stylesheet ordering can differ from development. Both CLIs accept `--candidate-url` (use `node scripts/style-parity/cli.mjs` with the same preview/asset prefix arguments as `reference:react-parity`). These checks preserve existing states; they do not certify unimplemented slider, mobile-menu, tabs, or form behaviour.

### Copyable validation commands

Run from the repository root:

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm test:parity
node scripts/react-migration/generate-reference-jsx.mjs
git diff --check
```

Inspect the generator diff: changes should match the intended extraction, and a second run should make no further changes.

For development, start `pnpm dev` in one terminal. In another:

```sh
pnpm reference:react-parity
pnpm reference:react-states
```

For production validation, build and start a separate server:

```sh
pnpm build
pnpm --filter web exec next start --port 3001
```

Then, in another terminal:

```sh
node scripts/style-parity/cli.mjs \
  --candidate-url http://localhost:3001 \
  --candidate-path-prefix /tailwind-migration \
  --candidate-asset-prefix /tailwind-migration/reference \
  --selector .fl-page
node scripts/react-migration/check-component-states.mjs \
  --candidate-url http://localhost:3001
```

Browser checks use installed Google Chrome; set `STYLE_PARITY_CHROME_PATH` if its executable is elsewhere. They start the frozen-reference server themselves. Stop the temporary production server after validation.

## Update log

- **2026-09-05 — `ae48ae6`:** Migrated shared chrome and all four focus areas to explicit Tailwind utilities; removed their builder styling hooks. Added Next.js component utility compilation and 11 state comparisons. Restricted the generator to `_generated/`. Full validation recorded above passed. Remaining: home hero/introduction/cards/signup, About sections, interactive behaviour, stylesheet retirement, content integration, and cutover.
- **2026-09-04 — `41423ee`, `2f5f42c`:** Extracted the first home focus-area section and reused it across the four focus areas. Styling-hook removal followed in `ae48ae6`.
- **2026-09-04 — `8309644`:** Extracted shared header/navigation/footer into React components; final styling-hook removal followed in `ae48ae6`.
- **2026-09-04 — `b369414`:** Added home and About React parity previews as mechanical JSX checkpoints, separate from production routes.
- **2026-09-03 — `9d48344`:** Merged PR #34, establishing the legacy-reference baseline used by this migration.

# Tailwind to React migration

## Objective

Replace the legacy WordPress/Beaver Builder reference with maintainable React pages and components without losing the verified visual match.

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
- visual/computed-style parity for the affected preview subtree at 390, 768, 1024, and 1440 pixels
- `pnpm reference:react-states` for desktop navigation and focus-area CTA hover/focus styles

The remaining generated page snapshots intentionally keep legacy class names. The generator writes only `_generated/`; it must not overwrite maintained components. Direct React rendering and removal of builder styling dependencies are separate milestones.

Run `pnpm dev` in one terminal and `pnpm reference:react-parity` in another to execute the React checkpoint against the frozen reference.

When changing CSS compilation, also run the parity and state checks against a production server, because stylesheet ordering can differ from development. Both CLIs accept `--candidate-url` (use `node scripts/style-parity/cli.mjs` with the same preview/asset prefix arguments as `reference:react-parity`). These checks preserve existing states; they do not certify unimplemented slider, mobile-menu, tabs, or form behaviour.

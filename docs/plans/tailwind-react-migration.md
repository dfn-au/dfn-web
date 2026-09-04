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
2. **Extract shared chrome — complete.** Create semantic header, navigation, and footer components; remove inert builder-instance classes while retaining only the structural compatibility hooks still proven necessary by parity.
3. **Extract page sections — in progress.** The home Education focus area now renders through a typed `FocusAreaSection`; continue replacing the remaining page-specific sections one at a time.
4. **Retire the compatibility stylesheet.** Move surviving Tailwind utilities into the normal application build and delete obsolete class families and rules.
5. **Connect content and cut over.** Map the components to Sanity content, repeat visual/regression checks, then replace the production routes.

## Acceptance gate for every slice

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- visual/computed-style parity for the affected preview subtree at 390, 768, 1024, and 1440 pixels

The first checkpoint intentionally keeps the legacy class names. A slice is complete only when the JSX is directly rendered by React; injecting archived HTML strings is not an acceptable endpoint.

Run `pnpm dev` in one terminal and `pnpm reference:react-parity` in another to execute the React checkpoint against the frozen reference.

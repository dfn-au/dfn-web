# Tailwind Migration Fixture

This directory is the editable overlay used by `pnpm reference:parity`.

The parity server looks for files in `site/` first, then falls back to the
frozen archive configured through `DFN_LEGACY_REFERENCE_REPO`
(and optionally `LEGACY_SITE_REFERENCE_ROOT`). This allows a page to be migrated
without duplicating its images, fonts, or other unchanged assets.

Tailwind Preflight is intentionally disabled because the frozen capture keeps
its browser and legacy computed defaults through explicit utilities. An isolated
full-Preflight experiment changed more than 23,000 computed values at a single
viewport across the two pages, so compensating for it would make this fixture
less deterministic. Generated utilities are unlayered for predictable fixture
specificity.
Automatic source detection is also disabled to keep unrelated project files out
of the fixture build. HTML below `site/` is registered explicitly, while legacy
class names that collide with Tailwind utilities are excluded with
`@source not inline()` in `tailwind.css`.

To start migrating a page, copy its HTML from the frozen archive into the same
relative path below `site/`, then edit only the overlay copy:

- Homepage: `site/index.html`
- About: `site/about/index.html`

Configure the [external frozen archive](../legacy-reference.md) and keep it
unchanged. The parity command starts both local servers
and Chrome automatically:

```sh
pnpm reference:parity
pnpm reference:parity --page home --viewport 390
pnpm reference:parity --selector '.fl-builder-content-18'
```

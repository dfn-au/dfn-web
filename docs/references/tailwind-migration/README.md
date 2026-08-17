# Tailwind Migration Fixture

This directory is the editable overlay used by `pnpm reference:parity`.

The parity server looks for files in `site/` first, then falls back to the
frozen archive in `../legacy-site/site/`. This allows a page to be migrated
without duplicating its images, fonts, or other unchanged assets.

Tailwind Preflight is intentionally disabled because the frozen capture keeps
its browser and legacy computed defaults through explicit utilities. An isolated
full-Preflight experiment changed more than 23,000 computed values at a single
viewport across the two pages, so compensating for it would make this fixture
less deterministic. Generated utilities are unlayered for predictable fixture
specificity.
Automatic source detection is also disabled to prevent legacy class names from
emitting colliding utilities. Add migrated classes to the explicit
`@source inline()` list in `tailwind.css`.

To start migrating a page, copy its HTML from the frozen archive into the same
relative path below `site/`, then edit only the overlay copy:

- Homepage: `site/index.html`
- About: `site/about/index.html`

Keep `../legacy-site/` unchanged. The parity command starts both local servers
and Chrome automatically:

```sh
pnpm reference:parity
pnpm reference:parity --page home --viewport 390
pnpm reference:parity --selector '.fl-builder-content-18'
```

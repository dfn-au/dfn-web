# Tailwind Migration Fixture

This directory is the editable overlay used by `pnpm reference:parity`.

The parity server looks for files in `site/` first, then falls back to the
frozen archive in `../legacy-site/site/`. This allows a page to be migrated
without duplicating its images, fonts, or other unchanged assets.

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

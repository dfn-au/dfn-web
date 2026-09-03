# Legacy Website Reference

Frozen, self-contained renders of the DFN homepage and About page. The files
were captured from the public legacy WordPress site on 2026-06-28 and are kept
as implementation-independent design references.

## Entry Points

- `site/index.html`: captured from `https://dfn.org.au/`
- `site/about/index.html`: captured from `https://dfn.org.au/about/`

## Viewing

- Run `pnpm reference:serve` from the repository root.
- Open `http://127.0.0.1:3011/` or `http://127.0.0.1:3011/about/`.
- Treat the archive as frozen. Do not regenerate it from the current production
  site as part of unrelated implementation work.
- Use `pnpm reference:parity` to compare this archive with the editable Tailwind
  migration overlay in `../tailwind-migration/`.

## Capture Notes

- Source capture command: `wget --page-requisites --convert-links --adjust-extension --no-host-directories --directory-prefix /private/tmp/dfn-legacy-capture https://dfn.org.au/ https://dfn.org.au/about/`.
- Kept visual CSS, local images, local fonts, Font Awesome webfonts, and the Google Oswald font files needed by these two pages.
- Removed executable JavaScript, WordPress speculation rules, analytics, PixelYourSite/Facebook tracking, Google Tag Manager, reCAPTCHA, Cloudflare email/challenge behavior, WooCommerce scripts/order attribution, and currency-switcher behavior.
- Removed nonvisual feed/API/discovery links and WooCommerce-only styles.
- Decoded Cloudflare-protected email placeholders into static `mailto:` links so the footer remains readable without Cloudflare JavaScript.

## Accepted Reference Differences

- Menus, forms, sliders, popups, and tracking integrations are static only.
- The homepage hero slider shows the first captured slide statically because the original slider depended on stripped JavaScript.
- The homepage newsletter signup keeps the visible fields and button but omits reCAPTCHA and submission behavior.
- External navigation and social links still point at the production legacy site.

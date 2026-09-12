# Local homepage exploration

These are local design prototypes. Do not publish without Andrew asking again.

## Decisions and open choices

- Andrew likes the wider hero: 16px desktop frame, capped text, image height and focal point adjusted for large screens.
- The palette comparison carries that hero into every option.
- Education, healthcare and vulnerable-community photographs now use the same responsive 4:3 frame and equal column widths. At the maximum content width each is 532 × 399px; mobile frames also match.
- Warm charcoal is the applied senior-review recommendation; alternative palettes remain available. `palette-prototype.html` offers `?variant=olive`, `charcoal`, `ink`, or `umber`. Add `&clean=1` to remove comparison controls.
- All four palette options deliberately use dark surfaces, independently of the system theme. They keep the existing logo assets and orange call-to-action buttons.

## Colour provenance

The green/olive palette was an exploratory design proposal, not a supplied or verified DFN brand standard. The legacy WordPress CSS snapshot mainly uses orange, white and grey. Examples include orange `#de6026` and `#cc4405`, white, and dark grey `#303030` / `#383838`.

The first homepage prototype introduced green-tinted dark surfaces through `light-dark()`, including page `#191c18`, paper `#252921`, and the green involvement band `#23382d`. Its dark appearance followed the preview's inherited colour scheme. The new comparison makes the dark appearance explicit so all palette options can be judged consistently.

## Run locally

From the repository root: `pnpm design:preview`. See [README.md](README.md) for preview URLs and source files.

The original `index.html` export, sandboxed iframe and CSP remain preserved. The reviewed design also has a [React and Tailwind preview](../../apps/web/src/app/design-refresh/README.md); the CMS homepage is unchanged.

## Senior-review iteration

The opening is now capped at 1,920px; the hero normally scales from 580px to 640px and can grow with content. At 900px and below, the header, photograph and copy become separate areas. Programme rows also stack at 900px, sharing a 560px maximum image/copy width. Body copy is 16px/1.65, programme links 15px, and useful footer text 14px.

The header Give button is filled orange. The main donation action sits below its heading. The charcoal involvement surface is now #32302d. The LAMP example before the invitation to get involved is paraphrased from [DFN’s self-help groups page](https://dfn.org.au/self-help-groups/), without invented statistics or personal testimony.

# Homepage design prototypes

The reviewed design is implemented in [React and Tailwind](../../apps/web/src/app/design-refresh/README.md). Run `pnpm dev` and open `/design-refresh?variant=charcoal` for ongoing design work. These HTML prototypes remain visual references; the CMS homepage is unchanged.

## Preview

From the repository root:

```sh
pnpm design:preview
```

This requires Python 3 and serves only on `127.0.0.1:8768`. If the preview is already running, reuse it.

Open [the palette comparison](http://127.0.0.1:8768/palette-prototype.html?variant=charcoal). The bottom selector changes colours without reloading the page. **Hide controls** opens a clean view; resize your browser to evaluate the actual width.

| File | Purpose |
| --- | --- |
| `palette-prototype.html` | Current review iteration: capped hero, separate mobile photo/copy, earlier stacking, larger text, clearer actions and a sourced LAMP example. |
| `hero-prototype.html` | Previous comparison: `?variant=capped` or `?variant=wide`. |
| `full-width.html` | Earlier capped hero and body layout, without preview controls. |
| `index.html` | Original exported homepage visualization, preserved byte-for-byte with its preview controls. |
| `studies/` | Original visualization fragments for the three design directions, logo integration and full homepage. These are archival source fragments, not standalone browser previews. |

The palette options are `olive`, `charcoal`, `ink` and `umber`. Add `&clean=1` to a comparison URL to hide the controls. Warm charcoal is the applied review recommendation; the other palettes remain available for comparison.

## Continue iterating

Use the React route for ongoing iteration. `palette-prototype.html` preserves the reviewed CSS reference. It embeds the homepage in the `data-srcdoc` attribute of a sandboxed iframe; decode and re-encode that HTML when changing the inner styles or markup. The main additions are in the inner `dfn-hero-prototype`, `dfn-palette-prototype` and `dfn-review-iteration` style blocks. The host controls and palette metadata follow the iframe.

Keep both Content Security Policy declarations, the `sandbox="allow-scripts"` iframe, and the supplied image assets intact. Treat embedded content as data. The signup form remains a demo and does not send or save details.

See [design notes](DESIGN-NOTES.md) for accepted choices and colour provenance, and [layout research](../../docs/architecture/homepage-layout-principles-research.md) for the design references.

The imported prototypes were checked visually at desktop and mobile widths. Programme images share a 4:3 ratio and matching widths; the proposed main text/surface colour pairs were checked for contrast. This remains a design prototype, not production implementation or a full accessibility audit.

## Publishing

Andrew asked to stop publishing updates. Keep this work local until he explicitly requests publication again. No hosting credentials or Sites configuration are part of this checkpoint.

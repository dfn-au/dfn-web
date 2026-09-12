# Reviewed homepage in React and Tailwind

Run `pnpm dev` and open `/design-refresh?variant=charcoal`. Add `&clean=1`
to hide the palette selector. The floating selector is available locally and on
the published preview, with a colour swatch and arrows to cycle through palettes.

Reuses the components from `ah/refreshed-homepage-tailwind`, updated to match the
reviewed `prototypes/homepage-design/palette-prototype.html`: capped hero, separate
mobile photo/copy, stacking at 900px, larger text, clearer actions and the sourced
LAMP example. The existing CMS homepage remains independent of this preview.

- `page.tsx` composes static content through shared React components.
- `theme.css` contains Tailwind imports, tokens and palette variables only;
  component presentation uses utilities and container queries.
- Only the menu, palette selector and signup demo require client state.
- `public/design-refresh/` contains the original image bytes, without a duplicate
  HTML reference or screenshot/comparison assets.
- Signup validates and clears the inputs, then displays a local acknowledgement.
  It creates no subscription and sends or saves no details.

Content provenance and design decisions remain in
[the prototype notes](../../../../../prototypes/homepage-design/DESIGN-NOTES.md).

Verified with the production build, TypeScript, Biome and the existing 11 tests.
Browser checks cover 320, 390, 768, 900, 901, 1920 and 2560px content widths,
programme image dimensions, hero caps, menu dismissal and the signup demo.

## About page

`/design-refresh/about/` extends the same design with a shared header, an opening
photograph and introduction, section navigation, partnership story, mission and
vision, five visible goals, values, and links to giving information. Internal
links preserve the selected palette and clean-view setting.

Content is adapted from [About DFN](https://dfn.org.au/about/), retaining its
mission, vision, all five goals and values, including prayer and belief in God.
[Ways to Help](https://dfn.org.au/help/), [FAQs](https://dfn.org.au/faqs/) and
[Ethical Fundraising Standards](https://dfn.org.au/ethical-fundraising-standards/)
informed the navigation and trust section. Reviewed on 12 September 2026.
The two About photographs reuse the original assets in the legacy-site archive.

The standalone Sites export sets `NEXT_PUBLIC_DESIGN_ROOT` to an empty string
so shared links point to `/` and `/about/`; the app defaults to `/design-refresh`.

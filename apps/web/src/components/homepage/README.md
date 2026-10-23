# Homepage content

`/` renders the `homePage` Sanity singleton with shared components and theme in
`components/site`. Its public root layout and shared header/footer also serve
general content pages such as `/privacy`. Public components receive authored
content explicitly.

In Studio, **Home Page** contains homepage content, header/footer copy and search
appearance. **Areas of work** is an ordered array: add, remove or reorder items
there. Navigation and numbering follow that array. Areas use a photograph or
pathways; layout, palettes, typography and responsive rules remain in code.
Update phrases such as “Four areas” if the number changes. Newlines in headlines
produce intentional line breaks. Programme and featured-example Body fields use
a single rich-text editor with paragraphs, bold and italic. Photographs support
alternative text, crop and hotspot editing. Office addresses use plain rich text
with no formatting controls; Shift+Enter adds an address line. Header, footer
and legal navigation are ordered lists. Header items have either a destination
or one level of child links; optional introductions and text group labels support
the grouped panels. Direct links such as About DFN and Contact belong in the same
navigation list. Navigation and the Give destination are shared across desktop
and mobile.
Unfinished link destinations can use `#`.

The content objects are separately named schema types so they can later be used
in a section builder. The current homepage composition remains fixed.

## Selected defaults

Pages without preview parameters use Existing DFN site headings, Andada Regular
body text, Vinyl uppercase buttons and small labels, white text on guide-orange
buttons, guide sector icons and the original logo size. The colour palette remains
Warm charcoal. The preview panel stays available, including every original option.
`previewDefaults` in `site/brand-preview.ts` is shared by URL parsing, controls and
navigation. Missing or invalid values use these defaults; explicit `current` values
still select the original design. Returning a control to its default removes that
parameter from the URL. Explicit alternatives survive refresh and navigation.

## Brand colour comparison

The collapsible bottom-right preview panel explains each comparison and offers **Original**, **Dark text** and **White text**.
The latter two use the 2018 guide's web orange (`#DE6026`) for action buttons.
The logo panels keep their existing website orange (`#EF5600`). Footer text,
dark backgrounds, peach accents, logo artwork and layout stay the
same. Peach accents remain because the guide's orange does not meet normal
text contrast on several dark surfaces.

White text on guide orange is a visual-review option with 3.62:1 contrast;
the dark-text option meets 4.5:1 across all palettes. White text is the selected default. `?brand=current` restores the original colours. `?brand=proposed` opens dark text, and `?brand=white-text` opens white
text. The choice survives refresh, palette changes, hiding controls (`clean=1`)
and public-page navigation. Switching uses browser history replacement, so it
keeps scroll position and form input. The corner **Design preview** button reopens collapsed controls (`clean=1`).
The panel keeps its header visible while its settings scroll on smaller screens.

## Heading comparison

The independent **Headings** control compares current typography with **Existing
DFN site**. The homepage banner (`hero-title`) uses Andada Regular with synthetic
bold, matching the existing banner. Page titles and other semantic headings use Vinyl Regular in uppercase,
matching the existing homepage and About page. Marked small labels keep their
separate control.
Body copy, navigation, buttons and editorial quotes keep their existing fonts.
Sizes, line heights, spacing and authored line breaks stay the same; the fonts
and capitalisation can change wrapping. This reproduces the existing website’s
heading roles.

**Battersea Slab** (`?headings=battersea`) uses the guide's primary heading and
subheading font, Battersea Slab SemiBold, at its actual 600 weight. It applies to
semantic headings including the home banner, preserving authored case. Small
headings marked `data-brand-label` belong to the separate label comparison.
Body copy, navigation, buttons and display quotes keep their own fonts.

`?headings=existing` selects the comparison; omitting it uses the same default. `?headings=current` restores Fraunces.
Retired `?headings=arial` links resolve to the selected default. The heading choice
survives refresh, public-page navigation and hiding controls, and combines
independently with button colours and the background palette.

The font files in `public/fonts` were retrieved unchanged from the existing DFN
website on 16 October 2026:

- [Andada Regular](https://dfn.org.au/wp-content/uploads/2024/10/Andada-Regular.otf)
- [Vinyl](https://dfn.org.au/wp-content/uploads/2024/10/vinyl.ttf)

Battersea Slab SemiBold was retrieved unchanged from
[DFN UK](https://www.dfn.org.uk/themes/custom/b5subtheme/fonts/BatterseaSLAB-SemiBold.woff)
on 18 October 2026. The project owner confirmed the existing licence covers this
use. SHA-256: `05ef280eda600d64f4db3cceb3281f560f42486b0e470d738db427e1a448ff16`.


## Logo sizing comparison

**Guide logo size** (`?logo=guide`) gives the header and mobile-menu logo 120px
of artwork width with 12px clear space on every side, making the orange panel
144px wide. The guide requires a minimum artwork width of 110px and clear space
of twice the tagline height. The supplied SVG's tagline is 65.872 units high
against an artwork width of 1345.677 units, so the required space at 120px is
11.75px. Artwork, colour and aspect ratio are unchanged. Desktop header and
footer sizes already meet the minimum and are preserved. This toggle persists
with the other preview choices; omitting `logo` restores the current sizing.

## Light palette comparison

**Guide light** (`?variant=guide-light`) interprets the guide's light website
examples using white reading sections, pale neutral cards, guide dark grey
(`#404743`) text and secondary blue (`#1D5A7C`) accents. It is a preview direction,
not a claim that the guide mandates white backgrounds. The photo hero keeps its
dark backdrop and white copy, including the mobile layout. Logo panels keep the
original website orange. Page headers, menus, focus indicators, form borders and
native control colour schemes adapt to light surfaces. Dark button labels stay
dark even though the page background is now white. Typography and button-colour
choices remain independent. The white-on-orange contrast limitation still applies.

## Body text comparison

**Body text** independently compares **DM Sans (original)** with **Andada Regular**
(`?body=andada`). It uses the same Andada file as the existing-site banner option.
Paragraphs, prose lists, captions, descriptions, addresses and body blockquotes
participate; headings, display quotes, navigation, buttons and form fields keep
their own fonts. Inline emphasis remains bold/italic. Font sizes, line heights,
spacing and maximum-width rules are unchanged; different glyphs change wrapping.
The selection persists alongside headings, button colours and palettes through
refresh, public links and hidden controls. Omitting `body` uses Andada; `?body=current` restores DM Sans.

Unfinished page links are `#`; Privacy is connected to `/privacy`. In-page navigation and phone/email links work.
Signup verifies Turnstile on the server and logs accepted details; it does not
create a newsletter subscription yet. See [signup setup](../site/signup.md).

See [general content pages](../page-sections/README.md) for section editing and
content provenance. One-off development imports are not kept in the repository.

## Checks

Run `pnpm test`, `pnpm lint`, `pnpm typecheck` and `pnpm build` from the repository
root. Unit tests cover three/four/five-area reordering, stable anchors and
authored content changes.

## Button and label typography

**Buttons and small labels** compares Original with **Vinyl uppercase**
(`?labels=vinyl`). Only action buttons marked by `brand-action` and small section
labels marked by `data-brand-label` participate. This includes Give and newsletter
Sign up, but excludes menu controls, navigation links, form labels and prose.
Vinyl uses its supplied regular face, uppercase and 0.025em tracking. Small labels
use 13px for readability; button sizes remain unchanged. This comparison is
independent of heading and body fonts and survives navigation and collapse.
Vinyl is the default; `?labels=current` restores the original fonts.

## Sector icon comparison

**Sector markers** compares Numbers with **Guide icons** (`?icons=guide`) on the
homepage, in the area links and programme labels. Guide icons are the default;
`?icons=current` restores numbers. SVGs in `public/icons/dfn` retain
the vector paths extracted from page 16 of the 2018 brand guide. Only fill colour
is inherited from the palette through CSS masks. Text labels stay visible; the
icons are decorative to assistive technology.

`SectorMarker` maps stable programme IDs to artwork, independent of ordering or
editable labels. The women programme uses the guide's trafficking-prevention
broken-chain icon. Additional programmes retain their numbers until an appropriate
icon is supplied. Other numbered lists are unaffected. No wording changes are
part of these style comparisons.

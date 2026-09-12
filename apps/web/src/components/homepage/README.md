# Homepage content

`/` renders the `homePage` Sanity singleton with the reviewed design-refresh
components and theme. Its public root layout and shared header/footer also serve general content
pages such as `/privacy`. `/design-refresh` and `/design-refresh/about` retain their static
preview content and links. Their static copy lives in
`app/design-refresh/preview-content.ts`; the public components receive authored
content explicitly and do not import preview defaults.

In Studio, **Home Page** contains homepage content, header/footer copy and search
appearance. **Areas of work** is an ordered array: add, remove or reorder items
there. Navigation and numbering follow that array. Areas use a photograph or
pathways; layout, palettes, typography and responsive rules remain in code.
Update phrases such as “Four areas” if the number changes. Newlines in headlines
produce intentional line breaks. Programme and featured-example Body fields use
a single rich-text editor with paragraphs, bold and italic. Photographs support
alternative text, crop and hotspot editing. Office addresses use plain rich text
with no formatting controls; Shift+Enter adds an address line. Header, footer
and legal navigation are ordered lists of labels and destinations. Header links
can be marked mobile-only. New destinations default to `#`.

The content objects are separately named schema types so they can later be used
in a section builder. The current homepage composition remains fixed.

Unfinished page links are `#`; Privacy is connected to `/privacy`. In-page navigation and phone/email links work. Signup retains
the local demo: native validation, cleared inputs and an explicit acknowledgement
that no subscription was created. It makes no submission request.

See [general content pages](../page-sections/README.md) for section editing and
content provenance. One-off development imports are not kept in the repository.

## Checks

Run `pnpm test`, `pnpm lint`, `pnpm typecheck` and `pnpm build` from the repository
root. Unit tests cover three/four/five-area reordering, stable anchors and
authored content changes.

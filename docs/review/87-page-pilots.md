# How we work and Reports: editorial rehearsal

Prepared 19 November 2026 for [#87](https://github.com/dfn-au/dfn-web/issues/87). Kat owns content approval. This is a review of page composition and the reusable download list; it does not publish either page.

## Current design direction

Revised on 19 November 2026 after Andrew clarified that his concern about “Respect and care” was its visual treatment. Keep the section. The page now uses an introduction with a photo, three equal columns explaining local partners / DFN / supporters, a full-width Statement panel for respect and care, and one Reports action. The short page no longer needs an On this page menu. All four sections already exist in the Page builder.

Retain warm charcoal, Fraunces headings, Andada body text and original labels, following [Kat’s reviewed preferences](https://github.com/dfn-au/dfn-web/pull/75#issuecomment-6434735501). Those later preferences supersede the earlier unapproved experiment; the light palette remains an optional comparison, not the selected direction.

The revised wording draws on the [existing homepage’s locally led approach](https://dfn.org.au/) and the [About page’s dignity, freedom and equal-worth values](https://dfn.org.au/about/), read on 19 November 2026, within Kat’s newer communication constraints. It is newly drafted copy for review, not a quotation or final approval. “Every person has worth and dignity” is a paraphrase of the existing dignity value. The protection paragraph retains the original meaning.

Also considered: merely enlarging the old rich-text heading would leave it isolated; a new component is unnecessary because the existing Statement block supports the two-column treatment. Changing to a light theme would disregard Kat’s selected palette.

## Open the pilots

From this checkout, run:

```sh
pnpm install --frozen-lockfile
pnpm --filter web review:pages
```

Open [How we work](http://localhost:3100/how-we-work?clean=1) and [Reports](http://localhost:3100/reports?clean=1). Port 3100 is fixed because the sample download URLs use it. Stop the server with Ctrl-C when finished.

The separate application in `apps/web/review` uses the real `PAGE_QUERY`, `ContentPage` and section renderer against `fixtures.json`. It has no Sanity client, dataset writes, sign-in or analytics integration. Its image builder always returns a neutral placeholder. The normal website build does not serve its pages or assets. Public logo and font files are reused through relative symlinks. The sample PDFs contain only a rehearsal label, filename and a statement that they contain no financial or impact claims.

The local fixture preview is separate from Sanity Presentation. A signed-in Studio check also passed on 19 November 2026 in the private `issue87-review` dataset: two ordinary Pages were created through Studio, a file and URL entry were added, entries were dragged into a different order, and an edited title appeared in the live preview. The complete fixture compositions were then loaded into those existing draft documents using uploaded synthetic assets. Both full Pages rendered in Presentation, including the single undated booklet, and How we work's action opened Reports. The dataset contains only two draft Pages and no published Pages. Production content remains untouched.

To repeat the live check, configure the normal local application for that private dataset, an authorised Sanity read token and `http://localhost:3100` as the Studio/preview origin. Run `pnpm --filter web exec next dev --hostname 127.0.0.1 --port 3100` and open `/admin/studio`. Do not run the fixture application on that port at the same time. The private dataset has no global site content, so its live preview demonstrates page sections rather than the complete site navigation.

## Reproduce the compositions in Studio

Use a separate review dataset. Create two ordinary **Pages**, choose **Australia and New Zealand** as their Publishing Scope, and use the titles and slugs below. Leave them as drafts during editorial review. The fixture IDs are local test identities, not IDs to import into Sanity. The review drafts use `/reports` in the existing action URL field because the Page picker lists published Pages. Once publication is approved, select the Reports Page there to keep the link tied to its slug.

| Page | Sections, in order | Review purpose |
| --- | --- | --- |
| How we work (`how-we-work`) | Introduction with image; Values (local partners, DFN, supporters); Statement (Respect and care); Call to action | Explain local ownership and DFN's supporting role, then link to Reports. |
| Reports (`reports`) | Page title; Rich text; On this page; Download list: Annual reports; Download list: About our work | Demonstrate an ordered report library and a single booklet using the same section. |

All sample field values are in `apps/web/review/fixtures.json`. The source is readable JSON in the same shape as authored Sanity documents. Use the sample copy as a draft, not as approved publication text. Replace the placeholder with an approved uploaded image and the sample files with approved uploaded reports or permanent public resource URLs. Never import the synthetic asset references or localhost links.

For each **Download list**, enter a heading and optionally an introduction and section navigation label. Add **Downloads** entries with a readable title, either **File** or **Existing resource URL**, and a publication date only when known. Do not enter both destinations. Drag entries to set the visible order; dates do not sort the list. File formats are shown from uploaded asset metadata. Existing URLs say “Open resource” because a URL does not reliably identify its format. Resources open in the same tab, allowing the browser to display or download them according to the file server's response.

Rehearse adding an entry, changing its title, moving it before another entry, removing it, and previewing the result. Open every link. Check that a single booklet still reads as a list of one. Use Tab and Enter and a narrow viewport; the title remains part of each link's accessible name.

## Preview evidence

Captured from the isolated fixture application on 19 November 2026:

- [How we work, desktop](87-evidence/how-we-work-desktop.jpg) and [390px mobile](87-evidence/how-we-work-mobile.jpg).
- [Reports, desktop](87-evidence/reports-desktop.jpg) and [390px mobile](87-evidence/reports-mobile.jpg).

The following signed-in evidence records the earlier composition and authoring checks; the current design is shown in the desktop/mobile screenshots above. Private-dataset evidence: [How we work in Presentation](87-evidence/studio-how-we-work.jpg), [Reports in Presentation](87-evidence/studio-reports.jpg) and [reordered download entries](87-evidence/studio-reports-reordered.jpg).

## Copy, files and image sources

| Material | Source and status | Kat's review |
| --- | --- | --- |
| Page intent and local ownership/funding distinction | [Kat's proposed launch brief](https://github.com/user-attachments/files/34295870/dfn-proposed-launch-sitemap.md), sections 4, 7 and 8; proposal attached to [#7](https://github.com/dfn-au/dfn-web/issues/7). Read in full on 19 November 2026. | Confirm the draft describes DFN's role accurately and supplies enough detail. All pilot sentences are newly written for this rehearsal. |
| How we work copy | New draft based on that brief and the current public Home/About pages, with only broad South Asia geography. No personal stories, named institutions, precise locations, statistics or funding amounts. | Review the headline, programme terminology, partnership explanation and privacy wording against the full communications guidance. |
| Annual report titles/dates and booklet | Invented, explicitly labelled samples. No legacy report has been copied, linked or cleared for republication. | Select the actual files; verify title, reporting period, publication date, country eligibility and all content inside each file before upload. Leave dates blank when unknown. |
| How we work image | Neutral SVG placeholder made for the rehearsal. No documentary image or private source URL is included. | Approve a relevant photo, crop, caption, alt text and permission before replacing it. Photography selection belongs to [#88](https://github.com/dfn-au/dfn-web/issues/88). |

### Image slot

Use **Introduction with image**, beside “Local people lead the way”. The existing block uses a 6:5 frame on desktop and 4:3 on mobile. The revised layout replaces the earlier 3:2 slot. Review the provisional selection at both crops before approval, retaining the relevant people, hands and activity. There is no text over the photograph.

The photography worker has a provisional private selection and context questions under #88. It is not approved for publication. Its private reference and permission checks are in the local photography handoff; they are deliberately absent from this repository and preview. Do not label a photograph as a particular partner's work or attach it to a person's story unless that context is confirmed. Write alt text from visible content; review any readable signs or badges and the exported filename/metadata as well as the caption.

Reports needs no editorial photo. File covers, if later added, would still need the same content review as the complete report.

## Verification and acceptance limits

- Both full fixture Pages pass Sanity schema validation. Download validation rejects missing titles, missing/both destinations, non-web URLs, invalid dates and empty lists.
- The actual GROQ query and renderer preserve edited list order, resolve uploaded file references, retain exact external URLs and show optional dates. An unresolved uploaded file does not revive a stale URL. Both AU and NZ query paths are covered.
- The local browser rehearsal checked both pages on a narrow 390px viewport and desktop. No horizontal overflow was observed. Keyboard focus followed report order; Enter reached the selected PDF URL. Menu opening, Escape/focus return and How we work's Reports action worked.
- All three local sample resource URLs and all three uploaded synthetic resource URLs returned HTTP 200 and `application/pdf`. The uploaded files also have the expected PDF signature. The in-app browser reached the PDF URL but did not display its contents; this is not evidence of an embedded PDF viewer.
- Type checking, lint and the five targeted test files are the local checks. The full suite stays with CI.

Editorial approval, actual report-file review, the full communications source check, final navigation, publication and rollout remain open. Keep the pilot under #87 until its remaining acceptance checks are recorded. Broader migration and launch decisions stay with [#7](https://github.com/dfn-au/dfn-web/issues/7) and [#8](https://github.com/dfn-au/dfn-web/issues/8).

Also considered: rich-text links lack file selection and date fields; a standalone Report document is unnecessary for this first library. A preview route in the normal website would mix sample content with deployable routes, so the rehearsal runs as a separate local application.

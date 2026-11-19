# How we work and Reports: editorial rehearsal

Prepared 19 November 2026 for [#87](https://github.com/dfn-au/dfn-web/issues/87). Kat owns content approval. This is a review of page composition and the reusable download list; it does not publish either page.

## Open the pilots

From this checkout, run:

```sh
pnpm install --frozen-lockfile
pnpm --filter web review:pages
```

Open [How we work](http://localhost:3100/how-we-work?clean=1) and [Reports](http://localhost:3100/reports?clean=1). Port 3100 is fixed because the sample download URLs use it. Stop the server with Ctrl-C when finished.

The separate application in `apps/web/review` uses the real `PAGE_QUERY`, `ContentPage` and section renderer against `fixtures.json`. It has no Sanity client, dataset writes, sign-in or analytics integration. Its image builder always returns a neutral placeholder. The normal website build does not serve its pages or assets. Public logo and font files are reused through relative symlinks. The sample PDFs contain only a rehearsal label, filename and a statement that they contain no financial or impact claims.

This local preview is not a Sanity Presentation session. Automated checks exercise Sanity's actual schema validation, editing/reordering the stored page values, the public query and the rendered links. A signed-in Studio create/edit/reorder/Presentation check in an isolated dataset remains required before marking the rehearsal fully accepted. No isolated dataset or write credential was provided; the production dataset has not been used for this rehearsal.

## Reproduce the compositions in Studio

Use a separate review dataset. Create two ordinary **Pages**, choose **Australia and New Zealand** as their Publishing Scope, and use the titles and slugs below. Leave them as drafts during editorial review. The fixture IDs are local test identities, not IDs to import into Sanity. Select the new Reports Page in the How we work action after both exist.

| Page | Sections, in order | Review purpose |
| --- | --- | --- |
| How we work (`how-we-work`) | Page title; Rich text; On this page; Text with image; Numbered items; Rich text; Call to action | Explain local ownership and DFN's supporting role, then link to Reports. |
| Reports (`reports`) | Page title; Rich text; On this page; Download list: Annual reports; Download list: About our work | Demonstrate an ordered report library and a single booklet using the same section. |

All sample field values are in `apps/web/review/fixtures.json`. The source is readable JSON in the same shape as authored Sanity documents. Use the sample copy as a draft, not as approved publication text. Replace the placeholder with an approved uploaded image and the sample files with approved uploaded reports or permanent public resource URLs. Never import the synthetic asset references or localhost links.

For each **Download list**, enter a heading and optionally an introduction and section navigation label. Add **Downloads** entries with a readable title, either **File** or **Existing resource URL**, and a publication date only when known. Do not enter both destinations. Drag entries to set the visible order; dates do not sort the list. File formats are shown from uploaded asset metadata. Existing URLs say “Open resource” because a URL does not reliably identify its format. Resources open in the same tab, allowing the browser to display or download them according to the file server's response.

Rehearse adding an entry, changing its title, moving it before another entry, removing it, and previewing the result. Open every link. Check that a single booklet still reads as a list of one. Use Tab and Enter and a narrow viewport; the title remains part of each link's accessible name.

## Copy, files and image sources

| Material | Source and status | Kat's review |
| --- | --- | --- |
| Page intent and local ownership/funding distinction | [Kat's proposed launch brief](https://github.com/user-attachments/files/34295870/dfn-proposed-launch-sitemap.md), sections 4, 7 and 8; proposal attached to [#7](https://github.com/dfn-au/dfn-web/issues/7). Read in full on 19 November 2026. | Confirm the draft describes DFN's role accurately and supplies enough detail. All pilot sentences are newly written for this rehearsal. |
| How we work copy | Short paraphrases of that brief. No personal stories, named institutions, locations, statistics or funding amounts. | Review the headline, programme terminology, partnership explanation and privacy wording against the full communications guidance. |
| Annual report titles/dates and booklet | Invented, explicitly labelled samples. No legacy report has been copied, linked or cleared for republication. | Select the actual files; verify title, reporting period, publication date, country eligibility and all content inside each file before upload. Leave dates blank when unknown. |
| How we work image | Neutral SVG placeholder made for the rehearsal. No documentary image or private source URL is included. | Approve a relevant photo, crop, caption, alt text and permission before replacing it. Photography selection belongs to [#88](https://github.com/dfn-au/dfn-web/issues/88). |

### Image slot

Use **Text with image**, after the introduction and section navigation, beside “Led by local partners”. The current block uses a 3:2 frame on desktop and mobile. Prefer a scene that shows people doing or sharing practical work, with enough space to retain the relevant people, hands and activity in that crop. Keep a plain text opening rather than forcing the photograph into a banner.

The photography worker has a provisional private selection and context questions under #88. It is not approved for publication. Its private reference and permission checks are in the local photography handoff; they are deliberately absent from this repository and preview. Do not label a photograph as a particular partner's work or attach it to a person's story unless that context is confirmed. Write alt text from visible content; review any readable signs or badges and the exported filename/metadata as well as the caption.

Reports needs no editorial photo. File covers, if later added, would still need the same content review as the complete report.

## Verification and acceptance limits

- Both full fixture Pages pass Sanity schema validation. Download validation rejects missing titles, missing/both destinations, non-web URLs, invalid dates and empty lists.
- The actual GROQ query and renderer preserve edited list order, resolve uploaded file references, retain exact external URLs and show optional dates. An unresolved uploaded file does not revive a stale URL. Both AU and NZ query paths are covered.
- The local browser rehearsal checked both pages on a narrow 390px viewport and desktop. No horizontal overflow was observed. Keyboard focus followed report order; Enter reached the selected PDF URL. Menu opening, Escape/focus return and How we work's Reports action worked.
- All three sample resource URLs returned HTTP 200 and `application/pdf`. The in-app browser reached the PDF URL but did not display its contents; this is not evidence of an embedded PDF viewer.
- Type checking, lint and the five targeted test files are the local checks. The full suite stays with CI.

Editorial approval, actual report-file review, the full communications source check, real Studio/Presentation verification, final navigation, publication and rollout remain open. Keep the pilot under #87 until its remaining acceptance checks are recorded. Broader migration and launch decisions stay with [#7](https://github.com/dfn-au/dfn-web/issues/7) and [#8](https://github.com/dfn-au/dfn-web/issues/8).

Also considered: rich-text links lack file selection and date fields; a standalone Report document is unnecessary for this first library. A preview route in the normal website would mix sample content with deployable routes, so the rehearsal runs as a separate local application.

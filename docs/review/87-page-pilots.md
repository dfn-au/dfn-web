# How we work and Reports: Sanity review

Prepared 19 November 2026 for [#87](https://github.com/dfn-au/dfn-web/issues/87). Kat owns content approval. Both Pages are unpublished drafts in the private `issue87-review` dataset. Copy, images, section selection and ordering are edited in Sanity. Git contains the reusable components, tests and dated review evidence.

## Open and edit the pages

Configure the normal website locally with project `bt057kcd`, dataset `issue87-review`, an authorised Sanity read token, and `http://localhost:3100` as the Studio/preview origin. Set the initial preview URL to `http://localhost:3100/how-we-work?clean=1` because this isolated dataset has no homepage or global navigation content. Keep credentials in ignored local environment configuration.

```sh
pnpm install --frozen-lockfile
pnpm --filter web exec next dev --hostname 127.0.0.1 --port 3100
```

Open [Sanity Studio](http://localhost:3100/admin/studio), sign in, and use **Presentation**. Alternatively, open **Structure > Pages**, select a Page, then use its page-location link to open Presentation. Preview enables draft mode; a plain public URL without that preview session correctly returns 404 for these unpublished Pages. **Open preview** displays the page outside the editor after draft mode is enabled. Do not publish either Page for review.

The old separate fixture application has been removed. There is no copy of the editorial Pages in source code and no special public review route. The small synthetic dataset in `src/test/fixtures/downloads.json` exists only for automated download-component tests. It is not a source for website content.

## Current compositions

| Page | Existing sections, in order | Purpose |
| --- | --- | --- |
| How we work (`how-we-work`) | Introduction with image; Values; Statement; Call to action | Introduce locally led work, explain local partners / DFN / supporters, give Respect and care a distinct panel, and link to Reports. |
| Reports (`reports`) | Page title; Rich text; Download list: Annual reports; Download list: About our work | Show an ordered report library and a single undated booklet using the same reusable section. |

Both Pages have Australia and New Zealand selected as Publishing Scope. How we work uses `/reports` in the existing action URL field because the Page picker lists published Pages. After publication is approved, select the Reports Page there to keep the link tied to its slug.

For a Download list, enter a heading and optionally an introduction and section navigation label. Add entries with a readable title, either **File** or **Existing resource URL**, and a publication date only when known. Do not enter both destinations. Drag entries to set their visible order; dates do not sort the list. The report title is the link. Its publication date and known file format sit on the right on wide screens and below the title on phones. Links open in the same tab, letting the file server and browser determine whether to display or download the resource.

On 26 November, Andrew requested a simpler mobile layout. Reports now opens with a one-sentence introduction and the newest annual report first. The Statement block uses Respect and care as the label above the dignity headline and the existing privacy paragraph.

## Design and copy evidence

On 19 November, Andrew clarified that his concern about Respect and care was visual, not an objection to its copy. The revision retains the section and pairs its practical protection paragraph with a larger dignity statement in the existing Statement block. Three equal-width columns explain the roles of local partners, DFN and supporters. The shorter page no longer needs section navigation.

The design retains warm charcoal, Fraunces headings, Andada body text and original labels, following [Kat’s selected preferences](https://github.com/dfn-au/dfn-web/pull/75#issuecomment-6434735501). Those later preferences supersede the earlier unapproved experiment. The light palette remains an optional comparison.

| Material | Source and status | Remaining review |
| --- | --- | --- |
| Page purpose and local ownership/funding distinction | [Kat’s proposed launch brief](https://github.com/user-attachments/files/34295870/dfn-proposed-launch-sitemap.md), sections 4, 7 and 8; attached to [#7](https://github.com/dfn-au/dfn-web/issues/7). Read in full on 19 November 2026. | Kat confirms the wording accurately describes DFN’s role. |
| How we work wording and voice | New draft using that brief, the [existing homepage](https://dfn.org.au/) and [About page](https://dfn.org.au/about/), read on 19 November 2026. The dignity statement paraphrases the existing equal-worth value. No personal stories, precise locations, statistics or funding amounts. | Review against the full Security Statement_2026 and 2026 Sponsorship terminology documents. Legacy publication does not make a statement current or approved. |
| Report titles, dates and booklet | Invented samples. The uploaded PDFs contain only rehearsal labels and no financial or impact claims. | Select and review actual files, title, reporting period, publication date, country eligibility and all file contents. Leave unknown dates blank. |
| Photograph | On 26 November the placeholder was removed from the draft. The opening pairs its headline with the introduction until an approved photograph is selected. | [#88](https://github.com/dfn-au/dfn-web/issues/88) owns selection, context, permission, caption, alt text and crop approval. |

When an image is selected, the Introduction with image block uses a 6:5 frame on desktop and 4:3 on mobile. Review the provisional photography selection at both crops, retaining relevant people, hands and activity. There is no text over the photo. Private photo references and permission questions stay in the local photography handoff, outside this repository. Reports needs no editorial photo.

Also considered: enlarging the old rich-text heading would leave the section isolated; the existing Statement block provides the needed treatment without a new component. A second preview application duplicated authored content, so review now uses the normal Sanity draft flow. Plain rich-text links lack file/date authoring; a separate Report document is unnecessary for this first library.

## Verification and screenshots

- Sanity authoring, uploaded-file selection, URL entries, dragging to reorder, title edits and live Presentation were exercised in the private dataset on 19 November. Neither Page has been published.
- The actual schema, GROQ query and renderer are covered by targeted tests for file/URL rules, edited order, optional dates, both countries and unresolved files. Current editorial copy is checked in Sanity rather than asserted in code tests.
- Desktop and 390px mobile review found no horizontal overflow. Keyboard report activation and the How we work Reports action worked. The three uploaded synthetic resources returned HTTP 200, `application/pdf` and the PDF signature. The in-app browser did not display PDF contents; no embedded viewer claim is made.
- Local type checking, lint and affected tests pass. The full test suite and production build run in CI.

Dated design evidence from the earlier isolated application: [How we work desktop](87-evidence/how-we-work-desktop.jpg), [How we work mobile](87-evidence/how-we-work-mobile.jpg), [Reports desktop](87-evidence/reports-desktop.jpg), [Reports mobile](87-evidence/reports-mobile.jpg). These screenshots are historical evidence, not the content source.

Sanity evidence: [How we work in Presentation](87-evidence/studio-how-we-work.jpg), [Reports in Presentation](87-evidence/studio-reports.jpg), [reordered download entries](87-evidence/studio-reports-reordered.jpg). The reordering screenshot records the earlier authoring exercise.

Editorial approval, real report-file review, the full communications check, photography, final navigation, publication and rollout remain open. Keep #87 open until its remaining acceptance is recorded. Broader migration and launch decisions stay with [#7](https://github.com/dfn-au/dfn-web/issues/7) and [#8](https://github.com/dfn-au/dfn-web/issues/8).

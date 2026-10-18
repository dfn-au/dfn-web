# DFN Website Q&A Workflow

## Direction and Current State

Use Slidev for the stakeholder workshop, run locally by Andrew while screen-sharing with Kat. Monaco editors autosave answers into local Markdown files after a 700 ms pause. Kat follows up with stakeholders on unresolved questions; further calls resolve what remains.

The [deck](workshop/slides.md) contains a title slide and these questions:

- `COM-001`: whether newsletter signups go directly to infoodle or by email to staff.
- `SITE-001`: how separate the AU and NZ sites should feel, using office contact details as the first example.
- `SITE-002`: how visibly the site should identify its country, from a prominent flag or country label to a subtle logo difference alongside the domain.

[GitHub question issues](https://github.com/dfn-au/dfn-web/issues?q=is%3Aissue%20label%3Aquestion) own the questions, answers and current status. The deck is a selection for discussion. SITE-001 and the visibility requirement in SITE-002 are answered in [#68](https://github.com/dfn-au/dfn-web/issues/68); final visual treatment remains with [#7](https://github.com/dfn-au/dfn-web/issues/7). COM-001 remains with [#15](https://github.com/dfn-au/dfn-web/issues/15), informed by mailing-platform ownership in [#27](https://github.com/dfn-au/dfn-web/issues/27). Add further workshop questions from their owning issues.

## Running the Workshop

From the repository root, install the separate workshop dependencies once, then start the deck:

```sh
pnpm --dir docs/discovery/workshop install --frozen-lockfile
pnpm workshop
```

Open <http://localhost:3030/> for the deck, or <http://localhost:3030/COM-001> for the newsletter question. Edit the response and wait for **Saved**. Changes save after a 700 ms pause, or immediately when the editor loses focus. Cmd/Ctrl-S also saves immediately. Use the slide navigation controls after editing; arrow keys inside Monaco move the text cursor.

Responses save to `workshop/answers/<ID>.md`. A new response is completely empty, with no prefilled headings, status, or example text. Its file is created only when the first edited response saves. Opening a question or saving an untouched empty response creates no file. Missing files mean no response was captured in the workshop; the owning GitHub issue may already have an answer from another source. Existing responses are preserved.

The editor shows pending, saving, saved, and failure states. Unsaved edits are also retained as browser drafts. A failed save can be retried; conflicting edits from another tab or external file change require review rather than silently overwriting the saved answer. Use one editor tab during capture and refresh after changing answer files elsewhere. Autosave does not create Git commits.

The workshop has its own package lockfile and a local Vite save endpoint. Static builds include a read-only snapshot of saved responses and cannot autosave. The presentation uses the new website's charcoal palette, Fraunces headings, DM Sans body text, Oswald labels, and logo, with plain backgrounds. Fonts are bundled locally.

## Files and Question Identity

Layout under this directory:

```text
README.md               Workflow and resumption notes
workshop/
  slides.md             Questions, context, source links, and presentation order
  answers/
    PAY-001.md          Created when this question receives an edited response
```

Give each question a short category prefix and a sequential number within that category, such as `PAY-001` (payments), `EVT-001` (events), or `CRM-001` (CRM and integrations). Add prefixes as needed; use the main decision area for questions spanning several categories.

The prefix describes the category when the question is created. Keep the full ID when rewording, reordering, or moving a question to another theme; never reuse retired IDs. Group slides by theme and organise each call around its priorities. A slide may cover related prompts; use separate IDs when their answers can be resolved independently.

Use the owning issue for the current question and status. Keep a concise workshop prompt in the deck and captured responses in their answer files. The `question` layout automatically provides an editor using `questionId`; no file import or pre-created answer is needed. Reference existing PRD sections and decision issues rather than copying their full contents.

## Adding Questions

1. Search open and closed GitHub question issues for an existing question or answer. Create an issue only if no owner exists.
2. Add a stable ID, a clear workshop prompt, brief context explaining why it matters, and a `source` link to its owning issue. Include options only where they help the discussion. Copy an existing question slide and set both `questionId` and `routeAlias` to the new ID.
3. Use `layout: question`. The editor starts completely blank and creates the answer file on the first saved edit. Do not prefill responses or pre-create placeholder files.
4. Put it in the appropriate theme. If adding navigation links, use question aliases rather than slide numbers so reordering preserves navigation. Keep resolved material available for reference without making every call revisit it.

Record confirmation, attribution, conditions, and follow-up details as needed during discussion. A working note is not automatically an approved requirement. Track incorporation with links to the affected PRDs, issues, or ADRs when answers are processed.

## Running a Call and Following Up

Before the call, create a Git checkpoint of the questions and current answers. During the call, Andrew records responses in the on-slide editors and checks the Saved indicator before finishing. Capture uncertainty and who needs to follow up; do not turn guesses into decisions.

After the call, check the files on disk and review the diff against the checkpoint. Commit the captured responses separately from subsequent requirements changes. Give Kat a concise list of outstanding question IDs and follow-ups. Record her returned answers with their source and date, either directly in Markdown or during the next call. Kat does not need to run Slidev for this workflow.

Git records saved snapshots, not every keystroke. No background monitoring is needed: review changes after each call or returned set of answers.

## Incorporating Answers and Continuing Later

Update the owning GitHub issue first with the confirmed answer, source, date and any remaining uncertainty. Link each workshop response or transcript passage used as evidence. Update affected [PRDs](../prds/README.md) and ADRs to reflect the resulting requirements. Link the documentation PR and any implementation work from the issue, then close it according to the [issue workflow](../agents/issue-tracker.md).

If an answer changes, reopen its issue and reconcile the affected requirements. Preserve earlier evidence and explain what supersedes it. A partially answered question stays open with only its unresolved parts needing a response.

To resume, start with the open question issues and their linked evidence. Select the next workshop prompts from that list. Deck membership and missing answer files do not determine whether a project question is open.

## Checks

`pnpm --dir docs/discovery/workshop test` checks lazy file creation, exact Markdown persistence, conflicting saves, and request validation. `pnpm --dir docs/discovery/workshop build` creates a read-only snapshot in the ignored `dist/` directory.

With the deck running and root dependencies installed, `node --test docs/discovery/workshop/tests/editor-theme.test.mjs` checks editor startup with both current and stale theme configuration. It uses local Chrome; set `BROWSER_EXECUTABLE_PATH` for another Chromium installation.

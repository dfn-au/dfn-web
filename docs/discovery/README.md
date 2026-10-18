# Stakeholder workshop

The [Slidev deck](workshop/slides.md) selects GitHub questions for a call. GitHub owns each question, its answer and status; the deck and saved responses preserve discussion evidence.

## Run and capture

From the repository root:

```sh
pnpm --dir docs/discovery/workshop install --frozen-lockfile
pnpm workshop
```

Open <http://localhost:3030/>. Andrew runs the deck locally while screen-sharing and records responses in the on-slide editors. Use one editor tab and wait for **Saved** before finishing. Autosave runs after 700 ms, on blur or on Cmd/Ctrl-S.

Responses save to `workshop/answers/<ID>.md` on the first edited save. Missing files mean no workshop response was captured; GitHub may already have an answer from another source. Browser drafts preserve unsaved edits. Review conflicting saves before retrying, and refresh after external answer-file edits. Static builds show a read-only snapshot and cannot save. Autosave does not create Git commits.

## Prepare and follow up

1. Start with the ordered question links in [launch issue #8](https://github.com/dfn-au/dfn-web/issues/8). Read each owning issue before selecting a prompt.
2. Give each independently answerable prompt a stable category ID such as `COM-001`. Use `layout: question`, set `questionId` and `routeAlias` to that ID, and link its owning issue with `source` and `sourceLabel`. Preserve IDs when rewording or reordering; never reuse retired IDs or pre-create empty answers.
3. Before a call, checkpoint questions and existing answers in Git. Capture attribution, uncertainty and follow-up owners. A discussion note is evidence, not approval.
4. Review saved files and the diff after the call. Commit captured responses separately from changes that incorporate them.
5. Update the owning issue with the confirmed answer, source, date, conditions and remaining uncertainty. Link captured evidence and delivery work, then apply the question lifecycle in [AGENTS.md](../../AGENTS.md). Update #8 when launch scope or the next questions change. Add an ADR only when a lasting architecture decision warrants one.

Kat can return follow-up answers without running Slidev. Record their source and date, then process them through the same owning issue. Resume from GitHub's current questions rather than deck membership or missing response files.

## Tool checks

`pnpm --dir docs/discovery/workshop test` checks persistence and conflicts. `pnpm --dir docs/discovery/workshop build` creates a read-only snapshot in ignored `dist/`.

With the deck running and root dependencies installed, `node --test docs/discovery/workshop/tests/editor-theme.test.mjs` checks editor startup using local Chrome. Set `BROWSER_EXECUTABLE_PATH` for another Chromium installation.

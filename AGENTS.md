## Project work

- GitHub Issues in `dfn-au/dfn-web` own scope, questions, delivery work and confirmed outcomes. Use `gh` from this repository.
- For skill references to `docs/agents/*`, use the tracker, label and domain guidance here. Those files were deliberately retired; do not request repository setup because they are missing.
- Before investigating or adding work, search open and closed issues, relevant open/recently merged PRs and available prior chats. Reuse the existing owner.
- Keep approved website launch scope and launch checks in [#8](https://github.com/dfn-au/dfn-web/issues/8), and CRM selection criteria in [#69](https://github.com/dfn-au/dfn-web/issues/69). Keep #8's next questions ordered, with links to their owning issues rather than copied questions or statuses.
- Give each question or deliverable one owning issue. Keep its current question or outcome at the top of the body; comments preserve discussion. Link evidence, related decisions and delivery work.
- Use `question` for decisions. Record the confirmed answer, who confirmed it and when, its source and any conditions. Distinguish stakeholder confirmation, engineering choices and unverified vendor claims.
- Close an answered question as completed once follow-up work has linked owners. Close deferred or irrelevant questions as not planned, recording why and a revisit condition; close duplicates with a link to the owner. Keep only unresolved parts open. Reopen the same issue if its decision changes.
- Use the existing triage labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. Add no new labels. `needs-info` means waiting for external input; `question` + `ready-for-human` is the answer queue. Use `ready-for-agent` only for specified, unblocked delivery work.
- Before replacing an issue body, read its latest contents. Use body files for multiline `gh` edits.

## Repository documentation

- Keep permanent engineering facts and dated source evidence in git. GitHub owns the current work and decision queues; workshop prompts and research are supporting evidence.
- Use [CONTEXT.md](CONTEXT.md) for domain definitions and the vocabulary used in code.
- Read [accepted ADRs](docs/adr/) when changing architecture. Add an ADR only for a lasting architecture decision whose rationale or consequences future changes need; link its owning issue. Routine scope answers remain in GitHub.
- Update the existing owner when facts change. Git history preserves superseded proposals and research.

## Git and checks

- Be concise.
- Use Conventional Commits, preferring `!` for breaking changes.
- Run tests covering the change. Leave full-suite runs to CI.

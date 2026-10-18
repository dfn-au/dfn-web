# Issue tracker: GitHub

GitHub Issues in `dfn-au/dfn-web` own project questions and confirmed outcomes. Use the existing `question` label for decision issues:

- [Questions needing a decision](https://github.com/dfn-au/dfn-web/issues?q=is%3Aissue%20is%3Aopen%20label%3Aquestion)
- [Recorded outcomes](https://github.com/dfn-au/dfn-web/issues?q=is%3Aissue%20is%3Aclosed%20label%3Aquestion)

Before adding a question, search open and closed issues, relevant PRs and available prior discussion. Reuse its issue. Split independently answerable questions only when that lets one close without losing unresolved work.

Keep the current question or outcome at the top of the issue body. Comments preserve discussion; readers should not need to reconstruct the answer from them. For a confirmed outcome, record the decision, who confirmed it and when, source links, conditions, and affected requirements or follow-up work. Distinguish stakeholder confirmation, engineering choices and unverified vendor claims. A partial answer leaves the remaining question explicit.

Close a decision as completed when its answer is confirmed and remaining work has linked owners. Close a deferral as not planned with a revisit condition, or a duplicate with a link to its owner. Reopen the same issue if the decision needs reconsideration, preserving the previous outcome and its source. Do not leave an answered decision open just because implementation remains.

PRDs under `docs/prds/specs` describe current product requirements; ADRs describe accepted architecture. Update them when an answer changes requirements, and link the decision issue. Their question sections contain issue links rather than separate question/status lists. Workshop slides select questions for a call; answer files and transcripts preserve evidence. Research recommendations are not approvals. [The workshop workflow](../discovery/README.md) explains capture and follow-up.

Implementation issues track delivery separately and link the relevant decisions. The existing [launch checklist #8](https://github.com/dfn-au/dfn-web/issues/8) stays open until its launch checks are satisfied; closing a decision does not clear that checklist.

Use `gh` from this repo. Use body files for multiline edits and check for newer changes before replacing an issue body.

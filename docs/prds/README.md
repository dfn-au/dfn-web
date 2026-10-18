# PRD Structure

PRDs live in git under `docs/prds/specs`. GitHub Issues own questions, confirmed outcomes and implementation work, following the [issue workflow](../agents/issue-tracker.md).

The canonical requirements are the programme PRD and epic PRDs.

The DFN website rebuild uses a three-level planning structure:

```text
Local programme PRD
  Local PRD / epic specs
    GitHub vertical implementation issues
```

## Local Programme PRD

- [Parent Rebuild Scope and Launch Parity](specs/001-overview.md)

The programme PRD is coordination material. It is not intended to be implemented directly. It holds the overall rebuild goal, shared launch expectations, links to PRDs, and open decision areas.

The rebuild treats Australia and New Zealand as separate launch-critical public sites:

- `dfn.org.au`
- `dfn.org.nz`

PRDs should distinguish shared content, site-specific content, publishing scope, and site attribution where relevant.

## Local PRD / Epic Specs

- [Website Content, Navigation, Trust, and Information Architecture](specs/002-content.md)
- [Giving, Appeals, and Donation Catalogue](specs/003-giving.md)
- [Child Sponsorship and Sponsorable Profiles](specs/004-sponsorship.md)
- [DFN Event Discovery and Ticketing](specs/005-events.md)
- [Supporter Engagement, Enquiries, and Community Campaigns](specs/006-engagement.md)
- [CRM, Donor Management, Accounting, and Supporter Communications](specs/007-crm-dms-ems.md)

These specs describe functional requirements for broad product areas. They are not the final implementation queue.

## PRD Shape

Keep PRDs lean and consistent. Each PRD should make these sections easy to find:

- Document role
- Problem statement
- Desired future behaviour
- User stories or journeys
- Implementation decisions
- Testing decisions
- Out of scope
- Open questions
- Reference URLs, where useful

Implementation decisions are approved direction and link to their decision issues. Open-question sections link to the owning issues; read current status there. Research and workshop notes do not establish approval.

## GitHub Vertical Implementation Issues

Implementation issues should be created from a PRD using thin vertical slices. Each slice should be independently demoable and should cut through the necessary user-facing workflow end to end.

Use GitHub Issues for agent-ready work, not the broad PRDs.

## Decision Issues

Use [open question issues](https://github.com/dfn-au/dfn-web/issues?q=is%3Aissue%20is%3Aopen%20label%3Aquestion) to see what needs a decision, and [closed question issues](https://github.com/dfn-au/dfn-web/issues?q=is%3Aissue%20is%3Aclosed%20label%3Aquestion) to find confirmed or deferred outcomes. The [issue workflow](../agents/issue-tracker.md) defines recording, closure and reconsideration. Keep question text and status in the issue rather than a second register here.

## Implementation Tracking and Go-live Follow-ups

- Stripe donation implementation: [one-off donations #62](https://github.com/dfn-au/dfn-web/issues/62), [monthly donations #63](https://github.com/dfn-au/dfn-web/issues/63), [appeal attribution #64](https://github.com/dfn-au/dfn-web/issues/64), and [bank-deposit instructions #65](https://github.com/dfn-au/dfn-web/issues/65).
- [Must revisit before go-live](https://github.com/dfn-au/dfn-web/issues/8): register of deferred work that must be addressed before launch; detailed work stays in the linked issues.

## Working Reports

- [DFN Website Q&A Workflow](../discovery/README.md) - Slidev question capture, stakeholder follow-up, and incorporation of confirmed answers into requirements.
- [Operational Plumbing Audit Report](operational-plumbing-audit-report.md) - working guide for observability, webhooks, jobs, abuse protection, consent, secrets, retention, incident response, and related follow-up decisions before payment/event/admin implementation.
- [Infoodle Current-State Investigation](../research/infoodle-current-state-2026-09-13.md) - observed data and workflows, coverage limits and remaining walkthroughs. Current practice is discovery evidence; it does not establish requirements or the preferred design for the new website.
- [Infoodle Documentation Context](../research/infoodle-documentation-context.md) - official product behaviour and its relationship to the repository's open questions; separate from live observations.

## Adjacent Requirements

Requirements surfaced during discovery that are adjacent to the website but should not expand website launch scope are tracked in [Adjacent Requirements Register](adjacent-requirements-register.md). First-class CRM/DMS/EMS requirements now live in [CRM, Donor Management, Accounting, and Supporter Communications](specs/007-crm-dms-ems.md).

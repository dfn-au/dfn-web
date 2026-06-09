# PRD Structure

PRDs live in git under `docs/prds/specs`. GitHub Issues are for actual task work created from those PRDs.

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

Implementation decisions are approved direction. Open questions are unresolved and should not be treated as requirements.

## GitHub Vertical Implementation Issues

Implementation issues should be created from a PRD using thin vertical slices. Each slice should be independently demoable and should cut through the necessary user-facing workflow end to end.

Use GitHub Issues for agent-ready work, not the broad PRDs.

## Decision Issues

Some areas intentionally remain unresolved. Create focused GitHub decision/deep-dive issues before slicing implementation work where needed:

- Event requirements deep dive
- Information architecture and evergreen content deep dive
- Child profile availability/locking once sponsored
- Reporting/export system of record
- Physical merchandise/store scope
- Final AU/NZ receipt rules
- Campaign country scope and whether any shared cross-country campaign/progress model is required
- CRM/DMS/EMS source-of-truth boundaries for contacts, gifts, pledges, receipts, subscriptions, events, and sponsorship history
- Xero reconciliation/export/integration workflow
- Marketing/supporter EMS ownership and suppression-list ownership

Use this lightweight decision shape:

```text
Title:
Status:
Context:
Decision:
Consequences:
Affected PRDs:
Owner/date:
```

## Working Reports

- [Operational Plumbing Audit Report](operational-plumbing-audit-report.md) - working guide for observability, webhooks, jobs, abuse protection, consent, secrets, retention, incident response, and related follow-up decisions before payment/event/admin implementation.

## Adjacent Requirements

Requirements surfaced during discovery that are adjacent to the website but should not expand website launch scope are tracked in [Adjacent Requirements Register](adjacent-requirements-register.md). First-class CRM/DMS/EMS requirements now live in [CRM, Donor Management, Accounting, and Supporter Communications](specs/007-crm-dms-ems.md).

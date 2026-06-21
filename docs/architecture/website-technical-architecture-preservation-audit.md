# Website Technical Architecture Preservation Audit

## Purpose

This audit records how the original 414-line `docs/adr/001-website-technical-architecture.md` was separated into accepted ADRs and topic-specific research without losing its content.

Research recommendations are not decisions. The only authoritative architecture decisions created by this reorganisation are:

| ADR | Status | Decision boundary |
| --- | --- | --- |
| [ADR 001](../adr/001-website-technical-architecture.md) | Accepted | Core application, hosting, Country Site routing, CMS, and CMS authentication |
| [ADR 003](../adr/003-authored-content-and-operational-state-ownership.md) | Accepted | Authored Content versus Operational State ownership |

Operational persistence/authentication, payments, transactional notifications, and analytics remain undecided research areas.

## Research Files

| Research file | Original ADR 001 lines |
| --- | --- |
| [Cross-stack and cross-cutting research](website-technical-architecture-research/01-cross-stack-and-cross-cutting-research.md) | 1–140, 226–231, 311–414 |
| [Application, hosting, and CMS research](website-technical-architecture-research/02-app-hosting-and-cms-research.md) | 141–171, 232–264 |
| [Operational data, authentication, and admin research](website-technical-architecture-research/03-operational-data-auth-and-admin-research.md) | 172–189, 265–279 |
| [Payment research](website-technical-architecture-research/04-payment-research.md) | 190–201, 210–211, 280–290 |
| [Transactional notification research](website-technical-architecture-research/05-transactional-notification-research.md) | 202–209, 291–299 |
| [Analytics and conversion research](website-technical-architecture-research/06-analytics-and-conversion-research.md) | 212–225, 300–310 |

Each exact source block is preceded by an `original-adr-001-lines` marker. The marked ranges cover original lines 1–414 exactly once with no gaps or overlaps.

## Original Content Inventory

| Content type | Count |
| --- | ---: |
| Lines | 414 |
| Characters | 59,076 |
| Headings | 32 |
| Prose paragraphs | 35 |
| Lists | 9 |
| List items | 105 |
| Tables | 15 |
| Table data rows | 102 |
| Architecture diagrams | 1 |
| Source-link occurrences | 241 |
| Unique source URLs | 200 |
| Scored candidate rows | 51 |
| Numeric score values | 79 |
| Key trade-offs and risks | 12 |
| Firm-decision items | 19 |
| Deliberate seams | 20 |
| Follow-up items | 13 |

## Source-to-Destination Mapping

| Original lines | Original content | Destination |
| --- | --- | --- |
| 1–140 | Original status, context, drivers, combined recommendation, diagram, evidence, and whole-stack scoring | Cross-stack research; accepted core-platform projection in ADR 001 and accepted ownership projection in ADR 003 |
| 141–171 | Scored application/hosting and CMS comparisons | Application, hosting, and CMS research |
| 172–189 | Scored operational database/authentication/admin comparison | Operational data, authentication, and admin research |
| 190–201 | Scored payment comparison | Payment research |
| 202–209 | Scored transactional-email comparison | Transactional notification research |
| 210–211 | Combined payment and email primary sources | Payment research |
| 212–225 | Scored analytics comparison and primary sources | Analytics and conversion research |
| 226–231 | Coverage-audit rationale and representative sources | Cross-stack research |
| 232–264 | Framework, hosting, and CMS coverage findings | Application, hosting, and CMS research |
| 265–279 | Operational persistence, authentication, and admin coverage findings | Operational data, authentication, and admin research |
| 280–290 | Payment, fundraising, sponsorship, and event-platform coverage findings | Payment research |
| 291–299 | Transactional and supporter-email coverage findings | Transactional notification research |
| 300–310 | Analytics, conversion, and consent coverage findings | Analytics and conversion research |
| 311–414 | Adjacent stack categories, risks, historical conclusions, seams, follow-ups, and consequences | Cross-stack research |

The original `Proposed` status, `Decision`, and `Decisions Firm Now` wording remain preserved as historical research conclusions. They do not make an undecided provider choice authoritative.

## Verification

- Reassembling marked source blocks in original-line order produces SHA-256 `e6fb29099d49f7c0df5fdaf3185b7c171f3124dd9c3ea2a202077cb823f3e0b9`, matching original ADR 001.
- Source-link occurrences remain 241, with 200 unique URLs.
- All 15 tables and 102 data rows remain unchanged.
- All 51 scored candidate rows and 79 numeric score values remain unchanged.
- All 12 risks, 19 historical firm-decision items, 20 deliberate seams, and 13 follow-up items remain unchanged.
- Added and updated relative Markdown links resolve to existing files.
- `git diff --check` passes.

## GitHub Issue Ownership

No duplicate decision issues were created. Issues #19 and #20 remain open because operational-platform and payment decisions remain unresolved. Issues #12, #13, #16, #18, #21, #22, #24, and #25 retain their existing decision ownership. Issue #17 remains open pending review and approval.

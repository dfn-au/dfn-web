# PRD: Parent Rebuild Scope and Launch Parity

## Document Role

This is the programme hub for the DFN website rebuild. It is not intended to be implemented directly.

Use this document to coordinate launch scope, shared requirements, open decisions, and links to PRD/epic specs. Implementation work should be created later as thin vertical slice issues in GitHub under the relevant PRD.

## PRD / Epic Specs

- [Website Content, Navigation, Trust, and Information Architecture](002-content.md)
- [Giving, Appeals, and Donation Catalogue](003-giving.md)
- [Child Sponsorship and Sponsorable Profiles](004-sponsorship.md)
- [DFN Event Discovery and Ticketing](005-events.md)
- [Supporter Engagement, Enquiries, and Community Campaigns](006-engagement.md)
- [CRM, Donor Management, Accounting, and Supporter Communications](007-crm-dms-ems.md)

## Problem Statement

DFN needs to rebuild the live public websites for Australia and New Zealand in a more modern stack without losing the visitor workflows that currently support donations, sponsorship, events, supporter engagement, content discovery, and organisational trust.

The rebuild is launch-critical for both `dfn.org.au` and `dfn.org.nz`. These are separate visitor-facing domains. Authored content may be shared across both sites when it is genuinely the same, but site-specific content and operational workflows must remain scoped to the relevant site.

The current site contains a mixture of evergreen content, active campaigns, payments, event registrations, child sponsorship, downloadable resources, contact details, and legacy store-like giving flows. A rebuild that focuses only on page appearance risks missing operational workflows, broken existing URLs, lost donation attribution, and incomplete staff publishing needs.

## Solution

Create a rebuild programme that preserves workflow-level parity with the current sites while allowing the information architecture, page structure, labels, and implementation details to change.

This parent PRD defines shared launch scope, common acceptance criteria, migration expectations, and unresolved deep dives. Separate PRDs cover content/IA, giving, sponsorship, events, supporter engagement, and adjacent CRM/DMS/EMS requirements surfaced during discovery.

## User Stories

1. As a donor, I want the rebuilt site to support the same core ways to give, so that I can continue supporting DFN without friction.
2. As an event attendee, I want active DFN event registrations to work on the rebuilt site, so that I can register and pay confidently.
3. As a sponsor, I want sponsorship workflows to remain available, so that I can support a child or sponsorship programme.
4. As a supporter, I want current ways to engage with DFN to remain findable, so that I can volunteer, fundraise, receive updates, or contact the team.
5. As a visitor researching DFN, I want clear trust, contact, impact, and policy information, so that I can decide whether to engage.
6. As DFN staff, I want live and evergreen content migrated, so that the new site can launch without losing important information.
7. As DFN staff, I want important old URLs to keep working or redirect, so that links from search, email, partner sites, and social media do not break.
8. As DFN staff, I want active campaigns migrated, so that current fundraising activity can continue through launch.
9. As DFN staff, I want payment, event, and supporter activity to remain attributable and reportable, so that finance, fundraising, and follow-up are not disrupted.
10. As DFN staff, I want to preview content before publishing, so that launch-critical pages can be checked before they go live.
11. As DFN staff, I want a simple authenticated staff area, so that trusted staff can manage launch-critical website content without developer intervention.
12. As a visitor using assistive technology, I want accessible navigation and forms, so that I can complete core workflows.
13. As DFN staff, I want to publish shared content to both AU and NZ in one action where appropriate, so that common content can be managed without unnecessary duplication.

## Implementation Decisions

- Preserve current functionality at the workflow level, not by cloning every current page.
- Avoid technology-stack decisions in PRDs unless later implementation issues require them.
- Treat Australia and New Zealand as separate public domains.
- Both domains are launch-critical.
- Shared content can be published to both domains in one editorial action.
- Site-specific content should only appear on its intended domain.
- Site-specific content should return a 404 on the other domain unless an explicit redirect exists.
- Public content must carry publishing scope: Australia only, New Zealand only, or both.
- Use separate PRDs for:
  - Website Content, Navigation, Trust, and Information Architecture
  - Giving, Appeals, and Donation Catalogue
  - Child Sponsorship and Sponsorable Profiles
  - DFN Event Discovery and Ticketing
  - Supporter Engagement, Enquiries, and Community Campaigns
- Treat the following audiences as priority order for launch requirements: donors, event attendees, churches/community groups, business partners, volunteers/interns, and people researching DFN credibility.
- Preserve or redirect important current public URLs.
- Migrate live/evergreen content and active campaigns before launch, with migration scope recorded per domain.
- Do not preserve stale content purely for page-for-page parity.
- Require explicit functional accessibility behaviour across public navigation, giving, sponsorship, event, and content flows.
- Assume a simple authenticated staff area for trusted DFN staff, with detailed roles and permission matrices out of scope for launch.
- Require draft and published states for editable content. Complex approval workflows are out of scope.
- Staff live preview is strongly desired for editable content.
- Non-production preview/testing environments are required before release, so staff and implementers can verify website changes without affecting the live public sites.
- Reporting/exporting is required at a functional level, but the system of record is still open.
- The website must capture or expose enough information for reporting, whether internally or through connected external systems.
- Payments, sponsorships, event registrations, campaign gifts, confirmations, notifications, analytics conversions, exports, and reports must carry site attribution.
- Direct deposit/offline giving instructions, transactional email sender configuration, and receipt/trust wording should be AU/NZ-specific.
- Future AU-only or NZ-only staff permissions should remain possible, but a detailed role/permission matrix is out of scope for launch.
- The current website includes physical merchandise/store-like items, but the rebuild should not assume a physical merchandise or ecommerce workflow is required for launch.
- Product-like giving should be treated as donation catalogue/campaign giving unless DFN confirms that physical merchandise, fulfilment, inventory, or shipping is still required.

## Testing Decisions

- Test at the highest user-workflow level available rather than testing implementation details.
- Launch parity should be validated by completing representative end-to-end flows for giving, sponsorship, event registration, newsletter/prayer opt-in, contact discovery, toolkit/resource access, and content discovery.
- Launch parity should validate both `dfn.org.au` and `dfn.org.nz`.
- Migration should be validated by checking the approved evergreen content inventory, active campaign inventory, and redirect map per domain.
- Accessibility should be validated against keyboard navigation, form labelling, error messaging, focus handling, and screen-reader-friendly core workflows.
- Reporting readiness should be validated by confirming that required payment, event, campaign, sponsorship, and supporter data can be accessed or exported with AU/NZ filtering.
- Release readiness should be validated in a non-production preview/testing environment before changes are deployed to the live public sites.

## Out of Scope

- Final technology stack choices.
- Page-for-page cloning of the existing WordPress structure.
- Full donor account area on the DFN website.
- Detailed staff role/permission matrix.
- Geo-redirect or required country-switching UX.
- Full event deep dive.
- Full information architecture deep dive.
- Full ecommerce/physical merchandise rebuild unless confirmed later.

## Open Questions

- Event requirements deep dive.
- Information architecture and evergreen content deep dive.
- Child profile availability/locking details.
- Annual sponsorship confirmation.
- Reporting/export system of record.
- Donation catalogue naming.
- Confirm whether campaigns are always country-specific or whether any shared cross-country campaign/progress model is required.
- Physical merchandise/store scope, including whether current merchandise is active and whether fulfilment, inventory, shipping, or physical payment/reporting workflows are required.
- Internal notification recipients by workflow.
- Confirmation email ownership by workflow.
- Final AU/NZ tax receipt rules.
- Community campaign field list.
- SEO redirect map and migrated URL list per domain.
- Active/current campaign inventory per domain.
- Migration acceptance criteria and launch cutover checklist.
- Analytics event taxonomy and consent/privacy requirements.
- CRM/DMS/EMS source-of-truth boundaries for contacts, gifts, pledges, receipts, subscriptions, event history, sponsorship history, and supporter communications.

## Reference URLs

- Physical merchandise/store scope reference: <https://dfn.org.au/store-category/merchandise/>

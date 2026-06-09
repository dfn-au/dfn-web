# PRD: CRM, Donor Management, Accounting, and Supporter Communications

## Document Role

Parent programme PRD: [Parent Rebuild Scope and Launch Parity](001-overview.md)

This is a requirements spec for DFN's broader supporter operations ecosystem. It covers CRM, donor management, accounting/receipting, event history, pledge follow-up, and supporter communications requirements surfaced during website discovery.

It is not a website launch PRD. Use it to create focused decision issues and implementation/vendor-selection issues for CRM/DMS/EMS/accounting workflows.

## Problem Statement

DFN's public website workflows create supporter, donor, event, sponsorship, pledge, and communication data that must be managed beyond the website.

If the rebuild only captures website parity, DFN risks preserving public forms and payments while leaving donor records, household relationships, tax receipts, pledges, communications preferences, sponsorship follow-up, and reporting fragmented across Infoodle, Xero, spreadsheets, email tools, and manual processes.

DFN needs explicit non-website requirements for the systems that own supporter records, donor history, accounting/receipting, communication preferences, segmentation, and relationship follow-up.

## Desired Future Behaviour

DFN should have a coherent CRM/DMS/EMS operating model where:

- Contacts, households, donor relationships, notes, preferences, giving history, event history, sponsorship details, and pledges can be managed deliberately.
- AU and NZ legal/entity context is preserved for gifts, receipts, campaigns, subscriptions, sender identities, reports, and staff access.
- Website-originated activity can create or update downstream records without making the website the long-term donor system of record.
- Transactional email and marketing/supporter email are treated as separate concerns.
- Staff can report on donors, gifts, pledges, campaigns, subscriptions, event participation, and sponsorship status without relying on disconnected manual spreadsheets as the primary record.

## User Stories

1. As DFN staff, I want donor contact records to include names, addresses, phone, email, salutation, household details, and country/entity context, so that supporter data is usable for stewardship and reporting.
2. As DFN staff, I want household/family/account relationships, so that giving statements and supporter relationships can be managed at both household and individual levels.
3. As DFN staff, I want tags, groups, notes, and activity history on contacts, so that I can understand supporter context before follow-up.
4. As DFN staff, I want duplicate detection and merge workflows, so that forms, events, campaigns, and imports do not create a degraded supporter database.
5. As DFN staff, I want donor acquisition source to be stored separately from gift/campaign attribution, so that I can understand how supporters first connected with DFN.
6. As DFN finance staff, I want official annual tax receipts and EOFY statements to be generated and sent through an agreed workflow, so that AU and NZ obligations are met.
7. As DFN finance staff, I want gifts to be classified as tax-deductible or non-deductible, so that receipts and reports are accurate.
8. As DFN finance staff, I want Xero reconciliation/export/integration support, so that bank transactions, gifts, receipts, and project designations can be reconciled.
9. As DFN fundraising staff, I want gifts to support campaign and project/designation line-item attribution, so that split gifts can be reported accurately.
10. As DFN event staff, I want pledge status and follow-up to be tracked, so that outstanding pledges from events and campaigns are not lost.
11. As DFN fundraising staff, I want recurring payment failures to create a reliable follow-up path, so that failed ongoing gifts and sponsorships are not silently lost.
12. As DFN communications staff, I want explicit communication preferences and subscription lists, so that newsletters, prayer updates, campaign promotions, event follow-up, and interest-based communications are sent appropriately.
13. As DFN communications staff, I want prayer update recipients to be vetted/trusted where required, so that sensitive prayer communications are controlled.
14. As DFN communications staff, I want compliant unsubscribe and opt-out handling across AU and NZ, so that suppression is respected by the tools that send messages.
15. As DFN communications staff, I want automated email sequences for key supporter journeys, so that donor onboarding, lapsed donor re-engagement, event follow-up, pledge reminders, sponsor updates, and peer-to-peer fundraiser support can be handled consistently.
16. As DFN fundraising staff, I want major donor pipeline tracking, so that high-value relationships have clear ownership, next actions, notes, and giving potential.
17. As DFN fundraising staff, I want lifetime value and lapsed donor segmentation, so that communications and stewardship can be tailored by donor history.
18. As DFN staff, I want event registrations and attendance history to appear in the donor/contact history, so that event participation is visible alongside giving and communications.
19. As DFN staff, I want sponsor update workflows and send history, so that sponsor communications can be tracked outside the public website.
20. As DFN managers, I want operational exports and strategic dashboards, so that staff can run events and reconciliation while leadership can track donor, campaign, pledge, subscription, and sponsorship health.
21. As DFN administrators, I want permissions for sensitive donor notes, prayer update lists, child sponsorship details, and financial data, so that staff access matches data sensitivity.

## Implementation Decisions

- Create a separate CRM/DMS/EMS requirements stream instead of expanding website PRDs to cover donor operations.
- Treat AU/NZ separation as an ecosystem requirement, not only a website requirement.
- Contacts may exist across both AU and NZ contexts, but gifts, receipts, campaigns, subscriptions, payment accounts, sender identity, legal entity reporting, and relevant access controls must preserve entity/country context.
- AU/NZ separability is critical for selection, but it does not have to be solved by native multi-entity CRM features alone. A candidate approach may satisfy this if entity-scoped data can be cleanly exported, migrated, or split into separate systems later.
- Contact records should support individual and household/family/account relationships.
- Contact records should support tags, groups, structured fields, custom notes, donor acquisition source, and activity history.
- Activity history should include relevant website forms, donations, sponsorships, event registrations/attendance, emails sent where available, staff notes, pledges, and supporter interests.
- Duplicate detection and merge should be an explicit admin workflow.
- Duplicate detection should produce reviewable candidate matches for staff/admin merge. Blind automatic merging should not be required and should be avoided unless explicitly approved.
- Donor acquisition source should be stored separately from per-gift source/campaign attribution.
- Donor acquisition source should be treated as first-touch supporter data where available, and should not be overwritten by later campaign, gift source, or UTM attribution.
- Official annual tax receipts and EOFY statements are CRM/DMS/accounting requirements, not public website requirements.
- Official annual tax receipts and EOFY statements are expected to be generated outside the website, likely through the accounting system, but the final AU/NZ generation workflow remains open.
- CRM/DMS selection should still evaluate receipting workflow support even if the CRM/DMS does not generate final receipts. At minimum, candidate systems must preserve donor, gift, designation, tax classification, entity, and reconciliation data needed by the accounting/receipting workflow.
- Gifts should support tax-deductible and non-deductible classification at the appropriate gift, designation, item, or transaction level.
- Tax-deductible and non-deductible classification should be stored at the line-item/designation level where possible. Transaction-level classification is acceptable only where all lines in the transaction share the same treatment.
- Xero support is required as reconciliation/export/integration capability, but the exact integration depth remains open.
- Xero should be treated as the financial source of truth for final accounting totals, while CRM/DMS should be treated as the donor stewardship source of truth for donor-facing gift history, campaign attribution, and relationship follow-up.
- Gift, allocation, receipt, payment, and donor records should preserve shared identifiers or reconciliation references so CRM/DMS and Xero records can be matched reliably.
- Xero support must include reliable reconciliation/export support. Direct API sync is a should-have unless finance confirms it is mandatory.
- Campaign gifts should support campaign-level attribution and project/designation line items, including split designations inside one campaign gift where required.
- Every gift should have at least one project/designation line item. Simple gifts use one line item, while split gifts use multiple line items under the same payment or gift.
- Pledge tracking remains provisional pending confirmation that DFN still needs an operational pledge workflow. If retained, pledge tracking should include pledge status, expected amount, received amount, outstanding balance, follow-up status, and reconciliation notes.
- Recurring payment failures should create a reliable status, notification, or work queue for staff follow-up.
- Retry and dunning may be provider-owned, CRM/DMS-owned, EMS-owned, or integration-owned, but ownership must be explicit.
- The preferred ownership model is that the payment provider detects failures and handles retry/dunning where available, CRM/DMS records failed payment status and staff follow-up work, and EMS sends approved follow-up communications where appropriate.
- Transactional email and marketing/supporter email should be treated separately.
- Transactional email includes payment confirmations, registration confirmations, receipts where applicable, form notifications, staff notifications, and operational confirmations.
- Transactional emails should be owned by the website, payment provider, event system, or other operational tool responsible for the workflow. They should not depend on the marketing/supporter EMS unless a later implementation decision explicitly chooses that path.
- Marketing/supporter email includes newsletters, prayer updates, donor journeys, campaign communications, fundraising communications, sponsor updates, and event reminders/follow-ups.
- Communication preferences should be explicit subscription/preference records, not only loose tags.
- Communication preferences should include newsletter/general updates, prayer updates, campaign promotions, quarterly updates, Vision Trip interest, event follow-up, and other approved supporter segments.
- New communication opt-ins should store source, timestamp, and consent wording/version where possible. Legacy/imported preferences may be marked as legacy/imported where complete consent evidence is unavailable.
- CRM/DMS should own canonical supporter communication preferences. EMS should enforce unsubscribe/suppression during sends and sync preference/suppression changes back to the CRM/DMS where possible.
- Prayer update subscriptions should support vetted/trusted recipient status.
- Prayer updates should be modelled as both a subscription/preference and a vetted/trusted recipient status: subscription records supporter interest, vetted status controls eligibility to receive sensitive prayer communications.
- Unsubscribe and opt-out handling must support compliant suppression across the tools actually sending messages in AU and NZ.
- Automated email sequences are in scope as EMS requirements.
- Required automation candidates include new donor onboarding, lapsed donor re-engagement, event reminders/follow-ups, child sponsor updates, and peer-to-peer fundraiser support communications. Pledge reminders should only be included if pledge tracking is confirmed as an active operational requirement.
- Event registration and attendee management may be event-system-owned, but historical records should sync or export into CRM/DMS contact history where practical.
- Event history should include event registration, attendance/check-in status where available, payment status, and follow-up status where relevant.
- Event registration operations should remain website- or event-system-owned unless a later event-system decision says otherwise. CRM/DMS should receive summary event history rather than own operational ticketing by default.
- Child sponsor updates are CRM/EMS workflows, not website requirements.
- Child sponsorship operational details should ideally live in CRM/DMS, or in a combined CRM/DMS sponsorship-capable platform, rather than being fragmented across spreadsheets and manual records.
- Sponsor update workflows should support sponsor-recipient matching, templates/content, manual or automated send options, and send history.
- Major donor pipeline tracking should support major donor flag/stage, relationship owner, next action date, notes, giving potential, and recent giving.
- Major donor pipeline tracking is a useful should-have, not a hard selection criterion ahead of donor history, receipting, Xero reconciliation, AU/NZ separability, sponsorship support, and migration feasibility.
- Lifetime value segmentation should expose total giving, giving bands, last gift date, and lapsed donor indicators.
- Initial lapsed donor segmentation should define a lapsed donor as someone with no gift in the last 12 months, excluding active recurring donors and active sponsors. Entity-specific and gift-type refinements can be added later.
- Reporting should support both operational exports and strategic dashboards.
- Offline and direct-deposit gifts should be included in donor history. Public campaign progress should include offline/direct-deposit gifts only where staff deliberately add offline adjustments to the displayed total.
- Operational exports should support finance reconciliation, event running, campaign reporting, sponsorship follow-up, communications lists, and pledge follow-up if pledge tracking is confirmed.
- Strategic dashboards should support active donors, lapsed donors, subscribers, campaign totals, sponsorship status, event participation, giving trends, and pledge status if pledge tracking is confirmed.
- Staff roles/permissions should restrict access to sensitive donor notes, prayer update lists, child sponsorship details, and financial data.
- Detailed permission-group design is not a primary product-selection driver at this stage, but selected systems should still support sensible protection of finance, donor notes, prayer update, and sponsorship-sensitive information.

## Testing Decisions

- Test contact creation/update by importing or syncing representative website, event, donation, and communication records into contact history.
- Test household/family/account relationships by producing a household-level giving/receipt scenario.
- Test duplicate detection by creating records with overlapping email/name/household details and confirming an admin can identify and merge them.
- Test gift attribution by recording a gift with site/entity, campaign, source, tax classification, and one or more project/designation line items.
- Test AU/NZ separation by confirming gifts, receipts, subscriptions, sender identity, and reports can be filtered or scoped by entity/country context.
- If pledge tracking is confirmed, test pledge workflow by creating a pledge, recording partial receipt, tracking outstanding balance, and marking follow-up status.
- Test recurring payment failure handling by simulating a failed ongoing gift or sponsorship payment and confirming status, notification, and follow-up ownership are visible.
- Test communication preferences by subscribing and unsubscribing a contact from multiple segments and confirming suppression is respected.
- Test prayer update handling by confirming only vetted/trusted recipients can receive sensitive prayer update communications.
- Test automated email journeys by verifying trigger criteria, suppression behaviour, and send history for at least one donor journey and one event journey. Add a pledge journey test if pledge tracking is confirmed.
- Test event history by confirming a registered/attended event appears in contact history without requiring the CRM to own the event registration workflow.
- Test sponsor updates by sending or recording a sponsor update and confirming send history is visible against the sponsor record.
- Test reporting by producing operational exports and dashboard summaries for donors, gifts, subscriptions, campaigns, events, sponsorships, and pledges if pledge tracking is confirmed.
- Test permissions by confirming restricted users cannot access sensitive notes, prayer update lists, child sponsorship details, or financial data outside their role.

## Out of Scope

- Public website implementation details.
- Making the public website the long-term donor or accounting system of record.
- Final CRM/DMS/EMS vendor selection.
- Final accounting system design beyond Xero reconciliation/export/integration support.
- A DFN-owned public donor self-service portal.
- Donor self-service should remain limited to provider-hosted recurring/payment management unless a later decision explicitly expands scope.
- Matching gifts for launch; treat as a later optimisation candidate.
- SMS campaign integration for launch; treat as optional/later unless a separate decision moves it into scope.
- Social media planning and scheduling; track as a separate marketing operations tooling question.
- A/B testing, detailed email performance reporting, and advanced email optimisation for launch.
- Abandoned donation recovery for launch; treat as a later optimisation candidate requiring consent, privacy, email ownership, and payment-provider feasibility decisions.

## Product Selection Criteria

- CRM/DMS/EMS selection should prioritise requirements that materially affect donor operations, finance/reconciliation, AU/NZ separation, data migration, consent, and sponsorship stewardship.
- Critical selection criteria include AU/NZ entity separation or clean future separability, donor/contact history, gift and project/designation attribution, Xero reconciliation/export support, tax classification/receipting workflow support, subscription/suppression handling, recurring payment failure follow-up, sponsorship data support, and Infoodle migration feasibility.
- Sponsorship data support is a hard selection criterion, scoped to sponsor, programme/child reference, sponsorship status, payment cycle, and sponsor update/send history.
- Legacy Infoodle data migration should be a CRM/DMS/EMS selection criterion. Candidate systems should support import/mapping, dedupe review, and staged migration/export testing before cutover.
- Later optimisation items should not drive CRM/DMS/EMS selection unless critical criteria are otherwise satisfied. This includes SMS campaigns, social media scheduling, A/B testing, advanced email optimisation, abandoned donation recovery, matching gifts, and peer-to-peer fundraiser self-service.
- Event operations and major donor pipeline tracking should not be hard CRM/DMS/EMS selection criteria. Event history visibility and basic major-donor tracking are sufficient unless staff later identify deeper needs.

## Open Questions

- What is the detailed source-of-truth matrix for contacts, donor records, gifts, receipts, subscriptions, event history, sponsorship history, payment failure status, and pledges if pledge tracking is confirmed, given Xero is financial truth and CRM/DMS is donor stewardship truth?
- Should Australia and New Zealand operate separate CRM/DMS/EMS instances from the start, or use a shared setup that can be cleanly exported, migrated, or split later as the entities separate?
- Which system generates official AU and NZ annual tax receipts / EOFY statements?
- What are the final AU/NZ tax-deductibility rules by gift type, designation, event payment, sponsorship, catalogue item, and merchandise/book sale?
- Does Xero support need to go beyond reliable reconciliation/export support into direct API integration or a managed accounting workflow?
- Is pledge tracking actually required, or was it only a discovery item from manual event/campaign follow-up rather than an active website or CRM workflow?
- What are the exact recurring payment failure retry, donor notification, staff notification, and close-out rules across the payment provider, CRM/DMS, and EMS?
- Which EMS owns marketing/supporter email sends, and what preference/suppression sync behaviour is required between EMS and CRM/DMS?
- Which transactional email system or operational tool owns confirmations, staff notifications, and payment/event receipts for each workflow?
- Which event system owns registration operations, attendee management, and attendance capture, given CRM/DMS selection only requires event history visibility?
- What child sponsorship data is safe and practical to manage inside CRM/DMS versus a specialist sponsorship process?
- What minimum sensitive-data protections are required for donor notes, finance data, prayer update lists, and child sponsorship information?
- What dashboard/reporting questions are required for board, annual report, fundraising, finance, and operations use?

## Questions for Kat Davies / CRM Selection Project

- Should household/family/account relationships be first-class records in the CRM/DMS, or is a simpler contact relationship model sufficient for DFN staff workflows?
- Should Australia and New Zealand operate separate CRM/DMS/EMS instances from the start, or use a shared setup that can be cleanly exported, migrated, or split later as the entities separate?
- What minimum website-to-CRM/DMS data contract is required at launch so website-originated contacts, gifts, payments, designations, tax classes, campaign/source attribution, consent, recurring status, and site/entity context can be migrated or synced later?
- Which system should generate official AU and NZ annual tax receipts / EOFY statements, and what role should the accounting system play?
- Does Xero support need to go beyond reliable reconciliation/export support into direct API integration or a managed accounting workflow?
- Is pledge tracking actually required, or was it only a discovery item from manual event/campaign follow-up rather than an active CRM workflow?
- What child sponsorship data is safe and practical to manage inside CRM/DMS versus a specialist sponsorship process?
- What reporting questions must the selected CRM/DMS/EMS answer for board, annual report, fundraising, finance, and operations use?

## Source CSV Rows

- `1` Issue official annual tax receipts
- `2` Tag gifts as tax-deductible vs non-deductible
- `3` Accounting integration with Xero
- `7` Store donor contact information
- `8` Manage donor household/family relationships
- `9` Assign tags and groups to contacts
- `10` Record custom donor notes
- `11` Track donor giving history and campaign attribution
- `12` Record donor acquisition source
- `13` Online forms for enquiries and data capture
- `14` Record method of giving and payment cycle
- `15` Support AU and NZ entities separately
- `17` Report on subscription/group membership numbers
- `18` Generate donor and giving reports
- `19` Report on campaign giving totals and project designations
- `20` Record child sponsorship details
- `21` Child sponsorship updates to sponsors
- `22` Track subscriptions / communications a donor receives
- `23` Vision Trip interest / communications
- `24` Prayer update communications
- `25` Unsubscribe / opt-out handling
- `26` Send targeted email campaigns to segmented lists
- `27` Send automated email sequences
- `28` General newsletter / donor updates
- `30` Track which events a donor has attended
- `32` Event attendee management
- `33` Event reminder and follow-up email series
- `35` Track pledge status and follow up outstanding pledges
- `37` Send SMS campaigns to donors
- `38` Plan, draft and schedule social media content
- `44` Duplicate contact detection and merging
- `45` Contact activity timeline / audit trail
- `48` Payment failure handling and retry
- `50` A/B testing of subject lines or content
- `51` Email performance reporting
- `52` Matching gifts
- `53` Abandoned donation recovery
- `54` Lapsed donor re-engagement
- `55` Major donor pipeline
- `56` Donor lifetime value segmentation
- `57` Peer-to-peer fundraiser communications
- `58` New donor onboarding sequence
- `59` Pledge follow-up communications

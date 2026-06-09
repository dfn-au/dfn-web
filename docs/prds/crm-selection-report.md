# CRM Selection Deep Dive Report

Research date: 2026-06-10

Source requirements: [CRM, Donor Management, Accounting, and Supporter Communications](specs/007-crm-dms-ems.md).

## Executive Recommendation

DFN should run a proof-of-fit with **Infoodle first**, then keep **CiviCRM** and **Salesforce Nonprofit Cloud/NPSP** as alternatives only if DFN is willing to take on a more explicit implementation project.

The decision should not be driven by generic CRM capability. DFN's hard requirements are unusually specific: AU/NZ separability, donor history, Xero reconciliation, tax/receipt data, communication preferences, recurring payment failure follow-up, sponsorship stewardship, exports, and migration from current Infoodle data. Most CRMs look attractive until tested against Xero and sponsorship.

Recommended shortlist:

1. **Infoodle**: best initial proof-of-fit because it already aligns strongly with Xero, receipting, nonprofit contact records, events, reporting, and current-data migration. The proof must focus on AU/NZ architecture, dedupe, recurring payment follow-up, and sponsorship send-history depth.
2. **CiviCRM**: strongest flexible/open-source alternative if DFN has or buys technical ownership. It can model most requirements, but Xero, AU/NZ receipts, sponsorship UI, hosting, upgrades, and support become implementation responsibilities.
3. **Salesforce Nonprofit Cloud/NPSP**: strongest enterprise-platform alternative if DFN has budget for partner implementation and ongoing admin ownership. It is powerful, but Xero, sponsorship, AU/NZ receipting, and event operations are not turnkey.

Do not shortlist these as DFN's primary DMS unless a stakeholder has a strategic reason: **Blackbaud Raiser's Edge NXT, Microsoft Dynamics/Power Platform, DonorPerfect, Little Green Light, Keela, HubSpot, Bloomerang**. They each have useful strengths, but the high-risk gaps line up with DFN's critical criteria.

## Method

One sub-agent researched each candidate against the same requirements template. Scores below normalize their findings into a DFN-specific rubric. A high score means "fits this PRD with low selection risk", not "best general CRM".

Weights:

| Criterion | Weight | Why it matters |
|---|---:|---|
| AU/NZ separability | 15 | Legal/entity context affects gifts, receipts, campaigns, subscriptions, sender identity, reporting, and possible future split. |
| Core CRM/DMS | 15 | Contacts, households, relationships, tags/groups, notes, activity history, dedupe, imports. |
| Giving, Xero, receipting | 20 | Gifts, campaign/project/designation attribution, tax classification, Xero reconciliation/export, receipt workflow. |
| Communications/EMS | 10 | Preferences, subscription lists, unsubscribe/suppression, automation, prayer-update eligibility. |
| Sponsorship stewardship | 15 | Hard criterion: sponsor, programme/child reference, status, payment cycle, update/send history. |
| Payment failure and event history | 10 | Failed recurring payments need staff follow-up; events should appear in contact history. |
| Reporting, exports, migration | 10 | Operational exports and strategic reporting must survive migration and routine operations. |
| Operating fit | 5 | Permissions, maintainability, implementation complexity, and likely cost risk. |

## Ranked Scorecard

| Rank | Product | Weighted Score | Selection Position | Main Reason |
|---:|---|---:|---|---|
| 1 | Infoodle | 76.3 | Shortlist / proof-of-fit first | Best match for Xero, receipts, nonprofit records, reports, events, and incumbent migration path. |
| 2 | CiviCRM | 69.0 | Conditional shortlist | Very flexible and nonprofit-native, but needs technical ownership and custom sponsorship/Xero/receipt work. |
| 3 | Salesforce Nonprofit Cloud/NPSP | 68.1 | Conditional enterprise shortlist | Powerful platform; high implementation and admin burden. |
| 4 | Blackbaud Raiser's Edge NXT | 64.7 | Do not shortlist by default | Strong fundraising CRM, weak fit for Xero and sponsorship without custom work. |
| 5 | Microsoft Dynamics/Power Platform | 61.4 | Do not shortlist by default | First-party Fundraising and Engagement is retiring; viable path is custom/partner-led platform build. |
| 6 | DonorPerfect | 61.3 | Demo only if stakeholder-driven | Mature donor database; Xero, AU/NZ separation, and sponsorship remain weak. |
| 7 | Little Green Light | 61.2 | Fallback only | Low-cost donor CRM; single-currency/account-level assumptions and no native Xero/sponsorship. |
| 8 | Keela | 60.7 | Demo only if sponsorship is simplified | Stronger on receipts/Xero/comms than many peers, but weak on entity separation and sponsorship. |
| 9 | HubSpot CRM | 60.1 | EMS/engagement layer only | Excellent communications CRM, not a standalone donor-management system. |
| 10 | Bloomerang | 60.0 | Do not shortlist by default | Strong donor/comms UX, but US-oriented receipts, no native Xero, weak sponsorship fit. |

## Gate Findings

### Sponsorship Is The Hardest Requirement

The PRD makes sponsorship support a hard criterion. Most products can approximate sponsorship with relationships, custom fields, recurring gifts, notes, and reports. That is not the same as a reliable sponsor stewardship workflow.

Minimum proof needed:

- Sponsor record links to programme/child reference without exposing unsafe child data publicly.
- Sponsorship status and payment cycle are visible.
- Sponsor update templates can be sent or recorded.
- Send history is visible on the sponsor/contact record.
- Active, lapsed, failed-payment, and update-pending sponsor lists can be exported.

**Infoodle** has the best public evidence for sponsorship-related support, but still needs proof of send-history workflow depth. **Salesforce** and **CiviCRM** can model the domain, but implementation quality will decide whether this becomes maintainable. Most other candidates are weak here.

### Xero Narrows The Field Quickly

DFN does not require direct API sync if exports/reconciliation are reliable, but Xero support is still selection-critical.

- **Infoodle** has the strongest Xero fit.
- **Keela** has direct Xero support, but entity/currency and split-gift concerns remain.
- **CiviCRM** has a CiviXero path but needs technical setup and support.
- **HubSpot** has native Xero data sync for contacts/items/invoices/payments, but that is not donor-gift reconciliation.
- **Blackbaud, Bloomerang, DonorPerfect, Little Green Light** appear to require export/API/middleware/custom process for Xero.
- **Microsoft** has connector options, but nonprofit gift-to-Xero reconciliation is not turnkey.

### AU/NZ Separation Is An Architecture Decision

No product should be selected until DFN chooses between:

- separate CRM/DMS instances per legal entity from the start, or
- one shared instance with clean entity fields, filters, permissions, reports, sender identities, receipt templates, and export boundaries.

Separate instances reduce legal/entity risk but create cross-country supporter-history duplication. Shared instances are easier for staff but can hide future separation costs.

## Vendor Notes

### Infoodle

Verdict: **Shortlist and test first.**

Strengths:

- Strong Xero integration and charity donation workflow.
- Receipts/statements, tax-rebatable classification, campaign/account-code filtering.
- Contacts, households/organisations, groups, custom fields, notes, reminders, communications history.
- Event registrations/attendance and profile-level event visibility.
- Reporting/exports and permission model are credible.
- Incumbent-data migration path should be simpler than a full platform change.

Risks:

- AU/NZ separation needs architecture: likely separate sites or disciplined entity scoping.
- Duplicate cleanup appears weaker than best-in-class CRM dedupe.
- Sponsorship appears supported, but DFN must prove update/send-history workflow depth.
- Failed recurring payment handling needs proof as a staff queue/task, not just notification.

Key sources:

- [Infoodle Xero integration](https://www.infoodle.com/features/full-xero-Integration)
- [Infoodle and Xero for charities](https://www.infoodle.com/xero/)
- [Infoodle Xero setup docs](https://help.infoodle.com/docs/how-to-connect-to-xero)
- [Infoodle fundraising and sponsorship programmes](https://www.infoodle.com/features/fundraising/)
- [Infoodle duplicate contact guidance](https://help.infoodle.com/docs/identifying-duplicate-contacts)
- [Infoodle pricing](https://www.infoodle.com/prices/)

### CiviCRM

Verdict: **Conditional shortlist if DFN wants open-source ownership.**

Strengths:

- Strong nonprofit-native model: contacts, organisations, households, relationships, activities, contributions, events, groups, tags, reports.
- Good imports, external IDs, dedupe rules, and merging.
- Strong event-history support.
- Flexible finance model through financial types, campaigns, source fields, custom fields, price sets, and soft credits.
- Good reporting/export foundation through CiviReport/SearchKit.

Risks:

- Xero path exists but is implementation/partner work.
- AU/NZ receipts need local legal/accounting configuration and validation.
- Sponsorship is modelable, not turnkey.
- Hosting, upgrades, extension management, security, and custom reports require technical ownership.

Key sources:

- [CiviCRM contacts](https://docs.civicrm.org/user/en/latest/organising-your-data/contacts/)
- [CiviCRM importing](https://docs.civicrm.org/user/en/latest/common-workflows/importing-data-into-civicrm/)
- [CiviCRM deduping and merging](https://docs.civicrm.org/user/en/latest/common-workflows/deduping-and-merging/)
- [CiviCRM contributions](https://docs.civicrm.org/user/en/latest/contributions/key-concepts-and-configurations/)
- [CiviCRM donation receipts](https://docs.civicrm.org/donationreceipts/en/latest/usage/creating-donation-receipts/)
- [CiviXero extension](https://civicrm.org/extensions/civixero)

### Salesforce Nonprofit Cloud / NPSP

Verdict: **Conditional enterprise shortlist.**

Strengths:

- Strong constituent, household/relationship, campaign, donation, recurring gift, designation, soft-credit, reporting, permissions, automation, API, and duplicate tooling.
- Flexible AU/NZ separation through fields, campaigns, designations, sharing/security, or separate orgs.
- Large ecosystem for integrations, payments, forms, events, dedupe, documents, and marketing.

Risks:

- Requires trained admin/developer ownership or partner support.
- NPSP and newer Nonprofit Cloud use different models; DFN must choose deliberately.
- Xero is not first-party donor reconciliation.
- Sponsorship and AU/NZ EOFY receipts are feasible but custom/partner work.
- Cost is not just licenses; implementation and ongoing admin are the real costs.

Key sources:

- [Salesforce Nonprofit pricing](https://www.salesforce.com/nonprofit/pricing/)
- [Salesforce fundraising data model](https://developer.salesforce.com/docs/platform/data-models/guide/fundraising.html)
- [NPSP household and organisation accounts](https://help.salesforce.com/s/articleView?id=sfdo.NPSP_Manage_Household_and_Org_Accts.htm&language=en_US&type=5)
- [Gift acknowledgments and tax receipts](https://help.salesforce.com/s/articleView?id=sfdo.fundraising_set_up_gift_acknowledgments_and_tax_receipts.htm&language=en_US&type=5)
- [Gift commitment processing](https://help.salesforce.com/s/articleView?id=sfdo.fundraising_gift_commitment_processing.htm&language=en_US&type=5)
- [Accounting Subledger export](https://help.salesforce.com/s/articleView?id=sfdo.ASL_Export.htm&language=en_US&type=5)
- [Xero Salesforce integration collection](https://apps.xero.com/collection/integrate-xero-with-salesforce)

### Blackbaud Raiser's Edge NXT

Verdict: **Strong general fundraising CRM, weak DFN-specific fit.**

Strengths:

- Mature constituent, relationship, gift, recurring-gift, campaign/fund/appeal, receipt, consent, duplicate, event, reporting, and permissions features.
- Strong gift coding and fundraising reporting.

Risks:

- No clear native Xero integration found.
- AU/NZ separation is configurable but not obviously clean as a multi-entity operating model.
- Sponsorship lifecycle would likely be custom fields/relationships/actions.
- Cost, implementation, and specialist-admin dependency are material.

Key sources:

- [Blackbaud constituent records](https://webfiles-sc1.blackbaud.com/files/support/helpfiles/rex/content/bb-constituent-record.html)
- [Blackbaud gifts](https://webfiles-sc1.blackbaud.com/files/support/helpfiles/rex/content/en-ca/content/bb-gifts-add.html)
- [Blackbaud duplicate records](https://webfiles-sc1.blackbaud.com/files/support/helpfiles/rex/content/bb-duplicate-records.html)
- [Blackbaud gift receipting](https://webfiles-sc1.blackbaud.com/support/helpfiles/rex/content/rcptmgr-receiptmgr.html)
- [Blackbaud AU payment processing](https://webfiles-sc1.blackbaud.com/files/support/helpfiles/rex/content/en-au/content/bb-payments-tutorial.html)
- [Blackbaud community thread on RE NXT and Xero](https://community.blackbaud.com/discussion/71436/re-nxt-xero-intergration)

### Microsoft Dynamics / Power Platform

Verdict: **Do not choose first-party Fundraising and Engagement for a new build.**

Strengths:

- Strong Microsoft ecosystem: Outlook, Teams, Excel, Power BI, Power Automate, Dataverse.
- Flexible platform security and entity separation through environments/business units/security roles.
- Customer Insights can handle consent, preference centres, suppression, and journeys.

Risks:

- Microsoft Fundraising and Engagement support ends on 2026-12-31, and new licensing ended 2025-01-01.
- The viable path is a custom/partner Dynamics 365 + Power Platform build, not a turnkey nonprofit CRM selection.
- Xero, AU/NZ receipts, sponsorship, and recurring-payment follow-up require integration and custom design.

Key sources:

- [Microsoft Fundraising and Engagement retirement](https://learn.microsoft.com/en-us/industry/nonprofit/whats-new-fundraising-engagement-2024-07-16)
- [Microsoft Fundraising app capabilities](https://learn.microsoft.com/en-us/industry/nonprofit/fundraising)
- [Common Data Model for Nonprofits](https://learn.microsoft.com/en-us/industry/nonprofit/common-data-model-for-nonprofits)
- [Dynamics 365 and Power Platform for nonprofits](https://www.microsoft.com/en-us/nonprofits/dynamics-365)
- [Customer Insights consent](https://learn.microsoft.com/en-us/dynamics365/customer-insights/journeys/real-time-marketing-compliance-settings)
- [Microsoft Xero connector](https://learn.microsoft.com/en-us/connectors/xeroaccountingmagnet/)

### DonorPerfect

Verdict: **Possible donor database, not preferred for DFN.**

Strengths:

- Mature donor/contact records, households, relationships, notes, gift/pledge history, event attendance, documents, tasks, and reports.
- Good gift coding with GL/fund/program, campaign, solicitation, split gifts, receipt amount/fair-market-value handling.
- AU/NZ pricing and local Melbourne support are public.

Risks:

- No official direct Xero integration found.
- AU/NZ separation, EOFY receipts, and sponsorship are not proven as clean native workflows.
- Add-ons and reporting/admin complexity can raise cost and implementation risk.

Key sources:

- [DonorPerfect Australia](https://www.donorperfect.com/australia/)
- [DonorPerfect AU/NZ pricing PDF](https://uploads.donorperfect.com/pdf/dp-australia-complete-pricing.pdf)
- [DonorPerfect donor management](https://www.donorperfect.com/fundraising-software/donor-management-software/)
- [DonorPerfect constituent tracking](https://www.donorperfect.com/factsheets/constituent-tracking/)
- [DonorPerfect procedures guide](https://uploads.donorperfect.com/pdf/procedures-guide.pdf)
- [DonorPerfect reporting](https://www.donorperfect.com/fundraising-software/fundraising-report-software/)

### Little Green Light

Verdict: **Good low-cost fallback, not strategic fit.**

Strengths:

- Affordable donor CRM with unlimited users.
- Constituents, households, relationships, groups/categories, notes, tasks, gifts, pledges, events, mailings, reports.
- Supports AUD/NZD and AU/NZ receipt numbering.
- Good generic import/dedupe/export tools.

Risks:

- One account supports one currency at a time; clean AU/NZ separation likely means separate accounts.
- No official direct Xero integration found.
- Sponsorship and recurring-failure follow-up would be manual/custom process-heavy.
- Native email automation is limited compared with HubSpot/Keela/Bloomerang.

Key sources:

- [Little Green Light pricing](https://www.littlegreenlight.com/pricing/)
- [Little Green Light currency support](https://help.littlegreenlight.com/article/240-selecting-your-preferred-currency)
- [Constituent record fields and relationship data](https://help.littlegreenlight.com/article/72-what-kind-of-information-can-i-store-about-a-constituent)
- [Gift entry](https://help.littlegreenlight.com/article/99-gift-entry)
- [Duplicate control on import](https://help.littlegreenlight.com/article/272-control-duplicates-on-import)
- [AU/NZ receipt numbering](https://help.littlegreenlight.com/article/423-add-receipt-numbers-to-acknowledgments)
- [Little Green Light integrations](https://www.littlegreenlight.com/integrations/)

### Keela

Verdict: **Promising mid-market demo candidate only if sponsorship is reduced or proven.**

Strengths:

- Strong donor CRM, households, tags, segments, interactions, to-dos, gift history.
- Direct Xero integration.
- Good receipting, including cumulative/automatic receipt workflows.
- Good email, consent statuses, unsubscribe handling, workflows.
- Works in Australia/New Zealand and supports import templates.

Risks:

- AU/NZ separation and multi-Xero/multi-currency workflow need vendor proof.
- No native child/program sponsorship module found.
- Split gifts look weaker than DFN's PRD may require.
- Permissions are relatively coarse.

Key sources:

- [Keela donor management](https://www.keela.co/)
- [Keela pricing](https://www.keela.co/pricing)
- [Keela integrations](https://www.keela.co/solutions/keela-integrations)
- [Keela Xero sync settings](https://support.keela.co/hc/en-us/articles/360053880732-Setup-Sync-Settings-for-Xero)
- [Keela contact import formatting](https://support.keela.co/hc/en-us/articles/43096273468813-Formatting-Your-Contact-Data-Spreadsheets)
- [Keela donation import formatting](https://support.keela.co/hc/en-us/articles/43096273784717-Formatting-Your-Donation-Data-Spreadsheets)
- [Keela recurring transaction failures](https://support.keela.co/hc/en-us/articles/43096219823629-Managing-Recurring-Transactions)
- [Keela permissions](https://support.keela.co/hc/en-us/articles/360038055511-User-Permission-Levels)

### HubSpot CRM

Verdict: **Good engagement layer; weak primary DMS.**

Strengths:

- Excellent contact timeline, lists, segments, workflows, email subscriptions, suppression, automation, reporting, and staff UX.
- Nonprofit discount available for Australia/New Zealand.
- Xero data sync exists for contacts, products/items, invoices, and payments.
- Flexible custom objects/associations can model some relationships on higher tiers.

Risks:

- Not a native donor database: gifts, designations, tax deductibility, split gifts, pledges, receipts, and sponsorship need custom objects or a fundraising platform.
- Xero sync is not donor reconciliation.
- Sponsorship likely requires Enterprise custom objects/workflows.
- Costs stack with Pro/Enterprise, onboarding, Brands, custom objects, and fundraising platform fees.

Key sources:

- [HubSpot for Nonprofits](https://www.hubspot.com/nonprofits)
- [HubSpot product catalog](https://legal.hubspot.com/hubspot-product-and-services-catalog)
- [HubSpot custom objects](https://knowledge.hubspot.com/object-settings/create-custom-objects)
- [HubSpot association labels](https://knowledge.hubspot.com/object-settings/create-and-use-association-labels)
- [HubSpot deduplication](https://knowledge.hubspot.com/records/deduplication-of-records)
- [HubSpot Xero data sync](https://knowledge.hubspot.com/integrations/connect-hubspot-and-xero-data-sync)
- [Fundraise Up HubSpot integration](https://fundraiseup.com/docs/hubspot/)
- [Fundraise Up receipts](https://fundraiseup.com/docs/receipt-settings/)

### Bloomerang

Verdict: **Strong donor/comms CRM, weak DFN fit.**

Strengths:

- Donor CRM basics are strong: constituents, households, relationships, timelines, notes, interactions, groups, tasks, imports, exports, and reports.
- Fundraising model supports fund/campaign/appeal, non-deductible amount, recurring gifts, pledges, receipts, acknowledgements.
- Communications and recurring payment follow-up are strong.

Risks:

- Organisation settings and statements appear US-oriented and account-level.
- No official native Xero integration found.
- No native child/program sponsorship module found.
- AU/NZ receipts and legal-entity separation would require validation and likely workarounds.

Key sources:

- [Bloomerang pricing](https://bloomerang.com/pricing/)
- [Bloomerang integrations](https://bloomerang.com/integrations)
- [Bloomerang organisation settings](https://help.bloomerang.com/en/articles/12632809-update-organization-settings)
- [Bloomerang imports](https://help.bloomerang.com/en/articles/12632760-imports-import-data-into-bloomerang-crm)
- [Bloomerang exports](https://help.bloomerang.com/en/articles/12632641-export-bloomerang-crm-data)
- [Bloomerang payment processors](https://help.bloomerang.com/en/articles/12632818-payment-processors-integrated-with-bloomerang-crm)
- [Bloomerang email preferences](https://help.bloomerang.com/en/articles/12632695-how-can-constituents-subscribe-and-unsubscribe-from-email-interests)

## Proof-Of-Fit Script

Run this before vendor selection. A vendor that cannot demonstrate these with representative data should not be selected.

1. **AU/NZ entity model**
   - Create one AU contact, one NZ contact, and one contact active in both contexts.
   - Record AU and NZ gifts, campaigns, subscriptions, sender identities, reports, and receipt templates.
   - Export entity-scoped data cleanly.

2. **Gift and accounting workflow**
   - Record a gift with entity, campaign, source, payment provider reference, tax classification, and two project/designation line items.
   - Reconcile or export it to Xero with stable IDs, account codes/tracking categories, and donor-facing gift history preserved.

3. **Receipting workflow**
   - Generate or export data for AU and NZ annual tax receipts/EOFY statements.
   - Confirm deductible and non-deductible line handling.
   - Confirm whether Xero or the CRM owns final receipts.

4. **Infoodle migration and dedupe**
   - Import representative Infoodle exports for contacts, households, gifts, groups, notes, events, sponsorships, and communications preferences.
   - Create duplicate candidates and merge them under staff review.

5. **Sponsorship stewardship**
   - Model sponsor, programme/child reference, sponsorship status, payment cycle, update template, update send, and send-history record.
   - Export active sponsors, failed sponsorship payments, pending updates, and lapsed sponsorships.

6. **Recurring payment failure follow-up**
   - Simulate a failed recurring donation or sponsorship payment.
   - Confirm status, notification, retry ownership, staff task/queue, and close-out path.

7. **Communication preferences**
   - Subscribe a contact to newsletter, prayer updates, campaign promotions, event follow-up, and sponsor updates.
   - Unsubscribe from one segment and globally suppress another.
   - Confirm prayer updates require vetted/trusted status.

8. **Event history**
   - Register a contact for an event, mark attendance, and show it in contact history.
   - Export attendee and follow-up lists.

9. **Reporting**
   - Produce exports/reports for donor/gift history, campaign totals, project/designation totals, active/lapsed donors, recurring payment failures, sponsorship status, and subscription counts.

10. **Permissions**
    - Confirm a restricted staff user cannot see sensitive donor notes, prayer-update lists, sponsorship-sensitive fields, or financial fields outside their role.

## Decision Issues To Create

1. Decide AU/NZ CRM architecture: shared instance with entity scoping vs separate instances.
2. Decide final receipt source of truth: Xero-generated receipts/statements vs CRM-generated receipts/statements.
3. Decide sponsorship data safety boundary: what child/programme details may live in CRM/DMS.
4. Decide payment-failure ownership: payment provider, CRM/DMS, EMS, or integration.
5. Decide EMS ownership: CRM-native email vs separate EMS with preference/suppression sync.

## Bottom Line

Infoodle is the pragmatic first proof-of-fit because it most directly addresses DFN's critical Xero, receipt, donor, event, reporting, and migration concerns. It is not automatically the final answer: DFN must prove AU/NZ separability, dedupe, sponsorship send-history, and recurring-payment follow-up. If Infoodle cannot pass those proof scenarios, the next best options are not "simpler SaaS donor CRMs"; they are implementation projects: CiviCRM for open-source control or Salesforce for enterprise platform depth.

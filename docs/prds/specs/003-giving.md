# PRD: Giving, Appeals, and Donation Catalogue

## Document Role

Parent programme PRD: [Parent Rebuild Scope and Launch Parity](001-overview.md)

This is a PRD/epic spec. It is not intended to be implemented directly. Use it to create focused GitHub decision issues and thin vertical implementation issues for giving, attribution, confirmations, receipts, campaign giving, and donation catalogue work.

## Problem Statement

DFN needs the rebuilt website to preserve and improve its giving workflows without treating every payment-like interaction as the same kind of transaction.

The current site supports donations, appeals, sponsorship-related giving, support-a-village, direct deposit instructions, country-specific giving, Stripe-powered card payments, donation confirmations, newsletter opt-ins, and product-like giving flows. The rebuild must support giving on both `dfn.org.au` and `dfn.org.nz`. These flows must remain attributable, reportable, and clear to donors while leaving implementation and system-of-record details open where needed.

## Solution

Create branded DFN giving flows for one-off and recurring donations, appeals, programme gifts, campaign gifts, support-a-village, and product-like donation catalogue items. Each gift should carry clear purpose attribution, site attribution, country/currency handling, tax deductibility guidance, confirmation behaviour, and reporting/export support.

Bequests and event tickets are handled separately. Child sponsorship is covered by a dedicated sponsorship PRD because individual profiles and safeguarding make it distinct.

## User Stories

1. As a donor, I want to make a one-off donation, so that I can support DFN immediately.
2. As a donor, I want to set up recurring giving, so that I can provide ongoing support.
3. As a donor, I want to choose my country/currency early, so that payment and receipt expectations are correct.
4. As an Australian donor, I want Australian tax and receipt information, so that I understand my giving record.
5. As a New Zealand donor, I want New Zealand tax and receipt information, so that I understand my giving record.
6. As a donor, I want to choose an appeal or giving purpose, so that my gift is attributed correctly.
7. As a donor, I want "where most needed" to be available, so that I can give flexibly.
8. As a donor, I want to give by card on a branded DFN page, so that the payment experience feels trustworthy.
9. As a donor, I want direct deposit instructions, so that I can give offline when preferred.
10. As a donor using direct deposit, I want guidance on what purpose/reference to include, so that DFN can attribute the gift.
11. As a donor, I want a confirmation page and email, so that I know my gift was received or submitted.
12. As a donor, I want newsletter/prayer/update opt-ins to be explicit, so that I control what communications I receive.
13. As a donor to a community campaign, I want to see the campaign story and progress, so that I understand the impact of my gift.
14. As a donor to a public campaign, I want to give anonymously, so that my name is not shown publicly.
15. As DFN staff, I want every gift to carry purpose and source attribution, so that reporting and follow-up are accurate.
16. As DFN staff, I want to create and update giving options, campaigns, and catalogue-style gift options, so that fundraising content can change without developer intervention.
17. As DFN staff, I want to see or export giving records, so that finance and fundraising can reconcile and report.
18. As DFN staff, I want internal notifications for relevant giving activity, so that timely follow-up can happen.
## Implementation Decisions

- Giving includes one-off donations, recurring donations, appeals, scholarship giving, support-a-village, donor/community campaign donations, and product-like donation catalogue items.
- Bequests are not a normal giving checkout workflow for launch.
- Event tickets are not donations by default.
- Child sponsorship is managed in a separate PRD.
- Country/currency choice should be clear early in giving flows.
- Giving must use site attribution from the start of the workflow.
- AU/NZ giving should support country-specific payment, direct deposit, confirmation, and receipt wording.
- Card payments should use separate payment accounts for Australia and New Zealand.
- Payment should happen inside branded DFN pages where possible.
- Donor self-service for recurring payment management can be provider-hosted at launch.
- The site should provide a site-owned confirmation page after payment.
- Payment confirmation emails are required.
- Tax receipt handling is in scope at requirements level, with country-specific expectations.
- Card payments and direct deposit/offline giving instructions should both be supported.
- Direct deposit instructions should be country-specific and include purpose attribution guidance.
- Every payment should be attributable to a purpose.
- Attribution should include site, purpose, and campaign/page/event/source where available.
- "Where most needed" is an explicit attribution option.
- General donations can be one-off or monthly.
- Appeals and donation-catalogue items default to one-off unless staff mark them recurring-capable.
- Donation catalogue items can be fixed-price or variable amount.
- Giving pages should show tax deductibility by country/purpose where applicable.
- Donors should be able to give anonymously on public campaign pages.
- Public campaign pages should show fundraising progress.
- Public campaign progress should be able to combine online gifts with staff-managed offline adjustments where DFN chooses to include offline giving in the displayed total.
- Public donor walls/messages are out of scope for launch; show progress only.
- Staff should be able to create/manage campaigns initially.
- Campaigns are expected to be country-specific for launch, pending confirmation of whether any campaign needs shared cross-country publishing or combined progress.
- Supporter self-service campaign creation is out of scope for launch.
- Reporting/exporting is required, but the system of record is TBD.
- The website must capture and expose enough data for reporting, whether internally or via connected external systems, with AU/NZ filtering.

## Testing Decisions

- Test giving at end-to-end workflow level on both domains: select country/currency where needed, choose purpose, enter donor details, pay, receive confirmation, and verify site attribution.
- Test direct deposit instructions for country-specific details and purpose/reference guidance.
- Test campaign giving by confirming public progress, site attribution, anonymity handling, and reporting/export data.
- Test campaign progress by confirming online gifts update progress and staff-managed offline adjustments can be reflected where enabled.
- Test recurring giving setup and provider-hosted management expectations without requiring a donor account area.
- Test tax and receipt content by country and giving purpose once final rules are confirmed.
- Test staff management by creating, previewing, publishing, and updating a campaign/giving option.
- Test analytics/conversion tracking expectations for giving completion, campaign donation, and relevant opt-ins.

## Out of Scope

- Donor account area on the DFN website.
- Supporter self-service campaign creation.
- Public donor wall or public donor messages.
- Bequest-specific workflow beyond content and CTAs.
- Event ticketing.
- Detailed system integration design.

## Open Questions

- Donation catalogue visitor-facing naming.
- Reporting/export system of record.
- Final recurring options per giving product.
- Final tax receipt rules for AU/NZ and each giving purpose.
- Whether any campaign needs shared cross-country publishing or combined progress.
- Internal notification recipients.
- Confirmation email ownership.

## Reference URLs

- <https://dfn.org.au/donate/>
- <https://dfn.org.au/give/support-a-village/>
- <https://dfn.org.au/events/my-event/>
- <https://dfn.org.au/give/7n7/>
- <https://dfn.org.au/faqs/>

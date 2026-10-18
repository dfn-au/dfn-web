# PRD: Giving, Appeals, and Donation Catalogue

## Document Role

Parent programme PRD: [Parent Rebuild Scope and Launch Parity](001-overview.md)

This is a PRD/epic spec. It is not intended to be implemented directly. Use it to create focused GitHub decision issues and thin vertical implementation issues for giving, attribution, confirmations, receipts, campaign giving, and donation catalogue work.

## Confirmed Initial Donation Scope

Agreed with Andrew on 13 September 2026. This section governs the initial donation integration; excluded requirements below remain separate work. The architecture is recorded in [ADR 006](../../adr/006-stripe-donation-ownership.md), and implementation is tracked in GitHub issues [#62](https://github.com/dfn-au/dfn-web/issues/62)–[#65](https://github.com/dfn-au/dfn-web/issues/65).

- Use a DFN form followed by Stripe Embedded Checkout, accepting Stripe's supported form structure.
- Carry over Education, Healthcare, Economic Empowerment, Community Village Leader, Support a Village, Shelter Operations, and Where most needed. Staff edit the purposes in Sanity.
- All seven purposes support one-off and monthly giving. Each donation has one purpose.
- Provide custom amounts and staff-editable suggested amounts, configured separately for one-off and monthly giving.
- Default the general form to one-off and Where most needed, with no amount selected. Appeal pages preselect their purpose and retain appeal attribution separately.
- Require name and email; keep phone and address optional. Collect optional fields outside Checkout where its native fields cannot preserve that optionality.
- Impose no DFN minimum above Stripe's processing limits. Do not add a processing-fee contribution option.
- Use a test Stripe account in development and the existing separate AU/NZ Country Payment Accounts at go-live. Follow the current [ADR 001](../../adr/001-website-technical-architecture.md): deployment configuration selects the Country Site, currency, and payment account.
- Use normal Stripe behaviour for new monthly subscriptions and preserve existing subscriptions and account-managed arrangements.
- Keep existing Stripe confirmation emails and recurring-management arrangements. No website recurring-management or replacement email workflow is required.
- Provide a site-owned thank-you page with payment state verified against Stripe.
- Provide country-specific bank-deposit details and purpose/reference guidance only. Reconciliation stays with the existing finance process; no intended-transfer form is required.
- Stripe owns donation/payment records and purpose, appeal/source, and Country Site Attribution. Sanity owns editable configuration. Do not add a separate website donation database, ledger, or reporting interface for this slice.
- Exclude the gift catalogue from initial launch. Campaign totals and CRM/Xero integrations are separate work. Official tax receipts remain in the existing finance workflow.

### Required Before Go-live

**TODO: connect donation communication opt-ins to a working subscription workflow before the AU/NZ sites go live.** This is deferred from the initial Stripe implementation, not beyond launch. General/prayer update opt-ins must be unchecked by default, reach the agreed destination when selected, and not subscribe donors when unselected. Track this in [the go-live register, issue #8](https://github.com/dfn-au/dfn-web/issues/8), with forms work in [#15](https://github.com/dfn-au/dfn-web/issues/15) and mailing-platform/preference ownership in [#27](https://github.com/dfn-au/dfn-web/issues/27). A form that only logs a request does not fulfil this requirement.

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
13. As a donor to a community campaign, I want to see the campaign story and giving purpose, so that I understand the impact of my gift.
14. As a donor to a public campaign, I want to give anonymously, so that my name is not shown publicly.
15. As DFN staff, I want every gift to carry purpose and source attribution, so that reporting and follow-up are accurate.
16. As DFN staff, I want to create and update giving options, campaigns, and catalogue-style gift options, so that fundraising content can change without developer intervention.
17. As DFN staff, I want to see or export giving records, so that finance and fundraising can reconcile and report.
18. As DFN staff, I want internal notifications for relevant giving activity, so that timely follow-up can happen.
## Implementation Decisions

For the initial integration, use the confirmed scope above. Catalogue, public campaign progress, and broader operational requirements below are separate work.

- Giving includes one-off donations, recurring donations, appeals, scholarship giving, support-a-village, donor/community campaign donations, and product-like donation catalogue items.
- Bequests are not a normal giving checkout workflow for launch.
- Event tickets are not donations by default.
- Child sponsorship is managed in a separate PRD.
- Country/currency choice should be clear early in giving flows.
- Giving must use site attribution from the start of the workflow.
- AU/NZ giving should support country-specific payment, direct deposit, confirmation, and receipt wording.
- Card payments should use separate payment accounts for Australia and New Zealand.
- Payment should happen inside branded DFN pages where possible.
- Existing Stripe arrangements own recurring payment management for the initial integration; no website self-service implementation is required.
- The site should provide a site-owned confirmation page after payment.
- Existing Stripe payment confirmation emails satisfy the initial donation integration.
- Tax receipt handling is in scope at requirements level, with country-specific expectations.
- Card payments and direct deposit/offline giving instructions should both be supported.
- Direct deposit instructions should be country-specific and include purpose attribution guidance.
- Every payment should be attributable to a purpose.
- Attribution should include site, purpose, and campaign/page/event/source where available.
- "Where most needed" is an explicit attribution option.
- General donations can be one-off or monthly.
- Initial appeal donations use their selected purpose's one-off/monthly options. Catalogue recurrence is a later decision.
- Donation catalogue items can be fixed-price or variable amount.
- Giving pages should show tax deductibility by country/purpose where applicable.
- Donors should be able to give anonymously on public campaign pages.
- Public campaign totals/progress and donor walls/messages are outside launch scope. If totals are reinstated, decide their authoritative source and treatment of offline gifts before implementation ([#19](https://github.com/dfn-au/dfn-web/issues/19)).
- Staff should be able to create/manage campaigns initially.
- Campaign copy can be shared or country-specific, with Christmas confirmed as a shared example in [#68](https://github.com/dfn-au/dfn-web/issues/68). Payment routing and attribution remain country-specific; public totals are deferred.
- Supporter self-service campaign creation is out of scope for launch.
- Stripe owns initial donation/payment records and attribution. Broader reporting/export tooling and handoffs are separate work.
- The website must capture and expose enough data for reporting, whether internally or via connected external systems, with AU/NZ filtering.

## Testing Decisions

For the initial donation integration, verify both Country Sites, one-off/monthly and suggested/custom amounts, required/optional donor fields, server validation, safe retries, Stripe attribution, verified thank-you states, and bank-deposit instructions. The implementation issues define concrete acceptance cases. Campaign progress, reporting, and other broader workflow checks below apply when those separate features are scoped. The communication opt-in handoff must be verified before go-live.

- Test giving at end-to-end workflow level on both domains: verify the deployment country/currency, choose purpose, enter donor details, pay, receive confirmation, and verify site attribution.
- Test direct deposit instructions for country-specific details and purpose/reference guidance.
- Test campaign giving by confirming purpose, appeal and Country Site Attribution on the payment records.
- Test recurring giving setup and provider-hosted management expectations without requiring a donor account area.
- Test tax and receipt content by country and giving purpose once final rules are confirmed.
- Test staff management by creating, previewing, publishing, and updating a campaign/giving option.
- Test analytics/conversion tracking expectations for giving completion, campaign donation, and relevant opt-ins.

## Out of Scope

For the initial integration, also exclude the gift catalogue, split-purpose payments, processing-fee contributions, public campaign totals, a separate website donation database/reporting interface, CRM/Xero integrations, replacement payment emails, and website recurring management. Communication opt-ins remain a required pre-go-live follow-up.

- Donor account area on the DFN website.
- Supporter self-service campaign creation.
- Public donor wall or public donor messages.
- Bequest-specific workflow beyond content and CTAs.
- Event ticketing.
- Detailed system integration design.

## Decision Issues

Current questions, outcomes and evidence live in the linked issues.

- [Tax and receipt wording #11](https://github.com/dfn-au/dfn-web/issues/11).
- [Reporting and handoffs #12](https://github.com/dfn-au/dfn-web/issues/12).
- [Notifications outside initial Stripe confirmations #13](https://github.com/dfn-au/dfn-web/issues/13).
- [Campaign fields and donation opt-ins #15](https://github.com/dfn-au/dfn-web/issues/15).
- [Annual receipt and Xero workflow #22](https://github.com/dfn-au/dfn-web/issues/22).
- [Mailing and preference ownership #27](https://github.com/dfn-au/dfn-web/issues/27).

## Reference URLs

- <https://dfn.org.au/donate/>
- <https://dfn.org.au/give/support-a-village/>
- <https://dfn.org.au/events/my-event/>
- <https://dfn.org.au/give/7n7/>
- <https://dfn.org.au/faqs/>

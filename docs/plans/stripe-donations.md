# Stripe donation implementation plan

Prepared 18 September 2026 against `origin/main` at `cea7d85`. Product scope is confirmed in the [giving PRD](../prds/specs/003-giving.md) and [ADR 006](../adr/006-stripe-donation-ownership.md). The implementation details and slice breakdown below are proposed for review; implementation issues have not yet been published.

Parent decision: [#20](https://github.com/dfn-au/dfn-web/issues/20). The earlier worktree's uncommitted documentation was not preserved; this change restores the agreed scope from the conversation and GitHub decisions. ADR 005 is now staff authentication, so the donation decision is recorded as ADR 006. The current ADR 001 uses deployment configuration rather than request-domain inference for Country Site selection.

## Current starting point

- Next.js App Router, Sanity Studio, generated GROQ types, Zod, and Vitest are present. Stripe packages, donation routes, giving configuration, and campaign configuration are absent.
- The country publishing/deployment approach is accepted in ADRs 001/004, but the checked main branch does not yet implement a Country Site resolver. The first donation slice includes the minimal validated deployment configuration it needs; it does not implement the whole publishing project.
- The existing generic content-page route and shared header/footer can supply page chrome. A dedicated donation route must have explicit ownership so a CMS page cannot claim the same path.
- Newsletter signup now has a Turnstile-protected endpoint, but its sink logs submissions rather than subscribing them. It is not a completed opt-in integration and must not be reused as if it were one.
- Existing Stripe account settings, account identifiers, and credentials have not been inspected. Test credentials and the final live-account verification are external setup prerequisites, not reasons to guess values or change existing subscriptions.

## Proposed delivery order

| Slice | Demoable outcome | Blocked by | Giving PRD stories |
| --- | --- | --- | --- |
| 1. Accept a one-off donation | Staff edit giving options; a donor pays through Embedded Checkout and sees a verified thank-you on either Country Site | Test Stripe credentials for end-to-end verification; coding can start immediately | 1, 3, 6, 7, 8, 11, 15, 16 |
| 2. Accept a monthly donation | The same form creates an attributed monthly subscription using separately configured suggestions | Slice 1 | 2, 6, 8, 11, 15, 16 |
| 3. Donate from an appeal | An appeal selects the purpose and retains source attribution through payment and monthly renewals | Slices 1 and 2 | 6, 15, 16 |
| 4. Give by bank deposit | Staff publish country-specific bank details and donors can follow purpose/reference instructions | Slice 1, for the shared donation page/configuration | 9, 10, 16 |

Each slice includes its configuration, server behaviour, donor UI, and relevant tests. There is no separate schema-only, API-only, or test-only ticket. Slice 4 can run alongside slices 2/3 after slice 1. Complete the go-live gate below after all four and the separately owned communication work.

## Shared implementation design

### Country, configuration, and form

Validate a server-owned `COUNTRY_SITE` value of AU or NZ and map it to AUD or NZD. Each deployment receives only its own Stripe key pair and an approved public origin; local/preview deployments use test keys. Reject missing/invalid configuration. Neither a request body nor a Host header chooses the account, currency, or return origin. A shared test account is acceptable for development, but account-selection tests and eventual live verification must still distinguish AU/NZ.

Use a Sanity giving-settings document with shared purpose entries and explicit AU/NZ settings for suggested amounts, bank details, and country-specific copy. Purpose entries have stable identities separate from editable labels. Seed the seven agreed purposes, not arbitrary production amounts or bank details. Keep separate one-off/monthly suggestion arrays. Missing country-specific values do not fall back to the other country. Published configuration is authoritative for live Checkout; draft previews cannot create live payments from unpublished settings.

Add dedicated `/donate` and `/donate/thank-you` routes, reuse existing page chrome, reserve their paths in CMS validation, and update the donation CTA only when that Country Site is ready to use the new flow. General defaults are one-off, Where most needed, and no selected amount. Changing a purpose, frequency, or amount before payment rebuilds the checkout attempt rather than charging a stale selection.

Parse amounts as exact minor-unit integers. Accept positive custom amounts within Stripe's currency limits, with no additional DFN minimum. The server validates the current published purpose, permitted frequency, decimal precision, and account currency. Suggested amounts are convenience choices, not a restriction on custom amounts. Reject forged account, price, purpose, or amount inputs rather than trusting client-rendered controls.

### Stripe records and attribution

Create a Stripe Customer for the attempt with the supplied name/email and any optional phone/address, then create the Checkout Session with that Customer. Do not locate, merge, or overwrite an existing donor by email alone. Reuse the same Customer on retries of the same attempt. Creating abandoned Customer records is an accepted implementation trade-off to preserve optional contact fields without a local donor database; cleanup is not part of this slice. Do not store contact details in metadata, application logs, or analytics.

Use one line item at the server-validated amount, with a clear purpose label. Select payment or subscription mode from the validated frequency; monthly uses an inline recurring price. Pin and use SDK-supported embedded Checkout parameters rather than copying unversioned sample enums. Do not introduce trials, custom billing anchors, invoice-email changes, or a website customer portal. [Checkout Session creation](https://docs.stripe.com/api/checkout/sessions/create)

Use a small attribution contract: schema version, integration identifier, Country Site, stable purpose ID, purpose-label snapshot, optional published appeal ID, and source page ID. Store it on the Checkout Session and also on the objects below. Resolve appeal/source identifiers server-side; do not save arbitrary query strings or full referring URLs.

| Giving frequency | Additional Stripe record | How later records retain attribution |
| --- | --- | --- |
| One-off | PaymentIntent metadata | Stripe copies PaymentIntent metadata to the resulting Charge |
| Monthly | Subscription metadata | Stripe snapshots subscription metadata onto the invoice's subscription details, including renewal invoices |

Metadata is not automatically copied between all Stripe objects. In particular, do not promise that every monthly Charge or a default Payments CSV contains the subscription metadata. Verify record traversal on real test payments and a renewal invoice. Preserve IDs and label snapshots so future content edits do not rewrite historical gift attribution. [Stripe metadata behaviour](https://docs.stripe.com/metadata)

### Retries and payment confirmation

Give each donation attempt a random identifier, retained across retries. Namespace Stripe idempotency keys by Country Site, mode, attempt, and operation (Customer creation versus Checkout Session creation). Reuse keys only with identical request parameters; changed donor selections start a new attempt. Disable repeated submits in the UI and test a timeout after Stripe has created the Session. Stripe's key retention is finite, so this prevents duplicate work for the same active attempt, not all future intentional donations. [Stripe idempotent requests](https://docs.stripe.com/api/idempotent_requests)

Keep session creation same-origin, validate bounded input, and reuse the project's established bot-verification approach for the payment-creation action without treating the temporary newsletter sink as a subscription service. Preserve form values on recoverable failures. Keep secret keys and client secrets out of logs, error reports, and analytics.

The thank-you route retrieves the Session server-side using the current deployment's Stripe account and checks this integration's identifier and Country Site. Bind access to donation details to the initiating browser using a signed, short-lived attempt cookie; possessing a Session ID alone must not reveal donor details. Use no-store responses and suppress sensitive URL/query data from analytics and referrers.

Show a successful donation only when Stripe confirms it is paid. Render distinct pending, incomplete/expired, invalid, and temporary-unavailability states with safe retry paths. Refreshing the page must not create a Customer, payment, or subscription. The return page is a display, not the source of payment truth. [Embedded Checkout completion](https://docs.stripe.com/payments/checkout/custom-success-page?payment-ui=embedded-page)

No webhook endpoint or local event store is proposed for this slice because it has no website-owned fulfilment, email, ledger, or downstream mutation. A donor who never returns still has a Stripe-owned payment and existing Stripe communications. Future subscription handoffs or campaign totals must use a reliable delivery/retry design; do not bolt those side effects onto the return-page request. This is a design inference from the agreed ownership boundary and Stripe's distinction between a status page and reliable fulfilment.

## Issue drafts

### 1. Accept one-off donations through Stripe Embedded Checkout

**Parent:** #20. **Blocked by:** none for implementation; test credentials are required for Stripe verification. **Stories:** 1, 3, 6, 7, 8, 11, 15, 16.

**What to build:** Let staff publish the seven giving purposes and country-specific suggestions, and let a donor select a purpose and amount, supply contact details, pay in the embedded form, and receive a verified website thank-you. Establish the shared country/configuration and safe-attempt behaviour through this complete one-off journey.

**Acceptance criteria:**

- [ ] Staff can edit purposes and one-off suggestions; published changes appear on the appropriate Country Site. Stable purpose identities survive label edits.
- [ ] Both Country Site configurations select the correct currency and payment-account context. Invalid configuration fails closed; neither client parameters nor host headers can switch the account.
- [ ] Defaults, custom amounts, required name/email, optional phone/address, and one-purpose-per-donation behaviour match the agreed scope.
- [ ] The payment-creation action validates published configuration and amounts and enforces the established origin/bot checks. Malformed and tampered requests do not create payment attempts.
- [ ] A successful test payment appears in Stripe with donor details and correct purpose/Country Site metadata on the PaymentIntent/Charge.
- [ ] Repeated submission and a lost create-session response reuse the same Customer/Session for the active attempt; changing selections starts a new attempt.
- [ ] The thank-you page verifies paid state server-side and handles pending, declined, incomplete, expired, unknown, and wrong-country Sessions without disclosing donor data. Refresh cannot create another payment.
- [ ] Keyboard/mobile flow, validation errors, and recovery are usable. Automated tests cover server boundaries and a real Stripe test payment verifies the integration.
- [ ] No replacement confirmation email, donor portal, database, or newsletter opt-in controls are introduced.

### 2. Accept monthly donations with separate suggested amounts

**Parent:** #20. **Blocked by:** slice 1. **Stories:** 2, 6, 8, 11, 15, 16.

**What to build:** Extend the same published purposes and form with monthly giving, independently editable monthly suggestions, and custom monthly amounts. Stripe manages the resulting subscription and existing payment communications.

**Acceptance criteria:**

- [ ] All seven purposes offer monthly giving; staff can edit monthly suggestions independently of one-off suggestions.
- [ ] The donor can enter a custom monthly amount, and Checkout clearly shows its monthly frequency before payment.
- [ ] Switching frequency rebuilds the active attempt with the right suggestions and amount; no stale one-off or monthly Session is charged accidentally.
- [ ] Stripe creates one subscription for a retried attempt, with correct country/purpose attribution and normal billing behaviour. Existing subscriptions and account-managed settings are unchanged.
- [ ] Verify attribution on the subscription, first invoice, and a test renewal invoice. Do not substitute mocked metadata-copy behaviour for this integration check.
- [ ] Failed or pending initial payments are not presented as successful donations. Recurring management and payment emails remain with existing Stripe arrangements.

### 3. Preserve appeal attribution through donations

**Parent:** #20. **Blocked by:** slices 1 and 2. **Stories:** 6, 15, 16.

**What to build:** Allow staff to configure an appeal donation action with a stable appeal identity and linked giving purpose. A donor follows the action into the donation form with that purpose preselected; the resulting gift retains the appeal separately from its purpose.

**Acceptance criteria:**

- [ ] Staff can author and preview an appeal donation action using the smallest CMS extension needed for the existing page/action system; no campaign builder or totals feature is added.
- [ ] The server resolves the published appeal/action, purpose, and Country Site eligibility. Invalid or wrong-country references cannot silently select a different purpose or forge appeal attribution.
- [ ] Both one-off and monthly flows preserve the stable appeal/source identity separately from the selected purpose, including subscription renewal invoices.
- [ ] Label edits retain historical IDs/snapshots. A removed or unavailable appeal gives the donor a clear route back to general giving without pretending the gift belongs to that appeal.
- [ ] The general donation path continues to work without any appeal selected.

### 4. Publish country-specific bank-deposit instructions

**Parent:** #20. **Blocked by:** slice 1. **Stories:** 9, 10, 16.

**What to build:** Let staff publish AU/NZ bank details and reference instructions, and let donors access them from the donation page as an alternative to the embedded payment flow.

**Acceptance criteria:**

- [ ] Staff can edit account details and purpose/reference guidance for each Country Site and preview the result.
- [ ] Each deployment displays only its own published details; missing details never fall back to the other country.
- [ ] Donors can read/copy the account details and understand how to identify the giving purpose in their transfer reference.
- [ ] Choosing bank deposit does not create a Stripe Session or imply that DFN has received payment. There is no intended-transfer form or website reconciliation process.
- [ ] Validate the rendered details against staff-approved source information before go-live, and test missing-country configuration and keyboard/mobile presentation.

## Go-live gate and separately owned work

Keep the launch coordination in [#8](https://github.com/dfn-au/dfn-web/issues/8), rather than creating a second register. These are release checks, not another horizontal implementation slice:

- Confirm both production deployments' Country Site, canonical origin, currency, and existing Stripe account identity; ensure previews cannot use live credentials.
- Staff supply/approve actual suggestions, bank details, and existing AU/NZ tax/receipt wording. Tax/annual-receipt questions remain with [#11](https://github.com/dfn-au/dfn-web/issues/11) and [#22](https://github.com/dfn-au/dfn-web/issues/22).
- Inspect existing Stripe emails, recurring-management access, account payment methods, and active integrations. Confirm newly created gifts fit them without reconfiguring existing subscriptions or taking ownership of unrelated webhooks.
- Complete the communication handoff under [#15](https://github.com/dfn-au/dfn-web/issues/15)/[#27](https://github.com/dfn-au/dfn-web/issues/27), including unchecked defaults and correct AU/NZ/list handling. The existing logging-only newsletter endpoint does not close this gate.
- Verify one-off/monthly, custom/preset, success/failure/retry, and appeal/general paths on both test deployments. Use real test transactions for Stripe integration checks; any live payment requires separate authorization.
- Agree the cutover and rollback route to the current donation flow before changing public CTAs. Do not terminate or migrate existing recurring gifts as part of this release.

Verification grows with the slices: use the repository's schema/type generation, lint, type checks, and Vitest checks, plus targeted browser/Stripe test verification. This document does not claim those implementation checks have been run.

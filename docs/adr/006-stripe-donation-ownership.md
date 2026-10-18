# ADR 006: Stripe donation payments and record ownership

Accepted with Andrew on 13 September 2026. [#20](https://github.com/dfn-au/dfn-web/issues/20) records the initial donation scope, including all seven approved purposes supporting one-off and monthly giving. Implementation is tracked in [#62](https://github.com/dfn-au/dfn-web/issues/62), [#63](https://github.com/dfn-au/dfn-web/issues/63), [#64](https://github.com/dfn-au/dfn-web/issues/64) and [#65](https://github.com/dfn-au/dfn-web/issues/65).

Use a DFN form followed by Stripe Embedded Checkout. Development uses a test account; each production Country Site uses its existing separate Stripe account and currency, selected by deployment configuration under [ADR 001](001-website-technical-architecture.md).

Sanity owns editable purposes and suggested amounts. Stripe owns donation/payment records and purpose, appeal/source and Country Site Attribution. A separate website donation database, ledger or reporting interface would duplicate that ownership, so it is outside this slice. Store attribution on the appropriate payment and subscription records; Checkout Session metadata alone does not propagate to every related record. This applies [ADR 003](003-authored-content-and-operational-state-ownership.md).

Preserve existing subscriptions, account-managed arrangements, payment emails and donor-management workflows. New monthly subscriptions use normal Stripe behaviour. The site supplies a thank-you page verified against Stripe. Bank deposit is country-specific details and reference guidance, reconciled through the existing finance process; official tax receipts stay with that process.

Live-account configuration still needs inspection before cutover. Gift catalogue is excluded from initial launch; public campaign totals and CRM/Xero integrations are separate work. [Launch issue #8](https://github.com/dfn-au/dfn-web/issues/8) owns remaining acceptance, including working communication opt-ins, unchecked by default, before go-live. Accepted ownership does not imply implementation or production verification.

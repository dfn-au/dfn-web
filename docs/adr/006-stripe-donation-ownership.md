# ADR 006: Stripe Donation Payments and Record Ownership

Accepted: donation scope agreed with Andrew on 13 September 2026; recorded here on 18 September 2026. Earlier uncommitted notes and issue references called this ADR 005; that number is now occupied by operational staff authentication. This ADR also follows the subsequently amended deployment configuration in [ADR 001](001-website-technical-architecture.md).

Use Stripe Embedded Checkout for one-off and monthly donations, with a DFN form for purpose, amount, frequency, and donor details. Use a test account during development and the existing separate AU/NZ Country Payment Accounts at go-live. The fixed deployment `COUNTRY_SITE` selects the account and currency; request hostnames and visitor location do not select them.

Sanity owns editable purposes and suggested amounts as Authored Content. Stripe owns donation/payment Operational State and purpose, appeal/source, and Country Site Attribution. Keep the initial integration focused on accepting donations without a separate website donation database, ledger, or reporting interface. This applies the ownership boundary in [ADR 003](003-authored-content-and-operational-state-ownership.md).

Preserve existing subscriptions, account-managed arrangements, payment emails, and donor-management workflows. New monthly subscriptions use normal Stripe behaviour. The website supplies a thank-you page verified against Stripe; bank deposit is country-specific details and reference guidance, reconciled through the existing finance process.

## Consequences

- Store attribution on the appropriate Stripe payment and subscription records; Checkout Session metadata alone does not propagate to every related record.
- Live-account configuration still needs inspection before cutover. Ownership is settled; configuration has not been verified.
- Public campaign totals and CRM/Xero integrations are separate work. Gift catalogue is excluded from initial launch. New downstream actions require their own delivery/retry design when scoped.
- Communication opt-ins are deferred from this slice but must work before go-live, unchecked by default, as tracked in [issue #8](https://github.com/dfn-au/dfn-web/issues/8), [#15](https://github.com/dfn-au/dfn-web/issues/15), and [#27](https://github.com/dfn-au/dfn-web/issues/27).

See the [giving PRD](../prds/specs/003-giving.md) for product requirements and the [implementation plan](../plans/stripe-donations.md) for proposed delivery details. The decisions are also recorded in [issue #20](https://github.com/dfn-au/dfn-web/issues/20).

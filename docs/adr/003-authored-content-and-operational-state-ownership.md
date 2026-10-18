# ADR 003: Authored Content and Operational State ownership

Accepted. Sanity owns staff-published Authored Content and safe configuration: public copy, media, pages, stories, campaigns, event descriptions, giving purposes and SEO fields. A payment provider, relational database or workflow-specific operational system owns transactional and sensitive Operational State: payments, donor records, registrations, reservations, capacity, availability and dietary/allergy details.

This boundary keeps editorial publishing separate from transactional correctness and supporter privacy. An integrated CMS/database product would still need explicit ownership for each workflow; using one product would not remove the boundary. An operational workflow does not require a website database when an external system already owns its records.

Campaign progress and sponsorship availability, if in scope, are derived from Operational State. Showing a derived summary in Sanity does not transfer ownership to it. Sanity is not the source of truth for operational records.

Authored Content has a Publishing Scope of AU, NZ or both, with no silent cross-country fallback. Supporter activity retains Country Site Attribution through payment, confirmation, notification, conversion, export and reporting handoffs. [ADR 004](004-country-site-publishing.md) defines the publishing model; [ADR 006](006-stripe-donation-ownership.md) applies this boundary to donations.

[Launch issue #8](https://github.com/dfn-au/dfn-web/issues/8) owns current scope; [#12](https://github.com/dfn-au/dfn-web/issues/12) owns launch data handoffs and [#69](https://github.com/dfn-au/dfn-web/issues/69) owns replacement-CRM acceptance. This ADR does not approve deferred workflows.

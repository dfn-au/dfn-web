# ADR 003: Authored Content and Operational State Ownership

## Status

Accepted

## Context

The website needs a durable boundary between staff-published public material and factual workflow records. Without this boundary, payment, reservation, availability, reporting, and sensitive supporter data can drift into an editorial system that does not provide the required transactional guarantees.

The complete cross-stack analysis, integrated-platform alternatives, evidence, risks, and coverage audit are preserved in [Website Technical Architecture Research](../architecture/website-technical-architecture-research/README.md).

## Decision

- The CMS/editorial system owns Authored Content and configuration: pages, stories, campaigns, events, giving options, donation catalogue items, sponsorship profile copy, SEO fields, approved content blocks, and safe public fields.
- A relational application database, payment provider, or workflow-specific operational system owns transactional and sensitive Operational State: donations, payment status, webhook events, event registrations, reservations, remaining capacity, sponsorship availability, reporting/export data, and dietary/allergy details.
- Campaign progress and sponsorship availability are derived from Operational State rather than manually maintained as Authored Content.
- Authored Content has a Publishing Scope of Australia only, New Zealand only, or both. Site-Specific Content must not silently fall back to the other Country Site.
- Supporter activity retains Country Site Attribution. Donations, sponsorships, event registrations, campaign gifts, confirmations, notifications, exports, analytics conversions, and reports retain the Country Site where the workflow began.
- Operational State shown in an editorial or staff surface remains derived or externally owned unless a later accepted platform decision explicitly assigns ownership there.
- Sanity must not become the source of truth for payments, reservations, capacity, dietary/allergy details, donor records, or other Operational State.

## Alternatives Considered

Payload and other integrated CMS/application platforms could own content, administration, and relational data in one platform. Directus and low-code/data-admin tools could expose operational data to staff. WordPress/WooCommerce could combine publishing and commerce concerns.

These alternatives were not selected for the ownership boundary because the separation remains valuable even when one product supplies multiple technical capabilities. The system of record must still be explicit for each workflow.

## Consequences

Editors use Sanity for Authored Content rather than operational correction. Operational systems may expose derived summaries without transferring ownership. Each workflow must document authoritative records, identifiers, handoffs, reconciliation, reporting, retention, and correction behaviour; [issue #12](https://github.com/dfn-au/dfn-web/issues/12) owns that source-of-truth matrix.

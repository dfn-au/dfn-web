# Website Technical Architecture Research

This directory preserves the research that originally appeared in ADR 001. Research recommendations are not decisions. Only files in `docs/adr/` with `Accepted` status are authoritative decisions.

## Research Areas

- [Cross-stack and cross-cutting research](01-cross-stack-and-cross-cutting-research.md): original context, decision drivers, combined architecture, evidence, whole-stack scoring, risks, seams, and follow-up work.
- [Application, hosting, and CMS research](02-app-hosting-and-cms-research.md): Next.js, Vercel, Sanity, WordPress, Payload, alternative frameworks, hosts, and CMS products.
- [Operational data, authentication, and admin research](03-operational-data-auth-and-admin-research.md): Supabase, managed relational databases, identity providers, admin surfaces, and reporting tools.
- [Payment research](04-payment-research.md): Stripe, alternative processors, fundraising platforms, event-ticketing platforms, and payment-system coverage.
- [Transactional notification research](05-transactional-notification-research.md): Postmark, Resend, alternative providers, templates, receipts, and supporter-email boundaries.
- [Analytics and conversion research](06-analytics-and-conversion-research.md): Plausible, PostHog, alternative analytics products, conversion APIs, consent, and session replay.

## Preservation

Each source block has an `original-adr-001-lines` marker. Taken together, the marked blocks cover original ADR 001 lines 1–414 exactly once. See the [preservation audit](../website-technical-architecture-preservation-audit.md).

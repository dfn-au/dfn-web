# Cross-stack and Cross-cutting Architecture Research

This file preserves the original cross-stack framing, combined recommendation, evidence, whole-stack comparison, coverage-audit introduction, adjacent categories, risks, stated conclusions, deliberate seams, follow-up work, and consequences. Statements labelled as decisions are historical research conclusions; only accepted ADRs are authoritative.

<!-- original-adr-001-lines: 1-140 -->

# ADR 001: Website Technical Architecture

## Status

Proposed

## Context

DFN is rebuilding the public websites while preserving launch-critical workflows for content, giving, sponsorship, events, supporter engagement, reporting, staff publishing, preview, accessibility, and redirects.

The rebuild must support two launch-critical Country Sites: `dfn.org.au` for Australia and `dfn.org.nz` for New Zealand. These are separate visitor-facing domains, not a single website with regional copy. The sites can share authored content when the public item is genuinely the same, but not all content will be shared.

This decision is driven by GitHub issue #17 and the PRDs in `docs/prds/specs/`. The architecture needs enough direction to unblock the first vertical walking-skeleton slice without pretending every workflow-specific integration detail is already known.

The key architectural boundary is content/configuration versus operational state:

- The CMS/editorial system owns authored public content and configuration: pages, stories, campaigns, events, giving options, donation catalogue items, sponsorship profile copy, SEO fields, and safe public fields.
- Transactional and sensitive operational records are owned by a relational application database, payment provider, or workflow-specific operational system: donations, payment status, webhook events, event registrations, reservations, remaining capacity, sponsorship availability, reporting/export data, and dietary/allergy details.
- Campaign progress and sponsorship availability are derived from operational data, not manually maintained as CMS content.
- Public content has a publishing scope: Australia only, New Zealand only, or both. Site-specific content must not silently fall back to the other domain.
- Supporter activity has site attribution. Donations, sponsorships, event registrations, campaign gifts, confirmations, notifications, exports, analytics conversions, and reports must retain the site where the workflow started.

## Decision Drivers

The decision optimises for these requirements from issue #17:

- Staff can manage launch-critical authored content and configuration in a friendly structured CMS, using approved content blocks, draft/publish states, media, image transforms, SEO fields, references, and protected preview.
- Staff can publish shared content to both domains in one editorial action while keeping site-specific content, events, sponsorship workflows, payment copy, and trust/receipt details scoped correctly.
- Operational state remains transactionally correct, reportable, and outside the CMS unless a platform clearly owns both content and operations.
- Public routes can be static, CDN-cached, or revalidated after publishing, while payments, registrations, auth, webhooks, preview, exports, and admin workflows can run dynamically on the server.
- The stack is TypeScript-first, managed-service oriented, locally developable, and does not require self-hosted infrastructure.
- Staff access avoids custom password/auth implementation, with separate CMS and operational/admin logins acceptable for launch.
- Payments default to Stripe, recurring donor self-service can be provider-hosted, and payment webhooks are the source of truth for successful payments.
- Transactional email is handled by a dedicated provider; bulk supporter email remains outside the website.
- Analytics is privacy-aware and vendor-neutral, with server-side confirmed conversion events where possible.
- The architecture must compare headless CMS plus app database approaches against integrated CMS/app platforms and a WordPress/WooCommerce-like baseline.

## Decision

Use this initial architecture:

- **App framework:** Next.js App Router with TypeScript.
- **Hosting/deploy:** Vercel for one public app serving `dfn.org.au` and `dfn.org.nz`, plus operational/admin app routes.
- **Country Site resolution:** Resolve the site from the request domain. Public routes filter content by publishing scope, generate country-specific canonical URLs/sitemaps, and return a 404 for site-specific content outside its publishing scope unless an explicit redirect exists.
- **CMS/editorial:** Sanity Content Lake and Sanity Studio for authored content and launch-critical configuration. Sanity must support shared content, site-specific content, publishing scope, and clear staff filtering for Australia, New Zealand, and shared content.
- **Operational persistence:** Supabase Postgres for transactional website-owned operational data, with site attribution on country-sensitive records.
- **Operational staff auth:** Supabase Auth for protected operational/admin routes, starting with one trusted `admin` role.
- **CMS auth:** Sanity's own staff access for Sanity Studio. Separate CMS and operational logins are acceptable for launch.
- **Payments:** Stripe as the default payment provider, with separate payment accounts for Australia and New Zealand. Use Stripe-hosted card collection through embedded Checkout or Payment Element where feasible, Stripe Billing for recurring gifts/sponsorships, Stripe Customer Portal for donor self-service, and Stripe webhooks as the source of truth for payment success. Direct deposit remains an offline giving path rather than a Stripe-owned payment flow and must use country-specific instructions.
- **Transactional email and notifications:** Use a dedicated transactional email provider. Postmark is the default recommendation for confirmations, receipts, and staff notifications; keep templates and sends behind an app-level notification adapter. Sender identity/configuration and country-specific receipt/contact content should be separate for AU and NZ, while template structure can be shared. Bulk supporter/newsletter email remains outside the website.
- **Analytics/conversion tracking:** Use a privacy-aware event abstraction. Plausible is the default public web analytics candidate, with separate public analytics properties per domain where supported and server-side confirmed conversion events emitted after operational success with site attribution. PostHog remains the strongest richer product-analytics alternative if DFN later needs funnels, feature flags, or session replay. Do not send PII, dietary/allergy details, donor identifiers, or payment identifiers to analytics.

## Recommended Architecture

```text
Visitor on dfn.org.au or dfn.org.nz
  -> Next.js app on Vercel
      -> site resolved from request domain
      -> Sanity Content Lake for public authored content/config
      -> Supabase Postgres for operational state with site attribution
      -> Stripe AU/NZ payment accounts for payments, subscriptions, portal, webhooks
      -> Postmark for AU/NZ-specific transactional email
      -> Plausible for privacy-aware analytics per domain

DFN staff
  -> Sanity Studio for shared and site-specific content/configuration
  -> Next.js operational admin routes for exports, reservations, payment/reporting views with AU/NZ filtering

Publish/payment events
  -> Sanity webhooks trigger Next.js revalidation
  -> Stripe webhooks update Supabase operational records idempotently
  -> Notification outbox triggers transactional email/staff notifications
```

## Evidence

Next.js supports a full-stack App Router, TypeScript setup, Route Handlers for server endpoints, Draft Mode, and cache revalidation through `revalidatePath` and `revalidateTag`, which fits protected preview, Stripe webhooks, CMS webhooks, reporting routes, and cached public content ([Next.js App Router](https://nextjs.org/docs/app), [Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers), [caching and revalidating](https://nextjs.org/docs/app/getting-started/caching-and-revalidating)).

Vercel supports Git-based preview deployments, generated deployment URLs, Vercel Functions, CDN caching for static and dynamic responses, and ISR support across frameworks, with the deepest framework integration for Next.js ([Vercel Git deployments](https://vercel.com/docs/deployments/git), [Vercel deployments](https://vercel.com/docs/deployments/deployment-methods), [Vercel CDN cache](https://vercel.com/docs/edge-network/caching), [Vercel ISR](https://vercel.com/docs/incremental-static-regeneration)).

Sanity supports schema-defined structured documents and fields, arrays, block content, references, asset management, image transformations, Visual Editing/Presentation Tool live preview, and secure draft-mode activation for preview ([Sanity schema](https://www.sanity.io/docs/schema-types), [Sanity arrays](https://www.sanity.io/docs/studio/array-type), [Sanity block content](https://www.sanity.io/docs/studio/block-content), [Sanity references](https://www.sanity.io/docs/studio/reference-type), [Sanity assets](https://www.sanity.io/docs/assets), [Sanity image transformations](https://www.sanity.io/docs/image-url), [Sanity Presentation Tool](https://www.sanity.io/docs/configuring-the-presentation-tool), [Sanity draft mode](https://www.sanity.io/docs/visual-editing/implementing-draft-mode)).

Supabase provides a full Postgres database, Auth, Row Level Security, local development with CLI migrations, preview branches, and TypeScript Edge Functions that can receive webhooks or integrate with Stripe if needed ([Supabase database](https://supabase.com/docs/guides/database/overview), [Supabase Auth](https://supabase.com/docs/guides/auth), [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [Supabase local migrations](https://supabase.com/docs/guides/cli/local-development), [Supabase branching](https://supabase.com/docs/guides/deployment/branching), [Supabase Edge Functions](https://supabase.com/docs/guides/functions)).

Postgres gives the operational layer the consistency tools needed for sponsorship reservation, capacity, idempotency, and reporting, including constraints and row locks via `SELECT ... FOR UPDATE` ([Postgres constraints](https://www.postgresql.org/docs/current/ddl-constraints.html), [Postgres locking clauses](https://www.postgresql.org/docs/current/sql-select.html), [Postgres explicit locking](https://www.postgresql.org/docs/current/explicit-locking.html)).

Stripe supports embedded/on-site payment collection through Elements/Payment Element and Checkout Sessions, recurring payments through Stripe Billing, customer self-service through Customer Portal, and signed webhooks for reliable payment-state updates ([Stripe Payment Element](https://docs.stripe.com/payments/payment-element), [Stripe Checkout](https://docs.stripe.com/payments/checkout), [Stripe recurring payments](https://docs.stripe.com/recurring-payments), [Stripe Customer Portal](https://docs.stripe.com/billing/subscriptions/customer-portal), [Stripe webhooks](https://docs.stripe.com/webhooks), [Stripe webhook signatures](https://docs.stripe.com/webhooks/signature)).

Postmark supports transactional email via API and delivery/bounce webhooks, and Resend is a viable TypeScript-friendly alternative with API sends, Next.js examples, webhooks, and idempotency keys ([Postmark API](https://postmarkapp.com/developer/user-guide/send-email-with-api), [Postmark webhooks](https://postmarkapp.com/developer/webhooks/webhooks-overview), [Resend email API](https://resend.com/docs/api-reference/emails), [Resend Next.js](https://resend.com/nextjs)).

Plausible is privacy-friendly, lightweight, and supports custom events and a server-side Events API. PostHog supports web analytics, product analytics, feature flags, session replay privacy controls, Node capture, and a capture API, making it the main richer analytics alternative. GA4 Measurement Protocol also supports server-to-server events but is a less privacy-minimal default for this project ([Plausible docs](https://plausible.io/docs/), [Plausible custom events](https://plausible.io/docs/custom-event-goals), [Plausible Events API](https://plausible.io/docs/events-api), [PostHog web analytics](https://posthog.com/docs/web-analytics), [PostHog product analytics](https://posthog.com/docs/product-analytics), [PostHog feature flags](https://posthog.com/docs/feature-flags), [PostHog session replay privacy](https://posthog.com/docs/session-replay/privacy), [PostHog Node SDK](https://posthog.com/docs/libraries/node), [PostHog capture API](https://posthog.com/docs/api/capture), [GA4 Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4)).

Payload is the strongest integrated CMS/app platform alternative. It is TypeScript/Next.js based and supports a generated admin panel, Postgres, migrations, drafts, live preview, blocks, uploads/image sizes, relationship fields, and access control ([Payload admin](https://payloadcms.com/docs/admin/overview), [Payload Postgres](https://payloadcms.com/docs/database/postgres), [Payload migrations](https://payloadcms.com/docs/database/migrations), [Payload drafts](https://payloadcms.com/docs/versions/drafts), [Payload live preview](https://payloadcms.com/docs/live-preview), [Payload blocks](https://payloadcms.com/docs/fields/blocks), [Payload uploads](https://payloadcms.com/docs/upload/overview), [Payload access control](https://payloadcms.com/docs/access-control/collections)).

WordPress/WooCommerce remains a useful baseline because it has familiar publishing, blocks, media, custom post types, REST APIs, and WooCommerce orders. It is rejected because this rebuild needs a TypeScript-first full-stack app, approved structured content blocks, relational operational correctness, and a clean content/transaction boundary rather than a PHP/plugin-centered rebuild ([WordPress block editor](https://wordpress.org/documentation/article/wordpress-block-editor/), [WordPress custom post types](https://developer.wordpress.org/reference/functions/register_post_type/), [WordPress REST post types](https://developer.wordpress.org/rest-api/reference/post-types/), [WooCommerce REST API](https://developer.woocommerce.com/docs/apis/rest-api/)).

## Candidate Comparison

Scores are 1-10, weighted qualitatively against issue #17: staff publishing UX, operational correctness, modernity, maintainability, preview/deploy workflow, cost/operations, and integration fit.

| Candidate stack | Staff publishing UX | Operational correctness | Modernity | Maintainability | Preview/deploy | Cost/ops | Integration fit | Overall |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Next.js + Vercel + Sanity + Supabase/Postgres | 9 | 9 | 9 | 9 | 10 | 7 | 9 | 8.9 |
| Next.js + Payload CMS + Postgres/Supabase | 8 | 8 | 9 | 7 | 8 | 8 | 8 | 8.0 |
| SvelteKit/Nuxt/Astro + CMS + Supabase/Postgres | 8 | 9 | 8 | 7 | 8 | 7 | 7 | 7.7 |
| WordPress/WooCommerce-like rebuild | 7 | 5 | 4 | 5 | 5 | 6 | 4 | 5.3 |

### Recommended: Next.js + Vercel + Sanity + Supabase/Postgres

This is the best fit for the ticket. It keeps the public site and operational workflows in one TypeScript/React app, uses Vercel's strongest framework support, gives staff a strong editorial system, and keeps transactional correctness in Postgres.

Main reasons:

- Best match for cached public pages plus dynamic server routes.
- Supports two canonical domains from one app while keeping site-specific content, SEO, payments, analytics, and operational attribution explicit.
- Best PR/branch preview story.
- Strong CMS-triggered revalidation path.
- Strong hiring/maintenance profile because Next.js/React is common.
- Clean separation between authored definitions and operational state.
- Clean separation between shared content and site-specific operational workflows.
- Avoids custom password implementation.

### Integrated Alternative: Payload CMS + Postgres

Payload is the best integrated CMS/app platform candidate. It could reduce the number of staff surfaces and keep schema/admin code in the app. It is attractive if the team values code-first schema and a single TypeScript/Next.js platform more than a best-in-class editorial SaaS.

It is not the recommended default because it makes the website app more responsible for CMS operations, editor experience, auth, and production data administration. It also increases the temptation to mix authored content with transactional records in one admin surface.

### Framework Alternative: Astro, SvelteKit, or Nuxt + CMS + Supabase/Postgres

SvelteKit and Nuxt are credible full-stack alternatives. Astro is excellent for mostly static content and can support on-demand rendering and endpoints with adapters. These are viable if the team has strong preference or existing skill in those ecosystems, but issue #17 explicitly values future engineer availability, React compatibility, server-side workflows, previews, and cache revalidation. Next.js on Vercel is the lower-risk default.

### Baseline Rejected: WordPress/WooCommerce-like Rebuild

WordPress would be familiar to staff and WooCommerce can own orders/products, but it does not satisfy the TypeScript-first, boring-modern app goal without substantial custom/plugin work. It also weakens the architecture boundary between public content, payment operations, event registrations, and sponsorship availability.

## Layered Alternatives Researched

These layer-level alternatives were checked so the decision is not anchored only on whole-stack candidates. Scores are 1-10 against issue #17's drivers.


<!-- original-adr-001-lines: 226-231 -->

## Coverage Audit Addendum

The initial comparison covers the required issue #17 stack shapes, but the coverage audit found several major contenders and adjacent system-of-record categories that should be acknowledged before the decision is treated as final. This section does not change the selected architecture or rank these candidates; it records the broader comparison set and the areas needing follow-up research.

Representative primary sources checked for this addendum include [TanStack Start](https://tanstack.com/start/latest/docs/framework/react/overview), [AWS Amplify Hosting](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html), [Firebase App Hosting](https://firebase.google.com/docs/app-hosting), [Hygraph](https://hygraph.com/docs/getting-started), [Keystone](https://keystonejs.com/docs), [Contentstack](https://www.contentstack.com/docs), [Prisma Postgres](https://www.prisma.io/docs/postgres), [Xata branching](https://xata.io/docs/platform/branch), [Nhost database](https://docs.nhost.io/products/database), [WorkOS](https://workos.com/docs), [Stytch B2B](https://stytch.com/docs/b2b), [Retool](https://docs.retool.com/), [Appsmith](https://docs.appsmith.com/), [Forest Admin](https://docs.forestadmin.com/), [Donorbox](https://donorbox.org/donation-forms), [Fundraise Up](https://fundraiseup.com/docs/), [GiveNow](https://about.givenow.com.au/), [Humanitix](https://help.humanitix.com/en/articles/8889188-payment-processing-options-for-your-humanitix-event), [TryBooking](https://www.trybooking.com/product), [Eventbrite](https://www.eventbrite.com/platform/docs), [Ticket Tailor](https://developers.tickettailor.com/), [Brevo transactional email](https://developers.brevo.com/docs/send-a-transactional-email), [Mailchimp Transactional](https://mailchimp.com/developer/transactional/api/), [Vercel Web Analytics](https://vercel.com/docs/analytics), [Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/), [Mixpanel](https://docs.mixpanel.com/docs/what-is-mixpanel), [Amplitude](https://amplitude.com/docs), [Segment](https://www.twilio.com/docs/segment), [RudderStack](https://www.rudderstack.com/docs/), [Snowplow](https://docs.snowplow.io/docs/), [Inngest](https://www.inngest.com/docs), [Trigger.dev](https://trigger.dev/docs), [Upstash QStash](https://upstash.com/docs/qstash), [Sentry](https://docs.sentry.io/), [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/), and [Xero](https://developer.xero.com/documentation/).


<!-- original-adr-001-lines: 311-414 -->

### Other Implied Stack Categories

| Category | Coverage note |
| --- | --- |
| Forms and enquiries | Current PRDs mostly preserve email links, downloads, and external forms. If new forms are added, compare Google Forms, Typeform, Jotform, Tally, Fillout/Formstack, and HubSpot Forms before deciding. |
| Newsletter/supporter CRM | Identify DFN's existing supporter email/CRM tool before implementation. Likely candidates include Mailchimp, Campaign Monitor, Brevo, ActiveCampaign, HubSpot, Salesforce Nonprofit Cloud, Blackbaud, and Bloomerang. |
| Reporting/export destination | Compare app-owned CSV exports against Google Sheets, Airtable, Metabase, Looker Studio, Power BI, Stripe Sigma, CRM exports, and accounting exports. |
| File/media/downloads | Sanity assets are covered for public media. If needs expand, check Supabase Storage, Vercel Blob, S3, Cloudflare R2, Google Cloud Storage, Cloudinary, imgix, and Mux. |
| SEO redirects and search | SEO fields, sitemap, and redirects are covered at requirement level. Use Next.js/Vercel/CMS-managed redirects for launch; Algolia, Pagefind, and Meilisearch remain later checks because onsite search is out of scope. |
| Background jobs and queues | Notification outbox is covered conceptually. Check Vercel Cron, Supabase Cron/Queues, Inngest, Trigger.dev, Upstash QStash, and Cloudflare Queues before introducing queued workflows. |
| Observability | Add Sentry and Vercel/Supabase logs as launch checks for payment, webhook, preview, and admin workflows; Bugsnag, Better Stack, Datadog, and New Relic can be shallow exclusions unless existing usage appears. |
| Spam and bot protection | If onsite newsletter or enquiry forms are added, compare Cloudflare Turnstile, reCAPTCHA, hCaptcha, and Friendly Captcha. |
| Finance/accounting exports | AU/NZ receipt rules remain unresolved. Once known, check Xero, MYOB, QuickBooks, Stripe exports/Sigma, and nonprofit CRM receipt tooling as reporting destinations. |

## Key Tradeoffs and Risks

- Separate CMS and operational admin logins add offboarding and training overhead. Mitigation: document staff access procedures and start with one `admin` role.
- Sanity must not become the source of truth for payments, reservations, capacity, dietary/allergy details, or donor records. Mitigation: keep operational state in Supabase/Stripe and show only derived summaries if needed.
- Supabase/Postgres correctness depends on schema discipline. Mitigation: use constraints, transactions, idempotency keys, row locks, and workflow-level tests for reservations and webhooks.
- Stripe success pages are not payment proof. Mitigation: final donation, sponsorship, and registration state changes happen only from verified Stripe webhooks.
- Direct deposit and other offline payment paths are not Stripe-confirmed. Mitigation: keep them outside the Stripe truth model and create a separate reconciliation workflow if they are launch scope.
- Vercel serverless functions need raw request body handling for Stripe signature verification. Mitigation: test webhooks early in the walking skeleton.
- Analytics has a real privacy/governance fork: Plausible fits privacy-minimal public analytics, while PostHog adds product analytics, feature flags, and session replay. Mitigation: keep the vendor-neutral event adapter, start with privacy-minimal events, and require a separate HITL decision before enabling session replay, identified analytics, or feature flags.
- Cross-domain content leakage risk is now higher because one app serves both domains. Mitigation: resolve the site from the request domain, filter by publishing scope, use self-canonical URLs per domain, and return 404 for out-of-scope content unless an explicit redirect exists.
- Shared content can accidentally publish unsuitable country-specific wording to both sites. Mitigation: make publishing scope visible in the CMS, keep site-specific content separate where needed, and require explicit modelling for any field-level regional variation before launch.
- Country-specific receipt and tax rules are unresolved. Mitigation: architecture supports site attribution, separate payment accounts, direct deposit instructions, sender configuration, and emails, but final receipt rules remain a later decision.
- Sensitive event data has retention risk. Mitigation: model dietary/allergy details separately and add retention/archive/delete workflows.
- SaaS costs can grow across Vercel, Sanity, Supabase, Stripe, Postmark, and Plausible. Mitigation: track plan assumptions before launch and keep adapter boundaries.

## Decisions Firm Now

- Use TypeScript throughout.
- Use Next.js App Router for the public app and operational/admin app routes.
- Use one Next.js app to serve both `dfn.org.au` and `dfn.org.nz`.
- Resolve the site from the request domain; do not require a launch country-switching UX.
- Use Vercel for app hosting, branch/PR preview deployments, CDN delivery, functions, cache revalidation, and both public domains.
- Use Sanity for authored content/configuration and staff editorial workflows across shared and site-specific content.
- Use approved structured content blocks, not unrestricted page-building.
- Use self-canonical URLs per domain, with alternate hints where appropriate; do not canonicalize New Zealand pages to Australia or vice versa.
- Use Supabase Postgres as the website-owned operational database, with site attribution on country-sensitive records.
- Use relational constraints and transactions for reservations, capacity, idempotency, and reporting.
- Use Supabase Auth for operational/admin access and avoid custom password/auth implementation.
- Use Stripe as the payment provider and Stripe webhooks as payment truth, with separate payment accounts for Australia and New Zealand.
- Use country-specific direct deposit/offline giving instructions.
- Use a dedicated transactional email provider; default to Postmark unless a later implementation issue proves Resend or an existing provider is a better fit.
- Use AU/NZ-specific sender identity/configuration for transactional email, while allowing shared template structure.
- Keep bulk supporter/newsletter email outside the website.
- Use privacy-aware analytics through an app-level event abstraction; default to Plausible for public analytics and server-side confirmed conversion events with site attribution.
- Use separate public analytics properties per domain where supported.
- Treat PostHog as the documented richer analytics alternative, not the launch default.

## Deliberate Seams For Later

- Exact Sanity schema, block library, desk structure, content migration inventory, and redirect map.
- Exact Sanity modelling for shared content, site-specific content, linked counterparts, field-level site variation, and editor-safe publishing controls.
- Whether Sanity Studio is hosted separately by Sanity or embedded under the Next.js app.
- Exact operational admin screens versus exports only for launch.
- Event registration system-of-record details, including manual/complimentary/offline registrations.
- Sponsorship reservation expiry duration, availability labels, and staff override process.
- Whether any campaigns need cross-country publishing or combined progress; default expectation is that campaigns are country-specific until confirmed otherwise.
- Stripe embedded Checkout versus Payment Element per workflow.
- Whether specialist fundraising, donor-management, or event-ticketing platforms should own any workflow before the custom website path is treated as final.
- Offline/direct-deposit giving instructions, attribution, and reconciliation workflow.
- Stripe product/price mapping for donations, recurring sponsorship, event tickets, and catalogue items.
- AU/NZ tax receipt rules and receipt ownership.
- External newsletter/supporter CRM destination and segmented opt-in sync.
- Reporting/export destination, including CSV, spreadsheet, BI, CRM, payment-provider, or accounting-system exports.
- Transactional email provider finalization, template ownership, and deliverability setup.
- Analytics vendor finalization, conversion taxonomy, and any decision to enable PostHog-specific capabilities such as session replay, feature flags, or identified analytics.
- Consent/CMP decision if GA/GTM, ad pixels, retargeting, or advertising conversion APIs are enabled.
- Observability and spam/bot-protection choices for payment, registration, and opt-in workflows.
- Whether to use Supabase Edge Functions, Vercel Functions, or both for specific background/webhook tasks.
- Whether to use Supabase Queues later. Do not make queues launch-critical until their maturity and cost fit are confirmed.

## Follow-up Issues

1. Create website walking skeleton: Next.js on Vercel serving `dfn.org.au` and `dfn.org.nz`, domain-based site resolution, Sanity content fetch, Supabase connection, protected preview, and CMS-triggered revalidation.
2. Define Sanity content model and approved block library for pages, stories, campaigns, events, giving options, donation catalogue items, and sponsorship profiles, including publishing scope and shared/site-specific content modelling.
3. Define Supabase operational schema for donations, Stripe events, event registrations, sponsorship reservations, campaign progress, notifications, and exports, including site attribution.
4. Implement Stripe test-mode vertical slice for one-off giving with separate AU/NZ payment account configuration, idempotent webhook handling, and operational records.
5. Implement staff operational auth/admin MVP with Supabase Auth, single admin role, and CSV exports.
6. Implement transactional email notification outbox and first confirmation email template.
7. Define analytics/conversion event taxonomy and implement Plausible client plus server-side confirmed conversion events with site attribution.
8. Decide sponsorship reservation/locking behaviour and create the implementation issue.
9. Decide event registration system-of-record details and create the implementation issue.
10. Decide AU/NZ receipt rules and receipt content ownership.
11. Decide offline/direct-deposit handling, attribution, and reconciliation per country if it is launch scope.
12. Create sensitive-data retention issue for dietary/allergy details and payment/supporter operational records.
13. Create SEO redirect-map and content migration inventory issues.

## Consequences

The first vertical slice can now be scoped around the chosen platform instead of re-litigating the stack:

- A public route rendered by Next.js on Vercel.
- A Sanity-managed page/campaign/giving definition with draft and published states.
- Protected preview and publish-triggered revalidation.
- A Supabase operational table and migration.
- A Stripe test-mode payment or checkout intent.
- A verified webhook that updates operational state idempotently.
- A confirmation email through the notification adapter.
- A server-side confirmed conversion event.

This gives DFN an end-to-end path through the real architectural seams while keeping later workflow decisions deliberate.

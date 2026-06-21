# Operational Plumbing Audit Report

## Document Role

This report explains the operational plumbing decisions still needed before DFN starts implementing payment, event registration, preview, admin, email, and analytics workflows.

It is not a new architecture decision and does not replace [ADR 001](../adr/001-website-technical-architecture.md), [ADR 003](../adr/003-authored-content-and-operational-state-ownership.md), or [Website Technical Architecture Research](../architecture/website-technical-architecture-research/README.md). Treat it as a guide for follow-up agent sessions and GitHub decision issues.

The accepted core platform and undecided workflow-specific research recommendations remain:

- Next.js App Router on Vercel
- Sanity for `Authored Content`
- Supabase Postgres/Auth for website-owned `Operational State`
- Stripe for payments
- Postmark as the default transactional email provider
- Plausible as the default public analytics provider

## How To Use This Report With An Agent

Work through the modules one at a time. For each module, give an agent:

- this report
- [AGENTS.md](../../AGENTS.md)
- [PRD README](README.md)
- [ADR 001](../adr/001-website-technical-architecture.md)
- [Website Technical Architecture Research](../architecture/website-technical-architecture-research/README.md)
- the PRD specs listed in the module
- the module's "Agent prompt"

Ask the agent to produce one of:

- a decision issue
- a small implementation issue
- an ADR after a decision is made
- a narrower question list for a human decision

Do not ask one agent to solve the whole report at once. The point is to keep each operational category small enough to reason about.

## Key Terminology

Use the glossary language from [CONTEXT.md](../../CONTEXT.md):

- `Country Site`: the Australia or New Zealand public website.
- `Country Site Attribution`: the Country Site where supporter activity started.
- `Country Payment Account`: the Stripe/payment account used by a Country Site.
- `Authored Content`: public copy, media, labels, and approved configuration managed by staff.
- `Operational State`: factual workflow records such as payments, registrations, reservations, availability, reporting records, webhook events, and sensitive event data.

The most important distinction is this:

```text
Sanity owns Authored Content.
Supabase, Stripe, and workflow systems own Operational State.
```

Do not use "locale", "market", or "region" when the docs mean `Country Site`.

## Executive Summary

The architecture decision is sound. The missing work is not vendor selection. The missing work is the operational baseline that makes the selected stack safe to run.

Before the first real payment, event registration, or admin workflow, DFN needs decisions for:

- application monitoring and alerting
- durable webhook/event processing
- application audit trails
- queue/outbox handling
- spam, bot, and rate-limit protection
- analytics privacy and consent boundaries
- secrets and environment handling
- data retention and deletion
- backup, restore, rollback, and incident response
- minimum CRM/Xero export contract

The recommended launch posture is deliberately small:

- Use Sentry for application error monitoring and alerting.
- Use Supabase tables for webhook events, idempotency, outbox jobs, notification sends, admin actions, exports, and redactions.
- Use a Supabase-backed outbox or Supabase Queues plus a cron heartbeat for launch jobs.
- Use Cloudflare Turnstile for public write actions.
- Use Vercel WAF/rate limits for coarse abuse control and add Upstash only where per-email or per-user limits are needed.
- Use Plausible for public analytics and server-side confirmed conversion events.
- Defer CMP/ad pixel work unless paid advertising or Google/Meta conversion tags are launch scope.
- Define dietary/allergy retention before event registration goes live.
- Prove webhook replay, backup restore, and rollback in staging before real payments.

## Recommended Work Order

| Order | Topic | Why first |
| ---: | --- | --- |
| 1 | Operational ledger, audit, and idempotency | Payment/event/admin workflows depend on this foundation. |
| 2 | Webhook reliability | Stripe success is only trustworthy through verified webhooks. |
| 3 | Queue/outbox and scheduled jobs | Email, analytics, reconciliation, and cleanup need async handling. |
| 4 | Observability and incident response | Failures need owners, alerts, and runbooks before launch. |
| 5 | Spam, bot, and rate limiting | Public write endpoints need protection from the start. |
| 6 | Data retention and deletion | Event dietary/allergy and supporter records need lifecycle rules before collection. |
| 7 | Secrets and environments | AU/NZ payment, preview, webhook, and email secrets must not blur across environments. |
| 8 | Analytics and consent | Safe Plausible defaults can launch; ad/CMP decisions can wait unless ads launch. |
| 9 | CRM/Xero data contract | Required before reports/exports are considered launch-ready. |
| 10 | Admin/preview controls | Simple `admin` can launch, but logs and offboarding rules are still needed. |

## Follow-Up Issue Set

These are intentionally minimal. Each can be explored independently.

1. **Decision: Operational ledger and audit baseline**
   - Decide what gets stored in webhook, outbox, notification, export, admin-action, and redaction audit tables.

2. **Implementation: Stripe webhook ingestion and replay MVP**
   - Verify signatures, store raw events, dedupe by event ID, update payment state idempotently, and support manual replay.

3. **Decision: Queue/outbox launch mechanism**
   - Decide Supabase outbox table vs Supabase Queues, and Vercel Cron vs Supabase Cron heartbeat.

4. **Decision: Monitoring and incident baseline**
   - Decide Sentry setup, alert recipients, uptime checks, webhook-failure alerts, restore drill, and rollback runbook.

5. **Decision: Abuse protection baseline**
   - Decide Turnstile usage, Vercel WAF limits, Upstash route limits, and protected endpoints.

6. **Decision: Data retention and deletion matrix**
   - Decide retention for donations, registrations, dietary/allergy data, exports, webhook events, notification logs, audit logs, backups, and third-party records.

7. **Implementation: Dietary/allergy safe-handling MVP**
   - Store sensitive event fields separately, gate exports, log export access, and define purge/redaction behavior.

8. **Decision: Analytics consent boundary**
   - Decide whether launch is Plausible-only or includes Google/Meta/PostHog/CMP work.

9. **Decision: Secrets and environment governance**
   - Decide production/preview/local secret ownership, rotation, naming, and country-account separation.

10. **Decision: Website-to-CRM/Xero export contract**
    - Decide the minimum export fields and reconciliation IDs before CRM/DMS/EMS selection is complete.

## Module 1: Operational Ledger, Audit, And Idempotency

### What This Means

The site needs its own durable record of operational activity. Platform logs are not enough.

For DFN, an operational ledger means application tables that record:

- incoming Stripe, Sanity, Postmark/Resend, and future CRM/Xero webhook events
- webhook processing status
- payment state changes
- event registration state changes
- sponsorship reservation and availability changes
- outbound email attempts
- staff admin actions
- exports
- redactions/deletions
- offline adjustments and manual registrations

This is different from observability logs. Observability tells developers what broke. The operational ledger tells DFN what happened to a donor, payment, registration, email, export, or staff action.

### Why It Matters For DFN

Payment, event, sponsorship, and supporter workflows are audit-sensitive. If a donor pays, DFN needs to know:

- which Country Site started the workflow
- which Country Payment Account processed it
- which Stripe event confirmed it
- which operational record was updated
- which confirmation email was attempted
- whether any staff member exported, corrected, or redacted the data

Without this ledger, DFN can have silent mismatches between Stripe, Supabase, email, exports, CRM, and Xero.

### Current Coverage

The research recommends idempotent Stripe webhook processing in Supabase and a notification outbox for email/staff notifications. See [Operational Data, Authentication, and Admin Research](../architecture/website-technical-architecture-research/03-operational-data-auth-and-admin-research.md), [Payment Research](../architecture/website-technical-architecture-research/04-payment-research.md), and [Transactional Notification Research](../architecture/website-technical-architecture-research/05-transactional-notification-research.md).

The PRDs require site attribution, reporting/exporting, internal notifications, and payment/event/supporter activity to remain attributable. See:

- [001 overview](specs/001-overview.md)
- [003 giving](specs/003-giving.md)
- [005 events](specs/005-events.md)
- [007 CRM/DMS/EMS](specs/007-crm-dms-ems.md)

### Missing Decisions

- What are the canonical operational tables?
- Which provider events are stored raw?
- Which fields are safe to store in audit payloads?
- How long are audit records retained?
- Which audit records are visible to staff?
- What is the manual replay or correction process?
- How is `Country Site Attribution` stored on every operational record?

### Recommended Default

Create an operational ledger in Supabase before implementing real payments or registrations.

Minimum launch tables:

- `webhook_events`
- `webhook_processing_attempts`
- `payment_events`
- `notification_outbox`
- `notification_sends`
- `admin_audit_events`
- `export_audit_events`
- `redaction_audit_events`

Use unique constraints for idempotency:

- provider + event ID for webhook events
- Stripe payment/session/subscription IDs for payment records
- notification type + subject ID + recipient for email dedupe
- export ID + staff user ID for export audit

### Launch-Critical Acceptance Criteria

- Duplicate Stripe webhook deliveries do not create duplicate gifts, registrations, sponsorships, emails, or analytics events.
- Staff can identify the event that changed a payment or registration state.
- Failed webhook processing can be retried without duplicating side effects.
- Every operational record has `Country Site Attribution`.
- Export and redaction actions are auditable.

### Candidate Tools And Features

- Supabase Postgres constraints, transactions, and RLS: <https://supabase.com/docs/guides/database/postgres/row-level-security>
- Postgres constraints and locking: <https://www.postgresql.org/docs/current/ddl-constraints.html>
- Stripe webhook duplicate guidance: <https://docs.stripe.com/webhooks>
- Stripe idempotent requests: <https://docs.stripe.com/api/idempotent_requests>

### Agent Prompt

```text
Audit and propose the minimum Supabase operational ledger schema for DFN's first payment/event/admin vertical slice.

Read:
- AGENTS.md
- CONTEXT.md
- docs/prds/operational-plumbing-audit-report.md Module 1
- docs/architecture/website-technical-architecture-research/README.md
- docs/prds/specs/001-overview.md
- docs/prds/specs/003-giving.md
- docs/prds/specs/005-events.md
- docs/prds/specs/007-crm-dms-ems.md

Deliver:
- recommended tables
- key columns
- unique constraints for idempotency
- which sensitive fields must not be logged
- launch-critical acceptance criteria
- a GitHub decision or implementation issue draft

Do not edit files unless asked.
```

## Module 2: Webhook Reliability

### What This Means

Webhooks are not optional plumbing. Stripe webhooks are the source of truth for payment success. Browser success pages are not proof of payment.

Webhook handling needs four stages:

1. Verify the provider signature.
2. Persist the raw event and idempotency key quickly.
3. Enqueue or process normalized domain work idempotently.
4. Record success/failure and allow replay.

### Why It Matters For DFN

DFN workflows include donations, sponsorships, event registrations, payment confirmations, receipts, notifications, analytics conversions, exports, and reports. These all need to line up with confirmed operational events.

If webhook handling is weak:

- donors can pay but not receive confirmation
- registrations can stay pending after payment
- failed payments can be treated as successful
- repeated webhook delivery can create duplicate emails or records
- Country Site Attribution can be lost during async processing

### Current Coverage

The payment research recommends treating Stripe webhooks as payment truth; the operational-data research recommends updating website-owned Operational State idempotently. These remain undecided.

### Missing Decisions

- Which Stripe event types are subscribed to?
- How are separate AU/NZ Stripe accounts handled?
- Is there one webhook endpoint per Country Payment Account, or one shared endpoint with account/context resolution?
- What is the webhook replay process?
- What alerts fire for failed or stale events?
- How are late, duplicate, or out-of-order events handled?
- How are Sanity and email webhooks treated differently from Stripe?

### Recommended Default

Launch with a single webhook ingestion pattern for all providers, but domain-specific processors.

For Stripe:

- subscribe only to required events
- verify signature using the correct endpoint secret
- store event ID, type, created time, account/context, raw payload, and processing state
- derive Country Site from stored workflow/session metadata, not from the webhook URL alone
- update payment and registration state only through idempotent processors
- add a reconciliation job for stale pending payments/sessions

For Sanity:

- use webhooks only for content revalidation
- do not make Sanity webhook delivery the only path for operational correctness

For Postmark/Resend:

- store delivery/bounce/spam events
- treat provider activity as delivery diagnostics, not the business source of truth

### Launch-Critical Acceptance Criteria

- Stripe signature verification is tested locally and in staging.
- Duplicate Stripe events are ignored or safely reprocessed.
- Out-of-order Stripe events do not corrupt payment state.
- Webhook failure creates an alert or visible failed-processing state.
- A failed webhook can be replayed in staging.
- Payment success page displays pending/confirmed state honestly.

### Candidate Tools And Features

- Stripe webhooks: <https://docs.stripe.com/webhooks>
- Stripe webhook signatures: <https://docs.stripe.com/webhooks/signature>
- Stripe idempotency: <https://docs.stripe.com/api/idempotent_requests>
- Sanity webhooks: <https://www.sanity.io/docs/webhooks>
- Postmark webhooks: <https://postmarkapp.com/developer/webhooks/webhooks-overview>
- Resend idempotency keys: <https://resend.com/docs/dashboard/emails/idempotency-keys>

### Agent Prompt

```text
Design the webhook reliability decision for DFN's first payment/event/admin slice.

Read:
- docs/prds/operational-plumbing-audit-report.md Module 2
- docs/architecture/website-technical-architecture-research/README.md
- docs/prds/specs/003-giving.md
- docs/prds/specs/004-sponsorship.md
- docs/prds/specs/005-events.md

Focus on:
- Stripe AU/NZ payment accounts
- event types to subscribe to
- idempotency and replay
- stale payment reconciliation
- how Sanity and email webhooks differ from Stripe

Deliver:
- recommended webhook processing flow
- launch-critical tests
- issue draft

Do not rank payment vendors.
```

## Module 3: Background Jobs, Queues, Retries, And Scheduled Tasks

### What This Means

Some work should not happen directly inside a user request or webhook response.

Examples:

- sending confirmation emails
- sending staff notifications
- emitting server-side analytics conversions
- reconciling stale payments
- releasing expired sponsorship reservations
- releasing expired event holds
- deleting or redacting dietary/allergy data after operational use
- retrying failed outbound calls
- generating exports

This needs an outbox, queue, or workflow engine.

### Why It Matters For DFN

DFN should not lose a payment registration because email sending failed, nor should a webhook timeout because analytics or CRM sync was slow.

### Current Coverage

The transactional-notification research mentions a notification outbox, but does not choose the mechanism.

### Missing Decisions

- Is launch outbox table, Supabase Queues, Inngest, Trigger.dev, or QStash?
- Which jobs are launch-critical?
- How are retries scheduled?
- What is the dead-letter or poison-job process?
- Which jobs need manual replay?
- Which jobs need exact ordering or locking?
- Which scheduled tasks run before launch?

### Recommended Default

Use Supabase-owned async plumbing for launch:

- a small outbox table or Supabase Queues
- Vercel Cron or Supabase Cron as a heartbeat
- Postgres locks or queue visibility timeout to avoid duplicate work
- idempotent processors for every side effect

Defer Inngest, Trigger.dev, and QStash unless launch workflows become multi-step enough to justify a workflow vendor.

### Launch-Critical Jobs

- Send donation/payment confirmation email.
- Send event registration confirmation email.
- Send staff notification for payment/event/supporter activity.
- Emit server-side Plausible conversion after confirmed success.
- Reconcile stale Stripe sessions/payments.
- Release expired sponsorship reservations.
- Release expired event registration holds, if holds are implemented.
- Process email delivery/bounce webhooks.

### Deferrable Jobs

- CRM direct API sync.
- Xero direct API sync.
- donor journey automation
- lapsed donor automation
- pledge reminders unless pledge tracking is confirmed
- long-running dashboard generation
- advanced workflow replay dashboards

### Candidate Tools And Features

- Supabase Queues: <https://supabase.com/docs/guides/queues>
- Supabase Cron: <https://supabase.com/docs/guides/cron>
- Vercel Cron: <https://vercel.com/docs/cron-jobs>
- Inngest: <https://www.inngest.com/docs>
- Trigger.dev: <https://trigger.dev/docs>
- Upstash QStash: <https://upstash.com/docs/qstash>

### Agent Prompt

```text
Decide the launch queue/outbox shape for DFN.

Read:
- docs/prds/operational-plumbing-audit-report.md Module 3
- docs/architecture/website-technical-architecture-research/README.md
- docs/prds/specs/003-giving.md
- docs/prds/specs/004-sponsorship.md
- docs/prds/specs/005-events.md

Compare only:
- Supabase outbox table
- Supabase Queues
- Vercel Cron
- Supabase Cron
- Inngest / Trigger.dev / QStash as later alternatives

Deliver:
- recommended launch mechanism
- job list
- retry/dead-letter policy
- issue draft

Do not do a full vendor ranking.
```

## Module 4: Observability And Error Monitoring

### What This Means

Observability is how the team finds out something broke before a donor or staff member reports it.

It includes:

- error monitoring
- traces/performance for critical flows
- logs
- alerts
- uptime checks
- cron/job health
- webhook failure alerts
- payment mismatch alerts

### Why It Matters For DFN

Payment, event registration, and admin workflows can fail in ways that do not show up on public pages. A failed webhook, stuck outbox, broken email provider, or invalid Stripe secret can silently damage trust.

### Current Coverage

The architecture decisions and research name Vercel, Supabase, Stripe, Postmark, Plausible, and PostHog, but do not define a monitoring baseline.

### Missing Decisions

- Is PostHog the primary app monitor?
- Who receives alerts?
- What alert thresholds matter?
- Is there an uptime monitor?
- Are cron/outbox failures monitored?
- Do payment webhooks have stale-state alerts?
- How long are logs retained?
- Do logs drain to Better Stack, Datadog, S3, or another sink?

### Recommended Default

Use PostHog for application error monitoring and alerts.

Add a lightweight uptime/incident tool if needed. Better Stack is a pragmatic contender for uptime checks, status page, and incident notifications. Datadog/New Relic are probably too heavy unless DFN already uses them.

Use Vercel and Supabase native logs for debugging, but do not rely on native log retention for audit or forensics.

### Launch-Critical Alerts

- Stripe webhook signature failure spike.
- Stripe webhook processing failure.
- stale pending payment/session older than expected.
- outbox queue backlog above threshold.
- confirmation email send failure.
- event registration submit failure.
- admin login/auth anomaly.
- production app error spike.
- uptime failure on both Country Sites.

### Candidate Tools And Features

- PostHog error tracking: <https://posthog.com/docs/error-tracking>
- PostHog alerts: <https://posthog.com/docs/alerts>
- Vercel runtime logs: <https://vercel.com/docs/logs/runtime>
- Vercel log drains: <https://vercel.com/docs/drains>
- Supabase logs: <https://supabase.com/docs/guides/platform/logs>
- Supabase backups/PITR: <https://supabase.com/docs/guides/platform/backups>
- Better Stack incidents: <https://betterstack.com/docs/uptime/working-with-incidents/>

### Agent Prompt

```text
Define DFN's launch observability and incident baseline.

Read:
- docs/prds/operational-plumbing-audit-report.md Module 4
- docs/architecture/website-technical-architecture-research/README.md
- docs/prds/specs/001-overview.md
- docs/prds/specs/003-giving.md
- docs/prds/specs/005-events.md

Deliver:
- recommended Sentry setup
- alert list
- log retention/log drain recommendation
- uptime/incident recommendation
- staging verification checklist
- issue draft

Do not change the architecture decision.
```

## Module 5: Logs And Audit Trails

### What This Means

Logs and audit trails are related but not the same.

Logs are developer-facing operational records, usually high volume and short retention.

Audit trails are business-facing records of sensitive or consequential actions.

DFN needs both.

### Why It Matters For DFN

Staff need confidence that payments, registrations, exports, and sensitive data changes are traceable. Developers need logs to debug production issues.

### Current Coverage

The ADR identifies operational state and reporting/export requirements, but does not specify application audit trails.

### Missing Decisions

- Which actions are audited?
- Are before/after values stored?
- Which fields are excluded from audit payloads?
- Who can view audit logs?
- How long are audit logs retained?
- Are exports logged separately?
- Are redactions/deletions logged without retaining deleted sensitive values?

### Recommended Default

Create app-level audit records for:

- admin login and logout
- admin role changes
- payment state changes
- manual registration creation
- offline payment adjustment
- campaign progress offline adjustment
- export creation/download
- dietary/allergy export
- redaction/deletion
- webhook replay
- email resend

Avoid storing raw dietary/allergy text or full donor PII in audit payloads. Store references and action metadata instead.

### Candidate Tools And Features

- Supabase logs: <https://supabase.com/docs/guides/platform/logs>
- Supabase platform audit logs: <https://supabase.com/docs/guides/security/platform-audit-logs>
- Supabase Auth audit logs: <https://supabase.com/docs/guides/auth/audit-logs>
- Vercel audit logs: <https://vercel.com/docs/audit-log>

### Agent Prompt

```text
Define DFN's app-level audit trail policy.

Read:
- docs/prds/operational-plumbing-audit-report.md Module 5
- docs/prds/specs/005-events.md
- docs/prds/specs/007-crm-dms-ems.md
- docs/architecture/website-technical-architecture-research/README.md

Deliver:
- audited action list
- fields to include
- fields to exclude
- retention recommendation
- access recommendation
- issue draft

Keep implementation minimal for launch.
```

## Module 6: Spam, Bot Protection, Rate Limiting, And Abuse Controls

### What This Means

Public write endpoints need protection from automated abuse.

Examples:

- newsletter/prayer opt-in
- event registration submit
- checkout/session creation
- sponsorship reservation
- contact/enquiry forms if added
- admin login
- export endpoints

CAPTCHA and rate limiting solve different problems:

- CAPTCHA/bot checks ask "is this likely a human?"
- rate limiting asks "is this actor doing too much?"

DFN needs both for public write actions.

### Why It Matters For DFN

Abuse can create fake supporter records, exhaust event capacity, trigger email spam, overload Stripe checkout creation, create costs, or lock staff out.

### Current Coverage

The ADR names spam/bot protection as a later seam but does not choose a launch baseline.

### Missing Decisions

- Which bot protection provider?
- Which endpoints require bot checks?
- Which endpoints require rate limits?
- Are limits by IP, email, event, Country Site, session, or admin user?
- Is Vercel WAF enough, or is Upstash needed for business-key limits?
- What happens when a user exceeds a limit?

### Recommended Default

Use Cloudflare Turnstile with server-side validation for public write actions.

Use Vercel WAF rate limiting for coarse endpoint/IP protection.

Use Upstash Ratelimit only where the app needs business-key limits such as:

- per email address
- per event/session
- per donor/session
- per admin user

Avoid reCAPTCHA v3 as the default because it has a heavier Google/privacy/ad-tech tradeoff. hCaptcha remains a credible alternative if DFN prefers it.

### Launch-Critical Acceptance Criteria

- Public write actions cannot be submitted without server-validated Turnstile.
- Checkout/session creation is rate-limited.
- Event registration submit is rate-limited.
- Newsletter/prayer opt-in is rate-limited.
- Admin auth has platform and app-level protection.
- Rate limit failures return clear, accessible error messaging.

### Candidate Tools And Features

- Cloudflare Turnstile: <https://developers.cloudflare.com/turnstile/>
- Turnstile server validation: <https://developers.cloudflare.com/turnstile/get-started/server-side-validation/>
- reCAPTCHA v3: <https://developers.google.com/recaptcha/docs/v3>
- hCaptcha: <https://docs.hcaptcha.com/>
- Vercel WAF rate limiting: <https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting>
- Upstash Ratelimit: <https://upstash.com/docs/redis/sdks/ratelimit-ts/overview>
- Supabase Auth rate limits: <https://supabase.com/docs/guides/auth/rate-limits>

### Agent Prompt

```text
Define DFN's launch abuse-protection baseline.

Read:
- docs/prds/operational-plumbing-audit-report.md Module 6
- docs/prds/specs/003-giving.md
- docs/prds/specs/005-events.md
- docs/prds/specs/006-engagement.md
- docs/architecture/website-technical-architecture-research/README.md

Deliver:
- endpoint list
- Turnstile recommendation
- Vercel WAF limit recommendations
- where Upstash is needed, if anywhere
- test cases
- issue draft

Do not rank every CAPTCHA vendor.
```

## Module 7: Consent, CMP, Analytics Privacy, And Ad Tracking

### What This Means

The site needs to decide which analytics and advertising technologies are allowed at launch and under what consent rules.

The simple launch path is Plausible-only:

- no cookies
- no personal data
- no session replay
- no ad pixels
- no retargeting
- no donor/payment identifiers

The complex path starts if DFN wants:

- Google Analytics
- Google Tag Manager
- Google Ads conversion tags
- Meta Pixel or Conversions API
- LinkedIn/TikTok/Microsoft ad tags
- PostHog identified analytics
- PostHog session replay
- Hotjar/Clarity-style replay

Those require explicit privacy and consent decisions.

### Why It Matters For DFN

Donation, sponsorship, event, prayer, and dietary/allergy workflows involve sensitive personal context. Analytics must not collect PII, donor identifiers, payment IDs, dietary/allergy details, or sensitive prayer/update eligibility.

### Current Coverage

The analytics research recommends privacy-aware analytics via an event abstraction and ranks Plausible highest. It explicitly says not to send PII, dietary/allergy details, donor identifiers, or payment identifiers to analytics.

### Missing Decisions

- Is Plausible-only enough for launch?
- Are paid ads or ad conversion tags launch-critical?
- Is Google Consent Mode needed?
- If CMP is needed, which provider owns it?
- Is PostHog session replay prohibited, deferred, or allowed with masking?
- What is the event taxonomy?
- Are server-side conversion events allowed after confirmed success?

### Recommended Default

Launch with Plausible-only analytics and server-side confirmed conversion events emitted after operational success.

Defer CMP until DFN chooses a non-essential tracking or ad stack.

If paid advertising conversion tags are launch-critical, create a separate CMP decision issue before implementation. Cookiebot, Usercentrics, OneTrust, and Osano are all plausible CMP contenders. Do not add GA/GTM/ad pixels first and retrofit consent later.

### Launch-Critical Event Rules

Allowed:

- Country Site
- workflow type
- giving purpose/campaign identifier that is not PII
- event identifier that is not attendee-specific
- payment success count/revenue where the analytics provider supports it safely

Disallowed:

- donor name
- email
- phone
- address
- Stripe customer/payment/session IDs
- dietary/allergy details
- prayer update vetted status
- child-sensitive profile details
- admin user identifiers in public analytics

### Candidate Tools And Features

- Plausible docs: <https://plausible.io/docs/>
- Plausible custom events/goals: <https://plausible.io/docs/custom-event-goals>
- Plausible Events API: <https://plausible.io/docs/events-api>
- PostHog privacy: <https://posthog.com/docs/privacy>
- PostHog session replay privacy: <https://posthog.com/docs/session-replay/privacy>
- Cookiebot developer docs: <https://www.cookiebot.com/us/developer/>
- Usercentrics docs: <https://docs.usercentrics.com/>
- OneTrust developer docs: <https://developer.onetrust.com/onetrust/docs>
- Osano developer docs: <https://developers.osano.com/cmp/javascript-api/developer-documentation-consent-javascript-api>

### Agent Prompt

```text
Define DFN's analytics and consent boundary for launch.

Read:
- docs/prds/operational-plumbing-audit-report.md Module 7
- docs/prds/specs/001-overview.md
- docs/prds/specs/003-giving.md
- docs/prds/specs/005-events.md
- docs/prds/specs/006-engagement.md
- docs/architecture/website-technical-architecture-research/README.md

Deliver:
- Plausible launch taxonomy
- list of disallowed analytics fields
- decision tree for when CMP becomes required
- recommendation on whether ad pixels are launch scope
- issue draft
```

## Module 8: Secrets And Environment Management

### What This Means

The architecture has multiple providers and multiple environments. Secrets must not blur between:

- local development
- preview deployments
- staging/test
- production AU
- production NZ

They also must not blur between:

- Country Sites
- Country Payment Accounts
- email sender identities
- webhook endpoints
- analytics properties

### Why It Matters For DFN

A wrong secret can send NZ donations through the AU Stripe account, leak preview content, send transactional email from the wrong country identity, or break webhook verification.

### Current Coverage

The payment research recommends separate Country Payment Accounts, and the transactional-notification research recommends country-specific sender configuration. Neither defines secret governance.

### Missing Decisions

- Which secrets exist per environment?
- Which secrets exist per Country Site?
- Which staff can view or rotate production secrets?
- Are preview deployments connected to test-mode Stripe only?
- How are webhook endpoint secrets named and rotated?
- How are Sanity preview tokens protected?
- Are Supabase service-role keys ever exposed to Vercel client code? They must not be.

### Recommended Default

Define an environment matrix before implementation.

Rules:

- Production only uses live Stripe keys.
- Preview/staging only uses test Stripe keys.
- AU/NZ Stripe keys and webhook secrets are separate.
- Postmark sender/domain config is separate for AU/NZ where required.
- Sanity Studio must not use static public env vars for secrets.
- Service-role keys are server-only.
- Webhook secrets rotate through a documented process.

### Candidate Tools And Features

- Vercel environment variables: <https://vercel.com/docs/environment-variables>
- Vercel sensitive environment variables: <https://vercel.com/docs/environment-variables/sensitive-environment-variables>
- Supabase Edge Function secrets: <https://supabase.com/docs/guides/functions/secrets>
- Supabase Vault: <https://supabase.com/docs/guides/database/vault/>
- Stripe API keys: <https://docs.stripe.com/keys>
- Sanity function environment variables: <https://www.sanity.io/docs/functions/function-env-vars>

### Agent Prompt

```text
Create DFN's secrets and environment matrix.

Read:
- docs/prds/operational-plumbing-audit-report.md Module 8
- docs/architecture/website-technical-architecture-research/README.md
- docs/prds/specs/001-overview.md
- docs/prds/specs/003-giving.md
- docs/prds/specs/005-events.md

Deliver:
- environment matrix
- secret naming recommendations
- AU/NZ separation rules
- rotation/offboarding checklist
- launch acceptance criteria
- issue draft
```

## Module 9: Data Retention, Deletion, And Sensitive Data

### What This Means

DFN needs a record-type-by-record-type policy for how long data is stored, who can access it, how it can be exported, and when it is deleted or redacted.

This is especially important for:

- dietary requirements
- allergy details
- event guest details
- payment/supporter records
- donation receipt/reconciliation records
- prayer update subscriptions and vetted/trusted status
- child sponsorship details
- exports
- audit logs
- backups

### Why It Matters For DFN

The event PRD explicitly requires sensitive dietary/allergy details to be removable, hidden, or archived after operational use while retaining necessary historical registration/payment records.

The CRM/DMS/EMS PRD requires donor history, receipt support, event history, sponsorship history, communication preferences, and Xero reconciliation. Those needs conflict with unlimited deletion unless retention is deliberate.

### Current Coverage

The PRDs name sensitive data retention as an open question, especially in [005 events](specs/005-events.md). The CRM/DMS/EMS PRD defines broader supporter records but does not set retention periods.

### Missing Decisions

- Retention duration by data type.
- What gets deleted versus redacted versus archived.
- Whether backups/PITR are considered part of retention.
- Whether restored backups require re-running redactions.
- Whether staff can export dietary/allergy details.
- Whether export files expire.
- Whether third-party/caterer copies are governed.
- Which records must be retained for tax/accounting/legal reasons.

### Recommended Default

Create a retention matrix before event registration or real payments launch.

Minimum policy:

- Store dietary/allergy details separately from core registration/payment history.
- Gate dietary/allergy exports to admin users.
- Audit every sensitive export.
- Delete or redact dietary/allergy free text after the event's operational window.
- Keep payment records and reconciliation IDs long enough for accounting and tax workflows.
- Keep consent/preference records with source, timestamp, wording version, segment, and Country Site Attribution.
- Do not rely on Stripe deletion for complete erasure of all payment history.

### Candidate Tools And Features

- Supabase RLS: <https://supabase.com/docs/guides/database/postgres/row-level-security>
- Supabase backups/PITR: <https://supabase.com/docs/guides/platform/backups>
- Supabase pgaudit: <https://supabase.com/docs/guides/database/extensions/pgaudit>
- Stripe deletion requests: <https://docs.stripe.com/privacy/deletion-requests>
- Stripe customer delete: <https://docs.stripe.com/api/customers/delete>
- Sanity dataset export/import: <https://www.sanity.io/docs/dataset>

### Agent Prompt

```text
Create DFN's operational data retention/deletion decision.

Read:
- docs/prds/operational-plumbing-audit-report.md Module 9
- docs/prds/specs/003-giving.md
- docs/prds/specs/004-sponsorship.md
- docs/prds/specs/005-events.md
- docs/prds/specs/006-engagement.md
- docs/prds/specs/007-crm-dms-ems.md
- docs/architecture/website-technical-architecture-research/README.md

Deliver:
- retention matrix
- dietary/allergy handling policy
- export retention policy
- backup/restore redaction note
- launch-critical implementation issue draft

Do not provide legal advice; flag legal/accounting questions for DFN.
```

## Module 10: Backup, Restore, Rollback, And Incident Response

### What This Means

Backups are not enough. DFN needs to know how to restore and who does what when production breaks.

This includes:

- Supabase database backup/PITR
- Sanity content export/backup
- Vercel rollback
- Stripe dashboard/workbench recovery
- email provider incident handling
- incident owner and escalation path
- staging restore drill

### Why It Matters For DFN

Payments and registrations create real operational obligations. If the database is corrupted, if a deployment breaks checkout, or if content is accidentally unpublished, DFN needs a rehearsed recovery path.

### Current Coverage

The architecture ADR set names managed services but not incident response or restore drills.

### Missing Decisions

- Is Supabase PITR required before launch?
- How often are Sanity datasets exported if Enterprise backups are not used?
- Who can roll back Vercel production?
- Who can access Stripe dashboard/workbench?
- What is the restore drill schedule?
- What is the incident communication channel?
- What is the RPO/RTO expectation for website-owned operational records?

### Recommended Default

Before live payments:

- use Supabase paid plan backups at minimum
- consider PITR before real payment/event data
- schedule Sanity dataset exports unless Enterprise backup is enabled
- document Vercel rollback steps
- document Stripe webhook replay/reconciliation steps
- create a staging restore drill
- define incident owner and alert channel

### Candidate Tools And Features

- Supabase backups/PITR: <https://supabase.com/docs/guides/platform/backups>
- Sanity backups: <https://www.sanity.io/docs/apis-and-sdks/backups>
- Sanity dataset export/import: <https://www.sanity.io/docs/dataset>
- Vercel rollback: <https://vercel.com/docs/deployments/instant-rollback>
- Stripe webhooks: <https://docs.stripe.com/webhooks>
- Better Stack incidents: <https://betterstack.com/docs/uptime/working-with-incidents/>

### Agent Prompt

```text
Define DFN's launch backup/restore/incident runbook.

Read:
- docs/prds/operational-plumbing-audit-report.md Module 10
- docs/architecture/website-technical-architecture-research/README.md
- docs/prds/specs/001-overview.md
- docs/prds/specs/003-giving.md
- docs/prds/specs/005-events.md

Deliver:
- backup coverage matrix
- restore drill checklist
- rollback checklist
- incident owner/escalation proposal
- launch acceptance criteria
- issue draft
```

## Module 11: Preview And Admin Operational Controls

### What This Means

DFN needs protected preview and a simple operational admin surface, but "simple admin role" does not remove the need for access controls and audit.

Admin workflows may include:

- exports
- reservations
- payment/reporting views
- manual/offline event registrations
- campaign offline progress adjustments
- dietary/allergy access
- webhook replay
- email resend
- redaction/deletion

### Why It Matters For DFN

The PRDs allow a simple trusted `admin` role at launch, but future AU-only/NZ-only permissions should remain possible. Operational data can be more sensitive than authored content.

### Current Coverage

The operational-data research recommends Supabase Auth for operational/admin routes. Accepted ADR 001 uses Sanity's own auth for CMS access.

### Missing Decisions

- Which admin actions exist in the first slice?
- Which admin actions are export-only versus UI actions?
- Which admin actions are audited?
- How is staff offboarding handled across Vercel, Sanity, Supabase, Stripe, Postmark, Plausible?
- Are preview bypass links protected strongly enough?
- Are preview deployments connected to test data only?

### Recommended Default

Launch admin can be simple, but every admin action that touches operational records should be audited.

Start with:

- one trusted `admin` role
- server-side route protection
- RLS where practical
- export audit logs
- no unaudited dietary/allergy exports
- no production secret exposure in preview deployments
- offboarding checklist across all SaaS surfaces

### Candidate Tools And Features

- Supabase Auth: <https://supabase.com/docs/guides/auth>
- Supabase RLS: <https://supabase.com/docs/guides/database/postgres/row-level-security>
- Vercel deployment protection: <https://vercel.com/docs/deployment-protection>
- Sanity roles: <https://www.sanity.io/docs/user-guides/roles>

### Agent Prompt

```text
Define DFN's launch admin and preview operational controls.

Read:
- docs/prds/operational-plumbing-audit-report.md Module 11
- docs/architecture/website-technical-architecture-research/README.md
- docs/prds/specs/001-overview.md
- docs/prds/specs/002-content.md
- docs/prds/specs/005-events.md
- docs/prds/specs/007-crm-dms-ems.md

Deliver:
- first-slice admin action list
- audit requirements
- access/offboarding checklist
- preview environment rules
- issue draft
```

## Module 12: Transactional Email Reliability

### What This Means

Transactional email covers confirmations, receipts where applicable, form notifications, staff notifications, and operational confirmations.

It is separate from marketing/supporter email.

### Why It Matters For DFN

Donors and event attendees need confirmation. Staff need reliable notifications. Email failures should not corrupt payment or registration state.

### Current Coverage

The transactional-notification research ranks Postmark highest and recommends keeping templates/sends behind an app-level notification adapter.

The CRM/DMS/EMS PRD says transactional email and marketing/supporter email are separate concerns.

### Missing Decisions

- Does Postmark remain the default?
- Are Stripe receipts enabled, website emails enabled, or both?
- Which workflow owns which email?
- What is the app-level notification adapter contract?
- How does send dedupe work?
- Are delivery/bounce/spam webhooks processed?
- What are AU/NZ sender identities?
- Are templates provider-hosted or code-owned?

### Recommended Default

Keep Postmark as default unless there is a strong reason to choose Resend.

Use the app outbox for send dedupe regardless of provider.

Store:

- notification type
- subject record
- recipient
- Country Site Attribution
- provider message ID
- send status
- delivery/bounce/spam status where available

### Candidate Tools And Features

- Postmark send API: <https://postmarkapp.com/developer/user-guide/send-email-with-api>
- Postmark webhooks: <https://postmarkapp.com/developer/webhooks/webhooks-overview>
- Postmark templates: <https://postmarkapp.com/developer/api/templates-api>
- Resend API: <https://resend.com/docs/api-reference/introduction>
- Resend idempotency keys: <https://resend.com/docs/dashboard/emails/idempotency-keys>
- Resend webhooks: <https://resend.com/docs/webhooks/introduction>

### Agent Prompt

```text
Define DFN's launch transactional email reliability decision.

Read:
- docs/prds/operational-plumbing-audit-report.md Module 12
- docs/architecture/website-technical-architecture-research/README.md
- docs/prds/specs/003-giving.md
- docs/prds/specs/005-events.md
- docs/prds/specs/006-engagement.md
- docs/prds/specs/007-crm-dms-ems.md

Deliver:
- workflow email ownership matrix
- Postmark vs Resend recommendation, only if needed
- notification outbox contract
- dedupe rules
- delivery/bounce webhook handling
- issue draft
```

## Module 13: CRM, DMS, EMS, And Xero Handoff

### What This Means

The website should not become the long-term donor or accounting system of record, but it still needs to capture enough data to hand off to the eventual CRM/DMS/EMS/Xero workflow.

This is not full CRM selection. This is the minimum launch data contract.

### Why It Matters For DFN

The CRM/DMS/EMS PRD says DFN needs coherent supporter operations beyond the website. If launch website records are too thin or inconsistent, later CRM/Xero migration becomes painful.

### Current Coverage

[007 CRM/DMS/EMS](specs/007-crm-dms-ems.md) defines source-of-truth questions, Xero reconciliation needs, communication preferences, donor history, event history, sponsorship history, and payment failure follow-up.

### Missing Decisions

- Minimum export fields per workflow.
- Shared reconciliation identifiers.
- Manual CSV export versus direct API sync for launch.
- Whether AU/NZ use separate CRM/DMS/EMS instances or shared setup.
- Which system generates official tax receipts/EOFY statements.
- Which EMS owns supporter email preferences.
- Whether payment failure follow-up is provider, CRM/DMS, EMS, or website-owned.

### Recommended Default

For launch, require reliable exports and shared identifiers. Defer direct CRM/Xero API sync unless finance says it is mandatory.

Minimum record fields:

- website record ID
- Country Site Attribution
- Country Payment Account
- Stripe customer/payment/session/subscription IDs where relevant
- donor/supporter contact details
- purpose/campaign/designation line items
- tax-deductible classification placeholder
- consent segment/source/timestamp/wording version
- event/session/guest fields where relevant
- sponsorship programme/child attribution where relevant
- export timestamp and export ID

### Candidate Tools And Features

- Xero Accounting API: <https://developer.xero.com/documentation/api/accounting/overview>
- Xero invoices: <https://developer.xero.com/documentation/api/accounting/invoices>
- Xero payments: <https://developer.xero.com/documentation/api/accounting/payments>
- Xero webhooks: <https://developer.xero.com/documentation/guides/webhooks/overview/>
- Stripe metadata: <https://docs.stripe.com/metadata>

### Agent Prompt

```text
Define DFN's minimum website-to-CRM/DMS/Xero data contract for launch.

Read:
- docs/prds/operational-plumbing-audit-report.md Module 13
- docs/prds/specs/003-giving.md
- docs/prds/specs/005-events.md
- docs/prds/specs/006-engagement.md
- docs/prds/specs/007-crm-dms-ems.md
- docs/architecture/website-technical-architecture-research/README.md

Deliver:
- source-of-truth matrix for launch
- export field list per workflow
- reconciliation identifier rules
- what can be deferred
- decision issue draft

Do not choose the full CRM/DMS/EMS vendor.
```

## Suggested Minimal ADR Additions

Do not add this operational baseline to accepted ADR 001 without team agreement. If the team makes a decision, record that decision in a separate ADR:

```text
## Operational Plumbing Baseline

Before the first live payment, event registration, sponsorship reservation, or operational admin workflow:

- Use Sentry as the primary application error and tracing monitor.
- Store webhook receipts, processing state, idempotency keys, notification sends, admin actions, exports, and redactions in Supabase.
- Use a Supabase-backed outbox or queue plus a cron heartbeat for launch asynchronous work.
- Treat Stripe webhooks as payment truth; browser redirects are not payment proof.
- Use Cloudflare Turnstile with server-side validation for public write actions.
- Use Vercel WAF and route-level rate limits for checkout, registration, opt-in, and admin endpoints.
- Use Plausible for launch analytics and send only non-PII server-side conversion events after operational success.
- Require a separate CMP/ad-tech decision before enabling GA/GTM, ad pixels, session replay, or identified analytics.
- Define retention/deletion rules before collecting dietary/allergy details or real payment/supporter records.
- Prove webhook replay, backup restore, and Vercel rollback in staging before taking live payments.
```

## Deferred Vendor Decisions

These should not block the first vertical slice unless a concrete workflow proves they are necessary:

- Inngest vs Trigger.dev vs QStash as a strategic workflow layer.
- Datadog/New Relic as full observability platforms.
- PostHog session replay, feature flags, or product funnels.
- Cookiebot vs Usercentrics vs OneTrust vs Osano, unless ad tracking launches.
- Direct Xero API sync, unless finance requires it before launch.
- Full CRM/DMS/EMS vendor selection.
- Event ticketing platform replacement.
- reCAPTCHA Enterprise or hCaptcha Enterprise/passive mode.

## Final Notes

The first vertical slice should prove the architecture through the real operational path:

```text
Country Site page
  -> user submits payment/event flow
  -> Stripe test-mode payment/session created with Country Site Attribution
  -> verified Stripe webhook stored in Supabase
  -> idempotent processor updates Operational State
  -> notification outbox sends confirmation email
  -> server-side Plausible conversion emitted
  -> admin/export view shows AU/NZ-filterable result
  -> Sentry/log/audit trail can explain what happened
```

That slice will clarify more than another vendor comparison.

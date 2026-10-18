# ADR 001: Core Application, Hosting, and CMS Platform

## Status

Accepted

Amended 13 September 2026: use separate AU and NZ deployments with an explicitly configured Country Site.

## Context

DFN needs one TypeScript-first application serving the Australian and New Zealand Country Sites, with cached public routes, dynamic server workflows, protected content preview, branch deployments, and a structured editorial system.

Supporting evaluation, evidence, candidate comparisons, scores, exclusions, risks, and follow-up work are in [Website Technical Architecture Research](../architecture/website-technical-architecture-research/README.md). The application, hosting, and CMS scoring that supports this accepted decision is in [Application, Hosting, and CMS Research](../architecture/website-technical-architecture-research/02-app-hosting-and-cms-research.md).

## Decision

- Use TypeScript throughout.
- Use Next.js App Router for the public application and operational/admin application routes.
- Use one Next.js codebase deployed separately for `dfn.org.au` and `dfn.org.nz`. Both deployments use the same Sanity content dataset.
- Fix the Country Site per deployment using `COUNTRY_SITE=AU` or `COUNTRY_SITE=NZ`. This configuration selects country-specific content and payment configuration; request hostnames and visitor location do not select the Country Site. The [15 October country decision #68](https://github.com/dfn-au/dfn-web/issues/68) requires an obvious way to switch between the sites, superseding the earlier deferral of that UI. Switching navigates to the other deployment; it does not change this deployment configuration.
- Local development and branch/PR preview deployments also explicitly configure their Country Site. Missing or invalid configuration must fail validation rather than silently select a country.
- Filter public content by Publishing Scope, generate self-canonical URLs per domain, use alternate hints where appropriate, and return 404 for Site-Specific Content outside its Publishing Scope unless an explicit redirect exists.
- Use Vercel for application hosting, branch/PR preview deployments, CDN delivery, functions, cache revalidation, and both public domains.
- Use Sanity Content Lake and Sanity Studio for Authored Content, approved structured content blocks, launch-critical configuration, and staff editorial workflows across Shared Content and Site-Specific Content.
- Use Sanity's staff access for Sanity Studio. Separate CMS and operational logins are acceptable for launch.

## Deliberate Seams

This ADR does not decide:

- Exact Sanity schemas, block library, desk structure, content migration inventory, or redirect map.
- Exact modelling for Shared Content, Site-Specific Content, linked counterparts, field-level site variation, or editor-safe publishing controls. The subsequent [ADR 004](004-country-site-publishing.md) records the publishing model and v1 boundaries for [issue #21](https://github.com/dfn-au/dfn-web/issues/21).
- Whether Sanity Studio remains embedded in the Next.js application or moves to a separate application. This is owned by [issue #18](https://github.com/dfn-au/dfn-web/issues/18).
- Operational persistence, payments, transactional notifications, or analytics vendors. These choices are addressed by subsequent decisions. [ADR 005](005-operational-staff-authentication.md) decides operational staff authentication; [ADR 006](006-stripe-donation-ownership.md) records donation payments, records, and the boundary with existing Stripe emails and recurring management. Other workflow/vendor choices remain separate.

## Consequences

The first platform slice can use a public Next.js route on Vercel, Sanity-managed draft and published content, protected preview, and publish-triggered revalidation without treating workflow-specific service recommendations as accepted decisions.

Separate deployments keep Country Site selection fixed even on temporary preview domains. Shared documents retain one editorial publishing action; affected content must refresh in both deployments. Studio preview locations point to the corresponding AU and NZ deployments.

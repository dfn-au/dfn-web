# ADR 001: Core Application, Hosting, and CMS Platform

## Status

Accepted

## Context

DFN needs one TypeScript-first application serving the Australian and New Zealand Country Sites, with cached public routes, dynamic server workflows, protected content preview, branch deployments, and a structured editorial system.

The complete cross-stack evaluation, evidence, candidate comparisons, scores, exclusions, coverage audit, risks, and follow-up work are preserved in the [Website Technical Architecture Research](../architecture/website-technical-architecture-research/README.md). The application, hosting, and CMS scoring that supports this accepted decision is in [Application, Hosting, and CMS Research](../architecture/website-technical-architecture-research/02-app-hosting-and-cms-research.md).

## Decision

- Use TypeScript throughout.
- Use Next.js App Router for the public application and operational/admin application routes.
- Use one Next.js application to serve `dfn.org.au` and `dfn.org.nz`.
- Resolve the Country Site from the request domain; do not require a launch country-switching UX.
- Filter public content by Publishing Scope, generate self-canonical URLs per domain, use alternate hints where appropriate, and return 404 for Site-Specific Content outside its Publishing Scope unless an explicit redirect exists.
- Use Vercel for application hosting, branch/PR preview deployments, CDN delivery, functions, cache revalidation, and both public domains.
- Use Sanity Content Lake and Sanity Studio for Authored Content, approved structured content blocks, launch-critical configuration, and staff editorial workflows across Shared Content and Site-Specific Content.
- Use Sanity's staff access for Sanity Studio. Separate CMS and operational logins are acceptable for launch.

## Deliberate Seams

This ADR does not decide:

- Exact Sanity schemas, block library, desk structure, content migration inventory, or redirect map.
- Exact modelling for Shared Content, Site-Specific Content, linked counterparts, field-level site variation, or editor-safe publishing controls. This is owned by [issue #21](https://github.com/dfn-au/dfn-web/issues/21).
- Whether Sanity Studio remains embedded in the Next.js application or moves to a separate application. This is owned by [issue #18](https://github.com/dfn-au/dfn-web/issues/18).
- Operational persistence, operational staff authentication, payments, transactional notifications, or analytics vendors. Those choices remain undecided and are documented as research rather than ADRs.

## Consequences

The first platform slice can use a public Next.js route on Vercel, Sanity-managed draft and published content, protected preview, and publish-triggered revalidation without treating workflow-specific service recommendations as accepted decisions.

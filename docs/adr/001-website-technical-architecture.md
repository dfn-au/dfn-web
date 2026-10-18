# ADR 001: Core application, hosting and CMS platform

Accepted. Country deployments amended 13 September 2026; country switching confirmed in [#68](https://github.com/dfn-au/dfn-web/issues/68) on 15 October 2026.

Use one TypeScript Next.js App Router codebase on Vercel for the public sites and Next.js admin tools, with Sanity Content Lake and Studio for Authored Content. This keeps public rendering, server workflows and protected content preview together while giving staff a structured publishing system.

Deploy separately for `dfn.org.au` and `dfn.org.nz`, sharing one Sanity dataset. Each deployment, including local development and previews, explicitly selects `COUNTRY_SITE=AU` or `COUNTRY_SITE=NZ`. Missing or invalid configuration must fail validation. Request hostnames and visitor location do not select the Country Site, so temporary preview domains cannot change content or payment routing. The public country switch navigates to the other deployment.

[ADR 003](003-authored-content-and-operational-state-ownership.md) defines data ownership; [ADR 004](004-country-site-publishing.md) defines shared publishing; [ADR 005](005-operational-staff-authentication.md) defines staff authentication; [ADR 006](006-stripe-donation-ownership.md) defines donation payments. Other workflow-specific vendors remain separate decisions.

PostHog is installed for public analytics and error reporting. Its presence does not establish approval of the launch analytics, conversion or consent policy, which remains with [#16](https://github.com/dfn-au/dfn-web/issues/16).

These are accepted choices, not a delivery checklist. [Launch issue #8](https://github.com/dfn-au/dfn-web/issues/8) owns launch scope and remaining work.

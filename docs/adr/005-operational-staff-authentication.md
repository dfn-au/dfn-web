# ADR 005: Operational Staff Authentication

Use Sanity staff authentication for the Next.js admin tools, with the configured
project's Administrator role required on every protected server request. This
shares sign-in with Studio without creating another identity database or asking
staff to manage tokens; the admin tools retain their own Next.js routes.

The application cookie stores the Sanity session token itself, scoped to `/admin`
and limited to eight hours, and server requests validate it against Sanity without
caching. Availability therefore depends on Sanity; outages deny access. Editors
can use Studio with their existing permissions. PostHog is excluded from admin,
including callback pages and error reporting.

This resolves the operational staff authentication seam in [ADR 001](001-website-technical-architecture.md).

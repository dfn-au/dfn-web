# ADR 005: Operational staff authentication

Accepted and implemented. Use Sanity staff authentication for the Next.js admin tools, requiring the configured project's Administrator role on every protected server request. This shares sign-in with Studio without another identity database; admin tools retain their own Next.js routes and editors retain their normal Studio permissions.

The HttpOnly application cookie stores the Sanity session token itself, scoped to `/admin` and limited to eight hours. Server requests validate it against Sanity without caching, so outages deny access. Sign-out revokes the represented Sanity session before clearing the cookie. PostHog is excluded from admin, including callback pages and error reporting.

See the [application documentation](../../apps/web/README.md#admin-authentication) for callback handling, server guards and deployment checks. This resolves the staff authentication boundary in [ADR 001](001-website-technical-architecture.md).

# Web App

Next.js App Router application for the DFN public Country Sites, admin routes,
and embedded Sanity Studio at `/admin/studio`. Studio supports content editing
and live preview of the public pages.

## Admin appearance

The admin dashboard, diagnostics, login states, and Studio navigation use
`@sanity/ui`, matching Studio's installed version and default `buildTheme()`.
Use Sanity UI primitives for new admin components. The admin layout imports
Sanity UI's stylesheet and a small CSS reset; the public site's Tailwind theme
stays separate.

Admin pages and Studio always use dark mode. `AdminTheme` and both
`StudioProvider` instances receive a fixed `scheme="dark"`, with no appearance
picker or browser preference storage. Inline CSS paints the matching dark
canvas before scripts load, and server-rendered content is dark immediately.

## Admin authentication

`/admin` and `/admin/errors` require the **Administrator** role in the configured
Sanity project. They keep their own Next.js UI. `/admin/login` uses Sanity's
`StudioProvider` for provider selection and callback handling, then sends the
user credential to `/admin/auth/session`. Content editors can continue to use
`/admin/studio` with their normal Sanity permissions.

Both login and Studio use token authentication. Existing cookie-only Studio
sessions may require a fresh login. Their shared origin must be registered in
Sanity's CORS origins with authenticated requests enabled; include the exact
localhost port when testing. No additional service token, auth secret or user
database is needed.

The application stores the **Sanity session token itself**, not independently
issued permissions, in an eight-hour HttpOnly cookie scoped to `/admin`.
Production uses Secure and a `__Secure-` cookie name; local development uses a
non-Secure cookie. The cookie is not sent to public routes or the analytics
proxy. Every protected server request validates the session and administrator
role against the configured project's `/users/me` API with caching disabled.
Sanity outages deny access. The cookie lifetime limits browser persistence;
Sanity controls the credential's actual lifetime and revocation.

Sign-out revokes that session through Sanity before clearing the application
cookie. If revocation fails, the UI reports failure and allows retry. An
eight-hour cookie expiry may be renewed automatically through the existing
Studio login. Other devices' independent Sanity sessions are unaffected.

For new private pages, call `requireAdminPage()` before reading data or
rendering private content. For mutation route handlers, call
`requireAdminMutation(request)` before any side effect; same-origin browser
requests must include `x-dfn-admin: 1`. A layout or client-side provider alone
does not protect a server handler. Add a server authorization check to any
future read endpoint or Server Action as well. Session creation and sign-out
also require the exact Origin and custom header to prevent CSRF. Do not log
Cookie or Authorization headers.

The login/callback, session handlers and Studio shell intentionally remain
outside the application-cookie gate. Studio enforces its own content
permissions. Draft-mode enablement retains Sanity's preview-secret flow.
`StudioProvider` is documented for advanced composition but currently marked
beta in Sanity's types; verify the login flow on dependency upgrades.

Verified with a real administrator against a production build on
`localhost:3000`: Google login returned to the custom admin page, diagnostics
and its authenticated endpoint worked, Studio opened without another login,
and sign-out required fresh login for both surfaces. The temporary
`localhost:3101` origin did not complete the callback; use an allowed origin.
Repeat the flow on the deployment origin before release, including a
non-administrator account. Automated tests cover denial, cookie issuance,
CSRF, role changes, upstream errors and revocation failures with mocked Sanity
responses. Presentation preview was also verified during the Sanity UI reskin
after restoring the local environment file.

Run commands from the repo root:

```sh
pnpm dev
pnpm build
pnpm lint
pnpm typegen
pnpm typecheck
pnpm test
```

The public homepage and content pages share the grouped navigation authored in
**Home Page → Header and footer → Header**. Shared visual components live in `src/components/site`; the design-refresh
reference routes have been removed.

- Give a navigation item a destination for a direct link, or child links for a
  disclosure. Put the category overview first among its children. A child cannot
  contain another submenu.
- Submenu headlines and introductions are optional. Consecutive child links with
  the same group label are grouped visually, without adding a navigation level.
- Direct links such as About DFN and Contact belong in the same navigation list
  as categories with children. Navigation and the Give destination are shared
  across devices.

Schema changes do not populate or publish menu content. Review and publish the
header through Sanity separately from deploying the application.

Sanity query results are inferred from the schemas and `defineQuery` calls in
`src/sanity/lib/queries.ts`. After changing a schema or query, run `pnpm typegen`
and commit both `schema.json` and `src/sanity/types.ts` with the change. The
command uses the Sanity project and dataset from `.env.local`; it extracts the
local schema and generates types without fetching or publishing content.

Components derive their content types from the generated query results. Missing
fields remain nullable so incomplete drafts can render, and homepage content
also accepts the stega-branded strings used by live visual editing. Do not edit
the generated files or cast fetch results to handwritten shapes. CI regenerates
both files and fails if either differs from its committed version. Embedded Studio
runs through Next.js, so `pnpm dev` does not run TypeGen automatically.

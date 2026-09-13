# Sanity authentication for admin endpoints

Investigated 2026-09-13. Follow-up implementation now keeps the admin UI separate and uses a Sanity login page plus an HttpOnly credential cookie. The cookie contains the Sanity session token, and each protected request revalidates with Sanity; it is not an independently issued application session. See the [application documentation](../../apps/web/README.md#admin-authentication) for actual behavior. A real administrator's Google login, return to the custom admin page, authenticated endpoint call, Studio access without another login, and sign-out revocation were verified against a production build on localhost:3000. The [code sketch](./sanity-admin-auth-code-sketch.md) and design discussion below are historical research.

## Current recommendation: separate admin UI with a Sanity login page

Follow-up investigation established a concrete login handoff from shipped source. Our own `/admin/login` page can render `StudioProvider` with custom children and omit `StudioLayout`. The provider includes `AuthBoundary`: it displays Sanity's normal login, handles the callback, and renders children after authentication and project-role resolution. The children can exchange the credential for an application session and navigate to our own admin UI. The admin tools do not have to become Studio tools. [Advanced Next.js embedding](https://www.sanity.io/docs/nextjs/embedding-sanity-studio-in-nextjs), [Sanity 6.13.1 source maps](https://registry.npmjs.org/sanity/-/sanity-6.13.1.tgz)

The exact source chain is `StudioProvider` → `AuthBoundary` → `AuthenticateScreen` → `WorkspaceAuth` → the auth store's login component. `WorkspaceAuth` supplies the current pathname and query as the return path when under its configured base path. The login component constructs the provider URL using that return path and project ID. Token login requests a session ID in the URL fragment; `AuthBoundary` invokes `handleCallbackUrl()` to exchange it and settle authentication. We should reuse these components instead of implementing those internal endpoints ourselves. [Sanity 6.13.1 source maps: `StudioProvider.tsx`, `AuthBoundary.tsx`, `WorkspaceAuth.tsx`, `createLoginComponent.tsx`, `createAuthStore.ts`](https://registry.npmjs.org/sanity/-/sanity-6.13.1.tgz)

Set the login configuration's `basePath` to `/admin/login`. Do not pass that as the provider's additional `basePath` while retaining `/admin/studio` in the config: the paths are composed. Login and the editor must use the same origin/project to reuse the stored project token. This source keys token storage by project, not URL path. Keep the original editor at `/admin/studio`. [Sanity 6.13.1 source maps: auth constants, workspace configuration and login component](https://registry.npmjs.org/sanity/-/sanity-6.13.1.tgz)

This resolves the architectural question about initial login. It does not constitute a live browser test. `StudioProvider` and its props are tagged `@hidden @beta` in the pinned source even though the official embedding guide documents their use. The application-session exchange, CSRF protection, expiry, revalidation and coordinated logout remain our implementation responsibilities. This is a feasible composition of Studio components, not a standard Sanity OAuth/OIDC adapter for arbitrary apps. The [code sketch](./sanity-admin-auth-code-sketch.md) now describes this handoff before the earlier Studio-tool variant.

## Earlier approach: admin tools inside Studio

Put the admin UI in a Studio tool. Send the active Studio session token in an `Authorization: Bearer` header to our same-origin Next.js endpoint. The endpoint calls the configured project's Sanity `/users/me` endpoint with that token and permits the operation only when the returned user has the `administrator` role. This is a proposed application authorization policy, not automatic protection supplied by Studio.

This works with Sanity's existing client model: Studio uses its configured project client to request `/users/me`, accepts a string user ID as authenticated, and passes the response through as `currentUser`. Its public `CurrentUser` shape includes `roles`, each with a `name`. The source inspected was `sanity@6.13.1`, matching this repository; the auth client pins API version `2026-05-04`. [Sanity package source and source maps](https://registry.npmjs.org/sanity/-/sanity-6.13.1.tgz), [CurrentUser and role documentation](https://www.sanity.io/learn/course/introduction-to-users-and-roles/studio-customizations)

The corresponding server request is:

```text
GET https://<configured-project-id>.api.sanity.io/v2026-05-04/users/me
Authorization: Bearer <caller's Studio token>
```

Our guard must fix the host/project from server configuration, validate the returned shape, require a nonempty user ID and `roles.some(role => role.name === 'administrator')`, and fail closed on missing roles or upstream errors. A browser-supplied role, user ID, or project ID must never decide access. These are application design requirements. The server call, rather than the Studio UI's `useCurrentUser()` value, provides the trusted identity and role evidence.

## Credential scope and browser behavior

Studio credentials are project-scoped. Sanity's App SDK documentation distinguishes these from global user tokens and explicitly says Studio authentication cannot call global endpoints. It also describes both token and HTTP-only cookie authentication. Therefore, forwarding a browser cookie to our origin or sending a Studio token to `api.sanity.io` is not a sound default. Our custom endpoint needs an explicit bearer credential; the sketch uses Studio token login. [SDK authentication](https://www.sanity.io/docs/app-sdk/sdk-authentication)

Generic personal/CLI tokens are a different consideration: Sanity documents them as having the user's full API access and a default one-year lifetime, shortened with SAML. Do not substitute a permanent developer token or a shared robot token for the caller's identity. Forwarding a user token also means our server handles a credential capable of Sanity operations; it should remain request-local and never enter logs, URLs, analytics, or error payloads. [Authentication and tokens](https://www.sanity.io/docs/content-lake/http-auth)

## Why not use the management APIs first?

The Projects API documents `GET /projects/{projectId}/users/me` on the global host, returning `id`, `sanityUserId`, and `projectId`, but no roles. This is a different route from Studio's project-host `/users/me`. [Projects API](https://www.sanity.io/docs/http-reference/projects-api)

The Access API documents project user membership/role lookups and a current-user permission check. A user lookup requires `sanity.project.members.read`; its response carries `memberships` with `resourceType`, `resourceId`, and `roleNames`. A permission check returns a boolean map. Those are useful if we later adopt credentials supporting the management API, but global-host compatibility must not be assumed for the Studio session. [Access API](https://www.sanity.io/docs/http-reference/access-api)

Checking the exact built-in role is deliberately narrow. An equivalent custom administrator role may not match. If we introduce custom roles, we should define a deliberate app access policy and verify the appropriate permission API instead of silently broadening the role check.

## Lifecycle and limits

Studio's inspected logout implementation calls `/auth/logout` for its token and cookie clients, then clears local auth state. It uses `Promise.allSettled`, so a failed remote logout can still clear browser state. We cannot promise that every browser logout immediately revokes a previously copied token. Our guard should contact Sanity on every request with caching disabled, rather than issue a long-lived independent application session. [Sanity 6.13.1 source, `createAuthStore.ts` in the source maps](https://registry.npmjs.org/sanity/-/sanity-6.13.1.tgz)

Sanity's current role guide states that `/users/me` requires a user session, whereas `/user-permissions/me*` accepts robot tokens. It also says Access permission checks consult the authoritative store, while Content Lake permission changes can propagate asynchronously. It does not establish a precise role-revocation SLA for Studio `/users/me`. [Custom-role verification guide](https://www.sanity.io/docs/content-lake/build-a-custom-role-with-the-access-api)

## Remaining validation before implementation

No real user credentials were exercised. The sketch still needs an authenticated integration check covering:

- Administrator success and editor/viewer denial in this project.
- A user/token from another project, an outsider, and a removed member.
- Missing, invalid, expired, revoked, and robot credentials.
- The exact project-host response shape and observed effect of removing the administrator role.
- Token login, existing cookie-only sessions, browser refresh, and logout.
- Sanity timeout/failure, malformed responses, and requests sent directly without opening Studio.

These checks matter because the direct endpoint is verified through Sanity's shipped Studio source, while its complete HTTP response and cross-project denial contract are not separately specified in the public HTTP reference inspected here. The proposed integration is a small custom guard, not a supported Sanity-to-Next.js authentication adapter. This investigation adds documentation and a sketch; it does not protect the existing routes.

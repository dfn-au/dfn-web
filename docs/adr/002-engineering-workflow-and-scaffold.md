# ADR 002: Engineering Workflow And Initial Scaffold

## Status

Accepted

## Context

ADR 001 chooses the website platform: Next.js App Router on Vercel, Sanity for Authored Content, Supabase for Operational State, Stripe, Postmark, and Plausible.

The repo also needs a development and release foundation before implementation slices begin. This decision covers the initial scaffold only. It does not add Sanity, Supabase, payments, Playwright, Vercel config, or release automation yet.

## Decision

Use a pnpm workspace monorepo with one initial app:

```text
apps/web
```

The `web` app is a Next.js App Router application containing the public Country Site routes, operational/admin routes, future API routes, and later the embedded Sanity Studio route.

Use route groups from the start:

```text
apps/web/src/app/(public)
apps/web/src/app/(admin)
apps/web/src/app/api
```

Use these development defaults:

- Node 24 LTS as the baseline runtime.
- pnpm 11 as the package manager.
- Strict engine enforcement through `pnpm-workspace.yaml`.
- Tailwind CSS from the start.
- Strict TypeScript.
- Biome for linting and formatting.
- Vitest for unit tests.
- Minimal GitHub Actions CI for install, lint, typecheck, test, and build.
- Root package scripts that target `apps/web` while it is the only app.

Do not add these in the initial scaffold:

- Sanity Studio or Sanity schemas.
- Supabase local development, migrations, or generated types.
- Playwright end-to-end tests.
- Vercel-specific config.
- Release Please, Changesets, changelog automation, or commit hooks.
- shadcn/ui or another component library.

## Consequences

The repo starts with the same developer experience as a single app while keeping a monorepo boundary for future apps and shared packages.

Embedding Sanity Studio later under the Next admin surface remains the preferred path for a seamless staff admin experience.

Supabase is intentionally deferred so the initial scaffold does not create fake Operational State tables before a real operational workflow slice needs them.

Release and changelog automation are intentionally deferred until the app has a meaningful deployable release surface.

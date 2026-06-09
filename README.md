# DFN Web

Website rebuild workspace for the DFN Australia and New Zealand Country Sites.

## Requirements

- Node 24 LTS
- pnpm 10.24.0

The repo enforces Node and pnpm versions through `.nvmrc`, `package.json`, and `.npmrc`.

## Setup

```sh
pnpm install
pnpm dev
```

## Commands

Run commands from the repo root:

```sh
pnpm dev
pnpm build
pnpm lint
pnpm format
pnpm check
pnpm typecheck
pnpm test
```

Root scripts currently target `apps/web`.

## Current Scaffold

- `apps/web`: Next.js App Router app
- Tailwind CSS
- Route groups for public and admin surfaces
- Biome for linting and formatting
- Vitest for unit tests

Deferred slices:

- Embedded Sanity Studio
- Supabase local development and operational schema
- Playwright end-to-end tests
- Vercel-specific config
- Release and changelog automation
- Component library setup

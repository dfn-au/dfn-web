# DFN Web

[![CI](https://github.com/dfn-au/dfn-web/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/dfn-au/dfn-web/actions/workflows/ci.yml)
![Node](https://img.shields.io/badge/node-24_LTS-339933?logo=node.js&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-11.5.2-F69220?logo=pnpm&logoColor=white)

Website rebuild workspace for the DFN Australia and New Zealand Country Sites.

## Requirements

- Node 24 LTS
- pnpm 11.5.2

The repo enforces Node and pnpm versions through `.nvmrc`, `package.json`, and `pnpm-workspace.yaml`.

## Setup

```sh
pnpm install
cp apps/web/.env.example apps/web/.env.local
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
- PostHog analytics and error monitoring

Deferred slices:

- Embedded Sanity Studio
- Supabase local development and operational schema
- Playwright end-to-end tests
- Vercel-specific config
- Release and changelog automation
- Component library setup

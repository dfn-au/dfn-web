# DFN Web

[![CI](https://github.com/dfn-au/dfn-web/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/dfn-au/dfn-web/actions/workflows/ci.yml)
![Node](https://img.shields.io/badge/node-24_LTS-339933?logo=node.js&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-12.4.1-F69220?logo=pnpm&logoColor=white)

Website rebuild workspace for the DFN Australia and New Zealand Country Sites.

- [Launch scope, checks and next questions](https://github.com/dfn-au/dfn-web/issues/8)
- [Questions ready for an answer](https://github.com/dfn-au/dfn-web/issues?q=is%3Aissue%20is%3Aopen%20label%3Aquestion%20label%3Aready-for-human)
- [Delivery work](https://github.com/dfn-au/dfn-web/issues?q=is%3Aissue%20is%3Aopen%20-label%3Aquestion)

GitHub issues hold current scope, decisions and work. The repository keeps
[domain definitions](CONTEXT.md), [architecture decisions](docs/adr/),
[dated evidence](docs/research/) and the [workshop capture tool](docs/discovery/README.md).
CRM selection is separate from website launch in [#69](https://github.com/dfn-au/dfn-web/issues/69).

## Requirements

- Node 24 LTS
- pnpm 12.4.1

The repo enforces Node and pnpm versions through `.nvmrc`, `package.json`, and `pnpm-workspace.yaml`.

Node 24 is pinned in both workspace and app manifests so Vercel uses the supported runtime when the project root is `apps/web`.
On Vercel, set `ENABLE_EXPERIMENTAL_COREPACK=1` so builds use the pinned pnpm version; see [Vercel's Corepack configuration](https://vercel.com/docs/builds/configure-a-build#corepack).

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
pnpm typegen
pnpm typecheck
pnpm test
```

Root scripts currently target `apps/web`.

See the [application README](apps/web/README.md) for publishing, environment,
preview and authentication setup.

The frozen legacy website is preserved in
[dfn-au/dfn-web-legacy-reference](https://github.com/dfn-au/dfn-web-legacy-reference).

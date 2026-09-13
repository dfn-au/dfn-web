# Web App

Next.js App Router application for the DFN public Country Sites, admin routes,
and embedded Sanity Studio at `/admin/studio`. Studio supports content editing
and live preview of the public pages.

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
and commit `src/sanity/types.ts` with the change. The command uses the Sanity
project and dataset from `.env.local`; it extracts the local schema to an ignored
`schema.json` and generates types without fetching or publishing content.

Components derive their content types from the generated query results. Missing
fields remain nullable so incomplete drafts can render, and homepage content
also accepts the stega-branded strings used by live visual editing. Do not edit
the generated file or cast fetch results to handwritten shapes. CI regenerates
the file and fails if it differs from the committed version. Embedded Studio
runs through Next.js, so `pnpm dev` does not run TypeGen automatically.

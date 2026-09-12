# Web App

Next.js App Router application for the DFN public Country Sites, operational admin routes, future API routes, and future embedded Sanity Studio.

Run commands from the repo root:

```sh
pnpm dev
pnpm build
pnpm lint
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

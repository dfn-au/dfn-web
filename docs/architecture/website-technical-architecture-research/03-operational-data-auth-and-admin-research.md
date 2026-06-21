# Operational Data, Authentication, and Admin Research

This file contains the scored operational database, staff authentication, and admin comparison and additional coverage findings. No provider choice is decided by this research.

### Operational Database, Auth, and Admin

| Candidate | Score | Assessment |
| --- | ---: | --- |
| Supabase Postgres + Supabase Auth | 8.6 | Best managed-service fit for relational operational state, Auth, RLS, migrations/local development, and preview branching. |
| Neon Postgres + Clerk | 7.8 | Strong database branching and polished auth/organizations, but two vendors and more integration work. |
| Neon Postgres + Auth0 | 7.2 | Strong auth/RBAC option, but heavier than needed for launch admin access. |
| Firebase Data Connect + Auth | 7.0 | Promising managed relational path with Firebase Auth, but newer and less direct for Postgres-centric workflow design. |
| Directus Cloud + Postgres | 7.0 | Good admin/data surface, but risks blurring operational data admin with editorial CMS concerns. |
| Payload + managed Postgres | 6.8 | Viable integrated admin/CMS/database path, but increases app responsibility for CMS/admin operations. |
| PlanetScale + Clerk/Auth0 | 6.4 | Credible branching database platform, but less direct than Supabase for Postgres plus auth in one managed stack. |
| Railway/Render Postgres + Clerk/Auth0 | 6.2 | Useful managed Postgres baseline, but more DIY around auth, branching, and operational admin. |
| Neon + Auth.js | 6.2 | Maximum code ownership, but more custom auth/session responsibility than issue #17 wants. |
| Firebase Firestore + Auth | 5.6 | Strong managed auth/data platform, but document-store modelling is a poor fit for reservations, reporting, and idempotent payment state. |
| Sanity as operational store | 3.0 | Rejected: Sanity is a content/configuration store, not the source of truth for payments, capacity, locks, sensitive attendee data, or reporting. |

Primary sources checked: [Postgres transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html), [Postgres constraints](https://www.postgresql.org/docs/current/ddl-constraints.html), [Postgres SELECT locking clauses](https://www.postgresql.org/docs/current/sql-select.html), [Supabase database](https://supabase.com/docs/guides/database/overview), [Supabase Auth](https://supabase.com/docs/guides/auth), [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [Supabase local development](https://supabase.com/docs/guides/local-development/overview), [Supabase branching](https://supabase.com/docs/guides/deployment/branching), [Neon branching](https://neon.com/docs/conceptual-guides/branching/), [Clerk Next.js](https://clerk.com/docs/nextjs/overview), [Clerk auth helper](https://clerk.com/docs/reference/nextjs/app-router/auth), [Clerk roles and permissions](https://clerk.com/docs/organizations/create-roles-permissions), [Clerk webhooks](https://clerk.com/docs/guides/development/webhooks/overview), [Auth0 Universal Login](https://auth0.com/docs/universal-login), [Auth0 RBAC](https://auth0.com/docs/manage-users/access-control/rbac), [Auth.js database adapters](https://authjs.dev/getting-started/database), [Firebase Data Connect](https://firebase.google.com/docs/data-connect), [Firebase Auth](https://firebase.google.com/docs/auth), [PlanetScale branching](https://planetscale.com/docs/postgres/branching), [Railway Postgres](https://docs.railway.com/databases/postgresql), [Render databases](https://render.com/docs/databases), [Directus overview](https://directus.com/docs/getting-started/overview), [Payload Postgres](https://payloadcms.com/docs/database/postgres).


### Operational Database, Auth, and Admin Coverage

The current `Operational Database, Auth, and Admin` section combines three separate concerns. Coverage is clearer if future edits split operational persistence, staff authentication, and the operational back-office surface.

| Subcategory | Missing or under-covered contenders | Coverage note |
| --- | --- | --- |
| Managed relational database | AWS RDS/Aurora Postgres, Google Cloud SQL/AlloyDB, Azure Database for PostgreSQL, Heroku Postgres, Prisma Postgres, Xata, Nhost, CockroachDB Cloud | Add as managed relational baselines. Deep research Supabase-like and stack-adjacent options such as Prisma Postgres, Xata, and Nhost; keep hyperscaler databases mostly shallow unless existing constraints appear. |
| Database exclusions | Vercel Postgres, Cloudflare D1, Turso, MongoDB Atlas, Convex, Firestore, Airtable-style stores | Vercel Postgres is no longer a new-project default; D1/Turso and document stores are weaker fits for reservation locks, reporting, and payment webhook idempotency. |
| Staff/admin auth | WorkOS, Stytch B2B, CMS-native SSO/roles, Google Workspace, Microsoft Entra ID, Okta | Add WorkOS and Stytch as managed auth contenders. Treat Google Workspace, Entra ID, and Okta as upstream IdPs, not app-auth replacements. |
| Custom/admin framework accelerators | React-admin, Refine, AdminJS | Useful if custom Next.js admin routes become larger than an export/admin MVP. |
| Low-code/internal tools | Retool, Appsmith, Budibase, Forest Admin | Need deep enough research before finalizing whether custom admin routes are still the lowest-burden staff surface. |
| Database/spreadsheet admin | Supabase Studio, NocoDB, Airtable Interfaces | Useful for internal operations checks, but risky as primary staff workflow surfaces unless governance is explicit. |
| Reporting/admin surfaces | Metabase, Looker Studio, Power BI, Stripe Dashboard/Sigma | Need explicit comparison against app-owned CSV exports because PRDs leave reporting/export system of record open. |
| Fundraising/event back office | Raisely, Donorbox, GiveNow, Funraise, Givebutter, Humanitix, TryBooking, Eventbrite, Ticket Tailor | These can own operational staff workflows and should not be treated only as payment processors. |

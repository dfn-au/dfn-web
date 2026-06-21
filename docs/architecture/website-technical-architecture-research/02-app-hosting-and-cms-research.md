# Application, Hosting, and CMS Research

This file preserves the original scored application-framework, hosting, and CMS comparisons and their coverage-audit findings.

<!-- original-adr-001-lines: 141-171 -->

### App Framework and Hosting

| Candidate | Score | Assessment |
| --- | ---: | --- |
| Next.js App Router + Vercel | 9.5 | Best fit for React/TypeScript, server routes, protected preview, cache revalidation, Git previews, Vercel Functions, CDN caching, and ISR. |
| Nuxt + Vercel/Netlify | 8.0 | Credible full-stack Vue option with hybrid rendering and server routes, but weaker fit for the React/Next hiring and integration path. |
| SvelteKit + Vercel/Netlify/Cloudflare | 7.8 | Strong full-stack framework with adapters and form actions, but smaller hiring/integration surface for this project. |
| Next.js + Netlify | 7.7 | Credible managed alternative with Next.js support, Deploy Previews, and functions, but weaker fit than Vercel for first-party Next.js integration. |
| Next.js + Cloudflare Workers/OpenNext | 7.6 | Attractive edge platform option, but adds adapter/runtime complexity versus the first-party Vercel path. |
| Astro + Vercel/Netlify/Cloudflare | 7.1 | Strong for content-heavy static sites, but less natural for the operational/admin workflows, auth, and payment/webhook surface. |
| React Router Framework Mode | 6.7 | Modern React full-stack option, but less compelling than Next.js/Vercel for cache revalidation and deployment ecosystem maturity. |
| Render static/web services | 5.8 | Useful hosting baseline, but does not provide the same framework-native preview, CDN, function, and ISR path. |

Primary sources checked: [Next.js App Router](https://nextjs.org/docs/app), [Next.js Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers), [Next.js Draft Mode](https://nextjs.org/docs/app/guides/draft-mode), [Next.js revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath), [Vercel Git deployments](https://vercel.com/docs/deployments/git), [Vercel deployment protection](https://vercel.com/docs/deployment-protection/), [Vercel Functions](https://vercel.com/docs/functions), [Vercel CDN cache](https://vercel.com/docs/caching/cdn-cache), [Vercel ISR](https://vercel.com/docs/incremental-static-regeneration), [Netlify Next.js](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/), [Netlify Deploy Previews](https://docs.netlify.com/site-deploys/deploy-previews/), [Netlify Functions](https://docs.netlify.com/functions/overview/), [Cloudflare Next.js on Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/), [Cloudflare Pages preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/), [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/), [Nuxt rendering](https://nuxt.com/docs/4.x/guide/concepts/rendering), [Nuxt server directory](https://nuxt.com/docs/4.x/directory-structure/server), [SvelteKit page options](https://svelte.dev/docs/kit/page-options), [SvelteKit routing](https://svelte.dev/docs/kit/routing), [SvelteKit form actions](https://svelte.dev/docs/kit/form-actions), [SvelteKit Vercel adapter](https://svelte.dev/docs/kit/adapter-vercel), [Astro on-demand rendering](https://docs.astro.build/en/guides/on-demand-rendering/), [Astro endpoints](https://docs.astro.build/en/guides/endpoints/), [Astro actions](https://docs.astro.build/en/guides/actions/), [React Router modes](https://reactrouter.com/start/modes), [React Router pre-rendering](https://reactrouter.com/how-to/pre-rendering), [Render static sites](https://render.com/docs/static-sites/), [Render preview environments](https://render.com/docs/preview-environments), [Render web services](https://render.com/docs/web-services/).

### CMS and Editorial

| Candidate | Score | Assessment |
| --- | ---: | --- |
| Sanity | 9.3 | Best fit for structured schemas, references, block content, assets, image transforms, Presentation Tool, and draft-mode preview. |
| DatoCMS | 8.8 | Strong editorial SaaS with modular content, structured text, links, draft/publish, and visual editing. |
| Storyblok | 8.7 | Strong visual editor and block/component model, especially if live visual editing is the primary editor preference. |
| Contentful | 8.5 | Mature enterprise CMS with content modelling, references, image API, preview API, and live preview. |
| Payload | 8.3 | Strong integrated code-first CMS/app option with Postgres, migrations, drafts, live preview, blocks, uploads, and access control. |
| Directus | 7.2 | Useful data-admin/headless option, but less obviously tailored to DFN's public editorial workflow than Sanity/Storyblok/DatoCMS. |
| Strapi | 7.0 | Credible open-source CMS with content-type builder, media, draft/publish, and preview, but adds self-hosting/ops weight. |
| Prismic | 7.0 | Good slice-based publishing model, but less compelling for operationally referenced configuration and schema depth. |
| WordPress/WooCommerce | 6.3 | Familiar publishing and commerce baseline, but rejected for TypeScript-first architecture and clean content/operational boundaries. |

Primary sources checked: [Sanity schema types](https://www.sanity.io/docs/schema-types), [Sanity arrays](https://www.sanity.io/docs/studio/array-type), [Sanity block content](https://www.sanity.io/docs/studio/block-content), [Sanity references](https://www.sanity.io/docs/studio/reference-type), [Sanity assets](https://www.sanity.io/docs/assets), [Sanity image URL](https://www.sanity.io/docs/image-url), [Sanity Presentation Tool](https://www.sanity.io/docs/configuring-the-presentation-tool), [DatoCMS modular content](https://www.datocms.com/docs/content-modelling/modular-content), [DatoCMS structured text](https://www.datocms.com/docs/content-modelling/structured-text), [DatoCMS visual editing](https://www.datocms.com/docs/visual-editing), [Storyblok blocks](https://www.storyblok.com/docs/concepts/blocks), [Storyblok references](https://www.storyblok.com/docs/concepts/references.html), [Storyblok image service](https://www.storyblok.com/docs/image-service/), [Storyblok Visual Editor](https://www.storyblok.com/docs/manuals/visual-editor/), [Contentful content modelling](https://www.contentful.com/help/content-modelling-basics/), [Contentful links](https://www.contentful.com/developers/docs/concepts/links/), [Contentful Images API](https://www.contentful.com/developers/docs/references/images-api/), [Contentful Preview API](https://www.contentful.com/developers/docs/references/content-preview-api/), [Payload admin](https://payloadcms.com/docs/admin/overview), [Payload Postgres](https://payloadcms.com/docs/database/postgres), [Payload migrations](https://payloadcms.com/docs/database/migrations), [Payload relationship fields](https://payloadcms.com/docs/fields/relationship/), [Payload blocks](https://payloadcms.com/docs/fields/blocks), [Payload uploads](https://payloadcms.com/docs/upload/overview), [Payload drafts](https://payloadcms.com/docs/versions/drafts), [Directus data model](https://docs.directus.io/app/data-model), [Directus files](https://docs.directus.io/reference/files), [Strapi content-type builder](https://docs.strapi.io/cms/features/content-type-builder), [Strapi media library](https://docs.strapi.io/cms/features/media-library), [Strapi draft and publish](https://docs.strapi.io/cms/features/draft-and-publish), [Prismic custom types](https://prismic.io/docs/custom-types), [Prismic preview](https://prismic.io/docs/preview), [WordPress block editor](https://wordpress.org/documentation/article/wordpress-block-editor/), [WooCommerce REST API](https://developer.woocommerce.com/docs/apis/rest-api/).


<!-- original-adr-001-lines: 232-264 -->

### App Framework Coverage

| Contender | Coverage note |
| --- | --- |
| TanStack Start | Missing React/TypeScript full-stack contender. It should receive light deep research because it is the closest missing alternative to Next.js and React Router. |
| Gatsby | Checked and excluded from deep research unless content-only SSG becomes the dominant requirement; operational admin, payments, auth, and webhooks make it a weaker fit. |
| Angular / Analog | Checked and excluded unless the team has a strong Angular preference; issue #17 prefers React compatibility. |
| RedwoodSDK / RedwoodJS | Checked and excluded unless the architecture moves toward a Cloudflare-first or more opinionated full-stack platform. |
| Qwik City / SolidStart / Fresh | Safe to exclude from deep research because they have smaller hiring and integration surfaces than the already-covered boring-modern options. |

### Hosting and Runtime Coverage

| Contender | Coverage note |
| --- | --- |
| AWS Amplify Hosting | Missing major managed frontend platform. Should be checked for Git previews, CDN, SSR framework support, and operational burden. |
| Firebase App Hosting / Firebase Hosting | Missing major Google-managed option that spans hosting, auth, database, and analytics. Should be researched if Firebase remains a serious platform alternative. |
| Azure Static Web Apps | Missing major managed option. Likely a shallow comparison unless DFN has Azure constraints. |
| Railway | Missing modern PaaS option that spans app hosting and Postgres, but Railway Postgres should not be treated as equivalent to fully managed database platforms without qualification. |
| Supabase Edge Functions | Not a public Next.js host, but should be acknowledged as a TypeScript backend/runtime adjunct for webhooks, integrations, email sends, or Stripe handling. |
| DigitalOcean App Platform / Fly.io / Heroku / SST OpenNext | Safe shallow exclusions unless existing provider constraints appear; they generally add more runtime/platform ownership or weaker framework-native preview and cache behaviour. |

### CMS and Editorial Coverage

| Contender | Coverage note |
| --- | --- |
| Hygraph | Missing major headless CMS SaaS. Should be added to CMS comparison against Sanity, DatoCMS, Storyblok, and Contentful. |
| Keystone | Missing TypeScript-first integrated CMS/admin/data contender. Should be compared with Payload and Directus. |
| Contentstack / Kontent.ai | Missing enterprise headless/DXP checks. Research one representative enterprise CMS enough to justify exclusion or deeper consideration. |
| Builder.io / Webflow | Checked and likely excluded because the PRDs prefer approved structured blocks over unrestricted page building and require app-owned operational workflows. |
| Drupal / Craft CMS / Umbraco Heartcore | Traditional/headless CMS baselines, but likely excluded because they pull the rebuild away from the TypeScript-first managed app direction. |
| TinaCMS / Decap CMS | Git-backed CMS checks, but likely excluded for staff-managed campaigns, events, giving configuration, and media-heavy editorial work. |
| Raisely / Givebutter / Funraise | Treat as cross-category fundraising/event platforms with campaign-page capabilities, not general editorial CMS replacements. |


# Consistent public links

Investigated on 2026-09-13 in an isolated checkout, initially at main `86c9d27`, then refreshed to `d72497f` after TypeGen PR #48 merged. The visitor behavior below was approved and implemented. Broader analytics remains a proposal pending dashboard access.

## Visitor behavior

Visitors choose whether to open a new tab using their browser. Public links no longer force one, and the shared interface has no new-tab option.

| Destination | Behavior |
| --- | --- |
| Page on the current origin | Next navigation for public routes this app owns; same tab by default |
| Another DFN Country Site or a third-party website | Native anchor; same tab by default |
| Same-document fragment | Native anchor jump |
| Email or phone | Normal browser/OS handling |
| Download, admin, API, file or deeper legacy route | Native document navigation |
| Missing/unsafe URL | Preserve existing missing-value fallbacks; unsafe/invalid URLs are not navigable |

The [shared SiteLink](../../apps/web/src/components/site/site-link.tsx) owns rendering and URL settings. Header, footer, rich-text and styled wrappers use it. Its interface accepts `href`, normal anchor attributes/handlers/ref, optional `navigation="document"`, and navigation-only current-page settings. It leaves modifier clicks, keyboard activation and context-menu choices to Next/the browser. No custom `window.open`, navigation delay or click-time URL rewriting is used. [Next Link reference](https://nextjs.org/docs/app/api-reference/components/link), [Next navigation guide](https://nextjs.org/docs/app/getting-started/linking-and-navigating).

The [resolver](../../apps/web/src/components/site/link-destination.ts) compares resolved HTTP(S) origins, including scheme and effective port. AU→NZ is outbound; an absolute same-origin URL is internal. Relative and protocol-relative links resolve against the actual browser document URL. Preview→production is outbound. Classification never substitutes one Country Site for another or removes the authored origin. [WHATWG origin model](https://url.spec.whatwg.org/#origin).

During SSR, root-relative public pages can use Next immediately. Origin-dependent links remain native until browser context is available, using a matching initial hydration snapshot. This avoids hardcoding AU or introducing dynamic host reads solely for link behavior. Current app-owned page paths are `/` and single-segment public slugs; resources and other routes stay native. `navigation="document"` is available for explicit legacy destinations.

The [palette helper](../../apps/web/src/components/homepage/navigation.ts) carries only `variant` and `clean` on internal page navigation. Non-charcoal palette overwrites destination `variant`; hidden controls set `clean=1`. Charcoal/visible controls preserve destination-authored settings, matching previous precedence. Unrelated query encoding/order, authored URL form and fragments survive. Local anchors, non-web links, resources and outbound links get no added settings. The palette Hide control remains an explicit setting action.

Header/footer homepage anchors still point home from content pages, except local `#dh-contact`. Grouped navigation order, disclosure controls and drawer-close behavior remain intact. The unconditional ↗ was changed to →. Current-page matching is shared and excludes fragments/outbound destinations. Palette state now follows Next's URL state, and content pageview trackers remount when the slug changes so client transitions retain a named pageview for each page visit.

## Analytics boundary

Current `PageBody` treats lowercase absolute HTTP(S) links as eligible for `external_link_clicked`, with the authored destination in **`href`**. This includes absolute same-origin URLs and excludes protocol-relative URLs. That legacy eligibility is deliberately retained. `ExternalLink` uses SiteLink and composes caller handlers, respecting cancellation, but remains the only named click emitter. Other wrappers do not gain this event yet. Existing referrer-policy attributes are retained.

The browser SDK uses dated defaults `2026-01-30`, conditionally initializes with `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`, and proxies through `/ingest` to EU PostHog. Autocapture can independently record clicks; absence of the named event does not mean absence of tracking. Its live project configuration was not verified. [Capture-events documentation](https://posthog.com/docs/product-analytics/capture-events), [autocapture](https://posthog.com/docs/product-analytics/autocapture), [SDK configuration](https://posthog.com/docs/libraries/js/config).

Dashboard reads were attempted: the EU browser session was signed out, and local API credentials returned HTTP 403 for missing `dashboard:read`, `insight:read` and `event_definition:read` scopes. No repository dashboard exports were found. No permissions or analytics settings were changed.

After that reporting review, the proposed contract is one `external_link_clicked` per observed, non-cancelled outbound HTTP(S) activation, across all public placements. Preserve `href`; add resolved `destination_url`, `destination_origin`, stable `placement`, optional `link_id`, source/destination Country Site and `event_version=2`. Define URL-property retention and placement values with the report migration. AU/NZ identity is separate from origin classification and must come from deployment/Country Site context rather than guesses about the visitor.

Before enabling it, inspect dashboards, saved insights, actions/HogQL and SDK capture settings for legacy event/property dependencies or combined autocapture counts. Move emission atomically to the shared module; remove the old emitter in that same change. Do not count named events and autocapture together as separate clicks. Adding placement/protocol-relative coverage and removing same-origin clicks creates a measurement break: annotate rollout and update reports. Middle-click capture, if adopted, needs an explicit auxiliary-click rule without duplicating primary/keyboard events. Context-menu navigation is not reliably observable.

Do not delay navigation for analytics. Test same-tab delivery with the real SDK/proxy in a non-production PostHog environment before changing transport. This investigation had no suitable capture environment, so delivery was not tested. An outbound click never establishes completed donation, signup or download; completion needs separate authoritative operational evidence.

## Compatibility and validation

The implementation builds on merged [PR #47](https://github.com/dfn-au/dfn-web/pull/47) (one grouped/direct navigation list) and [PR #48](https://github.com/dfn-au/dfn-web/pull/48) (generated Sanity query types and obsolete-header removal). It adds no CMS field, new-tab setting, content migration or handwritten replacement for generated types.

Validation includes lint, TypeScript, production build, TypeGen freshness and 90 tests. New checks cover URL origins/forms, palette precedence/encoding, renderer choice, refs/downloads, current-page state, cancellation, modified/keyboard clicks and exact legacy event name/properties/coverage. DOM tests mock only Next's renderer when testing selection; they do not claim to test Next's own router internals.

Local browser checks covered About→Privacy, Back, palette selection/Hide, and mobile drawer navigation home with retained palette/settings and closed drawer. Public markup contained no forced new-tab links. The shared module uses Next's native modifier handling rather than reimplementing it.

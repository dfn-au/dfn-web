# PRD: Website Content, Navigation, Trust, and Information Architecture

## Document Role

Parent programme PRD: [Parent Rebuild Scope and Launch Parity](001-overview.md)

This is a PRD/epic spec. It is not intended to be implemented directly. Use it to create focused GitHub decision issues and thin vertical implementation issues for content, trust, SEO, migration, and information architecture work.

## Problem Statement

DFN needs the rebuilt AU and NZ websites to make its work, credibility, contact details, stories, and key resources easy to find while preserving important evergreen content and trust signals.

The existing site has useful content, but its current structure should not automatically dictate the new information architecture. The rebuild needs functional requirements for content management, trust content, SEO/indexability, redirects, stories, bequests, resources, and staff preview without prematurely resolving the full IA.

## Solution

Create a content and IA foundation that supports public information pages, stories/news, trust/legal content, country-specific contact details, bequest information, downloadable resources, SEO metadata, redirects, and staff draft/publish/preview workflows.

Content may be shared across `dfn.org.au` and `dfn.org.nz` when it is genuinely the same. Content that belongs to one site must not appear on the other unless staff intentionally publishes it there.

This PRD records current functional requirements while leaving final navigation and evergreen content inventory for a later deep dive.

## User Stories

1. As a first-time visitor, I want to understand who DFN is and what it does, so that I can decide whether to trust and support the organisation.
2. As a donor, I want to see trust signals near giving decisions, so that I understand legitimacy, tax deductibility, and contact options before giving.
3. As an Australian visitor, I want Australian contact and giving information to be visible where relevant, so that I can use the correct local details.
4. As a New Zealand visitor, I want New Zealand contact and giving information to be visible where relevant, so that I can use the correct local details.
5. As a visitor, I want to find privacy, ethical fundraising, FAQs, and charity registration information, so that I can evaluate DFN's governance and policies.
6. As a visitor, I want to read stories and updates, so that I can understand DFN's impact.
7. As a donor considering bequests, I want clear legacy giving information, downloadable resources, external provider links, and contact prompts, so that I can explore the option privately.
8. As a visitor, I want pages to load with accurate titles, descriptions, and social preview content, so that shared links and search results make sense.
9. As a visitor arriving from an old link, I want to reach the correct new page or redirect target, so that I do not lose the information I came for.
10. As DFN staff, I want to create, edit, preview, draft, publish, and archive content, so that the site can stay current.
11. As DFN staff, I want stories to have categories or tags, so that stories can support relevant work areas, campaigns, and giving pages.
12. As DFN staff, I want sensitive stories to avoid exposing unsafe details, so that vulnerable people are protected.
13. As DFN staff, I want to choose whether content is shared across both sites or specific to Australia or New Zealand, so that public content appears only where intended.
14. As a visitor, I want pages to use the correct canonical domain and local contact/trust details, so that the site feels complete and locally correct.
15. As DFN staff, I want reusable impact facts and figures, so that important statistics can stay consistent across pages without repeated manual edits.

## Implementation Decisions

- Combine content, navigation, trust, legal, footer, contact, and bequest content into one PRD unless later complexity requires separation.
- Australia and New Zealand are separate public domains: `dfn.org.au` and `dfn.org.nz`.
- Show only the current country's office details in the footer and local contact content, with an obvious way to switch to the other site. Donation journeys, events and EOFY content stay country-specific. This follows [the 15 October decision #68](https://github.com/dfn-au/dfn-web/issues/68).
- Shared stories, impact content and campaigns can be published to both sites; Christmas was confirmed as a shared-content example. Shared copy does not combine payment accounts or fundraising totals.
- The final country label, flag use and logo treatment remain part of [design review #7](https://github.com/dfn-au/dfn-web/issues/7). A browser domain alone does not provide the agreed switching control.
- Andrew proposes the content hierarchy for stakeholder feedback. Follow the existing brand guidelines and replace old school-uniform photography with approved new-uniform photos, as recorded in [#7](https://github.com/dfn-au/dfn-web/issues/7). The transcript does not approve the experimental dark design or photo overlay.
- Staff should be able to publish shared content to both sites in one action where the public item is genuinely the same.
- Content must support publishing scope: Australia only, New Zealand only, or both.
- [ADR 004](../../adr/004-country-site-publishing.md) defines shared documents with optional explicit AU/NZ content differences, country-specific sections, Studio previews, reference safeguards, and v1 deferrals. Different wording does not require separate documents.
- Site-specific content should return a 404 on the other domain unless an explicit redirect exists.
- Bequests are content/trust requirements for launch, not a normal donation checkout workflow.
- Preserve the current bequest journey: explanation, booklets/resources, Safewill link, memorial giving CTA, and contact prompts.
- General contact can remain email, phone, postal address, and physical address where applicable.
- Contact information should be country-specific for Australia and New Zealand.
- Trust content should include charity registration, tax deductibility, ethical fundraising standards, privacy policy, FAQs, and visible contact details.
- Trust content should appear near donation, sponsorship, and event payment decisions.
- Stories/news/articles are in scope.
- Stories should support staff-defined categories/tags such as education, anti-trafficking, healthcare, sponsorship, events, and campaigns.
- Stories and child-sensitive content should avoid precise geography, surnames, and unnecessary trauma detail.
- Staff should be able to manage reusable impact facts and figures that can be referenced across pages.
- Reusable impact facts and figures should be editorial content, not automatically generated infographics for launch.
- The site should be indexable by search engines. Onsite search is not required for launch.
- SEO requirements should include editable page titles, descriptions, social preview images, canonical URLs, sitemap support, and redirect management per domain. Social previews should be delivered via Open Graph meta tags (`og:title`, `og:description`, `og:image`, `og:url`) and equivalent Twitter Card tags, with per-domain URLs on `dfn.org.au` and `dfn.org.nz`.
- Shared pages use one URL path on both domains in v1, with self-canonical URLs and alternate hints where appropriate.
- New Zealand pages should not canonicalize to Australian pages, or vice versa.
- Staff should be able to manage content using draft and published states.
- Staff live preview is strongly desired.
- Migrate live/evergreen content and active campaigns before launch, with inventory and redirect decisions recorded per domain.

## Testing Decisions

- Test public content pages by verifying navigation, country identification/switching, local-only office details, trust links, bequest resources and story listing/detail pages on both domains. Switching must not offer a missing counterpart as a working page; review its destination behaviour with navigation in [#7](https://github.com/dfn-au/dfn-web/issues/7).
- Test SEO/indexability behaviour through page metadata (including Open Graph and Twitter Card tags), sitemap availability, self-canonical URLs, alternate hints where applicable, and redirect outcomes per domain.
- Test staff content workflows by creating, previewing, publishing, editing, and archiving representative content.
- Test publishing scope by confirming shared content appears on both domains and site-specific content returns 404 on the other domain unless explicitly redirected.
- Test sensitive content expectations by checking that profile/story fields support approved limited information and do not require precise geography or surnames.
- Test reusable impact facts and figures by updating one managed value and confirming the approved references render consistently.
- Test migration by comparing against the approved evergreen content list and redirect map once those are defined.

## Out of Scope

- Final information architecture and navigation labels.
- Final evergreen content inventory.
- Onsite content search.
- Complex editorial approval workflow beyond draft and published.
- Detailed staff permissions by role.
- Bequest-specific legal advice workflows.

## Decision Issues

Current questions, outcomes and evidence live in the linked issues.

- [IA, migration inventory and visual review #7](https://github.com/dfn-au/dfn-web/issues/7).
- [Redirects and launch checks #8](https://github.com/dfn-au/dfn-web/issues/8).

## Reference URLs

- <https://dfn.org.au/>
- <https://dfn.org.au/about/>
- <https://dfn.org.au/contact/>
- <https://dfn.org.au/give/bequests/>
- <https://dfn.org.au/faqs/>
- <https://dfn.org.au/ethical-fundraising-standards/>

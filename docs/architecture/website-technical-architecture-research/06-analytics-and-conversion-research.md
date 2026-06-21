# Analytics and Conversion Research

This file contains analytics scoring, primary sources, and analytics, conversion, and consent coverage findings. No provider choice is decided by this research.

### Analytics

| Candidate | Score | Assessment |
| --- | ---: | --- |
| Plausible Cloud | 8.8 | Best default for privacy-aware public analytics, custom goals, ecommerce/revenue events, and server-side Events API. |
| PostHog Cloud | 8.2 | Strongest richer analytics alternative for funnels, product analytics, feature flags, and session replay, but needs tighter HITL decisions on privacy posture. |
| Simple Analytics | 8.0 | Strong privacy-oriented alternative with client and server-side events. |
| Matomo Cloud | 7.8 | Mature analytics suite with tracking API, but heavier than Plausible for this launch. |
| Fathom | 7.4 | Privacy-focused analytics with events and ecommerce conversions, but narrower product-analytics surface than PostHog. |
| Umami Cloud | 6.8 | Simple analytics with events and API, but less mature as the default organisational reporting path. |
| GA4/GTM/Measurement Protocol | 6.4 | Powerful and familiar, but least aligned with the privacy-minimal default and requires more consent/governance care. |

Primary sources checked: [Plausible docs](https://plausible.io/docs/), [Plausible custom event goals](https://plausible.io/docs/custom-event-goals), [Plausible Events API](https://plausible.io/docs/events-api), [Plausible ecommerce revenue tracking](https://plausible.io/docs/ecommerce-revenue-tracking), [PostHog web analytics](https://posthog.com/docs/web-analytics), [PostHog product analytics](https://posthog.com/docs/product-analytics), [PostHog Node SDK](https://posthog.com/docs/libraries/node), [PostHog capture API](https://posthog.com/docs/api/capture), [PostHog anonymous vs identified events](https://posthog.com/docs/data/anonymous-vs-identified-events), [PostHog session replay privacy](https://posthog.com/docs/session-replay/privacy), [PostHog privacy](https://posthog.com/docs/privacy), [PostHog feature flags](https://posthog.com/docs/feature-flags), [GA4 Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4), [GTM server-side tagging](https://developers.google.com/tag-platform/tag-manager/server-side), [Google consent mode](https://developers.google.com/tag-platform/security/guides/consent), [Matomo Cloud](https://matomo.org/matomo-cloud/), [Matomo Tracking API](https://developer.matomo.org/api-reference/tracking-api), [Fathom events](https://usefathom.com/docs/events/overview), [Fathom ecommerce conversions](https://usefathom.com/docs/events/ecommerce-conversions), [Fathom API](https://usefathom.com/api), [Simple Analytics events](https://docs.simpleanalytics.com/events), [Simple Analytics server-side events](https://docs.simpleanalytics.com/events/server-side), [Umami docs](https://umami.is/docs), [Umami Cloud](https://umami.is/docs/cloud), [Umami track events](https://umami.is/docs/track-events), [Umami API](https://umami.is/docs/api).


### Analytics, Conversion, and Consent Coverage

| Contender or decision | Coverage note |
| --- | --- |
| Vercel Web Analytics / Cloudflare Web Analytics | Hosting-native analytics options should be named because Vercel and Cloudflare are already hosting contenders. |
| Mixpanel / Amplitude | Product analytics alternatives to PostHog; likely not launch defaults but should be acknowledged. |
| Segment / RudderStack / Snowplow | Event-routing/CDP options if vendor-neutral analytics means more than an app-level adapter. Likely overkill unless multi-destination routing or warehouse ownership is required. |
| Meta CAPI / Google Ads Enhanced Conversions / LinkedIn CAPI / Microsoft UET CAPI / TikTok Events API | Conditional advertising conversion APIs. Research only if paid acquisition, retargeting, or ad-platform conversion reporting is launch or near-launch scope. |
| Cookiebot / Usercentrics / OneTrust / Osano / Piwik PRO | Consent/CMP contenders. Deep research only if GA/GTM, ad pixels, or richer analytics are enabled. |
| Microsoft Clarity / Hotjar / FullStory / LogRocket | Name as session-replay/heatmap exclusions unless a separate privacy decision approves replay for sensitive donation, sponsorship, and event flows. |

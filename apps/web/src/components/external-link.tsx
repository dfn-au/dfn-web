"use client";

import posthog from "posthog-js";
import { SiteLink, type SiteLinkProps } from "./site/site-link";

// Keep the legacy rich-text-only event name, eligibility and href property
// until existing PostHog reports can be reviewed. SiteLink does not emit it.
export function ExternalLink({ href, onClick, ...props }: SiteLinkProps) {
	return (
		<SiteLink
			{...props}
			href={href}
			onClick={(event) => {
				onClick?.(event);
				if (!event.defaultPrevented)
					posthog.capture("external_link_clicked", { href });
			}}
		/>
	);
}

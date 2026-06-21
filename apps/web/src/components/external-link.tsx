"use client";

import posthog from "posthog-js";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function ExternalLink({ href, children, ...props }: Props) {
	return (
		<a
			href={href}
			onClick={() => posthog.capture("external_link_clicked", { href })}
			{...props}
		>
			{children}
		</a>
	);
}

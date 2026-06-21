"use client";

import posthog from "posthog-js";
import { useEffect } from "react";

type Props = {
	event: string;
	properties?: Record<string, string | undefined>;
};

export function PageViewTracker({ event, properties }: Props) {
	// biome-ignore lint/correctness/useExhaustiveDependencies: fires once on mount
	useEffect(() => {
		posthog.capture(event, properties);
	}, []);

	return null;
}

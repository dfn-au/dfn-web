import { PostHog } from "posthog-node";

let posthog: PostHog | undefined;

export function getPostHogServer() {
	const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
	const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

	if (!projectToken || !host) {
		return;
	}

	posthog ??= new PostHog(projectToken, {
		host,
		flushAt: 1,
		flushInterval: 0,
	});

	return posthog;
}

"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

// biome-ignore lint/suspicious/noShadowRestrictedNames: Next.js requires this export name
export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		Sentry.captureException(error);
	}, [error]);

	return (
		<main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 py-16">
			<p className="text-sm font-medium uppercase tracking-[0.16em] text-muted">
				Something went wrong
			</p>
			<h1 className="mt-4 text-3xl font-semibold text-foreground">
				We hit an unexpected error
			</h1>
			<p className="mt-5 max-w-2xl text-lg leading-8 text-subtle">
				The issue has been reported. You can try again, or go back to the home
				page.
			</p>
			<div className="mt-8 flex gap-3">
				<button
					type="button"
					onClick={() => reset()}
					className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
				>
					Try again
				</button>
				<a
					href="/"
					className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground"
				>
					Go home
				</a>
			</div>
		</main>
	);
}

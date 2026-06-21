"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import posthog from "posthog-js";
import { useEffect } from "react";
import "./globals.css";

export default function GlobalError({
	error,
}: {
	error: Error & { digest?: string };
}) {
	useEffect(() => {
		Sentry.captureException(error);
		posthog.captureException(error);
	}, [error]);

	return (
		<html lang="en" className="h-full antialiased">
			<body className="min-h-full bg-background text-foreground">
				<NextError statusCode={0} />
			</body>
		</html>
	);
}

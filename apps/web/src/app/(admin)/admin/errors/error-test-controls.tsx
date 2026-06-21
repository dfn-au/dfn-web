"use client";

import { useState } from "react";

const clientErrorMessage = "Admin test: unhandled client-side error";

export function ErrorTestControls() {
	const [serverResult, setServerResult] = useState<string>();

	function triggerClientError() {
		setTimeout(() => {
			throw new Error(clientErrorMessage);
		});
	}

	async function triggerServerError() {
		setServerResult("Sending request...");

		try {
			const response = await fetch("/admin/errors/server", {
				method: "POST",
			});

			setServerResult(
				response.ok
					? `Unexpected response: ${response.status}`
					: `Server returned ${response.status}. Check Sentry for "Admin test: unhandled server-side error".`,
			);
		} catch {
			setServerResult(
				"Request failed before a response was received. Check the server logs and Sentry.",
			);
		}
	}

	return (
		<div className="grid gap-4 sm:grid-cols-2">
			<section className="border border-border p-5">
				<p className="text-sm font-medium text-muted">Browser</p>
				<h2 className="mt-3 text-xl font-semibold text-foreground">
					Client-side error
				</h2>
				<p className="mt-3 text-sm leading-6 text-subtle">
					Throws an unhandled error in the browser. Check Sentry and PostHog for
					the error message below.
				</p>
				<code className="mt-4 block break-words text-xs text-muted">
					{clientErrorMessage}
				</code>
				<button
					type="button"
					onClick={triggerClientError}
					className="mt-6 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
				>
					Trigger client error
				</button>
			</section>

			<section className="border border-border p-5">
				<p className="text-sm font-medium text-muted">Node.js</p>
				<h2 className="mt-3 text-xl font-semibold text-foreground">
					Server-side error
				</h2>
				<p className="mt-3 text-sm leading-6 text-subtle">
					Calls a route that throws an unhandled server error. Check Sentry and
					the server logs.
				</p>
				<code className="mt-4 block break-words text-xs text-muted">
					Admin test: unhandled server-side error
				</code>
				<button
					type="button"
					onClick={triggerServerError}
					className="mt-6 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-wait disabled:opacity-60"
					disabled={serverResult === "Sending request..."}
				>
					Trigger server error
				</button>
				{serverResult ? (
					<p aria-live="polite" className="mt-4 text-sm leading-6 text-subtle">
						{serverResult}
					</p>
				) : null}
			</section>
		</div>
	);
}

"use client";

import { NextStudio } from "next-sanity/studio";
import { useEffect, useState } from "react";
import { defineConfig, StudioProvider, useClient, useWorkspace } from "sanity";
import { dataset, projectId } from "@/sanity/env";

const config = defineConfig({
	name: "admin-login",
	title: "DFN admin",
	projectId,
	dataset,
	basePath: "/admin/login",
	schema: { types: [] },
	auth: { loginMethod: "token" },
});

export default function AdminLogin({ returnTo }: { returnTo: string }) {
	return (
		<NextStudio config={config}>
			<StudioProvider config={config}>
				<CompleteLogin returnTo={returnTo} />
			</StudioProvider>
		</NextStudio>
	);
}

function CompleteLogin({ returnTo }: { returnTo: string }) {
	const client = useClient({ apiVersion: "2026-05-04" });
	const { auth } = useWorkspace();
	const token = client.config().token;
	const [message, setMessage] = useState("Signing you in…");
	const [failed, setFailed] = useState(false);
	const [attempt, setAttempt] = useState(0);

	// biome-ignore lint/correctness/useExhaustiveDependencies: attempt explicitly retries a failed session exchange.
	useEffect(() => {
		let cancelled = false;
		async function complete() {
			setFailed(false);
			setMessage("Signing you in…");
			if (!token) {
				setFailed(true);
				setMessage("Please sign out and sign in again.");
				return;
			}
			try {
				const response = await fetch("/admin/auth/session", {
					method: "POST",
					headers: { Authorization: `Bearer ${token}`, "x-dfn-admin": "1" },
					redirect: "error",
				});
				if (cancelled) return;
				if (response.ok) {
					window.location.replace(returnTo);
					return;
				}
				setMessage(
					response.status === 403
						? "Your account can access Studio, but these admin tools require the Administrator role."
						: "We couldn’t sign you in. Please try again.",
				);
			} catch {
				if (cancelled) return;
				setMessage("We couldn’t connect. Please try again.");
			}
			setFailed(true);
		}
		void complete();
		return () => {
			cancelled = true;
		};
	}, [token, returnTo, attempt]);

	async function switchAccount() {
		try {
			// Clear the application cookie too, including a previous account's session.
			const response = await fetch("/admin/auth/logout", {
				method: "POST",
				headers: { "x-dfn-admin": "1" },
			});
			if (!response.ok) throw new Error("Sign-out failed");
			await auth.logout?.();
			window.location.reload();
		} catch {
			setMessage("Couldn’t sign out. Please try again.");
		}
	}

	return (
		<main className="mx-auto max-w-xl px-6 py-16">
			<h1 className="text-3xl font-semibold">DFN admin</h1>
			<p role="status" className="mt-4">
				{message}
			</p>
			{failed && (
				<div className="mt-6 flex gap-6">
					<button
						type="button"
						onClick={() => setAttempt(attempt + 1)}
						className="underline"
					>
						Try again
					</button>
					<button type="button" onClick={switchAccount} className="underline">
						Use another account
					</button>
					<a href="/admin/studio" className="underline">
						Open Studio
					</a>
				</div>
			)}
		</main>
	);
}

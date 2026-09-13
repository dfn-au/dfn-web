"use client";

import { Button, Card, Flex, Spinner, Stack, Text } from "@sanity/ui";
import { NextStudio } from "next-sanity/studio/client-component";
import { useEffect, useState } from "react";
import { defineConfig, StudioProvider, useClient, useWorkspace } from "sanity";
import { AdminStatus } from "@/components/admin-ui";
import { signOutAdmin } from "@/lib/admin-auth-client";
import {
	ADMIN_REQUEST_HEADER,
	adminAuthMessages,
	adminSignOutError,
	SANITY_AUTH_API_VERSION,
} from "@/lib/admin-auth-shared";
import { createBoundSanityAuth } from "@/lib/sanity-auth";
import { dataset, projectId } from "@/sanity/env";

const config = defineConfig({
	name: "admin-login",
	title: "DFN admin",
	projectId,
	dataset,
	basePath: "/admin/login",
	schema: { types: [] },
	auth: createBoundSanityAuth(),
});

export default function AdminLogin({ returnTo }: { returnTo: string }) {
	return (
		<NextStudio config={config}>
			<StudioProvider config={config} scheme="dark">
				<CompleteLogin returnTo={returnTo} />
			</StudioProvider>
		</NextStudio>
	);
}

function CompleteLogin({ returnTo }: { returnTo: string }) {
	const client = useClient({ apiVersion: SANITY_AUTH_API_VERSION });
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
					headers: {
						Authorization: `Bearer ${token}`,
						[ADMIN_REQUEST_HEADER]: "1",
					},
					redirect: "error",
				});
				if (cancelled) return;
				if (response.ok) {
					window.location.replace(returnTo);
					return;
				}
				setMessage(
					response.status === 401 ||
						response.status === 403 ||
						response.status === 503
						? adminAuthMessages[response.status]
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
			await signOutAdmin();
			await auth.logout?.();
			window.location.reload();
		} catch {
			setMessage(adminSignOutError);
		}
	}

	return (
		<AdminStatus title="DFN admin">
			<Card padding={3} radius={2} tone={failed ? "caution" : "transparent"}>
				<Flex align="center" gap={3} role="status">
					{!failed && <Spinner muted />}
					<Text as="p">{message}</Text>
				</Flex>
			</Card>
			{failed && (
				<Stack gap={3}>
					<Button
						type="button"
						onClick={() => setAttempt(attempt + 1)}
						text="Try again"
						tone="primary"
					/>
					<Button
						type="button"
						onClick={switchAccount}
						text="Use another account"
						mode="ghost"
					/>
					<Button as="a" href="/admin/studio" text="Open Studio" mode="bleed" />
				</Stack>
			)}
		</AdminStatus>
	);
}

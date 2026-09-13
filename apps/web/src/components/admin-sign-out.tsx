"use client";

import { Button, Stack, Text } from "@sanity/ui";
import { useState } from "react";

export function AdminSignOut() {
	const [pending, setPending] = useState(false);
	const [error, setError] = useState(false);
	async function signOut() {
		setPending(true);
		setError(false);
		try {
			const response = await fetch("/admin/auth/logout", {
				method: "POST",
				headers: { "x-dfn-admin": "1" },
			});
			if (!response.ok) throw new Error("Sign-out failed");
			window.location.replace("/admin/login?signedOut=1");
		} catch {
			setError(true);
			setPending(false);
		}
	}
	return (
		<Stack gap={3}>
			<Button
				type="button"
				onClick={signOut}
				disabled={pending}
				loading={pending}
				mode="bleed"
				text={pending ? "Signing out…" : "Sign out"}
			/>
			{error && (
				<Text role="alert" size={1}>
					Couldn’t sign out. Please try again.
				</Text>
			)}
		</Stack>
	);
}

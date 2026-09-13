"use client";

import { Button, Stack, Text } from "@sanity/ui";
import { useState } from "react";
import { signOutAdmin } from "@/lib/admin-auth-client";
import { adminSignOutError } from "@/lib/admin-auth-shared";

export function AdminSignOut() {
	const [pending, setPending] = useState(false);
	const [error, setError] = useState(false);
	async function signOut() {
		setPending(true);
		setError(false);
		try {
			await signOutAdmin();
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
					{adminSignOutError}
				</Text>
			)}
		</Stack>
	);
}

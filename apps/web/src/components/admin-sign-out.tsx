"use client";

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
		<div>
			<button
				type="button"
				onClick={signOut}
				disabled={pending}
				className="text-sm underline disabled:opacity-50"
			>
				{pending ? "Signing out…" : "Sign out"}
			</button>
			{error && <p role="alert">Couldn’t sign out. Please try again.</p>}
		</div>
	);
}

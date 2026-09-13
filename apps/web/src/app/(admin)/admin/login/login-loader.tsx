"use client";

import dynamic from "next/dynamic";

// The provider uses browser APIs; keep it out of server rendering.
const AdminLogin = dynamic(() => import("./sanity-login"), {
	ssr: false,
	loading: () => (
		<p role="status" className="p-6">
			Loading sign-in…
		</p>
	),
});

export function AdminLoginLoader({ returnTo }: { returnTo: string }) {
	return <AdminLogin returnTo={returnTo} />;
}

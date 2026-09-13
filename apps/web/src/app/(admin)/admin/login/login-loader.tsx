"use client";

import { SanityLoader } from "@/components/sanity-loader";

const loadLogin = () => import("./sanity-login");

export function AdminLoginLoader({ returnTo }: { returnTo: string }) {
	return (
		<SanityLoader
			load={loadLogin}
			componentProps={{ returnTo }}
			loadingText="Loading sign-in…"
		/>
	);
}

"use client";

import dynamic from "next/dynamic";
import { AdminLoading } from "@/components/admin-ui";

// The provider uses browser APIs; keep it out of server rendering.
const AdminLogin = dynamic(() => import("./sanity-login"), {
	ssr: false,
	loading: () => <AdminLoading text="Loading sign-in…" />,
});

export function AdminLoginLoader({ returnTo }: { returnTo: string }) {
	return <AdminLogin returnTo={returnTo} />;
}

import { AdminSignedOut } from "@/components/admin-ui";
import { protectedAdminPaths } from "@/lib/admin-auth-shared";
import { AdminLoginLoader } from "./login-loader";

export default async function AdminLoginPage({
	searchParams,
}: {
	searchParams: Promise<{ returnTo?: string; signedOut?: string }>;
}) {
	const params = await searchParams;
	// Only the current private pages are valid destinations. No open redirects or login loops.
	const returnTo =
		protectedAdminPaths.find((path) => path === params.returnTo) ?? "/admin";
	if (params.signedOut === "1") return <AdminSignedOut />;
	return <AdminLoginLoader returnTo={returnTo} />;
}

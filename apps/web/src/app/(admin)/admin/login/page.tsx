import { AdminLoginLoader } from "./login-loader";

export default async function AdminLoginPage({
	searchParams,
}: {
	searchParams: Promise<{ returnTo?: string; signedOut?: string }>;
}) {
	const params = await searchParams;
	// Only the current private pages are valid destinations. No open redirects or login loops.
	const returnTo =
		params.returnTo === "/admin/errors" ? "/admin/errors" : "/admin";
	if (params.signedOut === "1")
		return (
			<main className="mx-auto max-w-xl px-6 py-16">
				<h1 className="text-3xl font-semibold">You’re signed out</h1>
				<a href="/admin/login" className="mt-6 inline-block underline">
					Sign in again
				</a>
			</main>
		);
	return <AdminLoginLoader returnTo={returnTo} />;
}

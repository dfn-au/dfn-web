import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { projectId } from "@/sanity/env";

// Keep this credential off public requests, including the analytics proxy.
export const adminCookie = {
	name:
		process.env.NODE_ENV === "production" ? "__Secure-dfn-admin" : "dfn-admin",
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "lax",
	path: "/admin",
	maxAge: 60 * 60 * 8,
} as const;

type AdminAccess =
	| { ok: true; userId: string }
	| { ok: false; status: 401 | 403 | 503 };

export function authError(status: 401 | 403 | 503) {
	return Response.json(
		{
			error:
				status === 401
					? "Please sign in again."
					: status === 403
						? "Administrator access is required."
						: "Sign-in is temporarily unavailable. Please try again.",
		},
		{ status, headers: { "Cache-Control": "no-store" } },
	);
}

function validToken(token: unknown): token is string {
	return (
		typeof token === "string" && /^[A-Za-z0-9._~+/-]{1,3000}={0,2}$/.test(token)
	);
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isSameOriginMutation(request: Request) {
	// Custom header + exact Origin check protect login and cookie-authenticated mutations.
	return (
		request.headers.get("origin") === new URL(request.url).origin &&
		request.headers.get("x-dfn-admin") === "1"
	);
}

export async function sanitySessionRequest(token: string, logout = false) {
	if (!/^[a-z0-9]+$/.test(projectId))
		throw new Error("Invalid Sanity project configuration");
	return fetch(
		`https://${projectId}.api.sanity.io/v2026-05-04/${logout ? "auth/logout" : "users/me"}`,
		{
			method: logout ? "POST" : "GET",
			headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
			cache: "no-store",
			redirect: "error",
			signal: AbortSignal.timeout(5000),
		},
	);
}

export async function validateAdminToken(token: unknown): Promise<AdminAccess> {
	if (!validToken(token)) return { ok: false, status: 401 };
	try {
		const response = await sanitySessionRequest(token);
		if (response.status === 401 || response.status === 403)
			return { ok: false, status: response.status };
		if (!response.ok) return { ok: false, status: 503 };
		const user: unknown = await response.json();
		if (
			!isRecord(user) ||
			typeof user.id !== "string" ||
			!user.id ||
			!Array.isArray(user.roles) ||
			!user.roles.every(
				(role) => isRecord(role) && typeof role.name === "string",
			)
		) {
			return { ok: false, status: 503 };
		}
		if (
			!user.roles.some(
				(role) => isRecord(role) && role.name === "administrator",
			)
		)
			return { ok: false, status: 403 };
		return { ok: true, userId: user.id };
	} catch {
		// Never include credential-bearing requests or upstream errors in logs.
		return { ok: false, status: 503 };
	}
}

// React cache deduplicates within a render, not between users or requests.
export const getAdminAccess = cache(async () => {
	return validateAdminToken((await cookies()).get(adminCookie.name)?.value);
});

export async function requireAdminPage(returnTo: string) {
	const access = await getAdminAccess();
	if (access.ok) return access;
	if (access.status === 503)
		throw new Error("Admin authentication is temporarily unavailable");
	redirect(`/admin/login?returnTo=${encodeURIComponent(returnTo)}`);
}

export async function requireAdminMutation(request: Request) {
	if (!isSameOriginMutation(request)) return authError(403);
	const access = await getAdminAccess();
	return access.ok ? null : authError(access.status);
}

import { cookies } from "next/headers";
import {
	adminCookie,
	authError,
	isSameOriginMutation,
	sanitySessionRequest,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
	if (!isSameOriginMutation(request)) return authError(403);
	const cookieStore = await cookies();
	const token = cookieStore.get(adminCookie.name)?.value;
	if (token) {
		try {
			const response = await sanitySessionRequest(token, true);
			// Don't claim a full sign-out if Sanity couldn't revoke the session.
			if (!response.ok && response.status !== 401) return authError(503);
		} catch {
			return authError(503);
		}
	}
	cookieStore.set({ ...adminCookie, value: "", maxAge: 0 });
	return new Response(null, {
		status: 204,
		headers: { "Cache-Control": "no-store" },
	});
}

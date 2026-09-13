import { cookies } from "next/headers";
import {
	adminCookie,
	authError,
	isSameOriginMutation,
	noContent,
	validateAdminToken,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
	if (!isSameOriginMutation(request)) return authError(403);
	const authorization = request.headers.get("authorization");
	const token = authorization?.startsWith("Bearer ")
		? authorization.slice(7)
		: undefined;
	if (!token) return authError(401);
	const access = await validateAdminToken(token);
	if (!access.ok) return authError(access.status);
	(await cookies()).set({ ...adminCookie, value: token });
	return noContent();
}

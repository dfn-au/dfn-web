import { requireAdminMutation } from "@/lib/admin-auth";

export async function POST(request: Request) {
	const denied = await requireAdminMutation(request);
	if (denied) return denied;
	throw new Error("Admin test: unhandled server-side error");
}

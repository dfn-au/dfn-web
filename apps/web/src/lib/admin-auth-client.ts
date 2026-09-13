import { ADMIN_REQUEST_HEADER, adminSignOutError } from "./admin-auth-shared";

export async function signOutAdmin() {
	const response = await fetch("/admin/auth/logout", {
		method: "POST",
		headers: { [ADMIN_REQUEST_HEADER]: "1" },
		redirect: "error",
	});
	if (!response.ok) throw new Error(adminSignOutError);
}

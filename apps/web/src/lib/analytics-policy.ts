export function isAdminPath(path: string) {
	try {
		const pathname = decodeURIComponent(path.split(/[?#]/, 1)[0]);
		return pathname === "/admin" || pathname.startsWith("/admin/");
	} catch {
		// Skip analytics when a malformed path cannot be classified safely.
		return true;
	}
}

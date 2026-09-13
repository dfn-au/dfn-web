export const ADMIN_REQUEST_HEADER = "x-dfn-admin";

// Match the API version used by Studio's own current-user authentication probe.
export const SANITY_AUTH_API_VERSION = "2026-05-04";

export const protectedAdminPaths = ["/admin", "/admin/errors"] as const;
export type ProtectedAdminPath = (typeof protectedAdminPaths)[number];

export const adminAuthMessages = {
	401: "Please sign in again.",
	403: "Administrator access is required.",
	503: "Sign-in is temporarily unavailable. Please try again.",
} as const;

export const adminSignOutError = "Couldn’t sign out. Please try again.";

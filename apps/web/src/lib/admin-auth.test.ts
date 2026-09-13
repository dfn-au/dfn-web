import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const cookieStore = vi.hoisted(() => ({ get: vi.fn(), set: vi.fn() }));
vi.mock("server-only", () => ({}));
vi.mock("next/headers", () => ({ cookies: async () => cookieStore }));
vi.mock("next/navigation", () => ({
	redirect: (url: string) => {
		throw new Error(`REDIRECT:${url}`);
	},
}));
vi.mock("@/sanity/env", () => ({ projectId: "ourproject" }));

import { POST as logout } from "@/app/(admin)/admin/auth/logout/route";
import { POST as startSession } from "@/app/(admin)/admin/auth/session/route";
import ErrorsPage from "@/app/(admin)/admin/errors/page";
import { POST as triggerError } from "@/app/(admin)/admin/errors/server/route";
import AdminHome from "@/app/(admin)/admin/page";
import { adminCookie, validateAdminToken } from "./admin-auth";

const fetchMock = vi.fn<typeof fetch>();
const admin = { id: "user-1", roles: [{ name: "administrator" }] };

function request(path: string, extra: Record<string, string> = {}) {
	return new Request(`https://dfn.example/admin/${path}`, {
		method: "POST",
		headers: { origin: "https://dfn.example", "x-dfn-admin": "1", ...extra },
	});
}

beforeEach(() => {
	vi.clearAllMocks();
	fetchMock.mockReset();
	vi.stubGlobal("fetch", fetchMock);
	cookieStore.get.mockReturnValue(undefined);
});
afterEach(() => vi.unstubAllGlobals());

describe("Sanity admin authorization", () => {
	it.each([undefined, "", "bad token", "a\nb", "x".repeat(4000)])(
		"rejects malformed or missing credentials without contacting Sanity",
		async (token) => {
			expect(await validateAdminToken(token)).toEqual({
				ok: false,
				status: 401,
			});
			expect(fetchMock).not.toHaveBeenCalled();
		},
	);

	it("validates with the fixed project host and returns only the user ID", async () => {
		fetchMock.mockResolvedValue(
			Response.json({ ...admin, email: "private@example.com" }),
		);
		expect(await validateAdminToken("user-token")).toEqual({
			ok: true,
			userId: "user-1",
		});
		expect(fetchMock).toHaveBeenCalledWith(
			"https://ourproject.api.sanity.io/v2026-05-04/users/me",
			expect.objectContaining({
				cache: "no-store",
				redirect: "error",
				headers: {
					Authorization: "Bearer user-token",
					Accept: "application/json",
				},
			}),
		);
	});

	it.each(["editor", "developer", "viewer"])(
		"denies a %s, regardless of browser-supplied claims",
		async (role) => {
			cookieStore.get.mockReturnValue({ value: "user-token" });
			fetchMock.mockResolvedValue(
				Response.json({ id: "user-1", roles: [{ name: role }] }),
			);
			const response = await triggerError(
				request("errors/server", {
					"x-role": "administrator",
					"x-project-id": "anotherproject",
				}),
			);
			expect(response.status).toBe(403);
		},
	);

	it.each([
		null,
		{},
		{ id: "user-1" },
		{ id: "", roles: [] },
		{ id: "user-1", roles: [null] },
	])("fails closed on a malformed user response", async (body) => {
		fetchMock.mockResolvedValue(Response.json(body));
		expect(await validateAdminToken("user-token")).toEqual({
			ok: false,
			status: 503,
		});
	});

	it.each([401, 403, 404, 429, 500])(
		"denies upstream HTTP %s",
		async (status) => {
			fetchMock.mockResolvedValue(new Response(null, { status }));
			expect(await validateAdminToken("user-token")).toEqual({
				ok: false,
				status: status === 401 || status === 403 ? status : 503,
			});
		},
	);

	it("fails closed on timeouts and malformed JSON", async () => {
		fetchMock.mockRejectedValueOnce(
			new Error("timeout containing sensitive upstream details"),
		);
		expect(await validateAdminToken("user-token")).toEqual({
			ok: false,
			status: 503,
		});
		fetchMock.mockResolvedValueOnce(new Response("not json"));
		expect(await validateAdminToken("user-token")).toEqual({
			ok: false,
			status: 503,
		});
	});

	it("rechecks roles rather than accepting a previously valid session", async () => {
		cookieStore.get.mockReturnValue({ value: "user-token" });
		fetchMock
			.mockResolvedValueOnce(Response.json(admin))
			.mockResolvedValueOnce(Response.json({ id: "user-1", roles: [] }));
		await expect(triggerError(request("errors/server"))).rejects.toThrow(
			"Admin test: unhandled server-side error",
		);
		expect((await triggerError(request("errors/server"))).status).toBe(403);
	});

	it("redirects both private pages to login before rendering", async () => {
		await expect(AdminHome()).rejects.toThrow(
			"REDIRECT:/admin/login?returnTo=%2Fadmin",
		);
		await expect(ErrorsPage()).rejects.toThrow(
			"REDIRECT:/admin/login?returnTo=%2Fadmin%2Ferrors",
		);
	});

	it("does not run diagnostics without a session", async () => {
		expect((await triggerError(request("errors/server"))).status).toBe(401);
		expect(fetchMock).not.toHaveBeenCalled();
	});
});

describe("admin session lifecycle", () => {
	it.each([startSession, logout, triggerError])(
		"blocks cross-origin and form submissions before auth or cookie changes",
		async (handler) => {
			const unsafeHeaders: Record<string, string>[] = [
				{ origin: "https://attacker.example" },
				{ origin: "null" },
				{ "x-dfn-admin": "" },
			];
			for (const headers of unsafeHeaders) {
				expect((await handler(request("auth/session", headers))).status).toBe(
					403,
				);
			}
			expect(fetchMock).not.toHaveBeenCalled();
			expect(cookieStore.set).not.toHaveBeenCalled();
		},
	);

	it("sets a scoped HttpOnly cookie only after server authorization", async () => {
		fetchMock.mockResolvedValue(Response.json(admin));
		const response = await startSession(
			request("auth/session", { authorization: "Bearer user-token" }),
		);
		expect(response.status).toBe(204);
		expect(response.headers.get("cache-control")).toBe("no-store");
		expect(cookieStore.set).toHaveBeenCalledWith({
			...adminCookie,
			value: "user-token",
		});
		expect(adminCookie).toMatchObject({
			httpOnly: true,
			path: "/admin",
			sameSite: "lax",
		});
	});

	it("cannot create an admin session with an editor token", async () => {
		fetchMock.mockResolvedValue(
			Response.json({ id: "editor", roles: [{ name: "editor" }] }),
		);
		expect(
			(
				await startSession(
					request("auth/session", { authorization: "Bearer editor-token" }),
				)
			).status,
		).toBe(403);
		expect(cookieStore.set).not.toHaveBeenCalled();
	});

	it("revokes the Sanity session before clearing the cookie", async () => {
		cookieStore.get.mockReturnValue({ value: "user-token" });
		fetchMock.mockResolvedValue(new Response(null, { status: 204 }));
		expect((await logout(request("auth/logout"))).status).toBe(204);
		expect(fetchMock).toHaveBeenCalledWith(
			"https://ourproject.api.sanity.io/v2026-05-04/auth/logout",
			expect.objectContaining({ method: "POST" }),
		);
		expect(cookieStore.set).toHaveBeenCalledWith({
			...adminCookie,
			value: "",
			maxAge: 0,
		});
	});

	it("does not report successful logout when remote revocation fails", async () => {
		cookieStore.get.mockReturnValue({ value: "user-token" });
		fetchMock.mockRejectedValue(new Error("offline"));
		expect((await logout(request("auth/logout"))).status).toBe(503);
		expect(cookieStore.set).not.toHaveBeenCalled();
	});

	it("clears an already revoked session", async () => {
		cookieStore.get.mockReturnValue({ value: "user-token" });
		fetchMock.mockResolvedValue(new Response(null, { status: 401 }));
		expect((await logout(request("auth/logout"))).status).toBe(204);
		expect(cookieStore.set).toHaveBeenCalledWith({
			...adminCookie,
			value: "",
			maxAge: 0,
		});
	});
});

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const submission = {
	name: " Test Supporter ",
	email: " test@example.org ",
	token: "test-token",
};
const verified = {
	success: true,
	hostname: "dfn.org.au",
	action: "newsletter_signup",
};
const fetchMock = vi.fn<typeof fetch>();

function request(body: unknown = submission, origin = "https://dfn.org.au") {
	return new Request("https://dfn.org.au/api/newsletter", {
		method: "POST",
		headers: { "Content-Type": "application/json", origin },
		body: JSON.stringify(body),
	});
}

describe("newsletter signup", () => {
	beforeEach(() => {
		vi.stubEnv("TURNSTILE_SECRET_KEY", "test-secret");
		vi.stubGlobal("fetch", fetchMock);
		fetchMock.mockResolvedValue(Response.json(verified));
		vi.spyOn(console, "info").mockImplementation(() => {});
	});
	afterEach(() => {
		vi.restoreAllMocks();
		vi.unstubAllGlobals();
		vi.unstubAllEnvs();
		fetchMock.mockReset();
	});

	it("logs contact details only after server verification, without the secret or token", async () => {
		fetchMock.mockImplementation(async () => {
			expect(console.info).not.toHaveBeenCalled();
			return Response.json(verified);
		});
		const response = await POST(request());
		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ success: true });
		expect(fetchMock).toHaveBeenCalledWith(
			"https://challenges.cloudflare.com/turnstile/v0/siteverify",
			expect.objectContaining({
				method: "POST",
				body: JSON.stringify({ secret: "test-secret", response: "test-token" }),
			}),
		);
		expect(console.info).toHaveBeenCalledExactlyOnceWith("newsletter.signup", {
			name: "Test Supporter",
			email: "test@example.org",
			hostname: "dfn.org.au",
		});
	});

	it.each([
		null,
		{},
		{ ...submission, name: " " },
		{ ...submission, name: "x".repeat(201) },
		{ ...submission, email: "invalid" },
		{ ...submission, email: "x".repeat(255) },
		{ ...submission, token: "" },
		{ ...submission, token: "x".repeat(2049) },
		{ name: "Test", email: "test@example.org" },
	])("rejects invalid input before verification: %j", async (body) => {
		const response = await POST(request(body));
		expect(response.status).toBe(400);
		expect(await response.json()).toEqual({
			success: false,
			error: expect.any(String),
		});
		expect(fetchMock).not.toHaveBeenCalled();
		expect(console.info).not.toHaveBeenCalled();
	});

	it("rejects malformed JSON", async () => {
		const malformed = new Request("https://dfn.org.au/api/newsletter", {
			method: "POST",
			headers: { origin: "https://dfn.org.au" },
			body: "{",
		});
		expect((await POST(malformed)).status).toBe(400);
		expect(console.info).not.toHaveBeenCalled();
	});

	it("rejects submissions from another origin", async () => {
		expect(
			(await POST(request(submission, "https://other.example"))).status,
		).toBe(403);
		expect(fetchMock).not.toHaveBeenCalled();
		expect(console.info).not.toHaveBeenCalled();
	});

	it("accepts the browser's host when Next.js normalises the internal URL", async () => {
		fetchMock.mockResolvedValue(
			Response.json({ ...verified, hostname: "127.0.0.1" }),
		);
		const response = await POST(
			new Request("http://localhost:3100/api/newsletter", {
				method: "POST",
				headers: { origin: "http://127.0.0.1:3100", host: "127.0.0.1:3100" },
				body: JSON.stringify(submission),
			}),
		);
		expect(response.status).toBe(200);
		expect(console.info).toHaveBeenCalledWith("newsletter.signup", {
			name: "Test Supporter",
			email: "test@example.org",
			hostname: "127.0.0.1",
		});
	});

	it.each([
		"http://127.0.0.1:3101",
		"https://127.0.0.1:3100",
		"http://other.example:3100",
	])(
		"rejects a different browser origin %s even with a forwarded host",
		async (origin) => {
			const response = await POST(
				new Request("http://localhost:3100/api/newsletter", {
					method: "POST",
					headers: {
						origin,
						host: "127.0.0.1:3100",
						"x-forwarded-host": new URL(origin).host,
					},
					body: JSON.stringify(submission),
				}),
			);
			expect(response.status).toBe(403);
			expect(fetchMock).not.toHaveBeenCalled();
		},
	);

	it("fails closed without the Turnstile secret key", async () => {
		vi.stubEnv("TURNSTILE_SECRET_KEY", "");
		expect((await POST(request())).status).toBe(503);
		expect(fetchMock).not.toHaveBeenCalled();
		expect(console.info).not.toHaveBeenCalled();
	});

	it.each([
		{ success: false, "error-codes": ["invalid-input-response"] },
		{ success: false, "error-codes": ["timeout-or-duplicate"] },
		{ ...verified, action: "login" },
		{ ...verified, success: "true" },
		{ success: true },
		null,
	])("never logs rejected or mismatched verification: %j", async (result) => {
		fetchMock.mockResolvedValue(Response.json(result));
		expect((await POST(request())).status).toBe(403);
		expect(console.info).not.toHaveBeenCalled();
	});

	it.each(["dfn.org.nz", undefined])(
		"accepts successful newsletter verification without a local hostname policy: %s",
		async (hostname) => {
			fetchMock.mockResolvedValue(Response.json({ ...verified, hostname }));
			const nzRequest = new Request("https://dfn.org.nz/api/newsletter", {
				method: "POST",
				headers: { origin: "https://dfn.org.nz" },
				body: JSON.stringify(submission),
			});
			expect((await POST(nzRequest)).status).toBe(200);
		},
	);

	it("fails closed if Cloudflare is unavailable", async () => {
		fetchMock.mockRejectedValue(new Error("Network unavailable"));
		expect((await POST(request())).status).toBe(503);
		expect(console.info).not.toHaveBeenCalled();
	});

	it("fails closed on upstream HTTP errors", async () => {
		fetchMock.mockResolvedValue(new Response("Unavailable", { status: 503 }));
		expect((await POST(request())).status).toBe(503);
		expect(console.info).not.toHaveBeenCalled();
	});
});

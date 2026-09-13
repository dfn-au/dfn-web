const verificationError = "Verification failed. Please try again.";
const unavailableError =
	"Sign-up is temporarily unavailable. Please try again later.";

export async function POST(request: Request) {
	const requestUrl = new URL(request.url);
	// Next.js may normalise the internal URL to localhost. Host preserves the
	// browser-facing authority, including its port; do not trust forwarded-host.
	const origin = `${requestUrl.protocol}//${request.headers.get("host") ?? requestUrl.host}`;
	if (request.headers.get("origin") !== origin) {
		return Response.json({ error: verificationError }, { status: 403 });
	}

	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "Invalid submission." }, { status: 400 });
	}
	if (!body || typeof body !== "object") {
		return Response.json({ error: "Invalid submission." }, { status: 400 });
	}
	if (
		!("name" in body) ||
		typeof body.name !== "string" ||
		!body.name.trim() ||
		body.name.length > 200 ||
		!("email" in body) ||
		typeof body.email !== "string" ||
		body.email.length > 254 ||
		!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())
	) {
		return Response.json(
			{ error: "Enter your name and a valid email address." },
			{ status: 400 },
		);
	}
	if (
		!("token" in body) ||
		typeof body.token !== "string" ||
		!body.token.trim() ||
		body.token.length > 2048
	) {
		return Response.json({ error: verificationError }, { status: 400 });
	}

	const secret = process.env.TURNSTILE_SECRET_KEY;
	const hostnames = process.env.TURNSTILE_ALLOWED_HOSTNAMES?.split(",")
		.map((hostname) => hostname.trim())
		.filter(Boolean);
	if (!secret || !hostnames?.length) {
		return Response.json({ error: unavailableError }, { status: 503 });
	}

	try {
		const response = await fetch(
			"https://challenges.cloudflare.com/turnstile/v0/siteverify",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ secret, response: body.token }),
				signal: AbortSignal.timeout(10_000),
			},
		);
		if (!response.ok) {
			return Response.json({ error: unavailableError }, { status: 503 });
		}
		const verification: unknown = await response.json();
		if (
			!verification ||
			typeof verification !== "object" ||
			!("success" in verification) ||
			verification.success !== true ||
			!("action" in verification) ||
			verification.action !== "newsletter_signup" ||
			!("hostname" in verification) ||
			typeof verification.hostname !== "string" ||
			!hostnames.includes(verification.hostname)
		) {
			return Response.json({ error: verificationError }, { status: 403 });
		}
	} catch {
		return Response.json({ error: unavailableError }, { status: 503 });
	}

	// Replace this sink with the newsletter provider's double opt-in integration.
	// Intentionally logs contact details for this temporary flow, never the token.
	console.info("newsletter.signup", {
		name: body.name.trim(),
		email: body.email.trim(),
		hostname: new URL(origin).hostname,
	});
	return Response.json({ success: true });
}

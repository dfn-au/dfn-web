import { z } from "zod";
import {
	type NewsletterResponse,
	newsletterSignupSchema,
} from "@/lib/newsletter";

const verificationError = "Verification failed. Please try again.";
const unavailableError =
	"Sign-up is temporarily unavailable. Please try again later.";

const verifiedTokenSchema = z.object({
	success: z.literal(true),
	action: z.literal("newsletter_signup"),
});

function reject(error: string, status: number) {
	return Response.json({ success: false, error } satisfies NewsletterResponse, {
		status,
	});
}

export async function POST(request: Request) {
	const requestUrl = new URL(request.url);
	// Next.js may normalise the internal URL to localhost. Host preserves the
	// browser-facing authority, including its port; do not trust forwarded-host.
	const origin = `${requestUrl.protocol}//${request.headers.get("host") ?? requestUrl.host}`;
	if (request.headers.get("origin") !== origin) {
		return reject(verificationError, 403);
	}

	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return reject("Invalid submission.", 400);
	}
	const submission = newsletterSignupSchema.safeParse(body);
	if (!submission.success) {
		return reject("Invalid submission. Check your details and try again.", 400);
	}

	const secret = process.env.TURNSTILE_SECRET_KEY;
	if (!secret) {
		return reject(unavailableError, 503);
	}

	try {
		const response = await fetch(
			"https://challenges.cloudflare.com/turnstile/v0/siteverify",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ secret, response: submission.data.token }),
				signal: AbortSignal.timeout(10_000),
			},
		);
		if (!response.ok) {
			return reject(unavailableError, 503);
		}
		const verification = verifiedTokenSchema.safeParse(await response.json());
		if (!verification.success) {
			return reject(verificationError, 403);
		}
	} catch {
		return reject(unavailableError, 503);
	}

	// Replace this sink with the newsletter provider's double opt-in integration.
	// Intentionally logs contact details for this temporary flow, never the token.
	console.info("newsletter.signup", {
		name: submission.data.name,
		email: submission.data.email,
		hostname: new URL(origin).hostname,
	});
	return Response.json({ success: true } satisfies NewsletterResponse);
}

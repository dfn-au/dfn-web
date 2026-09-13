import { z } from "zod";

export const newsletterSignupSchema = z.object({
	name: z.string().max(200).trim().min(1),
	email: z.string().max(254).trim().pipe(z.email()),
	token: z.string().max(2048).trim().min(1),
});

export type NewsletterSignup = z.infer<typeof newsletterSignupSchema>;

export const newsletterResponseSchema = z.discriminatedUnion("success", [
	z.object({ success: z.literal(true) }),
	z.object({ success: z.literal(false), error: z.string() }),
]);

export type NewsletterResponse = z.infer<typeof newsletterResponseSchema>;

# Newsletter signup

The form posts to `/api/newsletter` after obtaining a Turnstile token. The endpoint
validates the name, email, token, action and allowed hostname before logging
`newsletter.signup` with the name, email and request hostname. No subscription is
created and no email is sent. Contact details are
intentionally present in server logs for this temporary integration; tokens and
secrets are never logged by the handler.

## Configuration

1. In Cloudflare **Turnstile**, create a **Managed** widget. Add each permitted
   website hostname. Use separate development/preview and production widgets.
2. Set these values in `apps/web/.env.local` and the hosting environment:
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: public site key (available at build time).
   - `TURNSTILE_SECRET_KEY`: corresponding private secret, server only.
   - `TURNSTILE_ALLOWED_HOSTNAMES`: comma-separated exact hostnames, without
     schemes or ports, matching the widget's allowed hostnames. Include
     `localhost` for a local development widget.
3. Restart development or rebuild/redeploy after changing the public key.

The frontend uses `appearance: "interaction-only"`: the widget stays hidden
unless Cloudflare requests a checkbox. Verification starts on submission.
Retries mount a fresh widget because tokens are single-use. Failed requests
preserve the entered details. Missing configuration fails closed.

## Verification

Run `pnpm test`, `pnpm lint`, `pnpm typecheck`, and `pnpm build`.
With a configured widget, submit synthetic contact details and check the server
terminal or hosting logs for `newsletter.signup`. Confirm no visible widget on
automatic verification, the checkbox when required, and a recoverable error
when verification or the submission request fails.

Cloudflare publishes [test keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/)
for passing, failing and forced-interaction checks. Use them only in isolated
local tests. Inspect the dummy validation hostname and configure the local
allowlist accordingly; keep hostname and action validation enabled. Never deploy
test keys to a public environment. Dummy Siteverify responses can contain fixed
metadata (such as `action: "test"`), which this endpoint deliberately rejects.
Use a real development widget for the complete browser-to-server success check;
the endpoint's unit tests mock Siteverify to test acceptance and rejection.

## Later provider integration

Replace the log statement in `src/app/api/newsletter/route.ts` with the provider's
double opt-in request after successful verification, and update the
acknowledgement. Add shared rate limits by IP/email and
confirmation resend suppression before enabling email delivery. These are not
implemented by this logging-only slice; Turnstile does not replace rate limiting.

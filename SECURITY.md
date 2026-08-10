# Security policy

Echo Calendar is a Cal.com/Calendly-style scheduling Cloudflare Worker (D1 + KV + service
bindings) handling calendars, booking types, guest bookings (name/email/phone), and public
ICS/cancellation links. Every `/api/*` route requires `X-Echo-API-Key` or a Bearer token,
compared to `env.ECHO_API_KEY` in constant time and **fails closed if the key is unset** (a real
bug found and fixed in this repository: the previous implementation would silently authorize any
request with no credentials at all if the secret was ever misconfigured -- `undefined ===
undefined`).

## Supported version

Security fixes target the current `main` branch and the currently deployed Worker release.
Historical commits are retained for evidence and are not patched in place.

## Report a vulnerability

Do not open a public issue for a suspected vulnerability. Send a private report to
`security@echo-op.com` with:

- affected endpoint and exact revision;
- reproduction steps and expected impact;
- whether the `X-Echo-API-Key`/Bearer authentication boundary, or guest PII (name/email/phone) in
  bookings, may be involved;
- safe contact details for follow-up.

Never include a live `ECHO_API_KEY` or real guest contact information in a report.

# Echo Calendar

AI-powered calendar and scheduling -- a Cal.com/Calendly-style Cloudflare Worker (D1 + KV +
service bindings) covering calendars, booking types, events, availability, and guest bookings
with cancellation and reschedule tokens, ICS export, and email notifications.

## Endpoints

| Access | Method | Path | Description |
|---|---|---|---|
| Public | GET | `/`, `/health` | Service info / health check |
| Public | GET | `/book/:calendarSlug/:bookingTypeSlug` | Public booking page |
| Public | GET | `/slots/:calendarSlug/:bookingTypeSlug` | Available time slots |
| Public | POST | `/book/:calendarSlug/:bookingTypeSlug` | Create a booking |
| Public | POST | `/cancel/:token` | Cancel a booking |
| Public | GET | `/ics/:id` | Download an .ics calendar file |
| Authenticated | GET/POST/PUT | `/api/calendars`, `/api/calendars/:id/availability`, event/booking-type management | Calendar/event/booking-type administration |

## Authentication

Every `/api/*` route requires `X-Echo-API-Key` or an `Authorization: Bearer` token, compared to
`env.ECHO_API_KEY` in constant time via a shared `authOk`/`timingSafeEqual` pair.
**`authOk` fails closed if `ECHO_API_KEY` is unset** -- this repository previously had a real
bug where an unset key plus a request with no credentials would be silently authorized; see
[SECURITY.md](SECURITY.md) and `tests/auth.test.mjs`'s regression test.

## Verify

```powershell
npm install
npm test
```

## Security

`/api/calendars/*` and `/api/events/*` writes use column allowlists (`CAL_ALLOWED_STR`,
`EVT_ALLOWED_STR`, etc.), not a denylist, for dynamic SQL field construction. Report
vulnerabilities per [SECURITY.md](SECURITY.md), never as a public issue.

## License

See [LICENSE](LICENSE). Contributions: see [CONTRIBUTING.md](CONTRIBUTING.md).

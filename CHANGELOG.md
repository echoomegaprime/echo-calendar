# Changelog

All notable changes to this project are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Security

- **Fixed a real authentication bypass**, not just a hardening improvement: `authOk` compared
  `(providedKey || bearerToken) === env.ECHO_API_KEY` with no guard for an unset
  `ECHO_API_KEY`. If the secret was ever misconfigured (unset), a request with **no credentials
  at all** would evaluate `undefined === undefined` and be silently authorized on every
  `/api/*` route. Fixed by adding an explicit fail-closed check (`if (!env.ECHO_API_KEY) return
  false`) before any comparison, plus rejecting an empty/missing provided credential outright.
  This is the fifth repository in this consolidation campaign with an auth timing-safety issue,
  but the first with this more serious fail-open variant.
- Replaced the (now-guarded) `===` value comparison with a constant-time `timingSafeEqual`,
  closing the timing side-channel on top of the fail-open fix.
- Untracked `.wrangler/cache/wrangler-account.json` (a local Cloudflare account-id cache file
  that had been committed despite `.wrangler/` already being in `.gitignore`).

### Added

- `package.json` and `tsconfig.json` (neither existed).
- `tests/auth.test.mjs`: 10 real unit tests, including a regression test that reproduces the
  exact fail-open scenario (no credentials + unset key) and asserts it is rejected -- verified
  locally to actually fail against the pre-fix code, confirming the test discriminates the real
  bug rather than passing regardless.
- `LICENSE`, `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`.
- Hosted CI (`.github/workflows/ci.yml`): runs `npm test` on every push and pull request.
- Issue templates (bug report, feature request) and a pull-request template.
- `.echo/{apps.json,certification.json,sdk.json}` for ECHO Certification Forge and GitHub App
  Suite enrollment. `scripts/certforge_journey.py` critical journey verified locally to fail when
  the fail-closed guard is deliberately removed, then restored.
- This CHANGELOG and a README (the repository previously had no README at all).

## [Prior history]

- Add security response headers (HSTS, X-Content-Type-Options, X-Frame-Options).
- Fix unreachable API routes -- auth section was dead code.
- Add global error handler for unhandled exceptions.
- Add public root route handler for GET /.
- Sync deployed changes (auth hardening, D1 error handling, service bindings).
- Add slog() structured logging function.
- Fix: replace SQL-injection-vulnerable denylist with an allowlist for column names.
- v1.0.0.

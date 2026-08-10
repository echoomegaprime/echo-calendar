# ECHO Repository Health Receipt

Source repository: `echoomegaprime/echo-calendar`

Source commit: `66eb973489c13aa086103738b99d550e95cf8f49`

Filed manually (2026-08-10): the same shared-framework App bug affecting other repos this
campaign (build #29466) also hit this repo's push webhook. Cert Forge certification was obtained
directly via `echo.certforge.submit` (cert_17acda006de5cb982a55f6e9e840e5161ca2651c,
PRODUCTION_READY, confirmed directly from the signed verdict payload on FORGE after
`echo.certforge.submit` recovered from a transient capability-resolution issue -- see build
#29473). This receipt reproduces the identical showroom-floor audit the App would post, verified
by direct `git ls-tree` on the exact commit.

## Showroom floor audit

- [x] `README.md`
- [x] `LICENSE`
- [x] `SECURITY.md`
- [x] `CONTRIBUTING.md`
- [x] `CODE_OF_CONDUCT.md`
- [x] `.gitignore`
- [x] `.github/workflows`

Result: **7/7 present**.

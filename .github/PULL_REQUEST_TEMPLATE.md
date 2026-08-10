## Objective

Describe the scheduling/booking behavior this change adds or fixes.

## Evidence

- Exact source revision:
- Test output (`npm test`):
- Negative paths exercised (missing/invalid key, unset ECHO_API_KEY):
- Hosted CI run:

## Security and release impact

- [ ] No secrets (`ECHO_API_KEY`) or real guest contact information are included.
- [ ] The `authOk` fail-closed guard (unset key -> always reject) is unchanged, or the change is
      called out explicitly.
- [ ] Staging-first deployment and rollback implications are documented.

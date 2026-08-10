# Contributing

Thank you for improving Echo Calendar. This is a public, proprietary infrastructure project:
contributions are welcome for review, but repository visibility does not grant a general use or
redistribution license.

## Development path

1. Open an issue describing the scheduling/booking behavior being changed.
2. Create a focused branch from current `main`.
3. Add a failing test before changing authentication -- `authOk`'s fail-closed behavior on an
   unset `ECHO_API_KEY` is covered by a regression test; do not remove it.
4. Validate before opening a pull request:

   ```powershell
   npm install
   npm test
   ```

5. Open a pull request using the repository template and include exact test output.

## Pull-request requirements

- No secrets (`ECHO_API_KEY`) or real guest contact information are included.
- No stubs, placeholders, skipped security checks, or self-asserted readiness.
- Changes to the `authOk` fail-closed guard or the authentication boundary are called out
  explicitly in the pull request description.

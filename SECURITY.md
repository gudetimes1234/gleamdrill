# Security

AlgoDrill holds accounts and study history. If you find a vulnerability, please
report it privately rather than opening an issue.

**Report:** open a [security advisory](https://github.com/gudetimes1234/gleamdrill/security/advisories/new)
on the repository. If that is unavailable to you, email the address on the
GitHub profile that owns this repository.

Please include what you did, what you expected, and what happened instead. A
proof of concept helps but is not required to file.

## Scope

In scope: the backend under `server/`, the session and account handling it
does, and anything in the app that could expose another user's data.

Out of scope, by design:

- **Drill code executes in the visitor's own browser.** The Gleam wasm
  compiler, Brython and Sucrase all run arbitrary code the visitor typed, in a
  worker, on their own machine. That is the product, not a sandbox escape.
- **The session token lives in `localStorage`.** A deliberate trade, documented
  at `src/algodrill/session.gleam`.
- **Guest progress is unencrypted in `localStorage`.** Guest mode is explicitly
  browser-local; the app says so on every screen.
- Missing rate limits anywhere other than authentication. Login and signup are
  throttled per-IP and per-email (`server/src/server/auth.gleam`).

## Supported versions

Only the currently deployed version. There are no maintained release branches.

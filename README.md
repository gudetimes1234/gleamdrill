# AlgoDrill

Spaced-repetition drilling for algorithm problems, with **live in-browser
checking in three languages**: pick problems, type each solution from memory
(vim or emacs keybindings if you like), run it against real test cases, repeat.

Built in [Gleam](https://gleam.run) (JavaScript target) with
[Lustre](https://lustre.build) and a CodeMirror 6 editor. Everything runs
client-side on a static site:

- **Gleam** drills compile with the official Gleam compiler (wasm) in a worker
- **Python** drills run under Brython in a worker
- **TypeScript** drills transpile with Sucrase and execute in a worker

## Content

| Category | Language | Drills | Runnable tests |
|---|---|---|---|
| NeetCode 150 | Python | 21 | yes |
| NeetCode 150 (Gleam) | Gleam | 21 | yes |
| NeetCode 150 (TypeScript) | TypeScript | 6 | yes |
| Python Tips / Idioms | Python | 8 | yes |
| Gleam Tips / Idioms | Gleam | 10 | yes |

Every drill carries a required signature, a starter stub, a collapsed
**Approach** write-up ("this is a sliding-window problem…"), one or more
reference **solutions** (alternate approaches where they genuinely differ,
e.g. hash map vs brute force), and a test harness with per-case
expected-vs-actual results. Compile errors underline the offending line;
runaway code is terminated by a timeout.

## Layout

```
src/                    the Lustre app; worker.gleam / py_worker.gleam /
                        ts_worker.gleam run in the per-language workers;
                        *_ffi.mjs files are the thin JS platform boundary
drills/                 a Gleam project: reference solutions + harnesses for
                        all three languages, plus the build tooling
                        (gleam run -m generate | bundle_stdlib | solutions)
assets/gleam-runtime/   vendored wasm compiler + stdlib   (make vendor)
assets/python-runtime/  vendored Brython                  (make vendor)
dist/                   committed build output — what Vercel serves
```

Drill content is data: each drill is a real, runnable source file in
`drills/{src,python/solutions,ts/solutions}` plus a harness next to it;
`gleam run -m generate` embeds them into the app and derives signatures and
starter stubs. Alternates live as `<module>__<variant>` files. Every solution
— primaries and alternates — is verified against its harness natively
(`gleam run -m solutions`, CPython, bun) and through the real browser workers.

## Develop / ship

```sh
make dev      # vendor + generate + worker bundles + dev server
make build    # minified bundle -> dist/
make deploy   # build + vercel deploy --prod
```

Runtimes are version-stamped and lazy: nothing language-specific downloads
until a drill of that language opens.

## State

Selection, per-problem drafts, pass/fail badges, keymap choice and drill
position persist in localStorage under `algoDrillState.v3` (older versions
migrate automatically).

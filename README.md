# AlgoDrill

Spaced-repetition drilling for algorithm problems, with **live in-browser Gleam
compilation**: pick problems, type each solution from memory, run it against
real test cases, repeat.

Built in [Gleam](https://gleam.run) (JavaScript target) with
[Lustre](https://lustre.build) and a CodeMirror 6 editor. The Gleam compiler
itself runs in the page — the official wasm build, driven from a web worker the
way tour.gleam.run does it. Ships as a static site.

## Content

| Category | Solutions in | Drills | Runnable tests |
|---|---|---|---|
| NeetCode 150 | Python | 21 | — |
| NeetCode 150 (Gleam) | Gleam | 21 | yes |
| Python Tips / Idioms | Python | 8 | — |
| Gleam Tips / Idioms | Gleam | 10 | yes |

Every Gleam drill carries a required signature, an editor starter stub, and a
test harness. Solutions compile in a worker (~100 ms warm), execute against the
harness, and report per-case pass/fail with expected-vs-actual diffs. Compile
errors underline the offending line in the editor; runaway recursion is
terminated by a timeout.

## Layout

```
src/                    the Lustre app (worker.gleam runs in the web worker;
                        *_ffi.mjs files are the thin JS platform boundary)
drills/                 a Gleam project: the 31 reference solutions (compiled
                        and sample-tested), their test harnesses, and the
                        build tooling (gleam run -m generate | bundle_stdlib)
assets/gleam-runtime/   vendored wasm compiler + stdlib (make vendor)
dist/                   committed build output — what Vercel serves
```

Drill content is data: `drills/src/<module>.gleam` (the reference solution) +
`drills/harnesses/<module>.gleam` (its checks) are embedded into the app by
`gleam run -m generate`, which also derives the signature and starter stub.
`gleam run -m solutions` (in `drills/`) asserts every reference solution against
sample inputs.

## Develop

```sh
make dev      # vendor + generate + worker bundle + dev server
```

## Build & deploy

```sh
make build    # minified bundle -> dist/
make deploy   # build + vercel deploy --prod
```

`dist/` is committed so Vercel needs no toolchain. The wasm runtime (4.7 MB) is
version-stamped under `/gleam-runtime/<version>/` and loads lazily — only when a
Gleam drill opens.

## State

Selection, per-problem drafts, pass/fail badges and drill position persist in
localStorage under `algoDrillState.v3`; older `v2`/`v1` state migrates
automatically.

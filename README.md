# AlgoDrill

Spaced-repetition drilling for algorithm problems. Pick problems, set a
repetition count, then loop: read the prompt, type your solution from memory,
reveal the reference answer, move on.

Built in [Gleam](https://gleam.run) (JavaScript target) with
[Lustre](https://lustre.build). Ships as a static site.

## Content

| Category | Solutions in | Drills |
|---|---|---|
| NeetCode 150 | Python | 21 |
| NeetCode 150 (Gleam) | Gleam | 21 |
| Python Tips / Idioms | Python | 8 |
| Gleam Tips / Idioms | Gleam | 10 |

Drills live in `src/algodrill/problems/*.gleam` as plain data — add a
`Problem(title:, prompt:, solution:, language:)` to a category module and
rebuild. Every Gleam solution compiles and passes sample-input checks.

## Develop

```sh
gleam run -m lustre/dev start   # dev server with hot reload
```

## Build & deploy

```sh
gleam run -m lustre/dev build   # minified bundle -> dist/
vercel deploy dist --prod       # or push with dist/ committed; outputDirectory is set
```

`dist/` is committed so Vercel needs no Gleam toolchain.

## State

Selection and drill position persist in localStorage under `algoDrillState.v2`.
State written by the old vanilla-JS version (`algoDrillState`) is migrated
automatically on first load.

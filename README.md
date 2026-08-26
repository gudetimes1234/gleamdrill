# AlgoDrill

Spaced-repetition drilling for algorithm problems, with **live in-browser
checking in three languages**: pick problems, type each solution from memory
(vim or emacs keybindings if you like), run it against real test cases, repeat.

Repetitions interleave. Choosing three problems and five reps gives you five
passes over all three, not five copies of the first — so by the time a problem
comes round again you have had to actually reload it.

Built in [Gleam](https://gleam.run) (JavaScript target) with
[Lustre](https://lustre.build) and a CodeMirror 6 editor. Everything runs
client-side on a static site:

- **Gleam** drills compile with the official Gleam compiler (wasm) in a worker
- **Python** drills run under Brython in a worker
- **TypeScript** drills transpile with Sucrase and execute in a worker
- **Elixir** drills are reveal-only: no browser can compile Elixir *source*
  (Popcorn and AtomVM run precompiled BEAM bytecode), so there is nothing to
  hand a typed-in solution to. They are still verified natively in the repo, so
  the code you compare against is code that has been run.

It works on a phone: the layout collapses to one column, the side panels scroll
in place so the editor is always on the first screen, the run bar sticks to the
bottom, touch targets are sized off `(hover: none)` rather than width, and every
text control is 16px there so iOS does not zoom on focus. There is a web
manifest, so Add to Home Screen gives a chromeless standalone app. Typing code
on a touch keyboard is still typing code on a touch keyboard — there is no
on-screen editing toolbar, and the vim/emacs keymaps are desktop-only in
practice.

## Content

| Category | Language | Drills | Solutions | Runnable tests |
|---|---|---|---|---|
| NeetCode 150 | Python | 135 | 275 | yes |
| NeetCode 150 (Gleam) | Gleam | 135 | 271 | yes |
| NeetCode 150 (TypeScript) | TypeScript | 135 | 272 | yes |
| NeetCode 150 (Elixir) | Elixir | 135 | 272 | no — reveal-only |
| Python Tips / Idioms | Python | 8 | 16 | yes |
| Gleam Tips / Idioms | Gleam | 10 | 20 | yes |

Seventeen NeetCode categories are complete — Arrays & Hashing, Two Pointers,
Sliding Window, Stack, Binary Search, Intervals, Greedy, Bit Manipulation, Math &
Geometry, 1-D Dynamic Programming, Heap / Priority Queue, Backtracking, 2-D
Dynamic Programming, Tries, Graphs, Advanced Graphs and Linked List. Trees lands
category by category;
`src/algodrill/problems/catalog.gleam` is the one ordered listing, and every
language builds its view of it.

Every drill carries a required signature, a starter stub, a collapsed
**Approach** write-up ("this is a sliding-window problem…"), at least two
reference **solutions**, and a test harness with per-case expected-vs-actual
results. Compile errors underline the offending line; runaway code is
terminated by a timeout. Anything your code prints is captured and shown under
**Output** — on a pass, on a failure, and on a crash, since printing and then
crashing is when you most want to read it.

Each solution carries its own note explaining that particular approach. The
notes live in `drills/notes/<variant>.txt`, one file per variant rather than one
comment per language, so the Gleam, Python, TypeScript and Elixir mirrors of a
solution share a single write-up. A note starting with `@shared/<name>` pulls in
`drills/notes/shared/<name>.txt` first — the two-pointer convergence, the case
for keeping a brute force around — and then adds its own line, so the technique
is written once and the specifics stay per variant.

The alternates are the point of having more than one: they are chosen to reach
for a *different* technique rather than reword the same one — sorting instead
of a set, two pointers instead of a hash map, fixed count arrays instead of a
frequency dictionary, brute force where it is the honest baseline the clever
version has to beat.

## Layout

```
src/                    the Lustre app; worker.gleam / py_worker.gleam /
                        ts_worker.gleam run in the per-language workers;
                        *_ffi.mjs files are the thin JS platform boundary
drills/                 a Gleam project: reference solutions + harnesses for
                        all four languages, plus the build tooling
                        (gleam run -m generate | bundle_stdlib | solutions)
assets/gleam-runtime/   vendored wasm compiler + stdlib   (make vendor)
assets/python-runtime/  vendored Brython                  (make vendor)
dist/                   committed build output — what Vercel serves
```

Drill content is data: each drill is a real, runnable source file in
`drills/{src,python/solutions,ts/solutions,elixir/solutions}` plus a harness
next to it; `gleam run -m generate` embeds them into the app and derives
signatures and starter stubs. Alternates live as `<module>__<variant>` files,
and are labelled from the filename — adding one is a new file and nothing else.

Every solution — primaries and alternates, all four languages — is verified
against its harness natively by `make verify`. Gleam's checks are hand-written
and typed (`drills/src/solutions.gleam`); the Python, TypeScript and Elixir
verifiers are *generated*, so the list of variants they run can never drift
from the list the app embeds. They need `python3`, `bun` and `elixir` on PATH.

## Develop / ship

```sh
make dev      # vendor + generate + worker bundles + dev server
make verify   # every solution variant against its harness, all three languages
make build    # minified bundle -> dist/
make deploy   # build + vercel deploy --prod
```

Runtimes are version-stamped and lazy: nothing language-specific downloads
until a drill of that language opens.

## State

Selection, per-problem drafts, pass/fail badges, keymap choice and drill
position persist in localStorage under `algoDrillState.v3` (older versions
migrate automatically).

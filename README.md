# AlgoDrill

Spaced-repetition drilling for algorithm problems, with **live in-browser
checking in three languages**: drill what the scheduler says is due, type each
solution from memory (vim or emacs keybindings if you like), run it against
real test cases, grade yourself.

**No account needed to start.** Open it and you are studying, with the full
scheduler running locally — an account moves that progress off this browser
and onto the server, and the app says so plainly rather than walling you out
until you sign up.

**It drives like a TUI.** Vim-style keys everywhere outside the editor —
`hjkl` panes and cursors, `space` select, `d` drill, `/` search, `1-4` to
grade (Anki's own bindings), `Ctrl+Enter` to run from inside the editor, `?`
for the cheatsheet. A tmux-style status bar shows the live bindings for
wherever you are; every hint is also clickable. One binding table drives the
dispatcher, the status bar and the help overlay, so the keys can never drift
from their own documentation. Inside the editor nothing is intercepted except
Ctrl+Enter — its vim and emacs keymaps keep the keyboard.

**Grading is free the first time, honest after.** The first encounter of a
problem shows all four grades from the moment it opens — revealing the
solution is how you learn something new, exactly like flipping a fresh Anki
card. From the second review on, a run is required, and a failed harness or a
revealed solution forces Again (enforced server-side; the log records the
truth either way). Study reps always start from the starter stub — your last
answer is never sitting in the editor.

**Progress is measured against the promise.** The stats screen leads with the
number that matters — *problems you can write from memory in under three
minutes* — with a tier breakdown, a calibration panel (for each grade you
press, how often that card's next review actually passes: Easy scoring below
Good means you are over-pressing Easy), and a per-problem review timeline
showing eleven minutes becoming 2m41s. All of it derives from the review log,
for guests too.

Scheduling is **FSRS-6** — the algorithm Anki uses by default. Every drill you
answer is recorded against your account and the scheduler decides when that
problem comes back: minutes if you failed it, months once it is solid. Grading
is half automatic and half yours: failing the test harness (or revealing a
solution) forces `Again` with no way to flatter it, and only a genuine pass
lets you choose between Hard, Good and Easy, because the harness cannot tell
fluent from ground-out.

You can still pick problems by hand. Repetitions interleave: choosing three
problems and five reps gives you five passes over all three, not five copies of
the first — so by the time a problem comes round again you have had to actually
reload it. Scheduled sittings are a single pass, since FSRS decides the spacing
rather than the sitting doing it.

Built in [Gleam](https://gleam.run) end to end: a [Lustre](https://lustre.build)
app on the JavaScript target with a CodeMirror 6 editor, a
[Wisp](https://gleam-wisp.github.io/wisp/) backend on the Erlang target, and the
scheduler shared between them as one target-agnostic package. Drill execution is
still entirely client-side:

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
| NeetCode 150 | Python | 150 | 305 | yes |
| NeetCode 150 (Gleam) | Gleam | 150 | 301 | yes |
| NeetCode 150 (TypeScript) | TypeScript | 150 | 302 | yes |
| NeetCode 150 (Elixir) | Elixir | 150 | 302 | no — reveal-only |
| Python Tips / Idioms | Python | 8 | 16 | yes |
| Gleam Tips / Idioms | Gleam | 10 | 20 | yes |

All eighteen NeetCode categories are in, in NeetCode's own order: Arrays &
Hashing, Two Pointers, Sliding Window, Stack, Binary Search, Linked List, Trees,
Tries, Heap / Priority Queue, Backtracking, Graphs, Advanced Graphs, 1-D Dynamic
Programming, 2-D Dynamic Programming, Greedy, Intervals, Math & Geometry and Bit
Manipulation. `src/algodrill/problems/catalog.gleam` is the one ordered listing —
one line per problem, not one per problem per language — and each language
builds its view of it, skipping any drill it has no source for.

Every problem carries at least two solutions taking genuinely different
approaches, each with its own write-up. Where a language cannot do a thing —
Gleam has no heap, no deque and no mutable references — the drill says so rather
than claiming a complexity it does not have, and the representation changes to
suit: linked lists are real nodes in Python and TypeScript, cons lists in Gleam
and Elixir.

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

Three Gleam projects plus the drill content:

```
src/                    the Lustre app (target: javascript); worker.gleam /
                        py_worker.gleam / ts_worker.gleam run in the
                        per-language workers; *_ffi.mjs files are the thin JS
                        platform boundary
fsrs/                   the FSRS-6 scheduler. NO target: it compiles to Erlang
                        for the server and to JavaScript for the app, from one
                        source. Pure — no I/O, no clock, no randomness
server/                 the backend (target: erlang): wisp + pog + Argon2,
                        accounts, review log, scheduling
drills/                 a Gleam project: reference solutions + harnesses for
                        all four languages, plus the build tooling
                        (gleam run -m generate | bundle_stdlib | solutions)
assets/gleam-runtime/   vendored wasm compiler + stdlib   (make vendor)
assets/python-runtime/  vendored Brython                  (make vendor)
dist/                   committed build output — what Vercel serves
```

`fsrs/` being shared is the load-bearing decision. The server schedules with it
and the app previews with it, so the interval printed on a grading button is
the interval the server will actually store. Its tests run on **both** targets
against vectors generated from the reference `py-fsrs` implementation, so a
divergence from upstream Anki fails the build rather than quietly producing
wrong review dates.

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
make dev           # vendor + generate + worker bundles + dev server
make server-dev    # the backend, reading server/.env
make verify        # every solution variant, plus the scheduler and API tests
make build         # minified bundle -> dist/
make up            # the whole stack in containers, on :8080
make deploy        # build + railway up
```

Narrower targets, for when `verify` is more than you need:

```sh
make fsrs-test     # the scheduler, on Erlang AND JavaScript
make fsrs-vectors  # regenerate its conformance vectors from py-fsrs
make app-test      # the app's decoders against captured server responses
make api-fixtures  # recapture those responses from a running backend
make server-test   # backend unit tests
make server-smoke  # the whole HTTP surface against a running backend
make e2e           # a real browser against a built app + running backend
```

`make e2e` needs chromium (set `CHROMIUM` if it is not at `/usr/bin/chromium`),
the backend on `:1637`, and `dist/` served on `:4173` (`make serve-dist` — :1234 belongs to `make dev`). It checks what only a
browser can — that the grading rule holds in the DOM, that a session survives a
reload, that a guest's card reaches the server with the same due date it had
locally, and that a full localStorage is reported rather than swallowed.

Runtimes are version-stamped and lazy: nothing language-specific downloads
until a drill of that language opens.

## Running the backend

Needs Postgres 13 or later. Copy `server/.env.example` to `server/.env`, fill it
in, then:

```sh
createdb algodrill_dev
make server-dev        # migrates at boot, then listens
make server-smoke      # 58 checks against it
```

The schema is created by migrations embedded in `server/src/server/migrations.gleam`
rather than read from `.sql` files, because a compiled OTP release ships no
source tree. They apply once each, in order, inside a transaction.

## Containers

`make up` brings up the whole stack — Caddy, the backend, Postgres — on
<http://localhost:8080>. Copy `.env.example` to `.env` and put a
`SECRET_KEY_BASE` in it first (`openssl rand -hex 48`); the server refuses to
start with anything shorter than 64 characters.

```sh
make up            # podman compose up --build
make down          # stop
make down-clean    # stop and drop the database volume
```

Docker by default, so `lazydocker` and friends can see the containers; for
rootless Podman use `make up COMPOSE="podman compose"`. Both images build from the **repository
root** — the backend needs `fsrs/` alongside `server/`, and the web image copies
the committed `dist/`. A `.dockerignore` keeps the context to the ~14M that is
actually used rather than the whole 278M tree.

**One origin, no CORS.** Caddy serves `dist/` and reverse-proxies `/api/*` to
the backend (`deploy/Caddyfile`), so the browser only ever talks to a single
host. Nothing about where the app is deployed is baked into the artifact:
`apiBase()` in `src/algodrill/ffi.mjs` defaults to the page's own origin. A
`<meta name="algodrill-api">` tag still overrides that for a split-origin
deployment, but none is set. The two development ports are the exception, and
are named explicitly: `:1234` and `:4173` always talk to `127.0.0.1:1637`, so a
dev session can never post reviews to production.

Deploying to Railway: three components in one project — Postgres, an **api**
service built from `server/Dockerfile` with no public domain, and a **web**
service built from `deploy/web.Dockerfile` with the public domain. The web
service needs `API_UPSTREAM=api.railway.internal:8080`; the api service needs
`DATABASE_URL`, `SECRET_KEY_BASE`, `ALLOWED_ORIGIN` set to the public domain,
and **`BIND=::`** rather than `0.0.0.0`, because Railway's private network is
IPv6-only. Run `make build` before `make deploy`: the web image copies `dist/`
verbatim rather than building it.

Only ever run **one** api instance. It migrates the schema at boot assuming it
is the sole writer; more than one needs a migration story first.

## State

There are **two stores, and no sync between them**.

Signed out, you are a guest: cards, drafts and statistics live in this
browser's localStorage, and the scheduler runs client-side. Signed in, all of
that lives on the server and the app is **online-only** — one `/api/state` call
at boot, blocking.

Guest and account are not two views of one store, and the migration between
them runs one way only. That is what means there is no conflict resolution
anywhere in this codebase.

What a guest gives up, and the app says so on screen rather than in a footnote:

- Clearing site data destroys it, and it does not follow you to another device.
- Scheduling trusts the **device clock** rather than a server's. Anki behaves
  the same way locally.
- On upgrading, cards and drafts carry over but statistics history does not —
  see below.

Signed in, localStorage keeps only the session token and your editor keymap.

### Upgrading

Creating an account uploads whatever this browser holds. Cards arrive with the
scheduling they actually earned — the stability, difficulty and due date are
preserved, not reseeded — because guest and account share one scheduler module
and there is nothing to translate. Signing in to an *existing* account offers
the merge rather than doing it, since folding scratch progress into an
established account unasked would be surprising. Either way the server keeps
whichever card already exists, so a retry cannot clobber real scheduling.

The one thing that does not carry over is statistics history. The `reviews`
table is the FSRS optimizer's training set and it should mean "reviews this
account recorded"; the same reasoning stops a pre-account `algoDrillState.v4`
blob being replayed as fake reviews. Card state determines all future
scheduling and it *is* preserved — the loss is a heatmap. A returning user's
old localStorage is folded into guest mode at boot, so the path is
legacy → guest → account.

The review log is append-only and card state is a fold over it: both the audit
trail and the optimizer's training data, and it leaves the door open to
local-first sync later without a migration, since an append-only log cannot
conflict.

## Support

AlgoDrill is free, open source, and has no account wall — the scheduler runs
locally whether or not you ever sign up. What money pays for is the part that
cannot be free: the server and database behind accounts and cross-device sync,
and the time it takes to keep adding problems in every language.

- [**GitHub Sponsors**](https://github.com/sponsors/gudetimes1234) — one-time or
  monthly, 0% platform fee.
- [**Liberapay**](https://liberapay.com/gudetimes1234) — recurring pledges, 0%
  platform fee, no GitHub account needed.

Not donating is completely fine. Filing a bug, fixing a test case, or adding a
problem is worth just as much.

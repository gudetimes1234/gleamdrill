# AlgoDrill

Spaced-repetition drilling for algorithm problems, with **live in-browser
checking in three languages**: drill what the scheduler says is due, type each
solution from memory (vim or emacs keybindings if you like), run it against
real test cases, grade yourself. A multiple-choice **System Design** category
— with a scored exam mode — runs on the same scheduler.

**No account needed to start.** Open it and you are studying, with the full
scheduler running locally — an account moves that progress off this browser
and onto the server, and the app says so plainly rather than walling you out
until you sign up.

**It drives like a TUI.** Vim-style keys everywhere outside the editor —
`hjkl` panes and cursors, `space` select, `d` drill, `/` search, `1-4` to
grade (Anki's own bindings), `Ctrl+Enter` to run from inside the editor, `?`
for the cheatsheet. A `,` leader re-dispatches the next key through the same
binding table when a button has stolen focus; the status bar's leader chip
lights while it is armed. A tmux-style status bar shows the live bindings for
wherever you are; every hint is also clickable. One binding table drives the
dispatcher, the status bar and the help overlay, so the keys can never drift
from their own documentation. Inside the editor nothing is intercepted except
Ctrl+Enter — its vim and emacs keymaps keep the keyboard.

**Grading is free the first time, honest after.** The first encounter of a
problem shows all four grades from the moment it opens — revealing the
solution is how you learn something new, exactly like flipping a fresh Anki
card. From the second scheduled review on, a run is required, and a failed
harness or a revealed solution forces Again (enforced server-side; the log
records the truth either way). A drill this browser cannot run — an Elixir
drill as a guest — has nothing to run, so it grades freely every time. Study reps always start from the starter stub —
your last answer is never sitting in the editor.

**Progress is measured against the promise.** The stats screen leads with the
number that matters — *problems you can write from memory in under three
minutes* — with a tier breakdown, a calibration panel (for each grade you
press, how often that card's next review actually passes: Easy scoring below
Good means you are over-pressing Easy), and a per-problem review timeline
showing eleven minutes becoming 2m41s. All of it derives from the review log,
for guests too.

**The queue says how long it will take.** "23 cards ready" is not a number
anyone can act on when a card is a problem typed from memory, so the study
screen says "about 40m" beside it — the sum of each problem's median clean
solve time, with cards you have never solved cleanly counted at eight minutes,
because those are the expensive ones and an estimate that flatters the queue
is worse than none. A collapsed preview shows exactly what *Study now* will
serve, and a sitting ends on a summary rather than an alert: each card with
the grade you pressed against the interval the scheduler actually gave it,
which are not always the same thing, since a failed run or a revealed
solution is coerced to Again server-side.

**You choose what is in the queue.** Nothing is scheduled that you did not put
there. A queue screen lists the whole catalogue with the state of every problem
— queued, new, due, paused, or not in play at all — and adds or removes them
one row or one topic at a time. Deciding for you which of twelve hundred
problems to introduce is not a decision an app is in a position to make, and
the old answer, "everything, in catalogue order", meant the only way to refuse
a problem was to answer it once and then pause it. A problem you have already
studied is paused rather than removed, because its review history is the one
thing here that cannot be rebuilt.

**You choose your languages.** The catalogue is the same 150 problems once per
language, so the first run asks which of the four to drill, nothing pre-ticked,
and new cards round-robin across whatever you chose rather than draining the
first language dry. A language that runs out drops out of the rotation
without ending it. The chips are a filter on today's sitting, not a change to
the queue: muting one parks its cards, it does not remove them. A browser that
was already using the app skips the picker.

Scheduling is **FSRS-6** — the algorithm Anki uses by default. Every drill you
answer is recorded against your account and the scheduler decides when that
problem comes back: minutes if you failed it, months once it is solid. Grading
is half automatic and half yours: in a scheduled sitting, failing the test
harness (or revealing a solution) forces `Again` with no way to flatter it,
and only a genuine pass lets you choose between Hard, Good and Easy, because
the harness cannot tell fluent from ground-out.

You can still pick problems by hand. A hand-picked sitting is **practice**:
self-graded and uncoerced — the Again-forcing above is for the scheduled queue,
where flattering yourself costs you — and the log flags it `practice` either
way. Repetitions interleave: choosing three problems and five reps gives you
five passes over all three, not five copies of the first — so by the time a
problem comes round again you have had to actually reload it. Scheduled
sittings are a single pass, since FSRS decides the spacing rather than the
sitting doing it.

The limits are yours to set. A settings screen holds new cards per day (5 by
default — deliberately low, since a card here is minutes not seconds, and a
cap nobody can reach is a decoration), reviews per day (100), the hour the
study day rolls over (4am), desired retention (0.9), and a timezone button
that adopts whatever zone the device is in, which is the case that actually
happens. Values clamp to the server's own bounds — retention 0.7 to 0.99,
rollover 0 to 23 — rather than erroring, since anything outside them is a
typo. The screen says which store each group lands in, because "kept with
your account" and "kept in this browser" is a real difference and an invisible
one. A new account is seeded from the same defaults the app uses, so a guest
studying 5 a day does not silently get 10 on signing up.

Built in [Gleam](https://gleam.run) end to end: a [Lustre](https://lustre.build)
app on the JavaScript target with a CodeMirror 6 editor, a
[Wisp](https://gleam-wisp.github.io/wisp/) backend on the Erlang target, and the
scheduler shared between them as one target-agnostic package. Drill execution is
client-side for three of the four languages:

- **Gleam** drills compile with the official Gleam compiler (wasm) in a worker
- **Python** drills run under Brython in a worker
- **TypeScript** drills transpile with Sucrase and execute in a worker
- **Elixir** drills run on the server. No browser can compile Elixir *source*
  (Popcorn and AtomVM run precompiled BEAM bytecode), so a signed-in user's
  attempt is posted to `/api/run`, where the API runs it in a fresh, short-lived
  Elixir VM as a separate unprivileged user, under `timeout -s KILL` and
  resource limits, and reports the same cases and output a worker would
  (`server/src/server/exec.gleam`, `server/priv/run.exs`). Runs are
  rate-limited per user and capped node-wide. A guest gets the reveal-only
  flashcard instead, with free grading, since the server wants a session.

It works on a phone: the layout collapses to one column, the side panels scroll
in place so the editor is always on the first screen, the run bar sticks to the
bottom, a revealed solution overlays the editor rather than pushing it away (the
same button, or `s`, puts it back so you can read, hide, type, repeat), touch
targets are sized off `(hover: none)` rather than width, and every
text control is 16px there so iOS does not zoom on focus. There is a web
manifest, so Add to Home Screen gives a chromeless standalone app. Typing code
on a touch keyboard is still typing code on a touch keyboard — there is no
on-screen editing toolbar, and the vim/emacs keymaps are desktop-only in
practice.

## Content

| Category | Language | Drills | Solutions | Runnable tests |
|---|---|---|---|---|
| NeetCode 150 | Python | 150 | 309 | yes |
| NeetCode 150 (Gleam) | Gleam | 150 | 301 | yes |
| NeetCode 150 (TypeScript) | TypeScript | 150 | 302 | yes |
| NeetCode 150 (Elixir) | Elixir | 150 | 302 | yes — on the server |
| Gleam Language Tour | Gleam | 63 | — | runs, ungraded |
| Python Tips / Idioms | Python | 8 | 16 | yes |
| Gleam Tips / Idioms | Gleam | 10 | 20 | yes |
| System Design | — (multiple choice) | 20 | — | self-grading |

All eighteen NeetCode categories are in, in NeetCode's own order: Arrays &
Hashing, Two Pointers, Sliding Window, Stack, Binary Search, Linked List, Trees,
Tries, Heap / Priority Queue, Backtracking, Graphs, Advanced Graphs, 1-D Dynamic
Programming, 2-D Dynamic Programming, Greedy, Intervals, Math & Geometry and Bit
Manipulation. `src/algodrill/problems/catalog.gleam` is the one ordered listing —
one line per problem, not one per problem per language — and each language
builds its view of it, skipping any drill it has no source for.

The **Gleam Language Tour** is [tour.gleam.run](https://tour.gleam.run) as
cards: the lesson's prose is the prompt, the editor opens on the lesson's
program, and Run shows what it prints — including the three lessons that call
JavaScript through an external. Nothing is graded by the run. A lesson is
there to be read and tried, so all four grades are on offer from the moment the
card opens, the way a reveal-only drill grades, and the scheduler spaces the
re-reading. Lessons are vendored verbatim from the tour's repository and
re-vendored with `make tour-vendor`.

Beyond code: **System Design** is a multiple-choice category drawn from
*Acing the System Design Interview* — nine sections mirroring the exam
report's scoring buckets, each question carrying an explanation and a page
reference. A quiz grades itself on submit: right is Good, wrong is Again,
recorded against the same scheduler, and there is no Hard/Easy judgement to
ask for. The **system design exam** samples forty questions — an equal slice
of each section, shuffled, so no section is double-sampled at another's
expense — and ends with the score broken down by section, so a weak total
points at a chapter to reread. Two authoring rules keep the score honest:
every distractor is something the book actually discusses (an absurd option
turns a four-way question into a two-way one), and the correct answer is
spread evenly across the four positions. Sections with no questions written
yet are dropped from the menu rather than shown as dead ends.

Every problem carries at least two solutions taking genuinely different
approaches, each with its own write-up. Where a language cannot do a thing —
Gleam has no heap, no deque and no mutable references — the drill says so rather
than claiming a complexity it does not have, and the representation changes to
suit: linked lists are real nodes in Python and TypeScript, cons lists in Gleam
and Elixir.

Every drill carries a required signature, a starter stub, a progressive
**Approach** hint ladder — a vague nudge, then the plan as numbered steps,
then language-neutral pseudocode, each revealed on demand (`a`), with the
pseudocode counting as seeing the answer — at least two reference
**solutions**, and a test harness with per-case expected-vs-actual results.
The ladders live in `drills/approaches/<slug>.txt` (sections split by
`== nudge` / `== steps` / `== pseudocode`; `MANIFEST` is the census) and are
embedded by the generator like the notes. Compile errors underline the offending line; runaway code is
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

A note can also open with directive lines, which are metadata rather than
prose: `@kind` names the technique and becomes the solution's button label
("Brute Force", "Hash Map", "Nifty Python"), `@big-o` is the complexity badge
("O(n²) time · O(1) space"), and `@order` places the variant — solutions are
shown worst runtime first, the accepted canonical version last. Unannotated
notes fall back to the old "Solution N · Variant" labels and no badge, so
annotation can land language by language. The Python catalogue is annotated;
**TODO: sweep the Gleam, TypeScript and Elixir variants** (their extra stems —
`__bucket_sort` and friends — still need directives, and each language wants
its own normalized-vs-idiomatic alternates the way Python has "Nifty Python"
variants).

The alternates are the point of having more than one: they are chosen to reach
for a *different* technique rather than reword the same one — sorting instead
of a set, two pointers instead of a hash map, fixed count arrays instead of a
frequency dictionary, brute force where it is the honest baseline the clever
version has to beat.

## Layout

Four Gleam projects plus the drill content:

```
src/                    the Lustre app (target: javascript); worker.gleam /
                        py_worker.gleam / ts_worker.gleam run in the
                        per-language workers; queue.gleam is the one place
                        the queue is built, filtered and counted; *_ffi.mjs
                        files are the thin JS platform boundary
fsrs/                   the FSRS-6 scheduler. NO target: it compiles to Erlang
                        for the server and to JavaScript for the app, from one
                        source. Pure — no I/O, no clock, no randomness
wire/                   the wire format: every payload that crosses between
                        browser and backend, encoder and decoder, plus the
                        settings defaults. Same shape as fsrs/ — no target,
                        one source, both sides
server/                 the backend (target: erlang): wisp + pog + Argon2,
                        accounts, review log, scheduling
drills/                 a Gleam project: reference solutions + harnesses for
                        all four languages, plus the build tooling
                        (gleam run -m generate | bundle_stdlib | solutions)
assets/gleam-runtime/   vendored wasm compiler + stdlib   (make vendor)
assets/python-runtime/  vendored Brython                  (make vendor)
dist/                   committed build output — what the web image serves
                        (deploy/web.Dockerfile copies it verbatim)
```

`fsrs/` being shared is the load-bearing decision. The server schedules with it
and the app previews with it, so the interval printed on a grading button is
the interval the server will actually store. Its tests run on **both** targets
against vectors generated from the reference `py-fsrs` implementation, so a
divergence from upstream Anki fails the build rather than quietly producing
wrong review dates.

`wire/` is shared for the same reason. The encoders and decoders used to be
written twice — some six hundred lines, whole bodies byte-identical — with
nothing checking they agreed except fixtures captured from a running server,
and they had drifted. Now a renamed field is a compile error on whichever side
has not caught up rather than a blank screen, and every payload round-trips
through its own encoder and decoder on both targets in `make wire-test`.
Transport stays each side's own business: HTTP clients, error types and wisp
responses do not belong in the shared package.

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
make dev           # the whole stack: frontend on :1234 + backend on :1637
make dev-app       # frontend only (guest mode works; signed-in needs the api)
make dev-api       # backend only, reading server/.env
make verify        # every solution variant, plus the scheduler and API tests
make build         # minified bundle -> dist/
make up            # the whole stack in containers, on :8080
make deploy        # build + railway up
```

Narrower targets, for when `verify` is more than you need:

```sh
make fsrs-test     # the scheduler, on Erlang AND JavaScript
make fsrs-vectors  # regenerate its conformance vectors from py-fsrs
make wire-test     # every payload round-trips, on Erlang AND JavaScript
make app-test      # the app's decoders against captured server responses
make api-fixtures  # recapture those responses from a running backend
make server-test   # backend unit tests
make server-smoke  # the whole HTTP surface against a running backend
make e2e           # a real browser against a built app + running backend
make tour          # every route and state, photographed — layout's only check
make check-versions  # the pinned Gleam/Brython/bun versions agree everywhere
make check-format    # gleam format --check across all four projects
```

`make e2e` needs chromium (set `CHROMIUM` if it is not at `/usr/bin/chromium`),
the backend on `:1637`, and `dist/` served on `:4173` (`make serve-dist` — :1234 belongs to `make dev`). It checks what only a
browser can — that the grading rule holds in the DOM, that a session survives a
reload, that a guest's card reaches the server with the same due date it had
locally, and that a full localStorage is reported rather than swallowed.

Runtimes are version-stamped and lazy: nothing language-specific downloads
until a drill of that language opens.

Bun is pinned (1.3.14) alongside Gleam and Brython because `make worker`
minifies the three worker bundles with whatever bun is on PATH, and the bytes
differ between versions — enough to make CI's "is `dist/` stale?" check fail on
minifier drift alone. `check-versions` warns when the bun on PATH disagrees
with the pin. CI also builds both container images from the repository root,
the same context Railway uses, because the Dockerfiles were the one piece of
configuration no test ever executed until a missing `COPY` failed four deploys
in a row.

## Running the backend

Needs Postgres 13 or later. Copy `server/.env.example` to `server/.env`, fill it
in, then:

```sh
createdb algodrill_dev
make dev-api           # migrates at boot, then listens (server-dev is an alias)
make server-smoke      # 99 checks against it
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
make up            # docker compose up --build (COMPOSE="podman compose" for Podman)
make down          # stop
make down-clean    # stop and drop the database volume
```

Docker by default, so `lazydocker` and friends can see the containers; for
rootless Podman use `make up COMPOSE="podman compose"`. Both images build from the **repository
root** — the backend needs `fsrs/` and `wire/` alongside `server/`, and the web image copies
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
IPv6-only. Both services deploy from the GitHub `main` branch on push;
`make deploy` (`railway up`) is the manual alternative. Either way, run
`make build` and commit `dist/` first: the web image copies it verbatim rather
than building it.

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

Signed in, localStorage keeps only the session token and your preferences —
editor keymap and which languages you chose. A guest's scheduler settings get
their own key too, encoded with the shared `wire` codec, and are cleared with
the rest on sign-up: the new account starts from the defaults, not from what
the browser held.

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

## License

[MIT](LICENSE).

The Gleam Language Tour lessons under `drills/tour/` are copied from
[gleam-lang/language-tour](https://github.com/gleam-lang/language-tour)
(Apache-2.0, © the Gleam contributors) at the commit named in
`drills/tour/UPSTREAM`; the only change made is that links open in a new tab.

The vendored runtimes under `assets/` and `dist/` are third-party and keep
their own licences: the Gleam compiler (Apache-2.0), Brython (BSD-3-Clause),
and the CodeMirror and Sucrase packages listed in `package.json` (MIT).

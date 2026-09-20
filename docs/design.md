# Design notes

The reasoning behind GleamDrill's choices, moved out of the README so the
front page can stay short. Everything here is current; it is the *why*.

## Grading is yours

**Grading is yours.** The four grades are a self-assessment of how well you
knew the problem, exactly like flipping an Anki card: the app never takes a
button away or rewrites what you pressed, whatever the harness said and even
if you looked at the solution. The first encounter grades from the moment it
opens. From the second scheduled review on, a run is required first — the
tests are feedback to grade against, not a verdict. The review log still
records every failed run and every reveal, so the stats stay honest. A drill
this browser cannot run — an Elixir or Go drill as a guest — has nothing to run, so
it grades from open every time. Every open starts from the starter stub
once the problem has been graded — grading deletes the draft, on the server
and in the browser alike, in the same transaction as the review. The only
thing that ever comes back is work you left without grading.

Scheduling is **FSRS-6** — the algorithm Anki uses by default. Every drill you
answer is recorded against your account and the scheduler decides when that
problem comes back: minutes if you failed it, months once it is solid. Grading
is yours: in a scheduled sitting you run the harness first, then press the
grade that matches how well you knew it. The harness cannot tell fluent from
ground-out, and it does not try to — a failed run and a revealed solution go
on the log for the stats, not into the schedule.

You can still pick problems by hand. A hand-picked sitting is **practice**:
it grades the same way, and the log flags it `practice` so the stats can tell
it from a scheduled review. Repetitions interleave: choosing three problems and five reps gives you
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

## Progress is measured against the promise

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
the grade you pressed against the interval the scheduler gave it.

## You choose what is in the queue

**You choose what is in the queue.** Nothing is scheduled that you did not put
there. A queue screen lists the whole catalogue with the state of every problem
— queued, new, due, paused, or not in play at all — and adds or removes them
one row or one topic at a time: the list is grouped by topic, and each
topic's header says how much of it is queued and adds or removes the topic
right there, or just its Easy problems. Every NeetCode problem carries its
LeetCode rating — Easy, Medium or Hard — as a badge wherever it is listed.
New cards are still introduced in catalogue order, which is NeetCode's topic
progression; the rating is a label, not a reordering. The starter set a first
visit is offered is the first twenty Easy problems of each chosen language. Deciding for you which of twelve hundred problems to
introduce is not a decision an app is in a position to make, and the old
answer, "everything, in catalogue order", meant the only way to refuse a
problem was to answer it once and then pause it. A problem you have already
studied is paused rather than removed, because its review history is the one
thing here that cannot be rebuilt.

**You choose your languages.** The catalogue is the same 150 problems once per
language, so the first run asks which of the four a starter set should
cover, nothing pre-ticked. After that the study queue is exactly what you
put in it -- there is no language filter on top -- and new cards round-robin
across whatever languages are queued rather than draining the first one dry.
A language that runs out drops out of the rotation without ending it. A
browser that was already using the app skips the picker.

## It drives like a TUI

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

## It works on a phone

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

Every problem carries at least two solutions taking genuinely different
approaches, each with its own write-up. Where a language cannot do a thing —
Gleam has no heap, no deque and no mutable references — the drill says so rather
than claiming a complexity it does not have, and the representation changes to
suit: linked lists are real nodes in Python, TypeScript and Go, cons lists in
Gleam and Elixir.

Every drill carries a required signature, a starter stub, a progressive
**Approach** hint ladder — a vague nudge, then the plan as a walkthrough
(`w`): one step at a time beside the editor, each with a hint that points at
it and a why that explains it, plus its slice of the pseudocode, then the
full language-neutral pseudocode. Nudge and steps unfold on demand (`a`);
only the pseudocode, whole or by slice, counts as seeing the answer — at
least two reference **solutions**, and a test harness with per-case
expected-vs-actual results. The ladders live in
`drills/approaches/<slug>.txt` (sections `== nudge` / `== walk` /
`== pseudocode`, a walk being `# step` blocks with `hint:`, `why:` and an
optional `code:` slice; `MANIFEST` is the census) and are embedded by the
generator like the notes. Compile errors underline the offending line; runaway code is
terminated by a timeout. Anything your code prints is captured and shown under
**Output** — on a pass, on a failure, and on a crash, since printing and then
crashing is when you most want to read it.

Each solution carries its own note explaining that particular approach. The
notes live in `drills/notes/<variant>.txt`, one file per variant rather than one
comment per language, so the Gleam, Python, TypeScript, Elixir and Go mirrors
of a solution share a single write-up. A note starting with `@shared/<name>`
pulls in `drills/notes/shared/<name>.txt` first — the two-pointer convergence,
the case for keeping a brute force around — and then adds its own line, so the
technique is written once and the specifics stay per variant.

Sharing by stem assumes the same stem is the same algorithm in every language,
and the file layout keeps it so: the primary file of every language is the
same technique, and alternates carry the same suffixes. Where one language
genuinely cannot follow — an LRU cache that leans on an insertion-ordered
dict has no honest Gleam, Elixir or Go twin, so their primary is the linked
list instead — a `drills/notes/<stem>.<ext>.txt` (`nc133_lru_cache.go.txt`)
speaks for that language alone and the shared note is not consulted.

A note can also open with directive lines, which are metadata rather than
prose: `@kind` names the technique and becomes the solution's button label
("Brute Force", "Hash Map", "Nifty Python"), `@big-o` is the complexity badge
("O(n²) time · O(1) space"), and `@order` places the variant — solutions are
shown worst runtime first, the accepted canonical version last. Every NeetCode
variant in every language is annotated; a note without directives falls back
to a "Solution N · Variant" label and no badge, which is how a new alternate
can land before its write-up.

The alternates are the point of having more than one: they are chosen to reach
for a *different* technique rather than reword the same one — sorting instead
of a set, two pointers instead of a hash map, fixed count arrays instead of a
frequency dictionary, brute force where it is the honest baseline the clever
version has to beat.

### The Gleam Language Tour

The **Gleam Language Tour** is [tour.gleam.run](https://tour.gleam.run),
playable from the Tour screen the way the site plays it: the lesson's prose on
the left, its program in a live editor on the right, and the output underneath
— compiled and run on every pause in typing, no button. Back, Contents and Next
walk the sixty-three lessons in order, the table of contents lists the six
chapters, and the lesson you reached is remembered on this device. Nothing in
the tour is graded or scheduled; it is a course, not a deck. The three lessons
that call JavaScript through an external run too. Lessons are vendored
verbatim from the tour's repository and re-vendored with `make tour-vendor`.

### System Design

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

## Architecture

### The shared scheduler and wire format

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

### Runtimes and pins

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

### The backend

The schema is created by migrations embedded in `server/src/server/migrations.gleam`
rather than read from `.sql` files, because a compiled OTP release ships no
source tree. They apply once each, in order, inside a transaction.

**One origin, no CORS.** Caddy serves `dist/` and reverse-proxies `/api/*` to
the backend (`deploy/Caddyfile`), so the browser only ever talks to a single
host. Nothing about where the app is deployed is baked into the artifact:
`apiBase()` in `src/gleamdrill/ffi.mjs` defaults to the page's own origin. A
`<meta name="gleamdrill-api">` tag still overrides that for a split-origin
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

The daily reminder mail is optional and off until `RESEND_API_KEY` is set
on the api (with `REMINDER_FROM` as a sender on a domain Resend has
verified, and `APP_URL` if the link should not be the first allowed
origin). With the key set, a loop wakes every fifteen minutes and mails
anyone whose chosen hour it is, in their own timezone, if they have
something due -- once per day, claimed in `reminders_sent` before sending
so a restart cannot send it twice. See `server/src/server/reminders.gleam`.

### Deployment

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

The daily reminder mail is optional and off until `RESEND_API_KEY` is set
on the api (with `REMINDER_FROM` as a sender on a domain Resend has
verified, and `APP_URL` if the link should not be the first allowed
origin). With the key set, a loop wakes every fifteen minutes and mails
anyone whose chosen hour it is, in their own timezone, if they have
something due -- once per day, claimed in `reminders_sent` before sending
so a restart cannot send it twice. See `server/src/server/reminders.gleam`.

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

<h1 align="center">GleamDrill</h1>

<p align="center">
  Spaced-repetition drilling for algorithm problems — type the solution from memory, run it against real tests, grade yourself, and let FSRS decide when it comes back.
</p>

<p align="center">
  <a href="https://gleamdrill.com"><strong>gleamdrill.com</strong></a> · no account needed
</p>

<p align="center">
  <a href="https://github.com/gudetimes1234/gleamdrill/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/gudetimes1234/gleamdrill/actions/workflows/ci.yml/badge.svg"></a>
  <a href="LICENSE"><img alt="MIT" src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
  <a href="https://gleam.run"><img alt="Built with Gleam" src="https://img.shields.io/badge/built%20with-Gleam-ffaff3.svg"></a>
  <a href="https://github.com/sponsors/gudetimes1234"><img alt="Sponsor" src="https://img.shields.io/badge/sponsor-%E2%9D%A4-ff69b4.svg"></a>
</p>

<p align="center">
  <img src="docs/screenshots/drill.png" alt="A Python drill: prompt and hint ladder on the left, the editor in the middle, your code diffed against the reference solution on the right, four cases green below" width="900">
</p>

## What it is

The NeetCode 150 as an Anki deck, in five languages. Solve each problem in a
real editor against a real test harness, grade yourself Again/Hard/Good/Easy,
and FSRS-6 schedules the next review. Gleam, Python and TypeScript run in the
browser; Elixir and Go run sandboxed on the server. Works as a guest, offline,
on a phone; an account syncs progress. Built end to end in Gleam (Lustre +
Wisp, scheduler shared between them).

## Quick start

**Use it:** <https://gleamdrill.com>.

**Run it:**

```sh
git clone https://github.com/gudetimes1234/gleamdrill.git && cd gleamdrill
cp .env.example .env            # set SECRET_KEY_BASE: openssl rand -hex 48
make run                        # docker compose up -d --build
open http://localhost:8080
```

## Content

| Deck | Drills | Runs |
|---|---|---|
| NeetCode 150 — Python, Gleam, TypeScript | 150 each, 2+ solutions per problem | browser |
| NeetCode 150 — Elixir, Go | 150 each, 2+ solutions per problem | server sandbox |
| Gleam Language Tour | 63 lessons | browser, not scheduled |
| System Design | 20 multiple-choice + exam mode | self-graded |
| System Design Board | 6 component-selection boards, 36-piece palette | auto-graded |

Every drill is a runnable file under `drills/` with its harness beside it;
`make verify` checks every solution. Authoring conventions: [docs/design.md](docs/design.md#content).

## Development

Gleam 1.18.1, Erlang/OTP 27, bun 1.3.14, Postgres 13+; `python3`, `elixir`,
`go` for the verifiers. `make check-versions` confirms pins.

```sh
make dev           # frontend :1234 + backend :1637
make build         # regenerate content, bundle workers, build dist/
make bundle        # dist/ only, no content regeneration — what the web image runs
make verify        # every solution + scheduler + app tests
make e2e           # real browser against built app + backend
make check-format  # gleam format --check, all four projects
```

Layout: `src/` Lustre app, `server/` Wisp backend, `fsrs/` and `wire/`
shared between both targets, `drills/` content. `dist/` is build output, not
committed — run `make build` once before `make e2e`, `make run` or
`make serve-dist`, which all serve it.
Why it is shaped this way, and how it deploys: [docs/design.md](docs/design.md).

### Code audit

`tools/jev_audit.py` asks [Jev](https://typesafe.ai) the same rubric about every
first-party Gleam file — duplication, complexity, error handling, naming, risk if
silently wrong — and ranks the answers. It needs `TYPESAFE_API_KEY` and network,
so it is not part of `make verify`.

```sh
tools/jev_audit.py fetch --dry-run   # what would be asked, no network
make audit                           # fetch, then the ranked list
tools/jev_audit.py explain src/gleamdrill/model.gleam
tools/jev_audit.py deep --top 10     # follow-up pass on the worst-ranked files
```

Answers are cached under `build/jev_audit/` by content hash: a re-run only pays
for files that changed, and re-weighting in `WEIGHTS` costs nothing. The output
is a ranked reading list, not a verdict — every row cites a path so it can be
checked by hand.

## Contributing

Add a solution + harness under `drills/<language>/`, a note in `drills/notes/`,
a hint ladder in `drills/approaches/`, run `make verify`, open a PR.

## Support

Free, open source, no account wall. Server costs:
[GitHub Sponsors](https://github.com/sponsors/gudetimes1234) ·
[Liberapay](https://liberapay.com/gudetimes1234).

## License

[MIT](LICENSE). Tour lessons under `drills/tour/` are Apache-2.0 from
[gleam-lang/language-tour](https://github.com/gleam-lang/language-tour);
vendored runtimes keep their own licences.

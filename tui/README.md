# GleamDrill in the terminal

The web app's drills, scheduler and tmux keys in a terminal, on your desktop or
in Termux on Android. It is a Gleam package on the JavaScript target, drawn with
[etui](https://hexdocs.pm/etui) and run by Node. It imports the web app's own
modules (catalogue, queue, guest store, wire format, tmux command language), so
the same drill is due on both and a grade means the same thing on both.

## Run it

You need Node 22 or newer and Gleam. Python drills need `python3`, Gleam drills
need `gleam`, Ruby drills need `ruby` (or sign in, and they run on the
server), and TypeScript drills need nothing more, since Node strips the types
itself. Go, Elixir and Haskell run on the server, so they need you signed in.

```sh
cd tui && gleam run      # or `make tui` from the repo root
```

On Termux:

```sh
pkg install nodejs gleam python ruby git    # and vim, if you want it over the built-in editor
git clone https://github.com/gudetimes1234/gleamdrill && cd gleamdrill/tui
gleam run
```

## Keys

The prefix is `C-a`, not tmux's `C-b`, so it works inside tmux and herdr
without the outer program taking it. After it come the web app's tmux keys:

- `C-a 0` to `C-a 6` pick a window, and `C-a n`, `C-a p` and `C-a l` move between them.
- `C-a s` picks a track, and `C-a (` and `C-a )` step through tracks.
- `C-a o`, the arrow keys, `C-a z` and `C-a q` work the drill's panes.
- `C-a :` opens the command line (`selectw -t stats`, `switchc -t neetcode-150-go`).
- `?` on its own (or `C-a ?`) shows the keys: this window's first, then the prefix's, grouped.
- A window number without the prefix says which `C-a` key to press.
- `C-a d` quits.

In a drill:

| Key | Does |
|---|---|
| `e` | Edits your code in `$VISUAL` or `$EDITOR`; with neither set, the first of nvim, vim, vi, nano, micro or hx it finds; with none of those, the built-in editor |
| `E` | Edits your code in the built-in editor, in the code pane |
| `r` | Runs the check |
| `s` | Shows the solution; again for your code |
| `[` `]` | Previous and next solution, when there are several |
| `1` to `4` | Grades the drill: again, hard, good, easy |
| `n` | Skips the drill |
| `esc` | Goes back to study; the sitting waits on window 6 |

On the study window, `↵` starts today's sitting and `m` adds 10 more new
drills past the daily limit. In browse, `a` queues one drill and `A` every
drill shown, so `/hash` then `A` queues a whole search. In settings, a guest
sets the daily limits: `n`/`N` 5 more or fewer new, `u` no limit, `r`/`R`
50 more or fewer reviews.

The queue is live: a card graded in a sitting that is due back within the
hour (again 1m, good 10m) comes back into the sitting at its time. When the
rest are done the sitting counts down to it, then opens it; `n` ends the
sitting instead. The study window redraws each minute, so what's due turns up
by itself.

In the built-in editor, keys type. The arrows, `home`, `end`, page up and
down move; `tab` and `shift+tab` indent; `ctrl+k` cuts to the end of the
line; `ctrl+r` saves and runs; `ctrl+s` saves and shows the solutions, and `s`
comes back; `esc` saves and closes. `?` types a `?` there, so the keys are
`C-a ?`. A paste goes in whole. The prefix still works there, and `C-a C-a`
is the start of the line.

`GLEAMDRILL_PREFIX` sets another prefix, e.g. `GLEAMDRILL_PREFIX=ctrl+g`.

## Where things live

| What | Where |
|---|---|
| Guest progress | `$XDG_DATA_HOME/gleamdrill/guest.json`, a web-app export (each opens in the other's import) |
| Sign-in token, last track | `$XDG_CONFIG_HOME/gleamdrill/` |
| Gleam run project | `$XDG_CACHE_HOME/gleamdrill/gleam-run` (the first run fetches the stdlib) |
| Server | `GLEAMDRILL_API`, default `https://gleamdrill.com` |

To sign in, open settings (`C-a 5`) and press `l`. New accounts are made on the
web.

## Layout

```
src/gleamdrill_tui.gleam  main: the game loop over app and view
src/gleamdrill_tui/
  runtime.gleam  a LÖVE-shaped loop on etui's terminal: load, keypressed, received, update, draw, plus effects
  app.gleam      the model, every key, tmux's commands, a sitting and grading
  view.gleam     drawing: windows, panes, overlays, the status line
  store.gleam    the guest file and the server's API
  run.gleam      the local runners (python3, Node, gleam) and /api/run
  editor.gleam   the built-in editor: lines, a cursor, auto-indent, paste
  keys.gleam     etui's key names to the browser's and back
  sys.gleam      Node: files, processes, HTTP, the clock (sys_ffi.mjs)
dev/runners_check.gleam  every reference solution and every starter through the runners
```

## Tests

- `make tui-test` runs the unit tests: keys, the prefix and command line on a model, the built-in editor, run reports, and the guest file round trip.
- `make tui-runners` runs every reference solution through the local runners, then every starter stub, which must fail. It takes a few minutes.

//// Drawing: each window, the drill's panes, the overlays and tmux's status
//// line, in the web app's Catppuccin Mocha colours.

import etui/buffer.{type Buffer}
import etui/geometry.{
  type Position, type Rect, Fill, Horizontal, Length, Percentage, Vertical,
}
import etui/style.{type Style}
import etui/text
import fsrs
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/string
import gleam/time/timestamp
import gleamdrill/content/problem
import gleamdrill/content/problems
import gleamdrill/domain/track
import gleamdrill/model as web
import gleamdrill/ui/format
import gleamdrill/ui/tmux/command
import gleamdrill/ui/tmux/prefix
import gleamdrill_tui/app.{
  type Model, type Pane, type Sitting, CodePane, OutputPane, PromptPane,
}
import gleamdrill_tui/editor.{type Editor}
import gleamdrill_tui/keys
import gleamdrill_tui/store
import gleamdrill_tui/sys
import wire.{type ProblemRef}

// --- the palette ----------------------------------------------------------------

/// The terminal's own background: it respects the user's theme, and an empty
/// cell costs nothing to draw.
const base = style.Default

const mantle = style.Rgb(0x18, 0x18, 0x25)

const surface = style.Rgb(0x31, 0x32, 0x44)

const overlay = style.Rgb(0x6c, 0x70, 0x86)

const subtext = style.Rgb(0xa6, 0xad, 0xc8)

const ink = style.Rgb(0xcd, 0xd6, 0xf4)

const mauve = style.Rgb(0xcb, 0xa6, 0xf7)

const green = style.Rgb(0xa6, 0xe3, 0xa1)

const red = style.Rgb(0xf3, 0x8b, 0xa8)

const peach = style.Rgb(0xfa, 0xb3, 0x87)

const yellow = style.Rgb(0xf9, 0xe2, 0xaf)

const blue = style.Rgb(0x89, 0xb4, 0xfa)

fn look(fg: style.Color, bg: style.Color) -> Style {
  style.new(fg, bg, style.none())
}

fn bold(fg: style.Color, bg: style.Color) -> Style {
  style.new(fg, bg, style.bold())
}

/// A paragraph of a pane, in one style. Wrapped to the pane when drawn.
type Line {
  Line(text: String, look: Style)
}

fn plain(text: String) -> Line {
  Line(text, look(ink, base))
}

fn dim(text: String) -> Line {
  Line(text, look(overlay, base))
}

fn coloured(text: String, colour: style.Color) -> Line {
  Line(text, look(colour, base))
}

// --- primitives -----------------------------------------------------------------

/// `love.graphics.print`, clipped to `width` cells.
fn print(
  buf: Buffer,
  x: Int,
  y: Int,
  width: Int,
  s: String,
  st: Style,
) -> Buffer {
  case width <= 0 {
    True -> buf
    False -> buffer.set_string(buf, geometry.Position(x, y), clip(s, width), st)
  }
}

/// `text.truncate`, without segmenting graphemes when the text is ASCII:
/// segmenting is most of a frame's cost, and nearly all text here is ASCII.
fn clip(s: String, width: Int) -> String {
  case is_ascii(s) {
    True ->
      case string.byte_size(s) > width {
        True -> string.slice(s, 0, width - 1) <> "…"
        False -> s
      }
    False -> text.truncate(s, width, "…")
  }
}

@external(javascript, "./sys_ffi.mjs", "isAscii")
fn is_ascii(s: String) -> Bool

fn width_of(s: String) -> Int {
  case is_ascii(s) {
    True -> string.byte_size(s)
    False -> text.cell_width(s)
  }
}

fn fill(buf: Buffer, area: Rect) -> Buffer {
  buffer.clear(buf, area)
}

/// Paragraphs wrapped to the width of `area`, from wrapped row `offset`.
fn wrapped(content: List(Line), width: Int) -> List(Line) {
  use line <- list.flat_map(content)
  use row <- list.flat_map(string.split(text.expand_tabs(line.text, 4), "\n"))
  case row {
    "" -> [Line("", line.look)]
    _ -> list.map(text.wrap(row, int.max(1, width)), Line(_, line.look))
  }
}

fn lines(buf: Buffer, area: Rect, content: List(Line), offset: Int) -> Buffer {
  wrapped(content, area.size.width)
  |> list.drop(offset)
  |> list.take(area.size.height)
  |> list.index_fold(buf, fn(buf, line, i) {
    print(
      buf,
      area.position.x,
      area.position.y + i,
      area.size.width,
      line.text,
      line.look,
    )
  })
}

/// A rounded panel; the area inside it, a column in from each border.
///
/// Drawn a row at a time: etui's `block` sets each border cell on its own,
/// which costs a copy of the whole frame per cell.
fn panel(
  buf: Buffer,
  area: Rect,
  title: String,
  active: Bool,
) -> #(Buffer, Rect) {
  let x = area.position.x
  let y = area.position.y
  let w = area.size.width
  let h = area.size.height
  case w < 4 || h < 2 {
    True -> #(buf, geometry.rect_new(x, y, 0, 0))
    False -> {
      let edge =
        look(
          case active {
            True -> mauve
            False -> surface
          },
          base,
        )
      let label = clip(" " <> title <> " ", w - 4)
      let top =
        "╭─" <> label <> string.repeat("─", w - 3 - width_of(label)) <> "╮"
      let bottom = "╰" <> string.repeat("─", w - 2) <> "╯"
      let buf =
        buf
        |> buffer.set_string(geometry.Position(x, y), top, edge)
        |> buffer.set_string(geometry.Position(x, y + h - 1), bottom, edge)
        |> buffer.set_string(geometry.Position(x + 2, y), label, case active {
          True -> bold(mauve, base)
          False -> look(subtext, base)
        })
      let buf =
        list.repeat(Nil, h - 2)
        |> list.index_fold(buf, fn(buf, _, i) {
          buf
          |> buffer.set_string(geometry.Position(x, y + 1 + i), "│", edge)
          |> buffer.set_string(
            geometry.Position(x + w - 1, y + 1 + i),
            "│",
            edge,
          )
        })
      #(buf, geometry.rect_new(x + 2, y + 1, w - 4, h - 2))
    }
  }
}

fn spinner(m: Model) -> String {
  let frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
  let at = { m.clock / 80 } % list.length(frames)
  list.drop(frames, at)
  |> list.first
  |> option.from_result
  |> option.unwrap("·")
}

/// A selectable list, scrolled to keep the cursor on screen. Each row is
/// its columns, already padded.
fn rows(
  buf: Buffer,
  area: Rect,
  items: List(a),
  row: fn(a) -> List(#(String, style.Color)),
  cursor: Int,
) -> Buffer {
  let height = area.size.height
  let offset = int.max(0, cursor - height + 1)
  items
  |> list.drop(offset)
  |> list.take(height)
  |> list.index_fold(buf, fn(buf, item, i) {
    let columns = row(item)
    let y = area.position.y + i
    let selected = i + offset == cursor
    let bg = case selected {
      True -> surface
      False -> base
    }
    let buf = case selected {
      True ->
        print(
          buf,
          area.position.x,
          y,
          area.size.width,
          string.repeat(" ", area.size.width),
          look(ink, bg),
        )
      False -> buf
    }
    let marker = case selected {
      True -> "▶ "
      False -> "  "
    }
    let buf = print(buf, area.position.x, y, 2, marker, bold(mauve, bg))
    let #(buf, _) =
      list.fold(columns, #(buf, area.position.x + 2), fn(acc, column) {
        let #(buf, x) = acc
        let #(cell, colour) = column
        let room = area.position.x + area.size.width - x
        #(print(buf, x, y, room, cell, look(colour, bg)), x + width_of(cell))
      })
    buf
  })
}

fn pad(s: String, width: Int) -> String {
  let s = clip(s, width - 1)
  case is_ascii(s) {
    True -> string.pad_end(s, width, " ")
    False -> text.pad_right(s, width)
  }
}

fn difficulty(ref: ProblemRef) -> #(String, style.Color) {
  case problems.difficulty_of(ref) {
    Some(problem.Easy) -> #("Easy", green)
    Some(problem.Medium) -> #("Medium", yellow)
    Some(problem.Hard) -> #("Hard", red)
    None -> #("", overlay)
  }
}

fn card_state(m: Model, ref: ProblemRef) -> #(String, style.Color) {
  case web.card_for(m.shared, ref) {
    None -> #("", overlay)
    Some(card) if card.suspended -> #("parked", overlay)
    Some(card) if card.reps == 0 -> #("new", blue)
    Some(card) ->
      case fsrs.interval_seconds(card.card, timestamp.system_time()) {
        seconds if seconds <= 0 -> #("due", peach)
        seconds -> #("in " <> format.interval(seconds), green)
      }
  }
}

fn ref_row(m: Model, ref: ProblemRef) -> List(#(String, style.Color)) {
  let #(state, state_colour) = card_state(m, ref)
  let #(level, level_colour) = difficulty(ref)
  [
    #(pad(state, 9), state_colour),
    #(pad(ref.subcategory, 24), subtext),
    #(pad(ref.title, 46), ink),
    #(level, level_colour),
  ]
}

// --- the frame ------------------------------------------------------------------

pub fn draw(m: Model, screen: Rect) -> #(Buffer, Option(Position)) {
  let assert [body, status] =
    geometry.split(Vertical, screen, [Fill, Length(1)])
  let buf = buffer.buffer_new(screen)
  let #(buf, editor_cursor) = case m.window {
    0 -> #(study(buf, body, m), None)
    1 -> #(browse(buf, body, m), None)
    2 -> #(queue_window(buf, body, m), None)
    3 -> #(stats(buf, body, m), None)
    4 -> #(tour(buf, body, m), None)
    5 -> #(settings(buf, body, m), None)
    _ -> drill(buf, body, m)
  }
  // An overlay over the editor has the keys, so the cursor goes with them.
  let editor_cursor = case m.chooser, m.help {
    None, None -> editor_cursor
    _, _ -> None
  }
  let buf = case m.chooser {
    Some(chooser) -> chooser_view(buf, screen, m, chooser)
    None -> buf
  }
  let buf = case m.help {
    Some(scroll) -> help(buf, screen, m, scroll)
    None -> buf
  }
  let #(buf, login_cursor) = case m.login {
    Some(login) -> login_view(buf, screen, login)
    None -> #(buf, None)
  }
  let #(buf, prompt_cursor) = status_line(buf, status, m)
  #(buf, prompt_cursor |> option.or(login_cursor) |> option.or(editor_cursor))
}

// --- the windows ----------------------------------------------------------------

fn prefix_name(m: Model) -> String {
  keys.tmux_name(m.prefix_key)
}

fn title(m: Model, window: String) -> String {
  track.label(m.shared.active_track) <> " · " <> window
}

/// " Next due in 4m." for the soonest reviewed card, when there is one.
fn next_due(m: Model) -> String {
  case list.find(app.queued(m), fn(card) { card.reps > 0 }) {
    Ok(card) ->
      " Next due in "
      <> format.interval(fsrs.interval_seconds(card.card, m.shared.now))
      <> "."
    Error(Nil) -> ""
  }
}

fn study(buf: Buffer, area: Rect, m: Model) -> Buffer {
  let #(buf, inner) = panel(buf, area, title(m, "study"), True)
  case m.loading {
    True -> lines(buf, inner, [dim(spinner(m) <> " loading your cards…")], 0)
    False -> {
      let refs = app.today(m)
      let today = m.shared.today
      let due = list.count(refs, fn(ref) { web.is_due(m.shared, ref) })
      let held = app.held_back(m)
      let more = case held {
        0 -> []
        _ -> [
          "m studies "
          <> int.to_string(int.min(held, app.study_more))
          <> " more ("
          <> int.to_string(held)
          <> " queued past today's limit)",
        ]
      }
      let header = [
        Line(
          int.to_string(due)
            <> " due · "
            <> int.to_string(list.length(refs) - due)
            <> " new  ·  today: "
            <> int.to_string(today.reviews_done)
            <> " reviewed, "
            <> int.to_string(today.new_introduced)
            <> " new seen",
          bold(ink, base),
        ),
        case refs {
          [] -> dim(string.join(more, ""))
          _ ->
            dim(string.join(["↵ starts the sitting · j/k move", ..more], " · "))
        },
        plain(""),
      ]
      let buf = lines(buf, inner, header, 0)
      let list_area =
        geometry.rect_new(
          inner.position.x,
          inner.position.y + 3,
          inner.size.width,
          int.max(0, inner.size.height - 3),
        )
      case refs {
        [] ->
          lines(
            buf,
            list_area,
            [
              plain("Nothing to study right now." <> next_due(m)),
              plain(""),
              dim("s        queue a starter set of easy drills"),
              dim(
                pad(prefix_name(m) <> " 1", 9)
                <> "browse every drill; a adds one, A all shown",
              ),
              dim(pad(prefix_name(m) <> " s", 9) <> "pick another track"),
            ],
            0,
          )
        _ ->
          rows(
            buf,
            list_area,
            refs,
            ref_row(m, _),
            int.min(m.study_cursor, list.length(refs) - 1),
          )
      }
    }
  }
}

fn browse(buf: Buffer, area: Rect, m: Model) -> Buffer {
  let #(buf, inner) = panel(buf, area, title(m, "browse"), True)
  let refs = app.browse_refs(m)
  let filter = case m.browse.typing, m.browse.filter {
    True, text -> Line("/" <> text <> "▏", bold(mauve, base))
    False, "" -> dim("/ filters · a queues · ↵ practises one")
    False, text ->
      Line(
        "/"
          <> text
          <> "  ("
          <> int.to_string(list.length(refs))
          <> ")  esc clears",
        look(mauve, base),
      )
  }
  let buf = lines(buf, inner, [filter], 0)
  rows(
    buf,
    geometry.rect_new(
      inner.position.x,
      inner.position.y + 2,
      inner.size.width,
      int.max(0, inner.size.height - 2),
    ),
    refs,
    ref_row(m, _),
    m.browse.cursor,
  )
}

fn queue_window(buf: Buffer, area: Rect, m: Model) -> Buffer {
  let #(buf, inner) = panel(buf, area, title(m, "queue"), True)
  let cards = app.queued(m)
  case cards {
    [] ->
      lines(
        buf,
        inner,
        [
          plain("The queue is empty."),
          dim(
            prefix_name(m)
            <> " 1 to browse and a to add, or s on the study window.",
          ),
        ],
        0,
      )
    _ -> {
      let buf =
        lines(
          buf,
          inner,
          [
            dim(
              plural(list.length(cards), "card")
              <> " · x removes a new one · ↵ practises",
            ),
          ],
          0,
        )
      rows(
        buf,
        geometry.rect_new(
          inner.position.x,
          inner.position.y + 2,
          inner.size.width,
          int.max(0, inner.size.height - 2),
        ),
        cards,
        fn(card: wire.CardState) {
          list.append(ref_row(m, card.problem), [
            #(
              "  "
                <> plural(card.reps, "rep")
                <> case card.lapses {
                0 -> ""
                n -> ", " <> plural(n, "lapse")
              },
              overlay,
            ),
          ])
        },
        m.queue_cursor,
      )
    }
  }
}

fn plural(n: Int, noun: String) -> String {
  int.to_string(n)
  <> " "
  <> noun
  <> case n {
    1 -> ""
    _ -> "s"
  }
}

fn stats(buf: Buffer, area: Rect, m: Model) -> Buffer {
  let #(buf, inner) = panel(buf, area, title(m, "stats"), True)
  let content = case m.stats {
    None -> [dim(spinner(m) <> " loading…")]
    Some(Error(reason)) -> [coloured(reason, red)]
    Some(Ok(s)) -> {
      let retention = case s.mature_reviews {
        0 -> "—"
        n -> int.to_string(s.mature_correct * 100 / n) <> "%"
      }
      let counts =
        list.map(s.state_counts, fn(pair) {
          state_name(pair.0) <> " " <> int.to_string(pair.1)
        })
        |> string.join(" · ")
      let week =
        s.forecast
        |> list.filter(fn(pair) { pair.0 < 7 })
        |> list.map(fn(pair) {
          case pair.0 {
            0 -> "today"
            1 -> "tomorrow"
            n -> "+" <> int.to_string(n) <> "d"
          }
          <> " "
          <> int.to_string(pair.1)
        })
        |> string.join(" · ")
      let recent =
        s.history
        |> list.filter(fn(day) { day.days_ago < 14 })
        |> list.sort(fn(a, b) { int.compare(b.days_ago, a.days_ago) })
        |> list.map(fn(day) {
          case day.total {
            0 -> "·"
            n if day.correct * 2 >= n -> "▆"
            _ -> "▂"
          }
        })
        |> string.concat
      [
        Line("streak " <> plural(s.streak_days, "day"), bold(ink, base)),
        plain(""),
        plain("reviews       " <> int.to_string(s.total_reviews)),
        plain("retention     " <> retention <> "  (graduated cards)"),
        plain("cards         " <> counts),
        plain("due this week " <> week),
        plain("last 14 days  " <> recent),
        plain(""),
        dim("g reloads · the full charts are on the web"),
      ]
    }
  }
  lines(buf, inner, content, 0)
}

fn state_name(code: Int) -> String {
  case code {
    0 -> "new"
    1 -> "learning"
    2 -> "review"
    3 -> "relearning"
    _ -> "other"
  }
}

fn tour(buf: Buffer, area: Rect, m: Model) -> Buffer {
  let #(buf, inner) = panel(buf, area, title(m, "tour"), True)
  lines(
    buf,
    inner,
    [
      plain("The Gleam language tour lives in the browser:"),
      coloured(store.api_base() <> "/tour", blue),
      plain(""),
      dim("Its lessons compile Gleam in the page as you type."),
    ],
    0,
  )
}

fn settings(buf: Buffer, area: Rect, m: Model) -> Buffer {
  let #(buf, inner) = panel(buf, area, "settings", True)
  let account = case m.shared.mode, m.shared.user {
    web.Account(_), Some(user) -> [
      plain("signed in as " <> user.email),
      dim("o signs out; your progress stays on the server"),
    ]
    web.Account(_), None -> [plain("signed in"), dim("o signs out")]
    web.Guest, _ -> [
      plain("guest: progress lives on this machine"),
      dim(store.guest_file()),
      dim("l signs in to sync with the web app"),
    ]
  }
  let editor = case app.editor() {
    Ok(program) -> program
    Error(Nil) -> "none found: set $EDITOR"
  }
  lines(
    buf,
    inner,
    list.flatten([
      [Line("account", bold(mauve, base))],
      account,
      [
        plain(""),
        Line("this machine", bold(mauve, base)),
        plain("server     " <> store.api_base() <> "   (GLEAMDRILL_API)"),
        plain("editor     " <> editor <> "   ($VISUAL, $EDITOR)"),
        plain(
          "prefix     "
          <> keys.tmux_name(m.prefix_key)
          <> "   (GLEAMDRILL_PREFIX)",
        ),
        plain(""),
        Line("scheduler", bold(mauve, base)),
        plain(
          app.limits_text(m.shared.settings)
          <> " in "
          <> track.label(m.shared.active_track),
        ),
        case m.shared.mode {
          web.Guest ->
            dim(
              "n/N 5 more or fewer new · u no limit · r/R 50 more or fewer reviews",
            )
          web.Account(_) ->
            dim("change these on the web; the terminal schedules with them")
        },
      ],
    ]),
    0,
  )
}

// --- the drill ------------------------------------------------------------------

fn drill(buf: Buffer, area: Rect, m: Model) -> #(Buffer, Option(Position)) {
  case m.sitting {
    None -> #(
      lines(
        buf,
        area,
        [dim("No sitting. ↵ on the study window starts one.")],
        0,
      ),
      None,
    )
    Some(s) if s.done -> #(summary(buf, area, m, s), None)
    Some(s) if s.waiting -> #(waiting(buf, area, m, s), None)
    Some(s) -> {
      let up = app.panes(s)
      let narrow = area.size.width < narrow_width
      let #(buf, area) = case narrow && !s.zoomed {
        True -> #(pane_tabs(buf, area, s, up), shrink_top(area, 1))
        False -> #(buf, area)
      }
      // A phone's screen holds one pane: the rest are a tab away.
      let areas = case s.zoomed || narrow {
        True -> [#(s.pane, area)]
        False -> {
          let assert [left, right] =
            geometry.split(Horizontal, area, [Percentage(40), Fill])
          case up {
            [_, CodePane, OutputPane] -> {
              let assert [code, output] =
                geometry.split(Vertical, right, [Percentage(62), Fill])
              [#(PromptPane, left), #(CodePane, code), #(OutputPane, output)]
            }
            [_, other] -> [#(PromptPane, left), #(other, right)]
            _ -> [#(PromptPane, area)]
          }
        }
      }
      list.fold(areas, #(buf, None), fn(acc, pair) {
        let #(buf, cursor) = acc
        let #(pane, rect) = pair
        let number =
          list.index_map(up, fn(p, i) { #(p, i) })
          |> list.key_find(pane)
          |> option.from_result
        let #(buf, here) = pane_view(buf, rect, m, s, pane, number)
        #(buf, option.or(cursor, here))
      })
    }
  }
}

/// Narrower than this, the drill shows one pane at a time and the status
/// line names only the current window.
const narrow_width = 90

fn shrink_top(area: Rect, rows: Int) -> Rect {
  geometry.rect_new(
    area.position.x,
    area.position.y + rows,
    area.size.width,
    int.max(0, area.size.height - rows),
  )
}

/// `prompt  [code]  output   tab`: which pane is up, on a narrow screen.
fn pane_tabs(buf: Buffer, area: Rect, s: Sitting, up: List(Pane)) -> Buffer {
  let #(buf, x) =
    list.fold(up, #(buf, area.position.x), fn(acc, pane) {
      let #(buf, x) = acc
      let label = " " <> app.pane_name(pane) <> " "
      let st = case pane == s.pane {
        True -> bold(mantle, mauve)
        False -> look(subtext, base)
      }
      #(
        print(
          buf,
          x,
          area.position.y,
          area.position.x + area.size.width - x,
          label,
          st,
        ),
        x + width_of(label) + 1,
      )
    })
  print(
    buf,
    x + 1,
    area.position.y,
    area.position.x + area.size.width - x - 1,
    "tab switches",
    look(overlay, base),
  )
}

fn pane_view(
  buf: Buffer,
  area: Rect,
  m: Model,
  s: Sitting,
  pane: Pane,
  number: Option(Int),
) -> #(Buffer, Option(Position)) {
  let label = case s.numbered, number {
    True, Some(n) -> int.to_string(n) <> " · " <> app.pane_name(pane)
    _, _ -> app.pane_name(pane)
  }
  let label = case pane {
    PromptPane ->
      label
      <> " · "
      <> int.to_string(s.index + 1)
      <> "/"
      <> int.to_string(list.length(s.refs))
    CodePane if s.revealed ->
      case shown_solution(s) {
        Ok(#(n, count, solution)) ->
          label
          <> " · solution "
          <> int.to_string(n + 1)
          <> "/"
          <> int.to_string(count)
          <> " · "
          <> solution.label
        Error(Nil) -> label <> " · solution"
      }
    CodePane if s.editing != None -> label <> " · editing"
    _ -> label
  }
  let #(buf, inner) = panel(buf, area, label, s.pane == pane)
  let #(prompt_scroll, code_scroll, output_scroll) = s.scroll
  case pane, s.editing {
    CodePane, Some(e) if !s.revealed ->
      editor_view(buf, inner, e, s.pane == CodePane)
    PromptPane, _ -> #(lines(buf, inner, prompt_lines(s), prompt_scroll), None)
    CodePane, _ -> #(lines(buf, inner, code_lines(s), code_scroll), None)
    OutputPane, _ -> #(
      lines(buf, inner, output_lines(m, s), output_scroll),
      None,
    )
  }
}

/// The built-in editor: numbered lines, unwrapped, scrolled so the cursor
/// is on screen, and the cursor itself while the pane is current.
fn editor_view(
  buf: Buffer,
  area: Rect,
  e: Editor,
  current: Bool,
) -> #(Buffer, Option(Position)) {
  let height = int.max(1, area.size.height - 1)
  let digits = string.length(int.to_string(list.length(e.lines)))
  let gutter = digits + 2
  let width = area.size.width - gutter
  let top = editor.top(e, height)
  let #(before, _) = editor.cut(editor.line(e), e.col)
  let x = width_of(before)
  // Scrolled sideways only as far as the cursor needs.
  let left = int.max(0, x - width + 1)
  let x0 = area.position.x
  let y0 = area.position.y
  let buf =
    e.lines
    |> list.drop(top)
    |> list.take(height)
    |> list.index_fold(buf, fn(buf, row, i) {
      let number = text.pad_left(int.to_string(top + i + 1), digits) <> "  "
      let number_look = case top + i == e.row {
        True -> look(subtext, base)
        False -> look(overlay, base)
      }
      let buf = print(buf, x0, y0 + i, gutter, number, number_look)
      print(
        buf,
        x0 + gutter,
        y0 + i,
        width,
        string.drop_start(row, left),
        look(ink, base),
      )
    })
  let buf =
    print(
      buf,
      x0,
      y0 + height,
      area.size.width,
      "esc done · ctrl+r run · ctrl+s solution",
      look(overlay, base),
    )
  let cursor = case current && width > 0 {
    True -> Some(geometry.Position(x0 + gutter + x - left, y0 + e.row - top))
    False -> None
  }
  #(buf, cursor)
}

fn prompt_lines(s: Sitting) -> List(Line) {
  let p = s.problem
  let #(level, level_colour) = difficulty(s.ref)
  let tag =
    [level, problem.language_label(p.language), s.ref.subcategory]
    |> list.filter(fn(t) { t != "" })
    |> string.join(" · ")
  let quiz = case p.quiz {
    Some(quiz) ->
      list.flatten([
        [plain("")],
        list.index_map(quiz.choices, fn(choice, i) {
          let letter = string.slice("abcd", i, 1)
          coloured(letter <> ")  " <> choice, case s.chosen {
            Some(_) if i == quiz.correct -> green
            Some(n) if n == i -> red
            _ -> ink
          })
        }),
      ])
    None -> []
  }
  list.flatten([
    [Line(p.title, bold(ink, base)), coloured(tag, level_colour), plain("")],
    [plain(prompt_text(p))],
    quiz,
  ])
}

/// The prompt as text. The tour's lessons carry HTML; the drills don't.
fn prompt_text(p: problem.Problem) -> String {
  case p.prompt_html {
    False -> p.prompt
    True -> strip_tags(p.prompt)
  }
}

fn strip_tags(html: String) -> String {
  case string.split_once(html, "<") {
    Error(Nil) -> html
    Ok(#(before, rest)) ->
      case string.split_once(rest, ">") {
        Ok(#(_, after)) -> before <> strip_tags(after)
        Error(Nil) -> before
      }
  }
}

/// The solution `[` and `]` have reached: its place, how many, and it.
fn shown_solution(s: Sitting) -> Result(#(Int, Int, problem.Solution), Nil) {
  let count = list.length(s.problem.solutions)
  let n = int.clamp(s.solution, 0, int.max(0, count - 1))
  list.drop(s.problem.solutions, n)
  |> list.first
  |> result.map(fn(solution) { #(n, count, solution) })
}

fn code_lines(s: Sitting) -> List(Line) {
  case s.revealed, shown_solution(s) {
    True, Ok(#(_, count, best)) ->
      list.flatten([
        [Line(best.label, bold(green, base))],
        case best.complexity {
          "" -> []
          complexity -> [dim(complexity)]
        },
        case best.note {
          "" -> []
          note -> [plain(""), coloured(note, subtext)]
        },
        [plain("")],
        numbered(best.code),
        [
          plain(""),
          dim(case count > 1, s.editing {
            True, Some(_) -> "[ ] other solutions · s back to the editor"
            True, None -> "[ ] other solutions · s your code"
            False, Some(_) -> "s back to the editor"
            False, None -> "s your code"
          }),
        ],
      ])
    True, Error(Nil) -> [dim("no reference solution")]
    False, _ ->
      case s.problem.check, s.problem.quiz {
        Some(_), _ ->
          list.append(numbered(s.draft), [
            plain(""),
            dim("e edit · r run · s solution · 1-4 grade · n skip"),
          ])
        None, Some(_) -> [
          dim("a-d answers · s shows the explanation · 1-4 grade"),
        ]
        None, None -> [
          plain("Nothing to run here: work it out, then s shows the answer."),
          dim("1-4 grade · n skip"),
        ]
      }
  }
}

fn numbered(code: String) -> List(Line) {
  let rows = string.split(code, "\n")
  let width = string.length(int.to_string(list.length(rows)))
  list.index_map(rows, fn(row, i) {
    Line(
      text.pad_left(int.to_string(i + 1), width) <> "  " <> row,
      look(ink, base),
    )
  })
}

fn output_lines(m: Model, s: Sitting) -> List(Line) {
  case s.problem.quiz, s.chosen {
    Some(quiz), Some(n) -> [
      case n == quiz.correct {
        True -> Line("✓ correct", bold(green, base))
        False ->
          Line(
            "✗ the answer is " <> string.slice("abcd", quiz.correct, 1),
            bold(red, base),
          )
      },
      plain(""),
      plain(quiz.explanation),
      dim(case quiz.page {
        "" -> ""
        page -> "read: " <> page
      }),
    ]
    Some(quiz), None if s.revealed -> [
      Line(
        "the answer is " <> string.slice("abcd", quiz.correct, 1),
        bold(green, base),
      ),
      plain(""),
      plain(quiz.explanation),
    ]
    Some(_), None -> [dim("a-d answers · s shows the answer · 1-4 grade")]
    None, _ -> run_lines(m, s.run)
  }
}

fn run_lines(m: Model, run: web.RunState) -> List(Line) {
  case run {
    web.RunIdle -> [dim("r runs the check")]
    web.Running(_, _) -> [coloured(spinner(m) <> " running…", mauve)]
    web.Ran(outcome, stdout) -> {
      let printed = case string.trim(stdout) {
        "" -> []
        text -> [plain(""), dim("printed:"), plain(text)]
      }
      list.append(outcome_lines(outcome), printed)
    }
  }
}

fn outcome_lines(outcome: web.RunOutcome) -> List(Line) {
  case outcome {
    web.TimedOut -> [Line("timed out", bold(red, base))]
    web.Errored(error) -> [
      Line(
        error.phase
          <> " error"
          <> case error.line {
          Some(line) -> " on line " <> int.to_string(line)
          None -> ""
        },
        bold(red, base),
      ),
      plain(error.message),
    ]
    web.Cases(cases) -> {
      let passed = list.count(cases, fn(c) { c.passed })
      let total = list.length(cases)
      [
        case passed == total && total > 0 {
          True ->
            Line(
              "✓ all " <> int.to_string(total) <> " passed",
              bold(green, base),
            )
          False ->
            Line(
              int.to_string(passed) <> "/" <> int.to_string(total) <> " passed",
              bold(red, base),
            )
        },
        ..list.flat_map(cases, fn(c) {
          case c.passed {
            True -> [coloured("✓ " <> c.label, green)]
            False -> [
              coloured("✗ " <> c.label, red),
              dim("    expected " <> c.expected),
              dim("    got      " <> c.actual),
            ]
          }
        })
      ]
    }
  }
}

fn summary(buf: Buffer, area: Rect, m: Model, s: Sitting) -> Buffer {
  let #(buf, inner) = panel(buf, area, title(m, "done"), True)
  let graded = list.reverse(s.graded)
  let content =
    list.flatten([
      [
        Line(
          "Sitting done: " <> plural(list.length(graded), "drill") <> " graded",
          bold(green, base),
        ),
        plain(""),
      ],
      list.map(graded, fn(entry) {
        let #(ref, rating, seconds) = entry
        plain(
          pad(ref.title, 46)
          <> pad(grade_name(rating), 8)
          <> "next in "
          <> format.interval(seconds),
        )
      }),
      [plain(""), dim("↵ back to study")],
    ])
  lines(buf, inner, content, 0)
}

/// The list is done and a card is coming back: count down to it.
fn waiting(buf: Buffer, area: Rect, m: Model, s: Sitting) -> Buffer {
  let #(buf, inner) = panel(buf, area, title(m, "waiting"), True)
  let next = case app.next_back(s, sys.now_ms()) {
    Some(#(ref, ms)) -> [
      Line("Next: " <> ref.title, bold(green, base)),
      plain("back in " <> countdown(ms)),
    ]
    None -> []
  }
  let later =
    s.returning
    |> list.sort(fn(a, b) { int.compare(a.1, b.1) })
    |> list.drop(1)
    |> list.map(fn(r) { dim("then " <> r.0.title) })
  let content =
    list.flatten([
      next,
      later,
      [
        plain(""),
        dim(
          plural(list.length(s.graded), "grade")
          <> " so far · the card opens by itself · n ends the sitting",
        ),
      ],
    ])
  lines(buf, inner, content, 0)
}

/// `4m 05s`, or `12s` under a minute.
fn countdown(ms: Int) -> String {
  let seconds = { ms + 999 } / 1000
  case seconds < 60 {
    True -> int.to_string(seconds) <> "s"
    False ->
      int.to_string(seconds / 60)
      <> "m "
      <> string.pad_start(int.to_string(seconds % 60), 2, "0")
      <> "s"
  }
}

fn grade_name(rating: fsrs.Rating) -> String {
  case rating {
    fsrs.Again -> "again"
    fsrs.Hard -> "hard"
    fsrs.Good -> "good"
    fsrs.Easy -> "easy"
  }
}

// --- overlays -------------------------------------------------------------------

fn popup(
  buf: Buffer,
  screen: Rect,
  width: Int,
  height: Int,
  label: String,
) -> #(Buffer, Rect) {
  let w = int.min(width, screen.size.width - 2)
  let h = int.min(height, screen.size.height - 2)
  let area =
    geometry.rect_new(
      screen.position.x + { screen.size.width - w } / 2,
      screen.position.y + { screen.size.height - h } / 2,
      w,
      h,
    )
  let #(buf, inner) = panel(fill(buf, area), area, label, True)
  #(buf, inner)
}

fn chooser_view(
  buf: Buffer,
  screen: Rect,
  m: Model,
  chooser: app.Chooser,
) -> Buffer {
  let entries = case chooser.sessions {
    True ->
      list.index_map(track.all(), fn(name, i) {
        let attached = case name == m.shared.active_track {
          True -> " (attached)"
          False -> ""
        }
        [#(int.to_string(i) <> ": " <> track.slug(name) <> attached, ink)]
      })
    False ->
      list.index_map(app.window_names(m), fn(name, i) {
        let here = case i == m.window {
          True -> " (active)"
          False -> ""
        }
        [#(int.to_string(i) <> ": " <> name <> here, ink)]
      })
  }
  let label = case chooser.sessions {
    True -> "choose-tree -s"
    False -> "choose-tree -w"
  }
  let #(buf, inner) = popup(buf, screen, 46, list.length(entries) + 2, label)
  rows(buf, inner, entries, fn(row) { row }, chooser.cursor)
}

/// `?`: the keys, grouped as herdr groups them. What works here first, then
/// what the prefix does. Two columns where there is room.
fn help(buf: Buffer, screen: Rect, m: Model, scroll: Int) -> Buffer {
  let name = keys.tmux_name(m.prefix_key)
  let then = " · " <> name <> " then"
  let group = fn(title, rows: List(#(String, String))) {
    list.flatten([
      [Line(title, bold(mauve, base))],
      list.map(rows, fn(row) { Line(pad(row.0, 9) <> row.1, look(ink, base)) }),
      [plain("")],
    ])
  }
  let picked = fn(keep: fn(command.Command) -> Bool) {
    prefix.table()
    |> list.filter(fn(bind) { keep(bind.command) })
    |> list.map(fn(bind) { #(prefix.key_name(bind), bind.note) })
  }
  let here = group("here · " <> here_name(m), page_keys(m))
  let windows =
    group("windows" <> then, [
      #("0…6", "Window by number"),
      ..picked(fn(c) {
        case c {
          command.SelectWindow(command.Index(_)) -> False
          command.SelectWindow(_) | command.ChooseWindow | command.KillWindow ->
            True
          _ -> False
        }
      })
    ])
  let tracks =
    group(
      "tracks" <> then,
      picked(fn(c) {
        case c {
          command.ChooseSession | command.SwitchClient(_) -> True
          _ -> False
        }
      }),
    )
  let panes =
    group("panes" <> then, [
      #("arrows", "Pane in that direction"),
      ..picked(fn(c) {
        case c {
          command.SelectPane(command.Toward(_)) -> False
          command.SelectPane(_)
          | command.DisplayPanes
          | command.ZoomPane
          | command.KillPane -> True
          _ -> False
        }
      })
    ])
  let more =
    group("more" <> then, [
      #(":", "Command line (tmux commands)"),
      #("?", "This help (? alone works too)"),
      #("d", "Quit"),
      #(name, "Send " <> name <> " through"),
    ])
  let footer = [
    dim(
      "tmux and herdr keep C-b. This app's prefix: "
      <> name
      <> " (twice sends it on; GLEAMDRILL_PREFIX sets it).",
    ),
  ]
  let left = list.flatten([here, windows, tracks])
  let right = list.flatten([panes, more])
  let two = screen.size.width >= 96
  let rows = case two {
    True -> int.max(list.length(left), list.length(right))
    False -> list.length(left) + list.length(right)
  }
  let #(buf, inner) =
    popup(
      buf,
      screen,
      case two {
        True -> 100
        False -> 64
      },
      rows + 3,
      "keys · j/k scroll · any other key closes",
    )
  let body = shrink_bottom(inner, 1)
  let buf = case two {
    True -> {
      let assert [l, _, r] =
        geometry.split(Horizontal, body, [Percentage(50), Length(2), Fill])
      let at = int.min(scroll, int.max(0, rows - body.size.height))
      buf |> lines(l, left, at) |> lines(r, right, at)
    }
    False -> {
      let content = list.append(left, right)
      let most =
        int.max(
          0,
          list.length(wrapped(content, body.size.width)) - body.size.height,
        )
      lines(buf, body, content, int.min(scroll, most))
    }
  }
  lines(buf, bottom_row(inner), footer, 0)
}

fn shrink_bottom(area: Rect, rows: Int) -> Rect {
  geometry.rect_new(
    area.position.x,
    area.position.y,
    area.size.width,
    int.max(0, area.size.height - rows),
  )
}

fn bottom_row(area: Rect) -> Rect {
  geometry.rect_new(
    area.position.x,
    area.position.y + int.max(0, area.size.height - 1),
    area.size.width,
    1,
  )
}

/// What the "here" group is about: the window, or the editor in it.
fn here_name(m: Model) -> String {
  case m.window, m.sitting {
    6, Some(app.Sitting(editing: Some(_), pane: CodePane, revealed: False, ..))
    -> "editor"
    _, _ ->
      list.drop(app.window_names(m), m.window)
      |> list.first
      |> result.unwrap("")
  }
}

fn page_keys(m: Model) -> List(#(String, String)) {
  case m.window {
    0 -> [
      #("↵", "start today's sitting"),
      #("j/k", "move"),
      #("s", "queue a starter set"),
      #(
        "m",
        "study " <> int.to_string(app.study_more) <> " more past today's limit",
      ),
      #("q", "quit"),
    ]
    1 -> [
      #("/", "filter"),
      #("a", "add to the queue"),
      #("A", "add every drill shown (all the filter matches)"),
      #("↵", "practise this one"),
      #("esc", "clear the filter"),
    ]
    2 -> [#("x", "remove a new card"), #("↵", "practise this one")]
    3 -> [#("g", "reload")]
    5 -> [
      #("l / o", "sign in / sign out"),
      #("n / N", "5 more / fewer new a day"),
      #("u", "no limit on new"),
      #("r / R", "50 more / fewer reviews a day"),
    ]
    6 -> drill_keys(m)
    _ -> []
  }
}

/// The drill's keys as they stand: the editor's while it has the keys, a
/// quiz's for a quiz.
fn drill_keys(m: Model) -> List(#(String, String)) {
  case m.sitting {
    None -> []
    Some(s) if s.done -> [#("↵", "back to study")]
    Some(s) if s.waiting -> [
      #("n", "stop waiting and end the sitting"),
      #("esc", "study window; the countdown carries on"),
    ]
    Some(app.Sitting(editing: Some(_), pane: CodePane, revealed: False, ..)) -> [
      #("esc", "close; the draft is kept"),
      #("ctrl+r", "save and run"),
      #("ctrl+s", "look at the solutions"),
      #("tab", "indent; shift+tab dedents"),
      #("ctrl+k", "cut to the end of the line"),
      #("home/end", "start / end of the line"),
      #("?", "types a ?; this is " <> keys.tmux_name(m.prefix_key) <> " ?"),
    ]
    Some(s) ->
      case s.problem.quiz {
        Some(_) -> [
          #("a-d", "answer"),
          #("s", "show the explanation"),
          #("1-4", "grade: again, hard, good, easy"),
          #("n", "skip"),
          #("j/k", "scroll the pane"),
          #("tab", "next pane"),
          #("esc", "back to study (the sitting waits)"),
        ]
        None -> [
          #("e", "edit in $EDITOR"),
          #("E", "edit in the built-in editor"),
          #("r", "run the check"),
          #("s", "solution / your code"),
          #("[ ]", "previous / next solution"),
          #("1-4", "grade: again, hard, good, easy"),
          #("n", "skip"),
          #("j/k", "scroll the pane"),
          #("tab", "next pane"),
          #("esc", "back to study (the sitting waits)"),
        ]
      }
  }
}

fn login_view(
  buf: Buffer,
  screen: Rect,
  login: app.Login,
) -> #(Buffer, Option(Position)) {
  let #(buf, inner) = popup(buf, screen, 56, 8, "sign in")
  let field = fn(buf, y, label, value, active) {
    let buf = print(buf, inner.position.x, y, 10, label, look(subtext, base))
    print(
      buf,
      inner.position.x + 10,
      y,
      inner.size.width - 10,
      value,
      case active {
        True -> bold(ink, surface)
        False -> look(ink, base)
      },
    )
  }
  let masked = string.repeat("•", string.length(login.password))
  let y = inner.position.y
  let buf = field(buf, y, "email", login.email, !login.on_password)
  let buf = field(buf, y + 1, "password", masked, login.on_password)
  let buf =
    lines(
      buf,
      geometry.rect_new(inner.position.x, y + 3, inner.size.width, 2),
      [
        dim(case login.busy {
          True -> "signing in…"
          False -> "tab switches · ↵ signs in · esc cancels"
        }),
        dim("no account yet? sign up on the web"),
      ],
      0,
    )
  let cursor = case login.on_password {
    True ->
      geometry.Position(inner.position.x + 10 + string.length(masked), y + 1)
    False -> geometry.Position(inner.position.x + 10 + width_of(login.email), y)
  }
  #(buf, Some(cursor))
}

// --- the status line --------------------------------------------------------------

/// `[neetcode-150] 0:study* 1:browse- …`, the prefix chip, then the message
/// or the keys that matter here, as the web's status line has them.
fn status_line(
  buf: Buffer,
  area: Rect,
  m: Model,
) -> #(Buffer, Option(Position)) {
  let y = area.position.y
  let x0 = area.position.x
  let width = area.size.width
  let bar = look(ink, mantle)
  let buf = print(buf, x0, y, width, string.repeat(" ", width), bar)
  case m.prompt {
    Some(text) -> {
      let buf = print(buf, x0, y, width, ":" <> text, look(ink, mantle))
      #(buf, Some(geometry.Position(x0 + 1 + width_of(text), y)))
    }
    None -> {
      // A phone's line is for the keys; the track is in the window title.
      let #(buf, x) = case width < narrow_width {
        True -> #(buf, x0)
        False -> {
          let session = "[" <> track.slug(m.shared.active_track) <> "]"
          #(
            print(buf, x0, y, width, session, bold(mantle, green)),
            x0 + width_of(session) + 1,
          )
        }
      }
      // The prefix comes first, so the numbers after it read as what to
      // press after it. Armed, it says so and the numbers light up.
      let name = keys.tmux_name(m.prefix_key)
      let chip = case m.armed {
        True -> " " <> name <> " … pick "
        False -> " " <> name <> " ▸ "
      }
      let buf =
        print(buf, x, y, x0 + width - x, chip, case m.armed {
          True -> bold(mantle, mauve)
          False -> look(subtext, surface)
        })
      let x = x + width_of(chip)
      let names = app.window_names(m)
      // A phone has room for the current window only.
      let shown = case width < narrow_width {
        True ->
          list.index_map(names, fn(name, i) { #(name, i) })
          |> list.filter(fn(pair) { pair.1 == m.window })
        False -> list.index_map(names, fn(name, i) { #(name, i) })
      }
      let #(buf, x) =
        list.fold(shown, #(buf, x), fn(acc, pair) {
          let #(name, i) = pair
          let #(buf, x) = acc
          let current = i == m.window
          let number = int.to_string(i)
          let #(number_look, name_look) = case current, m.armed {
            True, _ -> #(bold(mantle, mauve), bold(mantle, mauve))
            False, True -> #(bold(mauve, mantle), look(ink, mantle))
            False, False -> #(look(overlay, mantle), look(subtext, mantle))
          }
          let label = " " <> name <> " "
          let buf = print(buf, x, y, x0 + width - x, " " <> number, number_look)
          let x = x + 1 + width_of(number)
          #(
            print(buf, x, y, x0 + width - x, label, name_look),
            x + width_of(label),
          )
        })
      let x = x + 2
      let #(tail, tail_look) = case m.message {
        Some(text) -> #(text, bold(yellow, mantle))
        None -> #(hints(m, x0 + width - x), look(overlay, mantle))
      }
      #(print(buf, x, y, x0 + width - x, tail, tail_look), None)
    }
  }
}

/// What to press next, by the window, with `? help` last where it fits.
fn hints(m: Model, room: Int) -> String {
  let help = "? help"
  case m.window, m.sitting {
    6, Some(s) if s.done -> "↵ back to study"
    6, Some(s) if s.waiting -> "n end the sitting  esc study  " <> help
    6, Some(s) if s.grading -> "saving the grade…"
    6, Some(app.Sitting(editing: Some(_), pane: CodePane, revealed: False, ..))
    -> "esc done  ctrl+r run  ctrl+s solution"
    6, Some(s) -> {
      let grades =
        [fsrs.Again, fsrs.Hard, fsrs.Good, fsrs.Easy]
        |> list.index_map(fn(rating, i) {
          int.to_string(i + 1)
          <> " "
          <> grade_name(rating)
          <> " "
          <> format.interval(app.grade_hint(m, s, rating))
        })
        |> string.join("  ")
      case width_of(grades) + 2 + width_of(help) <= room {
        True -> grades <> "  " <> help
        False -> grades
      }
    }
    0, _ -> "↵ start  m more  s starter set  " <> help
    1, _ -> "/ filter  a add  A add all  ↵ practise  " <> help
    2, _ -> "x remove  ↵ practise  " <> help
    3, _ -> "g reload  " <> help
    5, _ ->
      case m.shared.mode {
        web.Guest -> "n/N new  u no limit  r/R reviews  l sign in  " <> help
        web.Account(_) -> "o sign out  " <> help
      }
    _, _ -> help
  }
}

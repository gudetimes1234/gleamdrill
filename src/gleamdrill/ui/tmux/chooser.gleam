//// tmux's choose-tree: the windows (`C-b w`) or the sessions (`C-b s`) as a
//// list to pick from. j/k or the arrows move, Enter or a row's number
//// picks, Escape or q closes. Picking runs the same command the prefix key
//// for that row would.

import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleam/result
import gleamdrill/domain/track
import gleamdrill/model.{type Chooser, type Model}
import gleamdrill/msg.{type Msg}
import gleamdrill/ui/binding.{type Binding, Binding}
import gleamdrill/ui/tmux/command.{type Command}
import gleamdrill/ui/tmux/windows
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

/// One row: what it says, and the command picking it runs.
pub type Row {
  Row(label: String, current: Bool, command: Command)
}

pub fn rows(m: Model, chooser: Chooser) -> List(Row) {
  case chooser.sessions {
    False -> {
      let here = windows.current(m)
      use window <- list.map(windows.all(m))
      Row(
        label: int.to_string(window.index) <> ": " <> window.name,
        current: here == Ok(window),
        command: command.SelectWindow(command.Index(window.index)),
      )
    }
    True -> {
      use name, index <- list.index_map(windows.sessions(m))
      Row(
        label: track.slug(name) <> ": " <> track.label(name),
        current: name == m.active_track,
        command: command.SwitchClient(command.Index(index)),
      )
    }
  }
}

/// The row a pick lands on: the numbered one, or the cursor's.
pub fn picked(
  m: Model,
  chooser: Chooser,
  number: option.Option(Int),
) -> Result(Command, Nil) {
  let index = option.unwrap(number, chooser.cursor)
  rows(m, chooser)
  |> list.drop(index)
  |> list.first
  |> result.map(fn(row) { row.command })
}

/// The cursor moved `by` rows, wrapping.
pub fn move(m: Model, chooser: Chooser, by: Int) -> Chooser {
  let count = int.max(list.length(rows(m, chooser)), 1)
  model.Chooser(..chooser, cursor: { chooser.cursor + by + count } % count)
}

/// The chooser's keys, while it owns the keyboard. The row numbers are
/// one documented row: `dispatch` reads the digit itself.
pub fn bindings() -> List(Binding(Msg)) {
  [
    Binding(["j", "ArrowDown"], "down", "Next row", msg.ChooserMoved(1)),
    Binding(["k", "ArrowUp"], "up", "Previous row", msg.ChooserMoved(-1)),
    Binding(["Enter"], "pick", "Pick the row", msg.ChooserPicked(None)),
    Binding(
      ["0\u{2026}9"],
      "row",
      "Pick a row by its number",
      msg.ChooserPicked(None),
    ),
    Binding(["Escape", "q"], "close", "Close the tree", msg.ChooserClosed),
  ]
}

pub fn dispatch(key: String) -> Result(Msg, Nil) {
  case int.parse(key) {
    Ok(n) if n >= 0 -> Ok(msg.ChooserPicked(Some(n)))
    _ -> binding.find(bindings(), key)
  }
}

pub fn view(m: Model) -> Element(Msg) {
  case m.chooser {
    None -> element.none()
    Some(chooser) ->
      html.div(
        [
          attribute.class("help-overlay chooser-overlay"),
          event.on_click(msg.ChooserClosed),
        ],
        [
          html.div(
            [
              attribute.class("help-card chooser-card"),
              attribute.role("dialog"),
              attribute.attribute("aria-label", case chooser.sessions {
                True -> "Choose a track"
                False -> "Choose a window"
              }),
            ],
            [
              html.h2([attribute.class("help-title")], [
                html.text(case chooser.sessions {
                  True -> "choose-tree -s"
                  False -> "choose-tree -w"
                }),
              ]),
              html.ul(
                [attribute.class("chooser-rows")],
                list.index_map(rows(m, chooser), fn(row, index) {
                  html.li(
                    [
                      attribute.classes([
                        #("chooser-row", True),
                        #("cursor", index == chooser.cursor),
                      ]),
                      event.stop_propagation(
                        event.on_click(msg.ChooserPicked(Some(index))),
                      ),
                    ],
                    [
                      html.span([attribute.class("chooser-number")], [
                        html.text("(" <> int.to_string(index) <> ")"),
                      ]),
                      html.text(
                        " - "
                        <> row.label
                        <> case row.current {
                          True -> " (attached)"
                          False -> ""
                        },
                      ),
                    ],
                  )
                }),
              ),
            ],
          ),
        ],
      )
  }
}

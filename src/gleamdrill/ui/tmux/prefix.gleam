//// The prefix table: what each key after C-b runs, as tmux binds it by
//// default. One list feeds the dispatcher and the cheatsheet, so the help
//// can never name a binding that does nothing.

import gleam/int
import gleam/list
import gleam/result
import gleamdrill/msg
import gleamdrill/ui/tmux/command.{
  type Command, ChooseSession, ChooseWindow, CommandPrompt, DetachClient,
  DisplayPanes, Down, Index, KillPane, KillWindow, Last, Left, ListKeys, Next,
  PaneLast, PaneNext, Previous, Right, SelectPane, SelectWindow, SendPrefix,
  SwitchClient, Toward, Up, ZoomPane,
}

/// `key` is a `KeyboardEvent.key`; `ctrl` whether Ctrl is held with it.
pub type Bind {
  Bind(key: String, ctrl: Bool, command: Command, note: String)
}

pub fn table() -> List(Bind) {
  let digits =
    list.map([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], fn(n) {
      Bind(
        int.to_string(n),
        False,
        SelectWindow(Index(n)),
        "Window " <> int.to_string(n),
      )
    })
  list.flatten([
    digits,
    [
      Bind("n", False, SelectWindow(Next), "Next window"),
      Bind("p", False, SelectWindow(Previous), "Previous window"),
      Bind("l", False, SelectWindow(Last), "Last window"),
      Bind("w", False, ChooseWindow, "Choose a window"),
      Bind("&", False, KillWindow, "Leave this window"),
      Bind("o", False, SelectPane(PaneNext), "Next pane"),
      Bind(";", False, SelectPane(PaneLast), "Last pane"),
      Bind("ArrowLeft", False, SelectPane(Toward(Left)), "Pane to the left"),
      Bind("ArrowRight", False, SelectPane(Toward(Right)), "Pane to the right"),
      Bind("ArrowUp", False, SelectPane(Toward(Up)), "Pane above"),
      Bind("ArrowDown", False, SelectPane(Toward(Down)), "Pane below"),
      Bind("q", False, DisplayPanes, "Number the panes"),
      Bind("z", False, ZoomPane, "Zoom the pane"),
      Bind("x", False, KillPane, "Close the pane"),
      Bind("s", False, ChooseSession, "Choose a track"),
      Bind("(", False, SwitchClient(Previous), "Previous track"),
      Bind(")", False, SwitchClient(Next), "Next track"),
      Bind("L", False, SwitchClient(Last), "Last track"),
      Bind("d", False, DetachClient, "Detach to the tracks"),
      Bind(":", False, CommandPrompt, "Command prompt"),
      Bind("?", False, ListKeys, "List the keys"),
      Bind("b", True, SendPrefix, "Send C-b to the editor"),
    ],
  ])
}

pub fn lookup(key: msg.Key) -> Result(Command, Nil) {
  table()
  |> list.find(fn(bind) { bind.key == key.key && bind.ctrl == key.ctrl })
  |> result.map(fn(bind) { bind.command })
}

/// The key as tmux's list-keys writes it: `C-b`, `Left`, `&`.
pub fn key_name(bind: Bind) -> String {
  let base = case bind.key {
    "ArrowLeft" -> "Left"
    "ArrowRight" -> "Right"
    "ArrowUp" -> "Up"
    "ArrowDown" -> "Down"
    other -> other
  }
  case bind.ctrl {
    True -> "C-" <> base
    False -> base
  }
}

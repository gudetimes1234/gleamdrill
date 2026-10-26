//// Key names between etui (`"ctrl+b"`, `"up"`, `"enter"`) and the browser
//// (`KeyboardEvent.key`: `"b"` with ctrl, `"ArrowUp"`, `"Enter"`), which is
//// what the web's prefix table and the `send-keys` command are written in.

import gleam/string
import gleamdrill/msg

/// etui's spelling as the browser's.
pub fn to_web(raw: String) -> msg.Key {
  let key = fn(key, ctrl) { msg.Key(key, ctrl, False, "none") }
  case raw {
    "ctrl+" <> rest -> key(rest, True)
    "up" -> key("ArrowUp", False)
    "down" -> key("ArrowDown", False)
    "left" -> key("ArrowLeft", False)
    "right" -> key("ArrowRight", False)
    "enter" -> key("Enter", False)
    "esc" -> key("Escape", False)
    "tab" -> key("Tab", False)
    "backspace" -> key("Backspace", False)
    "space" -> key(" ", False)
    other -> key(other, False)
  }
}

/// A browser spelling (or tmux's: `C-x`, `Up`, `Enter`, `Space`) as etui's,
/// for `send-keys`.
pub fn from_web(key: String) -> String {
  case key {
    "C-" <> rest -> "ctrl+" <> string.lowercase(rest)
    "ArrowUp" | "Up" -> "up"
    "ArrowDown" | "Down" -> "down"
    "ArrowLeft" | "Left" -> "left"
    "ArrowRight" | "Right" -> "right"
    "Enter" -> "enter"
    "Escape" -> "esc"
    "Tab" -> "tab"
    "BSpace" | "Backspace" -> "backspace"
    "Space" -> " "
    other -> other
  }
}

/// The prefix as tmux writes it in the status line: `C-b`.
pub fn tmux_name(raw: String) -> String {
  case raw {
    "ctrl+" <> rest -> "C-" <> rest
    other -> other
  }
}

/// A key that types itself into a line: one character, no modifier.
pub fn printable(raw: String) -> Result(String, Nil) {
  case raw {
    " " | "space" -> Ok(" ")
    _ ->
      case string.length(raw) == 1 {
        True -> Ok(raw)
        False -> Error(Nil)
      }
  }
}

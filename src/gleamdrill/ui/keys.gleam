//// The keys every screen shares: the `?` cheatsheet, and the one overlay
//// that owns the keyboard whichever page is up. Each page brings its own
//// table (`page/<name>/keys`); the status bar and the help overlay list
//// whichever is live.

import gleamdrill/model.{type Model}
import gleamdrill/msg.{type Msg, HelpToggled}
import gleamdrill/ui/binding.{type Binding, Binding}

/// The rows of an overlay that owns the keyboard right now, if any. While
/// the cheatsheet is up it does.
pub fn overlay(m: Model) -> Result(List(Binding(Msg)), Nil) {
  case m.help_open {
    True ->
      Ok([
        Binding(["Escape", "?"], "close", "Close this cheatsheet", HelpToggled),
      ])
    False -> Error(Nil)
  }
}

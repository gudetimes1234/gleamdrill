//// The keys every screen shares: the `?` cheatsheet, and the one overlay
//// that owns the keyboard whichever page is up. Each page brings its own
//// table (`page/<name>/keys`); the status bar and the help overlay list
//// whichever is live.

import gleam/option.{None, Some}
import gleamdrill/model.{type Model}
import gleamdrill/msg.{type Msg, HelpToggled}
import gleamdrill/ui/binding.{type Binding, Binding}
import gleamdrill/ui/tmux/chooser

/// The rows of an overlay that owns the keyboard right now, if any. While
/// tmux's choose-tree or the cheatsheet is up it does.
pub fn overlay(m: Model) -> Result(List(Binding(Msg)), Nil) {
  case m.chooser, m.help_open {
    Some(_), _ -> Ok(chooser.bindings())
    None, True ->
      Ok([
        Binding(["Escape", "?"], "close", "Close this cheatsheet", HelpToggled),
      ])
    None, False -> Error(Nil)
  }
}

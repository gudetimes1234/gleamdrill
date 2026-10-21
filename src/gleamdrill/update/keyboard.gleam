//// The keyboard: the `,` leader, and where a key goes depending on what has
//// focus. `step` is the whole decision, pure; the app carries it out against
//// the page on screen.

import gleamdrill/model.{type Model, DrillRoute, Model}
import gleamdrill/msg.{type Msg}
import gleamdrill/page/sitting/msg as sitting_msg
import lustre/effect.{type Effect}

/// What one keystroke comes to, before anything is dispatched.
pub type Step {
  /// Nothing to do.
  Ignore
  /// Hand focus back to the app (Escape in an input).
  Blur
  /// A message the key resolved to.
  Send(Msg)
}

/// The keyboard as a pure function: the leader state it leaves behind, and
/// what the key means. `lookup` is the page's table, overlays first.
pub fn step(
  m: Model,
  key: msg.Key,
  lookup: fn(Model, msg.Key) -> Result(Msg, Nil),
) -> #(Model, Step) {
  // The `,` leader: one-shot rescue for keys a focused button would
  // otherwise swallow. Arms from anywhere but the editor and inputs;
  // the next key routes through the app's table regardless of focus.
  let leader_capable = key.editing != "editor" && key.editing != "input"
  case m.prefix_armed, key.key == "," && leader_capable {
    False, True -> #(Model(..m, prefix_armed: True), Ignore)
    True, _ -> {
      let m = Model(..m, prefix_armed: False)
      case leader_capable && key.key != "," && key.key != "Escape" {
        True -> #(m, resolve(m, msg.Key(..key, editing: "none"), lookup))
        False -> #(m, Ignore)
      }
    }
    False, False -> #(m, route(m, key, lookup))
  }
}

pub fn toggle_help(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, help_open: !m.help_open), effect.none())
}

fn route(
  m: Model,
  key: msg.Key,
  lookup: fn(Model, msg.Key) -> Result(Msg, Nil),
) -> Step {
  case key.editing {
    // The editor's own keymaps own the keyboard; the one thing the app
    // claims there is Ctrl+Enter, so write -> run -> grade needs no mouse.
    "editor" ->
      case key.ctrl && key.key == "Enter" && m.route == DrillRoute {
        True -> Send(msg.SittingMsg(sitting_msg.UserClickedRun))
        False -> Ignore
      }
    // Inputs keep their keys; Escape hands focus back to the app.
    "input" ->
      case key.key {
        "Escape" -> Blur
        _ -> Ignore
      }
    // A focused button activates natively; stay out of its way — except
    // for Escape, which activates nothing and would otherwise die on
    // whichever button was clicked last (grade, reveal, run).
    "control" ->
      case key.key {
        "Escape" -> resolve(m, key, lookup)
        _ -> Ignore
      }
    _ -> resolve(m, key, lookup)
  }
}

fn resolve(
  m: Model,
  key: msg.Key,
  lookup: fn(Model, msg.Key) -> Result(Msg, Nil),
) -> Step {
  case lookup(m, key) {
    Ok(resolved) -> Send(resolved)
    Error(Nil) -> Ignore
  }
}

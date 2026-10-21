//// The keyboard: the `,` leader, and where a key goes depending on what has
//// focus. A key that resolves to a message goes back through `dispatch` --
//// the controller's own `handle` -- since this module sits below it.

import gleamdrill/browser
import gleamdrill/keys
import gleamdrill/model.{type Model, DrillRoute, Model}
import gleamdrill/msg.{type Msg, UserClickedRun}
import gleamdrill/update/common
import lustre/effect.{type Effect}

pub fn pressed(
  m: Model,
  key: msg.Key,
  dispatch: fn(Model, Msg) -> #(Model, Effect(Msg)),
) -> #(Model, Effect(Msg)) {
  // The `,` leader: one-shot rescue for keys a focused button would
  // otherwise swallow. Arms from anywhere but the editor and inputs;
  // the next key routes through the app's table regardless of focus.
  let leader_capable = key.editing != "editor" && key.editing != "input"
  case m.prefix_armed, key.key == "," && leader_capable {
    False, True -> #(Model(..m, prefix_armed: True), effect.none())
    True, _ -> {
      let m = Model(..m, prefix_armed: False)
      case leader_capable && key.key != "," && key.key != "Escape" {
        True -> resolve(m, msg.Key(..key, editing: "none"), dispatch)
        False -> #(m, effect.none())
      }
    }
    False, False -> route(m, key, dispatch)
  }
}

pub fn toggle_help(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, help_open: !m.help_open), effect.none())
}

fn route(
  m: Model,
  key: msg.Key,
  dispatch: fn(Model, Msg) -> #(Model, Effect(Msg)),
) -> #(Model, Effect(Msg)) {
  case key.editing {
    // The editor's own keymaps own the keyboard; the one thing the app
    // claims there is Ctrl+Enter, so write -> run -> grade needs no mouse.
    "editor" ->
      case key.ctrl && key.key == "Enter" && m.route == DrillRoute {
        True -> dispatch(m, UserClickedRun)
        False -> #(m, effect.none())
      }
    // Inputs keep their keys; Escape hands focus back to the app.
    "input" ->
      case key.key {
        "Escape" -> #(m, common.run_effect(browser.blur_active))
        _ -> #(m, effect.none())
      }
    // A focused button activates natively; stay out of its way — except
    // for Escape, which activates nothing and would otherwise die on
    // whichever button was clicked last (grade, reveal, run).
    "control" ->
      case key.key {
        "Escape" -> resolve(m, key, dispatch)
        _ -> #(m, effect.none())
      }
    _ -> resolve(m, key, dispatch)
  }
}

fn resolve(
  m: Model,
  key: msg.Key,
  dispatch: fn(Model, Msg) -> #(Model, Effect(Msg)),
) -> #(Model, Effect(Msg)) {
  case keys.dispatch(m, key) {
    Ok(resolved) -> dispatch(m, resolved)
    Error(Nil) -> #(m, effect.none())
  }
}

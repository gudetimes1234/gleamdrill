//// The keyboard: tmux's Ctrl+b prefix, the `,` leader, and where a key goes
//// depending on what has focus. `step` is the whole decision, pure; the app carries it out against
//// the page on screen.

import gleam/option.{None, Some}
import gleamdrill/model.{type Model, DrillRoute, Leader, Model, NoPrefix, Tmux}
import gleamdrill/msg.{type Msg}
import gleamdrill/page/sitting/msg as sitting_msg
import gleamdrill/ui/tmux/prefix
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

/// The keyboard as a pure function: the prefix state it leaves behind, and
/// what the key means. `lookup` is the page's table, overlays first.
pub fn step(
  m: Model,
  key: msg.Key,
  lookup: fn(Model, msg.Key) -> Result(Msg, Nil),
) -> #(Model, Step) {
  case key.key {
    // A modifier on its own is half a chord (Shift for `:` or `?`): it
    // neither spends an armed prefix nor clears a message.
    "Shift" | "Control" | "Alt" | "Meta" -> #(m, Ignore)
    _ -> armed(Model(..m, status_message: None), key, lookup)
  }
}

fn armed(
  m: Model,
  key: msg.Key,
  lookup: fn(Model, msg.Key) -> Result(Msg, Nil),
) -> #(Model, Step) {
  // The `,` leader: one-shot rescue for keys a focused button would
  // otherwise swallow. Arms from anywhere but the editor and inputs;
  // the next key routes through the app's table regardless of focus.
  let leader_capable = key.editing != "editor" && key.editing != "input"
  // tmux's prefix arms from anywhere, the editor included: the browser
  // listener takes it, and the key after it, before CodeMirror sees either.
  let tmux_prefix = key.ctrl && !key.shift && key.key == "b"
  case m.prefix {
    NoPrefix ->
      case tmux_prefix, key.key == "," && leader_capable {
        True, _ -> #(Model(..m, prefix: Tmux), Ignore)
        False, True -> #(Model(..m, prefix: Leader), Ignore)
        False, False -> #(m, route(m, key, lookup))
      }
    Tmux -> {
      let m = Model(..m, prefix: NoPrefix)
      case key.key, prefix.lookup(key) {
        "Escape", _ -> #(m, Ignore)
        _, Ok(command) -> #(m, Send(msg.CommandRun(command)))
        // Not a tmux key: the page's own, as the leader would have it.
        _, Error(Nil) -> #(
          m,
          resolve(m, msg.Key(..key, ctrl: False, editing: "none"), lookup),
        )
      }
    }
    Leader -> {
      let m = Model(..m, prefix: NoPrefix)
      case leader_capable && key.key != "," && key.key != "Escape" {
        True -> #(m, resolve(m, msg.Key(..key, editing: "none"), lookup))
        False -> #(m, Ignore)
      }
    }
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
    // The command prompt is an input too, and Escape there closes it.
    "input" ->
      case key.key, m.command_prompt {
        "Escape", Some(_) -> Send(msg.PromptClosed)
        "Escape", None -> Blur
        _, _ -> Ignore
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

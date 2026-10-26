//// The tmux status line: the session, the window list, the screen's context,
//// then the keybindings live right now.
////
//// Rendered from the same table the dispatcher reads, so a hint can never
//// promise a key that does nothing. Every hint and every window is also a
//// button, so the keyboard is the fast path but never the only one. While
//// the `C-b :` prompt is open it takes the whole line, as tmux's does; a
//// display-message takes the hints' place until the next key.

import gleam/dynamic/decode
import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleam/string
import gleamdrill/domain/track
import gleamdrill/model.{type Model, Leader, NoPrefix, Tmux}
import gleamdrill/msg.{type Msg}
import gleamdrill/ui/binding.{type Binding}
import gleamdrill/ui/tmux/command
import gleamdrill/ui/tmux/windows
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

/// How many hints fit comfortably; the rest live in the `?` overlay.
const visible_hints = 8

/// `rows` are the keys live right now; `label` names the screen's context.
pub fn view(m: Model, rows: List(Binding(Msg)), label: String) -> Element(Msg) {
  case m.command_prompt {
    Some(prompt) -> command_line(prompt.text)
    None ->
      html.div([attribute.class("statusbar")], [
        session(m),
        window_list(m),
        html.span([attribute.class("statusbar-context")], [html.text(label)]),
        prefix_chip(m),
        case m.status_message {
          Some(text) ->
            html.span([attribute.class("statusbar-message")], [
              html.text(text),
            ])
          None ->
            html.div(
              [attribute.class("statusbar-hints")],
              rows
                |> list.take(visible_hints)
                |> list.map(hint),
            )
        },
      ])
  }
}

/// tmux's `[session]`: the track, by its slug.
fn session(m: Model) -> Element(Msg) {
  html.button(
    [
      attribute.class("statusbar-session"),
      attribute.title("Choose a track (C-b s)"),
      event.on_click(msg.CommandRun(command.ChooseSession)),
    ],
    [
      html.text(case m.active_track {
        "" -> "[-]"
        name -> "[" <> track.slug(name) <> "]"
      }),
    ],
  )
}

/// `0:study* 1:browse- 2:queue`: `*` the window up, `-` the last one.
fn window_list(m: Model) -> Element(Msg) {
  let here = windows.current(m)
  let last = windows.last(m)
  html.div(
    [attribute.class("statusbar-windows")],
    list.map(windows.all(m), fn(window) {
      let current = here == Ok(window)
      let flag = case current, last == Ok(window) {
        True, _ -> "*"
        False, True -> "-"
        False, False -> ""
      }
      html.button(
        [
          attribute.classes([
            #("status-window", True),
            #("status-window-current", current),
          ]),
          attribute.title("C-b " <> int.to_string(window.index)),
          event.on_click(
            msg.CommandRun(command.SelectWindow(command.Index(window.index))),
          ),
        ],
        [html.text(int.to_string(window.index) <> ":" <> window.name <> flag)],
      )
    }),
  )
}

/// Which prefix is armed: quiet until one is, accent while it waits.
fn prefix_chip(m: Model) -> Element(Msg) {
  html.span(
    [
      attribute.classes([
        #("leader-chip", True),
        #("leader-armed", m.prefix != NoPrefix),
      ]),
      attribute.title(
        "C-b then a key runs a tmux command; , then a key uses a shortcut even while a button has focus",
      ),
    ],
    [
      html.text(case m.prefix {
        NoPrefix -> "C-b"
        Tmux -> "C-b \u{2026}"
        Leader -> ", \u{2026}"
      }),
    ],
  )
}

/// tmux's command prompt. Enter runs the line, Tab completes the command,
/// Up and Down walk the history, Escape closes (the keyboard handles that
/// one, as it does Escape in every input).
fn command_line(text: String) -> Element(Msg) {
  html.div([attribute.class("statusbar statusbar-prompt")], [
    html.span([attribute.class("statusbar-prompt-colon")], [html.text(":")]),
    html.input([
      attribute.class("command-prompt"),
      attribute.type_("text"),
      attribute.value(text),
      attribute.autocomplete("off"),
      attribute.attribute("spellcheck", "false"),
      attribute.attribute("aria-label", "tmux command"),
      event.on_input(msg.PromptEdited),
      prompt_keys(),
    ]),
  ])
}

fn prompt_keys() -> attribute.Attribute(Msg) {
  event.advanced("keydown", {
    use key <- decode.field("key", decode.string)
    case key {
      // Stopped here: the document's listener would otherwise take the
      // same Enter as a key on the screen and clear the message it set.
      "Enter" | "Tab" | "ArrowUp" | "ArrowDown" ->
        decode.success(event.handler(
          dispatch: msg.PromptKey(key),
          prevent_default: True,
          stop_propagation: True,
        ))
      _ ->
        decode.failure(
          event.handler(
            dispatch: msg.PromptKey(key),
            prevent_default: False,
            stop_propagation: False,
          ),
          "key",
        )
    }
  })
}

fn hint(binding: Binding(Msg)) -> Element(Msg) {
  html.button(
    [
      attribute.class("keyhint"),
      attribute.title(binding.help),
      event.on_click(binding.msg),
    ],
    [
      html.span([attribute.class("keyhint-keys")], [
        html.text(binding.keys |> list.map(show_key) |> string.join("/")),
      ]),
      html.span([attribute.class("keyhint-label")], [html.text(binding.hint)]),
    ],
  )
}

fn show_key(key: String) -> String {
  case key {
    " " -> "space"
    "Enter" -> "\u{21b5}"
    "Escape" -> "esc"
    "ArrowUp" -> "\u{2191}"
    "ArrowDown" -> "\u{2193}"
    "ArrowLeft" -> "\u{2190}"
    "ArrowRight" -> "\u{2192}"
    other -> other
  }
}

//// The tmux-style status line: context on the left, live keybindings after.
////
//// Rendered from the same table the dispatcher reads, so a hint can never
//// promise a key that does nothing. Every hint is also a button dispatching
//// the same message — the keyboard is the fast path, not the only path.

import algodrill/keys
import algodrill/model.{type Model, type Msg}
import gleam/list
import gleam/string
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

/// How many hints fit comfortably; the rest live in the `?` overlay.
const visible_hints = 8

pub fn view(m: Model) -> Element(Msg) {
  html.div([attribute.class("statusbar")], [
    html.span([attribute.class("statusbar-context")], [
      html.text(keys.context_label(m)),
    ]),
    html.div(
      [attribute.class("statusbar-hints")],
      keys.bindings(m)
        |> list.take(visible_hints)
        |> list.map(hint),
    ),
  ])
}

fn hint(binding: keys.Binding) -> Element(Msg) {
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
    other -> other
  }
}

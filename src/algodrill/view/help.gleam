//// The `?` cheatsheet: the full binding table for wherever you are.

import algodrill/keys
import algodrill/model.{type Model, type Msg, HelpToggled}
import algodrill/view/links
import gleam/list
import gleam/string
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

pub fn view(m: Model) -> Element(Msg) {
  case m.help_open {
    False -> element.none()
    True ->
      html.div(
        [
          attribute.class("help-overlay"),
          attribute.role("dialog"),
          attribute.attribute("aria-label", "Keyboard shortcuts"),
          // Clicking the backdrop closes; clicks on the card stop below.
          event.on_click(HelpToggled),
        ],
        [
          html.div([attribute.class("help-card")], [
            html.h2([attribute.class("help-title")], [
              html.text("Keys \u{b7} " <> keys.context_label(m)),
            ]),
            html.div(
              [attribute.class("help-rows")],
              // The overlay shows the table for the screen underneath it, so
              // the model is read with help_open off.
              keys.bindings(model.Model(..m, help_open: False))
                |> list.map(row),
            ),
            html.p([attribute.class("help-footnote")], [
              html.text(
                "Clicked a button and the keys went dead? Press , then the "
                <> "key \u{2014} the leader works whatever has focus. "
                <> "In the editor, only Ctrl+Enter (run) is claimed \u{2014} its "
                <> "vim and emacs keymaps keep everything else. Ctrl+F finds "
                <> "in your code; Tab indents, and Esc then Tab moves focus "
                <> "out. Esc leaves the search box.",
              ),
            ]),
            // Anyone reading the cheatsheet is a repeat user, which makes this
            // the one place in the app where an ask is not an interruption.
            html.p([attribute.class("help-footnote")], [
              html.text("AlgoDrill is free and open source. "),
              links.external("Sponsor", links.sponsor),
              html.text(" or "),
              links.external("Liberapay", links.liberapay),
              html.text(" keeps the server running \u{2014} "),
              links.external("source on GitHub", links.repo),
              html.text("."),
            ]),
          ]),
        ],
      )
  }
}

fn row(binding: keys.Binding) -> Element(Msg) {
  html.div([attribute.class("help-row")], [
    html.span([attribute.class("help-keys")], [
      html.text(binding.keys |> list.map(show_key) |> string.join(" or ")),
    ]),
    html.span([attribute.class("help-desc")], [html.text(binding.help)]),
  ])
}

fn show_key(key: String) -> String {
  case key {
    " " -> "space"
    "Enter" -> "enter"
    "Escape" -> "esc"
    other -> other
  }
}

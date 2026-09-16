//// The `?` cheatsheet: the full binding table for wherever you are.

import gleam/list
import gleam/string
import gleamdrill/keys
import gleamdrill/model.{type Model, type Msg, HelpToggled}
import gleamdrill/view/links
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

/// The way into the cheatsheet when there is no keyboard to press `?` on.
/// The stylesheet shows it only on touch and narrow screens, where the status
/// bar (the other clickable route in) is hidden.
pub fn button(m: Model) -> Element(Msg) {
  case m.help_open {
    True -> element.none()
    False ->
      html.button(
        [
          attribute.class("help-fab"),
          attribute.attribute("aria-label", "Help and keyboard shortcuts"),
          event.on_click(HelpToggled),
        ],
        [html.text("?")],
      )
  }
}

pub fn view(m: Model) -> Element(Msg) {
  case m.help_open {
    False -> element.none()
    True ->
      html.div(
        [
          attribute.class("help-overlay"),
          attribute.role("dialog"),
          attribute.attribute("aria-modal", "true"),
          attribute.attribute("aria-labelledby", "help-title"),
          // Clicking the backdrop closes; clicks on the card stop below.
          event.on_click(HelpToggled),
        ],
        [
          html.div([attribute.class("help-card")], [
            html.h2(
              [attribute.class("help-title"), attribute.id("help-title")],
              [html.text("Help \u{b7} " <> keys.context_label(m))],
            ),
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
              html.text("GleamDrill is free and open source. "),
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

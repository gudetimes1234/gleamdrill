//// The `?` cheatsheet: the full binding table for wherever you are.

import gleam/list
import gleam/string
import gleamdrill/model.{type Model}
import gleamdrill/msg.{type Msg, HelpToggled}
import gleamdrill/ui/binding.{type Binding}
import gleamdrill/ui/links
import gleamdrill/ui/tmux/command
import gleamdrill/ui/tmux/prefix
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

/// `rows` are the screen's own keys, listed under the overlay; `label` names it.
pub fn view(m: Model, rows: List(Binding(Msg)), label: String) -> Element(Msg) {
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
              [html.text("Help \u{b7} " <> label)],
            ),
            html.div(
              [attribute.class("help-rows")],
              // The table for the screen underneath the overlay.
              list.map(rows, row),
            ),
            html.h3([attribute.class("help-section")], [
              html.text("Prefix \u{b7} C-b, then"),
            ]),
            html.div([attribute.class("help-rows")], prefix_rows()),
            html.p([attribute.class("help-footnote")], [
              html.text(
                "C-b works everywhere, the editor included, as tmux's prefix "
                <> "does: the windows are the screens, the panes the drill's "
                <> "regions, the sessions your tracks. C-b C-b sends C-b on "
                <> "to the editor. Clicked a button and the keys went dead? "
                <> "Press , then the key \u{2014} the leader works whatever "
                <> "has focus. In the editor, Ctrl+Enter (run) and C-b are "
                <> "claimed \u{2014} its vim and emacs keymaps keep everything "
                <> "else. Ctrl+F finds in your code; Tab indents, and Esc then "
                <> "Tab moves focus out. Esc leaves the search box.",
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

/// tmux's list-keys, from the table the prefix dispatches on. The ten
/// window digits share one row.
fn prefix_rows() -> List(Element(Msg)) {
  let rest =
    list.filter(prefix.table(), fn(bind) {
      case bind.command {
        command.SelectWindow(command.Index(_)) -> False
        _ -> True
      }
    })
  [
    prefix_row("0\u{2026}9", "select-window -t :=N", "Window by number"),
    ..list.map(rest, fn(bind) {
      prefix_row(
        prefix.key_name(bind),
        command.to_string(bind.command),
        bind.note,
      )
    })
  ]
}

fn prefix_row(key: String, line: String, note: String) -> Element(Msg) {
  html.div([attribute.class("help-row")], [
    html.span([attribute.class("help-keys")], [html.text(key)]),
    html.span([attribute.class("help-desc")], [
      html.text(note <> " "),
      html.code([attribute.class("help-command")], [html.text(line)]),
    ]),
  ])
}

fn row(binding: Binding(Msg)) -> Element(Msg) {
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
    "ArrowUp" -> "\u{2191}"
    "ArrowDown" -> "\u{2193}"
    "ArrowLeft" -> "\u{2190}"
    "ArrowRight" -> "\u{2192}"
    other -> other
  }
}

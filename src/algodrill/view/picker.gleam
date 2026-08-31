//// The first-run language choice.
////
//// The catalogue is the same 150 problems repeated once per language, as four
//// separate categories with four independent card sets. Left unasked, the
//// study queue simply starts at the top of the catalogue -- which means one
//// language, for months, with no sign the other three exist. So it asks.
////
//// Nothing is pre-ticked on purpose. A default here is not a convenience: it
//// is a months-long commitment made on the user's behalf, in a choice they
//// cannot see the consequences of yet.

import algodrill/model.{
  type Model, type Msg, PickerConfirmed, PickerToggledLanguage,
}
import algodrill/problems
import gleam/list
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

pub fn view(m: Model) -> Element(Msg) {
  let chosen = m.picked_languages
  let none_yet = chosen == []

  html.div([attribute.class("picker-screen")], [
    html.header([attribute.class("study-header")], [
      html.h1([attribute.class("study-title")], [html.text("AlgoDrill")]),
    ]),
    html.h2([attribute.class("picker-question")], [
      html.text("What do you want to drill?"),
    ]),
    html.p([attribute.class("picker-explainer")], [
      html.text(
        "The same problems are here in every language, each scheduled "
        <> "separately. Pick one to start; you can change this later, and "
        <> "adding a language never disturbs what you have already learned.",
      ),
    ]),
    html.div(
      [attribute.class("picker-options")],
      list.map(problems.language_options(), fn(option) {
        let #(tag, label) = option
        let picked = list.contains(chosen, tag)
        html.button(
          [
            attribute.classes([#("picker-option", True), #("picked", picked)]),
            attribute.attribute("aria-pressed", case picked {
              True -> "true"
              False -> "false"
            }),
            event.on_click(PickerToggledLanguage(tag)),
          ],
          [
            html.span([attribute.class("picker-check")], [
              html.text(case picked {
                True -> "\u{2713}"
                False -> ""
              }),
            ]),
            html.span([attribute.class("picker-option-label")], [
              html.text(label),
            ]),
          ],
        )
      }),
    ),
    html.div([attribute.class("picker-actions")], [
      html.button(
        [
          attribute.class("primary picker-start"),
          attribute.disabled(none_yet),
          event.on_click(PickerConfirmed),
        ],
        [html.text("Start studying")],
      ),
    ]),
    html.p([attribute.class("picker-hint")], [
      html.text(case none_yet {
        True -> "Pick at least one."
        False -> plural(list.length(chosen))
      }),
    ]),
  ])
}

/// Says what picking more than one actually does, because interleaving is the
/// part that is not obvious from a row of buttons.
fn plural(count: Int) -> String {
  case count {
    1 -> "New problems will come from this one."
    _ -> "New problems will alternate between them."
  }
}

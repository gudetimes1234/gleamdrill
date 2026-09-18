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

import gleam/list
import gleamdrill/model.{
  type Model, type Msg, PickerConfirmed, PickerConfirmedWithStarter,
  PickerToggledLanguage,
}
import gleamdrill/problems
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

pub fn view(m: Model) -> Element(Msg) {
  let chosen = m.picked_languages
  let none_yet = chosen == []

  html.div([attribute.class("picker-screen")], [
    html.header([attribute.class("study-header")], [
      html.h1([attribute.class("study-title")], [html.text("GleamDrill")]),
    ]),
    // The one sentence of "what is this" a first visit gets. Everything else
    // the README says is discoverable from the screens themselves.
    html.p([attribute.class("picker-blurb")], [
      html.text(
        "GleamDrill schedules algorithm problems with spaced repetition. "
        <> "Type each one from memory, run it against real tests, grade "
        <> "yourself, and it comes back right before you would forget it.",
      ),
    ]),
    html.h2([attribute.class("picker-question")], [
      html.text("Which languages do you want to drill?"),
    ]),
    html.p([attribute.class("picker-explainer")], [
      html.text(
        "The same problems are here in every language, each scheduled "
        <> "separately. Pick the ones a starter set should cover; the study "
        <> "queue is whatever you put in it, and adding a language later "
        <> "never disturbs what you have already learned.",
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
      // The starter set is the primary action: twenty problems per language,
      // queued, and the first sitting one click away. Curating the whole
      // catalogue is still there for people who know what they want.
      html.button(
        [
          attribute.class("study-start picker-starter"),
          attribute.disabled(none_yet),
          event.on_click(PickerConfirmedWithStarter),
        ],
        [html.text("Start with a starter set")],
      ),
      html.button(
        [
          attribute.class("study-secondary picker-start"),
          attribute.disabled(none_yet),
          event.on_click(PickerConfirmed),
        ],
        [html.text("Choose my own problems")],
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

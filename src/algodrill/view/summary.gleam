//// What a sitting actually did.
////
//// This replaces `alert("Session complete.")`, which was the entire reward for
//// finishing a session that may have run ninety minutes. A sitting is the unit
//// of work in this app; ending one deserves to show what it bought.
////
//// The next-review interval is read from the card store rather than from the
//// grade pressed. A failed run or a revealed solution is coerced to `Again`
//// server-side, so the grade on the button and the schedule that resulted are
//// not always the same thing -- and the card is the one that tells the truth.

import algodrill/insights
import algodrill/model.{
  type Model, type Msg, type SittingEntry, UserClickedExitReport,
}
import algodrill/view/format
import fsrs
import gleam/int
import gleam/list
import gleam/option
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

pub fn view(m: Model) -> Element(Msg) {
  // Recorded newest first, but a summary reads in the order you worked.
  let entries = list.reverse(m.sitting)
  let total_ms =
    list.fold(entries, 0, fn(sum, entry: SittingEntry) {
      sum + entry.duration_ms
    })

  html.div([attribute.class("summary-container")], [
    html.div([attribute.class("drill-header")], [
      html.button(
        [
          attribute.class("btn-secondary"),
          event.on_click(UserClickedExitReport),
        ],
        [
          html.text(case m.studying {
            True -> "\u{2190} Study"
            False -> "\u{2190} Menu"
          }),
        ],
      ),
      html.h2([attribute.class("drill-title")], [html.text("Session complete")]),
    ]),
    html.div([attribute.class("summary-body")], [
      html.div([attribute.class("summary-totals")], [
        tile(int.to_string(list.length(entries)), case list.length(entries) {
          1 -> "problem"
          _ -> "problems"
        }),
        tile(insights.duration_label(total_ms), "at the keyboard"),
        tile(int.to_string(m.today.reviews_done), "done today"),
      ]),
      panel("What you answered", case entries {
        [] ->
          html.div([attribute.class("pane-empty")], [
            html.text("Nothing was graded this sitting."),
          ])
        _ ->
          html.ul(
            [attribute.class("summary-rows")],
            list.map(entries, fn(entry) { row(m, entry) }),
          )
      }),
      panel("Still today", remaining(m)),
    ]),
  ])
}

/// One answered problem: what it was, how long it took, and when it returns.
fn row(m: Model, entry: SittingEntry) -> Element(Msg) {
  html.li([attribute.class("summary-row")], [
    html.span([attribute.class("summary-row-title")], [
      html.text(entry.problem.title),
    ]),
    html.span([attribute.class("summary-row-time")], [
      html.text(insights.duration_label(entry.duration_ms)),
    ]),
    html.span(
      [
        attribute.class("summary-row-grade grade-" <> grade_slug(entry.pressed)),
      ],
      [html.text(grade_label(entry.pressed))],
    ),
    html.span([attribute.class("summary-row-next")], [
      html.text(next_label(m, entry)),
    ]),
  ])
}

/// When the scheduler will bring this back, straight from the stored card.
/// `None` only if the review never landed, in which case saying nothing is
/// better than guessing.
fn next_label(m: Model, entry: SittingEntry) -> String {
  case model.card_for(m, entry.problem) {
    option.Some(state) ->
      "in " <> format.interval(fsrs.interval_seconds(state.card, m.now))
    option.None -> "\u{2014}"
  }
}

fn remaining(m: Model) -> Element(Msg) {
  let due = m.today.reviews_remaining
  let fresh = m.today.new_remaining
  html.p([attribute.class("summary-remaining")], [
    html.text(case due + fresh {
      0 -> "That is everything the scheduler had for today."
      _ ->
        "Budget left today: "
        <> int.to_string(due)
        <> " more reviews and "
        <> int.to_string(fresh)
        <> " new. Nothing is owed -- the schedule does not punish stopping."
    }),
  ])
}

fn grade_label(rating: fsrs.Rating) -> String {
  case rating {
    fsrs.Again -> "Again"
    fsrs.Hard -> "Hard"
    fsrs.Good -> "Good"
    fsrs.Easy -> "Easy"
  }
}

fn grade_slug(rating: fsrs.Rating) -> String {
  case rating {
    fsrs.Again -> "again"
    fsrs.Hard -> "hard"
    fsrs.Good -> "good"
    fsrs.Easy -> "easy"
  }
}

fn tile(value: String, label: String) -> Element(Msg) {
  html.div([attribute.class("summary-tile")], [
    html.span([attribute.class("summary-tile-value")], [html.text(value)]),
    html.span([attribute.class("summary-tile-label")], [html.text(label)]),
  ])
}

fn panel(title: String, body: Element(Msg)) -> Element(Msg) {
  html.div([attribute.class("panel")], [
    html.div([attribute.class("panel-title")], [html.text(title)]),
    body,
  ])
}

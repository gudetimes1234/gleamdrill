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

import fsrs
import gleam/int
import gleam/list
import gleam/option
import gleam/string
import gleamdrill/insights
import gleamdrill/model.{
  type Model, type Msg, type SittingEntry, UserClickedExitReport,
  UserClickedUndo,
}
import gleamdrill/view/format
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
      html.h2([attribute.class("drill-title")], [
        html.text(case m.blitz {
          option.Some(_) -> "Blitz over"
          option.None -> "Session complete"
        }),
      ]),
      case m.recall, m.blitz {
        True, _ ->
          html.span([attribute.class("recall-chip")], [html.text("Recall")])
        _, option.Some(_) ->
          html.span([attribute.class("recall-chip blitz-chip")], [
            html.text("\u{26a1} Blitz"),
          ])
        _, _ -> element.none()
      },
    ]),
    html.div([attribute.class("summary-body")], [
      scorecard(m, entries, total_ms),
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
      // The last grade can still be taken back from here: a slip on the
      // final card is the one you only notice once the sitting is over.
      case m.undo {
        option.Some(point) ->
          html.div([attribute.class("summary-undo")], [
            html.button(
              [
                attribute.class("btn-secondary undo-button"),
                attribute.type_("button"),
                event.on_click(UserClickedUndo),
              ],
              [html.text("\u{21b6} Undo the grade on " <> point.problem.title)],
            ),
          ])
        option.None -> element.none()
      },
      panel("Still today", remaining(m)),
    ]),
  ])
}

/// One answered problem: what it was, how long it took, and when it returns.
fn row(m: Model, entry: SittingEntry) -> Element(Msg) {
  html.li([attribute.class("summary-row")], [
    html.span([attribute.class("summary-row-title")], [
      format.language_tag(entry.problem.category),
      html.text(" " <> entry.problem.title),
    ]),
    html.span([attribute.class("summary-row-time")], [
      html.text(insights.duration_label(entry.duration_ms)),
      ..badges(m, entry)
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

/// The sitting as an achievement, not a list: the headline says what was
/// done, the tiles say how it went against the estimate the study screen
/// promised. A Blitz reads as a score instead.
fn scorecard(
  m: Model,
  entries: List(SittingEntry),
  total_ms: Int,
) -> Element(Msg) {
  case m.blitz {
    option.Some(blitz) -> blitz_scorecard(m, blitz, total_ms)
    option.None -> sitting_scorecard(m, entries, total_ms)
  }
}

fn sitting_scorecard(
  m: Model,
  entries: List(SittingEntry),
  total_ms: Int,
) -> Element(Msg) {
  let count = list.length(entries)
  let clean = list.count(entries, fn(entry: SittingEntry) { entry.clean })
  let bests = list.count(entries, fn(entry) { beat_median(m, entry) })
  let graduated = list.count(entries, fn(entry) { graduated(m, entry) })
  // What the study screen said these cards would cost, now settled.
  let estimate_ms = case m.insights {
    option.Some(data) ->
      option.Some(insights.queue_estimate_ms(
        insights.analyse(data, m.cards, m.now),
        list.map(entries, fn(entry: SittingEntry) { entry.problem }),
      ))
    option.None -> option.None
  }
  html.div([attribute.class("scorecard")], [
    html.p([attribute.class("scorecard-headline")], [
      html.text(
        int.to_string(count)
        <> case count {
          1 -> " card"
          _ -> " cards"
        }
        <> " \u{b7} "
        <> insights.duration_label(total_ms)
        <> case m.recall, clean {
          True, _ -> ""
          _, 0 -> ""
          _, 1 -> " \u{b7} 1 clean solve"
          _, n -> " \u{b7} " <> int.to_string(n) <> " clean solves"
        },
      ),
      case bests {
        0 -> element.none()
        1 ->
          html.span([attribute.class("scorecard-best")], [
            html.text(" \u{26a1} 1 personal best"),
          ])
        n ->
          html.span([attribute.class("scorecard-best")], [
            html.text(" \u{26a1} " <> int.to_string(n) <> " personal bests"),
          ])
      },
    ]),
    html.div([attribute.class("summary-totals")], [
      tile(int.to_string(count), case count {
        1 -> "card"
        _ -> "cards"
      }),
      tile(insights.duration_label(total_ms), case m.recall {
        True -> "thinking"
        False -> "at the keyboard"
      }),
      case m.recall {
        True -> tile(int.to_string(m.today.reviews_done), "done today")
        False -> tile(int.to_string(clean), "clean")
      },
      case estimate_ms {
        option.Some(ms) if ms > 0 ->
          case total_ms <= ms {
            True ->
              tile(
                insights.duration_label(ms - total_ms) <> " under",
                "estimate",
              )
            False ->
              tile(
                insights.duration_label(total_ms - ms) <> " over",
                "estimate",
              )
          }
        _ -> tile(int.to_string(m.today.reviews_done), "done today")
      },
    ]),
    case graduated {
      0 -> element.none()
      1 ->
        html.p([attribute.class("scorecard-note")], [
          html.text("\u{1f393} 1 card moved to a month or more."),
        ])
      n ->
        html.p([attribute.class("scorecard-note")], [
          html.text(
            "\u{1f393} "
            <> int.to_string(n)
            <> " cards moved to a month or more.",
          ),
        ])
    },
  ])
}

fn blitz_scorecard(
  m: Model,
  blitz: model.Blitz,
  total_ms: Int,
) -> Element(Msg) {
  let results = list.reverse(blitz.results)
  let total = list.length(results)
  let passed = list.count(results, fn(r: model.BlitzResult) { r.passed })
  let expired = list.count(results, fn(r: model.BlitzResult) { r.expired })
  let fastest =
    results
    |> list.filter(fn(r: model.BlitzResult) { r.passed })
    |> list.map(fn(r: model.BlitzResult) { r.duration_ms })
    |> list.reduce(int.min)
  let rank = model.blitz_rank(passed, total)
  html.div([attribute.class("scorecard scorecard-blitz")], [
    html.p([attribute.class("scorecard-headline")], [
      html.span([attribute.class("scorecard-score")], [
        html.text(int.to_string(passed) <> "/" <> int.to_string(total)),
      ]),
      html.text(" in " <> insights.duration_label(total_ms) <> " \u{2014} "),
      html.span(
        [attribute.class("scorecard-rank rank-" <> string.lowercase(rank))],
        [html.text(rank)],
      ),
    ]),
    html.div([attribute.class("summary-totals")], [
      tile(int.to_string(passed), "passed"),
      tile(int.to_string(expired), "ran out of time"),
      tile(
        case fastest {
          Ok(ms) -> insights.duration_label(ms)
          Error(Nil) -> "\u{2014}"
        },
        "fastest solve",
      ),
      tile(int.to_string(m.today.reviews_done), "done today"),
    ]),
    case expired {
      0 -> element.none()
      _ ->
        html.ul(
          [attribute.class("summary-rows")],
          results
            |> list.filter(fn(r: model.BlitzResult) { r.expired })
            |> list.map(fn(r: model.BlitzResult) {
              html.li([attribute.class("summary-row summary-row-expired")], [
                html.span([attribute.class("summary-row-title")], [
                  format.language_tag(r.problem.category),
                  html.text(" " <> r.problem.title),
                ]),
                html.span([attribute.class("summary-row-time")], [
                  html.text("\u{23f1} time"),
                ]),
                html.span([attribute.class("summary-row-grade")], [
                  html.text("not graded"),
                ]),
                html.span([attribute.class("summary-row-next")], [
                  html.text("\u{2014}"),
                ]),
              ])
            }),
        )
    },
  ])
}

/// The small marks a row can earn: a clean solve, a personal best.
fn badges(m: Model, entry: SittingEntry) -> List(Element(Msg)) {
  list.flatten([
    case entry.clean {
      True -> [
        html.span(
          [
            attribute.class("row-badge row-badge-clean"),
            attribute.attribute("title", "No hints past the nudge, no reveal"),
          ],
          [html.text("\u{2726} clean")],
        ),
      ]
      False -> []
    },
    case beat_median(m, entry) {
      True -> [
        html.span(
          [
            attribute.class("row-badge row-badge-best"),
            attribute.attribute(
              "title",
              "Faster than your median on this problem",
            ),
          ],
          [html.text("\u{26a1} best")],
        ),
      ]
      False -> []
    },
  ])
}

/// Faster than your median on this problem going into the sitting.
fn beat_median(m: Model, entry: SittingEntry) -> Bool {
  case m.insights, entry.passed {
    option.Some(data), True ->
      case insights.fluency_for(data, entry.problem) {
        option.Some(median) -> entry.duration_ms < median
        option.None -> False
      }
    _, _ -> False
  }
}

/// The card's next interval is a month or more: it has graduated from the
/// short loop into the long one.
fn graduated(m: Model, entry: SittingEntry) -> Bool {
  case model.card_for(m, entry.problem) {
    option.Some(state) ->
      fsrs.interval_seconds(state.card, m.now) >= 30 * 86_400
    option.None -> False
  }
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

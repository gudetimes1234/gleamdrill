//// The progress screen, rebuilt around the product's one promise: how many
//// problems can you write from memory in under three minutes?
////
//// Layout, top to bottom: the headline and its tier breakdown; how your
//// grades calibrate against what actually happens; the two problem lists
//// worth acting on; then the familiar heatmap and due forecast. Every number
//// is derived in `insights.gleam` from the review log — nothing here is
//// computed, only rendered.

import algodrill/api.{type ReviewRow, type Stats}
import algodrill/insights.{type Analysis, type CardInsight}
import algodrill/model.{
  type Model, type Msg, UserClickedBackToStudy, UserClosedDetail,
  UserOpenedDetail, UserToggledSuspend,
}
import algodrill/problem.{type ProblemRef}
import algodrill/problems
import algodrill/view/format
import fsrs
import gleam/dict
import gleam/int
import gleam/list
import gleam/option.{None, Some}
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

pub fn view(m: Model) -> Element(Msg) {
  html.div([attribute.class("stats-screen")], [
    html.header([attribute.class("study-header")], [
      html.h1([attribute.class("study-title")], [html.text("Progress")]),
      html.button(
        [attribute.class("link-button"), event.on_click(UserClickedBackToStudy)],
        [html.text("Back")],
      ),
    ]),
    case m.stats, m.insights {
      Some(stats), Some(data) ->
        case stats.total_reviews == 0 && dict.size(m.cards) == 0 {
          True ->
            html.p([attribute.class("study-summary")], [
              html.text("No reviews yet. Study a few cards and this fills in."),
            ])
          False -> body(m, stats, insights.analyse(data, m.cards, m.now))
        }
      _, _ ->
        html.p([attribute.class("study-summary")], [html.text("Loading…")])
    },
    detail_overlay(m),
  ])
}

fn body(m: Model, stats: Stats, analysis: Analysis) -> Element(Msg) {
  element.fragment([
    headline(stats, analysis),
    tier_bar(analysis),
    calibration_panel(m),
    problem_lists(m, analysis),
    section("Reviews per day", heatmap(stats)),
    section("Due in the next 30 days", forecast(stats)),
  ])
}

// --- the headline ----------------------------------------------------------

fn headline(stats: Stats, analysis: Analysis) -> Element(Msg) {
  html.div([attribute.class("stats-tiles")], [
    html.div([attribute.class("stats-tile stats-tile-hero")], [
      html.span([attribute.class("stats-tile-value")], [
        html.text(int.to_string(analysis.fluent)),
      ]),
      html.span([attribute.class("stats-tile-label")], [
        html.text("under 3 minutes"),
      ]),
      case analysis.fluent_this_week {
        0 -> element.none()
        n ->
          html.span([attribute.class("stats-tile-delta")], [
            html.text("\u{25b4}" <> int.to_string(n) <> " this week"),
          ])
      },
    ]),
    tile(int.to_string(dict_size_label(analysis)), "problems started"),
    tile(int.to_string(stats.streak_days), "day streak"),
    tile(retention(stats), "true retention"),
  ])
}

fn dict_size_label(analysis: Analysis) -> Int {
  list.length(analysis.cards)
}

/// Anki's "true retention": of the cards that had already graduated, how many
/// came back correctly. Learning-phase answers say nothing about long-term
/// recall, so they are excluded.
fn retention(stats: Stats) -> String {
  case stats.mature_reviews {
    0 -> "\u{2014}"
    total -> int.to_string(stats.mature_correct * 100 / total) <> "%"
  }
}

// --- tiers -----------------------------------------------------------------

fn tier_bar(analysis: Analysis) -> Element(Msg) {
  let rows = [
    #("fluent", "Fluent \u{b7} under 3m", analysis.fluent),
    #("solid", "Solid \u{b7} under 8m", analysis.solid),
    #("grinding", "Grinding", analysis.grinding),
    #("learning", "Still learning", analysis.still_learning),
  ]
  let peak = list.fold(rows, 1, fn(acc, row) { int.max(acc, row.2) })

  section(
    "Where your problems stand",
    html.div(
      [attribute.class("state-bars")],
      list.map(rows, fn(row) {
        let #(kind, label, count) = row
        html.div([attribute.class("state-row")], [
          html.span([attribute.class("state-label")], [html.text(label)]),
          html.div([attribute.class("state-track")], [
            html.div(
              [
                attribute.class("state-fill tier-" <> kind),
                attribute.style(
                  "width",
                  int.to_string(int.max(2, count * 100 / peak)) <> "%",
                ),
              ],
              [],
            ),
          ]),
          html.span([attribute.class("state-count")], [
            html.text(int.to_string(count)),
          ]),
        ])
      }),
    ),
  )
}

// --- calibration -----------------------------------------------------------

fn calibration_panel(m: Model) -> Element(Msg) {
  case m.insights {
    None -> element.none()
    Some(data) -> {
      let view = insights.calibration_view(data.calibration)
      case view.rows {
        [] -> element.none()
        rows ->
          section(
            "When you press\u{2026} does it stick?",
            element.fragment([
              html.div(
                [attribute.class("state-bars")],
                list.map(rows, calibration_row),
              ),
              case view.verdict {
                Some(text) ->
                  html.p([attribute.class("calibration-verdict")], [
                    html.text(text),
                  ])
                None ->
                  html.p([attribute.class("calibration-verdict quiet")], [
                    html.text(
                      "Too few repeat reviews to judge your grading yet.",
                    ),
                  ])
              },
            ]),
          )
      }
    }
  }
}

fn calibration_row(row: api.Calibration) -> Element(Msg) {
  let percent = case row.total {
    0 -> 0
    total -> row.passed * 100 / total
  }
  let #(name, kind) = case row.rating {
    fsrs.Again -> #("Again", "again")
    fsrs.Hard -> #("Hard", "hard")
    fsrs.Good -> #("Good", "good")
    fsrs.Easy -> #("Easy", "easy")
  }
  html.div([attribute.class("state-row")], [
    html.span([attribute.class("state-label grade-name-" <> kind)], [
      html.text(name),
    ]),
    html.div([attribute.class("state-track")], [
      html.div(
        [
          attribute.class("state-fill tier-fluent"),
          attribute.style("width", int.to_string(int.max(2, percent)) <> "%"),
        ],
        [],
      ),
    ]),
    html.span([attribute.class("state-count")], [
      html.text(int.to_string(percent) <> "% of " <> int.to_string(row.total)),
    ]),
  ])
}

// --- the problem lists -----------------------------------------------------

fn problem_lists(m: Model, analysis: Analysis) -> Element(Msg) {
  let #(needs, mastered) = insights.attention_lists(analysis)
  let offset = list.length(needs)
  element.fragment([
    case needs {
      [] -> element.none()
      _ ->
        section(
          "Needs attention",
          html.div(
            [attribute.class("problem-rows")],
            list.index_map(needs, fn(card, index) {
              problem_row(m, card, index)
            }),
          ),
        )
    },
    case mastered {
      [] -> element.none()
      _ ->
        section(
          "Recently mastered",
          html.div(
            [attribute.class("problem-rows")],
            list.index_map(mastered, fn(card, index) {
              problem_row(m, card, offset + index)
            }),
          ),
        )
    },
  ])
}

fn problem_row(m: Model, card: CardInsight, index: Int) -> Element(Msg) {
  let here = m.nav.stats == index
  html.button(
    [
      attribute.classes([#("problem-row", True), #("cursor", here)]),
      attribute.id("stat-" <> int.to_string(index)),
      event.on_click(UserOpenedDetail(card.problem)),
    ],
    [
      html.span([attribute.class("problem-row-title")], [
        html.text(card.problem.title),
      ]),
      html.span([attribute.class("lang-tag")], [
        html.text(problems.language_tag(card.problem.category)),
      ]),
      html.span([attribute.class("problem-row-time")], [
        html.text(case card.fluency_ms {
          Some(ms) -> insights.duration_label(ms)
          None -> "no clean solve"
        }),
      ]),
      trend_arrow(card),
      html.span([attribute.class("problem-row-due")], [
        html.text(
          "due "
          <> format.interval(fsrs.interval_seconds(card.card.card, m.now)),
        ),
      ]),
    ],
  )
}

fn trend_arrow(card: CardInsight) -> Element(Msg) {
  case card.trend_ms {
    Some(delta) if delta < 0 ->
      html.span([attribute.class("trend trend-down")], [html.text("\u{2198}")])
    Some(delta) if delta > 0 ->
      html.span([attribute.class("trend trend-up")], [html.text("\u{2197}")])
    _ -> html.span([attribute.class("trend")], [html.text("\u{2192}")])
  }
}

// --- the review timeline ---------------------------------------------------

fn detail_overlay(m: Model) -> Element(Msg) {
  case m.detail {
    None -> element.none()
    Some(#(problem, rows)) ->
      html.div(
        [attribute.class("help-overlay"), event.on_click(UserClosedDetail)],
        [
          html.div([attribute.class("help-card detail-card")], [
            html.h2([attribute.class("help-title")], [
              html.text(problem.title),
            ]),
            html.p([attribute.class("detail-context")], [
              html.text(
                problems.language_label(problem.category)
                <> " \u{203a} "
                <> problem.subcategory,
              ),
            ]),
            suspend_control(m, problem),
            case rows {
              None ->
                html.p([attribute.class("study-summary")], [
                  html.text("Loading\u{2026}"),
                ])
              Some([]) ->
                html.p([attribute.class("study-summary")], [
                  html.text("No reviews recorded yet."),
                ])
              Some(reviews) -> timeline(m, problem, reviews)
            },
          ]),
        ],
      )
  }
}

/// Park/resume from the card's own history view. stop_propagation: the
/// overlay's backdrop click closes it, and this button must not.
fn suspend_control(m: Model, problem: ProblemRef) -> Element(Msg) {
  case model.card_for(m, problem) {
    None -> element.none()
    Some(state) ->
      html.button(
        [
          attribute.class("study-secondary detail-suspend"),
          event.on_click(UserToggledSuspend(problem)) |> event.stop_propagation,
        ],
        [
          html.text(case state.suspended {
            True -> "\u{25b8} Resume scheduling"
            False -> "\u{23f8} Pause scheduling"
          }),
        ],
      )
  }
}

/// Every review as a bar: height is how long it took, color is the grade, a
/// ring marks a reveal. The story to see at a glance is bars shrinking and
/// turning green — eleven minutes becoming 2m41s.
fn timeline(
  m: Model,
  problem: ProblemRef,
  reviews: List(ReviewRow),
) -> Element(Msg) {
  let peak =
    list.fold(reviews, 1, fn(acc, row: ReviewRow) {
      int.max(acc, option.unwrap(row.duration_ms, 0))
    })
  let first = first_clean(reviews)
  let latest = last_clean(reviews)

  element.fragment([
    case first, latest {
      Some(a), Some(b) if a != b ->
        html.p([attribute.class("detail-journey")], [
          html.text(
            insights.duration_label(a)
            <> " \u{2192} "
            <> insights.duration_label(b),
          ),
        ])
      _, _ -> element.none()
    },
    html.div(
      [attribute.class("timeline")],
      list.map(reviews, fn(row) { timeline_bar(row, peak) }),
    ),
    html.p([attribute.class("detail-intervals")], [
      html.text(
        "Intervals: "
        <> {
          reviews
          |> list.map(fn(row: ReviewRow) {
            int.to_string(row.scheduled_days) <> "d"
          })
          |> join_with(" \u{b7} ")
        }
        <> " \u{2192} next "
        <> next_due(m, problem),
      ),
    ]),
  ])
}

fn timeline_bar(row: ReviewRow, peak: Int) -> Element(Msg) {
  let kind = case row.rating {
    fsrs.Again -> "again"
    fsrs.Hard -> "hard"
    fsrs.Good -> "good"
    fsrs.Easy -> "easy"
  }
  let duration = option.unwrap(row.duration_ms, 0)
  let height = int.max(8, duration * 100 / int.max(peak, 1))
  html.div([attribute.class("timeline-slot")], [
    html.div(
      [
        attribute.classes([
          #("timeline-bar", True),
          #("grade-fill-" <> kind, True),
          #("revealed", row.revealed),
        ]),
        attribute.style("height", int.to_string(height) <> "%"),
        attribute.title(
          case row.duration_ms {
            Some(ms) -> insights.duration_label(ms)
            None -> "untimed"
          }
          <> case row.revealed {
            True -> " \u{b7} solution revealed"
            False -> ""
          },
        ),
      ],
      [],
    ),
    html.span([attribute.class("timeline-caption")], [
      html.text(case row.duration_ms {
        Some(ms) -> insights.duration_label(ms)
        None -> "\u{2014}"
      }),
    ]),
  ])
}

fn first_clean(reviews: List(ReviewRow)) -> option.Option(Int) {
  reviews
  |> list.filter_map(fn(row: ReviewRow) {
    case clean(row), row.duration_ms {
      True, Some(ms) -> Ok(ms)
      _, _ -> Error(Nil)
    }
  })
  |> list.first
  |> option.from_result
}

fn last_clean(reviews: List(ReviewRow)) -> option.Option(Int) {
  reviews
  |> list.filter_map(fn(row: ReviewRow) {
    case clean(row), row.duration_ms {
      True, Some(ms) -> Ok(ms)
      _, _ -> Error(Nil)
    }
  })
  |> list.last
  |> option.from_result
}

fn clean(row: ReviewRow) -> Bool {
  fsrs.rating_to_int(row.rating) > 1 && !row.revealed && !row.auto_failed
}

fn next_due(m: Model, problem: ProblemRef) -> String {
  case model.card_for(m, problem) {
    Some(state) -> format.interval(fsrs.interval_seconds(state.card, m.now))
    None -> "\u{2014}"
  }
}

fn join_with(parts: List(String), separator: String) -> String {
  case parts {
    [] -> ""
    [only] -> only
    [head, ..rest] -> head <> separator <> join_with(rest, separator)
  }
}

// --- the kept panels -------------------------------------------------------

/// A year of study days, most recent last. Intensity is relative to the
/// busiest day, so the pattern reads the same at any volume.
fn heatmap(stats: Stats) -> Element(Msg) {
  let busiest =
    list.fold(stats.history, 1, fn(peak, day) { int.max(peak, day.total) })

  html.div(
    [attribute.class("heatmap")],
    list.reverse(
      list.map(range(0, 182), fn(days_ago) {
        let total = case
          list.find(stats.history, fn(day) { day.days_ago == days_ago })
        {
          Ok(day) -> day.total
          Error(Nil) -> 0
        }
        html.div(
          [
            attribute.class(
              "heatmap-cell heatmap-" <> intensity(total, busiest),
            ),
            attribute.title(
              int.to_string(total)
              <> " reviews, "
              <> case days_ago {
                0 -> "today"
                1 -> "yesterday"
                _ -> int.to_string(days_ago) <> " days ago"
              },
            ),
          ],
          [],
        )
      }),
    ),
  )
}

fn intensity(total: Int, busiest: Int) -> String {
  case total {
    0 -> "0"
    _ ->
      case total * 4 / int.max(1, busiest) {
        0 -> "1"
        1 -> "2"
        2 -> "3"
        _ -> "4"
      }
  }
}

fn forecast(stats: Stats) -> Element(Msg) {
  let busiest =
    list.fold(stats.forecast, 1, fn(peak, entry) { int.max(peak, entry.1) })

  html.div(
    [attribute.class("forecast-bars forecast-month")],
    list.map(range(0, 29), fn(offset) {
      let count = case list.find(stats.forecast, fn(e) { e.0 == offset }) {
        Ok(found) -> found.1
        Error(Nil) -> 0
      }
      html.div([attribute.class("forecast-day")], [
        html.div(
          [
            attribute.class("forecast-bar"),
            attribute.style(
              "height",
              int.to_string(int.max(2, count * 100 / busiest)) <> "%",
            ),
            attribute.title(
              int.to_string(count) <> " due in " <> int.to_string(offset) <> "d",
            ),
          ],
          [],
        ),
      ])
    }),
  )
}

fn section(title: String, contents: Element(Msg)) -> Element(Msg) {
  html.section([attribute.class("stats-section")], [
    html.h2([attribute.class("study-section-title")], [html.text(title)]),
    contents,
  ])
}

fn tile(value: String, label: String) -> Element(Msg) {
  html.div([attribute.class("stats-tile")], [
    html.span([attribute.class("stats-tile-value")], [html.text(value)]),
    html.span([attribute.class("stats-tile-label")], [html.text(label)]),
  ])
}

/// `int.range` is a fold, and exclusive of `to`. This materialises the
/// ascending inclusive list `[from..to]`.
fn range(from: Int, to: Int) -> List(Int) {
  int.range(from: to, to: from - 1, with: [], run: fn(acc, value) {
    [value, ..acc]
  })
}

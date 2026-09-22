//// Small formatters shared between views.

import fsrs
import gleam/int
import gleam/option.{type Option, None, Some}
import gleam/time/timestamp.{type Timestamp}
import gleamdrill/api.{type CardState}
import gleamdrill/problem.{type Difficulty, type Language}
import gleamdrill/problems
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html

/// Compact "3d" style text for an interval.
///
/// Anything under an hour reads in minutes, because that is the range learning
/// steps live in and "0d" would be a lie. Beyond two months it switches to
/// months, where a day of precision stops meaning anything.
pub fn interval(seconds: Int) -> String {
  case seconds {
    _ if seconds <= 0 -> "now"
    // Ceiling, not `/ 60 + 1`: a ten-minute step must read "10m", and a
    // thirty-second one must not read "0m".
    _ if seconds < 3600 -> int.to_string({ seconds + 59 } / 60) <> "m"
    _ if seconds < 86_400 -> int.to_string(seconds / 3600) <> "h"
    _ if seconds < 5_184_000 -> int.to_string(seconds / 86_400) <> "d"
    _ -> int.to_string(seconds / 2_592_000) <> "mo"
  }
}

/// A problem's LeetCode rating as a small bordered pill, or nothing for a
/// problem without one. Its own `difficulty-` class family, never `grade-`:
/// the grade bar also says "Hard" and "Easy", and the two must not look alike.
/// The language a drill is in, as a filled pill in that language's colour.
/// Nothing for a concept drill: there is no code to write.
pub fn language_chip(language: Language) -> Element(msg) {
  case language {
    // Neither a concept drill nor a board has code to write, so neither gets
    // a language chip.
    problem.Concept | problem.Board -> element.none()
    _ ->
      html.span(
        [
          attribute.class(
            "language-chip language-" <> problem.language_slug(language),
          ),
        ],
        [html.text(problem.language_label(language))],
      )
  }
}

/// The two-letter form for a list row, coloured the same way. Takes the
/// category name because a row holds a ref, not a problem.
pub fn language_tag(category: String) -> Element(msg) {
  let tag = problems.language_tag(category)
  html.span(
    [
      attribute.class(
        "language-chip language-tag study-preview-tag language-" <> slug_of(tag),
      ),
    ],
    [html.text(tag)],
  )
}

fn slug_of(tag: String) -> String {
  case tag {
    "py" -> "python"
    "gl" -> "gleam"
    "ts" -> "typescript"
    "ex" -> "elixir"
    "go" -> "go"
    _ -> "concept"
  }
}

pub fn difficulty_badge(difficulty: Option(Difficulty)) -> Element(msg) {
  case difficulty {
    None -> element.none()
    Some(rating) ->
      html.span(
        [
          attribute.class(
            "difficulty difficulty-" <> problem.difficulty_slug(rating),
          ),
        ],
        [html.text(problem.difficulty_label(rating))],
      )
  }
}

/// Where a problem sits in the schedule, as a CSS class and a label.
///
/// One definition for the browser's rows, the queue screen's rows and
/// anywhere else that shows card state: the queue screen exists to tell you
/// what the scheduler will do, so it must not describe a card differently
/// from the screen you came from.
///
/// `reps == 0` is "new" rather than "due" even though a queued card is created
/// due immediately -- the date is a placeholder until the card is first
/// answered, and the daily new budget, not the clock, decides when that is.
pub fn card_badge(
  state: Option(CardState),
  now: Timestamp,
) -> #(String, String) {
  case state {
    None -> #("badge badge-unqueued", "not queued")
    Some(state) ->
      case state.suspended, state.reps == 0, fsrs.is_due(state.card, now) {
        // Parked: the schedule is on hold, whatever the dates say.
        True, _, _ -> #("badge badge-paused", "paused")
        False, True, _ -> #("badge badge-new", "new")
        False, False, True -> #("badge badge-due", "due")
        False, False, False ->
          case state.card.state {
            fsrs.Learning(_) -> #("badge badge-learning", "learning")
            fsrs.Relearning(_) -> #("badge badge-learning", "relearning")
            fsrs.Review -> #(
              "badge badge-scheduled",
              interval(fsrs.interval_seconds(state.card, now)),
            )
          }
      }
  }
}

//// Turning the review log into something a person can act on.
////
//// Everything here is a pure function over the wire payloads, which is what
//// makes it unit-testable and lets guest mode reuse it unchanged: the server
//// and the local review log produce the same shapes, and this module neither
//// knows nor cares which it got.
////
//// The signal graph, and why these numbers and not others:
////
////   clean solve  =  a review that passed with nothing revealed, timed.
////   fluency      =  median of the last three clean solves. One great run is
////                   luck; three is a skill.
////   tier         =  fluent (<3m) / solid (<8m) / grinding / still learning.
////                   The 3-minute line IS the product's promise.
////   calibration  =  for each grade pressed, how often that card's NEXT
////                   review passed. Easy scoring below Good is the signature
////                   of optimistic Easy-pressing — the one habit that
////                   quietly poisons every interval FSRS chooses.
////
//// Deliberately absent: minutes-studied, totals-for-their-own-sake, anything
//// you cannot act on.

import algodrill/api.{type CardState, type CleanSolve, type Insights}
import algodrill/problem.{type ProblemRef}
import fsrs
import gleam/dict.{type Dict}
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/string
import gleam/time/timestamp.{type Timestamp}

/// Under three minutes, from memory, three times running: the goal state.
pub const fluent_ms = 180_000

/// Under eight minutes: solved honestly, speed still coming.
pub const solid_ms = 480_000

pub type Tier {
  Fluent
  Solid
  Grinding
  StillLearning
}

pub type CardInsight {
  CardInsight(
    problem: ProblemRef,
    card: CardState,
    tier: Tier,
    /// Crossed into fluent within the last week — the headline's delta, and
    /// the "recently mastered" list.
    recently_fluent: Bool,
    /// Median of the last three clean solves.
    fluency_ms: Option(Int),
    /// Latest clean solve minus the one before it; negative means faster.
    trend_ms: Option(Int),
    reveal_count: Int,
    /// Oldest first, at most five.
    solves: List(CleanSolve),
  )
}

pub type Analysis {
  Analysis(
    cards: List(CardInsight),
    fluent: Int,
    /// How many of the currently-fluent cards crossed the line in the last
    /// seven days — the headline's delta.
    fluent_this_week: Int,
    solid: Int,
    grinding: Int,
    still_learning: Int,
  )
}

pub fn analyse(
  data: Insights,
  cards: Dict(ProblemRef, CardState),
  now: Timestamp,
) -> Analysis {
  let solves_by_problem =
    list.fold(data.clean_solves, dict.new(), fn(acc, solve: CleanSolve) {
      dict.upsert(acc, solve.problem, fn(existing) {
        [solve, ..option.unwrap(existing, [])]
      })
    })
    // Grouped in reverse; restore oldest-first.
    |> dict.map_values(fn(_problem, solves) { list.reverse(solves) })
  let reveals = dict.from_list(data.reveals)

  let insights =
    dict.to_list(cards)
    |> list.map(fn(entry) {
      let #(problem, card) = entry
      let solves = dict.get(solves_by_problem, problem) |> option.from_result
      let solves = option.unwrap(solves, [])
      let fluency = fluency_of(solves)
      let tier = tier_of(fluency)
      CardInsight(
        problem:,
        card:,
        tier:,
        recently_fluent: tier == Fluent && crossed_recently(solves, now),
        fluency_ms: fluency,
        trend_ms: trend_of(solves),
        reveal_count: dict.get(reveals, problem)
          |> option.from_result
          |> option.unwrap(0),
        solves:,
      )
    })
    |> list.sort(fn(a, b) { string.compare(a.problem.title, b.problem.title) })

  Analysis(
    cards: insights,
    fluent: count_tier(insights, Fluent),
    fluent_this_week: list.count(insights, fn(card) { card.recently_fluent }),
    solid: count_tier(insights, Solid),
    grinding: count_tier(insights, Grinding),
    still_learning: count_tier(insights, StillLearning),
  )
}

fn count_tier(cards: List(CardInsight), tier: Tier) -> Int {
  list.count(cards, fn(card) { card.tier == tier })
}

pub fn tier_of(fluency: Option(Int)) -> Tier {
  case fluency {
    None -> StillLearning
    Some(ms) if ms < fluent_ms -> Fluent
    Some(ms) if ms < solid_ms -> Solid
    Some(_) -> Grinding
  }
}

/// Median of the last three clean solves; None until there is at least one.
pub fn fluency_of(solves: List(CleanSolve)) -> Option(Int) {
  let last_three =
    solves
    |> list.reverse
    |> list.take(3)
    |> list.map(fn(solve: CleanSolve) { solve.duration_ms })
    |> list.sort(int.compare)
  case last_three {
    [] -> None
    [only] -> Some(only)
    [_, middle] -> Some(middle)
    [_, middle, _] -> Some(middle)
    _ -> None
  }
}

fn trend_of(solves: List(CleanSolve)) -> Option(Int) {
  case list.reverse(solves) {
    [latest, previous, ..] -> Some(latest.duration_ms - previous.duration_ms)
    _ -> None
  }
}

/// Whether the card's newest clean solve — the one that made it fluent — is
/// less than a week old.
fn crossed_recently(solves: List(CleanSolve), now: Timestamp) -> Bool {
  case list.last(solves) {
    Ok(latest) ->
      fsrs.to_epoch(now) -. fsrs.to_epoch(latest.at) <. 7.0 *. 86_400.0
    Error(Nil) -> False
  }
}

/// Calibration rows in Anki's grade order, with a verdict for the pair that
/// matters: if Easy's next-review pass rate sits below Good's, the user is
/// pressing Easy on cards that were merely Good.
pub type CalibrationView {
  CalibrationView(rows: List(api.Calibration), verdict: Option(String))
}

/// How many next-reviews a grade needs before its pass-rate means anything.
const calibration_floor = 5

pub fn calibration_view(rows: List(api.Calibration)) -> CalibrationView {
  let rate = fn(rating: fsrs.Rating) -> Option(Float) {
    case
      list.find(rows, fn(row: api.Calibration) {
        row.rating == rating && row.total >= calibration_floor
      })
    {
      Ok(row) -> Some(int.to_float(row.passed) /. int.to_float(row.total))
      Error(Nil) -> None
    }
  }

  let verdict = case rate(fsrs.Easy), rate(fsrs.Good) {
    Some(easy), Some(good) if easy <. good ->
      Some(
        "Cards you grade Easy come back worse than cards you grade Good — "
        <> "you are over-pressing Easy. When in doubt, Good.",
      )
    Some(easy), Some(good) if easy >=. good ->
      Some(
        "Your grades line up with what actually happens. Keep grading honestly.",
      )
    _, _ -> None
  }

  CalibrationView(
    rows: list.sort(rows, fn(a, b) {
      int.compare(fsrs.rating_to_int(a.rating), fsrs.rating_to_int(b.rating))
    }),
    verdict:,
  )
}

/// "2m41s" — solve times deserve seconds, unlike scheduling intervals.
pub fn duration_label(ms: Int) -> String {
  let seconds = ms / 1000
  case seconds {
    _ if seconds < 60 -> int.to_string(seconds) <> "s"
    _ ->
      int.to_string(seconds / 60)
      <> "m"
      <> case seconds % 60 {
        0 -> ""
        rest -> int.to_string(rest) <> "s"
      }
  }
}

/// The two lists the stats screen shows, and the keyboard walks: what needs
/// work, then what was just mastered. One function so the cursor index in the
/// update loop and the rows on screen can never disagree.
pub fn attention_lists(
  analysis: Analysis,
) -> #(List(CardInsight), List(CardInsight)) {
  let needs =
    analysis.cards
    |> list.filter(fn(card) { card.tier == Grinding || card.card.lapses >= 2 })
    |> list.sort(fn(a, b) {
      // Slowest first: the biggest gap between where you are and 3 minutes.
      int.compare(
        0 - option.unwrap(b.fluency_ms, 0),
        0 - option.unwrap(a.fluency_ms, 0),
      )
    })
    |> list.take(8)
  let mastered =
    analysis.cards
    |> list.filter(fn(card) { card.recently_fluent })
    |> list.take(8)
  #(needs, mastered)
}

/// The concatenation the stats cursor moves over.
pub fn listed(analysis: Analysis) -> List(CardInsight) {
  let #(needs, mastered) = attention_lists(analysis)
  list.append(needs, mastered)
}

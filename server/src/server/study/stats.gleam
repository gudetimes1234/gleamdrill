//// Statistics: totals, history, streaks and the due forecast.
////
//// Part of the study data layer; see `server/study/model` for the shared
//// types. The SQL lives in `stats/sql/*.sql`; `gleam run -m squirrel`
//// generates `stats/sql.gleam` from it.

import gleam/int
import gleam/list
import gleam/option
import gleam/result
import pog
import server/study/model.{type StudyError, first, rows}
import server/study/stats/sql
import wire
import youid/uuid.{type Uuid}

/// Totals, state counts, history and the due forecast for one track.
///
/// Days are reported as "days ago" integers rather than dates.
///
/// The rollover and timezone maths has already been applied when producing
/// them, so the client can render a heatmap and count a streak with plain
/// integer arithmetic instead of reimplementing a calendar.
pub fn stats(
  db: pog.Connection,
  user_id: Uuid,
  track: String,
  account: wire.AccountSettings,
) -> Result(wire.Stats, StudyError) {
  use totals <- result.try(review_totals(db, user_id, track))
  use state_counts <- result.try(state_counts(db, user_id, track))
  use history <- result.try(review_history(db, user_id, track, account))
  use forecast <- result.try(due_forecast(db, user_id, track, account))

  let #(total_reviews, mature_reviews, mature_correct) = totals
  Ok(wire.Stats(
    total_reviews:,
    mature_reviews:,
    mature_correct:,
    state_counts:,
    history:,
    forecast:,
    streak_days: streak(history),
  ))
}

/// Consecutive study days ending today, or ending yesterday if today has no
/// reviews yet -- a streak should not appear broken just because you have not
/// sat down yet.
///
/// Public only so `server_test` can reach it: the off-by-one between "today"
/// and "yesterday" is the kind of thing that breaks twice a year and never in
/// a way anyone notices.
pub fn streak(history: List(wire.DayTally)) -> Int {
  let days =
    history |> list.map(fn(day) { day.days_ago }) |> list.sort(int.compare)
  case days {
    [0, ..] -> count_run(days, 0)
    [1, ..] -> count_run(days, 1)
    _ -> 0
  }
}

fn count_run(days: List(Int), expected: Int) -> Int {
  case days {
    [first, ..rest] if first == expected -> 1 + count_run(rest, expected + 1)
    _ -> 0
  }
}

/// A review reaches a track only through its card, so every one of these
/// joins. `reviews_card_time_idx` already serves that direction, and the
/// alternative -- a `track` column on `reviews` -- would be a second source
/// of truth for a fact `cards.category` already holds, on the one table that
/// cannot be rebuilt.
fn review_totals(
  db: pog.Connection,
  user_id: Uuid,
  track: String,
) -> Result(#(Int, Int, Int), StudyError) {
  sql.review_totals(db, user_id, track)
  |> first(fn(row: sql.ReviewTotalsRow) {
    #(row.total, row.mature, row.correct)
  })
  |> result.map(option.unwrap(_, #(0, 0, 0)))
}

fn state_counts(
  db: pog.Connection,
  user_id: Uuid,
  track: String,
) -> Result(List(#(Int, Int)), StudyError) {
  sql.state_counts(db, user_id, track)
  |> rows(fn(row: sql.StateCountsRow) { #(row.state, row.count) })
}

fn review_history(
  db: pog.Connection,
  user_id: Uuid,
  track: String,
  account: wire.AccountSettings,
) -> Result(List(wire.DayTally), StudyError) {
  sql.review_history(
    db,
    user_id,
    account.timezone,
    account.day_start_hour,
    track,
  )
  |> rows(fn(row: sql.ReviewHistoryRow) {
    wire.DayTally(
      days_ago: row.days_ago,
      total: row.total,
      correct: row.correct,
    )
  })
}

fn due_forecast(
  db: pog.Connection,
  user_id: Uuid,
  track: String,
  account: wire.AccountSettings,
) -> Result(List(#(Int, Int)), StudyError) {
  sql.due_forecast(db, user_id, account.timezone, account.day_start_hour, track)
  |> rows(fn(row: sql.DueForecastRow) { #(row.days_ahead, row.count) })
}

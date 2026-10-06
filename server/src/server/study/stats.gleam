//// Statistics: totals, history, streaks and the due forecast.
////
//// Part of the study data layer; see `server/study/model` for the shared
//// types.

import gleam/dynamic/decode
import gleam/int
import gleam/list
import gleam/result
import pog
import server/study/model.{type StudyError, database_error}
import wire

/// Days are reported as "days ago" integers rather than dates.
///
/// The rollover and timezone maths has already been applied when producing
/// them, so the client can render a heatmap and count a streak with plain
/// integer arithmetic instead of reimplementing a calendar.
pub type DayTally =
  wire.DayTally

pub type Stats =
  wire.Stats

pub fn stats(
  db: pog.Connection,
  user_id: String,
  track: String,
  account: wire.AccountSettings,
) -> Result(Stats, StudyError) {
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
pub fn streak(history: List(DayTally)) -> Int {
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
  user_id: String,
  track: String,
) -> Result(#(Int, Int, Int), StudyError) {
  pog.query(
    "select
       (select count(*) from reviews r join cards c on c.id = r.card_id
         where r.user_id = $1::uuid and c.category = $2)::int,
       (select count(*) from reviews r join cards c on c.id = r.card_id
         where r.user_id = $1::uuid and c.category = $2
           and r.state_before = 2)::int,
       (select count(*) from reviews r join cards c on c.id = r.card_id
         where r.user_id = $1::uuid and c.category = $2
           and r.state_before = 2 and r.rating > 1)::int",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(track))
  |> pog.returning({
    use total <- decode.field(0, decode.int)
    use mature <- decode.field(1, decode.int)
    use correct <- decode.field(2, decode.int)
    decode.success(#(total, mature, correct))
  })
  |> pog.execute(db)
  |> result.map_error(database_error)
  |> result.map(fn(returned) {
    list.first(returned.rows) |> result.unwrap(#(0, 0, 0))
  })
}

fn state_counts(
  db: pog.Connection,
  user_id: String,
  track: String,
) -> Result(List(#(Int, Int)), StudyError) {
  pog.query(
    "select state, count(*)::int from cards
      where user_id = $1::uuid and category = $2
      group by state order by state",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(track))
  |> pog.returning({
    use state <- decode.field(0, decode.int)
    use count <- decode.field(1, decode.int)
    decode.success(#(state, count))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

fn review_history(
  db: pog.Connection,
  user_id: String,
  track: String,
  account: wire.AccountSettings,
) -> Result(List(DayTally), StudyError) {
  pog.query(
    "with study_day as (
       select date_trunc('day', (now() at time zone $2) - make_interval(hours => $3))::date as today
     )
     select (select today from study_day)
            - date_trunc('day', (reviewed_at at time zone $2)
                                - make_interval(hours => $3))::date,
            count(*)::int,
            count(*) filter (where r.rating > 1)::int
       from reviews r
       join cards c on c.id = r.card_id
      where r.user_id = $1::uuid and c.category = $4
        and r.reviewed_at >= now() - interval '365 days'
      group by 1
      order by 1",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(account.timezone))
  |> pog.parameter(pog.int(account.day_start_hour))
  |> pog.parameter(pog.text(track))
  |> pog.returning({
    use days_ago <- decode.field(0, decode.int)
    use total <- decode.field(1, decode.int)
    use correct <- decode.field(2, decode.int)
    decode.success(wire.DayTally(days_ago:, total:, correct:))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

fn due_forecast(
  db: pog.Connection,
  user_id: String,
  track: String,
  account: wire.AccountSettings,
) -> Result(List(#(Int, Int)), StudyError) {
  pog.query(
    "with study_day as (
       select date_trunc('day', (now() at time zone $2) - make_interval(hours => $3))::date as today
     )
     select greatest(
              0,
              date_trunc('day', (due at time zone $2)
                                - make_interval(hours => $3))::date
              - (select today from study_day)
            ),
            count(*)::int
       from cards
      where user_id = $1::uuid and category = $4
        and not suspended
        and due < now() + interval '30 days'
      group by 1
      order by 1",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(account.timezone))
  |> pog.parameter(pog.int(account.day_start_hour))
  |> pog.parameter(pog.text(track))
  |> pog.returning({
    use offset <- decode.field(0, decode.int)
    use count <- decode.field(1, decode.int)
    decode.success(#(offset, count))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

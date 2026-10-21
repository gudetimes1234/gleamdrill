//// The study day: what is due, what is new, and where each track stands.
////
//// Part of the study data layer; see `server/study/model` for the shared
//// types. The SQL lives in `today/sql/*.sql`; `gleam run -m squirrel`
//// generates `today/sql.gleam` from it.

import fsrs
import gleam/option.{Some}
import gleam/result
import gleam/time/timestamp.{type Timestamp}
import pog
import server/study/model.{type StudyError, StudyDatabaseError, first, rows}
import server/study/profile
import server/study/today/sql
import wire
import youid/uuid.{type Uuid}

/// Where the user stands against today's limits.
///
/// `new_remaining` is a budget, not a list: the server cannot enumerate new
/// problems because the catalogue lives in the client bundle, not the
/// database (cards are created on first review). So the server owns the
/// scheduling of known cards and the daily allowance, and the client picks
/// which unseen problems to spend that allowance on.
///
/// The study day runs from `day_start_hour` local time to the same hour the
/// next day -- Anki's 4am rollover, so a late-night session counts toward the
/// day it feels like rather than the one the clock says.
///
/// The timezone arithmetic is done by Postgres on purpose: it ships a full
/// IANA database and handles DST, neither of which Gleam has on the Erlang
/// target.
pub fn today(
  db: pog.Connection,
  user_id: Uuid,
  track: String,
  profile: wire.Profile,
  now: Timestamp,
) -> Result(wire.Today, StudyError) {
  // The study day is a fact about the person, the budgets are about what is
  // being studied. There is one `bounds` for the account and one set of
  // counts per track.
  let wire.Profile(account:, settings:) = profile
  sql.day_counts(
    db,
    user_id,
    account.timezone,
    account.day_start_hour,
    fsrs.to_epoch(now),
    track,
  )
  |> first(fn(row: sql.DayCountsRow) {
    budget(
      settings,
      row.day_start,
      row.day_end,
      row.reviews_done,
      row.new_introduced,
      row.due_now,
    )
  })
  |> result.try(option.to_result(
    _,
    StudyDatabaseError("day bounds query returned no row"),
  ))
}

/// The reply's `Today` from the day's counted row: the bounds as they came,
/// the remaining budgets clamped at zero. Pure -- the counting is SQL's job,
/// the arithmetic is this one's.
pub fn budget(
  settings: wire.Settings,
  day_start: Float,
  day_end: Float,
  reviews_done: Int,
  new_introduced: Int,
  due_now: Int,
) -> wire.Today {
  wire.Today(
    day_start: fsrs.from_epoch(day_start),
    day_end: fsrs.from_epoch(day_end),
    reviews_done:,
    new_introduced:,
    reviews_remaining: int_max(settings.reviews_per_day - reviews_done, 0),
    new_remaining: int_max(settings.new_per_day - new_introduced, 0),
    due_now:,
  )
}

/// Where every track stands, for the switcher.
///
/// Derived from the **cards**, not from a list of tracks the server keeps,
/// because the server has no catalogue and validates nothing about a category
/// string. A track holding real cards under a name the bundle no longer has --
/// a renamed category, a stale offline cache, a typo in a fixture script --
/// therefore shows up in the switcher rather than becoming unreachable.
/// Silent loss becomes a visible oddity, which is the trade to want.
///
/// No budget arithmetic here: each row carries that track's `Settings` and
/// the client subtracts. A `new_per_day` default written into SQL would be a
/// second place for it to be wrong.
pub fn standings(
  db: pog.Connection,
  user_id: Uuid,
  account: wire.AccountSettings,
  now: Timestamp,
) -> Result(List(wire.TrackStanding), StudyError) {
  sql.standings(
    db,
    user_id,
    account.timezone,
    account.day_start_hour,
    fsrs.to_epoch(now),
  )
  |> rows(fn(row: sql.StandingsRow) {
    // A track with no settings row of its own reads as the defaults, the
    // same as `load_settings` does. The left join makes every column null
    // together, so they are present together or not at all.
    let settings = case
      row.parameters,
      row.desired_retention,
      row.learning_steps,
      row.relearning_steps,
      row.maximum_interval,
      row.enable_fuzz,
      row.new_per_day,
      row.reviews_per_day
    {
      Some(parameters),
        Some(desired_retention),
        Some(learning_steps),
        Some(relearning_steps),
        Some(maximum_interval),
        Some(enable_fuzz),
        Some(new_per_day),
        Some(reviews_per_day)
      ->
        profile.settings_from(
          parameters:,
          desired_retention:,
          learning_steps:,
          relearning_steps:,
          maximum_interval:,
          enable_fuzz:,
          new_per_day:,
          reviews_per_day:,
        )
      _, _, _, _, _, _, _, _ -> wire.default_settings()
    }
    wire.TrackStanding(
      track: row.track,
      settings:,
      cards: row.cards,
      due_now: row.due_now,
      introduced_today: row.introduced_today,
      reviews_today: row.reviews_today,
    )
  })
}

/// Postgres rejects an unknown zone name at query time, which would then break
/// every subsequent `today` call. Checking on write keeps a bad value out.
pub fn timezone_is_valid(
  db: pog.Connection,
  timezone: String,
) -> Result(Bool, StudyError) {
  sql.timezone_exists(db, timezone)
  |> first(fn(row: sql.TimezoneExistsRow) { row.known })
  |> result.map(option.unwrap(_, False))
}

fn int_max(value: Int, floor: Int) -> Int {
  case value > floor {
    True -> value
    False -> floor
  }
}

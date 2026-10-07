//// The study day: what is due, what is new, and where each track stands.
////
//// Part of the study data layer; see `server/study/model` for the shared
//// types.

import fsrs
import gleam/dynamic/decode
import gleam/list
import gleam/option.{None, Some}
import gleam/result
import gleam/time/timestamp.{type Timestamp}
import pog
import server/study/model.{type StudyError, StudyDatabaseError, database_error}
import server/study/profile.{type Profile}
import wire

/// Where the user stands against today's limits.
///
/// `new_remaining` is a budget, not a list: the server cannot enumerate new
/// problems because the catalogue lives in the client bundle, not the
/// database (cards are created on first review). So the server owns the
/// scheduling of known cards and the daily allowance, and the client picks
/// which unseen problems to spend that allowance on.
pub type Today =
  wire.Today

/// The study day runs from `day_start_hour` local time to the same hour the
/// next day -- Anki's 4am rollover, so a late-night session counts toward the
/// day it feels like rather than the one the clock says.
///
/// The timezone arithmetic is done by Postgres on purpose: it ships a full
/// IANA database and handles DST, neither of which Gleam has on the Erlang
/// target.
pub fn today(
  db: pog.Connection,
  user_id: String,
  track: String,
  profile: Profile,
  now: Timestamp,
) -> Result(Today, StudyError) {
  // The study day is a fact about the person, the budgets are about what is
  // being studied. There is one `bounds` for the account and one set of
  // counts per track.
  let wire.Profile(account:, settings:) = profile
  pog.query(
    "with bounds as (
       select date_trunc('day', (to_timestamp($4::float8) at time zone $2)
                                - make_interval(hours => $3))
              + make_interval(hours => $3) as local_start
     )
     select
       extract(epoch from (local_start at time zone $2))::float8,
       extract(epoch from ((local_start + interval '1 day') at time zone $2))::float8,
       (select count(*) from reviews r
          join cards rc on rc.id = r.card_id
         where r.user_id = $1::uuid and rc.category = $5
           and r.reviewed_at >= (local_start at time zone $2))::int,
       (select count(*) from cards c
         where c.user_id = $1::uuid and c.category = $5
           and c.introduced_at >= (local_start at time zone $2))::int,
       (select count(*) from cards c
         where c.user_id = $1::uuid and c.category = $5
           and not c.suspended
           and c.reps > 0
           and c.due <= to_timestamp($4::float8))::int
     from bounds",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(account.timezone))
  |> pog.parameter(pog.int(account.day_start_hour))
  |> pog.parameter(pog.float(fsrs.to_epoch(now)))
  |> pog.parameter(pog.text(track))
  |> pog.returning({
    use day_start <- decode.field(0, decode.float)
    use day_end <- decode.field(1, decode.float)
    use reviews_done <- decode.field(2, decode.int)
    use new_introduced <- decode.field(3, decode.int)
    use due_now <- decode.field(4, decode.int)
    decode.success(#(day_start, day_end, reviews_done, new_introduced, due_now))
  })
  |> pog.execute(db)
  |> result.map_error(database_error)
  |> result.try(fn(returned) {
    case list.first(returned.rows) {
      Error(Nil) ->
        Error(StudyDatabaseError("day bounds query returned no row"))
      Ok(#(day_start, day_end, reviews_done, new_introduced, due_now)) ->
        Ok(wire.Today(
          day_start: fsrs.from_epoch(day_start),
          day_end: fsrs.from_epoch(day_end),
          reviews_done:,
          new_introduced:,
          reviews_remaining: int_max(settings.reviews_per_day - reviews_done, 0),
          new_remaining: int_max(settings.new_per_day - new_introduced, 0),
          due_now:,
        ))
    }
  })
}

/// Postgres rejects an unknown zone name at query time, which would then break
/// every subsequent `today` call. Checking on write keeps a bad value out.
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
  user_id: String,
  account: wire.AccountSettings,
  now: Timestamp,
) -> Result(List(wire.TrackStanding), StudyError) {
  pog.query(
    "with bounds as (
       select date_trunc('day', (to_timestamp($4::float8) at time zone $2)
                                - make_interval(hours => $3))
              + make_interval(hours => $3) as local_start
     )
     select c.category,
            count(*)::int,
            count(*) filter (
              where not c.suspended and c.reps > 0
                and c.due <= to_timestamp($4::float8))::int,
            count(*) filter (
              where c.introduced_at
                    >= (select local_start at time zone $2 from bounds))::int,
            (select count(*) from reviews r
               join cards rc on rc.id = r.card_id
              where r.user_id = $1::uuid and rc.category = c.category
                and r.reviewed_at
                    >= (select local_start at time zone $2 from bounds))::int,
            t.parameters, t.desired_retention, t.learning_steps,
            t.relearning_steps, t.maximum_interval, t.enable_fuzz,
            t.new_per_day, t.reviews_per_day
       from cards c
       left join track_settings t
              on t.user_id = c.user_id and t.track = c.category
      where c.user_id = $1::uuid
      group by c.category, t.parameters, t.desired_retention,
               t.learning_steps, t.relearning_steps, t.maximum_interval,
               t.enable_fuzz, t.new_per_day, t.reviews_per_day
      order by c.category",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(account.timezone))
  |> pog.parameter(pog.int(account.day_start_hour))
  |> pog.parameter(pog.float(fsrs.to_epoch(now)))
  |> pog.returning({
    use track <- decode.field(0, decode.string)
    use cards <- decode.field(1, decode.int)
    use due_now <- decode.field(2, decode.int)
    use introduced_today <- decode.field(3, decode.int)
    use reviews_today <- decode.field(4, decode.int)
    // A track with no settings row of its own reads as the defaults, the
    // same as `load_settings` does. The left join makes every column null
    // together, so one probe answers for all eight.
    use parameters <- decode.field(
      5,
      decode.optional(decode.list(decode.float)),
    )
    use desired_retention <- decode.field(6, decode.optional(decode.float))
    use learning_steps <- decode.field(
      7,
      decode.optional(decode.list(decode.int)),
    )
    use relearning_steps <- decode.field(
      8,
      decode.optional(decode.list(decode.int)),
    )
    use maximum_interval <- decode.field(9, decode.optional(decode.int))
    use enable_fuzz <- decode.field(10, decode.optional(decode.bool))
    use new_per_day <- decode.field(11, decode.optional(decode.int))
    use reviews_per_day <- decode.field(12, decode.optional(decode.int))
    let fallback = wire.default_settings()
    let settings = case parameters {
      None -> fallback
      Some(parameters) ->
        wire.Settings(
          scheduler: fsrs.Config(
            parameters:,
            desired_retention: option.unwrap(
              desired_retention,
              fallback.scheduler.desired_retention,
            ),
            learning_steps: option.unwrap(
              learning_steps,
              fallback.scheduler.learning_steps,
            ),
            relearning_steps: option.unwrap(
              relearning_steps,
              fallback.scheduler.relearning_steps,
            ),
            maximum_interval: option.unwrap(
              maximum_interval,
              fallback.scheduler.maximum_interval,
            ),
            enable_fuzz: option.unwrap(
              enable_fuzz,
              fallback.scheduler.enable_fuzz,
            ),
          ),
          new_per_day: option.unwrap(new_per_day, fallback.new_per_day),
          reviews_per_day: option.unwrap(
            reviews_per_day,
            fallback.reviews_per_day,
          ),
        )
    }
    decode.success(wire.TrackStanding(
      track:,
      settings:,
      cards:,
      due_now:,
      introduced_today:,
      reviews_today:,
    ))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

pub fn timezone_is_valid(
  db: pog.Connection,
  timezone: String,
) -> Result(Bool, StudyError) {
  pog.query("select 1 from pg_timezone_names where name = $1")
  |> pog.parameter(pog.text(timezone))
  |> pog.returning({
    use value <- decode.field(0, decode.int)
    decode.success(value)
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows != [] })
  |> result.map_error(database_error)
}

fn int_max(value: Int, floor: Int) -> Int {
  case value > floor {
    True -> value
    False -> floor
  }
}

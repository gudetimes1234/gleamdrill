//// Scheduler settings per track, and the account-wide profile.
////
//// Part of the study data layer; see `server/study/model` for the shared
//// types.

import fsrs
import gleam/dynamic/decode
import gleam/list
import gleam/result
import pog
import server/study/model.{type Settings, type StudyError, database_error}
import wire

pub fn default_settings() -> Settings {
  wire.default_settings()
}

/// Both halves of the settings row: the account-wide knobs and the
/// scheduler's.
///
/// Still one row per user -- the per-track split is a schema change, not a
/// wire one -- but the shapes are now separate, so the callers that want a
/// timezone and the callers that want a daily budget stop sharing a record
/// that was only ever one because the table was.
pub type Profile =
  wire.Profile

pub fn default_profile() -> Profile {
  wire.default_profile()
}

/// The knobs about the person. One row per user, and it stays that way.
pub fn load_account(
  db: pog.Connection,
  user_id: String,
) -> Result(wire.AccountSettings, StudyError) {
  pog.query(
    "select day_start_hour, timezone, reminder_hour
       from settings
      where user_id = $1::uuid",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.returning({
    use day_start_hour <- decode.field(0, decode.int)
    use timezone <- decode.field(1, decode.string)
    use reminder_hour <- decode.field(2, decode.optional(decode.int))
    decode.success(wire.AccountSettings(
      day_start_hour:,
      timezone:,
      reminder_hour:,
    ))
  })
  |> pog.execute(db)
  |> result.map_error(database_error)
  // A user with no settings row should be impossible -- signup creates one in
  // the same transaction as the account -- but defaulting beats failing every
  // review if it ever happens.
  |> result.map(fn(returned) {
    list.first(returned.rows) |> result.unwrap(wire.default_account())
  })
}

/// One track's scheduler settings.
///
/// A track nobody has opened has no row, and the app's own defaults answer
/// for it. That is the normal path now, not a can't-happen: `track_settings`
/// is seeded only for the tracks a user already had something in.
pub fn load_settings(
  db: pog.Connection,
  user_id: String,
  track: String,
) -> Result(Settings, StudyError) {
  pog.query(
    "select parameters, desired_retention, learning_steps, relearning_steps,
            maximum_interval, enable_fuzz, new_per_day, reviews_per_day
       from track_settings
      where user_id = $1::uuid and track = $2",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(track))
  |> pog.returning(settings_decoder())
  |> pog.execute(db)
  |> result.map_error(database_error)
  |> result.map(fn(returned) {
    list.first(returned.rows) |> result.unwrap(wire.default_settings())
  })
}

/// The track a user has most cards in, ties broken by name; the empty string
/// when they have none.
///
/// What a request that names no track means. Defaulting rather than refusing
/// is what keeps a client from before tracks working: it sends no `?track=`
/// and gets a coherent single-track view instead of an empty one.
pub fn default_track(
  db: pog.Connection,
  user_id: String,
) -> Result(String, StudyError) {
  pog.query(
    "select category from cards
      where user_id = $1::uuid
      group by category
      order by count(*) desc, category
      limit 1",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.returning(decode.at([0], decode.string))
  |> pog.execute(db)
  |> result.map_error(database_error)
  |> result.map(fn(returned) { list.first(returned.rows) |> result.unwrap("") })
}

/// Every track's settings, for the export.
pub fn all_track_settings(
  db: pog.Connection,
  user_id: String,
) -> Result(List(#(String, Settings)), StudyError) {
  pog.query(
    "select track, parameters, desired_retention, learning_steps,
            relearning_steps, maximum_interval, enable_fuzz, new_per_day,
            reviews_per_day
       from track_settings
      where user_id = $1::uuid
      order by track",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.returning({
    use track <- decode.field(0, decode.string)
    use settings <- decode.then(shifted_settings_decoder())
    decode.success(#(track, settings))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

/// `settings_decoder` with every column one to the right, because `track`
/// leads the row here and nowhere else.
fn shifted_settings_decoder() -> decode.Decoder(Settings) {
  use parameters <- decode.field(1, decode.list(decode.float))
  use desired_retention <- decode.field(2, decode.float)
  use learning_steps <- decode.field(3, decode.list(decode.int))
  use relearning_steps <- decode.field(4, decode.list(decode.int))
  use maximum_interval <- decode.field(5, decode.int)
  use enable_fuzz <- decode.field(6, decode.bool)
  use new_per_day <- decode.field(7, decode.int)
  use reviews_per_day <- decode.field(8, decode.int)
  decode.success(wire.Settings(
    scheduler: fsrs.Config(
      parameters:,
      desired_retention:,
      learning_steps:,
      relearning_steps:,
      maximum_interval:,
      enable_fuzz:,
    ),
    new_per_day:,
    reviews_per_day:,
  ))
}

/// Both halves at once, for the callers that want a whole profile.
pub fn load_profile(
  db: pog.Connection,
  user_id: String,
  track: String,
) -> Result(Profile, StudyError) {
  use account <- result.try(load_account(db, user_id))
  use settings <- result.try(load_settings(db, user_id, track))
  Ok(wire.Profile(account:, settings:))
}

pub fn save_account(
  db: pog.Connection,
  user_id: String,
  account: wire.AccountSettings,
) -> Result(Nil, StudyError) {
  pog.query(
    "update settings set
       day_start_hour = $2, timezone = $3, reminder_hour = $4
     where user_id = $1::uuid",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.int(account.day_start_hour))
  |> pog.parameter(pog.text(account.timezone))
  |> pog.parameter(pog.nullable(pog.int, account.reminder_hour))
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

/// An upsert, not an update.
///
/// A track nobody has opened has no row, and a bare `update` would touch
/// nothing: the settings screen would appear to work and then forget, which
/// is the exact bug the guest store had before its settings were persisted.
pub fn save_settings(
  db: pog.Connection,
  user_id: String,
  track: String,
  settings: Settings,
) -> Result(Nil, StudyError) {
  pog.query(
    "insert into track_settings
       (user_id, track, parameters, desired_retention, learning_steps,
        relearning_steps, maximum_interval, enable_fuzz, new_per_day,
        reviews_per_day)
     values ($1::uuid, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     on conflict (user_id, track) do update set
       parameters = excluded.parameters,
       desired_retention = excluded.desired_retention,
       learning_steps = excluded.learning_steps,
       relearning_steps = excluded.relearning_steps,
       maximum_interval = excluded.maximum_interval,
       enable_fuzz = excluded.enable_fuzz,
       new_per_day = excluded.new_per_day,
       reviews_per_day = excluded.reviews_per_day",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(track))
  |> pog.parameter(pog.array(pog.float, settings.scheduler.parameters))
  |> pog.parameter(pog.float(settings.scheduler.desired_retention))
  |> pog.parameter(pog.array(pog.int, settings.scheduler.learning_steps))
  |> pog.parameter(pog.array(pog.int, settings.scheduler.relearning_steps))
  |> pog.parameter(pog.int(settings.scheduler.maximum_interval))
  |> pog.parameter(pog.bool(settings.scheduler.enable_fuzz))
  |> pog.parameter(pog.int(settings.new_per_day))
  |> pog.parameter(pog.int(settings.reviews_per_day))
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

fn settings_decoder() -> decode.Decoder(Settings) {
  use parameters <- decode.field(0, decode.list(decode.float))
  use desired_retention <- decode.field(1, decode.float)
  use learning_steps <- decode.field(2, decode.list(decode.int))
  use relearning_steps <- decode.field(3, decode.list(decode.int))
  use maximum_interval <- decode.field(4, decode.int)
  use enable_fuzz <- decode.field(5, decode.bool)
  use new_per_day <- decode.field(6, decode.int)
  use reviews_per_day <- decode.field(7, decode.int)
  decode.success(wire.Settings(
    scheduler: fsrs.Config(
      parameters:,
      desired_retention:,
      learning_steps:,
      relearning_steps:,
      maximum_interval:,
      enable_fuzz:,
    ),
    new_per_day:,
    reviews_per_day:,
  ))
}

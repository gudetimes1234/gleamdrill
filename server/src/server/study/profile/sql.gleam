//// This module contains the code to run the sql queries defined in
//// `./src/server/study/profile/sql`.
//// > 🐿️ This module was generated automatically using v4.7.0 of
//// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
////

import gleam/dynamic/decode
import gleam/option.{type Option}
import pog
import youid/uuid.{type Uuid}

/// A row you get from running the `account` query
/// defined in `./src/server/study/profile/sql/account.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type AccountRow {
  AccountRow(day_start_hour: Int, timezone: String, reminder_hour: Option(Int))
}

/// The account-wide knobs: one row per user, created at signup.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn account(
  db: pog.Connection,
  user_id: Uuid,
) -> Result(pog.Returned(AccountRow), pog.QueryError) {
  let decoder = {
    use day_start_hour <- decode.field(0, decode.int)
    use timezone <- decode.field(1, decode.string)
    use reminder_hour <- decode.field(2, decode.optional(decode.int))
    decode.success(AccountRow(day_start_hour:, timezone:, reminder_hour:))
  }

  "-- The account-wide knobs: one row per user, created at signup.
select day_start_hour, timezone, reminder_hour
  from settings
 where user_id = $1
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(user_id)))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `all_track_settings` query
/// defined in `./src/server/study/profile/sql/all_track_settings.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type AllTrackSettingsRow {
  AllTrackSettingsRow(
    track: String,
    parameters: List(Float),
    desired_retention: Float,
    learning_steps: List(Int),
    relearning_steps: List(Int),
    maximum_interval: Int,
    enable_fuzz: Bool,
    new_per_day: Int,
    reviews_per_day: Int,
  )
}

/// Every track's scheduler settings, for the export.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn all_track_settings(
  db: pog.Connection,
  user_id: Uuid,
) -> Result(pog.Returned(AllTrackSettingsRow), pog.QueryError) {
  let decoder = {
    use track <- decode.field(0, decode.string)
    use parameters <- decode.field(1, decode.list(decode.float))
    use desired_retention <- decode.field(2, decode.float)
    use learning_steps <- decode.field(3, decode.list(decode.int))
    use relearning_steps <- decode.field(4, decode.list(decode.int))
    use maximum_interval <- decode.field(5, decode.int)
    use enable_fuzz <- decode.field(6, decode.bool)
    use new_per_day <- decode.field(7, decode.int)
    use reviews_per_day <- decode.field(8, decode.int)
    decode.success(AllTrackSettingsRow(
      track:,
      parameters:,
      desired_retention:,
      learning_steps:,
      relearning_steps:,
      maximum_interval:,
      enable_fuzz:,
      new_per_day:,
      reviews_per_day:,
    ))
  }

  "-- Every track's scheduler settings, for the export.
select track, parameters, desired_retention, learning_steps,
       relearning_steps, maximum_interval, enable_fuzz, new_per_day,
       reviews_per_day
  from track_settings
 where user_id = $1
 order by track
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(user_id)))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// Writes the account-wide knobs, with a daily reminder at reminder_hour.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn save_account(
  db: pog.Connection,
  user_id: Uuid,
  arg_2: Int,
  arg_3: String,
  reminder_hour: Int,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Writes the account-wide knobs, with a daily reminder at reminder_hour.
update settings
   set day_start_hour = $2, timezone = $3, reminder_hour = $4
 where user_id = $1
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(user_id)))
  |> pog.parameter(pog.int(arg_2))
  |> pog.parameter(pog.text(arg_3))
  |> pog.parameter(pog.int(reminder_hour))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// Writes the account-wide knobs, with the daily reminder off.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn save_account_without_reminder(
  db: pog.Connection,
  user_id: Uuid,
  arg_2: Int,
  arg_3: String,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Writes the account-wide knobs, with the daily reminder off.
update settings
   set day_start_hour = $2, timezone = $3, reminder_hour = null
 where user_id = $1
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(user_id)))
  |> pog.parameter(pog.int(arg_2))
  |> pog.parameter(pog.text(arg_3))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// Writes one track's scheduler settings. An upsert: a track nobody has
/// opened has no row for a bare update to touch.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn save_track_settings(
  db: pog.Connection,
  arg_1: Uuid,
  arg_2: String,
  arg_3: List(Float),
  arg_4: Float,
  arg_5: List(Int),
  arg_6: List(Int),
  arg_7: Int,
  arg_8: Bool,
  arg_9: Int,
  arg_10: Int,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Writes one track's scheduler settings. An upsert: a track nobody has
-- opened has no row for a bare update to touch.
insert into track_settings
  (user_id, track, parameters, desired_retention, learning_steps,
   relearning_steps, maximum_interval, enable_fuzz, new_per_day,
   reviews_per_day)
values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
on conflict (user_id, track) do update set
  parameters = excluded.parameters,
  desired_retention = excluded.desired_retention,
  learning_steps = excluded.learning_steps,
  relearning_steps = excluded.relearning_steps,
  maximum_interval = excluded.maximum_interval,
  enable_fuzz = excluded.enable_fuzz,
  new_per_day = excluded.new_per_day,
  reviews_per_day = excluded.reviews_per_day
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(arg_1)))
  |> pog.parameter(pog.text(arg_2))
  |> pog.parameter(pog.array(fn(value) { pog.float(value) }, arg_3))
  |> pog.parameter(pog.float(arg_4))
  |> pog.parameter(pog.array(fn(value) { pog.int(value) }, arg_5))
  |> pog.parameter(pog.array(fn(value) { pog.int(value) }, arg_6))
  |> pog.parameter(pog.int(arg_7))
  |> pog.parameter(pog.bool(arg_8))
  |> pog.parameter(pog.int(arg_9))
  |> pog.parameter(pog.int(arg_10))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `track_settings` query
/// defined in `./src/server/study/profile/sql/track_settings.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type TrackSettingsRow {
  TrackSettingsRow(
    parameters: List(Float),
    desired_retention: Float,
    learning_steps: List(Int),
    relearning_steps: List(Int),
    maximum_interval: Int,
    enable_fuzz: Bool,
    new_per_day: Int,
    reviews_per_day: Int,
  )
}

/// One track's scheduler settings; no row means the app's defaults.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn track_settings(
  db: pog.Connection,
  user_id: Uuid,
  track: String,
) -> Result(pog.Returned(TrackSettingsRow), pog.QueryError) {
  let decoder = {
    use parameters <- decode.field(0, decode.list(decode.float))
    use desired_retention <- decode.field(1, decode.float)
    use learning_steps <- decode.field(2, decode.list(decode.int))
    use relearning_steps <- decode.field(3, decode.list(decode.int))
    use maximum_interval <- decode.field(4, decode.int)
    use enable_fuzz <- decode.field(5, decode.bool)
    use new_per_day <- decode.field(6, decode.int)
    use reviews_per_day <- decode.field(7, decode.int)
    decode.success(TrackSettingsRow(
      parameters:,
      desired_retention:,
      learning_steps:,
      relearning_steps:,
      maximum_interval:,
      enable_fuzz:,
      new_per_day:,
      reviews_per_day:,
    ))
  }

  "-- One track's scheduler settings; no row means the app's defaults.
select parameters, desired_retention, learning_steps, relearning_steps,
       maximum_interval, enable_fuzz, new_per_day, reviews_per_day
  from track_settings
 where user_id = $1 and track = $2
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(user_id)))
  |> pog.parameter(pog.text(track))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

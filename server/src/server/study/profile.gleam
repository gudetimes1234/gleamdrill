//// Scheduler settings per track, and the account-wide profile.
////
//// Part of the study data layer; see `server/study/model` for the shared
//// types. The SQL lives in `profile/sql/*.sql`; `gleam run -m squirrel`
//// generates `profile/sql.gleam` from it.

import fsrs
import gleam/option.{None, Some}
import gleam/result
import pog
import server/study/model.{type StudyError, done, first, rows}
import server/study/profile/sql
import wire
import youid/uuid.{type Uuid}

pub fn default_settings() -> wire.Settings {
  wire.default_settings()
}

/// Both halves of the settings row: the account-wide knobs and the
/// scheduler's.
///
/// Still one row per user -- the per-track split is a schema change, not a
/// wire one -- but the shapes are now separate, so the callers that want a
/// timezone and the callers that want a daily budget stop sharing a record
/// that was only ever one because the table was.
pub fn default_profile() -> wire.Profile {
  wire.default_profile()
}

/// The knobs about the person. One row per user, and it stays that way.
pub fn load_account(
  db: pog.Connection,
  user_id: Uuid,
) -> Result(wire.AccountSettings, StudyError) {
  sql.account(db, user_id)
  |> first(fn(row: sql.AccountRow) {
    wire.AccountSettings(
      day_start_hour: row.day_start_hour,
      timezone: row.timezone,
      reminder_hour: row.reminder_hour,
    )
  })
  // A user with no settings row should be impossible -- signup creates one in
  // the same transaction as the account -- but defaulting beats failing every
  // review if it ever happens.
  |> result.map(option.unwrap(_, wire.default_account()))
}

/// One track's scheduler settings.
///
/// A track nobody has opened has no row, and the app's own defaults answer
/// for it. That is the normal path now, not a can't-happen: `track_settings`
/// is seeded only for the tracks a user already had something in.
pub fn load_settings(
  db: pog.Connection,
  user_id: Uuid,
  track: String,
) -> Result(wire.Settings, StudyError) {
  sql.track_settings(db, user_id, track)
  |> first(fn(row: sql.TrackSettingsRow) {
    settings_from(
      parameters: row.parameters,
      desired_retention: row.desired_retention,
      learning_steps: row.learning_steps,
      relearning_steps: row.relearning_steps,
      maximum_interval: row.maximum_interval,
      enable_fuzz: row.enable_fuzz,
      new_per_day: row.new_per_day,
      reviews_per_day: row.reviews_per_day,
    )
  })
  |> result.map(option.unwrap(_, wire.default_settings()))
}

/// Every track's settings, for the export.
pub fn all_track_settings(
  db: pog.Connection,
  user_id: Uuid,
) -> Result(List(#(String, wire.Settings)), StudyError) {
  sql.all_track_settings(db, user_id)
  |> rows(fn(row: sql.AllTrackSettingsRow) {
    #(
      row.track,
      settings_from(
        parameters: row.parameters,
        desired_retention: row.desired_retention,
        learning_steps: row.learning_steps,
        relearning_steps: row.relearning_steps,
        maximum_interval: row.maximum_interval,
        enable_fuzz: row.enable_fuzz,
        new_per_day: row.new_per_day,
        reviews_per_day: row.reviews_per_day,
      ),
    )
  })
}

/// Both halves at once, for the callers that want a whole profile.
pub fn load_profile(
  db: pog.Connection,
  user_id: Uuid,
  track: String,
) -> Result(wire.Profile, StudyError) {
  use account <- result.try(load_account(db, user_id))
  use settings <- result.try(load_settings(db, user_id, track))
  Ok(wire.Profile(account:, settings:))
}

pub fn save_account(
  db: pog.Connection,
  user_id: Uuid,
  account: wire.AccountSettings,
) -> Result(Nil, StudyError) {
  let wire.AccountSettings(day_start_hour:, timezone:, reminder_hour:) = account
  case reminder_hour {
    Some(hour) -> sql.save_account(db, user_id, day_start_hour, timezone, hour)
    None ->
      sql.save_account_without_reminder(db, user_id, day_start_hour, timezone)
  }
  |> done
}

/// An upsert, not an update.
///
/// A track nobody has opened has no row, and a bare `update` would touch
/// nothing: the settings screen would appear to work and then forget, which
/// is the exact bug the guest store had before its settings were persisted.
pub fn save_settings(
  db: pog.Connection,
  user_id: Uuid,
  track: String,
  settings: wire.Settings,
) -> Result(Nil, StudyError) {
  let wire.Settings(scheduler:, new_per_day:, reviews_per_day:) = settings
  sql.save_track_settings(
    db,
    user_id,
    track,
    scheduler.parameters,
    scheduler.desired_retention,
    scheduler.learning_steps,
    scheduler.relearning_steps,
    scheduler.maximum_interval,
    scheduler.enable_fuzz,
    new_per_day,
    reviews_per_day,
  )
  |> done
}

/// One track's settings from the columns of its `track_settings` row. Every
/// query that reads the table -- one track, every track, the switcher's
/// standings -- selects these eight, and each generated row is its own type,
/// so this is the one place they become a `wire.Settings`.
pub fn settings_from(
  parameters parameters: List(Float),
  desired_retention desired_retention: Float,
  learning_steps learning_steps: List(Int),
  relearning_steps relearning_steps: List(Int),
  maximum_interval maximum_interval: Int,
  enable_fuzz enable_fuzz: Bool,
  new_per_day new_per_day: Int,
  reviews_per_day reviews_per_day: Int,
) -> wire.Settings {
  wire.Settings(
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
  )
}

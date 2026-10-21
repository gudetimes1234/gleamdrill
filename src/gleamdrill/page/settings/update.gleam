//// The settings page: the scheduler knobs, the device's keymap and offline
//// cache, and export / import of the whole account.
////
//// Every input saves immediately. The settings themselves are shared state,
//// so each edit goes up as a `ProfileChanged` (shown at once) and is saved;
//// the saved copy the server answers with is applied the same way.

import fsrs
import gleam/float
import gleam/int
import gleam/json
import gleam/option.{None, Some}
import gleam/string
import gleam/time/calendar
import gleam/time/timestamp
import gleamdrill/model as shared_model
import gleamdrill/page/settings/model.{
  type Field, type Model, DayStartHour, DesiredRetention, Model, NewPerDay,
  ReminderHour, ReviewsPerDay,
}
import gleamdrill/page/settings/msg.{type Msg}
import gleamdrill/platform/browser
import gleamdrill/shared.{type Change, type Shared}
import gleamdrill/store
import gleamdrill/store/remote
import lustre/effect.{type Effect}
import wire

/// Opening the page measures the offline cache.
pub fn init(_shared: Shared) -> #(Model, Effect(Msg), List(Change)) {
  #(model.init(), measure_cache(), [])
}

pub fn update(
  shared: Shared,
  page: Model,
  msg: Msg,
) -> #(Model, Effect(Msg), List(Change)) {
  case msg {
    msg.UserChangedSetting(field, raw) -> {
      let profile =
        apply_setting(wire.Profile(shared.account, shared.settings), field, raw)
      save(shared, page, profile)
    }
    msg.UserClickedDeviceTimezone ->
      save(
        shared,
        page,
        wire.Profile(
          wire.AccountSettings(..shared.account, timezone: browser.time_zone()),
          shared.settings,
        ),
      )
    msg.SettingsSaved(Ok(profile)) -> #(page, effect.none(), [
      shared.ProfileChanged(profile),
    ])
    msg.SettingsSaved(Error(error)) -> #(page, effect.none(), [
      shared.Notice(remote.error_message(error)),
    ])
    msg.UserChangedKeymap(mode) -> #(page, effect.none(), [
      shared.KeymapChanged(mode),
    ])
    msg.UserClickedExport -> #(
      page,
      store.export_archive(shared, msg.ArchiveReady),
      [],
    )
    msg.ArchiveReady(Ok(archive)) -> #(page, download(archive), [])
    msg.ArchiveReady(Error(error)) -> #(page, effect.none(), [
      shared.Notice(remote.error_message(error)),
    ])
    msg.UserClickedImport -> #(
      page,
      effect.from(fn(dispatch) {
        browser.pick_file(fn(text) { dispatch(msg.ImportPicked(text)) })
      }),
      [],
    )
    msg.ImportPicked(text) -> import_picked(page, text)
    msg.ImportConfirmed(replace) -> import_confirmed(shared, page, replace)
    // Everything on screen came from the old data, so the boot state is
    // fetched again rather than patched.
    // Onto the study screen, where the restored queue is the first thing
    // in view.
    msg.ArchiveRestored(Ok(Nil)) -> #(page, effect.none(), [
      shared.Notice("Restored. Everything is as the file had it."),
      shared.Navigate(shared_model.StudyRoute),
      shared.Reload,
    ])
    msg.ArchiveRestored(Error(error)) -> #(page, effect.none(), [
      shared.Refreshing(False),
      shared.Notice(remote.error_message(error)),
    ])
    msg.UserClickedWarmCache ->
      case page.warming {
        Some(_) -> #(page, effect.none(), [])
        None -> #(
          Model(..page, warming: Some(#(0, 0))),
          effect.from(fn(dispatch) {
            browser.warm_runtime_cache(fn(ok, done, total, finished) {
              dispatch(msg.CacheWarmed(ok, done, total, finished))
            })
          }),
          [],
        )
      }
    msg.CacheWarmed(ok, done, total, finished) ->
      case ok, finished {
        False, _ -> #(Model(..page, warming: None), measure_cache(), [
          shared.Notice(
            "The download stopped partway. Whatever arrived is kept; try again when you are back online.",
          ),
        ])
        True, True -> #(Model(..page, warming: None), measure_cache(), [])
        True, False -> #(
          Model(..page, warming: Some(#(done, total))),
          effect.none(),
          [],
        )
      }
    msg.CacheMeasured(bytes) -> #(
      Model(..page, cache_bytes: bytes),
      effect.none(),
      [],
    )
    msg.UserClickedBack -> #(page, effect.none(), [
      shared.Navigate(shared_model.StudyRoute),
    ])
    msg.UserToggledHelp -> #(page, effect.none(), [shared.ToggleHelp])
  }
}

/// Shown at once, then saved; the server's answer replaces it.
fn save(
  shared: Shared,
  page: Model,
  profile: wire.Profile,
) -> #(Model, Effect(Msg), List(Change)) {
  #(page, store.save_settings(shared, profile, msg.SettingsSaved), [
    shared.ProfileChanged(profile),
  ])
}

/// Parsed here, before the question is asked, so a file that is not an
/// export is refused without ever offering to replace anything with it.
fn import_picked(
  page: Model,
  text: String,
) -> #(Model, Effect(Msg), List(Change)) {
  case json.parse(text, wire.archive_decoder()) {
    Ok(archive) if archive.version <= wire.archive_version -> #(
      Model(..page, import_pending: Some(archive)),
      effect.none(),
      [],
    )
    Ok(_) -> #(page, effect.none(), [
      shared.Notice("This export was made by a newer GleamDrill."),
    ])
    Error(_) -> #(page, effect.none(), [
      shared.Notice("That file is not a GleamDrill export."),
    ])
  }
}

fn import_confirmed(
  shared: Shared,
  page: Model,
  replace: Bool,
) -> #(Model, Effect(Msg), List(Change)) {
  case replace, page.import_pending {
    False, _ -> #(Model(..page, import_pending: None), effect.none(), [])
    True, Some(archive) -> #(
      Model(..page, import_pending: None),
      store.restore_archive(shared, archive, msg.ArchiveRestored),
      [shared.Refreshing(True)],
    )
    True, None -> #(page, effect.none(), [])
  }
}

fn download(archive: wire.Archive) -> Effect(Msg) {
  use _dispatch <- effect.from
  browser.download_text(
    "gleamdrill-"
      <> string.slice(
      timestamp.to_rfc3339(archive.exported_at, calendar.utc_offset),
      0,
      10,
    )
      <> ".json",
    json.to_string(wire.archive_to_json(archive)),
  )
}

fn measure_cache() -> Effect(Msg) {
  use dispatch <- effect.from
  browser.runtime_cache_size(fn(bytes) { dispatch(msg.CacheMeasured(bytes)) })
}

/// Parse one settings input and clamp it into range.
///
/// The bounds mirror `validate.settings` in the server's study/validate.gleam.
/// Clamping rather than rejecting is deliberate: these come from a number
/// input whose own min/max the browser already shows, so a value outside them
/// is a typo, and snapping it is friendlier than an error. Unparseable text
/// leaves the setting alone.
fn apply_setting(
  profile: wire.Profile,
  field: Field,
  raw: String,
) -> wire.Profile {
  let wire.Profile(account:, settings:) = profile
  // Which half of the profile the field belongs to. Splitting them is the
  // whole point of the record split: a daily budget is about what you are
  // studying, a rollover hour is about you.
  let tuned = fn(settings) { wire.Profile(account:, settings:) }
  let personal = fn(account) { wire.Profile(account:, settings:) }
  case field {
    NewPerDay ->
      case int.parse(raw) {
        Ok(value) ->
          tuned(
            wire.Settings(..settings, new_per_day: int.clamp(value, 0, 100)),
          )
        Error(Nil) -> profile
      }
    ReviewsPerDay ->
      case int.parse(raw) {
        Ok(value) ->
          tuned(
            wire.Settings(..settings, reviews_per_day: int.clamp(value, 0, 500)),
          )
        Error(Nil) -> profile
      }
    DayStartHour ->
      case int.parse(raw) {
        Ok(value) ->
          personal(
            wire.AccountSettings(
              ..account,
              day_start_hour: int.clamp(value, 0, 23),
            ),
          )
        Error(Nil) -> profile
      }
    ReminderHour ->
      case int.parse(raw) {
        Ok(hour) ->
          personal(
            wire.AccountSettings(
              ..account,
              reminder_hour: Some(int.clamp(hour, 0, 23)),
            ),
          )
        // The select's "off" option, or anything else: no mail.
        Error(Nil) ->
          personal(wire.AccountSettings(..account, reminder_hour: None))
      }
    DesiredRetention -> {
      let retained = fn(value) {
        tuned(
          wire.Settings(
            ..settings,
            scheduler: fsrs.Config(
              ..settings.scheduler,
              desired_retention: float.clamp(value, 0.7, 0.99),
            ),
          ),
        )
      }
      case float.parse(raw) {
        Ok(value) -> retained(value)
        // An integer in a step-0.01 field: "1" should mean 1.0, not nothing.
        Error(Nil) ->
          case int.parse(raw) {
            Ok(whole) -> retained(int.to_float(whole))
            Error(Nil) -> profile
          }
      }
    }
  }
}

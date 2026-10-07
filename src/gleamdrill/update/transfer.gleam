//// Export, import and restore: the whole account as one archive file.

import gleam/json
import gleam/option.{None, Some}
import gleam/string
import gleam/time/calendar
import gleam/time/timestamp
import gleamdrill/browser
import gleamdrill/model.{type Model, Model}
import gleamdrill/msg.{type Msg, ImportPicked}
import gleamdrill/remote.{type ApiError}
import gleamdrill/store
import gleamdrill/update/common
import lustre/effect.{type Effect}
import wire

pub fn export(m: Model) -> #(Model, Effect(Msg)) {
  #(m, store.export_archive(m))
}

pub fn archive_ready(
  m: Model,
  result: Result(wire.Archive, ApiError),
) -> #(Model, Effect(Msg)) {
  case result {
    Ok(archive) -> #(
      m,
      common.run_effect(fn() {
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
      }),
    )
    Error(error) -> #(
      Model(..m, notice: Some(remote.error_message(error))),
      effect.none(),
    )
  }
}

pub fn pick_import(m: Model) -> #(Model, Effect(Msg)) {
  #(
    m,
    effect.from(fn(dispatch) {
      browser.pick_file(fn(text) { dispatch(ImportPicked(text)) })
    }),
  )
}

/// Parsed here, before the question is asked, so a file that is not an
/// export is refused without ever offering to replace anything with it.
pub fn import_picked(m: Model, text: String) -> #(Model, Effect(Msg)) {
  case json.parse(text, wire.archive_decoder()) {
    Ok(archive) if archive.version <= wire.archive_version -> #(
      Model(..m, import_pending: Some(archive)),
      effect.none(),
    )
    Ok(_) -> #(
      Model(..m, notice: Some("This export was made by a newer GleamDrill.")),
      effect.none(),
    )
    Error(_) -> #(
      Model(..m, notice: Some("That file is not a GleamDrill export.")),
      effect.none(),
    )
  }
}

pub fn import_confirmed(m: Model, replace: Bool) -> #(Model, Effect(Msg)) {
  case replace, m.import_pending {
    False, _ -> #(Model(..m, import_pending: None), effect.none())
    True, Some(archive) -> #(
      Model(..m, import_pending: None, refreshing: True),
      store.restore_archive(m, archive),
    )
    True, None -> #(m, effect.none())
  }
}

/// Everything on screen came from the old data, so the boot state is
/// fetched again rather than patched.
pub fn restored(
  m: Model,
  result: Result(Nil, ApiError),
) -> #(Model, Effect(Msg)) {
  case result {
    Ok(Nil) -> #(
      Model(..m, notice: Some("Restored. Everything is as the file had it.")),
      store.load_state(m),
    )
    Error(error) -> #(
      Model(..m, refreshing: False, notice: Some(remote.error_message(error))),
      effect.none(),
    )
  }
}

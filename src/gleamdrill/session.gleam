//// The signed-in session, and the device-local preferences that stay local.
////
//// Study data lives on the server now. What remains in localStorage is the
//// bearer token plus the handful of settings that are genuinely about *this*
//// browser -- which editor keymap, where you were browsing -- and would be
//// wrong to sync to a phone.
////
//// Storing the token in localStorage rather than an HttpOnly cookie is a
//// deliberate trade: the API is a third-party origin relative to this app, and
//// browsers are phasing out third-party cookies. Note the drill runner is not
//// an added risk here -- user code executes in Web Workers, which have no
//// access to localStorage.

import gleam/dynamic/decode
import gleam/json
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/string
import lustre/effect.{type Effect}
import plinth/javascript/storage

const token_key = "gleamDrill.token"

const preferences_key = "gleamDrill.prefs.v1"

/// The app was AlgoDrill until 2026-09. Every key it wrote under this prefix
/// is moved to `gleamDrill.` once, so a returning browser keeps its token and
/// guest data. `algoDrillState.*` is not under this prefix: that is the
/// pre-account blob `legacy` imports, and it stays where it was written.
const old_prefix = "algoDrill."

const prefix = "gleamDrill."

/// Settings that belong to this browser rather than to the account.
pub type Preferences {
  Preferences(
    editor_keymap: String,
    /// Where the editor's resize handle was left, in px. `None` is the default.
    editor_height: Option(Int),
    /// Whether the prompt sidebar is open beside the editor. A device fact:
    /// a wide screen keeps it, a narrow one may not.
    prompt_open: Bool,
    /// The last Gleam Tour lesson opened on this device, so "Continue the
    /// tour" lands where you left off. A device fact, like the keymap.
    tour_lesson: Int,
    /// Whether the first-run picker has been answered on this device.
    languages_chosen: Bool,
    /// The named queue being studied on this device, or None for
    /// everything. A device fact: which list is today's is a choice made
    /// where you sit, and the list itself lives with the cards.
    active_queue: Option(String),
  )
}

/// Used only when this browser has no stored preferences at all -- which is
/// what makes `languages_chosen: False` right here and wrong in the decoder.
pub fn default_preferences() -> Preferences {
  Preferences(
    editor_keymap: "default",
    editor_height: None,
    prompt_open: True,
    tour_lesson: 0,
    languages_chosen: False,
    active_queue: None,
  )
}

/// Renames every `algoDrill.*` key to `gleamDrill.*`. Runs before anything
/// else reads storage, and does nothing on a browser that has already moved
/// (or never had the old keys). A key that already exists under the new name
/// wins; the old copy is dropped either way.
pub fn migrate_storage_keys() -> Nil {
  case storage.local() {
    Error(Nil) -> Nil
    Ok(local) -> {
      list.repeat(Nil, storage.length(local))
      |> list.index_map(fn(_, index) { storage.key(local, index) })
      |> result.values
      |> list.filter(string.starts_with(_, old_prefix))
      |> list.each(fn(old_key) {
        let new_key =
          prefix <> string.drop_start(old_key, string.length(old_prefix))
        case
          storage.get_item(local, new_key),
          storage.get_item(local, old_key)
        {
          Error(Nil), Ok(value) -> {
            let _ = storage.set_item(local, new_key, value)
            Nil
          }
          _, _ -> Nil
        }
        storage.remove_item(local, old_key)
      })
    }
  }
}

pub fn load_token() -> Option(String) {
  case storage.local() {
    Error(Nil) -> None
    Ok(local) ->
      case storage.get_item(local, token_key) {
        Ok("") | Error(Nil) -> None
        Ok(token) -> Some(token)
      }
  }
}

pub fn save_token(token: String) -> Effect(message) {
  use _dispatch <- effect.from
  write(token_key, token)
}

pub fn clear_token() -> Effect(message) {
  use _dispatch <- effect.from
  case storage.local() {
    Ok(local) -> storage.remove_item(local, token_key)
    Error(Nil) -> Nil
  }
}

pub fn load_preferences() -> Preferences {
  case storage.local() {
    Error(Nil) -> default_preferences()
    Ok(local) ->
      storage.get_item(local, preferences_key)
      |> result.try(fn(raw) {
        json.parse(raw, preferences_decoder()) |> result.replace_error(Nil)
      })
      |> result.unwrap(default_preferences())
  }
}

/// Every field after the first is optional, so a blob written before it
/// existed still parses.
pub fn preferences_decoder() -> decode.Decoder(Preferences) {
  use keymap <- decode.field("editorKeymap", decode.string)
  use editor_height <- decode.optional_field(
    "editorHeight",
    None,
    decode.optional(decode.int),
  )
  // True, unlike `default_preferences`: a blob written before this field
  // existed belongs to someone already using the app, and showing them a
  // first-run picker would be a lie.
  use chosen <- decode.optional_field("languagesChosen", True, decode.bool)
  use tour_lesson <- decode.optional_field("tourLesson", 0, decode.int)
  use active_queue <- decode.optional_field(
    "activeQueue",
    None,
    decode.optional(decode.string),
  )
  use prompt_open <- decode.optional_field("promptOpen", True, decode.bool)
  decode.success(Preferences(
    editor_keymap: keymap,
    editor_height: editor_height,
    prompt_open: prompt_open,
    tour_lesson: tour_lesson,
    languages_chosen: chosen,
    active_queue: active_queue,
  ))
}

pub fn save_preferences(preferences: Preferences) -> Effect(message) {
  use _dispatch <- effect.from
  write(
    preferences_key,
    json.to_string(
      json.object([
        #("editorKeymap", json.string(preferences.editor_keymap)),
        #("editorHeight", json.nullable(preferences.editor_height, json.int)),
        #("promptOpen", json.bool(preferences.prompt_open)),
        #("languagesChosen", json.bool(preferences.languages_chosen)),
        #("tourLesson", json.int(preferences.tour_lesson)),
        #("activeQueue", json.nullable(preferences.active_queue, json.string)),
      ]),
    ),
  )
}

/// A write can fail on a full or disabled store. Preferences are not worth
/// interrupting a drill over, so a failure is dropped.
fn write(key: String, value: String) -> Nil {
  case storage.local() {
    Ok(local) -> {
      let _ = storage.set_item(local, key, value)
      Nil
    }
    Error(Nil) -> Nil
  }
}

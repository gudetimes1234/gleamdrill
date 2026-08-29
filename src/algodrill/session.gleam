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
import gleam/option.{type Option, None, Some}
import gleam/result
import lustre/effect.{type Effect}
import plinth/javascript/storage

const token_key = "algoDrill.token"

const preferences_key = "algoDrill.prefs.v1"

/// Settings that belong to this browser rather than to the account.
pub type Preferences {
  Preferences(editor_keymap: String, side_collapsed: Bool)
}

pub fn default_preferences() -> Preferences {
  Preferences(editor_keymap: "default", side_collapsed: False)
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
        json.parse(raw, {
          use keymap <- decode.field("editorKeymap", decode.string)
          // Optional so blobs written before the field existed still parse.
          use collapsed <- decode.optional_field(
            "sideCollapsed",
            False,
            decode.bool,
          )
          decode.success(Preferences(
            editor_keymap: keymap,
            side_collapsed: collapsed,
          ))
        })
        |> result.replace_error(Nil)
      })
      |> result.unwrap(default_preferences())
  }
}

pub fn save_preferences(preferences: Preferences) -> Effect(message) {
  use _dispatch <- effect.from
  write(
    preferences_key,
    json.to_string(
      json.object([
        #("editorKeymap", json.string(preferences.editor_keymap)),
        #("sideCollapsed", json.bool(preferences.side_collapsed)),
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

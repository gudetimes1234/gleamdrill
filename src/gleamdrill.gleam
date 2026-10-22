//// Entry point: registers the editor element and the service worker, reads
//// what this browser remembers, and starts the app.

import gleam/list
import gleam/option.{None, Some}
import gleam/result
import gleamdrill/app
import gleamdrill/model.{type Model, Account, Guest, Model, Syncing}
import gleamdrill/msg.{type Msg}
import gleamdrill/platform/browser
import gleamdrill/platform/editor
import gleamdrill/route
import gleamdrill/shared/common
import gleamdrill/shared/session as session_boot
import gleamdrill/store
import lustre
import lustre/effect.{type Effect}
import modem

pub fn main() {
  editor.register()
  browser.register_service_worker()
  let program =
    lustre.application(
      fn(flags) { app.init(init(flags)) },
      app.update,
      app.view,
    )
  let assert Ok(_) = lustre.start(program, "#app", Nil)
  Nil
}

fn init(_flags) -> #(Model, Effect(Msg)) {
  store.migrate_storage_keys()
  let preferences = store.load_preferences()
  // A deep link names the screen, and the track when the screen is in one;
  // it outranks the track this device last used.
  let location =
    modem.initial_uri() |> option.from_result |> option.then(route.parse)
  let track = case location {
    Some(route.Location(_, Some(track))) -> Some(track)
    _ -> preferences.active_track
  }
  let base = model.default()
  let m =
    Model(
      ..base,
      editor_keymap: preferences.editor_keymap,
      editor_height: preferences.editor_height,
      prompt_open: preferences.prompt_open,
      active_track: option.unwrap(track, ""),
      route: case location {
        Some(route.Location(to, _)) -> to
        None -> base.route
      },
      tour_lesson: preferences.tour_lesson,
      remembered_queues: preferences.active_queue,
      // The active track's, lifted out of the map. A blob written before
      // tracks held one queue under "", which boot attaches to whichever
      // track it lands on -- so nobody's active queue resets on the release
      // that splits them.
      active_queue: case option.unwrap(track, "") {
        "" -> list.key_find(preferences.active_queue, "") |> option.from_result
        name ->
          list.key_find(preferences.active_queue, name)
          |> result.lazy_or(fn() { list.key_find(preferences.active_queue, "") })
          |> option.from_result
      },
    )

  case store.load_token() {
    // Signed in: study state lives on the server, so there is nothing to
    // restore from disk and we block on fetching it.
    Some(token) -> {
      let m = Model(..m, mode: Account(token), boot: Syncing)
      #(
        m,
        effect.batch([
          common.keyboard_effect(),
          common.swipe_effect(),
          store.load_state(m, msg.StateLoaded),
        ]),
      )
    }
    // No account. The app is fully usable anyway -- guest progress lives in
    // this browser. A pre-account `algoDrillState` blob is folded in here, so
    // a returning user keeps their work without being made to sign up first.
    None -> {
      let m = Model(..m, mode: Guest, boot: Syncing)
      #(
        m,
        effect.batch([
          common.keyboard_effect(),
          common.swipe_effect(),
          session_boot.adopt_legacy(),
          store.load_state(m, msg.StateLoaded),
        ]),
      )
    }
  }
}

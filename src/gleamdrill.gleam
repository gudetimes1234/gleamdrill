import gleam/list
import gleam/option.{None, Some}
import gleam/result
import gleamdrill/browser
import gleamdrill/editor
import gleamdrill/model.{type Model, Account, Guest, Model, Syncing}
import gleamdrill/msg.{type Msg}
import gleamdrill/session
import gleamdrill/store
import gleamdrill/update
import gleamdrill/update/common
import gleamdrill/update/session as session_boot
import gleamdrill/view
import lustre
import lustre/effect.{type Effect}

pub fn main() {
  editor.register()
  browser.register_service_worker()
  let app = lustre.application(init, update.update, view.view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
  Nil
}

fn init(_flags) -> #(Model, Effect(Msg)) {
  session.migrate_storage_keys()
  let preferences = session.load_preferences()
  let base = model.default()
  let m =
    Model(
      ..base,
      editor_keymap: preferences.editor_keymap,
      editor_height: preferences.editor_height,
      prompt_open: preferences.prompt_open,
      active_track: option.unwrap(preferences.active_track, ""),
      tour_lesson: preferences.tour_lesson,
      remembered_queues: preferences.active_queue,
      // The active track's, lifted out of the map. A blob written before
      // tracks held one queue under "", which boot attaches to whichever
      // track it lands on -- so nobody's active queue resets on the release
      // that splits them.
      active_queue: case option.unwrap(preferences.active_track, "") {
        "" -> list.key_find(preferences.active_queue, "") |> option.from_result
        name ->
          list.key_find(preferences.active_queue, name)
          |> result.lazy_or(fn() { list.key_find(preferences.active_queue, "") })
          |> option.from_result
      },
    )

  case session.load_token() {
    // Signed in: study state lives on the server, so there is nothing to
    // restore from disk and we block on fetching it.
    Some(token) -> {
      let m = Model(..m, mode: Account(token), boot: Syncing)
      #(m, effect.batch([common.keyboard_effect(), store.load_state(m)]))
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
          session_boot.adopt_legacy(),
          store.load_state(m),
        ]),
      )
    }
  }
}

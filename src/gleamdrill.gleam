import gleam/list
import gleam/option.{None, Some}
import gleam/result
import gleamdrill/browser
import gleamdrill/editor
import gleamdrill/model.{
  type Model, Account, AuthRoute, CompareRoute, DrillRoute, Guest, MenuRoute,
  Model, NotStarted, QueueRoute, ReportRoute, SettingsRoute, StatsRoute,
  StudyRoute, SummaryRoute, SyncFailed, Synced, Syncing, TourRoute, TracksRoute,
}
import gleamdrill/msg.{type Msg}
import gleamdrill/session
import gleamdrill/store
import gleamdrill/update
import gleamdrill/update/common
import gleamdrill/view/auth
import gleamdrill/view/compare as compare_view
import gleamdrill/view/drill
import gleamdrill/view/help
import gleamdrill/view/manage
import gleamdrill/view/menu
import gleamdrill/view/report
import gleamdrill/view/settings
import gleamdrill/view/stats
import gleamdrill/view/statusbar
import gleamdrill/view/study
import gleamdrill/view/summary
import gleamdrill/view/tour as tour_view
import gleamdrill/view/tracks
import lustre
import lustre/attribute
import lustre/effect.{type Effect}
import lustre/element.{type Element}
import lustre/element/html

pub fn main() {
  editor.register()
  browser.register_service_worker()
  let app = lustre.application(init, update.update, view)
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
          update.adopt_legacy(),
          store.load_state(m),
        ]),
      )
    }
  }
}

fn view(m: Model) -> Element(Msg) {
  case m.boot {
    // The one blocking load. A guest resolves it locally and instantly; an
    // account waits on the network, and a failure there is a dead end worth
    // saying out loud, because the app is online-only once signed in.
    NotStarted | Syncing | SyncFailed(_) -> auth.loading(m)
    Synced -> {
      let screen = case m.route {
        AuthRoute -> auth.view(m)
        TracksRoute -> tracks.view(m)
        SettingsRoute -> settings.view(m)
        SummaryRoute -> summary.view(m)
        StudyRoute -> study.view(m)
        StatsRoute -> stats.view(m)
        DrillRoute ->
          case drill.view(m) {
            Ok(el) -> el
            Error(Nil) -> menu.view(m)
          }
        CompareRoute ->
          case m.compare {
            Some(c) -> compare_view.view(m, c)
            None -> menu.view(m)
          }
        ReportRoute -> report.view(m)
        MenuRoute -> menu.view(m)
        QueueRoute -> manage.view(m)
        TourRoute -> tour_view.view(m)
      }
      // A state load after the first is a thin bar at the top, over
      // whatever is on screen; only the first load gets the loading card.
      let syncing = case m.refreshing {
        True -> [
          html.div(
            [
              attribute.class("sync-bar"),
              attribute.role("progressbar"),
              attribute.attribute("aria-label", "Loading from the server"),
            ],
            [],
          ),
        ]
        False -> []
      }
      case m.route {
        // The sign-in form keeps its focused, chrome-free layout.
        AuthRoute -> element.fragment([screen, ..syncing])
        _ ->
          element.fragment([
            screen,
            statusbar.view(m),
            help.button(m),
            help.view(m),
            ..syncing
          ])
      }
    }
  }
}

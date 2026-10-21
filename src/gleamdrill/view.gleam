//// The view shell: the boot gate, the route dispatch to each screen's
//// module, the sync bar, and the status bar and help chrome every screen
//// shares.

import gleam/option.{type Option, None, Some}
import gleamdrill/keys
import gleamdrill/model.{
  type Model, AuthRoute, CompareRoute, DrillRoute, MenuRoute, NotStarted,
  QueueRoute, ReportRoute, SettingsRoute, StatsRoute, StudyRoute, SummaryRoute,
  SyncFailed, Synced, Syncing, TourRoute, TracksRoute,
}
import gleamdrill/msg.{type Msg}
import gleamdrill/ui/binding.{type Binding}
import gleamdrill/view/auth
import gleamdrill/view/compare as compare_view
import gleamdrill/view/drill
import gleamdrill/view/help
import gleamdrill/view/manage
import gleamdrill/view/menu
import gleamdrill/view/report
import gleamdrill/view/stats
import gleamdrill/view/statusbar
import gleamdrill/view/study
import gleamdrill/view/summary
import gleamdrill/view/tour as tour_view
import gleamdrill/view/tracks
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html

/// A screen as the chrome sees it: what to draw, the keys it answers to (the
/// status bar and the help overlay list these), and the status bar's label.
pub type Screen {
  Screen(element: Element(Msg), keys: List(Binding(Msg)), label: String)
}

/// `page` is the screen when a page module drew it (see `app`); otherwise
/// the route picks one of the screens still drawn from the flat model.
pub fn view(m: Model, page: Option(Screen)) -> Element(Msg) {
  case m.boot {
    // The one blocking load. A guest resolves it locally and instantly; an
    // account waits on the network, and a failure there is a dead end worth
    // saying out loud, because the app is online-only once signed in.
    NotStarted | Syncing | SyncFailed(_) -> auth.loading(m)
    Synced -> {
      let screen = case page {
        Some(screen) -> screen
        None -> Screen(legacy_screen(m), keys.screen(m), keys.context_label(m))
      }
      // An overlay (help, the exit prompt) owns the keys while it is up.
      let active = case keys.overlay(m) {
        Ok(rows) -> rows
        Error(Nil) -> screen.keys
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
        AuthRoute -> element.fragment([screen.element, ..syncing])
        _ ->
          element.fragment([
            screen.element,
            statusbar.view(m, active, screen.label),
            help.button(m),
            help.view(m, screen.keys, screen.label),
            ..syncing
          ])
      }
    }
  }
}

fn legacy_screen(m: Model) -> Element(Msg) {
  case m.route {
    // Drawn by its page module; never reached.
    AuthRoute -> element.none()
    TracksRoute -> tracks.view(m)
    SettingsRoute -> element.none()
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
}

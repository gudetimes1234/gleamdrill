//// The view shell: the boot gate, the route dispatch to each screen's
//// module, the sync bar, and the status bar and help chrome every screen
//// shares.

import gleam/option.{None, Some}
import gleamdrill/model.{
  type Model, AuthRoute, CompareRoute, DrillRoute, MenuRoute, NotStarted,
  QueueRoute, ReportRoute, SettingsRoute, StatsRoute, StudyRoute, SummaryRoute,
  SyncFailed, Synced, Syncing, TourRoute, TracksRoute,
}
import gleamdrill/msg.{type Msg}
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
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html

pub fn view(m: Model) -> Element(Msg) {
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

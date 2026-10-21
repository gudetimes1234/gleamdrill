//// The view shell: the boot gate, the sync bar, and the status bar and
//// help chrome around whichever page `app` drew.

import gleamdrill/model.{
  type Model, AuthRoute, NotStarted, SyncFailed, Synced, Syncing,
}
import gleamdrill/msg.{type Msg}
import gleamdrill/ui/binding.{type Binding}
import gleamdrill/ui/boot
import gleamdrill/ui/help
import gleamdrill/ui/keys
import gleamdrill/ui/statusbar
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html

/// A screen as the chrome sees it: what to draw, the keys it answers to (the
/// status bar and the help overlay list these), and the status bar's label.
pub type Screen {
  Screen(element: Element(Msg), keys: List(Binding(Msg)), label: String)
}

pub fn view(m: Model, screen: Screen) -> Element(Msg) {
  case m.boot {
    // The one blocking load. A guest resolves it locally and instantly; an
    // account waits on the network, and a failure there is a dead end worth
    // saying out loud, because the app is online-only once signed in.
    NotStarted | Syncing | SyncFailed(_) -> boot.loading(m)
    Synced -> {
      // An overlay (the cheatsheet) owns the keys while it is up.
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

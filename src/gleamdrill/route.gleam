//// URLs: the address of each screen that has one, and reading an address
//// back into a screen.
////
////   /tracks                 the track switcher
////   /t/<track>/study        a track's study screen (the track by its slug,
////                           `neetcode-150-go`)
////   /t/<track>/browse       its problem browser
////   /t/<track>/queue        its queue manager
////   /t/<track>/stats        its progress page
////   /settings  /tour  /login
////
//// A sitting has no address of its own: it is in-memory, so the URL stays
//// on the screen it was started from, and a reload lands back there. The
//// compare view is the same, under the browser.

import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/string
import gleam/uri.{type Uri}
import gleamdrill/domain/track
import gleamdrill/model.{
  type Route, AuthRoute, MenuRoute, QueueRoute, SettingsRoute, StatsRoute,
  StudyRoute, TourRoute, TracksRoute,
}

/// Where an address points: a screen, and the track it is in when the
/// screen lives inside one.
pub type Location {
  Location(route: Route, track: Option(String))
}

/// The address for a screen in `track`, or `None` for a screen with no
/// address of its own (a sitting, the compare view).
pub fn path(route: Route, name: String) -> Option(String) {
  let in_track = fn(screen) {
    case name {
      // No track chosen yet: the screens inside one have nowhere to be.
      "" -> Some("/tracks")
      _ -> Some("/t/" <> track.slug(name) <> "/" <> screen)
    }
  }
  case route {
    TracksRoute -> Some("/tracks")
    SettingsRoute -> Some("/settings")
    TourRoute -> Some("/tour")
    AuthRoute -> Some("/login")
    StudyRoute -> in_track("study")
    MenuRoute -> in_track("browse")
    QueueRoute -> in_track("queue")
    StatsRoute -> in_track("stats")
    _ -> None
  }
}

/// The screen an address names. `/` names none: the app lands where it
/// would anyway. An address it does not know is the same.
pub fn parse(address: Uri) -> Option(Location) {
  case uri.path_segments(address.path) {
    ["tracks"] -> Some(Location(TracksRoute, None))
    ["settings"] -> Some(Location(SettingsRoute, None))
    ["tour"] -> Some(Location(TourRoute, None))
    ["login"] -> Some(Location(AuthRoute, None))
    // A slug the catalogue does not know (a renamed track, a typo) names
    // nothing, rather than a track with no problems in it.
    ["t", slug, screen] ->
      case track.from_slug(slug), screen_named(screen) {
        Ok(name), Ok(route) -> Some(Location(route, Some(name)))
        _, _ -> None
      }
    _ -> None
  }
}

fn screen_named(name: String) -> Result(Route, Nil) {
  [
    #("study", StudyRoute),
    #("browse", MenuRoute),
    #("queue", QueueRoute),
    #("stats", StatsRoute),
  ]
  |> list.key_find(string.lowercase(name))
}

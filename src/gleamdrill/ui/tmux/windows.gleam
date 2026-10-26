//// tmux's windows and sessions, as the app's screens and tracks.
////
//// The windows are the screens in one fixed order, numbered from 0, with
//// the drill appended while a sitting is up (a sitting has no address and
//// cannot be backgrounded, so its window only exists while it runs). The
//// sessions are the tracks in `track.ordered`'s order.

import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleam/result
import gleam/string
import gleamdrill/domain/track
import gleamdrill/model.{
  type Model, type Route, AuthRoute, CompareRoute, DrillRoute, MenuRoute,
  QueueRoute, ReportRoute, SettingsRoute, StatsRoute, StudyRoute, SummaryRoute,
  TourRoute, TracksRoute,
}
import gleamdrill/ui/tmux/command.{
  type Target, Index, Last, Named, Next, Previous,
}

pub type Window {
  Window(index: Int, name: String, route: Route)
}

const screens = [
  #("study", StudyRoute),
  #("browse", MenuRoute),
  #("queue", QueueRoute),
  #("stats", StatsRoute),
  #("tour", TourRoute),
  #("settings", SettingsRoute),
]

/// The windows open now, in index order.
pub fn all(m: Model) -> List(Window) {
  let fixed = case window_route(m.route) {
    Ok(DrillRoute) -> list.append(screens, [#("drill", DrillRoute)])
    _ -> screens
  }
  list.index_map(fixed, fn(screen, index) {
    Window(index:, name: screen.0, route: screen.1)
  })
}

/// The window a route belongs to: the compare view is the browser's, the
/// summary and report are the drill's. The track switcher and sign-in are
/// outside every window, the way tmux's own choosers are.
pub fn window_route(route: Route) -> Result(Route, Nil) {
  case route {
    CompareRoute -> Ok(MenuRoute)
    SummaryRoute | ReportRoute | DrillRoute -> Ok(DrillRoute)
    TracksRoute | AuthRoute -> Error(Nil)
    other -> Ok(other)
  }
}

pub fn current(m: Model) -> Result(Window, Nil) {
  use route <- result.try(window_route(m.route))
  list.find(all(m), fn(window) { window.route == route })
}

/// Whether the window last left is still open (the drill's closes).
pub fn last(m: Model) -> Result(Window, Nil) {
  use route <- result.try(option.to_result(m.last_route, Nil))
  use route <- result.try(window_route(route))
  list.find(all(m), fn(window) { window.route == route })
}

/// The window a target names, or tmux's complaint.
pub fn resolve(m: Model, target: Target) -> Result(Window, String) {
  let windows = all(m)
  let here = current(m) |> result.map(fn(w) { w.index })
  case target {
    Next -> Ok(step(windows, here, 1))
    Previous -> Ok(step(windows, here, -1))
    Last -> last(m) |> result.replace_error("no last window")
    Index(n) ->
      list.find(windows, fn(w) { w.index == n })
      |> result.replace_error("can't find window: " <> int.to_string(n))
    Named(name) ->
      named(windows, name, fn(w: Window) { w.name })
      |> result.replace_error("can't find window: " <> name)
  }
}

/// The track a target names, or tmux's complaint.
pub fn resolve_session(m: Model, target: Target) -> Result(String, String) {
  let tracks = sessions(m)
  let here =
    list.index_map(tracks, fn(name, i) { #(name, i) })
    |> list.key_find(m.active_track)
  case target, tracks {
    _, [] -> Error("no sessions")
    Next, _ -> Ok(step(tracks, here, 1))
    Previous, _ -> Ok(step(tracks, here, -1))
    Last, _ ->
      case m.last_track {
        Some(name) -> Ok(name)
        None -> Error("no last client")
      }
    Index(n), _ ->
      list.drop(tracks, n)
      |> list.first
      |> result.replace_error("can't find session: " <> int.to_string(n))
    Named(name), _ ->
      named(tracks, name, track.slug)
      |> result.replace_error("can't find session: " <> name)
  }
}

/// The tracks, in the switcher's order.
pub fn sessions(m: Model) -> List(String) {
  track.ordered(m.tracks)
}

/// `by` along from `here`, wrapping as tmux does; from outside every window
/// (`here` an Error), Next is the first and Previous the last.
fn step(items: List(a), here: Result(Int, Nil), by: Int) -> a {
  let count = list.length(items)
  let index = case here {
    Ok(i) -> { i + by + count } % count
    Error(Nil) if by > 0 -> 0
    Error(Nil) -> count - 1
  }
  let assert Ok(item) = list.drop(items, index) |> list.first
  item
}

/// An exact name first, then the one name it begins.
fn named(items: List(a), name: String, of: fn(a) -> String) -> Result(a, Nil) {
  case list.find(items, fn(item) { of(item) == name }) {
    Ok(item) -> Ok(item)
    Error(Nil) ->
      case list.filter(items, fn(item) { string.starts_with(of(item), name) }) {
        [only] -> Ok(only)
        _ -> Error(Nil)
      }
  }
}

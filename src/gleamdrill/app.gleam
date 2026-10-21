//// The application: the shared state, the page on screen, and the dispatch
//// between them.
////
//// Each page under `page/` owns its model, its messages, its update, its
//// view and its keys. The app holds one page at a time, routes each page's
//// messages to it, and applies the `Change`s a page asks for to the shared
//// state. Screens not yet moved into `page/` run as the `Legacy` page, on
//// the flat model and the old dispatcher; `msg.Msg` carries both kinds of
//// message.

import gleam/list
import gleam/option.{None, Some}
import gleamdrill/keys
import gleamdrill/model.{type Route, AuthRoute, SettingsRoute, TracksRoute}
import gleamdrill/msg.{type Msg}
import gleamdrill/page/auth/keys as auth_keys
import gleamdrill/page/auth/model as auth_model
import gleamdrill/page/auth/update as auth_update
import gleamdrill/page/auth/view as auth_view
import gleamdrill/page/settings/keys as settings_keys
import gleamdrill/page/settings/model as settings_model
import gleamdrill/page/settings/update as settings_update
import gleamdrill/page/settings/view as settings_view
import gleamdrill/page/tracks/keys as tracks_keys
import gleamdrill/page/tracks/model as tracks_model
import gleamdrill/page/tracks/update as tracks_update
import gleamdrill/page/tracks/view as tracks_view
import gleamdrill/platform/browser
import gleamdrill/shared.{type Change, type Shared}
import gleamdrill/store
import gleamdrill/ui/binding.{type Binding}
import gleamdrill/ui/document
import gleamdrill/ui/layout
import gleamdrill/update as legacy_update
import gleamdrill/update/common
import gleamdrill/update/keyboard
import gleamdrill/update/menu as menu_update
import gleamdrill/update/session as session_update
import gleamdrill/view as legacy_view
import lustre/effect.{type Effect}
import lustre/element.{type Element}

pub type State {
  State(shared: Shared, page: Page)
}

/// The screen on display, holding that screen's own state.
pub type Page {
  Legacy
  Auth(auth_model.Model)
  Settings(settings_model.Model)
  Tracks(tracks_model.Model)
}

pub fn init(boot: #(Shared, Effect(Msg))) -> #(State, Effect(Msg)) {
  let #(shared, fx) = boot
  let #(state, opened) = sync_page(State(shared:, page: Legacy))
  #(state, effect.batch([fx, opened]))
}

pub fn update(state: State, message: Msg) -> #(State, Effect(Msg)) {
  case message, state.page {
    msg.AuthMsg(inner), Auth(page) ->
      auth_update.update(state.shared, page, inner)
      |> settle(state, Auth, msg.AuthMsg)
    msg.SettingsMsg(inner), Settings(page) ->
      settings_update.update(state.shared, page, inner)
      |> settle(state, Settings, msg.SettingsMsg)
    msg.TracksMsg(inner), Tracks(page) ->
      tracks_update.update(state.shared, page, inner)
      |> settle(state, Tracks, msg.TracksMsg)
    // A page's message that lands after its page closed (a slow response):
    // there is nothing left for it to update.
    msg.AuthMsg(_), _ | msg.SettingsMsg(_), _ | msg.TracksMsg(_), _ -> #(
      state,
      effect.none(),
    )

    msg.KeyPressed(key), page if page != Legacy -> key_pressed(state, key)

    // Navigation into pages.
    msg.UserClickedSignIn(mode), _ -> #(
      State(
        shared: model.Model(..state.shared, route: AuthRoute),
        page: Auth(auth_model.init(mode)),
      ),
      effect.none(),
    )
    msg.UserClickedSettings, _ -> navigate(state, SettingsRoute)

    _, _ -> {
      let #(shared, fx) = legacy_update.update(state.shared, message)
      let #(state, opened) = sync_page(State(..state, shared:))
      #(state, effect.batch([fx, opened]))
    }
  }
}

pub fn view(state: State) -> Element(Msg) {
  let shared = state.shared
  legacy_view.view(shared, case state.page {
    Legacy -> None
    Auth(page) ->
      Some(legacy_view.Screen(
        auth_view.view(shared, page) |> element.map(msg.AuthMsg),
        page_keys(state),
        auth_keys.label,
      ))
    Settings(page) ->
      Some(legacy_view.Screen(
        settings_view.view(shared, page)
          |> document.map(msg.SettingsMsg)
          |> layout.view(shared, SettingsRoute, _),
        page_keys(state),
        settings_keys.label,
      ))
    Tracks(page) ->
      Some(legacy_view.Screen(
        tracks_view.view(shared, page)
          |> document.map(msg.TracksMsg)
          |> layout.view(shared, TracksRoute, _),
        page_keys(state),
        tracks_keys.label,
      ))
  })
}

/// The page's own rows, lifted into the app's message.
fn page_keys(state: State) -> List(Binding(Msg)) {
  case state.page {
    Legacy -> []
    Auth(page) -> auth_keys.bindings(state.shared, page) |> lift(msg.AuthMsg)
    Settings(page) ->
      settings_keys.bindings(state.shared, page) |> lift(msg.SettingsMsg)
    Tracks(page) ->
      tracks_keys.bindings(state.shared, page) |> lift(msg.TracksMsg)
  }
}

fn lift(rows: List(Binding(a)), to: fn(a) -> Msg) -> List(Binding(Msg)) {
  list.map(rows, binding.map(_, to))
}

/// A page's update result folded back in: its model stored, its effect
/// lifted, its changes applied, and the page re-matched to the route.
fn settle(
  result: #(page, Effect(page_msg), List(Change)),
  state: State,
  page: fn(page) -> Page,
  to: fn(page_msg) -> Msg,
) -> #(State, Effect(Msg)) {
  let #(model, fx, changes) = result
  let #(shared, applied) = apply(state.shared, changes)
  let #(state, opened) = sync_page(State(shared:, page: page(model)))
  let settled = #(state, effect.batch([effect.map(fx, to), applied, opened]))
  // Messages a page handed up run last, against the settled state.
  list.fold(changes, settled, fn(acc, change) {
    case change {
      shared.Dispatch(message) -> {
        let #(state, fx) = acc
        let #(state, more) = update(state, message)
        #(state, effect.batch([fx, more]))
      }
      _ -> acc
    }
  })
}

/// A key on a page screen: the same leader and focus rules as everywhere,
/// resolved against an open overlay first, then the page's rows.
fn key_pressed(state: State, key: msg.Key) -> #(State, Effect(Msg)) {
  let rows = page_keys(state)
  let lookup = fn(shared, key: msg.Key) {
    case keys.overlay(shared) {
      Ok(overlay) -> binding.find(overlay, key.key)
      Error(Nil) -> binding.find(rows, key.key)
    }
  }
  let #(shared, step) = keyboard.step(state.shared, key, lookup)
  let state = State(..state, shared:)
  case step {
    keyboard.Ignore -> #(state, effect.none())
    keyboard.Blur -> #(state, common.run_effect(browser.blur_active))
    keyboard.Send(resolved) -> update(state, resolved)
  }
}

fn navigate(state: State, route: Route) -> #(State, Effect(Msg)) {
  sync_page(State(..state, shared: model.Model(..state.shared, route:)))
}

/// Applies a page's changes to the shared state, in order.
fn apply(shared: Shared, changes: List(Change)) -> #(Shared, Effect(Msg)) {
  let #(shared, effects) =
    list.fold(changes, #(shared, []), fn(acc, change) {
      let #(shared, effects) = acc
      let #(shared, more) = apply_change(shared, change)
      #(shared, [more, ..effects])
    })
  #(shared, effect.batch(list.reverse(effects)))
}

fn apply_change(shared: Shared, change: Change) -> #(Shared, Effect(Msg)) {
  case change {
    shared.Navigate(route) -> #(model.Model(..shared, route:), effect.none())
    shared.SignedIn(session, registered) ->
      session_update.signed_in(shared, session, registered)
    shared.Notice(text) -> #(
      model.Model(..shared, notice: Some(text)),
      effect.none(),
    )
    shared.ProfileChanged(profile) -> #(
      model.Model(
        ..shared,
        settings: profile.settings,
        account: profile.account,
      ),
      effect.none(),
    )
    shared.KeymapChanged(mode) -> {
      let shared = model.Model(..shared, editor_keymap: mode)
      #(shared, common.save_preferences(shared))
    }
    shared.Refreshing(on) -> #(
      model.Model(..shared, refreshing: on),
      effect.none(),
    )
    shared.Reload -> #(
      model.Model(..shared, refreshing: True),
      store.load_state(shared, msg.StateLoaded),
    )
    shared.ToggleHelp -> keyboard.toggle_help(shared)
    shared.EnterTrack(track, starter) ->
      menu_update.enter_track(shared, track, starter:)
    // Run by `settle` once the rest have landed.
    shared.Dispatch(_) -> #(shared, effect.none())
  }
}

/// The route is still where navigation is decided while screens move into
/// pages: when it lands on a page's route, that page opens fresh (with
/// whatever its init fetches); when it leaves, the page closes.
fn sync_page(state: State) -> #(State, Effect(Msg)) {
  case state.shared.route, state.page {
    AuthRoute, Auth(_) | SettingsRoute, Settings(_) | TracksRoute, Tracks(_) -> #(
      state,
      effect.none(),
    )
    TracksRoute, _ -> #(
      State(..state, page: Tracks(tracks_model.Model)),
      effect.none(),
    )
    AuthRoute, _ -> #(
      State(..state, page: Auth(auth_model.init(auth_model.SigningIn))),
      effect.none(),
    )
    SettingsRoute, _ -> {
      let #(page, fx) = settings_update.init(state.shared)
      #(State(..state, page: Settings(page)), effect.map(fx, msg.SettingsMsg))
    }
    _, _ -> #(State(..state, page: Legacy), effect.none())
  }
}

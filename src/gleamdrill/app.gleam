//// The application: the shared state, the page on screen, and the dispatch
//// between them.
////
//// Each page under `page/` owns its model, its messages, its update and its
//// view. The app holds one page at a time, routes each page's messages to
//// it, and applies the `Change`s a page asks for to the shared state.
//// Screens not yet moved into `page/` run as the `Legacy` page, on the flat
//// model and the old dispatcher; `msg.Msg` carries both kinds of message.

import gleam/list
import gleam/option.{None, Some}
import gleamdrill/keys
import gleamdrill/model.{AuthRoute}
import gleamdrill/msg.{type Msg}
import gleamdrill/page/auth/keys as auth_keys
import gleamdrill/page/auth/model as auth_model
import gleamdrill/page/auth/update as auth_update
import gleamdrill/page/auth/view as auth_view
import gleamdrill/platform/browser
import gleamdrill/shared.{type Change, type Shared}
import gleamdrill/ui/binding.{type Binding}
import gleamdrill/update as legacy_update
import gleamdrill/update/common
import gleamdrill/update/keyboard
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
}

pub fn init(boot: #(Shared, Effect(Msg))) -> #(State, Effect(Msg)) {
  let #(shared, fx) = boot
  #(sync_page(State(shared:, page: Legacy)), fx)
}

pub fn update(state: State, message: Msg) -> #(State, Effect(Msg)) {
  case message, state.page {
    msg.AuthMsg(inner), Auth(page) -> {
      let #(page, fx, changes) = auth_update.update(state.shared, page, inner)
      State(..state, page: Auth(page))
      |> apply(changes, effect.map(fx, msg.AuthMsg))
    }
    // A page's message that lands after its page closed (a slow response):
    // there is nothing left for it to update.
    msg.AuthMsg(_), _ -> #(state, effect.none())
    msg.KeyPressed(key), page if page != Legacy -> key_pressed(state, key)
    msg.UserClickedSignIn(mode), _ -> #(
      State(
        shared: model.Model(..state.shared, route: AuthRoute),
        page: Auth(auth_model.init(mode)),
      ),
      effect.none(),
    )
    _, _ -> {
      let #(shared, fx) = legacy_update.update(state.shared, message)
      #(sync_page(State(..state, shared:)), fx)
    }
  }
}

pub fn view(state: State) -> Element(Msg) {
  legacy_view.view(state.shared, case state.page {
    Legacy -> None
    Auth(page) ->
      Some(legacy_view.Screen(
        auth_view.view(state.shared, page) |> element.map(msg.AuthMsg),
        page_keys(state),
        auth_keys.label,
      ))
  })
}

/// The page's own rows, lifted into the app's message.
fn page_keys(state: State) -> List(Binding(Msg)) {
  case state.page {
    Legacy -> []
    Auth(page) ->
      auth_keys.bindings(state.shared, page)
      |> list.map(binding.map(_, msg.AuthMsg))
  }
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

/// Applies a page's changes in order, then makes the page match the route.
fn apply(
  state: State,
  changes: List(Change),
  fx: Effect(Msg),
) -> #(State, Effect(Msg)) {
  let #(state, effects) =
    list.fold(changes, #(state, [fx]), fn(acc, change) {
      let #(state, effects) = acc
      let #(shared, more) = apply_change(state.shared, change)
      #(State(..state, shared:), [more, ..effects])
    })
  #(sync_page(state), effect.batch(list.reverse(effects)))
}

fn apply_change(shared: Shared, change: Change) -> #(Shared, Effect(Msg)) {
  case change {
    shared.Navigate(route) -> #(
      model.Model(..shared, route: route),
      effect.none(),
    )
    shared.SignedIn(session, registered) ->
      session_update.signed_in(shared, session, registered)
  }
}

/// The route is still where navigation is decided while screens move into
/// pages: when it lands on a page's route, that page opens fresh; when it
/// leaves, the page closes.
fn sync_page(state: State) -> State {
  case state.shared.route, state.page {
    AuthRoute, Auth(_) -> state
    AuthRoute, _ ->
      State(..state, page: Auth(auth_model.init(auth_model.SigningIn)))
    _, _ -> State(..state, page: Legacy)
  }
}

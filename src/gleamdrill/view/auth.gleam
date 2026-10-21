//// The boot screen: shown while the first state load is in flight, and
//// when it fails. The sign-in form itself is `page/auth`.

import gleamdrill/model.{type Model}
import gleamdrill/msg.{type Msg}
import gleamdrill/view/brand
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

/// Shown while the first `/api/state` is in flight, and when it fails.
///
/// The failure case matters more than it looks: the app is online-only, so a
/// server that cannot be reached is a dead end rather than a degraded mode,
/// and saying so plainly beats an empty screen.
pub fn loading(m: Model) -> Element(Msg) {
  html.div([attribute.class("auth-screen")], [
    html.div([attribute.class("auth-card")], [
      case m.boot {
        model.SyncFailed(message) ->
          element.fragment([
            html.h1([attribute.class("auth-title")], [html.text("Offline")]),
            html.p([attribute.class("auth-subtitle")], [html.text(message)]),
            html.button(
              [
                attribute.class("auth-submit"),
                attribute.type_("button"),
                event.on_click(msg.UserClickedRetrySync),
              ],
              [html.text("Try again")],
            ),
            html.button(
              [
                attribute.class("auth-switch"),
                attribute.type_("button"),
                event.on_click(msg.UserClickedSignOut),
              ],
              [html.text("Sign out and study as a guest")],
            ),
          ])
        _ ->
          element.fragment([
            html.h1([attribute.class("auth-title")], brand.wordmark()),
            html.p([attribute.class("auth-subtitle auth-loading")], [
              html.span(
                [
                  attribute.class("spinner"),
                  attribute.attribute("aria-hidden", "true"),
                ],
                [],
              ),
              html.text("Loading your cards…"),
            ]),
          ])
      },
    ]),
  ])
}

//// The row every top-level screen shares: where you can go, who you are,
//// and whatever the server last had to say. Study, Queue, Stats and Settings
//// each render it, so moving between them is one click rather than a bounce
//// through the study screen -- and an error raised on the queue screen is
//// shown on the queue screen.

import algodrill/model.{
  type Model, type Msg, type Route, Account, Guest, QueueRoute, SettingsRoute,
  SigningIn, StatsRoute, StudyRoute, UserClickedBackToStudy, UserClickedQueue,
  UserClickedSettings, UserClickedSignIn, UserClickedSignOut, UserClickedStats,
  UserDismissedMergeOffer, UserDismissedNotice,
}
import gleam/list
import gleam/option.{None, Some}
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

pub fn bar(m: Model, current: Route) -> Element(Msg) {
  let places = [
    #("Study", StudyRoute, UserClickedBackToStudy),
    #("Queue", QueueRoute, UserClickedQueue),
    #("Stats", StatsRoute, UserClickedStats),
    #("Settings", SettingsRoute, UserClickedSettings),
  ]
  let links =
    list.map(places, fn(place) {
      let #(label, route, msg) = place
      case route == current {
        True ->
          html.span(
            [
              attribute.class("nav-link nav-current"),
              attribute.attribute("aria-current", "page"),
            ],
            [html.text(label)],
          )
        False ->
          html.button(
            [attribute.class("link-button nav-link"), event.on_click(msg)],
            [html.text(label)],
          )
      }
    })
  let account = case m.mode {
    Guest -> [
      html.span([attribute.class("study-email")], [html.text("Guest")]),
      html.button(
        [
          attribute.class("link-button nav-link"),
          event.on_click(UserClickedSignIn(SigningIn)),
        ],
        [html.text("Sign in")],
      ),
    ]
    Account(_) -> [
      html.span([attribute.class("study-email")], [
        html.text(case m.user {
          Some(user) -> user.email
          None -> ""
        }),
      ]),
      html.button(
        [
          attribute.class("link-button nav-link"),
          event.on_click(UserClickedSignOut),
        ],
        [html.text("Sign out")],
      ),
    ]
  }
  html.nav(
    [
      attribute.class("study-account"),
      attribute.attribute("aria-label", "Screens"),
    ],
    list.flatten([links, [html.span([attribute.class("nav-gap")], [])], account]),
  )
}

/// The server's last word, and the offer to merge guest progress. Rendered by
/// every top-level screen so a message is seen where it was caused.
pub fn notices(m: Model) -> Element(Msg) {
  element.fragment([merge_offer(m), notice(m)])
}

/// A dismissible banner for whatever last went wrong with the server.
fn notice(m: Model) -> Element(Msg) {
  case m.notice {
    None -> element.none()
    Some(message) ->
      html.div([attribute.class("notice"), attribute.role("status")], [
        html.span([attribute.class("notice-text")], [html.text(message)]),
        html.button(
          [
            attribute.class("notice-dismiss"),
            attribute.attribute("aria-label", "Dismiss"),
            event.on_click(UserDismissedNotice),
          ],
          [html.text("\u{00D7}")],
        ),
      ])
  }
}

/// Offered while signed in and this browser still holds guest progress.
/// Merging is not automatic: folding scratch progress into an established
/// account unasked would be surprising. Dismissing it dismisses only it.
fn merge_offer(m: Model) -> Element(Msg) {
  case m.merge_offer {
    False -> element.none()
    True ->
      html.div([attribute.class("notice"), attribute.role("status")], [
        html.span([attribute.class("notice-text")], [
          html.text(
            "This browser has progress saved from before you signed in. "
            <> "Merge it into this account?",
          ),
        ]),
        html.button(
          [
            attribute.class("guest-strip-action"),
            event.on_click(model.UserClickedMergeGuest),
          ],
          [html.text("Merge it")],
        ),
        html.button(
          [
            attribute.class("notice-dismiss"),
            attribute.attribute("aria-label", "Dismiss"),
            event.on_click(UserDismissedMergeOffer),
          ],
          [html.text("\u{00D7}")],
        ),
      ])
  }
}

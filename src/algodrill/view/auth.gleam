//// The sign-in gate.
////
//// One form, two modes. There is no password-reset link yet, which is a
//// deliberate omission rather than an oversight — see the plan's deferred
//// list — so the copy does not promise one.

import algodrill/model.{
  type Model, type Msg, Guest, Registering, UserChangedAuthEmail,
  UserChangedAuthPassword, UserClickedBackToStudy, UserSubmittedAuth,
  UserToggledAuthMode,
}
import gleam/option.{None, Some}
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

pub fn view(m: Model) -> Element(Msg) {
  let form = m.auth
  let registering = form.mode == Registering

  html.div([attribute.class("auth-screen")], [
    html.form(
      [
        attribute.class("auth-card"),
        // The form element is what makes Enter submit; the handler prevents
        // the browser's own navigation.
        event.on_submit(fn(_fields) { UserSubmittedAuth }),
      ],
      [
        html.h1([attribute.class("auth-title")], [html.text("AlgoDrill")]),
        html.p([attribute.class("auth-subtitle")], [
          html.text(case registering, m.mode {
            // Naming what is at stake beats a generic pitch, and as a guest
            // there is something concrete at stake.
            True, Guest ->
              "Your progress moves to the account, and follows you to any browser."
            True, _ -> "Create an account to keep your progress across devices."
            False, _ -> "Sign in to pick up where you left off."
          }),
        ]),
        field(
          "Email",
          "email",
          "email",
          form.email,
          "you@example.com",
          UserChangedAuthEmail,
        ),
        field(
          "Password",
          "password",
          case registering {
            True -> "new-password"
            False -> "current-password"
          },
          form.password,
          case registering {
            True -> "at least 12 characters"
            False -> ""
          },
          UserChangedAuthPassword,
        ),
        case form.error {
          Some(message) ->
            html.p([attribute.class("auth-error"), attribute.role("alert")], [
              html.text(message),
            ])
          None -> element.none()
        },
        html.button(
          [
            attribute.class("auth-submit"),
            attribute.type_("submit"),
            attribute.disabled(form.busy),
          ],
          [
            html.text(case form.busy, registering {
              True, _ -> "Working…"
              False, True -> "Create account"
              False, False -> "Sign in"
            }),
          ],
        ),
        html.button(
          [
            attribute.class("auth-switch"),
            attribute.type_("button"),
            event.on_click(UserToggledAuthMode),
          ],
          [
            html.text(case registering {
              True -> "Already have an account? Sign in"
              False -> "No account yet? Create one"
            }),
          ],
        ),
        // Reachable only as a guest: someone who arrived here from the study
        // screen must be able to get back to it without an account, which is
        // the entire point of guest mode.
        case m.mode {
          Guest ->
            html.button(
              [
                attribute.class("auth-switch"),
                attribute.type_("button"),
                event.on_click(UserClickedBackToStudy),
              ],
              [html.text("Keep studying without an account")],
            )
          _ -> element.none()
        },
      ],
    ),
  ])
}

fn field(
  label: String,
  kind: String,
  autocomplete: String,
  value: String,
  placeholder: String,
  on_input: fn(String) -> Msg,
) -> Element(Msg) {
  html.label([attribute.class("auth-field")], [
    html.span([attribute.class("auth-label")], [html.text(label)]),
    html.input([
      attribute.class("auth-input"),
      attribute.type_(kind),
      attribute.autocomplete(autocomplete),
      attribute.value(value),
      attribute.placeholder(placeholder),
      event.on_input(on_input),
    ]),
  ])
}

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
                event.on_click(model.UserClickedSignOut),
              ],
              [html.text("Sign out")],
            ),
          ])
        _ ->
          element.fragment([
            html.h1([attribute.class("auth-title")], [html.text("AlgoDrill")]),
            html.p([attribute.class("auth-subtitle")], [
              html.text("Loading your cards…"),
            ]),
          ])
      },
    ]),
  ])
}

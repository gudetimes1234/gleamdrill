//// The sign-in page.
////
//// One form, two modes. There is no password-reset link yet, which is a
//// deliberate omission rather than an oversight, so the copy does not
//// promise one.

import gleam/option.{None, Some}
import gleamdrill/model as shared_model
import gleamdrill/page/auth/model.{type Model, Registering}
import gleamdrill/page/auth/msg.{
  type Msg, UserChangedEmail, UserChangedPassword, UserClickedBack,
  UserSubmitted, UserToggledMode,
}
import gleamdrill/shared.{type Shared}
import gleamdrill/ui/brand
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

pub fn view(shared: Shared, form: Model) -> Element(Msg) {
  let registering = form.mode == Registering

  html.div([attribute.class("auth-screen")], [
    html.form(
      [
        attribute.class("auth-card"),
        // The form element is what makes Enter submit; the handler prevents
        // the browser's own navigation.
        event.on_submit(fn(_fields) { UserSubmitted }),
      ],
      [
        html.h1([attribute.class("auth-title")], brand.wordmark()),
        html.p([attribute.class("auth-subtitle")], [
          html.text(case registering, shared.mode {
            // Naming what is at stake beats a generic pitch, and as a guest
            // there is something concrete at stake.
            True, shared_model.Guest ->
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
          UserChangedEmail,
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
          UserChangedPassword,
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
            event.on_click(UserToggledMode),
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
        case shared.mode {
          shared_model.Guest ->
            html.button(
              [
                attribute.class("auth-switch"),
                attribute.type_("button"),
                event.on_click(UserClickedBack),
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

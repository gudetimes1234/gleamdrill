//// The sign-in form. Everything after a successful sign-in -- the session,
//// the guest merge, loading the account's state -- belongs to the shared
//// state, so it goes up as a `SignedIn` change rather than happening here.

import gleam/option.{None, Some}
import gleamdrill/model as shared_model
import gleamdrill/page/auth/model.{type Model, Model, Registering, SigningIn}
import gleamdrill/page/auth/msg.{type Msg}
import gleamdrill/shared.{type Change, type Shared}
import gleamdrill/store
import gleamdrill/store/remote
import lustre/effect.{type Effect}

pub fn update(
  _shared: Shared,
  model: Model,
  msg: Msg,
) -> #(Model, Effect(Msg), List(Change)) {
  case msg {
    msg.UserChangedEmail(value) -> #(
      Model(..model, email: value, error: None),
      effect.none(),
      [],
    )
    msg.UserChangedPassword(value) -> #(
      Model(..model, password: value, error: None),
      effect.none(),
      [],
    )
    msg.UserToggledMode -> #(
      Model(
        ..model,
        mode: case model.mode {
          SigningIn -> Registering
          Registering -> SigningIn
        },
        error: None,
      ),
      effect.none(),
      [],
    )
    msg.UserSubmitted -> submit(model)
    msg.UserClickedBack -> #(model, effect.none(), [
      shared.Navigate(shared_model.StudyRoute),
    ])
    // The password leaves the model the moment it is no longer needed.
    msg.Completed(Ok(session)) -> #(
      Model(..model, password: "", busy: False, error: None),
      effect.none(),
      [shared.SignedIn(session, registered: model.mode == Registering)],
    )
    msg.Completed(Error(failure)) -> #(
      Model(..model, busy: False, error: Some(remote.error_message(failure))),
      effect.none(),
      [],
    )
  }
}

fn submit(model: Model) -> #(Model, Effect(Msg), List(Change)) {
  case model.busy, model.email, model.password {
    // A second submit while one is in flight is ignored, so a double click
    // cannot create two accounts.
    True, _, _ -> #(model, effect.none(), [])
    False, "", _ | False, _, "" -> #(
      Model(..model, error: Some("Enter an email and a password.")),
      effect.none(),
      [],
    )
    False, email, password -> #(
      Model(..model, busy: True, error: None),
      case model.mode {
        SigningIn -> store.login(email, password, msg.Completed)
        Registering -> store.signup(email, password, msg.Completed)
      },
      [],
    )
  }
}

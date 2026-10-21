//// The sign-in page's keys: the form owns the keyboard, so the one row is
//// the way back for a guest.

import gleamdrill/model as shared_model
import gleamdrill/page/auth/model.{type Model}
import gleamdrill/page/auth/msg.{type Msg, UserClickedBack}
import gleamdrill/shared.{type Shared}
import gleamdrill/ui/binding.{type Binding, Binding}

pub const label = "SIGN IN"

pub fn bindings(shared: Shared, _model: Model) -> List(Binding(Msg)) {
  case shared.mode {
    shared_model.Guest -> [
      Binding(
        ["Escape"],
        "back",
        "Keep studying without an account",
        UserClickedBack,
      ),
    ]
    shared_model.Account(_) -> []
  }
}

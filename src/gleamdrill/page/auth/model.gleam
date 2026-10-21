//// The sign-in page's state: one form, two modes.

import gleam/option.{type Option, None}

pub type Mode {
  SigningIn
  Registering
}

pub type Model {
  Model(
    mode: Mode,
    email: String,
    password: String,
    /// A request is in flight; a second submit is ignored.
    busy: Bool,
    error: Option(String),
  )
}

pub fn init(mode: Mode) -> Model {
  Model(mode:, email: "", password: "", busy: False, error: None)
}

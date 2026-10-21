import gleamdrill/store/remote.{type ApiError}
import wire

pub type Msg {
  UserChangedEmail(String)
  UserChangedPassword(String)
  UserToggledMode
  UserSubmitted
  /// Guests only: back to studying without an account.
  UserClickedBack
  Completed(Result(wire.Session, ApiError))
}

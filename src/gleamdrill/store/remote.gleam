//// What going to the server can cost: the error vocabulary every remote
//// call shares, and the words the app shows for it.
////
//// Its own module, below `model` and beside `wire`, so the state layer and
//// the views can name a failed request without importing the HTTP client
//// (`api.gleam`) that produced it. Pure data — no rsvp, no effects.

pub type ApiError {
  /// No session, or it expired. The only error the app reacts to structurally:
  /// it means sign in again.
  Unauthorised
  /// The request was refused for a reason worth showing verbatim -- a taken
  /// email, a password that is too short, too many attempts.
  Rejected(message: String)
  /// The request never reached the server.
  Offline
  ServerFault(message: String)
}

pub fn error_message(error: ApiError) -> String {
  case error {
    Unauthorised -> "Your session has expired. Sign in again."
    Rejected(message) -> message
    Offline -> "Can't reach the server. Check your connection."
    ServerFault(message) -> message
  }
}

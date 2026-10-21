//// What going to the server can cost: the error vocabulary every remote
//// call shares, the words the app shows for it, and `Data`, where a load
//// stands.
////
//// Its own module, below `model` and beside `wire`, so the state layer and
//// the views can name a failed request without importing the HTTP client
//// (`api.gleam`) that produced it. Pure data — no rsvp, no effects.

import gleam/option.{type Option, None, Some}

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

/// Something the app loads, and where that load stands -- Elm's RemoteData.
/// One type instead of an `Option` plus a separate "is it loading" flag, so
/// a screen cannot show stale data as fresh or spin forever on a failure.
pub type Data(a) {
  NotAsked
  Loading
  Loaded(a)
  Failed(ApiError)
}

/// The value, if one has arrived. What a screen that only decorates itself
/// with the data (a streak, an estimate) reads.
pub fn value(data: Data(a)) -> Option(a) {
  case data {
    Loaded(value) -> Some(value)
    NotAsked | Loading | Failed(_) -> None
  }
}

/// About to fetch again: keep what is already shown rather than blanking it,
/// and only show loading when there is nothing yet.
pub fn reload(data: Data(a)) -> Data(a) {
  case data {
    Loaded(_) -> data
    NotAsked | Loading | Failed(_) -> Loading
  }
}

/// A response landing. A failure keeps an earlier value on screen; the
/// caller reports the error as a notice either way.
pub fn arrived(data: Data(a), result: Result(a, ApiError)) -> Data(a) {
  case result, data {
    Ok(value), _ -> Loaded(value)
    Error(_), Loaded(_) -> data
    Error(failure), _ -> Failed(failure)
  }
}

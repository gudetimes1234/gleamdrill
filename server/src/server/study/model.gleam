//// Cards, reviews, drafts and scheduler settings -- the study data layer.
////
//// The server is the sole authority on scheduling: it decides what `now` is
//// and it runs FSRS. The client never computes a due date it can persist, it
//// only previews one. That is what stops a clock skew or a tampered request
//// from corrupting a review history.
////
//// This module holds the shapes the rest share. The shapes every study module shares, and the one error type they return.

import fsrs
import gleam/option.{type Option}
import gleam/string
import gleam/time/timestamp.{type Timestamp}
import pog
import wire

/// The app's problem key. `category` already encodes the language
/// ("NeetCode 150 - Python"), so this needs no language field.
///
/// This and the payload types below are aliases into `wire`, the package the
/// browser app compiles against too. They used to be declared here and again
/// there, by hand, with only captured fixtures to notice when the two parted
/// company -- which they had: `rating` crossed as an `Int` from this side and
/// was modelled as an `fsrs.Rating` on the other.
pub type ProblemRef =
  wire.ProblemRef

pub type CardRecord {
  CardRecord(
    id: String,
    problem: ProblemRef,
    card: fsrs.Card,
    reps: Int,
    lapses: Int,
    suspended: Bool,
    /// When the card was first seen. The client counts new cards against the
    /// daily budget with this, so it must cross the wire.
    introduced_at: Option(Timestamp),
  )
}

pub type Settings =
  wire.Settings

/// A review as the client submits it. Field-for-field the wire shape, so it
/// is that shape. The rating is always scheduled as sent; `practice`,
/// `auto_failed` and `revealed` are recorded on the log row for insights.
pub type ReviewInput =
  wire.Review

pub type StudyError {
  StudyDatabaseError(String)
}

pub fn database_error(error: pog.QueryError) -> StudyError {
  StudyDatabaseError(string.inspect(error))
}

pub fn flatten_transaction_error(
  error: pog.TransactionError(StudyError),
) -> StudyError {
  case error {
    pog.TransactionRolledBack(reason) -> reason
    pog.TransactionQueryError(query_error) -> database_error(query_error)
  }
}

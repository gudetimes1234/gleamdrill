//// Cards, reviews, drafts and scheduler settings -- the study data layer.
////
//// The server is the sole authority on scheduling: it decides what `now` is
//// and it runs FSRS. The client never computes a due date it can persist, it
//// only previews one. That is what stops a clock skew or a tampered request
//// from corrupting a review history.
////
//// This module holds the shapes every study module shares, and the one error
//// type they return.

import fsrs
import gleam/list
import gleam/option.{type Option}
import gleam/string
import gleam/time/timestamp.{type Timestamp}
import pog
import wire

pub type CardRecord {
  CardRecord(
    id: String,
    problem: wire.ProblemRef,
    card: fsrs.Card,
    reps: Int,
    lapses: Int,
    suspended: Bool,
    /// When the card was first seen. The client counts new cards against the
    /// daily budget with this, so it must cross the wire.
    introduced_at: Option(Timestamp),
  )
}

/// A stored card minus the database id, which never crosses the wire. This is
/// the only shape difference between what the server keeps and what it sends,
/// and it is why `CardRecord` is not itself a wire type.
pub fn to_state(record: CardRecord) -> wire.CardState {
  wire.CardState(
    problem: record.problem,
    card: record.card,
    reps: record.reps,
    lapses: record.lapses,
    suspended: record.suspended,
    introduced_at: record.introduced_at,
  )
}

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

/// A generated query's rows, each mapped into the domain type, with the
/// error folded into `StudyError`. Every read in `study/*` ends in this.
pub fn rows(
  returned: Result(pog.Returned(row), pog.QueryError),
  with: fn(row) -> a,
) -> Result(List(a), StudyError) {
  case returned {
    Ok(pog.Returned(rows:, ..)) -> Ok(list.map(rows, with))
    Error(error) -> Error(database_error(error))
  }
}

/// A generated query's first row, mapped, or `None` when it returned none:
/// the shape of every lookup by key and every `returning` that may match
/// nothing.
pub fn first(
  returned: Result(pog.Returned(row), pog.QueryError),
  with: fn(row) -> a,
) -> Result(Option(a), StudyError) {
  case returned {
    Ok(pog.Returned(rows: [row, ..], ..)) -> Ok(option.Some(with(row)))
    Ok(pog.Returned(rows: [], ..)) -> Ok(option.None)
    Error(error) -> Error(database_error(error))
  }
}

/// A generated statement run for its effect alone.
pub fn done(
  returned: Result(pog.Returned(row), pog.QueryError),
) -> Result(Nil, StudyError) {
  case returned {
    Ok(_) -> Ok(Nil)
    Error(error) -> Error(database_error(error))
  }
}

//// wire.Insights from the review log: clean solves, reveals and calibration.
////
//// Part of the study data layer; see `server/study/model` for the shared
//// types. The SQL lives in `insights/sql/*.sql`; `gleam run -m squirrel`
//// generates `insights/sql.gleam` from it.

import fsrs
import gleam/result
import pog
import server/study/insights/sql
import server/study/model.{type StudyError, rows}
import wire
import youid/uuid.{type Uuid}

/// Everything the insights screen reads for one track, in one reply.
pub fn insights(
  db: pog.Connection,
  user_id: Uuid,
  track: String,
) -> Result(wire.Insights, StudyError) {
  use clean_solves <- result.try(clean_solves(db, user_id, track))
  use reveals <- result.try(reveal_counts(db, user_id, track))
  use calibration <- result.try(calibration(db, user_id, track))
  Ok(wire.Insights(clean_solves:, reveals:, calibration:))
}

/// The last five clean solves per card, oldest first. Five is enough for a
/// median-of-three fluency figure plus a visible trend.
///
/// A clean solve is a review that passed with no reveal and no harness
/// failure, with how long it took. The client folds these into fluency
/// tiers; the cap of five per card bounds the payload.
fn clean_solves(
  db: pog.Connection,
  user_id: Uuid,
  track: String,
) -> Result(List(wire.CleanSolve), StudyError) {
  sql.clean_solves(db, user_id, track)
  |> rows(fn(row: sql.CleanSolvesRow) {
    wire.CleanSolve(
      problem: wire.ProblemRef(row.category, row.subcategory, row.title),
      at: fsrs.from_epoch(row.at),
      duration_ms: row.duration_ms,
    )
  })
}

fn reveal_counts(
  db: pog.Connection,
  user_id: Uuid,
  track: String,
) -> Result(List(#(wire.ProblemRef, Int)), StudyError) {
  sql.reveal_counts(db, user_id, track)
  |> rows(fn(row: sql.RevealCountsRow) {
    #(wire.ProblemRef(row.category, row.subcategory, row.title), row.reveals)
  })
}

/// For each grade pressed, what happened at that card's NEXT review. Easy
/// scoring below Good is the signature of optimistic Easy-pressing, which is
/// exactly what this exists to surface.
///
/// Unlike its two neighbours this did not join `cards` at all, so it needed
/// the join as well as the predicate. The window stays partitioned by
/// `card_id`, and every review of a card is in the same track, so no
/// partition is ever split: a single-track user's numbers come out
/// unchanged.
fn calibration(
  db: pog.Connection,
  user_id: Uuid,
  track: String,
) -> Result(List(wire.Calibration), StudyError) {
  sql.calibration(db, user_id, track)
  |> rows(fn(row: sql.CalibrationRow) {
    // `group by rating` can only yield what the insert accepted, so an
    // unrecognised code is impossible rather than merely unlikely -- but the
    // wire type is an fsrs.Rating, so it still has to be named.
    let rating = result.unwrap(fsrs.rating_from_int(row.rating), fsrs.Good)
    wire.Calibration(rating:, total: row.total, passed: row.passed)
  })
}

/// One card's review log, for the per-problem timeline.
pub fn history(
  db: pog.Connection,
  user_id: Uuid,
  problem: wire.ProblemRef,
) -> Result(List(wire.ReviewRow), StudyError) {
  let wire.ProblemRef(category:, subcategory:, title:) = problem
  sql.problem_history(db, user_id, category, subcategory, title)
  |> rows(fn(row: sql.ProblemHistoryRow) {
    model.review_row(
      at: row.at,
      rating: row.rating,
      duration_ms: row.duration_ms,
      revealed: row.revealed,
      auto_failed: row.auto_failed,
      state_before: row.state_before,
      scheduled_days: row.scheduled_days,
      stability_after: row.stability_after,
      recall: row.recall,
    )
  })
}

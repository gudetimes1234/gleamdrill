//// Insights from the review log: clean solves, reveals and calibration.
////
//// Part of the study data layer; see `server/study/model` for the shared
//// types.

import fsrs
import gleam/dynamic/decode
import gleam/result
import pog
import server/study/model.{type ProblemRef, type StudyError, database_error}
import wire

/// One solution-from-memory: a review that passed with no reveal and no
/// harness failure, with how long it took. The client folds these into
/// fluency tiers; the cap of five per card bounds the payload.
pub type CleanSolve =
  wire.CleanSolve

/// For each grade pressed, what happened at that card's NEXT review. Easy
/// scoring below Good is the signature of optimistic Easy-pressing, which is
/// exactly what this exists to surface.
pub type Calibration =
  wire.Calibration

pub type Insights =
  wire.Insights

/// One row of a card's review log, for the per-problem timeline.
pub type ReviewRow =
  wire.ReviewRow

pub fn insights(
  db: pog.Connection,
  user_id: String,
  track: String,
) -> Result(Insights, StudyError) {
  use clean_solves <- result.try(clean_solves(db, user_id, track))
  use reveals <- result.try(reveal_counts(db, user_id, track))
  use calibration <- result.try(calibration(db, user_id, track))
  Ok(wire.Insights(clean_solves:, reveals:, calibration:))
}

/// The last five clean solves per card, oldest first. Five is enough for a
/// median-of-three fluency figure plus a visible trend.
fn clean_solves(
  db: pog.Connection,
  user_id: String,
  track: String,
) -> Result(List(CleanSolve), StudyError) {
  pog.query(
    "select category, subcategory, title, at, duration_ms from (
       select c.category, c.subcategory, c.title,
              extract(epoch from r.reviewed_at)::float8 as at,
              r.duration_ms,
              row_number() over (
                partition by r.card_id order by r.reviewed_at desc
              ) as recency
         from reviews r
         join cards c on c.id = r.card_id
        where r.user_id = $1::uuid and c.category = $2
          and r.rating > 1
          and not r.revealed
          and not r.auto_failed
          and not r.recall
          and r.duration_ms is not null
     ) latest
     where recency <= 5
     order by category, subcategory, title, at",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(track))
  |> pog.returning({
    use category <- decode.field(0, decode.string)
    use subcategory <- decode.field(1, decode.string)
    use title <- decode.field(2, decode.string)
    use at <- decode.field(3, decode.float)
    use duration_ms <- decode.field(4, decode.int)
    decode.success(wire.CleanSolve(
      problem: wire.ProblemRef(category:, subcategory:, title:),
      at: fsrs.from_epoch(at),
      duration_ms:,
    ))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

fn reveal_counts(
  db: pog.Connection,
  user_id: String,
  track: String,
) -> Result(List(#(wire.ProblemRef, Int)), StudyError) {
  pog.query(
    "select c.category, c.subcategory, c.title, count(*)::int
       from reviews r
       join cards c on c.id = r.card_id
      where r.user_id = $1::uuid and c.category = $2 and r.revealed
      group by 1, 2, 3",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(track))
  |> pog.returning({
    use category <- decode.field(0, decode.string)
    use subcategory <- decode.field(1, decode.string)
    use title <- decode.field(2, decode.string)
    use count <- decode.field(3, decode.int)
    decode.success(#(wire.ProblemRef(category:, subcategory:, title:), count))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

/// Unlike its two neighbours this did not join `cards` at all, so it needed
/// the join as well as the predicate. The window stays partitioned by
/// `card_id`, and every review of a card is in the same track, so no
/// partition is ever split: a single-track user's numbers come out
/// unchanged.
fn calibration(
  db: pog.Connection,
  user_id: String,
  track: String,
) -> Result(List(wire.Calibration), StudyError) {
  pog.query(
    "select rating, count(*)::int,
            count(*) filter (where next_pass)::int
       from (
         select r.rating,
                lead(r.rating > 1 and not r.revealed and not r.auto_failed
                     and not r.recall)
                  over (partition by r.card_id order by r.reviewed_at)
                  as next_pass
           from reviews r
           join cards c on c.id = r.card_id
          where r.user_id = $1::uuid and c.category = $2
       ) sequenced
      where next_pass is not null
      group by rating
      order by rating",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(track))
  |> pog.returning({
    use rating <- decode.field(0, decode.int)
    use total <- decode.field(1, decode.int)
    use passed <- decode.field(2, decode.int)
    // `group by rating` can only yield what the insert accepted, so an
    // unrecognised code is impossible rather than merely unlikely -- but the
    // wire type is an fsrs.Rating, so it still has to be named.
    let rating = result.unwrap(fsrs.rating_from_int(rating), fsrs.Good)
    decode.success(wire.Calibration(rating:, total:, passed:))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

pub fn history(
  db: pog.Connection,
  user_id: String,
  problem: ProblemRef,
) -> Result(List(ReviewRow), StudyError) {
  pog.query(
    "select extract(epoch from r.reviewed_at)::float8, r.rating,
            r.duration_ms, r.revealed, r.auto_failed, r.state_before,
            r.scheduled_days, r.stability_after, r.recall
       from reviews r
       join cards c on c.id = r.card_id
      where r.user_id = $1::uuid
        and c.category = $2 and c.subcategory = $3 and c.title = $4
      order by r.reviewed_at",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(problem.category))
  |> pog.parameter(pog.text(problem.subcategory))
  |> pog.parameter(pog.text(problem.title))
  |> pog.returning({
    use at <- decode.field(0, decode.float)
    use rating <- decode.field(1, decode.int)
    use duration_ms <- decode.field(2, decode.optional(decode.int))
    use revealed <- decode.field(3, decode.bool)
    use auto_failed <- decode.field(4, decode.bool)
    use state_before <- decode.field(5, decode.int)
    use scheduled_days <- decode.field(6, decode.int)
    use stability_after <- decode.field(7, decode.optional(decode.float))
    use recall <- decode.field(8, decode.bool)
    // The column is constrained to 1-4 by the insert; `Good` is unreachable
    // rather than a guess.
    let rating = result.unwrap(fsrs.rating_from_int(rating), fsrs.Good)
    decode.success(wire.ReviewRow(
      at: fsrs.from_epoch(at),
      rating:,
      duration_ms:,
      revealed:,
      auto_failed:,
      state_before:,
      scheduled_days:,
      stability_after:,
      recall:,
    ))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

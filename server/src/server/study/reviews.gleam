//// Recording a review, atomically, and undoing the last one.
////
//// Part of the study data layer; see `server/study/model` for the shared
//// types. The SQL lives in `reviews/sql/*.sql`; `gleam run -m squirrel`
//// generates `reviews/sql.gleam` from it.

import fsrs
import gleam/bool
import gleam/dynamic/decode
import gleam/json.{type Json}
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/time/timestamp.{type Timestamp}
import pog
import server/study/cards
import server/study/drafts
import server/study/model.{
  type CardRecord, type StudyError, CardRecord, StudyDatabaseError,
  database_error, done, first, flatten_transaction_error, nullable,
}
import server/study/reviews/sql
import wire
import youid/uuid.{type Uuid}

/// Schedules a review and records it, atomically.
///
/// The rating is the user's own assessment and is scheduled as sent. What the
/// harness said and whether the solution was revealed are still recorded on
/// the review row, so insights can tell a clean solve from a peeked one; the
/// scheduler itself does not second-guess the grade.
pub fn record_review(
  db: pog.Connection,
  user_id: Uuid,
  settings: wire.Settings,
  input: wire.Review,
  now: Timestamp,
  fuzz: Float,
) -> Result(CardRecord, StudyError) {
  pog.transaction(db, fn(tx) {
    use created <- result.try(
      card_exists(tx, user_id, input.problem) |> result.map(bool.negate),
    )
    use existing <- result.try(cards.upsert_card(tx, user_id, input.problem))
    let before = existing.card
    let #(record, elapsed, scheduled) =
      schedule(existing, input.rating, now, settings.scheduler, fuzz)

    use _ <- result.try(cards.update_card(tx, record))
    use _ <- result.try(insert_review(
      tx,
      user_id,
      record,
      input.rating,
      before,
      now,
      elapsed,
      scheduled,
      input,
      snapshot(existing, created),
    ))
    // A graded problem starts from the stub next time: retyping from
    // memory is the drill. The draft goes in the same transaction as the
    // review, so a late save cannot resurrect it.
    use _ <- result.try(drafts.delete_draft(tx, user_id, input.problem))
    Ok(record)
  })
  |> result.map_error(flatten_transaction_error)
}

/// What one review does to a card, before anything touches the database: the
/// rescheduled card, plus the elapsed and scheduled day counts the log row
/// records. The whole scheduling decision, pure.
///
/// Self-graded: the rating stands. The log's `revealed`/`auto_failed`
/// columns record what happened in every case.
pub fn schedule(
  existing: CardRecord,
  rating: fsrs.Rating,
  now: Timestamp,
  scheduler: fsrs.Config,
  fuzz: Float,
) -> #(CardRecord, Int, Int) {
  let before = existing.card
  let elapsed = case before.last_review {
    Some(last) -> fsrs.days_between(last, now)
    // A card's first ever review has no elapsed time to report.
    None -> 0
  }
  let scheduled = case before.last_review {
    Some(last) -> fsrs.days_between(last, before.due)
    None -> 0
  }

  let after = fsrs.review(before, rating, now, scheduler, fuzz)

  // Anki counts a lapse only when a card that had graduated fails, not when
  // one still in learning does.
  let lapses = case rating, before.state {
    fsrs.Again, fsrs.Review -> existing.lapses + 1
    _, _ -> existing.lapses
  }

  #(
    CardRecord(..existing, card: after, reps: existing.reps + 1, lapses:),
    elapsed,
    scheduled,
  )
}

fn card_exists(
  db: pog.Connection,
  user_id: Uuid,
  problem: wire.ProblemRef,
) -> Result(Bool, StudyError) {
  let wire.ProblemRef(category:, subcategory:, title:) = problem
  sql.card_exists(db, user_id, category, subcategory, title)
  |> first(fn(row: sql.CardExistsRow) { row.found })
  |> result.map(option.unwrap(_, False))
}

/// The card as it stood when the review began, in the wire format, plus
/// whether the review created it. Written into `reviews.card_before`.
fn snapshot(existing: CardRecord, created: Bool) -> Json {
  json.object([
    #("card", wire.card_to_json(model.to_state(existing))),
    #("created", json.bool(created)),
  ])
}

/// What undoing the latest review leaves behind. `card` is None when the
/// review had created the card, and undoing it took the card back out of
/// the queue.
pub type Undone {
  Undone(card: Option(CardRecord))
}

pub type UndoError {
  NothingToUndo
  UndoFailed(StudyError)
}

/// Undoes the newest review **in one track**: deletes it and puts its card
/// back exactly as it was. Refuses when there is no review, or the newest one
/// predates the snapshot column.
///
/// The join is the point. Unscoped, this took the account's globally newest
/// review, so an undo button in one track would delete a real review in
/// another and roll that card back -- and `card_before` goes with the row, so
/// there is nothing left to undo the undo with.
pub fn undo_review(
  db: pog.Connection,
  user_id: Uuid,
  track: String,
) -> Result(Undone, UndoError) {
  pog.transaction(db, fn(tx) {
    use latest <- result.try(
      sql.delete_latest_review(tx, user_id, track)
      |> first(fn(row: sql.DeleteLatestReviewRow) {
        #(row.card_id, row.card_before)
      })
      |> result.map_error(UndoFailed),
    )
    case latest {
      None -> Error(NothingToUndo)
      Some(#(_, None)) -> Error(NothingToUndo)
      Some(#(card_id, Some(raw))) ->
        case json.parse(raw, snapshot_decoder()) {
          Error(_) ->
            Error(UndoFailed(StudyDatabaseError("unreadable review snapshot")))
          Ok(#(_, True)) ->
            delete_card(tx, card_id)
            |> result.map(fn(_) { Undone(card: None) })
            |> result.map_error(UndoFailed)
          Ok(#(state, False)) -> {
            let record =
              CardRecord(
                id: card_id,
                problem: state.problem,
                card: state.card,
                reps: state.reps,
                lapses: state.lapses,
                suspended: state.suspended,
                // The upsert stamps `introduced_at` before the snapshot is
                // taken, so a card with no reps had not been introduced.
                introduced_at: case state.reps {
                  0 -> None
                  _ -> state.introduced_at
                },
              )
            restore_card(tx, record)
            |> result.map(fn(_) { Undone(card: Some(record)) })
            |> result.map_error(UndoFailed)
          }
        }
    }
  })
  |> result.map_error(fn(error) {
    case error {
      pog.TransactionRolledBack(inner) -> inner
      pog.TransactionQueryError(query_error) ->
        UndoFailed(database_error(query_error))
    }
  })
}

fn snapshot_decoder() -> decode.Decoder(#(wire.CardState, Bool)) {
  use card <- decode.field("card", wire.card_decoder())
  use created <- decode.field("created", decode.bool)
  decode.success(#(card, created))
}

fn delete_card(db: pog.Connection, card_id: Uuid) -> Result(Nil, StudyError) {
  sql.delete_card(db, card_id) |> done
}

/// `update_card` plus the two columns a review never touches but an undo
/// must: `introduced_at` (cleared when the undone review introduced it)
/// and `suspended`.
fn restore_card(
  db: pog.Connection,
  record: CardRecord,
) -> Result(Nil, StudyError) {
  use _ <- result.try(cards.update_card(db, record))
  case record.introduced_at {
    Some(introduced_at) ->
      sql.restore_introduced_card(
        db,
        record.id,
        fsrs.to_epoch(introduced_at),
        record.suspended,
      )
    None -> sql.restore_unintroduced_card(db, record.id, record.suspended)
  }
  |> done
}

fn insert_review(
  db: pog.Connection,
  user_id: Uuid,
  record: CardRecord,
  rating: fsrs.Rating,
  before: fsrs.Card,
  now: Timestamp,
  elapsed_days: Int,
  scheduled_days: Int,
  input: wire.Review,
  card_before: Json,
) -> Result(Nil, StudyError) {
  sql.insert_review(
    db,
    user_id,
    record.id,
    fsrs.rating_to_int(rating),
    wire.state_code(before.state),
    fsrs.to_epoch(now),
    elapsed_days,
    scheduled_days,
    nullable(option.map(record.card.memory, fn(m) { m.stability })),
    nullable(option.map(record.card.memory, fn(m) { m.difficulty })),
    nullable(input.duration_ms),
    input.auto_failed,
    input.revealed,
    input.recall,
    card_before,
  )
  |> done
}

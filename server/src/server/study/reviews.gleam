//// Recording a review, atomically, and undoing the last one.
////
//// Part of the study data layer; see `server/study/model` for the shared
//// types.

import fsrs
import gleam/bool
import gleam/dynamic/decode
import gleam/json
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/time/timestamp.{type Timestamp}
import pog
import server/study/cards
import server/study/drafts
import server/study/model.{
  type CardRecord, type ProblemRef, type ReviewInput, type Settings,
  type StudyError, CardRecord, StudyDatabaseError, database_error,
  flatten_transaction_error,
}
import wire

/// Schedules a review and records it, atomically.
///
/// The rating is the user's own assessment and is scheduled as sent. What the
/// harness said and whether the solution was revealed are still recorded on
/// the review row, so insights can tell a clean solve from a peeked one; the
/// scheduler itself does not second-guess the grade.
pub fn record_review(
  db: pog.Connection,
  user_id: String,
  settings: Settings,
  input: ReviewInput,
  now: Timestamp,
  fuzz: Float,
) -> Result(CardRecord, StudyError) {
  pog.transaction(db, fn(tx) {
    use created <- result.try(
      card_exists(tx, user_id, input.problem) |> result.map(bool.negate),
    )
    use existing <- result.try(cards.upsert_card(tx, user_id, input.problem))
    let before = existing.card

    // Self-graded: the rating stands. The log's `revealed`/`auto_failed`
    // columns record what happened in every case.
    let rating = input.rating

    let elapsed = case before.last_review {
      Some(last) -> fsrs.days_between(last, now)
      // A card's first ever review has no elapsed time to report.
      None -> 0
    }
    let scheduled = case before.last_review {
      Some(last) -> fsrs.days_between(last, before.due)
      None -> 0
    }

    let after = fsrs.review(before, rating, now, settings.scheduler, fuzz)

    // Anki counts a lapse only when a card that had graduated fails, not when
    // one still in learning does.
    let lapses = case rating, before.state {
      fsrs.Again, fsrs.Review -> existing.lapses + 1
      _, _ -> existing.lapses
    }

    let record =
      CardRecord(..existing, card: after, reps: existing.reps + 1, lapses:)

    use _ <- result.try(cards.update_card(tx, record))
    use _ <- result.try(insert_review(
      tx,
      user_id,
      record,
      rating,
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

fn card_exists(
  db: pog.Connection,
  user_id: String,
  problem: ProblemRef,
) -> Result(Bool, StudyError) {
  pog.query(
    "select 1 from cards
      where user_id = $1::uuid and category = $2
        and subcategory = $3 and title = $4",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(problem.category))
  |> pog.parameter(pog.text(problem.subcategory))
  |> pog.parameter(pog.text(problem.title))
  |> pog.returning(decode.at([0], decode.int))
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows != [] })
  |> result.map_error(database_error)
}

/// The card as it stood when the review began, in the wire format, plus
/// whether the review created it. Written into `reviews.card_before`.
fn snapshot(existing: CardRecord, created: Bool) -> String {
  json.object([
    #("card", wire.card_to_json(to_state(existing))),
    #("created", json.bool(created)),
  ])
  |> json.to_string
}

fn to_state(record: CardRecord) -> wire.CardState {
  wire.CardState(
    problem: record.problem,
    card: record.card,
    reps: record.reps,
    lapses: record.lapses,
    suspended: record.suspended,
    introduced_at: record.introduced_at,
  )
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

/// Deletes the user's most recent review and puts its card back exactly as
/// it was. Refuses when there is no review, or the newest one predates the
/// snapshot column.
/// Undoes the newest review **in one track**.
///
/// The join is the point. Unscoped, this took the account's globally newest
/// review, so an undo button in one track would delete a real review in
/// another and roll that card back -- and `card_before` goes with the row, so
/// there is nothing left to undo the undo with.
pub fn undo_review(
  db: pog.Connection,
  user_id: String,
  track: String,
) -> Result(Undone, UndoError) {
  pog.transaction(db, fn(tx) {
    use latest <- result.try(
      pog.query(
        "delete from reviews
          where id = (
            select r.id from reviews r
              join cards c on c.id = r.card_id
             where r.user_id = $1::uuid and c.category = $2
             order by r.reviewed_at desc, r.id desc limit 1
          )
          returning card_id::text, card_before::text",
      )
      |> pog.parameter(pog.text(user_id))
      |> pog.parameter(pog.text(track))
      |> pog.returning({
        use card_id <- decode.field(0, decode.string)
        use before <- decode.field(1, decode.optional(decode.string))
        decode.success(#(card_id, before))
      })
      |> pog.execute(tx)
      |> result.map_error(fn(error) { UndoFailed(database_error(error)) }),
    )
    case latest.rows {
      [] -> Error(NothingToUndo)
      [#(_, None), ..] -> Error(NothingToUndo)
      [#(card_id, Some(raw)), ..] ->
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

fn delete_card(db: pog.Connection, card_id: String) -> Result(Nil, StudyError) {
  pog.query("delete from cards where id = $1::uuid")
  |> pog.parameter(pog.text(card_id))
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

/// `update_card` plus the two columns a review never touches but an undo
/// must: `introduced_at` (cleared when the undone review introduced it)
/// and `suspended`.
fn restore_card(
  db: pog.Connection,
  record: CardRecord,
) -> Result(Nil, StudyError) {
  use _ <- result.try(cards.update_card(db, record))
  pog.query(
    "update cards set
       introduced_at = to_timestamp($2::float8), suspended = $3
     where id = $1::uuid",
  )
  |> pog.parameter(pog.text(record.id))
  |> pog.parameter(pog.nullable(
    pog.float,
    option.map(record.introduced_at, fsrs.to_epoch),
  ))
  |> pog.parameter(pog.bool(record.suspended))
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

fn insert_review(
  db: pog.Connection,
  user_id: String,
  record: CardRecord,
  rating: fsrs.Rating,
  before: fsrs.Card,
  now: Timestamp,
  elapsed_days: Int,
  scheduled_days: Int,
  input: ReviewInput,
  card_before: String,
) -> Result(Nil, StudyError) {
  pog.query(
    "insert into reviews (
       user_id, card_id, rating, state_before, reviewed_at,
       elapsed_days, scheduled_days, stability_after, difficulty_after,
       duration_ms, auto_failed, revealed, recall, card_before)
     values ($1::uuid, $2::uuid, $3, $4, to_timestamp($5::float8),
             $6, $7, $8, $9, $10, $11, $12, $13, $14::jsonb)",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(record.id))
  |> pog.parameter(pog.int(fsrs.rating_to_int(rating)))
  |> pog.parameter(pog.int(cards.state_code(before.state)))
  |> pog.parameter(pog.float(fsrs.to_epoch(now)))
  |> pog.parameter(pog.int(elapsed_days))
  |> pog.parameter(pog.int(scheduled_days))
  |> pog.parameter(pog.nullable(
    pog.float,
    option.map(record.card.memory, fn(m) { m.stability }),
  ))
  |> pog.parameter(pog.nullable(
    pog.float,
    option.map(record.card.memory, fn(m) { m.difficulty }),
  ))
  |> pog.parameter(pog.nullable(pog.int, input.duration_ms))
  |> pog.parameter(pog.bool(input.auto_failed))
  |> pog.parameter(pog.bool(input.revealed))
  |> pog.parameter(pog.bool(input.recall))
  |> pog.parameter(pog.text(card_before))
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

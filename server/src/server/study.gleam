//// Cards, reviews, drafts and scheduler settings -- the study data layer.
////
//// The server is the sole authority on scheduling: it decides what `now` is
//// and it runs FSRS. The client never computes a due date it can persist, it
//// only previews one. That is what stops a clock skew or a tampered request
//// from corrupting a review history.

import fsrs
import gleam/bool
import gleam/dynamic/decode
import gleam/int
import gleam/json
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
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

// --- settings --------------------------------------------------------------

pub fn default_settings() -> Settings {
  wire.default_settings()
}

pub fn load_settings(
  db: pog.Connection,
  user_id: String,
) -> Result(Settings, StudyError) {
  pog.query(
    "select parameters, desired_retention, learning_steps, relearning_steps,
            maximum_interval, enable_fuzz, new_per_day, reviews_per_day,
            day_start_hour, timezone
       from settings
      where user_id = $1::uuid",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.returning(settings_decoder())
  |> pog.execute(db)
  |> result.map_error(database_error)
  // A user with no settings row should be impossible -- signup creates one in
  // the same transaction as the account -- but defaulting beats failing every
  // review if it ever happens.
  |> result.map(fn(returned) {
    list.first(returned.rows) |> result.unwrap(default_settings())
  })
}

pub fn save_settings(
  db: pog.Connection,
  user_id: String,
  settings: Settings,
) -> Result(Nil, StudyError) {
  pog.query(
    "update settings set
       parameters = $2, desired_retention = $3,
       learning_steps = $4, relearning_steps = $5,
       maximum_interval = $6, enable_fuzz = $7,
       new_per_day = $8, reviews_per_day = $9,
       day_start_hour = $10, timezone = $11
     where user_id = $1::uuid",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.array(pog.float, settings.scheduler.parameters))
  |> pog.parameter(pog.float(settings.scheduler.desired_retention))
  |> pog.parameter(pog.array(pog.int, settings.scheduler.learning_steps))
  |> pog.parameter(pog.array(pog.int, settings.scheduler.relearning_steps))
  |> pog.parameter(pog.int(settings.scheduler.maximum_interval))
  |> pog.parameter(pog.bool(settings.scheduler.enable_fuzz))
  |> pog.parameter(pog.int(settings.new_per_day))
  |> pog.parameter(pog.int(settings.reviews_per_day))
  |> pog.parameter(pog.int(settings.day_start_hour))
  |> pog.parameter(pog.text(settings.timezone))
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

fn settings_decoder() -> decode.Decoder(Settings) {
  use parameters <- decode.field(0, decode.list(decode.float))
  use desired_retention <- decode.field(1, decode.float)
  use learning_steps <- decode.field(2, decode.list(decode.int))
  use relearning_steps <- decode.field(3, decode.list(decode.int))
  use maximum_interval <- decode.field(4, decode.int)
  use enable_fuzz <- decode.field(5, decode.bool)
  use new_per_day <- decode.field(6, decode.int)
  use reviews_per_day <- decode.field(7, decode.int)
  use day_start_hour <- decode.field(8, decode.int)
  use timezone <- decode.field(9, decode.string)
  decode.success(wire.Settings(
    scheduler: fsrs.Config(
      parameters:,
      desired_retention:,
      learning_steps:,
      relearning_steps:,
      maximum_interval:,
      enable_fuzz:,
    ),
    new_per_day:,
    reviews_per_day:,
    day_start_hour:,
    timezone:,
  ))
}

// --- cards -----------------------------------------------------------------

const card_columns = "id::text, category, subcategory, title, state, step,
   stability, difficulty,
   extract(epoch from due)::float8,
   extract(epoch from last_review)::float8,
   reps, lapses, suspended,
   extract(epoch from introduced_at)::float8"

pub fn load_cards(
  db: pog.Connection,
  user_id: String,
) -> Result(List(CardRecord), StudyError) {
  pog.query("select " <> card_columns <> " from cards where user_id = $1::uuid")
  |> pog.parameter(pog.text(user_id))
  |> pog.returning(card_decoder())
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

/// Parks or resumes one card. Only a card that exists can be suspended: a
/// problem that is not in the study queue is already excluded, so a missing
/// row is the caller's 404, not an upsert. Suspending is how a card with
/// review history leaves the queue, since deleting it would take the history
/// with it.
pub fn set_suspended(
  db: pog.Connection,
  user_id: String,
  problem: ProblemRef,
  suspended: Bool,
) -> Result(Option(CardRecord), StudyError) {
  pog.query("update cards set suspended = $5
     where user_id = $1::uuid
       and category = $2 and subcategory = $3 and title = $4
     returning " <> card_columns)
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(problem.category))
  |> pog.parameter(pog.text(problem.subcategory))
  |> pog.parameter(pog.text(problem.title))
  |> pog.parameter(pog.bool(suspended))
  |> pog.returning(card_decoder())
  |> pog.execute(db)
  |> result.map(fn(returned) {
    case returned.rows {
      [card, ..] -> Some(card)
      [] -> None
    }
  })
  |> result.map_error(database_error)
}

/// Puts problems into the study queue by giving each one a card, and answers
/// with the state of every problem named -- including ones already queued, so
/// the client can fold the response without tracking which of its refs were
/// new.
///
/// `introduced_at` is deliberately left null. It means "first studied", and
/// the daily new budget counts it (`today`), so stamping it here would spend
/// the budget on problems that have not been opened.
///
/// Written as one `unnest` rather than a statement per ref because queueing a
/// whole topic is the normal case: 25 round trips to add "Arrays & Hashing"
/// would be 25 chances to half-apply it.
pub fn enqueue_cards(
  db: pog.Connection,
  user_id: String,
  problems: List(ProblemRef),
) -> Result(List(CardRecord), StudyError) {
  case problems {
    [] -> Ok([])
    _ -> {
      let categories = list.map(problems, fn(ref) { ref.category })
      let subcategories = list.map(problems, fn(ref) { ref.subcategory })
      let titles = list.map(problems, fn(ref) { ref.title })

      // The union is not a flourish. A data-modifying CTE and the query it
      // feeds see the same snapshot, so a plain `select from cards` here comes
      // back without the rows the insert just wrote -- it would answer with
      // only the problems that were *already* queued, which is precisely the
      // set the caller does not need. The insert returns its own rows, and the
      // select picks up the ones that were there before it.
      pog.query("with asked as (
           select * from unnest($2::text[], $3::text[], $4::text[])
             as t(category, subcategory, title)
         ), inserted as (
           insert into cards (user_id, category, subcategory, title)
           select $1::uuid, category, subcategory, title from asked
           on conflict (user_id, category, subcategory, title) do nothing
           returning " <> card_columns <> "
         )
         select * from inserted
         union all
         select " <> card_columns <> "
           from cards c
           join asked using (category, subcategory, title)
          where c.user_id = $1::uuid")
      |> pog.parameter(pog.text(user_id))
      |> pog.parameter(pog.array(pog.text, categories))
      |> pog.parameter(pog.array(pog.text, subcategories))
      |> pog.parameter(pog.array(pog.text, titles))
      |> pog.returning(card_decoder())
      |> pog.execute(db)
      |> result.map(fn(returned) { returned.rows })
      |> result.map_error(database_error)
    }
  }
}

/// Takes problems out of the study queue, and reports which ones it refused.
///
/// `reps = 0` is the whole safety condition: `reviews.card_id` cascades on
/// delete, so removing a card that has been studied would silently destroy its
/// review log -- the one thing in this schema that cannot be rebuilt. A
/// studied card is parked with `set_suspended` instead.
pub fn delete_cards(
  db: pog.Connection,
  user_id: String,
  problems: List(ProblemRef),
) -> Result(#(List(ProblemRef), List(ProblemRef)), StudyError) {
  case problems {
    [] -> Ok(#([], []))
    _ -> {
      let categories = list.map(problems, fn(ref) { ref.category })
      let subcategories = list.map(problems, fn(ref) { ref.subcategory })
      let titles = list.map(problems, fn(ref) { ref.title })

      pog.query(
        "delete from cards c
           using unnest($2::text[], $3::text[], $4::text[])
             as t(category, subcategory, title)
          where c.user_id = $1::uuid
            and c.category = t.category
            and c.subcategory = t.subcategory
            and c.title = t.title
            and c.reps = 0
        returning c.category, c.subcategory, c.title",
      )
      |> pog.parameter(pog.text(user_id))
      |> pog.parameter(pog.array(pog.text, categories))
      |> pog.parameter(pog.array(pog.text, subcategories))
      |> pog.parameter(pog.array(pog.text, titles))
      |> pog.returning({
        use category <- decode.field(0, decode.string)
        use subcategory <- decode.field(1, decode.string)
        use title <- decode.field(2, decode.string)
        decode.success(wire.ProblemRef(category:, subcategory:, title:))
      })
      |> pog.execute(db)
      |> result.map(fn(returned) {
        let removed = returned.rows
        // Anything asked for and not returned still exists: either it has
        // been studied, or it was never queued. Both are "not removed", and
        // the client tells them apart from the cards it already holds.
        #(
          removed,
          list.filter(problems, fn(ref) { !list.contains(removed, ref) }),
        )
      })
      |> result.map_error(database_error)
    }
  }
}

/// Cards are created lazily, on first review, rather than seeding ~1200 rows
/// per user up front for problems they may never open.
///
/// The `do update` is not a no-op: it stamps `introduced_at` the first time a
/// card is actually reviewed, which is what the daily new budget counts. A row
/// queued ahead of time exists with a null stamp until this runs.
/// `on conflict do nothing` would also skip RETURNING for an existing row, and
/// this needs the row either way.
fn upsert_card(
  db: pog.Connection,
  user_id: String,
  problem: ProblemRef,
) -> Result(CardRecord, StudyError) {
  pog.query(
    "insert into cards (user_id, category, subcategory, title, introduced_at)
     values ($1::uuid, $2, $3, $4, now())
     on conflict (user_id, category, subcategory, title)
       do update set introduced_at = coalesce(cards.introduced_at, now())
     returning " <> card_columns,
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(problem.category))
  |> pog.parameter(pog.text(problem.subcategory))
  |> pog.parameter(pog.text(problem.title))
  |> pog.returning(card_decoder())
  |> pog.execute(db)
  |> result.map_error(database_error)
  |> result.try(fn(returned) {
    list.first(returned.rows)
    |> result.replace_error(StudyDatabaseError("card upsert returned no row"))
  })
}

fn update_card(
  db: pog.Connection,
  record: CardRecord,
) -> Result(Nil, StudyError) {
  pog.query(
    "update cards set
       state = $2, step = $3, stability = $4, difficulty = $5,
       due = to_timestamp($6::float8),
       last_review = to_timestamp($7::float8),
       reps = $8, lapses = $9
     where id = $1::uuid",
  )
  |> pog.parameter(pog.text(record.id))
  |> pog.parameter(pog.int(state_code(record.card.state)))
  |> pog.parameter(pog.nullable(pog.int, state_step(record.card.state)))
  |> pog.parameter(pog.nullable(
    pog.float,
    option.map(record.card.memory, fn(m) { m.stability }),
  ))
  |> pog.parameter(pog.nullable(
    pog.float,
    option.map(record.card.memory, fn(m) { m.difficulty }),
  ))
  |> pog.parameter(pog.float(fsrs.to_epoch(record.card.due)))
  |> pog.parameter(pog.nullable(
    pog.float,
    option.map(record.card.last_review, fsrs.to_epoch),
  ))
  |> pog.parameter(pog.int(record.reps))
  |> pog.parameter(pog.int(record.lapses))
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

fn card_decoder() -> decode.Decoder(CardRecord) {
  use id <- decode.field(0, decode.string)
  use category <- decode.field(1, decode.string)
  use subcategory <- decode.field(2, decode.string)
  use title <- decode.field(3, decode.string)
  use state <- decode.field(4, decode.int)
  use step <- decode.field(5, decode.optional(decode.int))
  use stability <- decode.field(6, decode.optional(decode.float))
  use difficulty <- decode.field(7, decode.optional(decode.float))
  use due <- decode.field(8, decode.float)
  use last_review <- decode.field(9, decode.optional(decode.float))
  use reps <- decode.field(10, decode.int)
  use lapses <- decode.field(11, decode.int)
  use suspended <- decode.field(12, decode.bool)
  use introduced_at <- decode.field(13, decode.optional(decode.float))

  decode.success(CardRecord(
    id:,
    problem: wire.ProblemRef(category:, subcategory:, title:),
    card: fsrs.Card(
      state: state_from(state, step),
      memory: memory_from(stability, difficulty),
      due: fsrs.from_epoch(due),
      last_review: option.map(last_review, fsrs.from_epoch),
    ),
    reps:,
    lapses:,
    suspended:,
    introduced_at: option.map(introduced_at, fsrs.from_epoch),
  ))
}

pub const state_code = wire.state_code

pub const state_step = wire.state_step

const state_from = wire.state_from

/// Stability and difficulty are always written together, so either both are
/// present or the card has never been reviewed.
fn memory_from(
  stability: Option(Float),
  difficulty: Option(Float),
) -> Option(fsrs.Memory) {
  case stability, difficulty {
    Some(stability), Some(difficulty) ->
      Some(fsrs.Memory(stability:, difficulty:))
    _, _ -> None
  }
}

// --- recording a review ----------------------------------------------------

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
    use existing <- result.try(upsert_card(tx, user_id, input.problem))
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

    use _ <- result.try(update_card(tx, record))
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
pub fn undo_review(
  db: pog.Connection,
  user_id: String,
) -> Result(Undone, UndoError) {
  pog.transaction(db, fn(tx) {
    use latest <- result.try(
      pog.query(
        "delete from reviews
          where id = (
            select id from reviews where user_id = $1::uuid
             order by reviewed_at desc, id desc limit 1
          )
          returning card_id::text, card_before::text",
      )
      |> pog.parameter(pog.text(user_id))
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
  use _ <- result.try(update_card(db, record))
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
  |> pog.parameter(pog.int(state_code(before.state)))
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

// --- drafts ----------------------------------------------------------------

pub fn load_drafts(
  db: pog.Connection,
  user_id: String,
) -> Result(List(#(ProblemRef, String)), StudyError) {
  pog.query(
    "select category, subcategory, title, body
       from drafts where user_id = $1::uuid",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.returning({
    use category <- decode.field(0, decode.string)
    use subcategory <- decode.field(1, decode.string)
    use title <- decode.field(2, decode.string)
    use body <- decode.field(3, decode.string)
    decode.success(#(wire.ProblemRef(category:, subcategory:, title:), body))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

pub fn save_draft(
  db: pog.Connection,
  user_id: String,
  problem: ProblemRef,
  body: String,
) -> Result(Nil, StudyError) {
  pog.query(
    "insert into drafts (user_id, category, subcategory, title, body)
     values ($1::uuid, $2, $3, $4, $5)
     on conflict (user_id, category, subcategory, title)
       do update set body = excluded.body, updated_at = now()",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(problem.category))
  |> pog.parameter(pog.text(problem.subcategory))
  |> pog.parameter(pog.text(problem.title))
  |> pog.parameter(pog.text(body))
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

// --- notes -----------------------------------------------------------------

pub fn load_notes(
  db: pog.Connection,
  user_id: String,
) -> Result(List(#(ProblemRef, String)), StudyError) {
  pog.query(
    "select category, subcategory, title, body
       from notes where user_id = $1::uuid",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.returning({
    use category <- decode.field(0, decode.string)
    use subcategory <- decode.field(1, decode.string)
    use title <- decode.field(2, decode.string)
    use body <- decode.field(3, decode.string)
    decode.success(#(wire.ProblemRef(category:, subcategory:, title:), body))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

/// An empty body deletes the row: there is no such thing as a blank note.
pub fn save_note(
  db: pog.Connection,
  user_id: String,
  problem: ProblemRef,
  body: String,
) -> Result(Nil, StudyError) {
  let keyed = fn(sql) {
    pog.query(sql)
    |> pog.parameter(pog.text(user_id))
    |> pog.parameter(pog.text(problem.category))
    |> pog.parameter(pog.text(problem.subcategory))
    |> pog.parameter(pog.text(problem.title))
  }
  let query = case string.trim(body) {
    "" ->
      keyed(
        "delete from notes
          where user_id = $1::uuid and category = $2
            and subcategory = $3 and title = $4",
      )
    _ ->
      keyed(
        "insert into notes (user_id, category, subcategory, title, body)
         values ($1::uuid, $2, $3, $4, $5)
         on conflict (user_id, category, subcategory, title)
           do update set body = excluded.body, updated_at = now()",
      )
      |> pog.parameter(pog.text(body))
  }
  query
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

// --- errors ----------------------------------------------------------------

fn database_error(error: pog.QueryError) -> StudyError {
  StudyDatabaseError(string.inspect(error))
}

fn flatten_transaction_error(
  error: pog.TransactionError(StudyError),
) -> StudyError {
  case error {
    pog.TransactionRolledBack(reason) -> reason
    pog.TransactionQueryError(query_error) -> database_error(query_error)
  }
}

// --- the study day ---------------------------------------------------------

/// Where the user stands against today's limits.
///
/// `new_remaining` is a budget, not a list: the server cannot enumerate new
/// problems because the catalogue lives in the client bundle, not the
/// database (cards are created on first review). So the server owns the
/// scheduling of known cards and the daily allowance, and the client picks
/// which unseen problems to spend that allowance on.
pub type Today =
  wire.Today

/// The study day runs from `day_start_hour` local time to the same hour the
/// next day -- Anki's 4am rollover, so a late-night session counts toward the
/// day it feels like rather than the one the clock says.
///
/// The timezone arithmetic is done by Postgres on purpose: it ships a full
/// IANA database and handles DST, neither of which Gleam has on the Erlang
/// target.
pub fn today(
  db: pog.Connection,
  user_id: String,
  settings: Settings,
  now: Timestamp,
) -> Result(Today, StudyError) {
  pog.query(
    "with bounds as (
       select date_trunc('day', (to_timestamp($4::float8) at time zone $2)
                                - make_interval(hours => $3))
              + make_interval(hours => $3) as local_start
     )
     select
       extract(epoch from (local_start at time zone $2))::float8,
       extract(epoch from ((local_start + interval '1 day') at time zone $2))::float8,
       (select count(*) from reviews r
         where r.user_id = $1::uuid
           and r.reviewed_at >= (local_start at time zone $2))::int,
       (select count(*) from cards c
         where c.user_id = $1::uuid
           and c.introduced_at >= (local_start at time zone $2))::int,
       (select count(*) from cards c
         where c.user_id = $1::uuid
           and not c.suspended
           and c.reps > 0
           and c.due <= to_timestamp($4::float8))::int
     from bounds",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(settings.timezone))
  |> pog.parameter(pog.int(settings.day_start_hour))
  |> pog.parameter(pog.float(fsrs.to_epoch(now)))
  |> pog.returning({
    use day_start <- decode.field(0, decode.float)
    use day_end <- decode.field(1, decode.float)
    use reviews_done <- decode.field(2, decode.int)
    use new_introduced <- decode.field(3, decode.int)
    use due_now <- decode.field(4, decode.int)
    decode.success(#(day_start, day_end, reviews_done, new_introduced, due_now))
  })
  |> pog.execute(db)
  |> result.map_error(database_error)
  |> result.try(fn(returned) {
    case list.first(returned.rows) {
      Error(Nil) ->
        Error(StudyDatabaseError("day bounds query returned no row"))
      Ok(#(day_start, day_end, reviews_done, new_introduced, due_now)) ->
        Ok(wire.Today(
          day_start: fsrs.from_epoch(day_start),
          day_end: fsrs.from_epoch(day_end),
          reviews_done:,
          new_introduced:,
          reviews_remaining: int_max(settings.reviews_per_day - reviews_done, 0),
          new_remaining: int_max(settings.new_per_day - new_introduced, 0),
          due_now:,
        ))
    }
  })
}

/// Postgres rejects an unknown zone name at query time, which would then break
/// every subsequent `today` call. Checking on write keeps a bad value out.
pub fn timezone_is_valid(
  db: pog.Connection,
  timezone: String,
) -> Result(Bool, StudyError) {
  pog.query("select 1 from pg_timezone_names where name = $1")
  |> pog.parameter(pog.text(timezone))
  |> pog.returning({
    use value <- decode.field(0, decode.int)
    decode.success(value)
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows != [] })
  |> result.map_error(database_error)
}

fn int_max(value: Int, floor: Int) -> Int {
  case value > floor {
    True -> value
    False -> floor
  }
}

// --- statistics ------------------------------------------------------------

/// Days are reported as "days ago" integers rather than dates.
///
/// The rollover and timezone maths has already been applied when producing
/// them, so the client can render a heatmap and count a streak with plain
/// integer arithmetic instead of reimplementing a calendar.
pub type DayTally =
  wire.DayTally

pub type Stats =
  wire.Stats

pub fn stats(
  db: pog.Connection,
  user_id: String,
  settings: Settings,
) -> Result(Stats, StudyError) {
  use totals <- result.try(review_totals(db, user_id))
  use state_counts <- result.try(state_counts(db, user_id))
  use history <- result.try(review_history(db, user_id, settings))
  use forecast <- result.try(due_forecast(db, user_id, settings))

  let #(total_reviews, mature_reviews, mature_correct) = totals
  Ok(wire.Stats(
    total_reviews:,
    mature_reviews:,
    mature_correct:,
    state_counts:,
    history:,
    forecast:,
    streak_days: streak(history),
  ))
}

/// Consecutive study days ending today, or ending yesterday if today has no
/// reviews yet -- a streak should not appear broken just because you have not
/// sat down yet.
///
/// Public only so `server_test` can reach it: the off-by-one between "today"
/// and "yesterday" is the kind of thing that breaks twice a year and never in
/// a way anyone notices.
pub fn streak(history: List(DayTally)) -> Int {
  let days =
    history |> list.map(fn(day) { day.days_ago }) |> list.sort(int.compare)
  case days {
    [0, ..] -> count_run(days, 0)
    [1, ..] -> count_run(days, 1)
    _ -> 0
  }
}

fn count_run(days: List(Int), expected: Int) -> Int {
  case days {
    [first, ..rest] if first == expected -> 1 + count_run(rest, expected + 1)
    _ -> 0
  }
}

fn review_totals(
  db: pog.Connection,
  user_id: String,
) -> Result(#(Int, Int, Int), StudyError) {
  pog.query(
    "select
       (select count(*) from reviews where user_id = $1::uuid)::int,
       (select count(*) from reviews
         where user_id = $1::uuid and state_before = 2)::int,
       (select count(*) from reviews
         where user_id = $1::uuid and state_before = 2 and rating > 1)::int",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.returning({
    use total <- decode.field(0, decode.int)
    use mature <- decode.field(1, decode.int)
    use correct <- decode.field(2, decode.int)
    decode.success(#(total, mature, correct))
  })
  |> pog.execute(db)
  |> result.map_error(database_error)
  |> result.map(fn(returned) {
    list.first(returned.rows) |> result.unwrap(#(0, 0, 0))
  })
}

fn state_counts(
  db: pog.Connection,
  user_id: String,
) -> Result(List(#(Int, Int)), StudyError) {
  pog.query(
    "select state, count(*)::int from cards
      where user_id = $1::uuid group by state order by state",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.returning({
    use state <- decode.field(0, decode.int)
    use count <- decode.field(1, decode.int)
    decode.success(#(state, count))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

fn review_history(
  db: pog.Connection,
  user_id: String,
  settings: Settings,
) -> Result(List(DayTally), StudyError) {
  pog.query(
    "with study_day as (
       select date_trunc('day', (now() at time zone $2) - make_interval(hours => $3))::date as today
     )
     select (select today from study_day)
            - date_trunc('day', (reviewed_at at time zone $2)
                                - make_interval(hours => $3))::date,
            count(*)::int,
            count(*) filter (where rating > 1)::int
       from reviews
      where user_id = $1::uuid
        and reviewed_at >= now() - interval '365 days'
      group by 1
      order by 1",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(settings.timezone))
  |> pog.parameter(pog.int(settings.day_start_hour))
  |> pog.returning({
    use days_ago <- decode.field(0, decode.int)
    use total <- decode.field(1, decode.int)
    use correct <- decode.field(2, decode.int)
    decode.success(wire.DayTally(days_ago:, total:, correct:))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

fn due_forecast(
  db: pog.Connection,
  user_id: String,
  settings: Settings,
) -> Result(List(#(Int, Int)), StudyError) {
  pog.query(
    "with study_day as (
       select date_trunc('day', (now() at time zone $2) - make_interval(hours => $3))::date as today
     )
     select greatest(
              0,
              date_trunc('day', (due at time zone $2)
                                - make_interval(hours => $3))::date
              - (select today from study_day)
            ),
            count(*)::int
       from cards
      where user_id = $1::uuid
        and not suspended
        and due < now() + interval '30 days'
      group by 1
      order by 1",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(settings.timezone))
  |> pog.parameter(pog.int(settings.day_start_hour))
  |> pog.returning({
    use offset <- decode.field(0, decode.int)
    use count <- decode.field(1, decode.int)
    decode.success(#(offset, count))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

// --- one-time import -------------------------------------------------------

/// A card carried over from guest mode, with the scheduling it actually
/// earned. Distinct from the legacy `solved` list, which has no dates at all.
pub type ImportCard {
  ImportCard(
    problem: ProblemRef,
    state: Int,
    step: Option(Int),
    memory: Option(fsrs.Memory),
    due: Timestamp,
    last_review: Option(Timestamp),
    reps: Int,
    lapses: Int,
    /// When the guest first saw this card. Carried across rather than reset,
    /// or every imported card would count against the day's new-card budget
    /// and the user could study nothing on the day they signed up.
    introduced_at: Option(Timestamp),
  )
}

/// Seeds cards, drafts and notes from the pre-account localStorage state.
///
/// Solved problems become Review cards due now, seeded with the memory state a
/// `Good` first answer would produce. They are deliberately NOT written to the
/// review log: the old format stored a sticky boolean and no dates at all, so
/// any review history invented from it would be fiction — and fiction is
/// exactly what the FSRS optimizer must never be trained on.
///
/// Existing cards are left alone, so running this twice cannot overwrite real
/// scheduling with a seed.
pub fn import_legacy(
  db: pog.Connection,
  user_id: String,
  settings: Settings,
  solved: List(ProblemRef),
  cards: List(ImportCard),
  drafts: List(#(ProblemRef, String)),
  notes: List(#(ProblemRef, String)),
  now: Timestamp,
) -> Result(Nil, StudyError) {
  let seed = fsrs.initial_memory(settings.scheduler, fsrs.Good)

  pog.transaction(db, fn(tx) {
    // Real guest scheduling first, so a problem present in both lists keeps
    // the state it earned rather than the flat legacy seed.
    use _ <- result.try(
      list.try_each(cards, fn(card) { insert_card(tx, user_id, card) }),
    )
    use _ <- result.try(
      list.try_each(solved, fn(problem) {
        seed_card(tx, user_id, problem, seed, now)
      }),
    )
    use _ <- result.try(
      list.try_each(drafts, fn(entry) {
        save_draft(tx, user_id, entry.0, entry.1)
      }),
    )
    list.try_each(notes, fn(entry) { save_note(tx, user_id, entry.0, entry.1) })
  })
  |> result.map_error(flatten_transaction_error)
}

/// Writes a guest's card with the scheduling it actually earned.
///
/// Like `seed_card` this never overwrites an existing row, so merging guest
/// progress into an established account cannot clobber real scheduling, and
/// retrying an import is harmless.
///
/// Deliberately writes no `reviews` rows. Those reviews genuinely happened,
/// but the log is the FSRS optimizer's training set and it should mean
/// "reviews this account recorded"; carrying them across needs an `imported`
/// flag first. Card state is what determines all future scheduling, and that
/// is preserved exactly.
fn insert_card(
  db: pog.Connection,
  user_id: String,
  card: ImportCard,
) -> Result(Nil, StudyError) {
  pog.query(
    "insert into cards (
       user_id, category, subcategory, title,
       state, step, stability, difficulty, due, last_review,
       reps, lapses, introduced_at)
     values ($1::uuid, $2, $3, $4, $5, $6, $7, $8,
             to_timestamp($9::float8),
             case when $10::float8 is null then null
                  else to_timestamp($10::float8) end,
             $11, $12,
             case when $13::float8 is null then null
                  else to_timestamp($13::float8) end)
     on conflict (user_id, category, subcategory, title) do nothing",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(card.problem.category))
  |> pog.parameter(pog.text(card.problem.subcategory))
  |> pog.parameter(pog.text(card.problem.title))
  |> pog.parameter(pog.int(card.state))
  |> pog.parameter(pog.nullable(pog.int, card.step))
  |> pog.parameter(pog.nullable(
    pog.float,
    option.map(card.memory, fn(m) { m.stability }),
  ))
  |> pog.parameter(pog.nullable(
    pog.float,
    option.map(card.memory, fn(m) { m.difficulty }),
  ))
  |> pog.parameter(pog.float(fsrs.to_epoch(card.due)))
  |> pog.parameter(pog.nullable(
    pog.float,
    option.map(card.last_review, fsrs.to_epoch),
  ))
  |> pog.parameter(pog.int(card.reps))
  |> pog.parameter(pog.int(card.lapses))
  // Null stays null. `introduced_at` means "first answered", and a guest can
  // now upgrade with a queue of cards they have never opened -- stamping those
  // with today would spend the whole daily new budget the moment they signed
  // up, and the account would report nothing new to study on day one.
  |> pog.parameter(pog.nullable(
    pog.float,
    option.map(card.introduced_at, fsrs.to_epoch),
  ))
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

fn seed_card(
  db: pog.Connection,
  user_id: String,
  problem: ProblemRef,
  seed: fsrs.Memory,
  now: Timestamp,
) -> Result(Nil, StudyError) {
  pog.query(
    // `reps` is 1, not 0. A zero-rep card is a queued one that has never been
    // opened, and this card is the opposite: the old app recorded it as solved,
    // which is what the seeded memory represents. Left at zero it would be
    // re-introduced as new and counted out of every statistic.
    "insert into cards (
       user_id, category, subcategory, title,
       state, step, stability, difficulty, due, reps, introduced_at)
     values ($1::uuid, $2, $3, $4, 2, null, $5, $6,
             to_timestamp($7::float8), 1, to_timestamp($7::float8))
     on conflict (user_id, category, subcategory, title) do nothing",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(problem.category))
  |> pog.parameter(pog.text(problem.subcategory))
  |> pog.parameter(pog.text(problem.title))
  |> pog.parameter(pog.float(seed.stability))
  |> pog.parameter(pog.float(seed.difficulty))
  |> pog.parameter(pog.float(fsrs.to_epoch(now)))
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

// --- insights --------------------------------------------------------------

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
) -> Result(Insights, StudyError) {
  use clean_solves <- result.try(clean_solves(db, user_id))
  use reveals <- result.try(reveal_counts(db, user_id))
  use calibration <- result.try(calibration(db, user_id))
  Ok(wire.Insights(clean_solves:, reveals:, calibration:))
}

/// The last five clean solves per card, oldest first. Five is enough for a
/// median-of-three fluency figure plus a visible trend.
fn clean_solves(
  db: pog.Connection,
  user_id: String,
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
        where r.user_id = $1::uuid
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
) -> Result(List(#(wire.ProblemRef, Int)), StudyError) {
  pog.query(
    "select c.category, c.subcategory, c.title, count(*)::int
       from reviews r
       join cards c on c.id = r.card_id
      where r.user_id = $1::uuid and r.revealed
      group by 1, 2, 3",
  )
  |> pog.parameter(pog.text(user_id))
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

fn calibration(
  db: pog.Connection,
  user_id: String,
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
          where r.user_id = $1::uuid
       ) sequenced
      where next_pass is not null
      group by rating
      order by rating",
  )
  |> pog.parameter(pog.text(user_id))
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

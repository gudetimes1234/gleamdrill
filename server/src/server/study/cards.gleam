//// Cards: loading, queueing, suspending and deleting them.
////
//// Part of the study data layer; see `server/study/model` for the shared
//// types.

import fsrs
import gleam/dynamic/decode
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import pog
import server/study/model.{
  type CardRecord, type ProblemRef, type StudyError, CardRecord,
  StudyDatabaseError, database_error,
}
import wire

const card_columns = "id::text, category, subcategory, title, state, step,
   stability, difficulty,
   extract(epoch from due)::float8,
   extract(epoch from last_review)::float8,
   reps, lapses, suspended,
   extract(epoch from introduced_at)::float8"

/// Every card in every track, for the export.
pub fn load_cards(
  db: pog.Connection,
  user_id: String,
) -> Result(List(CardRecord), StudyError) {
  load_card_rows(db, user_id, None)
}

/// One track's cards -- what a sitting, a queue screen and a stats screen all
/// work from now.
pub fn load_cards_in(
  db: pog.Connection,
  user_id: String,
  track: String,
) -> Result(List(CardRecord), StudyError) {
  load_card_rows(db, user_id, Some(track))
}

fn load_card_rows(
  db: pog.Connection,
  user_id: String,
  track: Option(String),
) -> Result(List(CardRecord), StudyError) {
  pog.query("select " <> card_columns <> " from cards
        where user_id = $1::uuid and ($2::text is null or category = $2)")
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.nullable(pog.text, track))
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
pub fn upsert_card(
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

pub fn update_card(
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

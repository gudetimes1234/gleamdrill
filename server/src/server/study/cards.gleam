//// Cards: loading, queueing, suspending and deleting them.
////
//// Part of the study data layer; see `server/study/model` for the shared
//// types. The SQL lives in `cards/sql/*.sql`; `gleam run -m squirrel`
//// generates `cards/sql.gleam` from it.

import fsrs
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import pog
import server/study/cards/sql
import server/study/model.{
  type CardRecord, type StudyError, CardRecord, StudyDatabaseError, done, first,
  nullable, rows,
}
import wire
import youid/uuid.{type Uuid}

/// Every card in every track, for the export.
pub fn load_cards(
  db: pog.Connection,
  user_id: Uuid,
) -> Result(List(CardRecord), StudyError) {
  sql.all_cards(db, user_id)
  |> rows(fn(row: sql.AllCardsRow) {
    card_from(
      id: row.id,
      category: row.category,
      subcategory: row.subcategory,
      title: row.title,
      state: row.state,
      step: row.step,
      stability: row.stability,
      difficulty: row.difficulty,
      due: row.due,
      last_review: row.last_review,
      reps: row.reps,
      lapses: row.lapses,
      suspended: row.suspended,
      introduced_at: row.introduced_at,
    )
  })
}

/// One track's cards -- what a sitting, a queue screen and a stats screen all
/// work from now.
pub fn load_cards_in(
  db: pog.Connection,
  user_id: Uuid,
  track: String,
) -> Result(List(CardRecord), StudyError) {
  sql.cards_in(db, user_id, track)
  |> rows(fn(row: sql.CardsInRow) {
    card_from(
      id: row.id,
      category: row.category,
      subcategory: row.subcategory,
      title: row.title,
      state: row.state,
      step: row.step,
      stability: row.stability,
      difficulty: row.difficulty,
      due: row.due,
      last_review: row.last_review,
      reps: row.reps,
      lapses: row.lapses,
      suspended: row.suspended,
      introduced_at: row.introduced_at,
    )
  })
}

/// Parks or resumes one card. Only a card that exists can be suspended: a
/// problem that is not in the study queue is already excluded, so a missing
/// row is the caller's 404, not an upsert. Suspending is how a card with
/// review history leaves the queue, since deleting it would take the history
/// with it.
pub fn set_suspended(
  db: pog.Connection,
  user_id: Uuid,
  problem: wire.ProblemRef,
  suspended: Bool,
) -> Result(Option(CardRecord), StudyError) {
  let wire.ProblemRef(category:, subcategory:, title:) = problem
  sql.set_suspended(db, user_id, category, subcategory, title, suspended)
  |> first(fn(row: sql.SetSuspendedRow) {
    card_from(
      id: row.id,
      category: row.category,
      subcategory: row.subcategory,
      title: row.title,
      state: row.state,
      step: row.step,
      stability: row.stability,
      difficulty: row.difficulty,
      due: row.due,
      last_review: row.last_review,
      reps: row.reps,
      lapses: row.lapses,
      suspended: row.suspended,
      introduced_at: row.introduced_at,
    )
  })
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
  user_id: Uuid,
  problems: List(wire.ProblemRef),
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
      sql.enqueue_cards(db, user_id, categories, subcategories, titles)
      |> rows(fn(row: sql.EnqueueCardsRow) {
        card_from(
          id: row.id,
          category: row.category,
          subcategory: row.subcategory,
          title: row.title,
          state: row.state,
          step: row.step,
          stability: row.stability,
          difficulty: row.difficulty,
          due: row.due,
          last_review: row.last_review,
          reps: row.reps,
          lapses: row.lapses,
          suspended: row.suspended,
          introduced_at: row.introduced_at,
        )
      })
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
  user_id: Uuid,
  problems: List(wire.ProblemRef),
) -> Result(#(List(wire.ProblemRef), List(wire.ProblemRef)), StudyError) {
  case problems {
    [] -> Ok(#([], []))
    _ -> {
      let categories = list.map(problems, fn(ref) { ref.category })
      let subcategories = list.map(problems, fn(ref) { ref.subcategory })
      let titles = list.map(problems, fn(ref) { ref.title })

      sql.delete_unstudied_cards(db, user_id, categories, subcategories, titles)
      |> rows(fn(row: sql.DeleteUnstudiedCardsRow) {
        wire.ProblemRef(row.category, row.subcategory, row.title)
      })
      |> result.map(fn(removed) {
        // Anything asked for and not returned still exists: either it has
        // been studied, or it was never queued. Both are "not removed", and
        // the client tells them apart from the cards it already holds.
        #(
          removed,
          list.filter(problems, fn(ref) { !list.contains(removed, ref) }),
        )
      })
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
  user_id: Uuid,
  problem: wire.ProblemRef,
) -> Result(CardRecord, StudyError) {
  let wire.ProblemRef(category:, subcategory:, title:) = problem
  sql.upsert_card(db, user_id, category, subcategory, title)
  |> first(fn(row: sql.UpsertCardRow) {
    card_from(
      id: row.id,
      category: row.category,
      subcategory: row.subcategory,
      title: row.title,
      state: row.state,
      step: row.step,
      stability: row.stability,
      difficulty: row.difficulty,
      due: row.due,
      last_review: row.last_review,
      reps: row.reps,
      lapses: row.lapses,
      suspended: row.suspended,
      introduced_at: row.introduced_at,
    )
  })
  |> result.try(option.to_result(
    _,
    StudyDatabaseError("card upsert returned no row"),
  ))
}

pub fn update_card(
  db: pog.Connection,
  record: CardRecord,
) -> Result(Nil, StudyError) {
  let card = record.card
  sql.update_card(
    db,
    record.id,
    wire.state_code(card.state),
    nullable(wire.state_step(card.state)),
    nullable(option.map(card.memory, fn(m) { m.stability })),
    nullable(option.map(card.memory, fn(m) { m.difficulty })),
    fsrs.to_epoch(card.due),
    nullable(option.map(card.last_review, fsrs.to_epoch)),
    record.reps,
    record.lapses,
  )
  |> done
}

/// A card from the fourteen columns every card query selects. Each query's
/// generated row is its own type, so they all meet here.
fn card_from(
  id id: Uuid,
  category category: String,
  subcategory subcategory: String,
  title title: String,
  state state: Int,
  step step: Option(Int),
  stability stability: Option(Float),
  difficulty difficulty: Option(Float),
  due due: Float,
  last_review last_review: Option(Float),
  reps reps: Int,
  lapses lapses: Int,
  suspended suspended: Bool,
  introduced_at introduced_at: Option(Float),
) -> CardRecord {
  CardRecord(
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
  )
}

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

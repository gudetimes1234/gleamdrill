//// The one-time import of progress from before accounts existed.
////
//// Part of the study data layer; see `server/study/model` for the shared
//// types.

import fsrs
import gleam/list
import gleam/option.{type Option}
import gleam/result
import gleam/time/timestamp.{type Timestamp}
import pog
import server/study/drafts
import server/study/model.{
  type ProblemRef, type Settings, type StudyError, database_error,
  flatten_transaction_error,
}
import server/study/notes
import server/study/queues
import wire

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
  track: String,
  settings: Settings,
  solved: List(ProblemRef),
  cards: List(ImportCard),
  drafts: List(#(ProblemRef, String)),
  notes: List(#(ProblemRef, String)),
  queues: List(wire.Queue),
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
        drafts.save_draft(tx, user_id, entry.0, entry.1)
      }),
    )
    use _ <- result.try(
      list.try_each(notes, fn(entry) {
        notes.save_note(tx, user_id, entry.0, entry.1)
      }),
    )
    queues.merge_queues(tx, user_id, track, queues)
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
pub fn insert_card(
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

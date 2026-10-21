//// Export and restore: the whole account as one file, and back.
////
//// Part of the study data layer; see `server/study/model` for the shared
//// types. The SQL lives in `archive/sql/*.sql`; `gleam run -m squirrel`
//// generates `archive/sql.gleam` from it.

import fsrs
import gleam/list
import gleam/result
import pog
import server/study/archive/sql
import server/study/drafts
import server/study/legacy_import.{ImportCard}
import server/study/model.{
  type StudyError, done, flatten_transaction_error, nullable, rows,
}
import server/study/notes
import server/study/profile
import server/study/queues
import wire
import youid/uuid.{type Uuid}

/// Every review the user has, oldest first, each with its problem: the
/// archive's review list.
pub fn all_reviews(
  db: pog.Connection,
  user_id: Uuid,
) -> Result(List(#(wire.ProblemRef, wire.ReviewRow)), StudyError) {
  sql.all_reviews(db, user_id)
  |> rows(fn(row: sql.AllReviewsRow) {
    #(
      wire.ProblemRef(row.category, row.subcategory, row.title),
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
      ),
    )
  })
}

/// Replaces everything the user has with the archive's contents, in one
/// transaction: cards, reviews, drafts, notes, queues and settings. Reviews are
/// re-attached to their cards by problem; rows for a problem the archive
/// has no card for are dropped. Restored reviews carry no snapshot, so
/// they cannot be undone.
pub fn restore(
  db: pog.Connection,
  user_id: Uuid,
  archive: wire.Archive,
) -> Result(Nil, StudyError) {
  pog.transaction(db, fn(tx) {
    use _ <- result.try(sql.clear_study_data(tx, user_id) |> done)
    use _ <- result.try(
      list.try_each(archive.cards, fn(card) {
        legacy_import.insert_card(
          tx,
          user_id,
          ImportCard(
            problem: card.problem,
            state: wire.state_code(card.card.state),
            step: wire.state_step(card.card.state),
            memory: card.card.memory,
            due: card.card.due,
            last_review: card.card.last_review,
            reps: card.reps,
            lapses: card.lapses,
            introduced_at: card.introduced_at,
          ),
        )
      }),
    )
    use _ <- result.try(
      list.try_each(archive.reviews, fn(entry) {
        let #(problem, row) = entry
        sql.restore_review(
          tx,
          user_id,
          problem.category,
          problem.subcategory,
          problem.title,
          fsrs.rating_to_int(row.rating),
          row.state_before,
          fsrs.to_epoch(row.at),
          row.scheduled_days,
          nullable(row.stability_after),
          nullable(row.duration_ms),
          row.auto_failed,
          row.revealed,
          row.recall,
        )
        |> done
      }),
    )
    use _ <- result.try(
      list.try_each(archive.drafts, fn(entry) {
        drafts.save_draft(tx, user_id, entry.0, entry.1)
      }),
    )
    use _ <- result.try(
      list.try_each(archive.notes, fn(entry) {
        notes.save_note(tx, user_id, entry.0, entry.1)
      }),
    )
    use _ <- result.try(queues.write_all_queues(tx, user_id, archive.queues))
    use _ <- result.try(profile.save_account(tx, user_id, archive.account))
    list.try_each(archive_tracks(archive), fn(entry) {
      profile.save_settings(tx, user_id, entry.0, entry.1)
    })
  })
  |> result.map_error(flatten_transaction_error)
}

/// Which track gets which settings, out of an archive.
///
/// A file from before tracks has one blob under the "" key, meaning "every
/// track", so it is fanned out across the tracks its own cards name -- the
/// data says which tracks it has. A newer file already has a row per track
/// and is taken as it stands. Mirrored in `guest.archive_tracks`, because a
/// file made by a guest has to restore into an account and back.
pub fn archive_tracks(archive: wire.Archive) -> List(#(String, wire.Settings)) {
  case list.key_find(archive.tracks, "") {
    Error(Nil) -> list.filter(archive.tracks, fn(entry) { entry.0 != "" })
    Ok(shared) ->
      archive.cards
      |> list.map(fn(card: wire.CardState) { card.problem.category })
      |> list.unique
      |> list.map(fn(track) { #(track, shared) })
  }
}

/// The account-wide half, plus whichever settings best describe the file as a
/// whole -- for the callers that want to validate one profile rather than N.
pub fn archive_profile(archive: wire.Archive) -> wire.Profile {
  let settings =
    list.key_find(archive.tracks, "")
    |> result.lazy_or(fn() {
      list.first(archive.tracks) |> result.map(fn(entry) { entry.1 })
    })
    |> result.unwrap(wire.default_settings())
  wire.Profile(account: archive.account, settings:)
}

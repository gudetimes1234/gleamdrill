//// Export and restore: the whole account as one file, and back.
////
//// Part of the study data layer; see `server/study/model` for the shared
//// types.

import fsrs
import gleam/dynamic/decode
import gleam/list
import gleam/result
import pog
import server/study/cards
import server/study/drafts
import server/study/insights.{type ReviewRow}
import server/study/legacy_import.{ImportCard}
import server/study/model.{
  type ProblemRef, type Settings, type StudyError, database_error,
  flatten_transaction_error,
}
import server/study/notes
import server/study/profile.{type Profile}
import server/study/queues
import wire

/// Every review the user has, oldest first, each with its problem: the
/// archive's review list.
pub fn all_reviews(
  db: pog.Connection,
  user_id: String,
) -> Result(List(#(ProblemRef, ReviewRow)), StudyError) {
  pog.query(
    "select c.category, c.subcategory, c.title,
            extract(epoch from r.reviewed_at)::float8, r.rating,
            r.duration_ms, r.revealed, r.auto_failed, r.state_before,
            r.scheduled_days, r.stability_after, r.recall
       from reviews r
       join cards c on c.id = r.card_id
      where r.user_id = $1::uuid
      order by r.reviewed_at, r.id",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.returning({
    use category <- decode.field(0, decode.string)
    use subcategory <- decode.field(1, decode.string)
    use title <- decode.field(2, decode.string)
    use at <- decode.field(3, decode.float)
    use rating <- decode.field(4, decode.int)
    use duration_ms <- decode.field(5, decode.optional(decode.int))
    use revealed <- decode.field(6, decode.bool)
    use auto_failed <- decode.field(7, decode.bool)
    use state_before <- decode.field(8, decode.int)
    use scheduled_days <- decode.field(9, decode.int)
    use stability_after <- decode.field(10, decode.optional(decode.float))
    use recall <- decode.field(11, decode.bool)
    let rating = result.unwrap(fsrs.rating_from_int(rating), fsrs.Good)
    decode.success(#(
      wire.ProblemRef(category:, subcategory:, title:),
      wire.ReviewRow(
        at: fsrs.from_epoch(at),
        rating:,
        duration_ms:,
        revealed:,
        auto_failed:,
        state_before:,
        scheduled_days:,
        stability_after:,
        recall:,
      ),
    ))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

/// Replaces everything the user has with the archive's contents, in one
/// transaction: cards, reviews, drafts, notes, queues and settings. Reviews are
/// re-attached to their cards by problem; rows for a problem the archive
/// has no card for are dropped. Restored reviews carry no snapshot, so
/// they cannot be undone.
pub fn restore(
  db: pog.Connection,
  user_id: String,
  archive: wire.Archive,
) -> Result(Nil, StudyError) {
  pog.transaction(db, fn(tx) {
    use _ <- result.try(
      list.try_each(
        ["reviews", "cards", "drafts", "notes", "queues"],
        fn(table) {
          pog.query("delete from " <> table <> " where user_id = $1::uuid")
          |> pog.parameter(pog.text(user_id))
          |> pog.execute(tx)
          |> result.replace(Nil)
          |> result.map_error(database_error)
        },
      ),
    )
    use _ <- result.try(
      list.try_each(archive.cards, fn(card) {
        legacy_import.insert_card(
          tx,
          user_id,
          ImportCard(
            problem: card.problem,
            state: cards.state_code(card.card.state),
            step: cards.state_step(card.card.state),
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
        pog.query(
          "insert into reviews (
             user_id, card_id, rating, state_before, reviewed_at,
             elapsed_days, scheduled_days, stability_after, difficulty_after,
             duration_ms, auto_failed, revealed, recall)
           select $1::uuid, id, $5, $6, to_timestamp($7::float8),
                  0, $8, $9, null, $10, $11, $12, $13
             from cards
            where user_id = $1::uuid and category = $2
              and subcategory = $3 and title = $4",
        )
        |> pog.parameter(pog.text(user_id))
        |> pog.parameter(pog.text(problem.category))
        |> pog.parameter(pog.text(problem.subcategory))
        |> pog.parameter(pog.text(problem.title))
        |> pog.parameter(pog.int(fsrs.rating_to_int(row.rating)))
        |> pog.parameter(pog.int(row.state_before))
        |> pog.parameter(pog.float(fsrs.to_epoch(row.at)))
        |> pog.parameter(pog.int(row.scheduled_days))
        |> pog.parameter(pog.nullable(pog.float, row.stability_after))
        |> pog.parameter(pog.nullable(pog.int, row.duration_ms))
        |> pog.parameter(pog.bool(row.auto_failed))
        |> pog.parameter(pog.bool(row.revealed))
        |> pog.parameter(pog.bool(row.recall))
        |> pog.execute(tx)
        |> result.replace(Nil)
        |> result.map_error(database_error)
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
/// and is taken as it stands. Mirrored in `local.archive_tracks`, because a
/// file made by a guest has to restore into an account and back.
pub fn archive_tracks(archive: wire.Archive) -> List(#(String, Settings)) {
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
pub fn archive_profile(archive: wire.Archive) -> Profile {
  let settings =
    list.key_find(archive.tracks, "")
    |> result.lazy_or(fn() {
      list.first(archive.tracks) |> result.map(fn(entry) { entry.1 })
    })
    |> result.unwrap(wire.default_settings())
  wire.Profile(account: archive.account, settings:)
}

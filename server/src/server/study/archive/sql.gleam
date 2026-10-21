//// This module contains the code to run the sql queries defined in
//// `./src/server/study/archive/sql`.
//// > 🐿️ This module was generated automatically using v4.7.0 of
//// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
////

import gleam/dynamic/decode
import gleam/option.{type Option}
import pog
import youid/uuid.{type Uuid}

/// A row you get from running the `all_reviews` query
/// defined in `./src/server/study/archive/sql/all_reviews.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type AllReviewsRow {
  AllReviewsRow(
    category: String,
    subcategory: String,
    title: String,
    at: Float,
    rating: Int,
    duration_ms: Option(Int),
    revealed: Bool,
    auto_failed: Bool,
    state_before: Int,
    scheduled_days: Int,
    stability_after: Option(Float),
    recall: Bool,
  )
}

/// Every review the user has, oldest first, each with its problem: the
/// archive's review list. reviewed_at is epoch seconds.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn all_reviews(
  db: pog.Connection,
  r_user_id: Uuid,
) -> Result(pog.Returned(AllReviewsRow), pog.QueryError) {
  let decoder = {
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
    decode.success(AllReviewsRow(
      category:,
      subcategory:,
      title:,
      at:,
      rating:,
      duration_ms:,
      revealed:,
      auto_failed:,
      state_before:,
      scheduled_days:,
      stability_after:,
      recall:,
    ))
  }

  "-- Every review the user has, oldest first, each with its problem: the
-- archive's review list. reviewed_at is epoch seconds.
select c.category, c.subcategory, c.title,
       extract(epoch from r.reviewed_at)::float8 as at, r.rating,
       r.duration_ms, r.revealed, r.auto_failed, r.state_before,
       r.scheduled_days, r.stability_after, r.recall
  from reviews r
  join cards c on c.id = r.card_id
 where r.user_id = $1
 order by r.reviewed_at, r.id
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(r_user_id)))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// Deletes everything a restore replaces, in one statement: reviews, cards,
/// drafts, notes and queues (queue items go with their queues). Settings
/// are not deleted; the restore overwrites them.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn clear_study_data(
  db: pog.Connection,
  user_id: Uuid,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Deletes everything a restore replaces, in one statement: reviews, cards,
-- drafts, notes and queues (queue items go with their queues). Settings
-- are not deleted; the restore overwrites them.
with reviews_gone as (
  delete from reviews where user_id = $1
), cards_gone as (
  delete from cards where user_id = $1
), drafts_gone as (
  delete from drafts where user_id = $1
), notes_gone as (
  delete from notes where user_id = $1
)
delete from queues where user_id = $1
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(user_id)))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// Re-attaches one archived review to the user's card for its problem, or
/// writes nothing when there is no such card. reviewed_at is epoch seconds;
/// stability_after and duration_ms are nullable and arrive as
/// zero-or-one-element arrays through the migration 10 helpers. A restored
/// review has no snapshot, so it cannot be undone.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn restore_review(
  db: pog.Connection,
  user_id: Uuid,
  category: String,
  subcategory: String,
  title: String,
  arg_5: Int,
  arg_6: Int,
  arg_7: Float,
  arg_8: Int,
  arg_9: List(Float),
  arg_10: List(Int),
  arg_11: Bool,
  arg_12: Bool,
  arg_13: Bool,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Re-attaches one archived review to the user's card for its problem, or
-- writes nothing when there is no such card. reviewed_at is epoch seconds;
-- stability_after and duration_ms are nullable and arrive as
-- zero-or-one-element arrays through the migration 10 helpers. A restored
-- review has no snapshot, so it cannot be undone.
insert into reviews (
  user_id, card_id, rating, state_before, reviewed_at,
  elapsed_days, scheduled_days, stability_after, difficulty_after,
  duration_ms, auto_failed, revealed, recall)
select $1, id, $5, $6, to_timestamp($7::float8),
       0, $8, float8_or_null($9), null, int_or_null($10), $11, $12, $13
  from cards
 where user_id = $1 and category = $2 and subcategory = $3 and title = $4
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(user_id)))
  |> pog.parameter(pog.text(category))
  |> pog.parameter(pog.text(subcategory))
  |> pog.parameter(pog.text(title))
  |> pog.parameter(pog.int(arg_5))
  |> pog.parameter(pog.int(arg_6))
  |> pog.parameter(pog.float(arg_7))
  |> pog.parameter(pog.int(arg_8))
  |> pog.parameter(pog.array(fn(value) { pog.float(value) }, arg_9))
  |> pog.parameter(pog.array(fn(value) { pog.int(value) }, arg_10))
  |> pog.parameter(pog.bool(arg_11))
  |> pog.parameter(pog.bool(arg_12))
  |> pog.parameter(pog.bool(arg_13))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

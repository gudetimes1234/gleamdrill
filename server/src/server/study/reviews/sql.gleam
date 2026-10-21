//// This module contains the code to run the sql queries defined in
//// `./src/server/study/reviews/sql`.
//// > 🐿️ This module was generated automatically using v4.7.0 of
//// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
////

import gleam/dynamic/decode
import gleam/json.{type Json}
import gleam/option.{type Option}
import pog
import youid/uuid.{type Uuid}

/// A row you get from running the `card_exists` query
/// defined in `./src/server/study/reviews/sql/card_exists.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type CardExistsRow {
  CardExistsRow(found: Bool)
}

/// Whether the problem already has a card: a review that creates one says
/// so in its snapshot, so that undoing it takes the card back out.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn card_exists(
  db: pog.Connection,
  user_id: Uuid,
  category: String,
  subcategory: String,
  title: String,
) -> Result(pog.Returned(CardExistsRow), pog.QueryError) {
  let decoder = {
    use found <- decode.field(0, decode.bool)
    decode.success(CardExistsRow(found:))
  }

  "-- Whether the problem already has a card: a review that creates one says
-- so in its snapshot, so that undoing it takes the card back out.
select exists (
  select 1 from cards
   where user_id = $1 and category = $2 and subcategory = $3 and title = $4
) as found
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(user_id)))
  |> pog.parameter(pog.text(category))
  |> pog.parameter(pog.text(subcategory))
  |> pog.parameter(pog.text(title))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// Deletes one card: undoing the review that created it.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn delete_card(
  db: pog.Connection,
  id: Uuid,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Deletes one card: undoing the review that created it.
delete from cards
 where id = $1
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(id)))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `delete_latest_review` query
/// defined in `./src/server/study/reviews/sql/delete_latest_review.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type DeleteLatestReviewRow {
  DeleteLatestReviewRow(card_id: Uuid, card_before: Option(String))
}

/// Deletes the newest review in one track and answers with its card and
/// the snapshot taken before it. A review from before snapshots has none.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn delete_latest_review(
  db: pog.Connection,
  r_user_id: Uuid,
  c_ategory: String,
) -> Result(pog.Returned(DeleteLatestReviewRow), pog.QueryError) {
  let decoder = {
    use card_id <- decode.field(0, uuid_decoder())
    use card_before <- decode.field(1, decode.optional(decode.string))
    decode.success(DeleteLatestReviewRow(card_id:, card_before:))
  }

  "-- Deletes the newest review in one track and answers with its card and
-- the snapshot taken before it. A review from before snapshots has none.
delete from reviews
 where id = (
   select r.id
     from reviews r
     join cards c on c.id = r.card_id
    where r.user_id = $1 and c.category = $2
    order by r.reviewed_at desc, r.id desc
    limit 1
 )
returning card_id, card_before::text as \"card_before?\"
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(r_user_id)))
  |> pog.parameter(pog.text(c_ategory))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// Appends one review to the log. reviewed_at is epoch seconds; the
/// nullable stability_after, difficulty_after and duration_ms arrive as
/// zero-or-one-element arrays through the migration 10 helpers. card_before
/// is the card as it stood, which is what an undo restores.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn insert_review(
  db: pog.Connection,
  arg_1: Uuid,
  arg_2: Uuid,
  arg_3: Int,
  arg_4: Int,
  arg_5: Float,
  arg_6: Int,
  arg_7: Int,
  arg_8: List(Float),
  arg_9: List(Float),
  arg_10: List(Int),
  arg_11: Bool,
  arg_12: Bool,
  arg_13: Bool,
  arg_14: Json,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Appends one review to the log. reviewed_at is epoch seconds; the
-- nullable stability_after, difficulty_after and duration_ms arrive as
-- zero-or-one-element arrays through the migration 10 helpers. card_before
-- is the card as it stood, which is what an undo restores.
insert into reviews (
  user_id, card_id, rating, state_before, reviewed_at,
  elapsed_days, scheduled_days, stability_after, difficulty_after,
  duration_ms, auto_failed, revealed, recall, card_before)
values ($1, $2, $3, $4, to_timestamp($5::float8),
        $6, $7, float8_or_null($8), float8_or_null($9),
        int_or_null($10), $11, $12, $13, $14)
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(arg_1)))
  |> pog.parameter(pog.text(uuid.to_string(arg_2)))
  |> pog.parameter(pog.int(arg_3))
  |> pog.parameter(pog.int(arg_4))
  |> pog.parameter(pog.float(arg_5))
  |> pog.parameter(pog.int(arg_6))
  |> pog.parameter(pog.int(arg_7))
  |> pog.parameter(pog.array(fn(value) { pog.float(value) }, arg_8))
  |> pog.parameter(pog.array(fn(value) { pog.float(value) }, arg_9))
  |> pog.parameter(pog.array(fn(value) { pog.int(value) }, arg_10))
  |> pog.parameter(pog.bool(arg_11))
  |> pog.parameter(pog.bool(arg_12))
  |> pog.parameter(pog.bool(arg_13))
  |> pog.parameter(pog.text(json.to_string(arg_14)))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// Puts back the two columns a review never touches but an undo must, for a
/// card that had been introduced before the undone review; introduced_at is
/// epoch seconds.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn restore_introduced_card(
  db: pog.Connection,
  id: Uuid,
  arg_2: Float,
  suspended: Bool,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Puts back the two columns a review never touches but an undo must, for a
-- card that had been introduced before the undone review; introduced_at is
-- epoch seconds.
update cards
   set introduced_at = to_timestamp($2::float8), suspended = $3
 where id = $1
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(id)))
  |> pog.parameter(pog.float(arg_2))
  |> pog.parameter(pog.bool(suspended))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// As restore_introduced_card, for a card the undone review had introduced.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn restore_unintroduced_card(
  db: pog.Connection,
  id: Uuid,
  suspended: Bool,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- As restore_introduced_card, for a card the undone review had introduced.
update cards
   set introduced_at = null, suspended = $2
 where id = $1
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(id)))
  |> pog.parameter(pog.bool(suspended))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

// --- Encoding/decoding utils -------------------------------------------------

/// A decoder to decode `Uuid`s coming from a Postgres query.
///
fn uuid_decoder() {
  use bit_array <- decode.then(decode.bit_array)
  case uuid.from_bit_array(bit_array) {
    Ok(uuid) -> decode.success(uuid)
    Error(_) -> decode.failure(uuid.v7(), "Uuid")
  }
}

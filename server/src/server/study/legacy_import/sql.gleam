//// This module contains the code to run the sql queries defined in
//// `./src/server/study/legacy_import/sql`.
//// > 🐿️ This module was generated automatically using v4.7.0 of
//// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
////

import gleam/dynamic/decode
import pog
import youid/uuid.{type Uuid}

/// Writes a card carried over with the scheduling it earned, leaving any
/// existing card alone. Times are epoch seconds; step, stability,
/// difficulty, last_review and introduced_at are nullable and arrive as
/// zero-or-one-element arrays through the migration 10 helpers.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn insert_card(
  db: pog.Connection,
  arg_1: Uuid,
  arg_2: String,
  arg_3: String,
  arg_4: String,
  arg_5: Int,
  arg_6: List(Int),
  arg_7: List(Float),
  arg_8: List(Float),
  arg_9: Float,
  arg_10: List(Float),
  arg_11: Int,
  arg_12: Int,
  arg_13: List(Float),
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Writes a card carried over with the scheduling it earned, leaving any
-- existing card alone. Times are epoch seconds; step, stability,
-- difficulty, last_review and introduced_at are nullable and arrive as
-- zero-or-one-element arrays through the migration 10 helpers.
insert into cards (
  user_id, category, subcategory, title,
  state, step, stability, difficulty, due, last_review,
  reps, lapses, introduced_at)
values ($1, $2, $3, $4,
        $5, int_or_null($6), float8_or_null($7), float8_or_null($8),
        to_timestamp($9::float8), to_timestamp_or_null($10),
        $11, $12, to_timestamp_or_null($13))
on conflict (user_id, category, subcategory, title) do nothing
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(arg_1)))
  |> pog.parameter(pog.text(arg_2))
  |> pog.parameter(pog.text(arg_3))
  |> pog.parameter(pog.text(arg_4))
  |> pog.parameter(pog.int(arg_5))
  |> pog.parameter(pog.array(fn(value) { pog.int(value) }, arg_6))
  |> pog.parameter(pog.array(fn(value) { pog.float(value) }, arg_7))
  |> pog.parameter(pog.array(fn(value) { pog.float(value) }, arg_8))
  |> pog.parameter(pog.float(arg_9))
  |> pog.parameter(pog.array(fn(value) { pog.float(value) }, arg_10))
  |> pog.parameter(pog.int(arg_11))
  |> pog.parameter(pog.int(arg_12))
  |> pog.parameter(pog.array(fn(value) { pog.float(value) }, arg_13))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// Writes a solved problem from before accounts as a Review card due now
/// ($7, epoch seconds) with one rep and the given memory, leaving any
/// existing card alone.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn seed_card(
  db: pog.Connection,
  arg_1: Uuid,
  arg_2: String,
  arg_3: String,
  arg_4: String,
  arg_5: Float,
  arg_6: Float,
  arg_7: Float,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Writes a solved problem from before accounts as a Review card due now
-- ($7, epoch seconds) with one rep and the given memory, leaving any
-- existing card alone.
insert into cards (
  user_id, category, subcategory, title,
  state, step, stability, difficulty, due, reps, introduced_at)
values ($1, $2, $3, $4, 2, null, $5, $6,
        to_timestamp($7::float8), 1, to_timestamp($7::float8))
on conflict (user_id, category, subcategory, title) do nothing
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(arg_1)))
  |> pog.parameter(pog.text(arg_2))
  |> pog.parameter(pog.text(arg_3))
  |> pog.parameter(pog.text(arg_4))
  |> pog.parameter(pog.float(arg_5))
  |> pog.parameter(pog.float(arg_6))
  |> pog.parameter(pog.float(arg_7))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

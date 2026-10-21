//// This module contains the code to run the sql queries defined in
//// `./src/server/study/cards/sql`.
//// > 🐿️ This module was generated automatically using v4.7.0 of
//// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
////

import gleam/dynamic/decode
import gleam/option.{type Option}
import pog
import youid/uuid.{type Uuid}

/// A row you get from running the `all_cards` query
/// defined in `./src/server/study/cards/sql/all_cards.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type AllCardsRow {
  AllCardsRow(
    id: Uuid,
    category: String,
    subcategory: String,
    title: String,
    state: Int,
    step: Option(Int),
    stability: Option(Float),
    difficulty: Option(Float),
    due: Float,
    last_review: Option(Float),
    reps: Int,
    lapses: Int,
    suspended: Bool,
    introduced_at: Option(Float),
  )
}

/// Every card the user has, in every track: the export reads this. Times are
/// epoch seconds, and "?" marks the columns a never-reviewed card has null.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn all_cards(
  db: pog.Connection,
  user_id: Uuid,
) -> Result(pog.Returned(AllCardsRow), pog.QueryError) {
  let decoder = {
    use id <- decode.field(0, uuid_decoder())
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
    decode.success(AllCardsRow(
      id:,
      category:,
      subcategory:,
      title:,
      state:,
      step:,
      stability:,
      difficulty:,
      due:,
      last_review:,
      reps:,
      lapses:,
      suspended:,
      introduced_at:,
    ))
  }

  "-- Every card the user has, in every track: the export reads this. Times are
-- epoch seconds, and \"?\" marks the columns a never-reviewed card has null.
select id, category, subcategory, title, state, step as \"step?\",
       stability as \"stability?\", difficulty as \"difficulty?\",
       extract(epoch from due)::float8 as due,
       extract(epoch from last_review)::float8 as \"last_review?\",
       reps, lapses, suspended,
       extract(epoch from introduced_at)::float8 as \"introduced_at?\"
  from cards
 where user_id = $1
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(user_id)))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `cards_in` query
/// defined in `./src/server/study/cards/sql/cards_in.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type CardsInRow {
  CardsInRow(
    id: Uuid,
    category: String,
    subcategory: String,
    title: String,
    state: Int,
    step: Option(Int),
    stability: Option(Float),
    difficulty: Option(Float),
    due: Float,
    last_review: Option(Float),
    reps: Int,
    lapses: Int,
    suspended: Bool,
    introduced_at: Option(Float),
  )
}

/// One track's cards, columns as all_cards.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn cards_in(
  db: pog.Connection,
  user_id: Uuid,
  category: String,
) -> Result(pog.Returned(CardsInRow), pog.QueryError) {
  let decoder = {
    use id <- decode.field(0, uuid_decoder())
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
    decode.success(CardsInRow(
      id:,
      category:,
      subcategory:,
      title:,
      state:,
      step:,
      stability:,
      difficulty:,
      due:,
      last_review:,
      reps:,
      lapses:,
      suspended:,
      introduced_at:,
    ))
  }

  "-- One track's cards, columns as all_cards.
select id, category, subcategory, title, state, step as \"step?\",
       stability as \"stability?\", difficulty as \"difficulty?\",
       extract(epoch from due)::float8 as due,
       extract(epoch from last_review)::float8 as \"last_review?\",
       reps, lapses, suspended,
       extract(epoch from introduced_at)::float8 as \"introduced_at?\"
  from cards
 where user_id = $1 and category = $2
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(user_id)))
  |> pog.parameter(pog.text(category))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `delete_unstudied_cards` query
/// defined in `./src/server/study/cards/sql/delete_unstudied_cards.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type DeleteUnstudiedCardsRow {
  DeleteUnstudiedCardsRow(category: String, subcategory: String, title: String)
}

/// Deletes the cards, of the problems in three parallel arrays, that have
/// never been reviewed, answering with the problems it removed. reps = 0 is
/// the whole safety condition: a studied card's review log would cascade.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn delete_unstudied_cards(
  db: pog.Connection,
  c_user_id: Uuid,
  arg_2: List(String),
  arg_3: List(String),
  arg_4: List(String),
) -> Result(pog.Returned(DeleteUnstudiedCardsRow), pog.QueryError) {
  let decoder = {
    use category <- decode.field(0, decode.string)
    use subcategory <- decode.field(1, decode.string)
    use title <- decode.field(2, decode.string)
    decode.success(DeleteUnstudiedCardsRow(category:, subcategory:, title:))
  }

  "-- Deletes the cards, of the problems in three parallel arrays, that have
-- never been reviewed, answering with the problems it removed. reps = 0 is
-- the whole safety condition: a studied card's review log would cascade.
delete from cards c
 using unnest($2::text[], $3::text[], $4::text[])
    as t(category, subcategory, title)
 where c.user_id = $1
   and c.category = t.category
   and c.subcategory = t.subcategory
   and c.title = t.title
   and c.reps = 0
returning c.category, c.subcategory, c.title
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(c_user_id)))
  |> pog.parameter(pog.array(fn(value) { pog.text(value) }, arg_2))
  |> pog.parameter(pog.array(fn(value) { pog.text(value) }, arg_3))
  |> pog.parameter(pog.array(fn(value) { pog.text(value) }, arg_4))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `enqueue_cards` query
/// defined in `./src/server/study/cards/sql/enqueue_cards.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type EnqueueCardsRow {
  EnqueueCardsRow(
    id: Uuid,
    category: String,
    subcategory: String,
    title: String,
    state: Int,
    step: Option(Int),
    stability: Option(Float),
    difficulty: Option(Float),
    due: Float,
    last_review: Option(Float),
    reps: Int,
    lapses: Int,
    suspended: Bool,
    introduced_at: Option(Float),
  )
}

/// Gives each of the problems in three parallel arrays (category,
/// subcategory, title) a card, and answers with every one asked for,
/// including those already queued. The union is needed: a data-modifying
/// CTE and the query it feeds see the same snapshot, so the select half
/// cannot see what the insert wrote, and the insert returns its own rows.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn enqueue_cards(
  db: pog.Connection,
  c_user_id: Uuid,
  arg_2: List(String),
  arg_3: List(String),
  arg_4: List(String),
) -> Result(pog.Returned(EnqueueCardsRow), pog.QueryError) {
  let decoder = {
    use id <- decode.field(0, uuid_decoder())
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
    decode.success(EnqueueCardsRow(
      id:,
      category:,
      subcategory:,
      title:,
      state:,
      step:,
      stability:,
      difficulty:,
      due:,
      last_review:,
      reps:,
      lapses:,
      suspended:,
      introduced_at:,
    ))
  }

  "-- Gives each of the problems in three parallel arrays (category,
-- subcategory, title) a card, and answers with every one asked for,
-- including those already queued. The union is needed: a data-modifying
-- CTE and the query it feeds see the same snapshot, so the select half
-- cannot see what the insert wrote, and the insert returns its own rows.
with asked as (
  select *
    from unnest($2::text[], $3::text[], $4::text[])
      as t(category, subcategory, title)
), inserted as (
  insert into cards (user_id, category, subcategory, title)
  select $1, category, subcategory, title from asked
  on conflict (user_id, category, subcategory, title) do nothing
  returning id, category, subcategory, title, state, step as \"step?\",
       stability as \"stability?\", difficulty as \"difficulty?\",
       extract(epoch from due)::float8 as due,
       extract(epoch from last_review)::float8 as \"last_review?\",
       reps, lapses, suspended,
       extract(epoch from introduced_at)::float8 as \"introduced_at?\"
)
select * from inserted
union all
select c.id, c.category, c.subcategory, c.title, c.state, c.step,
       c.stability, c.difficulty,
       extract(epoch from c.due)::float8,
       extract(epoch from c.last_review)::float8,
       c.reps, c.lapses, c.suspended,
       extract(epoch from c.introduced_at)::float8
  from cards c
  join asked using (category, subcategory, title)
 where c.user_id = $1
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(c_user_id)))
  |> pog.parameter(pog.array(fn(value) { pog.text(value) }, arg_2))
  |> pog.parameter(pog.array(fn(value) { pog.text(value) }, arg_3))
  |> pog.parameter(pog.array(fn(value) { pog.text(value) }, arg_4))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `set_suspended` query
/// defined in `./src/server/study/cards/sql/set_suspended.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type SetSuspendedRow {
  SetSuspendedRow(
    id: Uuid,
    category: String,
    subcategory: String,
    title: String,
    state: Int,
    step: Option(Int),
    stability: Option(Float),
    difficulty: Option(Float),
    due: Float,
    last_review: Option(Float),
    reps: Int,
    lapses: Int,
    suspended: Bool,
    introduced_at: Option(Float),
  )
}

/// Parks or resumes one card, answering with it; no row when there is no
/// such card.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn set_suspended(
  db: pog.Connection,
  user_id: Uuid,
  category: String,
  subcategory: String,
  title: String,
  suspended: Bool,
) -> Result(pog.Returned(SetSuspendedRow), pog.QueryError) {
  let decoder = {
    use id <- decode.field(0, uuid_decoder())
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
    decode.success(SetSuspendedRow(
      id:,
      category:,
      subcategory:,
      title:,
      state:,
      step:,
      stability:,
      difficulty:,
      due:,
      last_review:,
      reps:,
      lapses:,
      suspended:,
      introduced_at:,
    ))
  }

  "-- Parks or resumes one card, answering with it; no row when there is no
-- such card.
update cards
   set suspended = $5
 where user_id = $1 and category = $2 and subcategory = $3 and title = $4
returning id, category, subcategory, title, state, step as \"step?\",
       stability as \"stability?\", difficulty as \"difficulty?\",
       extract(epoch from due)::float8 as due,
       extract(epoch from last_review)::float8 as \"last_review?\",
       reps, lapses, suspended,
       extract(epoch from introduced_at)::float8 as \"introduced_at?\"
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(user_id)))
  |> pog.parameter(pog.text(category))
  |> pog.parameter(pog.text(subcategory))
  |> pog.parameter(pog.text(title))
  |> pog.parameter(pog.bool(suspended))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// Writes a card's scheduling after a review. step, stability, difficulty
/// and last_review are nullable, and arrive as zero-or-one-element arrays
/// through the migration 10 helpers; due and last_review are epoch seconds.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn update_card(
  db: pog.Connection,
  id: Uuid,
  arg_2: Int,
  arg_3: List(Int),
  arg_4: List(Float),
  arg_5: List(Float),
  arg_6: Float,
  arg_7: List(Float),
  arg_8: Int,
  lapses: Int,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Writes a card's scheduling after a review. step, stability, difficulty
-- and last_review are nullable, and arrive as zero-or-one-element arrays
-- through the migration 10 helpers; due and last_review are epoch seconds.
update cards
   set state = $2,
       step = int_or_null($3),
       stability = float8_or_null($4),
       difficulty = float8_or_null($5),
       due = to_timestamp($6::float8),
       last_review = to_timestamp_or_null($7),
       reps = $8,
       lapses = $9
 where id = $1
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(id)))
  |> pog.parameter(pog.int(arg_2))
  |> pog.parameter(pog.array(fn(value) { pog.int(value) }, arg_3))
  |> pog.parameter(pog.array(fn(value) { pog.float(value) }, arg_4))
  |> pog.parameter(pog.array(fn(value) { pog.float(value) }, arg_5))
  |> pog.parameter(pog.float(arg_6))
  |> pog.parameter(pog.array(fn(value) { pog.float(value) }, arg_7))
  |> pog.parameter(pog.int(arg_8))
  |> pog.parameter(pog.int(lapses))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `upsert_card` query
/// defined in `./src/server/study/cards/sql/upsert_card.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type UpsertCardRow {
  UpsertCardRow(
    id: Uuid,
    category: String,
    subcategory: String,
    title: String,
    state: Int,
    step: Option(Int),
    stability: Option(Float),
    difficulty: Option(Float),
    due: Float,
    last_review: Option(Float),
    reps: Int,
    lapses: Int,
    suspended: Bool,
    introduced_at: Option(Float),
  )
}

/// Creates a problem's card on its first review, or stamps introduced_at on
/// a queued one that has never been reviewed, answering with the card.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn upsert_card(
  db: pog.Connection,
  arg_1: Uuid,
  arg_2: String,
  arg_3: String,
  arg_4: String,
) -> Result(pog.Returned(UpsertCardRow), pog.QueryError) {
  let decoder = {
    use id <- decode.field(0, uuid_decoder())
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
    decode.success(UpsertCardRow(
      id:,
      category:,
      subcategory:,
      title:,
      state:,
      step:,
      stability:,
      difficulty:,
      due:,
      last_review:,
      reps:,
      lapses:,
      suspended:,
      introduced_at:,
    ))
  }

  "-- Creates a problem's card on its first review, or stamps introduced_at on
-- a queued one that has never been reviewed, answering with the card.
insert into cards (user_id, category, subcategory, title, introduced_at)
values ($1, $2, $3, $4, now())
on conflict (user_id, category, subcategory, title)
  do update set introduced_at = coalesce(cards.introduced_at, now())
returning id, category, subcategory, title, state, step as \"step?\",
       stability as \"stability?\", difficulty as \"difficulty?\",
       extract(epoch from due)::float8 as due,
       extract(epoch from last_review)::float8 as \"last_review?\",
       reps, lapses, suspended,
       extract(epoch from introduced_at)::float8 as \"introduced_at?\"
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(arg_1)))
  |> pog.parameter(pog.text(arg_2))
  |> pog.parameter(pog.text(arg_3))
  |> pog.parameter(pog.text(arg_4))
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

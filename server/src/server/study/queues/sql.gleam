//// This module contains the code to run the sql queries defined in
//// `./src/server/study/queues/sql`.
//// > 🐿️ This module was generated automatically using v4.7.0 of
//// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
////

import gleam/dynamic/decode
import gleam/option.{type Option}
import pog
import youid/uuid.{type Uuid}

/// A row you get from running the `all_queues` query
/// defined in `./src/server/study/queues/sql/all_queues.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type AllQueuesRow {
  AllQueuesRow(
    name: String,
    track: String,
    category: Option(String),
    subcategory: Option(String),
    title: Option(String),
  )
}

/// Every queue in every track with its problems in order, for the export. A
/// left join, so an empty queue still comes back, with null problem columns.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn all_queues(
  db: pog.Connection,
  q_user_id: Uuid,
) -> Result(pog.Returned(AllQueuesRow), pog.QueryError) {
  let decoder = {
    use name <- decode.field(0, decode.string)
    use track <- decode.field(1, decode.string)
    use category <- decode.field(2, decode.optional(decode.string))
    use subcategory <- decode.field(3, decode.optional(decode.string))
    use title <- decode.field(4, decode.optional(decode.string))
    decode.success(AllQueuesRow(name:, track:, category:, subcategory:, title:))
  }

  "-- Every queue in every track with its problems in order, for the export. A
-- left join, so an empty queue still comes back, with null problem columns.
select q.name, q.track,
       i.category as \"category?\", i.subcategory as \"subcategory?\",
       i.title as \"title?\"
  from queues q
  left join queue_items i on i.queue_id = q.id
 where q.user_id = $1
 order by q.position, q.name, i.position
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(q_user_id)))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// Deletes every queue the user has, in every track: a restore's, and only
/// a restore's.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn delete_all_queues(
  db: pog.Connection,
  user_id: Uuid,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Deletes every queue the user has, in every track: a restore's, and only
-- a restore's.
delete from queues
 where user_id = $1
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(user_id)))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// Deletes one track's queues, and with them their items. The track filter
/// is what keeps a PUT of one track's set from wiping every other track's.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn delete_queues_in(
  db: pog.Connection,
  user_id: Uuid,
  track: String,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Deletes one track's queues, and with them their items. The track filter
-- is what keeps a PUT of one track's set from wiping every other track's.
delete from queues
 where user_id = $1 and track = $2
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(user_id)))
  |> pog.parameter(pog.text(track))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `insert_queue` query
/// defined in `./src/server/study/queues/sql/insert_queue.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type InsertQueueRow {
  InsertQueueRow(id: Uuid)
}

/// Creates one empty queue and answers with its id.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn insert_queue(
  db: pog.Connection,
  arg_1: Uuid,
  arg_2: String,
  arg_3: Int,
  arg_4: String,
) -> Result(pog.Returned(InsertQueueRow), pog.QueryError) {
  let decoder = {
    use id <- decode.field(0, uuid_decoder())
    decode.success(InsertQueueRow(id:))
  }

  "-- Creates one empty queue and answers with its id.
insert into queues (user_id, name, position, track)
values ($1, $2, $3, $4)
returning id
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(arg_1)))
  |> pog.parameter(pog.text(arg_2))
  |> pog.parameter(pog.int(arg_3))
  |> pog.parameter(pog.text(arg_4))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// Fills a queue with problems, in the order given: three parallel arrays of
/// category, subcategory and title.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn insert_queue_items(
  db: pog.Connection,
  arg_1: Uuid,
  arg_2: List(String),
  arg_3: List(String),
  arg_4: List(String),
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Fills a queue with problems, in the order given: three parallel arrays of
-- category, subcategory and title.
insert into queue_items (queue_id, category, subcategory, title, position)
select $1, category, subcategory, title, ordinality
  from unnest($2::text[], $3::text[], $4::text[])
       with ordinality as t(category, subcategory, title, ordinality)
on conflict do nothing
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(arg_1)))
  |> pog.parameter(pog.array(fn(value) { pog.text(value) }, arg_2))
  |> pog.parameter(pog.array(fn(value) { pog.text(value) }, arg_3))
  |> pog.parameter(pog.array(fn(value) { pog.text(value) }, arg_4))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `queues_in` query
/// defined in `./src/server/study/queues/sql/queues_in.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type QueuesInRow {
  QueuesInRow(
    name: String,
    track: String,
    category: Option(String),
    subcategory: Option(String),
    title: Option(String),
  )
}

/// One track's queues with their problems in order, as all_queues.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn queues_in(
  db: pog.Connection,
  q_user_id: Uuid,
  q_track: String,
) -> Result(pog.Returned(QueuesInRow), pog.QueryError) {
  let decoder = {
    use name <- decode.field(0, decode.string)
    use track <- decode.field(1, decode.string)
    use category <- decode.field(2, decode.optional(decode.string))
    use subcategory <- decode.field(3, decode.optional(decode.string))
    use title <- decode.field(4, decode.optional(decode.string))
    decode.success(QueuesInRow(name:, track:, category:, subcategory:, title:))
  }

  "-- One track's queues with their problems in order, as all_queues.
select q.name, q.track,
       i.category as \"category?\", i.subcategory as \"subcategory?\",
       i.title as \"title?\"
  from queues q
  left join queue_items i on i.queue_id = q.id
 where q.user_id = $1 and q.track = $2
 order by q.position, q.name, i.position
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(q_user_id)))
  |> pog.parameter(pog.text(q_track))
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

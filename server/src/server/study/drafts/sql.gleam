//// This module contains the code to run the sql queries defined in
//// `./src/server/study/drafts/sql`.
//// > 🐿️ This module was generated automatically using v4.7.0 of
//// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
////

import gleam/dynamic/decode
import pog
import youid/uuid.{type Uuid}

/// A row you get from running the `all_drafts` query
/// defined in `./src/server/study/drafts/sql/all_drafts.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type AllDraftsRow {
  AllDraftsRow(
    category: String,
    subcategory: String,
    title: String,
    body: String,
  )
}

/// Every draft the user has, in every track: the export reads this.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn all_drafts(
  db: pog.Connection,
  user_id: Uuid,
) -> Result(pog.Returned(AllDraftsRow), pog.QueryError) {
  let decoder = {
    use category <- decode.field(0, decode.string)
    use subcategory <- decode.field(1, decode.string)
    use title <- decode.field(2, decode.string)
    use body <- decode.field(3, decode.string)
    decode.success(AllDraftsRow(category:, subcategory:, title:, body:))
  }

  "-- Every draft the user has, in every track: the export reads this.
select category, subcategory, title, body
  from drafts
 where user_id = $1
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(user_id)))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// Drops a draft, if there is one: a graded problem starts from the stub.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn delete_draft(
  db: pog.Connection,
  user_id: Uuid,
  category: String,
  subcategory: String,
  title: String,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Drops a draft, if there is one: a graded problem starts from the stub.
delete from drafts
 where user_id = $1 and category = $2 and subcategory = $3 and title = $4
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(user_id)))
  |> pog.parameter(pog.text(category))
  |> pog.parameter(pog.text(subcategory))
  |> pog.parameter(pog.text(title))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `drafts_in` query
/// defined in `./src/server/study/drafts/sql/drafts_in.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type DraftsInRow {
  DraftsInRow(
    category: String,
    subcategory: String,
    title: String,
    body: String,
  )
}

/// One track's drafts.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn drafts_in(
  db: pog.Connection,
  user_id: Uuid,
  category: String,
) -> Result(pog.Returned(DraftsInRow), pog.QueryError) {
  let decoder = {
    use category <- decode.field(0, decode.string)
    use subcategory <- decode.field(1, decode.string)
    use title <- decode.field(2, decode.string)
    use body <- decode.field(3, decode.string)
    decode.success(DraftsInRow(category:, subcategory:, title:, body:))
  }

  "-- One track's drafts.
select category, subcategory, title, body
  from drafts
 where user_id = $1 and category = $2
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(user_id)))
  |> pog.parameter(pog.text(category))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// Writes one draft, replacing whatever the problem had.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn save_draft(
  db: pog.Connection,
  arg_1: Uuid,
  arg_2: String,
  arg_3: String,
  arg_4: String,
  arg_5: String,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Writes one draft, replacing whatever the problem had.
insert into drafts (user_id, category, subcategory, title, body)
values ($1, $2, $3, $4, $5)
on conflict (user_id, category, subcategory, title)
  do update set body = excluded.body, updated_at = now()
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(arg_1)))
  |> pog.parameter(pog.text(arg_2))
  |> pog.parameter(pog.text(arg_3))
  |> pog.parameter(pog.text(arg_4))
  |> pog.parameter(pog.text(arg_5))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

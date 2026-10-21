//// This module contains the code to run the sql queries defined in
//// `./src/server/study/notes/sql`.
//// > 🐿️ This module was generated automatically using v4.7.0 of
//// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
////

import gleam/dynamic/decode
import pog
import youid/uuid.{type Uuid}

/// A row you get from running the `all_notes` query
/// defined in `./src/server/study/notes/sql/all_notes.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type AllNotesRow {
  AllNotesRow(
    category: String,
    subcategory: String,
    title: String,
    body: String,
  )
}

/// Every note the user has, in every track: the export reads this.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn all_notes(
  db: pog.Connection,
  user_id: Uuid,
) -> Result(pog.Returned(AllNotesRow), pog.QueryError) {
  let decoder = {
    use category <- decode.field(0, decode.string)
    use subcategory <- decode.field(1, decode.string)
    use title <- decode.field(2, decode.string)
    use body <- decode.field(3, decode.string)
    decode.success(AllNotesRow(category:, subcategory:, title:, body:))
  }

  "-- Every note the user has, in every track: the export reads this.
select category, subcategory, title, body
  from notes
 where user_id = $1
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(user_id)))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// An empty body deletes the row: there is no such thing as a blank note.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn delete_note(
  db: pog.Connection,
  user_id: Uuid,
  category: String,
  subcategory: String,
  title: String,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- An empty body deletes the row: there is no such thing as a blank note.
delete from notes
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

/// A row you get from running the `notes_in` query
/// defined in `./src/server/study/notes/sql/notes_in.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type NotesInRow {
  NotesInRow(category: String, subcategory: String, title: String, body: String)
}

/// One track's notes.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn notes_in(
  db: pog.Connection,
  user_id: Uuid,
  category: String,
) -> Result(pog.Returned(NotesInRow), pog.QueryError) {
  let decoder = {
    use category <- decode.field(0, decode.string)
    use subcategory <- decode.field(1, decode.string)
    use title <- decode.field(2, decode.string)
    use body <- decode.field(3, decode.string)
    decode.success(NotesInRow(category:, subcategory:, title:, body:))
  }

  "-- One track's notes.
select category, subcategory, title, body
  from notes
 where user_id = $1 and category = $2
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(user_id)))
  |> pog.parameter(pog.text(category))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// Writes one note, replacing whatever the problem had.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn save_note(
  db: pog.Connection,
  arg_1: Uuid,
  arg_2: String,
  arg_3: String,
  arg_4: String,
  arg_5: String,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Writes one note, replacing whatever the problem had.
insert into notes (user_id, category, subcategory, title, body)
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

//// The user's own notes, one per problem.
////
//// Part of the study data layer; see `server/study/model` for the shared
//// types.

import gleam/dynamic/decode
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/string
import pog
import server/study/model.{type ProblemRef, type StudyError, database_error}
import wire

/// Every one, in every track, for the export.
pub fn load_notes(
  db: pog.Connection,
  user_id: String,
) -> Result(List(#(ProblemRef, String)), StudyError) {
  load_notes_rows(db, user_id, None)
}

/// One track's. Two functions rather than an `Option` argument at the call
/// sites, so "every track" is always something a caller asked for by name.
pub fn load_notes_in(
  db: pog.Connection,
  user_id: String,
  track: String,
) -> Result(List(#(ProblemRef, String)), StudyError) {
  load_notes_rows(db, user_id, Some(track))
}

fn load_notes_rows(
  db: pog.Connection,
  user_id: String,
  track: Option(String),
) -> Result(List(#(ProblemRef, String)), StudyError) {
  pog.query(
    "select category, subcategory, title, body
       from notes
      where user_id = $1::uuid and ($2::text is null or category = $2)",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.nullable(pog.text, track))
  |> pog.returning({
    use category <- decode.field(0, decode.string)
    use subcategory <- decode.field(1, decode.string)
    use title <- decode.field(2, decode.string)
    use body <- decode.field(3, decode.string)
    decode.success(#(wire.ProblemRef(category:, subcategory:, title:), body))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

/// An empty body deletes the row: there is no such thing as a blank note.
pub fn save_note(
  db: pog.Connection,
  user_id: String,
  problem: ProblemRef,
  body: String,
) -> Result(Nil, StudyError) {
  let keyed = fn(sql) {
    pog.query(sql)
    |> pog.parameter(pog.text(user_id))
    |> pog.parameter(pog.text(problem.category))
    |> pog.parameter(pog.text(problem.subcategory))
    |> pog.parameter(pog.text(problem.title))
  }
  let query = case string.trim(body) {
    "" ->
      keyed(
        "delete from notes
          where user_id = $1::uuid and category = $2
            and subcategory = $3 and title = $4",
      )
    _ ->
      keyed(
        "insert into notes (user_id, category, subcategory, title, body)
         values ($1::uuid, $2, $3, $4, $5)
         on conflict (user_id, category, subcategory, title)
           do update set body = excluded.body, updated_at = now()",
      )
      |> pog.parameter(pog.text(body))
  }
  query
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

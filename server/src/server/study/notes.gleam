//// The user's own notes, one per problem.
////
//// Part of the study data layer; see `server/study/model` for the shared
//// types. The SQL lives in `notes/sql/*.sql`; `gleam run -m squirrel`
//// generates `notes/sql.gleam` from it, typed against the live schema.

import gleam/string
import pog
import server/study/model.{type StudyError, done, rows}
import server/study/notes/sql
import wire
import youid/uuid.{type Uuid}

/// Every one, in every track, for the export.
pub fn load_notes(
  db: pog.Connection,
  user_id: Uuid,
) -> Result(List(#(wire.ProblemRef, String)), StudyError) {
  sql.all_notes(db, user_id)
  |> rows(fn(row: sql.AllNotesRow) {
    #(wire.ProblemRef(row.category, row.subcategory, row.title), row.body)
  })
}

/// One track's. Two functions rather than an `Option` argument at the call
/// sites, so "every track" is always something a caller asked for by name.
pub fn load_notes_in(
  db: pog.Connection,
  user_id: Uuid,
  track: String,
) -> Result(List(#(wire.ProblemRef, String)), StudyError) {
  sql.notes_in(db, user_id, track)
  |> rows(fn(row: sql.NotesInRow) {
    #(wire.ProblemRef(row.category, row.subcategory, row.title), row.body)
  })
}

/// An empty body deletes the row: there is no such thing as a blank note.
pub fn save_note(
  db: pog.Connection,
  user_id: Uuid,
  problem: wire.ProblemRef,
  body: String,
) -> Result(Nil, StudyError) {
  let wire.ProblemRef(category:, subcategory:, title:) = problem
  case string.trim(body) {
    "" -> sql.delete_note(db, user_id, category, subcategory, title)
    _ -> sql.save_note(db, user_id, category, subcategory, title, body)
  }
  |> done
}

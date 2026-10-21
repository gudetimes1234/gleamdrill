//// In-progress solutions, saved per problem.
////
//// Part of the study data layer; see `server/study/model` for the shared
//// types. The SQL lives in `drafts/sql/*.sql`; `gleam run -m squirrel`
//// generates `drafts/sql.gleam` from it, typed against the live schema.

import pog
import server/study/drafts/sql
import server/study/model.{type StudyError, done, rows}
import wire
import youid/uuid.{type Uuid}

/// Every one, in every track, for the export.
pub fn load_drafts(
  db: pog.Connection,
  user_id: Uuid,
) -> Result(List(#(wire.ProblemRef, String)), StudyError) {
  sql.all_drafts(db, user_id)
  |> rows(fn(row: sql.AllDraftsRow) {
    #(wire.ProblemRef(row.category, row.subcategory, row.title), row.body)
  })
}

/// One track's. Two functions rather than an `Option` argument at the call
/// sites, so "every track" is always something a caller asked for by name.
pub fn load_drafts_in(
  db: pog.Connection,
  user_id: Uuid,
  track: String,
) -> Result(List(#(wire.ProblemRef, String)), StudyError) {
  sql.drafts_in(db, user_id, track)
  |> rows(fn(row: sql.DraftsInRow) {
    #(wire.ProblemRef(row.category, row.subcategory, row.title), row.body)
  })
}

pub fn save_draft(
  db: pog.Connection,
  user_id: Uuid,
  problem: wire.ProblemRef,
  body: String,
) -> Result(Nil, StudyError) {
  let wire.ProblemRef(category:, subcategory:, title:) = problem
  sql.save_draft(db, user_id, category, subcategory, title, body)
  |> done
}

/// Drops a draft, if there is one. Called from the review transaction and
/// from `DELETE /api/drafts` (a Blitz card that ran out of time).
pub fn delete_draft(
  db: pog.Connection,
  user_id: Uuid,
  problem: wire.ProblemRef,
) -> Result(Nil, StudyError) {
  let wire.ProblemRef(category:, subcategory:, title:) = problem
  sql.delete_draft(db, user_id, category, subcategory, title)
  |> done
}

//// In-progress solutions, saved per problem.
////
//// Part of the study data layer; see `server/study/model` for the shared
//// types.

import gleam/dynamic/decode
import gleam/option.{type Option, None, Some}
import gleam/result
import pog
import server/study/model.{type ProblemRef, type StudyError, database_error}
import wire

/// Every one, in every track, for the export.
pub fn load_drafts(
  db: pog.Connection,
  user_id: String,
) -> Result(List(#(ProblemRef, String)), StudyError) {
  load_drafts_rows(db, user_id, None)
}

/// One track's. Two functions rather than an `Option` argument at the call
/// sites, so "every track" is always something a caller asked for by name.
pub fn load_drafts_in(
  db: pog.Connection,
  user_id: String,
  track: String,
) -> Result(List(#(ProblemRef, String)), StudyError) {
  load_drafts_rows(db, user_id, Some(track))
}

fn load_drafts_rows(
  db: pog.Connection,
  user_id: String,
  track: Option(String),
) -> Result(List(#(ProblemRef, String)), StudyError) {
  pog.query(
    "select category, subcategory, title, body
       from drafts
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

pub fn save_draft(
  db: pog.Connection,
  user_id: String,
  problem: ProblemRef,
  body: String,
) -> Result(Nil, StudyError) {
  pog.query(
    "insert into drafts (user_id, category, subcategory, title, body)
     values ($1::uuid, $2, $3, $4, $5)
     on conflict (user_id, category, subcategory, title)
       do update set body = excluded.body, updated_at = now()",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(problem.category))
  |> pog.parameter(pog.text(problem.subcategory))
  |> pog.parameter(pog.text(problem.title))
  |> pog.parameter(pog.text(body))
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

/// Drops a draft, if there is one. Called from the review transaction and
/// from `DELETE /api/drafts` (a Blitz card that ran out of time).
pub fn delete_draft(
  db: pog.Connection,
  user_id: String,
  problem: ProblemRef,
) -> Result(Nil, StudyError) {
  pog.query(
    "delete from drafts
      where user_id = $1::uuid and category = $2
        and subcategory = $3 and title = $4",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(problem.category))
  |> pog.parameter(pog.text(problem.subcategory))
  |> pog.parameter(pog.text(problem.title))
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

//// Named study queues: validating, loading, replacing and merging them.
////
//// Part of the study data layer; see `server/study/model` for the shared
//// types. The SQL lives in `queues/sql/*.sql`; `gleam run -m squirrel`
//// generates `queues/sql.gleam` from it.

import gleam/bool
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/string
import pog
import server/study/model.{
  type StudyError, StudyDatabaseError, done, first, flatten_transaction_error,
  rows,
}
import server/study/queues/sql
import wire
import youid/uuid.{type Uuid}

/// Names are trimmed, short and distinct; a queue is at most a whole
/// catalogue. The same checks run whether the set arrives by PUT or in
/// an archive, so nothing unbounded reaches the table.
pub fn validate_queues(queues: List(wire.Queue)) -> Result(Nil, String) {
  let names = list.map(queues, fn(queue) { string.trim(queue.name) })
  // A name is unique within a track, not within an account: "Arrays" in the
  // Python track and "Arrays" in the Go track are two lists, and the unique
  // index says the same thing. Comparing names alone would refuse an archive
  // the database is perfectly happy to hold.
  let keys =
    list.map(queues, fn(queue) { #(queue.track, string.trim(queue.name)) })
  use <- bool.guard(
    list.length(queues) > max_queues,
    Error("at most " <> int.to_string(max_queues) <> " queues"),
  )
  use <- bool.guard(
    list.any(names, fn(name) { name == "" }),
    Error("a queue needs a name"),
  )
  use <- bool.guard(
    list.any(names, fn(name) { string.length(name) > max_queue_name }),
    Error(
      "a queue name is at most "
      <> int.to_string(max_queue_name)
      <> " characters",
    ),
  )
  use <- bool.guard(
    list.length(list.unique(keys)) != list.length(keys),
    Error("queue names must be distinct within a track"),
  )
  use <- bool.guard(
    list.any(queues, fn(queue) { list.length(queue.problems) > max_queue_items }),
    Error(
      "a queue holds at most " <> int.to_string(max_queue_items) <> " problems",
    ),
  )
  Ok(Nil)
}

const max_queues = 50

const max_queue_name = 60

const max_queue_items = 1500

/// Every queue in every track, for the export.
pub fn load_queues(
  db: pog.Connection,
  user_id: Uuid,
) -> Result(List(wire.Queue), StudyError) {
  sql.all_queues(db, user_id)
  |> rows(fn(row: sql.AllQueuesRow) {
    queue_row(row.track, row.name, row.category, row.subcategory, row.title)
  })
  |> result.map(group_queues)
}

/// One track's queues. Names are only unique within a track, so this is what
/// every screen reads; the unscoped one above is for the archive alone.
pub fn load_queues_in(
  db: pog.Connection,
  user_id: Uuid,
  track: String,
) -> Result(List(wire.Queue), StudyError) {
  sql.queues_in(db, user_id, track)
  |> rows(fn(row: sql.QueuesInRow) {
    queue_row(row.track, row.name, row.category, row.subcategory, row.title)
  })
  |> result.map(group_queues)
}

/// One row of the queue listing: its queue, and the problem the left join
/// found, if the queue has any.
fn queue_row(
  track: String,
  name: String,
  category: Option(String),
  subcategory: Option(String),
  title: Option(String),
) -> #(String, String, Option(wire.ProblemRef)) {
  let problem = case category, subcategory, title {
    Some(category), Some(subcategory), Some(title) ->
      Some(wire.ProblemRef(category:, subcategory:, title:))
    _, _, _ -> None
  }
  #(track, name, problem)
}

/// Every queue with its problems in order. One query: a left join so an
/// empty queue still comes back, chunked here afterwards.
fn group_queues(
  rows: List(#(String, String, Option(wire.ProblemRef))),
) -> List(wire.Queue) {
  rows
  // By (track, name), not name: the same name in two tracks is two lists,
  // and chunking on the name alone would fuse them.
  |> list.chunk(fn(row) { #(row.0, row.1) })
  |> list.filter_map(fn(rows) {
    case rows {
      [#(track, name, _), ..] ->
        Ok(wire.Queue(
          track:,
          name:,
          problems: list.filter_map(rows, fn(row) {
            option.to_result(row.2, Nil)
          }),
        ))
      [] -> Error(Nil)
    }
  })
}

/// The client owns one track's set and sends it whole: that track's queues
/// are replaced, in one transaction, and no other track's are touched.
pub fn replace_queues(
  db: pog.Connection,
  user_id: Uuid,
  track: String,
  queues: List(wire.Queue),
) -> Result(Nil, StudyError) {
  pog.transaction(db, fn(tx) { write_queues_in(tx, user_id, track, queues) })
  |> result.map_error(flatten_transaction_error)
}

/// Replaces **one track's** queues. The client sends that track's set whole.
///
/// The `and track = $2` on the delete is the single most dangerous character
/// in this module. Without it, a client that PUTs only the active track's set
/// -- which is what a track-aware client does -- wipes every other track's
/// queues, with no error and no log line. `track` is a required argument, not
/// an Option, so the compiler enumerates every caller.
fn write_queues_in(
  tx: pog.Connection,
  user_id: Uuid,
  track: String,
  queues: List(wire.Queue),
) -> Result(Nil, StudyError) {
  use _ <- result.try(sql.delete_queues_in(tx, user_id, track) |> done)
  insert_queues(tx, user_id, queues)
}

/// Replaces **every** track's queues, for a restore: an archive is the whole
/// account, so the unscoped delete is right there and wrong anywhere else.
pub fn write_all_queues(
  tx: pog.Connection,
  user_id: Uuid,
  queues: List(wire.Queue),
) -> Result(Nil, StudyError) {
  use _ <- result.try(sql.delete_all_queues(tx, user_id) |> done)
  insert_queues(tx, user_id, queues)
}

fn insert_queues(
  tx: pog.Connection,
  user_id: Uuid,
  queues: List(wire.Queue),
) -> Result(Nil, StudyError) {
  queues
  |> list.index_map(fn(queue, position) { #(queue, position) })
  |> list.try_each(fn(entry) {
    let #(queue, position) = entry
    use id <- result.try(
      sql.insert_queue(
        tx,
        user_id,
        string.trim(queue.name),
        position,
        queue.track,
      )
      |> first(fn(row: sql.InsertQueueRow) { row.id }),
    )
    case id, queue.problems {
      _, [] -> Ok(Nil)
      Some(id), problems ->
        sql.insert_queue_items(
          tx,
          id,
          list.map(problems, fn(ref) { ref.category }),
          list.map(problems, fn(ref) { ref.subcategory }),
          list.map(problems, fn(ref) { ref.title }),
        )
        |> done
      None, _ -> Error(StudyDatabaseError("queue insert returned no id"))
    }
  })
}

/// Folds a guest's queues into an account's: a queue with the same name
/// gains the problems it lacks, a new name is appended. Nothing is lost on
/// either side, so an upgrade or an import retried is harmless.
pub fn merge_queues(
  db: pog.Connection,
  user_id: Uuid,
  default_track: String,
  incoming: List(wire.Queue),
) -> Result(Nil, StudyError) {
  use existing <- result.try(load_queues(db, user_id))
  let merged = merge(existing, default_track, incoming)
  // An upgrade hands over every track at once, so this writes the lot.
  case merged == existing {
    True -> Ok(Nil)
    False -> write_all_queues(db, user_id, merged)
  }
}

/// The fold itself, pure: what the account's queues become once the
/// incoming set lands on them.
pub fn merge(
  existing: List(wire.Queue),
  default_track: String,
  incoming: List(wire.Queue),
) -> List(wire.Queue) {
  // A queue coming from before tracks names none, and an *empty* one has no
  // first problem to infer it from either. Attributing it to the account's
  // busiest track beats leaving it in "", which no track matches -- an
  // upgrade that quietly drops an empty list is still dropping a list.
  //
  // Names are trimmed here as well as on insert: compared raw, "Arrays " and
  // an existing "Arrays" would stay two queues and then collide on the
  // unique index once both were written trimmed.
  let incoming =
    list.map(incoming, fn(queue: wire.Queue) {
      let queue = wire.Queue(..queue, name: string.trim(queue.name))
      case queue.track {
        "" -> wire.Queue(..queue, track: default_track)
        _ -> queue
      }
    })
  let same = fn(a: wire.Queue, b: wire.Queue) {
    a.track == b.track && a.name == b.name
  }
  list.fold(incoming, existing, fn(queues, queue) {
    case list.any(queues, same(_, queue)) {
      True ->
        list.map(queues, fn(q) {
          case same(q, queue) {
            True ->
              wire.Queue(
                ..q,
                problems: list.append(
                  q.problems,
                  list.filter(queue.problems, fn(ref) {
                    !list.contains(q.problems, ref)
                  }),
                ),
              )
            False -> q
          }
        })
      False -> list.append(queues, [queue])
    }
  })
}

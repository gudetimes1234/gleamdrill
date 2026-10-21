//// Which track a request is about.
////
//// Every track-scoped endpoint resolves its track through here rather than
//// reading the query parameter raw. A bare "" would match no category at
//// all, so an un-upgraded client asking for its stats would get zeros rather
//// than its stats -- silently, which is the worst way to be wrong.

import gleam/dynamic/decode
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import pog
import server/db
import server/study/model.{type StudyError, database_error}
import wire
import youid/uuid.{type Uuid}

/// The track a request names, or the one the user has most cards in.
///
/// Defaulting rather than refusing is what keeps a client from before tracks
/// working: it sends no `?track=` and gets a coherent single-track view
/// instead of a 422.
pub fn pick(
  requested: Option(String),
  standings: List(wire.TrackStanding),
) -> String {
  case requested {
    Some(track) -> track
    None ->
      standings
      |> list.sort(fn(a: wire.TrackStanding, b: wire.TrackStanding) {
        int.compare(b.cards, a.cards)
      })
      |> list.first
      |> result.map(fn(standing: wire.TrackStanding) { standing.track })
      |> result.unwrap("")
  }
}

/// The one track a batch of problems is in, or `Error` when it spans more
/// than one. Same rule as `one_track`, on the other key.
pub fn batch_track(problems: List(wire.ProblemRef)) -> Result(String, Nil) {
  case
    list.unique(list.map(problems, fn(ref: wire.ProblemRef) { ref.category }))
  {
    [track] -> Ok(track)
    _ -> Error(Nil)
  }
}

/// The one track a batch is in, or `Error` when it spans more than one.
///
/// A request that touches two tracks cannot be answered honestly: the reply
/// carries one `Today`, and there is no such thing as a daily budget across
/// two tracks. Refusing is cheaper than picking one and being wrong.
pub fn one_track(queues: List(wire.Queue)) -> Result(String, Nil) {
  case list.unique(list.map(queues, fn(queue: wire.Queue) { queue.track })) {
    [track] -> Ok(track)
    // Empty: the caller has to say which track it is clearing.
    [] -> Error(Nil)
    _ -> Error(Nil)
  }
}

/// The track a request names, or the user's default when it names none.
pub fn resolve(
  db: pog.Connection,
  user_id: Uuid,
  requested: Option(String),
) -> Result(String, StudyError) {
  case requested {
    Some(track) -> Ok(track)
    None -> default(db, user_id)
  }
}

/// The track a user has most cards in, ties broken by name; the empty string
/// when they have none.
///
/// What a request that names no track means. Defaulting rather than refusing
/// is what keeps a client from before tracks working: it sends no `?track=`
/// and gets a coherent single-track view instead of an empty one.
pub fn default(
  db: pog.Connection,
  user_id: Uuid,
) -> Result(String, StudyError) {
  pog.query(
    "select category from cards
      where user_id = $1::uuid
      group by category
      order by count(*) desc, category
      limit 1",
  )
  |> pog.parameter(db.uuid(user_id))
  |> pog.returning(decode.at([0], decode.string))
  |> pog.execute(db)
  |> result.map_error(database_error)
  |> result.map(fn(returned) { list.first(returned.rows) |> result.unwrap("") })
}

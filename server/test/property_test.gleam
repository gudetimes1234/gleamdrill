//// Property tests for the server's pure rules: what any input must satisfy,
//// not just the examples in server_test. qcheck generates the inputs and
//// shrinks a failure down to the smallest one that breaks.

import fsrs
import gleam/list
import gleam/option.{None}
import gleam/order
import gleam/string
import gleam/time/duration
import gleam/time/timestamp
import qcheck
import server/study/model
import server/study/queues
import server/study/reviews
import wire
import youid/uuid

fn pick(options: List(a)) -> qcheck.Generator(a) {
  let assert [first, ..rest] = list.map(options, qcheck.constant)
  qcheck.from_generators(first, rest)
}

fn problem() -> qcheck.Generator(wire.ProblemRef) {
  use title <- qcheck.map(pick(["Two Sum", "Valid Anagram", "Top K", "LRU"]))
  wire.ProblemRef("NeetCode 150", "Arrays & Hashing", title)
}

/// A queue as a client might send it: a name that may carry stray spaces,
/// and maybe no track (one saved before tracks existed).
fn incoming_queue() -> qcheck.Generator(wire.Queue) {
  use track <- qcheck.bind(pick(["", "py", "go"]))
  use name <- qcheck.bind(pick(["Arrays", "Arrays ", " Arrays", "Graphs"]))
  use problems <- qcheck.map(qcheck.list_from(problem()))
  wire.Queue(track:, name:, problems:)
}

/// Queues as the database holds them: trimmed, one per name in a track.
fn stored_queues() -> qcheck.Generator(List(wire.Queue)) {
  use queues <- qcheck.map(qcheck.list_from(incoming_queue()))
  queues
  |> list.map(fn(queue) {
    wire.Queue(..queue, name: string.trim(queue.name), track: case queue.track {
      "" -> "py"
      track -> track
    })
  })
  |> list.unique
  |> list.fold([], fn(kept, queue: wire.Queue) {
    case list.any(kept, fn(k: wire.Queue) { key(k) == key(queue) }) {
      True -> kept
      False -> list.append(kept, [queue])
    }
  })
}

fn key(queue: wire.Queue) -> #(String, String) {
  #(queue.track, queue.name)
}

/// Handing the same queues over twice (a retried upgrade) changes nothing
/// the second time.
pub fn merge_is_idempotent_test() {
  use #(existing, incoming) <- qcheck.given(qcheck.tuple2(
    stored_queues(),
    qcheck.list_from(incoming_queue()),
  ))
  let once = queues.merge(existing, "py", incoming)
  assert queues.merge(once, "py", incoming) == once
}

/// A merge only adds: every stored queue and every problem in it survives,
/// and the result never holds two queues the unique index would refuse.
pub fn merge_keeps_everything_and_stays_unique_test() {
  use #(existing, incoming) <- qcheck.given(qcheck.tuple2(
    stored_queues(),
    qcheck.list_from(incoming_queue()),
  ))
  let merged = queues.merge(existing, "py", incoming)
  list.each(existing, fn(queue) {
    let assert Ok(kept) = list.find(merged, fn(m) { key(m) == key(queue) })
    assert list.all(queue.problems, list.contains(kept.problems, _))
  })
  let keys = list.map(merged, key)
  assert list.length(list.unique(keys)) == list.length(keys)
  assert list.all(merged, fn(queue) {
    queue.name == string.trim(queue.name) && queue.track != ""
  })
}

/// Whatever the queues hold, validation refuses a blank name and two names
/// in one track that only differ by surrounding spaces.
pub fn validate_refuses_blank_and_duplicate_names_test() {
  use queues <- qcheck.given(qcheck.list_from(incoming_queue()))
  let blank = wire.Queue(track: "py", name: "  ", problems: [])
  assert queues.validate_queues([blank, ..queues]) != Ok(Nil)
  let twin = wire.Queue(track: "py", name: "Twin", problems: [])
  let spaced = wire.Queue(..twin, name: " Twin ")
  assert queues.validate_queues([twin, spaced]) != Ok(Nil)
}

fn rating() -> qcheck.Generator(fsrs.Rating) {
  pick([fsrs.Again, fsrs.Hard, fsrs.Good, fsrs.Easy])
}

/// Over any run of answers, each one counts a rep, schedules no earlier than
/// the moment it was given, and costs a lapse exactly when a graduated card
/// is forgotten.
pub fn schedule_counts_reps_and_lapses_test() {
  use answers <- qcheck.given(
    qcheck.list_from(qcheck.tuple2(rating(), qcheck.bounded_int(0, 30 * 86_400))),
  )
  let assert Ok(id) = uuid.from_string("00000000-0000-0000-0000-000000000000")
  let start = timestamp.from_unix_seconds(1_800_000_000)
  let first =
    model.CardRecord(
      id:,
      problem: wire.ProblemRef("NeetCode 150", "Arrays & Hashing", "Two Sum"),
      card: fsrs.new_card(start),
      reps: 0,
      lapses: 0,
      suspended: False,
      introduced_at: None,
    )
  list.fold(answers, #(first, start), fn(acc, answer) {
    let #(before, now) = acc
    let #(rating, gap) = answer
    let now = timestamp.add(now, duration.seconds(gap))
    let #(after, elapsed, _) =
      reviews.schedule(before, rating, now, fsrs.default_config(), 0.5)
    assert after.reps == before.reps + 1
    assert after.lapses
      == case rating, before.card.state {
        fsrs.Again, fsrs.Review -> before.lapses + 1
        _, _ -> before.lapses
      }
    assert timestamp.compare(after.card.due, now) != order.Lt
    assert elapsed >= 0
    #(after, now)
  })
  Nil
}

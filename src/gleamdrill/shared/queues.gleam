//// Edits to the named queues, as pure functions over the list. Whichever
//// screen makes the edit, the result goes up as one `QueuesEdited` change
//// and is saved whole.

import gleam/list
import gleamdrill/content/problem.{type ProblemRef}
import wire

/// Appends what the queue lacks, in the order given.
pub fn add_to(
  queues: List(wire.Queue),
  name: String,
  refs: List(ProblemRef),
) -> List(wire.Queue) {
  use queue <- list.map(queues)
  case queue.name == name {
    True ->
      wire.Queue(
        ..queue,
        problems: list.append(
          queue.problems,
          list.filter(list.unique(refs), fn(ref) {
            !list.contains(queue.problems, ref)
          }),
        ),
      )
    False -> queue
  }
}

pub fn remove_from(
  queues: List(wire.Queue),
  name: String,
  refs: List(ProblemRef),
) -> List(wire.Queue) {
  use queue <- list.map(queues)
  case queue.name == name {
    True ->
      wire.Queue(
        ..queue,
        problems: list.filter(queue.problems, fn(ref) {
          !list.contains(refs, ref)
        }),
      )
    False -> queue
  }
}

/// A new, empty queue in `track`. A queue belongs to one track, and ""
/// belongs to none -- it would vanish from the screen that created it the
/// moment anything reloaded.
pub fn create(
  queues: List(wire.Queue),
  track: String,
  name: String,
) -> List(wire.Queue) {
  list.append(queues, [wire.Queue(track:, name:, problems: [])])
}

pub fn rename(
  queues: List(wire.Queue),
  from: String,
  to: String,
) -> List(wire.Queue) {
  use queue <- list.map(queues)
  case queue.name == from {
    True -> wire.Queue(..queue, name: to)
    False -> queue
  }
}

pub fn delete(queues: List(wire.Queue), name: String) -> List(wire.Queue) {
  list.filter(queues, fn(queue) { queue.name != name })
}

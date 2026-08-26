import gleam/list
import gleam/result

/// The list arrives as its links rather than its values: `next` holds, for each
/// node, the index of the one after it, or -1 for the end. A cons list cannot
/// point back at itself, so this is how a cycle is expressed at all in a
/// language without mutable references.
pub fn has_cycle(next: List(Int)) -> Bool {
  case next {
    [] -> False
    _ -> chase(next, 0, 0)
  }
}

// Floyd's tortoise and hare. One walker takes single steps, the other double;
// if there is a loop the fast one is going around it and gains one place per
// step on the slow one, so it must eventually land on it. If there is no loop
// the fast one runs off the end first. No memory of where either has been.
fn chase(next: List(Int), slow: Int, fast: Int) -> Bool {
  case step(next, fast) {
    -1 -> False
    once ->
      case step(next, once) {
        -1 -> False
        twice -> {
          let slow = step(next, slow)
          case slow == twice {
            True -> True
            False -> chase(next, slow, twice)
          }
        }
      }
  }
}

fn step(next: List(Int), from: Int) -> Int {
  case from < 0 {
    True -> -1
    False -> result.unwrap(list.first(list.drop(next, from)), -1)
  }
}

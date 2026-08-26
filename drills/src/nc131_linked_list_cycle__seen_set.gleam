import gleam/list
import gleam/result
import gleam/set.{type Set}

pub fn has_cycle(next: List(Int)) -> Bool {
  case next {
    [] -> False
    _ -> walk(next, 0, set.new())
  }
}

// Remember every node visited and stop when one repeats. Obvious, correct, and
// O(n) memory — which is the whole cost the two-walker version removes. Worth
// writing once so that "constant space" means something specific afterwards.
fn walk(next: List(Int), at: Int, seen: Set(Int)) -> Bool {
  case at < 0 {
    True -> False
    False ->
      case set.contains(seen, at) {
        True -> True
        False ->
          walk(
            next,
            result.unwrap(list.first(list.drop(next, at)), -1),
            set.insert(seen, at),
          )
      }
  }
}

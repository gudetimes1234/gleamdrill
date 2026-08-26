import gleam/list

pub fn jump(nums: List(Int)) -> Int {
  let n = list.length(nums)
  case n <= 1 {
    True -> 0
    False -> {
      let indexed = list.index_map(nums, fn(jump, i) { #(i, jump) })
      walk(indexed, n - 1, 0)
    }
  }
}

/// From the goal, step back to the *earliest* index that can reach it: taking
/// the earliest can never cost more jumps, and it is the only choice that is
/// obviously safe. O(n\u{b2}), and it makes the greedy argument visible.
fn walk(indexed: List(#(Int, Int)), goal: Int, jumps: Int) -> Int {
  case goal == 0 {
    True -> jumps
    False ->
      case list.find(indexed, fn(cell) { cell.0 + cell.1 >= goal }) {
        Ok(#(index, _)) -> walk(indexed, index, jumps + 1)
        Error(Nil) -> jumps
      }
  }
}

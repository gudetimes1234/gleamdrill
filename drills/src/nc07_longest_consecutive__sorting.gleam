import gleam/int
import gleam/list

/// No set: sort, then walk once counting runs. O(n log n) rather than O(n), but
/// it needs no extra structure and the run logic is easier to hold in your head.
pub fn longest_consecutive(nums: List(Int)) -> Int {
  case list.sort(nums, int.compare) {
    [] -> 0
    [first, ..rest] -> scan(rest, first, 1, 1)
  }
}

fn scan(nums: List(Int), previous: Int, run: Int, best: Int) -> Int {
  case nums {
    [] -> best
    [n, ..rest] ->
      case n - previous {
        // Duplicates neither extend nor break a run.
        0 -> scan(rest, previous, run, best)
        1 -> scan(rest, n, run + 1, int.max(best, run + 1))
        _ -> scan(rest, n, 1, best)
      }
  }
}

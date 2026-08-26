import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "remove_nth_from_end([1, 2, 3, 4, 5], 2)",
      string.inspect([1, 2, 3, 5]),
      string.inspect(solution.remove_nth_from_end([1, 2, 3, 4, 5], 2)),
    ),
    #(
      "remove_nth_from_end([1], 1)",
      string.inspect([]),
      string.inspect(solution.remove_nth_from_end([1], 1)),
    ),
    #(
      "remove_nth_from_end([1, 2], 1)",
      string.inspect([1]),
      string.inspect(solution.remove_nth_from_end([1, 2], 1)),
    ),
    #(
      "remove_nth_from_end([1, 2], 2) — the head goes",
      string.inspect([2]),
      string.inspect(solution.remove_nth_from_end([1, 2], 2)),
    ),
    #(
      "remove_nth_from_end([1, 2, 3], 5) — nothing to remove",
      string.inspect([1, 2, 3]),
      string.inspect(solution.remove_nth_from_end([1, 2, 3], 5)),
    ),
  ]
}

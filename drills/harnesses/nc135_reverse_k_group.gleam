import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "reverse_k_group([1, 2, 3, 4, 5], 2)",
      string.inspect([2, 1, 4, 3, 5]),
      string.inspect(solution.reverse_k_group([1, 2, 3, 4, 5], 2)),
    ),
    #(
      "reverse_k_group([1, 2, 3, 4, 5], 3)",
      string.inspect([3, 2, 1, 4, 5]),
      string.inspect(solution.reverse_k_group([1, 2, 3, 4, 5], 3)),
    ),
    #(
      "reverse_k_group([1, 2, 3, 4], 4)",
      string.inspect([4, 3, 2, 1]),
      string.inspect(solution.reverse_k_group([1, 2, 3, 4], 4)),
    ),
    #(
      "reverse_k_group([1, 2, 3], 1) — nothing changes",
      string.inspect([1, 2, 3]),
      string.inspect(solution.reverse_k_group([1, 2, 3], 1)),
    ),
    #(
      "reverse_k_group([1, 2], 5) — the group never fills",
      string.inspect([1, 2]),
      string.inspect(solution.reverse_k_group([1, 2], 5)),
    ),
    #(
      "reverse_k_group([], 2)",
      string.inspect([]),
      string.inspect(solution.reverse_k_group([], 2)),
    ),
  ]
}

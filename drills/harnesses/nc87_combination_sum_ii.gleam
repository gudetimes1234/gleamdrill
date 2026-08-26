import gleam/int
import gleam/list
import gleam/string
import solution

fn sorted(candidates: List(Int), target: Int) -> List(String) {
  solution.combination_sum2(candidates, target)
  |> list.map(fn(combination) {
    combination
    |> list.sort(int.compare)
    |> list.map(int.to_string)
    |> string.join(",")
  })
  |> list.sort(string.compare)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "combination_sum2([10, 1, 2, 7, 6, 1, 5], 8)",
      string.inspect(["1,1,6", "1,2,5", "1,7", "2,6"]),
      string.inspect(sorted([10, 1, 2, 7, 6, 1, 5], 8)),
    ),
    #(
      "combination_sum2([2, 5, 2, 1, 2], 5)",
      string.inspect(["1,2,2", "5"]),
      string.inspect(sorted([2, 5, 2, 1, 2], 5)),
    ),
    #(
      "combination_sum2([], 3)",
      string.inspect([]),
      string.inspect(sorted([], 3)),
    ),
    #(
      "combination_sum2([1], 1)",
      string.inspect(["1"]),
      string.inspect(sorted([1], 1)),
    ),
    #(
      "combination_sum2([2], 1)",
      string.inspect([]),
      string.inspect(sorted([2], 1)),
    ),
  ]
}

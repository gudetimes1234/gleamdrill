import gleam/int
import gleam/list
import gleam/string
import solution

fn sorted(candidates: List(Int), target: Int) -> List(String) {
  solution.combination_sum(candidates, target)
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
      "combination_sum([2, 3, 6, 7], 7)",
      string.inspect(["2,2,3", "7"]),
      string.inspect(sorted([2, 3, 6, 7], 7)),
    ),
    #(
      "combination_sum([2, 3, 5], 8)",
      string.inspect(["2,2,2,2", "2,3,3", "3,5"]),
      string.inspect(sorted([2, 3, 5], 8)),
    ),
    #(
      "combination_sum([2], 1)",
      string.inspect([]),
      string.inspect(sorted([2], 1)),
    ),
    #(
      "combination_sum([1], 0)",
      string.inspect([""]),
      string.inspect(sorted([1], 0)),
    ),
    #(
      "combination_sum([], 3)",
      string.inspect([]),
      string.inspect(sorted([], 3)),
    ),
  ]
}

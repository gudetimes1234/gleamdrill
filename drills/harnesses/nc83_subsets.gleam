import gleam/int
import gleam/list
import gleam/string
import solution

/// Any order is acceptable, and so is the order within each subset, so both
/// levels are sorted before comparing.
fn sorted(nums: List(Int)) -> List(String) {
  solution.subsets(nums)
  |> list.map(fn(subset) {
    subset
    |> list.sort(int.compare)
    |> list.map(int.to_string)
    |> string.join(",")
  })
  |> list.sort(string.compare)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "subsets([1, 2, 3])",
      string.inspect(["", "1", "1,2", "1,2,3", "1,3", "2", "2,3", "3"]),
      string.inspect(sorted([1, 2, 3])),
    ),
    #("subsets([0])", string.inspect(["", "0"]), string.inspect(sorted([0]))),
    #("subsets([])", string.inspect([""]), string.inspect(sorted([]))),
    #(
      "subsets([1, 2]) count",
      string.inspect(4),
      string.inspect(list.length(sorted([1, 2]))),
    ),
    #(
      "subsets of five elements count",
      string.inspect(32),
      string.inspect(list.length(sorted([1, 2, 3, 4, 5]))),
    ),
  ]
}

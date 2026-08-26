import gleam/int
import gleam/list
import gleam/string
import solution

/// The outer order is free but the order *within* each permutation is the
/// answer, so only the outer list is sorted.
fn sorted(nums: List(Int)) -> List(String) {
  solution.permute(nums)
  |> list.map(fn(permutation) {
    permutation
    |> list.map(int.to_string)
    |> string.join(",")
  })
  |> list.sort(string.compare)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "permute([1, 2, 3])",
      string.inspect(["1,2,3", "1,3,2", "2,1,3", "2,3,1", "3,1,2", "3,2,1"]),
      string.inspect(sorted([1, 2, 3])),
    ),
    #(
      "permute([0, 1])",
      string.inspect(["0,1", "1,0"]),
      string.inspect(sorted([0, 1])),
    ),
    #("permute([1])", string.inspect(["1"]), string.inspect(sorted([1]))),
    #("permute([])", string.inspect([""]), string.inspect(sorted([]))),
    #(
      "permute of four elements count",
      string.inspect(24),
      string.inspect(list.length(sorted([1, 2, 3, 4]))),
    ),
  ]
}

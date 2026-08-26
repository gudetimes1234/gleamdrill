import gleam/int
import gleam/list
import gleam/string
import solution

fn sorted(nums: List(Int)) -> List(String) {
  solution.subsets_with_dup(nums)
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
      "subsets_with_dup([1, 2, 2])",
      string.inspect(["", "1", "1,2", "1,2,2", "2", "2,2"]),
      string.inspect(sorted([1, 2, 2])),
    ),
    #(
      "subsets_with_dup([0])",
      string.inspect(["", "0"]),
      string.inspect(sorted([0])),
    ),
    #("subsets_with_dup([])", string.inspect([""]), string.inspect(sorted([]))),
    #(
      "subsets_with_dup([1, 1, 1])",
      string.inspect(["", "1", "1,1", "1,1,1"]),
      string.inspect(sorted([1, 1, 1])),
    ),
    #(
      "subsets_with_dup([4, 4, 4, 1, 4]) count",
      string.inspect(10),
      string.inspect(list.length(sorted([4, 4, 4, 1, 4]))),
    ),
  ]
}

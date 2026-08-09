import gleam/int
import gleam/list

pub fn contains_duplicate(nums: List(Int)) -> Bool {
  nums
  |> list.sort(int.compare)
  |> has_adjacent_pair
}

fn has_adjacent_pair(sorted: List(Int)) -> Bool {
  case sorted {
    [a, b, ..] if a == b -> True
    [_, ..rest] -> has_adjacent_pair(rest)
    [] -> False
  }
}

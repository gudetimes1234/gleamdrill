import gleam/int
import gleam/list
import gleam/set

pub fn longest_consecutive(nums: List(Int)) -> Int {
  let all = set.from_list(nums)
  all
  |> set.to_list
  |> list.fold(0, fn(best, n) {
    case set.contains(all, n - 1) {
      True -> best
      False -> int.max(best, run_length(all, n, 0))
    }
  })
}

fn run_length(all: set.Set(Int), n: Int, count: Int) -> Int {
  case set.contains(all, n) {
    True -> run_length(all, n + 1, count + 1)
    False -> count
  }
}

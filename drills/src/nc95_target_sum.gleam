import gleam/dict.{type Dict}
import gleam/list
import gleam/result

pub fn find_target_sum_ways(nums: List(Int), target: Int) -> Int {
  // The state that matters is only the running total, not which signs produced
  // it \u{2014} so carry a map from reachable total to how many ways reach it, and
  // widen it by each number twice, once added and once subtracted. Different
  // sign choices landing on the same total merge, which is what stops the
  // count being exponential in work.
  nums
  |> list.fold(dict.from_list([#(0, 1)]), fn(totals, n) {
    dict.fold(totals, dict.new(), fn(next, total, count) {
      next
      |> bump(total + n, count)
      |> bump(total - n, count)
    })
  })
  |> at(target)
}

fn bump(totals: Dict(Int, Int), total: Int, by: Int) -> Dict(Int, Int) {
  dict.insert(totals, total, at(totals, total) + by)
}

fn at(totals: Dict(Int, Int), total: Int) -> Int {
  result.unwrap(dict.get(totals, total), 0)
}

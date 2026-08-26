import gleam/dict.{type Dict}
import gleam/int
import gleam/list

pub fn rob(nums: List(Int)) -> Int {
  let houses = list.index_map(nums, fn(value, i) { #(i, value) })
  let #(best, _) = from(0, list.length(nums), houses, dict.new())
  best
}

/// The same choice written as a recursion from the front: rob this house and
/// skip the next, or skip this one. Exponential without the cache and linear
/// with it \u{2014} which is the lesson, since the rolling pair hides that the
/// problem ever had a tree of choices at all.
fn from(
  index: Int,
  count: Int,
  houses: List(#(Int, Int)),
  memo: Dict(Int, Int),
) -> #(Int, Dict(Int, Int)) {
  case index >= count {
    True -> #(0, memo)
    False ->
      case dict.get(memo, index) {
        Ok(cached) -> #(cached, memo)
        Error(Nil) -> {
          let value = at(houses, index)
          let #(taken, memo) = from(index + 2, count, houses, memo)
          let #(skipped, memo) = from(index + 1, count, houses, memo)
          let best = int.max(value + taken, skipped)
          #(best, dict.insert(memo, index, best))
        }
      }
  }
}

fn at(houses: List(#(Int, Int)), index: Int) -> Int {
  case list.find(houses, fn(house) { house.0 == index }) {
    Ok(#(_, value)) -> value
    Error(Nil) -> 0
  }
}

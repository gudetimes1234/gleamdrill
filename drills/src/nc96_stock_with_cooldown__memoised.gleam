import gleam/dict.{type Dict}
import gleam/int
import gleam/list
import gleam/result

pub fn max_profit(prices: List(Int)) -> Int {
  let lookup = prices |> list.index_map(fn(p, i) { #(i, p) }) |> dict.from_list
  let #(best, _) = from(0, list.length(prices), False, lookup, dict.new())
  best
}

/// The same three states as an explicit choice at each day: buy, sell, or do
/// nothing. After selling the recursion skips a day, which is the cooldown
/// stated where it happens rather than encoded in which value is read.
fn from(
  day: Int,
  n: Int,
  holding: Bool,
  prices: Dict(Int, Int),
  memo: Dict(#(Int, Bool), Int),
) -> #(Int, Dict(#(Int, Bool), Int)) {
  case day >= n {
    True -> #(0, memo)
    False ->
      case dict.get(memo, #(day, holding)) {
        Ok(cached) -> #(cached, memo)
        Error(Nil) -> {
          let price = result.unwrap(dict.get(prices, day), 0)
          let #(waiting, memo) = from(day + 1, n, holding, prices, memo)
          let #(acting, memo) = case holding {
            True -> {
              let #(after, memo) = from(day + 2, n, False, prices, memo)
              #(price + after, memo)
            }
            False -> {
              let #(after, memo) = from(day + 1, n, True, prices, memo)
              #(after - price, memo)
            }
          }
          let best = int.max(waiting, acting)
          #(best, dict.insert(memo, #(day, holding), best))
        }
      }
  }
}

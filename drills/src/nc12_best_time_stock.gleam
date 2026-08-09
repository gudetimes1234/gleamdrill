import gleam/int
import gleam/list

pub fn max_profit(prices: List(Int)) -> Int {
  case prices {
    [] -> 0
    [first, ..rest] -> {
      let #(_, best) =
        list.fold(rest, #(first, 0), fn(acc, price) {
          let #(min_price, best) = acc
          #(int.min(min_price, price), int.max(best, price - min_price))
        })
      best
    }
  }
}

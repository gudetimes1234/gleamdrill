import gleam/int
import gleam/list

pub fn max_profit(prices: List(Int)) -> Int {
  case prices {
    [] -> 0
    [buy, ..later] -> int.max(best_sale(buy, later), max_profit(later))
  }
}

fn best_sale(buy: Int, later: List(Int)) -> Int {
  list.fold(later, 0, fn(best, sell) { int.max(best, sell - buy) })
}

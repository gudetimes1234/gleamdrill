import gleam/dict.{type Dict}
import gleam/list

pub fn change(amount: Int, coins: List(Int)) -> Int {
  let usable = list.filter(coins, fn(coin) { coin > 0 })
  let #(ways, _) = from(usable, amount, dict.new())
  ways
}

/// The same "combinations not permutations" rule stated as a choice instead of
/// a loop order: either use this coin again, or set it aside for good. Setting
/// it aside permanently is what fixes one order per combination.
fn from(
  coins: List(Int),
  amount: Int,
  memo: Dict(#(Int, Int), Int),
) -> #(Int, Dict(#(Int, Int), Int)) {
  case amount, coins {
    0, _ -> #(1, memo)
    _, [] -> #(0, memo)
    _, [coin, ..rest] -> {
      let key = #(amount, list.length(coins))
      case dict.get(memo, key) {
        Ok(cached) -> #(cached, memo)
        Error(Nil) -> {
          let #(using, memo) = case coin > amount {
            True -> #(0, memo)
            False -> from(coins, amount - coin, memo)
          }
          let #(skipping, memo) = from(rest, amount, memo)
          #(using + skipping, dict.insert(memo, key, using + skipping))
        }
      }
    }
  }
}

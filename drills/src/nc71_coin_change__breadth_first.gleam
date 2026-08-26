import gleam/list
import gleam/set.{type Set}

pub fn coin_change(coins: List(Int), amount: Int) -> Int {
  case amount {
    0 -> 0
    _ -> walk(coins, amount, [0], set.from_list([0]), 0)
  }
}

/// The amounts reachable with k coins form one level of a breadth-first search
/// from zero, so the first level that contains the target is the answer. Same
/// bound as the table, but it stops the moment it arrives rather than filling
/// in every amount below the target.
fn walk(
  coins: List(Int),
  amount: Int,
  frontier: List(Int),
  seen: Set(Int),
  used: Int,
) -> Int {
  case frontier {
    [] -> -1
    _ -> {
      let next =
        frontier
        |> list.flat_map(fn(total) {
          list.map(coins, fn(coin) { total + coin })
        })
        |> list.filter(fn(total) {
          total <= amount && !set.contains(seen, total)
        })
        |> list.unique

      case list.contains(next, amount) {
        True -> used + 1
        False ->
          walk(coins, amount, next, list.fold(next, seen, set.insert), used + 1)
      }
    }
  }
}

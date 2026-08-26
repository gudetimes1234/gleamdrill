import gleam/dict
import gleam/int
import gleam/list
import gleam/result

pub fn coin_change(coins: List(Int), amount: Int) -> Int {
  // Build up from zero: the cheapest way to make a target is one coin more
  // than the cheapest way to make what is left after removing some coin. An
  // amount with no entry is simply unreachable, which saves inventing a
  // sentinel for infinity.
  let table =
    list.fold(targets(amount), dict.from_list([#(0, 0)]), fn(acc, target) {
      let best =
        coins
        |> list.filter_map(fn(coin) {
          case coin <= target {
            True -> dict.get(acc, target - coin)
            False -> Error(Nil)
          }
        })
        |> list.reduce(int.min)

      case best {
        Ok(fewest) -> dict.insert(acc, target, fewest + 1)
        Error(Nil) -> acc
      }
    })

  result.unwrap(dict.get(table, amount), -1)
}

fn targets(amount: Int) -> List(Int) {
  list.index_map(list.repeat(Nil, amount), fn(_, i) { i + 1 })
}

import gleam/dict
import gleam/list
import gleam/result

pub fn change(amount: Int, coins: List(Int)) -> Int {
  // Combinations, not permutations \u{2014} which is entirely decided by the loop
  // order. Coins on the outside means each coin is considered once and for all
  // before the next is looked at, so 1+2 and 2+1 can never both be counted.
  // Swapping the loops would count orderings instead.
  coins
  |> list.filter(fn(coin) { coin > 0 })
  |> list.fold(dict.from_list([#(0, 1)]), fn(ways, coin) {
    list.fold(targets(coin, amount), ways, fn(ways, target) {
      dict.insert(ways, target, at(ways, target) + at(ways, target - coin))
    })
  })
  |> at(amount)
}

fn targets(from: Int, to: Int) -> List(Int) {
  case to < from {
    True -> []
    False ->
      list.index_map(list.repeat(Nil, to - from + 1), fn(_, i) { from + i })
  }
}

fn at(ways: dict.Dict(Int, Int), target: Int) -> Int {
  result.unwrap(dict.get(ways, target), 0)
}

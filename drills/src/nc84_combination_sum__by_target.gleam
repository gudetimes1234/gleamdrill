import gleam/dict.{type Dict}
import gleam/int
import gleam/list
import gleam/result

pub fn combination_sum(candidates: List(Int), target: Int) -> List(List(Int)) {
  let usable =
    candidates
    |> list.filter(fn(candidate) { candidate > 0 })
    |> list.sort(int.compare)

  // Bottom-up instead of by recursion: the combinations making a target are
  // every combination making a smaller amount with one more candidate added.
  // Requiring each added candidate to be no smaller than the combination's
  // largest is what keeps one combination from appearing in several orders.
  let table =
    list.fold(amounts(target), dict.from_list([#(0, [[]])]), fn(acc, amount) {
      let found =
        list.flat_map(usable, fn(candidate) {
          case candidate > amount {
            True -> []
            False ->
              at(acc, amount - candidate)
              |> list.filter(fn(combination) {
                case combination {
                  [] -> True
                  [largest, ..] -> candidate >= largest
                }
              })
              |> list.map(fn(combination) { [candidate, ..combination] })
          }
        })
      dict.insert(acc, amount, found)
    })

  at(table, target)
}

fn amounts(target: Int) -> List(Int) {
  list.index_map(list.repeat(Nil, target), fn(_, i) { i + 1 })
}

fn at(table: Dict(Int, List(List(Int))), amount: Int) -> List(List(Int)) {
  result.unwrap(dict.get(table, amount), [])
}

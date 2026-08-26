import gleam/list

pub fn can_complete_circuit(gas: List(Int), cost: List(Int)) -> Int {
  case gas {
    [] -> -1
    _ -> {
      // Two facts do all the work. If the total gas is short of the total cost
      // no start works at all; and if the tank runs dry between i and j, no
      // station in between can start either, so the search jumps straight to
      // j + 1 rather than restarting.
      let #(total, _tank, start) =
        list.zip(gas, cost)
        |> list.index_fold(#(0, 0, 0), fn(state, pair, i) {
          let #(total, tank, start) = state
          let diff = pair.0 - pair.1
          let tank = tank + diff
          case tank < 0 {
            True -> #(total + diff, 0, i + 1)
            False -> #(total + diff, tank, start)
          }
        })
      case total >= 0 {
        True -> start
        False -> -1
      }
    }
  }
}

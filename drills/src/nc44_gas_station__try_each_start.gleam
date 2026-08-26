import gleam/list

pub fn can_complete_circuit(gas: List(Int), cost: List(Int)) -> Int {
  let diffs = list.zip(gas, cost) |> list.map(fn(pair) { pair.0 - pair.1 })
  let n = list.length(diffs)

  diffs
  |> list.index_map(fn(_, start) { start })
  |> list.find(fn(start) { survives(diffs, start, n) })
  |> fn(found) {
    case found {
      Ok(start) -> start
      Error(Nil) -> -1
    }
  }
}

/// Drive the whole loop from `start` and see whether the tank ever goes
/// negative. O(n\u{b2}) \u{2014} the definition, and what the single pass replaces.
fn survives(diffs: List(Int), start: Int, n: Int) -> Bool {
  let rotated = list.append(list.drop(diffs, start), list.take(diffs, start))
  let #(_, ok) =
    list.fold(rotated, #(0, True), fn(state, diff) {
      let #(tank, ok) = state
      let tank = tank + diff
      #(tank, ok && tank >= 0)
    })
  ok && n > 0
}

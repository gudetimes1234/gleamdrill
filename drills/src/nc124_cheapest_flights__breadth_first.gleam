import gleam/dict.{type Dict}
import gleam/list

pub fn find_cheapest_price(
  _n: Int,
  flights: List(#(Int, Int, Int)),
  src: Int,
  dst: Int,
  k: Int,
) -> Int {
  // Breadth-first by number of flights taken, which makes the stop limit the
  // depth limit — the same bound Bellman-Ford gets from its round count. The
  // cheapest-so-far table is what stops it exploding: a city is only expanded
  // again if this route reached it for less than any earlier one did.
  let best =
    expand(flights, [#(src, 0)], dict.insert(dict.new(), src, 0), k + 1)
  case dict.get(best, dst) {
    Ok(cost) -> cost
    Error(Nil) -> -1
  }
}

fn expand(
  flights: List(#(Int, Int, Int)),
  frontier: List(#(Int, Int)),
  best: Dict(Int, Int),
  left: Int,
) -> Dict(Int, Int) {
  case frontier, left {
    [], _ -> best
    _, 0 -> best
    _, _ -> {
      let #(next, best) =
        list.fold(frontier, #([], best), fn(state, at: #(Int, Int)) {
          list.filter(flights, fn(flight: #(Int, Int, Int)) { flight.0 == at.0 })
          |> list.fold(state, fn(state, flight: #(Int, Int, Int)) {
            let #(next, best) = state
            let total = at.1 + flight.2
            case dict.get(best, flight.1) {
              Ok(current) if current <= total -> #(next, best)
              _ -> #(
                [#(flight.1, total), ..next],
                dict.insert(best, flight.1, total),
              )
            }
          })
        })
      expand(flights, next, best, left - 1)
    }
  }
}

import gleam/dict
import gleam/list

pub fn find_cheapest_price(
  _n: Int,
  flights: List(#(Int, Int, Int)),
  src: Int,
  dst: Int,
  k: Int,
) -> Int {
  // Bellman-Ford, stopped after k+1 rounds — one round is one flight, so the
  // round count *is* the stop limit. Each round reads the previous round's
  // costs from a snapshot rather than from the table being written; without
  // that, two flights could be taken within a single round and the limit would
  // leak.
  let costs =
    list.fold(rounds(k + 1), dict.insert(dict.new(), src, 0), fn(costs, _) {
      list.fold(flights, costs, fn(next, flight: #(Int, Int, Int)) {
        case dict.get(costs, flight.0) {
          Ok(so_far) -> {
            let total = so_far + flight.2
            case dict.get(next, flight.1) {
              Ok(current) if current <= total -> next
              _ -> dict.insert(next, flight.1, total)
            }
          }
          Error(Nil) -> next
        }
      })
    })

  case dict.get(costs, dst) {
    Ok(cost) -> cost
    Error(Nil) -> -1
  }
}

fn rounds(n: Int) -> List(Int) {
  case n <= 0 {
    True -> []
    False -> list.index_map(list.repeat(Nil, n), fn(_, i) { i })
  }
}

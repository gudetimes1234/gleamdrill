import gleam/dict
import gleam/list

pub fn network_delay_time(
  times: List(#(Int, Int, Int)),
  n: Int,
  k: Int,
) -> Int {
  // Bellman-Ford. No choosing what to settle next: relax every edge, n-1 times
  // over, and the times settle by themselves — a shortest path is at most n-1
  // edges long, and each round fixes at least one more of them. Slower than
  // Dijkstra at O(V·E), and the reason to know it is that it survives negative
  // edge weights, which Dijkstra's settle-and-never-revisit does not.
  let settled =
    list.fold(rounds(n - 1), dict.insert(dict.new(), k, 0), fn(best, _) {
      list.fold(times, best, fn(best, edge: #(Int, Int, Int)) {
        case dict.get(best, edge.0) {
          Ok(at) -> {
            let arrival = at + edge.2
            case dict.get(best, edge.1) {
              Ok(current) if current <= arrival -> best
              _ -> dict.insert(best, edge.1, arrival)
            }
          }
          Error(Nil) -> best
        }
      })
    })

  case dict.size(settled) == n {
    True ->
      list.fold(dict.values(settled), 0, fn(most, at) {
        case at > most {
          True -> at
          False -> most
        }
      })
    False -> -1
  }
}

fn rounds(n: Int) -> List(Int) {
  case n <= 0 {
    True -> []
    False -> list.index_map(list.repeat(Nil, n), fn(_, i) { i })
  }
}

import gleam/dict.{type Dict}
import gleam/list
import gleam/result

pub fn network_delay_time(
  times: List(#(Int, Int, Int)),
  n: Int,
  k: Int,
) -> Int {
  let edges =
    list.fold(times, dict.new(), fn(acc, edge: #(Int, Int, Int)) {
      dict.insert(acc, edge.0, [
        #(edge.1, edge.2),
        ..result.unwrap(dict.get(acc, edge.0), [])
      ])
    })

  let settled = settle(edges, [#(k, 0)], dict.new())

  // Every node has to have heard the signal, and the answer is the last one to.
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

// Dijkstra's algorithm. The frontier holds tentative arrival times; taking the
// smallest one settles that node for good, because every other route to it
// would have to start with an edge at least as long. Gleam has no heap, so the
// smallest is found by a scan — O(V²) rather than O(E log V), which is the
// better shape anyway when the graph is dense.
fn settle(
  edges: Dict(Int, List(#(Int, Int))),
  frontier: List(#(Int, Int)),
  settled: Dict(Int, Int),
) -> Dict(Int, Int) {
  case frontier {
    [] -> settled
    [head, ..tail] -> {
      let #(node, at) =
        list.fold(tail, head, fn(best: #(Int, Int), entry: #(Int, Int)) {
          case entry.1 < best.1 {
            True -> entry
            False -> best
          }
        })
      let rest =
        list.filter(frontier, fn(entry: #(Int, Int)) { entry.0 != node })
      case dict.has_key(settled, node) {
        True -> settle(edges, rest, settled)
        False -> {
          let settled = dict.insert(settled, node, at)
          let reached =
            result.unwrap(dict.get(edges, node), [])
            |> list.filter(fn(edge: #(Int, Int)) {
              !dict.has_key(settled, edge.0)
            })
            |> list.map(fn(edge: #(Int, Int)) { #(edge.0, at + edge.1) })
          settle(edges, list.append(rest, reached), settled)
        }
      }
    }
  }
}

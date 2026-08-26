import gleam/dict.{type Dict}
import gleam/list
import gleam/result
import gleam/set.{type Set}

/// A graph with no nodes at all is vacuously a tree, provided it has no edges
/// either — worth stating, because the n-1 edge count says otherwise.
pub fn valid_tree(n: Int, edges: List(#(Int, Int))) -> Bool {
  case n <= 0 {
    True -> edges == []
    False -> non_empty(n, edges)
  }
}

fn non_empty(n: Int, edges: List(#(Int, Int))) -> Bool {
  // A tree is two conditions at once: connected, and no cycles. Checking both
  // separately is unnecessary \u{2014} with exactly n\u{2212}1 edges, connected implies
  // acyclic and acyclic implies connected, so testing the edge count plus
  // either one is enough. Here it is the count plus reachability.
  case list.length(edges) == n - 1 {
    False -> False
    True -> {
      let adjacency =
        list.fold(edges, dict.new(), fn(acc, edge) {
          acc
          |> add(edge.0, edge.1)
          |> add(edge.1, edge.0)
        })
      set.size(explore(adjacency, [0], set.new())) == n
    }
  }
}

fn explore(
  adjacency: Dict(Int, List(Int)),
  frontier: List(Int),
  seen: Set(Int),
) -> Set(Int) {
  case frontier {
    [] -> seen
    [node, ..rest] ->
      case set.contains(seen, node) {
        True -> explore(adjacency, rest, seen)
        False ->
          explore(
            adjacency,
            list.append(rest, result.unwrap(dict.get(adjacency, node), [])),
            set.insert(seen, node),
          )
      }
  }
}

fn add(
  adjacency: Dict(Int, List(Int)),
  from: Int,
  to: Int,
) -> Dict(Int, List(Int)) {
  dict.insert(adjacency, from, [
    to,
    ..result.unwrap(dict.get(adjacency, from), [])
  ])
}

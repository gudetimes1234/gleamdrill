import gleam/dict.{type Dict}
import gleam/list
import gleam/result
import gleam/set.{type Set}

pub fn count_components(n: Int, edges: List(#(Int, Int))) -> Int {
  let adjacency =
    list.fold(edges, dict.new(), fn(acc, edge) {
      acc
      |> add(edge.0, edge.1)
      |> add(edge.1, edge.0)
    })

  // One search per unvisited node, exactly as with islands on a grid \u{2014} the
  // same counting-components idea with an adjacency list instead of
  // coordinates. Worth seeing side by side with union-find: this one needs the
  // whole graph up front, the other can take edges as they arrive.
  let #(count, _) =
    list.fold(nodes(n), #(0, set.new()), fn(state, node) {
      let #(count, seen) = state
      case set.contains(seen, node) {
        True -> #(count, seen)
        False -> #(count + 1, explore(adjacency, [node], seen))
      }
    })
  count
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

fn nodes(n: Int) -> List(Int) {
  list.index_map(list.repeat(Nil, n), fn(_, i) { i })
}

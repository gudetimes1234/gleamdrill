import gleam/dict.{type Dict}
import gleam/int
import gleam/list
import gleam/result
import gleam/set.{type Set}

pub fn clone_graph(adjacency: List(List(Int)), start: Int) -> List(List(Int)) {
  let graph =
    dict.from_list(list.index_map(adjacency, fn(edges, i) { #(i, edges) }))

  case dict.has_key(graph, start) {
    False -> []
    True -> {
      // The set of nodes already dealt with is the whole problem. Without it a
      // cycle sends the traversal round forever; with it, a node already
      // reached is simply skipped. Only the component containing the start is
      // copied, which is what the reachable set also decides.
      renumber(graph, set.to_list(discover(graph, [start], set.new())))
    }
  }
}

/// Breadth-first from the start.
fn discover(
  graph: Dict(Int, List(Int)),
  frontier: List(Int),
  reached: Set(Int),
) -> Set(Int) {
  case frontier {
    [] -> reached
    [node, ..rest] ->
      case set.contains(reached, node) || !dict.has_key(graph, node) {
        True -> discover(graph, rest, reached)
        False ->
          discover(
            graph,
            list.append(rest, result.unwrap(dict.get(graph, node), [])),
            set.insert(reached, node),
          )
      }
  }
}

/// Reachable nodes renumbered by their original index, ascending. Numbering by
/// *discovery* order would make the answer depend on whether the traversal was
/// breadth- or depth-first, which is not part of the problem.
fn renumber(
  graph: Dict(Int, List(Int)),
  reached: List(Int),
) -> List(List(Int)) {
  let ordered = list.sort(reached, int.compare)
  let numbering =
    dict.from_list(list.index_map(ordered, fn(node, i) { #(node, i) }))

  list.map(ordered, fn(original) {
    graph
    |> dict.get(original)
    |> result.unwrap([])
    |> list.filter_map(fn(neighbour) { dict.get(numbering, neighbour) })
  })
}

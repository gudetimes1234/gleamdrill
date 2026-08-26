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
    True -> renumber(graph, set.to_list(visit(graph, start, set.new())))
  }
}

/// Depth-first. The node is marked *before* recursing into its neighbours,
/// which is what makes a cycle terminate \u{2014} marking afterwards would let the
/// traversal reach the same node again while it was still being visited.
fn visit(
  graph: Dict(Int, List(Int)),
  node: Int,
  reached: Set(Int),
) -> Set(Int) {
  case set.contains(reached, node) || !dict.has_key(graph, node) {
    True -> reached
    False ->
      graph
      |> dict.get(node)
      |> result.unwrap([])
      |> list.fold(set.insert(reached, node), fn(reached, neighbour) {
        visit(graph, neighbour, reached)
      })
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

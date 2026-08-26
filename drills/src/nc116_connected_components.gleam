import gleam/dict.{type Dict}
import gleam/list

pub fn count_components(n: Int, edges: List(#(Int, Int))) -> Int {
  // Start with n components and merge: every edge whose ends are not already
  // together removes one. No traversal, no adjacency list \u{2014} the count falls
  // straight out of how many merges actually happened.
  let #(_, merges) =
    list.fold(edges, #(dict.new(), 0), fn(state, edge) {
      let #(parents, merges) = state
      let root_a = find(parents, edge.0)
      let root_b = find(parents, edge.1)
      case root_a == root_b {
        True -> #(parents, merges)
        False -> #(dict.insert(parents, root_a, root_b), merges + 1)
      }
    })
  n - merges
}

fn find(parents: Dict(Int, Int), node: Int) -> Int {
  case dict.get(parents, node) {
    Error(Nil) -> node
    Ok(parent) ->
      case parent == node {
        True -> node
        False -> find(parents, parent)
      }
  }
}

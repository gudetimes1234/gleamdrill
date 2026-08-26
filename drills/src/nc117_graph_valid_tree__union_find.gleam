import gleam/dict.{type Dict}
import gleam/list

/// A graph with no nodes at all is vacuously a tree, provided it has no edges
/// either — worth stating, because the n-1 merge count says otherwise.
pub fn valid_tree(n: Int, edges: List(#(Int, Int))) -> Bool {
  case n <= 0 {
    True -> edges == []
    False -> non_empty(n, edges)
  }
}

fn non_empty(n: Int, edges: List(#(Int, Int))) -> Bool {
  // Both conditions from one pass. An edge joining two nodes already connected
  // is a cycle, so if none does, the graph is a forest \u{2014} and a forest with
  // n\u{2212}1 merges is a single tree. No adjacency list and no traversal.
  let #(_, merges, acyclic) =
    list.fold(edges, #(dict.new(), 0, True), fn(state, edge) {
      let #(parents, merges, acyclic) = state
      case acyclic {
        False -> state
        True -> {
          let root_a = find(parents, edge.0)
          let root_b = find(parents, edge.1)
          case root_a == root_b {
            True -> #(parents, merges, False)
            False -> #(dict.insert(parents, root_a, root_b), merges + 1, True)
          }
        }
      }
    })

  acyclic && merges == n - 1
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

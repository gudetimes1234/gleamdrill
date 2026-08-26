import gleam/dict.{type Dict}
import gleam/list

pub fn find_redundant_connection(edges: List(#(Int, Int))) -> #(Int, Int) {
  // n nodes and n edges means exactly one cycle. Union-find spots it the moment
  // an edge joins two nodes already connected \u{2014} and because the edges are
  // processed in order, the first such edge is the last one that could be
  // removed, which is what the problem asks for.
  let #(_, found) =
    list.fold(edges, #(dict.new(), #(0, 0)), fn(state, edge) {
      let #(parents, found) = state
      let root_a = find(parents, edge.0)
      let root_b = find(parents, edge.1)
      case root_a == root_b {
        True -> #(parents, edge)
        False -> #(dict.insert(parents, root_a, root_b), found)
      }
    })
  found
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

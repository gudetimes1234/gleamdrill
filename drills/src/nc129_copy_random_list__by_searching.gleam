import gleam/list

pub fn copy_random_list(nodes: List(#(Int, Int, Int))) -> List(#(Int, Int)) {
  // The same translation without the map: for each link, search the list for
  // the node it names. O(n²) against O(n), and the contrast is the lesson —
  // the map is not an optimisation bolted on afterwards, it is the same lookup
  // the search does, paid for once instead of once per node.
  list.map(nodes, fn(node: #(Int, Int, Int)) {
    #(node.1, position_of(nodes, node.2, 0))
  })
}

fn position_of(nodes: List(#(Int, Int, Int)), id: Int, at: Int) -> Int {
  case nodes {
    [] -> -1
    [node, ..rest] ->
      case node.0 == id {
        True -> at
        False -> position_of(rest, id, at + 1)
      }
  }
}

import gleam/dict
import gleam/list
import gleam/result

/// Nodes arrive as #(id, value, random_id), where the ids are arbitrary and a
/// random_id of -1 means no link. The copy is returned as #(value, random) with
/// random naming a *position* in the copy, or -1 — so producing it means
/// translating every id into the place the copied node ended up.
pub fn copy_random_list(nodes: List(#(Int, Int, Int))) -> List(#(Int, Int)) {
  // One pass to learn where each original node lands, a second to resolve the
  // links. Trying to resolve a link on first sight cannot work: it may point at
  // a node not yet seen, which is the whole difficulty of the problem, and a
  // map from old node to new is what removes it.
  let places =
    list.index_fold(nodes, dict.new(), fn(acc, node: #(Int, Int, Int), i) {
      dict.insert(acc, node.0, i)
    })

  list.map(nodes, fn(node: #(Int, Int, Int)) {
    #(node.1, result.unwrap(dict.get(places, node.2), -1))
  })
}

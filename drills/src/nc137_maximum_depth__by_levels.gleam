pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

import gleam/list

// Count the levels instead of measuring the branches: take the whole frontier,
// replace it with all its children, and add one. No recursion and no stack —
// which is what makes this the version that survives a tree deep enough to
// overflow one.
pub fn max_depth(tree: Tree) -> Int {
  case tree {
    Leaf -> 0
    _ -> descend([tree], 0)
  }
}

fn descend(frontier: List(Tree), depth: Int) -> Int {
  case frontier {
    [] -> depth
    _ ->
      descend(
        list.flat_map(frontier, fn(node) {
          case node {
            Leaf -> []
            Node(_value, left, right) ->
              list.filter([left, right], fn(child) { child != Leaf })
          }
        }),
        depth + 1,
      )
  }
}

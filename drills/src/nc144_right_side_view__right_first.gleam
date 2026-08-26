pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

import gleam/dict

// Depth-first, visiting the right child first, and recording a value only when
// its depth is met for the first time. No frontier at all: being first to reach
// a depth is the same thing as being rightmost on it, given that order of
// visiting.
pub fn right_side_view(tree: Tree) -> List(Int) {
  let seen = look(tree, 0, dict.new())
  gather(seen, 0, [])
}

fn look(
  tree: Tree,
  depth: Int,
  seen: dict.Dict(Int, Int),
) -> dict.Dict(Int, Int) {
  case tree {
    Leaf -> seen
    Node(value, left, right) -> {
      let seen = case dict.has_key(seen, depth) {
        True -> seen
        False -> dict.insert(seen, depth, value)
      }
      look(left, depth + 1, look(right, depth + 1, seen))
    }
  }
}

fn gather(seen: dict.Dict(Int, Int), depth: Int, out: List(Int)) -> List(Int) {
  case dict.get(seen, depth) {
    Error(Nil) -> out
    Ok(value) -> [value, ..gather(seen, depth + 1, out)]
  }
}

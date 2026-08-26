pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

import gleam/dict
import gleam/list
import gleam/result

// Walk depth-first and file each value under its depth. The traversal order is
// wrong for the answer, but appending to the right bucket puts it right — and
// within a level, left is still visited before right, which is all the ordering
// the answer needs. One dictionary instead of a frontier.
pub fn level_order(tree: Tree) -> List(List(Int)) {
  let levels = collect(tree, 0, dict.new())
  gather(levels, 0, [])
}

fn collect(
  tree: Tree,
  depth: Int,
  levels: dict.Dict(Int, List(Int)),
) -> dict.Dict(Int, List(Int)) {
  case tree {
    Leaf -> levels
    Node(value, left, right) -> {
      let at_depth = result.unwrap(dict.get(levels, depth), [])
      let levels = dict.insert(levels, depth, [value, ..at_depth])
      collect(right, depth + 1, collect(left, depth + 1, levels))
    }
  }
}

fn gather(
  levels: dict.Dict(Int, List(Int)),
  depth: Int,
  out: List(List(Int)),
) -> List(List(Int)) {
  case dict.get(levels, depth) {
    Error(Nil) -> list.reverse(out)
    Ok(values) -> gather(levels, depth + 1, [list.reverse(values), ..out])
  }
}

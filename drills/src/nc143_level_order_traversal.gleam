pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

import gleam/list

// Take the whole frontier at once rather than one node at a time: everything on
// it is the current level, and its children are the next. That is what makes
// the grouping fall out without tracking any depth — a plain queue would give
// the right order but no idea where each level ends.
pub fn level_order(tree: Tree) -> List(List(Int)) {
  case tree {
    Leaf -> []
    _ -> descend([tree], [])
  }
}

fn descend(frontier: List(Tree), levels: List(List(Int))) -> List(List(Int)) {
  case frontier {
    [] -> list.reverse(levels)
    _ -> {
      let values =
        list.filter_map(frontier, fn(node) {
          case node {
            Leaf -> Error(Nil)
            Node(value, _left, _right) -> Ok(value)
          }
        })
      descend(children(frontier), [values, ..levels])
    }
  }
}

fn children(frontier: List(Tree)) -> List(Tree) {
  list.flat_map(frontier, fn(node) {
    case node {
      Leaf -> []
      Node(_value, left, right) ->
        list.filter([left, right], fn(child) { child != Leaf })
    }
  })
}

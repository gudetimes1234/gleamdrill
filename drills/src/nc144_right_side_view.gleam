pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

import gleam/list

// The last value on each level, which is what "seen from the right" means once
// the question is asked level by level. Walking down the right children alone
// is the tempting wrong answer: where the right side is short, a node further
// left is the one that shows.
pub fn right_side_view(tree: Tree) -> List(Int) {
  case tree {
    Leaf -> []
    _ -> descend([tree], [])
  }
}

fn descend(frontier: List(Tree), seen: List(Int)) -> List(Int) {
  case frontier {
    [] -> list.reverse(seen)
    _ -> {
      let values =
        list.filter_map(frontier, fn(node) {
          case node {
            Leaf -> Error(Nil)
            Node(value, _left, _right) -> Ok(value)
          }
        })
      let seen = case list.last(values) {
        Ok(rightmost) -> [rightmost, ..seen]
        Error(Nil) -> seen
      }
      descend(children(frontier), seen)
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

pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

import gleam/int
import gleam/list
import gleam/string

// Post-order instead of pre-order, still with a marker for every empty child.
// The root is then the *last* token rather than the first, so the reader works
// backwards — and reading backwards means taking the right subtree before the
// left. Worth writing once: the format is what decides the parse direction, and
// nothing else about the two versions differs.
pub fn serialize(tree: Tree) -> String {
  string.join(tokens(tree), ",")
}

pub fn deserialize(text: String) -> Tree {
  let #(tree, _rest) = rebuild(list.reverse(string.split(text, ",")))
  tree
}

fn tokens(tree: Tree) -> List(String) {
  case tree {
    Leaf -> ["#"]
    Node(value, left, right) ->
      list.append(list.append(tokens(left), tokens(right)), [
        int.to_string(value),
      ])
  }
}

fn rebuild(reversed: List(String)) -> #(Tree, List(String)) {
  case reversed {
    [] -> #(Leaf, [])
    ["#", ..rest] -> #(Leaf, rest)
    [head, ..rest] ->
      case int.parse(head) {
        Error(Nil) -> #(Leaf, rest)
        Ok(value) -> {
          let #(right, after_right) = rebuild(rest)
          let #(left, after_left) = rebuild(after_right)
          #(Node(value, left, right), after_left)
        }
      }
  }
}

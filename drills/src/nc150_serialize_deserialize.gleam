pub type Tree {
  Leaf
  Node(value: Int, left: Tree, right: Tree)
}

import gleam/int
import gleam/list
import gleam/string

// Pre-order with a marker for every empty child. Recording the empties is what
// makes the format unambiguous — a pre-order list of values alone matches many
// different trees — and it is also what lets the reader work without any length
// information: it stops as soon as it has consumed a whole subtree.
pub fn serialize(tree: Tree) -> String {
  string.join(tokens(tree), ",")
}

pub fn deserialize(text: String) -> Tree {
  let #(tree, _rest) = rebuild(string.split(text, ","))
  tree
}

fn tokens(tree: Tree) -> List(String) {
  case tree {
    Leaf -> ["#"]
    Node(value, left, right) -> [
      int.to_string(value),
      ..list.append(tokens(left), tokens(right))
    ]
  }
}

fn rebuild(parts: List(String)) -> #(Tree, List(String)) {
  case parts {
    [] -> #(Leaf, [])
    ["#", ..rest] -> #(Leaf, rest)
    [head, ..rest] ->
      case int.parse(head) {
        Error(Nil) -> #(Leaf, rest)
        Ok(value) -> {
          let #(left, after_left) = rebuild(rest)
          let #(right, after_right) = rebuild(after_left)
          #(Node(value, left, right), after_right)
        }
      }
  }
}

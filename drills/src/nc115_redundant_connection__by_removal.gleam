import gleam/list
import gleam/set.{type Set}

pub fn find_redundant_connection(edges: List(#(Int, Int))) -> #(Int, Int) {
  // Try removing each edge, latest first, and keep the first removal that
  // leaves a tree. O(n\u{b2}) against union-find's near-linear, but it needs no new
  // structure \u{2014} and it says the specification outright: the answer is the
  // last edge whose absence would make the graph a tree.
  let nodes =
    edges
    |> list.flat_map(fn(edge: #(Int, Int)) { [edge.0, edge.1] })
    |> set.from_list

  edges
  |> list.reverse
  |> list.find(fn(candidate) {
    is_tree(list.filter(edges, fn(edge) { edge != candidate }), nodes)
  })
  |> fn(found) {
    case found {
      Ok(edge) -> edge
      Error(Nil) -> #(0, 0)
    }
  }
}

fn is_tree(edges: List(#(Int, Int)), nodes: Set(Int)) -> Bool {
  case set.to_list(nodes) {
    [] -> True
    [first, ..] ->
      list.length(edges) == set.size(nodes) - 1
      && set.size(reach(edges, [first], set.new())) == set.size(nodes)
  }
}

fn reach(
  edges: List(#(Int, Int)),
  frontier: List(Int),
  seen: Set(Int),
) -> Set(Int) {
  case frontier {
    [] -> seen
    [node, ..rest] ->
      case set.contains(seen, node) {
        True -> reach(edges, rest, seen)
        False -> {
          let next =
            edges
            |> list.filter_map(fn(edge: #(Int, Int)) {
              case edge.0 == node, edge.1 == node {
                True, _ -> Ok(edge.1)
                _, True -> Ok(edge.0)
                _, _ -> Error(Nil)
              }
            })
          reach(edges, list.append(rest, next), set.insert(seen, node))
        }
      }
  }
}

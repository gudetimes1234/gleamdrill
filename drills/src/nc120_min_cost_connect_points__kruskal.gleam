import gleam/dict.{type Dict}
import gleam/int
import gleam/list
import gleam/result

pub fn min_cost_connect_points(points: List(#(Int, Int))) -> Int {
  let indexed = list.index_map(points, fn(point, i) { #(i, point) })

  // Kruskal's algorithm: every edge, cheapest first, kept only when it joins
  // two pieces that are not already connected. Union-find is what makes that
  // test cheap. The trade against Prim's is the sort — O(n² log n) edges here
  // against Prim's O(n²) — but Kruskal never needs the points themselves, only
  // the edge list, so it is the one that generalises to a sparse graph.
  let edges =
    pairs(indexed)
    |> list.sort(fn(a: #(Int, Int, Int), b: #(Int, Int, Int)) {
      int.compare(a.2, b.2)
    })

  let #(_, total) =
    list.fold(edges, #(dict.new(), 0), fn(state, edge: #(Int, Int, Int)) {
      let #(parents, total) = state
      let root_a = find(parents, edge.0)
      let root_b = find(parents, edge.1)
      case root_a == root_b {
        True -> #(parents, total)
        False -> #(dict.insert(parents, root_a, root_b), total + edge.2)
      }
    })
  total
}

fn pairs(indexed: List(#(Int, #(Int, Int)))) -> List(#(Int, Int, Int)) {
  case indexed {
    [] -> []
    [head, ..tail] ->
      list.append(
        list.map(tail, fn(other: #(Int, #(Int, Int))) {
          #(head.0, other.0, distance(head.1, other.1))
        }),
        pairs(tail),
      )
  }
}

fn find(parents: Dict(Int, Int), node: Int) -> Int {
  case result.unwrap(dict.get(parents, node), node) {
    parent if parent == node -> node
    parent -> find(parents, parent)
  }
}

fn distance(a: #(Int, Int), b: #(Int, Int)) -> Int {
  int.absolute_value(a.0 - b.0) + int.absolute_value(a.1 - b.1)
}

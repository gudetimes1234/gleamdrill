import gleam/int
import gleam/list

pub fn min_cost_connect_points(points: List(#(Int, Int))) -> Int {
  case list.index_map(points, fn(point, i) { #(i, point) }) {
    [] -> 0
    [#(_, start), ..rest] ->
      grow(
        list.map(rest, fn(entry: #(Int, #(Int, Int))) {
          #(entry.0, entry.1, distance(start, entry.1))
        }),
        0,
      )
  }
}

// Prim's algorithm. Each outside point remembers only its distance to the tree
// so far, so adding a point is one pass to find the nearest and one pass to
// update — O(n²) total, which is what a complete graph costs anyway, and it
// needs no heap. Cheapest-edge-first is safe because the cheapest edge leaving
// any set of points is always in some minimum spanning tree.
fn grow(outside: List(#(Int, #(Int, Int), Int)), total: Int) -> Int {
  case outside {
    [] -> total
    [head, ..tail] -> {
      let nearest =
        list.fold(
          tail,
          head,
          fn(best: #(Int, #(Int, Int), Int), entry: #(Int, #(Int, Int), Int)) {
            case entry.2 < best.2 {
              True -> entry
              False -> best
            }
          },
        )
      let rest =
        outside
        |> list.filter(fn(entry: #(Int, #(Int, Int), Int)) {
          entry.0 != nearest.0
        })
        |> list.map(fn(entry: #(Int, #(Int, Int), Int)) {
          let reached = distance(nearest.1, entry.1)
          case reached < entry.2 {
            True -> #(entry.0, entry.1, reached)
            False -> entry
          }
        })
      grow(rest, total + nearest.2)
    }
  }
}

fn distance(a: #(Int, Int), b: #(Int, Int)) -> Int {
  int.absolute_value(a.0 - b.0) + int.absolute_value(a.1 - b.1)
}

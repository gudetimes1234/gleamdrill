import gleam/dict.{type Dict}
import gleam/list
import gleam/result

pub type DetectSquares {
  DetectSquares(counts: Dict(#(Int, Int), Int))
}

pub fn new() -> DetectSquares {
  DetectSquares(dict.new())
}

pub fn add(store: DetectSquares, point: #(Int, Int)) -> DetectSquares {
  DetectSquares(dict.insert(store.counts, point, tally(store.counts, point) + 1))
}

pub fn count(store: DetectSquares, point: #(Int, Int)) -> Int {
  let #(x, y) = point

  // Pick the corner directly above or below instead. That fixes the side
  // length, which leaves two squares to check rather than one \u{2014} the
  // remaining corners can be to the left or to the right.
  dict.to_list(store.counts)
  |> list.fold(0, fn(total, entry) {
    let #(#(px, py), copies) = entry
    case px == x && py != y {
      False -> total
      True -> {
        let side = absolute(py - y)
        total
        + copies
        * {
          pair(store.counts, x + side, y, py)
          + pair(store.counts, x - side, y, py)
        }
      }
    }
  })
}

fn pair(
  counts: Dict(#(Int, Int), Int),
  column: Int,
  low: Int,
  high: Int,
) -> Int {
  tally(counts, #(column, low)) * tally(counts, #(column, high))
}

fn tally(counts: Dict(#(Int, Int), Int), point: #(Int, Int)) -> Int {
  result.unwrap(dict.get(counts, point), 0)
}

fn absolute(n: Int) -> Int {
  case n < 0 {
    True -> -n
    False -> n
  }
}

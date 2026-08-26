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

  // Pick the corner diagonally opposite: that one choice fixes the whole
  // square, because the other two corners must be at (x, py) and (px, y). A
  // valid diagonal partner shares neither coordinate and sits on a true
  // diagonal, and duplicates multiply rather than repeat.
  dict.to_list(store.counts)
  |> list.fold(0, fn(total, entry) {
    let #(#(px, py), copies) = entry
    case px != x && py != y && absolute(px - x) == absolute(py - y) {
      False -> total
      True ->
        total
        + copies
        * tally(store.counts, #(x, py))
        * tally(store.counts, #(px, y))
    }
  })
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

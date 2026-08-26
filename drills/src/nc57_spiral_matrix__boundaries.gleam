import gleam/list
import gleam/result

pub fn spiral_order(matrix: List(List(Int))) -> List(Int) {
  case matrix {
    [] -> []
    [first, ..] ->
      walk(matrix, 0, list.length(matrix) - 1, 0, list.length(first) - 1, [])
  }
}

/// Four boundaries closing in. Each side is walked and then retired, and the
/// two guards in the middle are the ones everybody forgets: on a single
/// remaining row or column the bottom and top edges are the same edge, so
/// walking both would emit it twice.
fn walk(
  matrix: List(List(Int)),
  top: Int,
  bottom: Int,
  left: Int,
  right: Int,
  acc: List(Int),
) -> List(Int) {
  case top > bottom || left > right {
    True -> list.reverse(acc)
    False -> {
      let acc =
        list.fold(span(left, right), acc, fn(acc, c) {
          [at(matrix, top, c), ..acc]
        })
      let acc =
        list.fold(span(top + 1, bottom), acc, fn(acc, r) {
          [at(matrix, r, right), ..acc]
        })
      let acc = case top < bottom {
        True ->
          list.fold(list.reverse(span(left, right - 1)), acc, fn(acc, c) {
            [at(matrix, bottom, c), ..acc]
          })
        False -> acc
      }
      let acc = case left < right {
        True ->
          list.fold(list.reverse(span(top + 1, bottom - 1)), acc, fn(acc, r) {
            [at(matrix, r, left), ..acc]
          })
        False -> acc
      }
      walk(matrix, top + 1, bottom - 1, left + 1, right - 1, acc)
    }
  }
}

fn span(from: Int, to: Int) -> List(Int) {
  case to < from {
    True -> []
    False ->
      list.index_map(list.repeat(Nil, to - from + 1), fn(_, i) { from + i })
  }
}

fn at(matrix: List(List(Int)), row: Int, column: Int) -> Int {
  matrix
  |> list.drop(row)
  |> list.first
  |> result.unwrap([])
  |> list.drop(column)
  |> list.first
  |> result.unwrap(0)
}

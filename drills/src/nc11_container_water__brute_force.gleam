import gleam/int
import gleam/list

pub fn max_area(heights: List(Int)) -> Int {
  let indexed = list.index_map(heights, fn(height, i) { #(i, height) })
  list.fold(indexed, 0, fn(best, left) {
    list.fold(indexed, best, fn(best, right) {
      case right.0 > left.0 {
        True -> int.max(best, int.min(left.1, right.1) * { right.0 - left.0 })
        False -> best
      }
    })
  })
}

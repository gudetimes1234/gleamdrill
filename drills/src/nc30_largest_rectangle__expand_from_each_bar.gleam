import gleam/int
import gleam/list

pub fn largest_rectangle_area(heights: List(Int)) -> Int {
  let indexed = list.index_map(heights, fn(h, i) { #(i, h) })

  list.fold(indexed, 0, fn(best, cell) {
    let #(i, h) = cell
    // How far this bar's own height can spread in each direction. O(n\u{b2}), and
    // the definition of the answer: every rectangle is some bar taken as far
    // as it will go.
    let left =
      indexed
      |> list.take(i)
      |> list.reverse
      |> list.take_while(fn(other) { other.1 >= h })
      |> list.length
    let right =
      indexed
      |> list.drop(i + 1)
      |> list.take_while(fn(other) { other.1 >= h })
      |> list.length
    int.max(best, h * { left + right + 1 })
  })
}

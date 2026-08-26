import gleam/int
import gleam/list

pub fn k_closest(points: List(#(Int, Int)), k: Int) -> List(#(Int, Int)) {
  // Sorting by *squared* distance rather than distance: the square root is
  // monotonic, so it cannot change the order, and skipping it keeps everything
  // in integers with no rounding to argue about.
  points
  |> list.sort(fn(a, b) { int.compare(squared(a), squared(b)) })
  |> list.take(k)
}

fn squared(point: #(Int, Int)) -> Int {
  point.0 * point.0 + point.1 * point.1
}

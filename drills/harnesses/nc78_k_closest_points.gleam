import gleam/int
import gleam/list
import gleam/order
import gleam/string
import solution

/// Any order is acceptable, so every case compares sorted.
fn sorted(points: List(#(Int, Int)), k: Int) -> List(#(Int, Int)) {
  solution.k_closest(points, k)
  |> list.sort(fn(a: #(Int, Int), b: #(Int, Int)) {
    case int.compare(a.0, b.0) {
      order.Eq -> int.compare(a.1, b.1)
      other -> other
    }
  })
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "k_closest([#(1, 3), #(-2, 2)], 1)",
      string.inspect([#(-2, 2)]),
      string.inspect(sorted([#(1, 3), #(-2, 2)], 1)),
    ),
    #(
      "k_closest([#(3, 3), #(5, -1), #(-2, 4)], 2)",
      string.inspect([#(-2, 4), #(3, 3)]),
      string.inspect(sorted([#(3, 3), #(5, -1), #(-2, 4)], 2)),
    ),
    #("k_closest([], 0)", string.inspect([]), string.inspect(sorted([], 0))),
    #(
      "k_closest([#(0, 0)], 1)",
      string.inspect([#(0, 0)]),
      string.inspect(sorted([#(0, 0)], 1)),
    ),
    #(
      "k_closest([#(1, 1), #(2, 2), #(3, 3)], 2)",
      string.inspect([#(1, 1), #(2, 2)]),
      string.inspect(sorted([#(1, 1), #(2, 2), #(3, 3)], 2)),
    ),
  ]
}

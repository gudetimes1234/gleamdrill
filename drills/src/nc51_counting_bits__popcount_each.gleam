import gleam/int
import gleam/list

pub fn count_bits(n: Int) -> List(Int) {
  list.repeat(Nil, n + 1)
  |> list.index_map(fn(_, i) { popcount(i) })
}

/// Each number counted from scratch with the clear-lowest-bit trick. O(n log n)
/// against the dynamic version's O(n), and it remembers nothing between
/// numbers \u{2014} which is exactly what the other one exploits.
fn popcount(n: Int) -> Int {
  case n {
    0 -> 0
    _ -> 1 + popcount(int.bitwise_and(n, n - 1))
  }
}

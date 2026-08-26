import gleam/int
import gleam/list

pub fn find_kth_largest(nums: List(Int), k: Int) -> Result(Int, Nil) {
  // Sorting answers every k at once, which is more than asked for but is the
  // version nobody gets wrong. O(n log n).
  nums
  |> list.sort(fn(a, b) { int.compare(b, a) })
  |> list.drop(k - 1)
  |> list.first
}

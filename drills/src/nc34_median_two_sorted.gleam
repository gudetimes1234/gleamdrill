import gleam/int
import gleam/list

pub fn find_median_sorted_arrays(nums1: List(Int), nums2: List(Int)) -> Float {
  let total = list.length(nums1) + list.length(nums2)
  case total {
    0 -> 0.0
    _ -> {
      let #(previous, current) = advance(nums1, nums2, total / 2 + 1, 0, 0)
      case total % 2 {
        1 -> int.to_float(current)
        _ -> int.to_float(previous + current) /. 2.0
      }
    }
  }
}

/// Merge, but stop at the middle and keep only the last two values seen: the
/// merged list is never built, so this is O(m + n) time and no extra space.
fn advance(
  a: List(Int),
  b: List(Int),
  steps: Int,
  previous: Int,
  current: Int,
) -> #(Int, Int) {
  case steps <= 0 {
    True -> #(previous, current)
    False ->
      case a, b {
        [x, ..rest], [y, ..] if x <= y -> advance(rest, b, steps - 1, current, x)
        [x, ..rest], [] -> advance(rest, b, steps - 1, current, x)
        _, [y, ..rest] -> advance(a, rest, steps - 1, current, y)
        [], [] -> #(previous, current)
      }
  }
}

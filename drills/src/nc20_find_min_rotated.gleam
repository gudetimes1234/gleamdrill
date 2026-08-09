import gleam/int
import gleam/list
import gleam/result

pub fn find_min(nums: List(Int)) -> Result(Int, Nil) {
  case nums {
    [] -> Error(Nil)
    [only] -> Ok(only)
    [a, b] -> Ok(int.min(a, b))
    _ -> {
      use first <- result.try(list.first(nums))
      use last <- result.try(list.last(nums))
      case first <= last {
        // This segment is fully sorted: the rotation point is not inside it.
        True -> Ok(first)
        False -> {
          let half = list.length(nums) / 2
          let #(left, right) = list.split(nums, half)
          case right {
            [mid, ..after] ->
              case mid >= first {
                // Left half sorted: the minimum is past the midpoint.
                True -> find_min(after)
                // Rotation point is in the left half, up to and including mid.
                False -> find_min(list.append(left, [mid]))
              }
            [] -> Error(Nil)
          }
        }
      }
    }
  }
}

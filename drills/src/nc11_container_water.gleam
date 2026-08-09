import gleam/int
import gleam/list

pub fn max_area(heights: List(Int)) -> Int {
  converge(heights, list.reverse(heights), list.length(heights) - 1, 0)
}

fn converge(
  from_left: List(Int),
  from_right: List(Int),
  width: Int,
  best: Int,
) -> Int {
  case width <= 0 {
    True -> best
    False ->
      case from_left, from_right {
        [left, ..left_rest], [right, ..right_rest] -> {
          let area = int.min(left, right) * width
          let best = int.max(best, area)
          case left < right {
            True -> converge(left_rest, from_right, width - 1, best)
            False -> converge(from_left, right_rest, width - 1, best)
          }
        }
        _, _ -> best
      }
  }
}

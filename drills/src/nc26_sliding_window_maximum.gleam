import gleam/int
import gleam/list

pub fn max_sliding_window(nums: List(Int), k: Int) -> List(Int) {
  case k <= 0 {
    True -> []
    False -> {
      let blocks = list.sized_chunk(nums, k)
      let left = list.flat_map(blocks, running_max)
      let right =
        list.flat_map(blocks, fn(block) {
          block
          |> list.reverse
          |> running_max
          |> list.reverse
        })

      // Every window of width k straddles at most one block boundary, so it is
      // covered by a suffix of one block and a prefix of the next.
      list.zip(right, list.drop(left, k - 1))
      |> list.map(fn(pair) { int.max(pair.0, pair.1) })
    }
  }
}

/// Seeded with the first element rather than zero: the values can be negative.
fn running_max(values: List(Int)) -> List(Int) {
  case values {
    [] -> []
    [first, ..rest] -> [first, ..list.scan(rest, first, int.max)]
  }
}

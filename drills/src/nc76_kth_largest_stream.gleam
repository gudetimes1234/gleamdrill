import gleam/int
import gleam/list

pub type KthLargest {
  KthLargest(k: Int, largest: List(Int))
}

pub fn new(k: Int, nums: List(Int)) -> KthLargest {
  KthLargest(k, keep_top(nums, k))
}

/// Only the k largest values can ever be the answer, so everything else is
/// thrown away on arrival. With a min-heap the discard is O(log k); Gleam's
/// standard library has no heap, so this keeps a sorted list instead \u{2014} same
/// idea, worse constant.
pub fn add(state: KthLargest, value: Int) -> KthLargest {
  KthLargest(state.k, keep_top([value, ..state.largest], state.k))
}

/// The smallest of the k kept values is the kth largest \u{2014} but only once k of
/// them exist, which is why the count is checked rather than assumed.
pub fn kth(state: KthLargest) -> Result(Int, Nil) {
  case list.length(state.largest) < state.k {
    True -> Error(Nil)
    False -> list.first(state.largest)
  }
}

fn keep_top(values: List(Int), k: Int) -> List(Int) {
  values
  |> list.sort(fn(a, b) { int.compare(b, a) })
  |> list.take(k)
  |> list.sort(int.compare)
}

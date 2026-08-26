import gleam/int
import gleam/list

pub type KthLargest {
  KthLargest(k: Int, seen: List(Int))
}

pub fn new(k: Int, nums: List(Int)) -> KthLargest {
  KthLargest(k, nums)
}

/// Keep the whole stream and sort on demand. Wrong for a real stream \u{2014} memory
/// grows without bound and every query costs a sort \u{2014} but it is the definition,
/// and it is what the bounded structure has to be checked against.
pub fn add(state: KthLargest, value: Int) -> KthLargest {
  KthLargest(state.k, [value, ..state.seen])
}

pub fn kth(state: KthLargest) -> Result(Int, Nil) {
  state.seen
  |> list.sort(fn(a, b) { int.compare(b, a) })
  |> list.drop(state.k - 1)
  |> list.first
}

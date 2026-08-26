import gleam/int
import gleam/list

pub fn subsets(nums: List(Int)) -> List(List(Int)) {
  let indexed = list.index_map(nums, fn(value, i) { #(i, value) })

  // The in-or-out choices *are* the bits of a number, so counting from 0 to
  // 2\u{207f}\u{207b}\u{b9} enumerates every subset exactly once with no recursion at all. Worth
  // knowing: it also gives every subset a stable index, which matters when
  // subsets have to be compared or cached.
  list.repeat(Nil, power_of_two(list.length(nums)))
  |> list.index_map(fn(_, mask) {
    indexed
    |> list.filter(fn(pair: #(Int, Int)) {
      int.bitwise_and(int.bitwise_shift_right(mask, pair.0), 1) == 1
    })
    |> list.map(fn(pair: #(Int, Int)) { pair.1 })
  })
}

fn power_of_two(n: Int) -> Int {
  int.bitwise_shift_left(1, n)
}

import gleam/dict
import gleam/int
import gleam/list
import gleam/result

pub fn count_bits(n: Int) -> List(Int) {
  let indices = list.index_map(list.repeat(Nil, n + 1), fn(_, i) { i })

  // Every number is some smaller number with one extra bit on the end:
  // count(i) is count(i >> 1) plus whatever that last bit is. Each answer costs
  // one lookup, so the whole array is O(n).
  let counts =
    list.fold(indices, dict.new(), fn(acc, i) {
      let value = case i {
        0 -> 0
        _ ->
          result.unwrap(dict.get(acc, int.bitwise_shift_right(i, 1)), 0)
          + int.bitwise_and(i, 1)
      }
      dict.insert(acc, i, value)
    })

  list.map(indices, fn(i) { result.unwrap(dict.get(counts, i), 0) })
}

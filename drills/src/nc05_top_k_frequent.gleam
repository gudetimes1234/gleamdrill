import gleam/dict
import gleam/int
import gleam/list
import gleam/option

pub fn top_k_frequent(nums: List(Int), k: Int) -> List(Int) {
  nums
  |> list.fold(dict.new(), fn(acc, n) {
    dict.upsert(acc, n, fn(count) { option.unwrap(count, 0) + 1 })
  })
  |> dict.to_list
  |> list.sort(fn(a, b) { int.compare(b.1, a.1) })
  |> list.take(k)
  |> list.map(fn(pair) { pair.0 })
}

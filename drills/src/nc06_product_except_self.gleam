import gleam/list

pub fn product_except_self(nums: List(Int)) -> List(Int) {
  let n = list.length(nums)
  let prefixes = [
    1,
    ..list.take(list.scan(nums, 1, fn(acc, x) { acc * x }), n - 1)
  ]
  let suffixes =
    list.reverse(nums)
    |> list.scan(1, fn(acc, x) { acc * x })
    |> list.take(n - 1)
    |> fn(scanned) { [1, ..scanned] }
    |> list.reverse
  list.map2(prefixes, suffixes, fn(prefix, suffix) { prefix * suffix })
}

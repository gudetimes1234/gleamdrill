import gleam/list

pub fn permute(nums: List(Int)) -> List(List(Int)) {
  // Pick each element in turn as the first, then permute what is left. Removing
  // the chosen element from the remainder is what the "used" set does in an
  // array version \u{2014} here the remainder is simply a shorter list.
  case nums {
    [] -> [[]]
    _ ->
      list.index_map(nums, fn(value, i) { #(i, value) })
      |> list.flat_map(fn(chosen: #(Int, Int)) {
        let rest =
          list.index_map(nums, fn(value, i) { #(i, value) })
          |> list.filter(fn(other: #(Int, Int)) { other.0 != chosen.0 })
          |> list.map(fn(other: #(Int, Int)) { other.1 })

        list.map(permute(rest), fn(tail) { [chosen.1, ..tail] })
      })
  }
}

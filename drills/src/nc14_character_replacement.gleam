import gleam/dict
import gleam/int
import gleam/list
import gleam/option
import gleam/string

pub fn character_replacement(s: String, k: Int) -> Int {
  let #(_, _, best) =
    string.to_graphemes(s)
    |> list.fold(#(dict.new(), [], 0), fn(acc, g) {
      let #(counts, window, best) = acc
      let counts = dict.upsert(counts, g, fn(n) { option.unwrap(n, 0) + 1 })
      let window = list.append(window, [g])
      let #(counts, window) = shrink(counts, window, k)
      #(counts, window, int.max(best, list.length(window)))
    })
  best
}

fn shrink(
  counts: dict.Dict(String, Int),
  window: List(String),
  k: Int,
) -> #(dict.Dict(String, Int), List(String)) {
  let size = list.length(window)
  let max_count =
    dict.fold(counts, 0, fn(top, _, count) { int.max(top, count) })
  case size - max_count > k, window {
    True, [oldest, ..rest] ->
      shrink(
        dict.upsert(counts, oldest, fn(n) { option.unwrap(n, 1) - 1 }),
        rest,
        k,
      )
    _, _ -> #(counts, window)
  }
}

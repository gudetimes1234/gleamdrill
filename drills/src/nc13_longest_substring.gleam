import gleam/dict
import gleam/int
import gleam/list
import gleam/string

pub fn length_of_longest_substring(s: String) -> Int {
  let #(_, _, best) =
    string.to_graphemes(s)
    |> list.index_fold(#(dict.new(), 0, 0), fn(acc, g, i) {
      let #(last_seen, start, best) = acc
      let start = case dict.get(last_seen, g) {
        Ok(j) if j >= start -> j + 1
        _ -> start
      }
      #(dict.insert(last_seen, g, i), start, int.max(best, i - start + 1))
    })
  best
}

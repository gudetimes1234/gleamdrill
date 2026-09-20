import gleam/dict
import gleam/int
import gleam/list
import gleam/option
import gleam/string

pub fn group_anagrams(strs: List(String)) -> List(List(String)) {
  strs
  |> list.fold(dict.new(), fn(acc, s) {
    dict.upsert(acc, signature(s), fn(group) {
      case group {
        option.Some(members) -> [s, ..members]
        option.None -> [s]
      }
    })
  })
  |> dict.values
  |> list.map(list.reverse)
}

/// An "a1c2t1" tally rather than a sorted copy of the word. Same grouping, but
/// the cost is proportional to the alphabet used instead of the word length.
fn signature(word: String) -> String {
  string.to_graphemes(word)
  |> list.fold(dict.new(), fn(acc, g) {
    dict.upsert(acc, g, fn(n) { option.unwrap(n, 0) + 1 })
  })
  |> dict.to_list
  |> list.sort(fn(a, b) { string.compare(a.0, b.0) })
  |> list.map(fn(entry) { entry.0 <> int.to_string(entry.1) })
  |> string.concat
}

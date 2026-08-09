import gleam/dict
import gleam/list
import gleam/option
import gleam/string

pub fn is_anagram(s: String, t: String) -> Bool {
  counts(s) == counts(t)
}

fn counts(word: String) -> dict.Dict(String, Int) {
  string.to_graphemes(word)
  |> list.fold(dict.new(), fn(acc, g) {
    dict.upsert(acc, g, fn(n) { option.unwrap(n, 0) + 1 })
  })
}

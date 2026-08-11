import gleam/list
import gleam/string

pub fn is_anagram(s: String, t: String) -> Bool {
  sorted(s) == sorted(t)
}

/// Two words are anagrams exactly when their sorted letters match — no counts,
/// no dictionary, at the cost of O(n log n) instead of O(n).
fn sorted(word: String) -> List(String) {
  word
  |> string.to_graphemes
  |> list.sort(string.compare)
}

import gleam/dict.{type Dict}
import gleam/list
import gleam/result
import gleam/string

pub type WordDictionary {
  /// Words bucketed by length. A pattern can only match words of its own
  /// length, so that one check throws away most of the collection before any
  /// character is compared.
  WordDictionary(by_length: Dict(Int, List(String)))
}

pub fn new() -> WordDictionary {
  WordDictionary(dict.new())
}

pub fn add_word(store: WordDictionary, word: String) -> WordDictionary {
  let size = string.length(word)
  let bucket = result.unwrap(dict.get(store.by_length, size), [])
  WordDictionary(dict.insert(store.by_length, size, [word, ..bucket]))
}

/// No shared prefixes, so every candidate of the right length is compared
/// position by position. Slower than the trie on a large dictionary, and it
/// needs no tree \u{2014} which is the trade the trie is making.
pub fn search(store: WordDictionary, word: String) -> Bool {
  let pattern = string.to_graphemes(word)

  store.by_length
  |> dict.get(string.length(word))
  |> result.unwrap([])
  |> list.any(fn(candidate) {
    list.zip(pattern, string.to_graphemes(candidate))
    |> list.all(fn(pair: #(String, String)) {
      pair.0 == "." || pair.0 == pair.1
    })
  })
}

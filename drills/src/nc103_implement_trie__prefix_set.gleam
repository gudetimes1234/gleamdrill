import gleam/list
import gleam/set.{type Set}
import gleam/string

pub type Trie {
  /// Two sets: the whole words, and every prefix of every word. Both questions
  /// then answer in one lookup, at the cost of storing O(total letters) strings
  /// rather than sharing them \u{2014} which is precisely the memory a trie exists
  /// to save.
  Trie(words: Set(String), prefixes: Set(String))
}

/// The empty prefix is present from the start: it is the root, which a real
/// trie has whether or not anything has been inserted.
pub fn new() -> Trie {
  Trie(set.new(), set.from_list([""]))
}

pub fn insert(trie: Trie, word: String) -> Trie {
  Trie(
    set.insert(trie.words, word),
    list.fold(prefixes(word), trie.prefixes, set.insert),
  )
}

pub fn search(trie: Trie, word: String) -> Bool {
  set.contains(trie.words, word)
}

pub fn starts_with(trie: Trie, prefix: String) -> Bool {
  set.contains(trie.prefixes, prefix)
}

fn prefixes(word: String) -> List(String) {
  list.repeat(Nil, string.length(word) + 1)
  |> list.index_map(fn(_, size) { string.slice(word, 0, size) })
}

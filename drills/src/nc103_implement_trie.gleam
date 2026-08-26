import gleam/dict.{type Dict}
import gleam/result
import gleam/string

pub type Trie {
  /// One node per prefix; `terminal` marks the prefixes that are whole words.
  /// Without that flag "app" and "apple" are indistinguishable once both are
  /// stored, which is the entire difference between search and starts_with.
  Trie(children: Dict(String, Trie), terminal: Bool)
}

pub fn new() -> Trie {
  Trie(dict.new(), False)
}

pub fn insert(trie: Trie, word: String) -> Trie {
  add(trie, string.to_graphemes(word))
}

pub fn search(trie: Trie, word: String) -> Bool {
  case walk(trie, string.to_graphemes(word)) {
    Ok(node) -> node.terminal
    Error(Nil) -> False
  }
}

pub fn starts_with(trie: Trie, prefix: String) -> Bool {
  case walk(trie, string.to_graphemes(prefix)) {
    Ok(_) -> True
    Error(Nil) -> False
  }
}

fn add(trie: Trie, letters: List(String)) -> Trie {
  case letters {
    [] -> Trie(trie.children, True)
    [first, ..rest] -> {
      let child = result.unwrap(dict.get(trie.children, first), new())
      Trie(dict.insert(trie.children, first, add(child, rest)), trie.terminal)
    }
  }
}

fn walk(trie: Trie, letters: List(String)) -> Result(Trie, Nil) {
  case letters {
    [] -> Ok(trie)
    [first, ..rest] ->
      case dict.get(trie.children, first) {
        Ok(child) -> walk(child, rest)
        Error(Nil) -> Error(Nil)
      }
  }
}

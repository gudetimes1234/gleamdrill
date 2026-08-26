import gleam/dict.{type Dict}
import gleam/list
import gleam/result
import gleam/string

pub type WordDictionary {
  WordDictionary(children: Dict(String, WordDictionary), terminal: Bool)
}

pub fn new() -> WordDictionary {
  WordDictionary(dict.new(), False)
}

pub fn add_word(store: WordDictionary, word: String) -> WordDictionary {
  add(store, string.to_graphemes(word))
}

/// A dot has to try every child, which turns the lookup from a walk into a
/// search \u{2014} the trie is what keeps that search from being over every word,
/// because a branch that cannot match is abandoned at the first letter.
pub fn search(store: WordDictionary, word: String) -> Bool {
  matches(store, string.to_graphemes(word))
}

fn add(store: WordDictionary, letters: List(String)) -> WordDictionary {
  case letters {
    [] -> WordDictionary(store.children, True)
    [first, ..rest] -> {
      let child = result.unwrap(dict.get(store.children, first), new())
      WordDictionary(
        dict.insert(store.children, first, add(child, rest)),
        store.terminal,
      )
    }
  }
}

fn matches(store: WordDictionary, letters: List(String)) -> Bool {
  case letters {
    [] -> store.terminal
    [".", ..rest] ->
      list.any(dict.values(store.children), fn(child) { matches(child, rest) })
    [first, ..rest] ->
      case dict.get(store.children, first) {
        Ok(child) -> matches(child, rest)
        Error(Nil) -> False
      }
  }
}

import gleam/dict.{type Dict}
import gleam/list
import gleam/result
import gleam/set.{type Set}
import gleam/string

type Trie {
  Trie(children: Dict(String, Trie), word: String)
}

pub fn find_words(
  board: List(List(String)),
  words: List(String),
) -> List(String) {
  let grid =
    board
    |> list.index_map(fn(row, r) {
      list.index_map(row, fn(value, c) { #(#(r, c), value) })
    })
    |> list.flatten
    |> dict.from_list

  // One trie of all the words, walked *alongside* the board. Searching for each
  // word separately re-walks every shared prefix once per word; the trie walks
  // each prefix once and abandons a square the moment no word continues that
  // way, which is where nearly all the saving is.
  let trie = list.fold(words, Trie(dict.new(), ""), add)

  dict.keys(grid)
  |> list.fold(set.new(), fn(found, at) {
    walk(grid, at, trie, set.new(), found)
  })
  |> set.to_list
}

fn add(trie: Trie, word: String) -> Trie {
  insert(trie, string.to_graphemes(word), word)
}

fn insert(trie: Trie, letters: List(String), word: String) -> Trie {
  case letters {
    [] -> Trie(trie.children, word)
    [first, ..rest] -> {
      let child =
        result.unwrap(dict.get(trie.children, first), Trie(dict.new(), ""))
      Trie(
        dict.insert(trie.children, first, insert(child, rest, word)),
        trie.word,
      )
    }
  }
}

fn walk(
  grid: Dict(#(Int, Int), String),
  at: #(Int, Int),
  trie: Trie,
  used: Set(#(Int, Int)),
  found: Set(String),
) -> Set(String) {
  case set.contains(used, at), dict.get(grid, at) {
    True, _ -> found
    _, Error(Nil) -> found
    _, Ok(letter) ->
      case dict.get(trie.children, letter) {
        Error(Nil) -> found
        Ok(child) -> {
          let found = case child.word {
            "" -> found
            word -> set.insert(found, word)
          }
          let used = set.insert(used, at)
          list.fold(neighbours(at), found, fn(found, next) {
            walk(grid, next, child, used, found)
          })
        }
      }
  }
}

fn neighbours(at: #(Int, Int)) -> List(#(Int, Int)) {
  let #(r, c) = at
  [#(r - 1, c), #(r + 1, c), #(r, c - 1), #(r, c + 1)]
}

import gleam/dict.{type Dict}
import gleam/list
import gleam/set.{type Set}
import gleam/string

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

  // Word Search, once per word. Correct, and it redoes the search for every
  // shared prefix: a hundred words beginning "ab" each re-walk that "ab" from
  // every square. That repetition is exactly what the trie removes.
  list.filter(words, fn(word) {
    case string.to_graphemes(word) {
      [] -> False
      letters ->
        list.any(dict.keys(grid), fn(at) {
          exists(grid, at, letters, set.new())
        })
    }
  })
}

fn exists(
  grid: Dict(#(Int, Int), String),
  at: #(Int, Int),
  remaining: List(String),
  used: Set(#(Int, Int)),
) -> Bool {
  case remaining {
    [] -> True
    [letter, ..rest] ->
      case set.contains(used, at), dict.get(grid, at) {
        True, _ -> False
        _, Error(Nil) -> False
        _, Ok(value) ->
          case value == letter {
            False -> False
            True ->
              case rest {
                [] -> True
                _ -> {
                  let used = set.insert(used, at)
                  list.any(neighbours(at), fn(next) {
                    exists(grid, next, rest, used)
                  })
                }
              }
          }
      }
  }
}

fn neighbours(at: #(Int, Int)) -> List(#(Int, Int)) {
  let #(r, c) = at
  [#(r - 1, c), #(r + 1, c), #(r, c - 1), #(r, c + 1)]
}

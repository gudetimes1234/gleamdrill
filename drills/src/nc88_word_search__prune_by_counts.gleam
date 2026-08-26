import gleam/dict.{type Dict}
import gleam/list
import gleam/set.{type Set}
import gleam/string

pub fn exist(board: List(List(String)), word: String) -> Bool {
  let cells =
    board
    |> list.index_map(fn(row, r) {
      list.index_map(row, fn(value, c) { #(#(r, c), value) })
    })
    |> list.flatten
  let grid = dict.from_list(cells)
  let letters = string.to_graphemes(word)

  case letters {
    [] -> True
    _ -> {
      let board_letters =
        list.map(cells, fn(cell: #(#(Int, Int), String)) { cell.1 })

      // Two cheap checks before any searching. If the board does not hold
      // enough copies of some letter, no search can succeed. And searching from
      // whichever end of the word is rarer on the board starts from fewer
      // squares \u{2014} the branching factor at the root is what dominates.
      case enough_letters(letters, board_letters) {
        False -> False
        True -> {
          let ordered = case
            occurrences(board_letters, first_of(letters))
            <= occurrences(board_letters, last_of(letters))
          {
            True -> letters
            False -> list.reverse(letters)
          }
          list.any(cells, fn(cell: #(#(Int, Int), String)) {
            walk(grid, cell.0, ordered, set.new())
          })
        }
      }
    }
  }
}

fn enough_letters(needed: List(String), available: List(String)) -> Bool {
  list.unique(needed)
  |> list.all(fn(letter) {
    occurrences(needed, letter) <= occurrences(available, letter)
  })
}

fn occurrences(letters: List(String), letter: String) -> Int {
  list.count(letters, fn(other) { other == letter })
}

fn first_of(letters: List(String)) -> String {
  case letters {
    [first, ..] -> first
    [] -> ""
  }
}

fn last_of(letters: List(String)) -> String {
  first_of(list.reverse(letters))
}

fn walk(
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
            True -> {
              let used = set.insert(used, at)
              case rest {
                [] -> True
                _ ->
                  list.any(neighbours(at), fn(next) {
                    walk(grid, next, rest, used)
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

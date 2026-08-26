import gleam/list
import gleam/string
import solution

const rows = ["oaan", "etae", "ihkr", "iflv"]

fn board() -> List(List(String)) {
  list.map(rows, string.to_graphemes)
}

fn sorted(board: List(List(String)), words: List(String)) -> List(String) {
  list.sort(solution.find_words(board, words), string.compare)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "find_words(board, [oath, pea, eat, rain])",
      string.inspect(["eat", "oath"]),
      string.inspect(sorted(board(), ["oath", "pea", "eat", "rain"])),
    ),
    #(
      "find_words([[a, b], [c, d]], [abcb])",
      string.inspect([]),
      string.inspect(sorted([["a", "b"], ["c", "d"]], ["abcb"])),
    ),
    #(
      "find_words([[a]], [a])",
      string.inspect(["a"]),
      string.inspect(sorted([["a"]], ["a"])),
    ),
    #(
      "find_words(board, [])",
      string.inspect([]),
      string.inspect(sorted(board(), [])),
    ),
    #(
      "find_words([], [a])",
      string.inspect([]),
      string.inspect(sorted([], ["a"])),
    ),
  ]
}

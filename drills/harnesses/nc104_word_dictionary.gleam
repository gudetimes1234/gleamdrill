import gleam/list
import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  let store =
    list.fold(["bad", "dad", "mad"], solution.new(), solution.add_word)

  [
    #(
      "search(\"pad\")",
      string.inspect(False),
      string.inspect(solution.search(store, "pad")),
    ),
    #(
      "search(\"bad\")",
      string.inspect(True),
      string.inspect(solution.search(store, "bad")),
    ),
    #(
      "search(\".ad\")",
      string.inspect(True),
      string.inspect(solution.search(store, ".ad")),
    ),
    #(
      "search(\"b..\")",
      string.inspect(True),
      string.inspect(solution.search(store, "b..")),
    ),
    #(
      "search(\"...\")",
      string.inspect(True),
      string.inspect(solution.search(store, "...")),
    ),
    #(
      "search(\"b\") \u{2014} too short",
      string.inspect(False),
      string.inspect(solution.search(store, "b")),
    ),
    #(
      "search(\"....\") \u{2014} too long",
      string.inspect(False),
      string.inspect(solution.search(store, "....")),
    ),
  ]
}

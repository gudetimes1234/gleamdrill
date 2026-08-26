import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  let one = solution.insert(solution.new(), "apple")
  let two = solution.insert(one, "app")

  [
    #(
      "search(\"apple\") after inserting it",
      string.inspect(True),
      string.inspect(solution.search(one, "apple")),
    ),
    #(
      "search(\"app\") \u{2014} a prefix, not a word",
      string.inspect(False),
      string.inspect(solution.search(one, "app")),
    ),
    #(
      "starts_with(\"app\")",
      string.inspect(True),
      string.inspect(solution.starts_with(one, "app")),
    ),
    #(
      "search(\"app\") after inserting it too",
      string.inspect(True),
      string.inspect(solution.search(two, "app")),
    ),
    #(
      "search(\"\") on an empty trie",
      string.inspect(False),
      string.inspect(solution.search(solution.new(), "")),
    ),
    #(
      "starts_with(\"\") on an empty trie",
      string.inspect(True),
      string.inspect(solution.starts_with(solution.new(), "")),
    ),
    #(
      "starts_with(\"apz\")",
      string.inspect(False),
      string.inspect(solution.starts_with(two, "apz")),
    ),
  ]
}

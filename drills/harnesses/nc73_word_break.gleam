import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "word_break(\"leetcode\", [\"leet\", \"code\"])",
      string.inspect(True),
      string.inspect(solution.word_break("leetcode", ["leet", "code"])),
    ),
    #(
      "word_break(\"applepenapple\", [\"apple\", \"pen\"])",
      string.inspect(True),
      string.inspect(solution.word_break("applepenapple", ["apple", "pen"])),
    ),
    #(
      "word_break(\"catsandog\", [\"cats\", \"dog\", \"sand\", \"and\", \"cat\"])",
      string.inspect(False),
      string.inspect(
        solution.word_break("catsandog", ["cats", "dog", "sand", "and", "cat"]),
      ),
    ),
    #(
      "word_break(\"\", [\"a\"])",
      string.inspect(True),
      string.inspect(solution.word_break("", ["a"])),
    ),
    #(
      "word_break(\"a\", [])",
      string.inspect(False),
      string.inspect(solution.word_break("a", [])),
    ),
    #(
      "word_break(\"aaaaaaa\", [\"aaa\", \"aaaa\"])",
      string.inspect(True),
      string.inspect(solution.word_break("aaaaaaa", ["aaa", "aaaa"])),
    ),
  ]
}

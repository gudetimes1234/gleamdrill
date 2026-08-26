import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "is_interleave(\"aabcc\", \"dbbca\", \"aadbbcbcac\")",
      string.inspect(True),
      string.inspect(solution.is_interleave("aabcc", "dbbca", "aadbbcbcac")),
    ),
    #(
      "is_interleave(\"aabcc\", \"dbbca\", \"aadbbbaccc\")",
      string.inspect(False),
      string.inspect(solution.is_interleave("aabcc", "dbbca", "aadbbbaccc")),
    ),
    #(
      "is_interleave(\"\", \"\", \"\")",
      string.inspect(True),
      string.inspect(solution.is_interleave("", "", "")),
    ),
    #(
      "is_interleave(\"a\", \"\", \"a\")",
      string.inspect(True),
      string.inspect(solution.is_interleave("a", "", "a")),
    ),
    #(
      "is_interleave(\"\", \"b\", \"b\")",
      string.inspect(True),
      string.inspect(solution.is_interleave("", "b", "b")),
    ),
    #(
      "is_interleave(\"abc\", \"def\", \"adbecf\")",
      string.inspect(True),
      string.inspect(solution.is_interleave("abc", "def", "adbecf")),
    ),
  ]
}

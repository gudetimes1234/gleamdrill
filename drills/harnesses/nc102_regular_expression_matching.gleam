import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "is_match(\"aa\", \"a\")",
      string.inspect(False),
      string.inspect(solution.is_match("aa", "a")),
    ),
    #(
      "is_match(\"aa\", \"a*\")",
      string.inspect(True),
      string.inspect(solution.is_match("aa", "a*")),
    ),
    #(
      "is_match(\"ab\", \".*\")",
      string.inspect(True),
      string.inspect(solution.is_match("ab", ".*")),
    ),
    #(
      "is_match(\"aab\", \"c*a*b\")",
      string.inspect(True),
      string.inspect(solution.is_match("aab", "c*a*b")),
    ),
    #(
      "is_match(\"mississippi\", \"mis*is*p*.\")",
      string.inspect(False),
      string.inspect(solution.is_match("mississippi", "mis*is*p*.")),
    ),
    #(
      "is_match(\"\", \".*\")",
      string.inspect(True),
      string.inspect(solution.is_match("", ".*")),
    ),
    #(
      "is_match(\"\", \"\")",
      string.inspect(True),
      string.inspect(solution.is_match("", "")),
    ),
    #(
      "is_match(\"abc\", \"abc\")",
      string.inspect(True),
      string.inspect(solution.is_match("abc", "abc")),
    ),
  ]
}

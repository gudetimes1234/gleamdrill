import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "longest_common_subsequence(\"abcde\", \"ace\")",
      string.inspect(3),
      string.inspect(solution.longest_common_subsequence("abcde", "ace")),
    ),
    #(
      "longest_common_subsequence(\"abc\", \"abc\")",
      string.inspect(3),
      string.inspect(solution.longest_common_subsequence("abc", "abc")),
    ),
    #(
      "longest_common_subsequence(\"abc\", \"def\")",
      string.inspect(0),
      string.inspect(solution.longest_common_subsequence("abc", "def")),
    ),
    #(
      "longest_common_subsequence(\"\", \"abc\")",
      string.inspect(0),
      string.inspect(solution.longest_common_subsequence("", "abc")),
    ),
    #(
      "longest_common_subsequence(\"bsbininm\", \"jmjkbkjkv\")",
      string.inspect(1),
      string.inspect(solution.longest_common_subsequence(
        "bsbininm",
        "jmjkbkjkv",
      )),
    ),
    #(
      "longest_common_subsequence(\"ezupkr\", \"ubmrapg\")",
      string.inspect(2),
      string.inspect(solution.longest_common_subsequence("ezupkr", "ubmrapg")),
    ),
  ]
}

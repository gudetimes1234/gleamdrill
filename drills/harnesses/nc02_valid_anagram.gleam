import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "is_anagram(\"anagram\", \"nagaram\")",
      string.inspect(True),
      string.inspect(solution.is_anagram("anagram", "nagaram")),
    ),
    #(
      "is_anagram(\"rat\", \"car\")",
      string.inspect(False),
      string.inspect(solution.is_anagram("rat", "car")),
    ),
    #(
      "is_anagram(\"\", \"\")",
      string.inspect(True),
      string.inspect(solution.is_anagram("", "")),
    ),
    #(
      "is_anagram(\"a\", \"ab\")",
      string.inspect(False),
      string.inspect(solution.is_anagram("a", "ab")),
    ),
  ]
}

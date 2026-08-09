import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "is_palindrome(\"A man, a plan, a canal: Panama\")",
      string.inspect(True),
      string.inspect(solution.is_palindrome("A man, a plan, a canal: Panama")),
    ),
    #(
      "is_palindrome(\"race a car\")",
      string.inspect(False),
      string.inspect(solution.is_palindrome("race a car")),
    ),
    #(
      "is_palindrome(\" \")",
      string.inspect(True),
      string.inspect(solution.is_palindrome(" ")),
    ),
    #(
      "is_palindrome(\"0P\")",
      string.inspect(False),
      string.inspect(solution.is_palindrome("0P")),
    ),
  ]
}

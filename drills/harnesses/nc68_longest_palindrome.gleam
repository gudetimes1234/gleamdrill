import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "longest_palindrome(\"cbbd\")",
      string.inspect("bb"),
      string.inspect(solution.longest_palindrome("cbbd")),
    ),
    #(
      "longest_palindrome(\"a\")",
      string.inspect("a"),
      string.inspect(solution.longest_palindrome("a")),
    ),
    #(
      "longest_palindrome(\"\")",
      string.inspect(""),
      string.inspect(solution.longest_palindrome("")),
    ),
    #(
      "longest_palindrome(\"forgeeksskeegfor\")",
      string.inspect("geeksskeeg"),
      string.inspect(solution.longest_palindrome("forgeeksskeegfor")),
    ),
    #(
      "longest_palindrome(\"aaaa\")",
      string.inspect("aaaa"),
      string.inspect(solution.longest_palindrome("aaaa")),
    ),
    #(
      "longest_palindrome(\"racecar\")",
      string.inspect("racecar"),
      string.inspect(solution.longest_palindrome("racecar")),
    ),
    #(
      "longest_palindrome(\"abb\")",
      string.inspect("bb"),
      string.inspect(solution.longest_palindrome("abb")),
    ),
  ]
}

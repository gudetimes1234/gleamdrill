import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "strip_comment(\"# hello\")",
      string.inspect("hello"),
      string.inspect(solution.strip_comment("# hello")),
    ),
    #(
      "strip_comment(\"code\")",
      string.inspect("code"),
      string.inspect(solution.strip_comment("code")),
    ),
    #(
      "initials(\"ada lovelace\")",
      string.inspect("AL"),
      string.inspect(solution.initials("ada lovelace")),
    ),
    #(
      "initials(\"grace brewster murray hopper\")",
      string.inspect("GBMH"),
      string.inspect(solution.initials("grace brewster murray hopper")),
    ),
  ]
}

import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "slug(\"  Hello   Brave World \")",
      string.inspect("hello-brave-world"),
      string.inspect(solution.slug("  Hello   Brave World ")),
    ),
    #("slug(\"Gleam\")", string.inspect("gleam"), string.inspect(solution.slug("Gleam"))),
    #("slug(\"\")", string.inspect(""), string.inspect(solution.slug(""))),
  ]
}

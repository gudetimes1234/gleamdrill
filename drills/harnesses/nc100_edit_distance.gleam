import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "min_distance(\"horse\", \"ros\")",
      string.inspect(3),
      string.inspect(solution.min_distance("horse", "ros")),
    ),
    #(
      "min_distance(\"intention\", \"execution\")",
      string.inspect(5),
      string.inspect(solution.min_distance("intention", "execution")),
    ),
    #(
      "min_distance(\"\", \"abc\")",
      string.inspect(3),
      string.inspect(solution.min_distance("", "abc")),
    ),
    #(
      "min_distance(\"abc\", \"\")",
      string.inspect(3),
      string.inspect(solution.min_distance("abc", "")),
    ),
    #(
      "min_distance(\"abc\", \"abc\")",
      string.inspect(0),
      string.inspect(solution.min_distance("abc", "abc")),
    ),
    #(
      "min_distance(\"kitten\", \"sitting\")",
      string.inspect(3),
      string.inspect(solution.min_distance("kitten", "sitting")),
    ),
  ]
}

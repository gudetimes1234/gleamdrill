import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "partition_labels(\"ababcbacadefegdehijhklij\")",
      string.inspect([9, 7, 8]),
      string.inspect(solution.partition_labels("ababcbacadefegdehijhklij")),
    ),
    #(
      "partition_labels(\"eccbbbbdec\")",
      string.inspect([10]),
      string.inspect(solution.partition_labels("eccbbbbdec")),
    ),
    #(
      "partition_labels(\"a\")",
      string.inspect([1]),
      string.inspect(solution.partition_labels("a")),
    ),
    #(
      "partition_labels(\"\")",
      string.inspect([]),
      string.inspect(solution.partition_labels("")),
    ),
    #(
      "partition_labels(\"abc\")",
      string.inspect([1, 1, 1]),
      string.inspect(solution.partition_labels("abc")),
    ),
  ]
}

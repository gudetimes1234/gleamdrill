import gleam/list
import gleam/string
import solution

/// The outer order is free; the order of pieces within a partition is the
/// answer, so only the outer list is sorted.
fn sorted(s: String) -> List(String) {
  solution.partition(s)
  |> list.map(fn(pieces) { string.join(pieces, ",") })
  |> list.sort(string.compare)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "partition(\"aab\")",
      string.inspect(["a,a,b", "aa,b"]),
      string.inspect(sorted("aab")),
    ),
    #("partition(\"a\")", string.inspect(["a"]), string.inspect(sorted("a"))),
    #("partition(\"\")", string.inspect([""]), string.inspect(sorted(""))),
    #(
      "partition(\"aba\")",
      string.inspect(["a,b,a", "aba"]),
      string.inspect(sorted("aba")),
    ),
    #(
      "partition(\"abc\")",
      string.inspect(["a,b,c"]),
      string.inspect(sorted("abc")),
    ),
  ]
}

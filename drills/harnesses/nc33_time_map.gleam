import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  let store =
    solution.new()
    |> solution.set("foo", "bar", 1)

  let later = solution.set(store, "foo", "bar2", 4)

  [
    #(
      "get(\"foo\", 1) after set at 1",
      string.inspect("bar"),
      string.inspect(solution.get(store, "foo", 1)),
    ),
    #(
      "get(\"foo\", 3) with only the value at 1",
      string.inspect("bar"),
      string.inspect(solution.get(store, "foo", 3)),
    ),
    #(
      "get(\"foo\", 4) after set at 4",
      string.inspect("bar2"),
      string.inspect(solution.get(later, "foo", 4)),
    ),
    #(
      "get(\"foo\", 5) after set at 4",
      string.inspect("bar2"),
      string.inspect(solution.get(later, "foo", 5)),
    ),
    #(
      "get(\"foo\", 3) still sees the older value",
      string.inspect("bar"),
      string.inspect(solution.get(later, "foo", 3)),
    ),
    #(
      "get(\"foo\", 0) before anything was set",
      string.inspect(""),
      string.inspect(solution.get(later, "foo", 0)),
    ),
    #(
      "get(\"missing\", 1)",
      string.inspect(""),
      string.inspect(solution.get(later, "missing", 1)),
    ),
  ]
}

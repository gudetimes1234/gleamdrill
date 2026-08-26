import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  let store =
    solution.new()
    |> solution.add(#(3, 10))
    |> solution.add(#(11, 2))
    |> solution.add(#(3, 2))

  let doubled = solution.add(store, #(11, 2))

  [
    #(
      "count(#(11, 10)) with one of each corner",
      string.inspect(1),
      string.inspect(solution.count(store, #(11, 10))),
    ),
    #(
      "count(#(14, 8)) \u{2014} no square",
      string.inspect(0),
      string.inspect(solution.count(store, #(14, 8))),
    ),
    #(
      "count(#(11, 10)) after adding #(11, 2) twice",
      string.inspect(2),
      string.inspect(solution.count(doubled, #(11, 10))),
    ),
    #(
      "count on an empty store",
      string.inspect(0),
      string.inspect(solution.count(solution.new(), #(0, 0))),
    ),
    #(
      "count(#(0, 0)) on the unit square",
      string.inspect(1),
      string.inspect(
        solution.new()
        |> solution.add(#(0, 1))
        |> solution.add(#(1, 0))
        |> solution.add(#(1, 1))
        |> solution.count(#(0, 0)),
      ),
    ),
  ]
}

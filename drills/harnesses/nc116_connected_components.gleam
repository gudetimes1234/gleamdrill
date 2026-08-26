import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "count_components(5, [#(0,1), #(1,2), #(3,4)])",
      string.inspect(2),
      string.inspect(solution.count_components(5, [#(0, 1), #(1, 2), #(3, 4)])),
    ),
    #(
      "count_components(5, [#(0,1), #(1,2), #(2,3), #(3,4)])",
      string.inspect(1),
      string.inspect(
        solution.count_components(5, [#(0, 1), #(1, 2), #(2, 3), #(3, 4)]),
      ),
    ),
    #(
      "count_components(3, [])",
      string.inspect(3),
      string.inspect(solution.count_components(3, [])),
    ),
    #(
      "count_components(0, [])",
      string.inspect(0),
      string.inspect(solution.count_components(0, [])),
    ),
    #(
      "count_components(1, [])",
      string.inspect(1),
      string.inspect(solution.count_components(1, [])),
    ),
    #(
      "count_components(4, [#(0,1), #(1,0)]) — a repeated edge merges once",
      string.inspect(3),
      string.inspect(solution.count_components(4, [#(0, 1), #(1, 0)])),
    ),
  ]
}

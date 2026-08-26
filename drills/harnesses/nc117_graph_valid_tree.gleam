import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "valid_tree(5, [#(0,1), #(0,2), #(0,3), #(1,4)])",
      string.inspect(True),
      string.inspect(
        solution.valid_tree(5, [#(0, 1), #(0, 2), #(0, 3), #(1, 4)]),
      ),
    ),
    #(
      "valid_tree(5, [#(0,1), #(1,2), #(2,3), #(1,3), #(1,4)])",
      string.inspect(False),
      string.inspect(
        solution.valid_tree(5, [#(0, 1), #(1, 2), #(2, 3), #(1, 3), #(1, 4)]),
      ),
    ),
    #(
      "valid_tree(1, [])",
      string.inspect(True),
      string.inspect(solution.valid_tree(1, [])),
    ),
    #(
      "valid_tree(0, [])",
      string.inspect(True),
      string.inspect(solution.valid_tree(0, [])),
    ),
    #(
      "valid_tree(2, []) — disconnected",
      string.inspect(False),
      string.inspect(solution.valid_tree(2, [])),
    ),
    #(
      "valid_tree(4, [#(0,1), #(2,3)]) — two trees, not one",
      string.inspect(False),
      string.inspect(solution.valid_tree(4, [#(0, 1), #(2, 3)])),
    ),
  ]
}

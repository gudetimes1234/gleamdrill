import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "copy_random_list(each node points at the next)",
      string.inspect([#(7, 1), #(13, -1)]),
      string.inspect(
        solution.copy_random_list([#(100, 7, 200), #(200, 13, -1)]),
      ),
    ),
    #(
      "copy_random_list(a node pointing at itself)",
      string.inspect([#(1, 0)]),
      string.inspect(solution.copy_random_list([#(9, 1, 9)])),
    ),
    #(
      "copy_random_list(a forward link to a node not yet seen)",
      string.inspect([#(1, 2), #(2, -1), #(3, 0)]),
      string.inspect(
        solution.copy_random_list([#(5, 1, 7), #(6, 2, -1), #(7, 3, 5)]),
      ),
    ),
    #(
      "copy_random_list([])",
      string.inspect([]),
      string.inspect(solution.copy_random_list([])),
    ),
  ]
}

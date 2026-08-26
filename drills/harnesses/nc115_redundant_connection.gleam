import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "find_redundant_connection([#(1,2), #(1,3), #(2,3)])",
      string.inspect(#(2, 3)),
      string.inspect(
        solution.find_redundant_connection([#(1, 2), #(1, 3), #(2, 3)]),
      ),
    ),
    #(
      "find_redundant_connection([#(1,2), #(2,3), #(3,4), #(1,4), #(1,5)])",
      string.inspect(#(1, 4)),
      string.inspect(
        solution.find_redundant_connection([
          #(1, 2),
          #(2, 3),
          #(3, 4),
          #(1, 4),
          #(1, 5),
        ]),
      ),
    ),
    #(
      "find_redundant_connection([#(1,2), #(2,1)])",
      string.inspect(#(2, 1)),
      string.inspect(solution.find_redundant_connection([#(1, 2), #(2, 1)])),
    ),
  ]
}

import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "can_complete_circuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])",
      string.inspect(3),
      string.inspect(
        solution.can_complete_circuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]),
      ),
    ),
    #(
      "can_complete_circuit([2, 3, 4], [3, 4, 3])",
      string.inspect(-1),
      string.inspect(solution.can_complete_circuit([2, 3, 4], [3, 4, 3])),
    ),
    #(
      "can_complete_circuit([5], [4])",
      string.inspect(0),
      string.inspect(solution.can_complete_circuit([5], [4])),
    ),
    #(
      "can_complete_circuit([1, 2], [2, 1])",
      string.inspect(1),
      string.inspect(solution.can_complete_circuit([1, 2], [2, 1])),
    ),
    #(
      "can_complete_circuit([], [])",
      string.inspect(-1),
      string.inspect(solution.can_complete_circuit([], [])),
    ),
    #(
      "can_complete_circuit([3, 1, 1], [1, 2, 2])",
      string.inspect(0),
      string.inspect(solution.can_complete_circuit([3, 1, 1], [1, 2, 2])),
    ),
  ]
}

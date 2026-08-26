import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "plus_one([1, 2, 3])",
      string.inspect([1, 2, 4]),
      string.inspect(solution.plus_one([1, 2, 3])),
    ),
    #(
      "plus_one([4, 3, 2, 1])",
      string.inspect([4, 3, 2, 2]),
      string.inspect(solution.plus_one([4, 3, 2, 1])),
    ),
    #(
      "plus_one([9])",
      string.inspect([1, 0]),
      string.inspect(solution.plus_one([9])),
    ),
    #(
      "plus_one([9, 9])",
      string.inspect([1, 0, 0]),
      string.inspect(solution.plus_one([9, 9])),
    ),
    #(
      "plus_one([0])",
      string.inspect([1]),
      string.inspect(solution.plus_one([0])),
    ),
    #(
      "plus_one([1, 9, 9])",
      string.inspect([2, 0, 0]),
      string.inspect(solution.plus_one([1, 9, 9])),
    ),
  ]
}

import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "add_two_numbers([2, 4, 3], [5, 6, 4]) — 342 + 465",
      string.inspect([7, 0, 8]),
      string.inspect(solution.add_two_numbers([2, 4, 3], [5, 6, 4])),
    ),
    #(
      "add_two_numbers([0], [0])",
      string.inspect([0]),
      string.inspect(solution.add_two_numbers([0], [0])),
    ),
    #(
      "add_two_numbers([9, 9, 9], [1]) — the carry runs all the way",
      string.inspect([0, 0, 0, 1]),
      string.inspect(solution.add_two_numbers([9, 9, 9], [1])),
    ),
    #(
      "add_two_numbers([5], [5]) — the carry outlives both",
      string.inspect([0, 1]),
      string.inspect(solution.add_two_numbers([5], [5])),
    ),
    #(
      "add_two_numbers([1, 2], [3, 4, 5]) — different lengths",
      string.inspect([4, 6, 5]),
      string.inspect(solution.add_two_numbers([1, 2], [3, 4, 5])),
    ),
  ]
}

import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "daily_temperatures([73, 74, 75, 71, 69, 72, 76, 73])",
      string.inspect([1, 1, 4, 2, 1, 1, 0, 0]),
      string.inspect(
        solution.daily_temperatures([73, 74, 75, 71, 69, 72, 76, 73]),
      ),
    ),
    #(
      "daily_temperatures([30, 40, 50, 60])",
      string.inspect([1, 1, 1, 0]),
      string.inspect(solution.daily_temperatures([30, 40, 50, 60])),
    ),
    #(
      "daily_temperatures([30, 30, 30])",
      string.inspect([0, 0, 0]),
      string.inspect(solution.daily_temperatures([30, 30, 30])),
    ),
  ]
}

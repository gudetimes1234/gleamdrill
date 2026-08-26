import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "car_fleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3])",
      string.inspect(3),
      string.inspect(solution.car_fleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3])),
    ),
    #(
      "car_fleet(10, [3], [3])",
      string.inspect(1),
      string.inspect(solution.car_fleet(10, [3], [3])),
    ),
    #(
      "car_fleet(100, [0, 2, 4], [4, 2, 1])",
      string.inspect(1),
      string.inspect(solution.car_fleet(100, [0, 2, 4], [4, 2, 1])),
    ),
    #(
      "car_fleet(10, [6, 8], [3, 2])",
      string.inspect(2),
      string.inspect(solution.car_fleet(10, [6, 8], [3, 2])),
    ),
    #(
      "car_fleet(10, [], [])",
      string.inspect(0),
      string.inspect(solution.car_fleet(10, [], [])),
    ),
    #(
      "car_fleet(10, [0, 4, 2], [2, 1, 3])",
      string.inspect(1),
      string.inspect(solution.car_fleet(10, [0, 4, 2], [2, 1, 3])),
    ),
  ]
}

import gleam/list
import gleam/string
import solution

/// Feeds values in and reports the median after each, which is the sequence the
/// original interface produces.
fn medians(values: List(Int)) -> List(Float) {
  let #(_, answers) =
    list.fold(values, #(solution.new(), []), fn(state, value) {
      let #(finder, answers) = state
      let finder = solution.add_num(finder, value)
      #(finder, [solution.find_median(finder), ..answers])
    })
  list.reverse(answers)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "medians of 1, 2, 3",
      string.inspect([1.0, 1.5, 2.0]),
      string.inspect(medians([1, 2, 3])),
    ),
    #(
      "medians of 1, 2, 3, 4, 5",
      string.inspect([1.0, 1.5, 2.0, 2.5, 3.0]),
      string.inspect(medians([1, 2, 3, 4, 5])),
    ),
    #(
      "medians arriving out of order",
      string.inspect([5.0, 3.0, 2.0, 2.5]),
      string.inspect(medians([5, 1, 2, 3])),
    ),
    #(
      "medians of negatives",
      string.inspect([-1.0, -1.5]),
      string.inspect(medians([-1, -2])),
    ),
    #(
      "median before anything is added",
      string.inspect(0.0),
      string.inspect(solution.find_median(solution.new())),
    ),
  ]
}

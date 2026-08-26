import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "can_finish(2, [#(1, 0)])",
      string.inspect(True),
      string.inspect(solution.can_finish(2, [#(1, 0)])),
    ),
    #(
      "can_finish(2, [#(1, 0), #(0, 1)])",
      string.inspect(False),
      string.inspect(solution.can_finish(2, [#(1, 0), #(0, 1)])),
    ),
    #(
      "can_finish(1, [])",
      string.inspect(True),
      string.inspect(solution.can_finish(1, [])),
    ),
    #(
      "can_finish(0, [])",
      string.inspect(True),
      string.inspect(solution.can_finish(0, [])),
    ),
    #(
      "can_finish(4, [#(1,0), #(2,1), #(3,2)])",
      string.inspect(True),
      string.inspect(solution.can_finish(4, [#(1, 0), #(2, 1), #(3, 2)])),
    ),
    #(
      "can_finish(3, [#(0,1), #(1,2), #(2,0)])",
      string.inspect(False),
      string.inspect(solution.can_finish(3, [#(0, 1), #(1, 2), #(2, 0)])),
    ),
  ]
}

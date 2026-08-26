import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "can_attend_meetings([#(0, 30), #(5, 10), #(15, 20)])",
      string.inspect(False),
      string.inspect(
        solution.can_attend_meetings([
          #(0, 30),
          #(5, 10),
          #(15, 20),
        ]),
      ),
    ),
    #(
      "can_attend_meetings([#(7, 10), #(2, 4)])",
      string.inspect(True),
      string.inspect(solution.can_attend_meetings([#(7, 10), #(2, 4)])),
    ),
    #(
      "can_attend_meetings([])",
      string.inspect(True),
      string.inspect(solution.can_attend_meetings([])),
    ),
    #(
      "can_attend_meetings([#(1, 5)])",
      string.inspect(True),
      string.inspect(solution.can_attend_meetings([#(1, 5)])),
    ),
    #(
      "can_attend_meetings([#(1, 5), #(5, 10)])",
      string.inspect(True),
      string.inspect(solution.can_attend_meetings([#(1, 5), #(5, 10)])),
    ),
    #(
      "can_attend_meetings([#(5, 10), #(1, 6)])",
      string.inspect(False),
      string.inspect(solution.can_attend_meetings([#(5, 10), #(1, 6)])),
    ),
  ]
}

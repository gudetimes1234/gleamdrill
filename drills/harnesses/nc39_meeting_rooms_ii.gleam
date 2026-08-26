import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "min_meeting_rooms([#(0, 30), #(5, 10), #(15, 20)])",
      string.inspect(2),
      string.inspect(
        solution.min_meeting_rooms([
          #(0, 30),
          #(5, 10),
          #(15, 20),
        ]),
      ),
    ),
    #(
      "min_meeting_rooms([#(7, 10), #(2, 4)])",
      string.inspect(1),
      string.inspect(solution.min_meeting_rooms([#(7, 10), #(2, 4)])),
    ),
    #(
      "min_meeting_rooms([])",
      string.inspect(0),
      string.inspect(solution.min_meeting_rooms([])),
    ),
    #(
      "min_meeting_rooms([#(1, 5), #(5, 10)])",
      string.inspect(1),
      string.inspect(solution.min_meeting_rooms([#(1, 5), #(5, 10)])),
    ),
    #(
      "min_meeting_rooms(six overlapping meetings)",
      string.inspect(4),
      string.inspect(
        solution.min_meeting_rooms([
          #(1, 10),
          #(2, 7),
          #(3, 19),
          #(8, 12),
          #(10, 20),
          #(11, 30),
        ]),
      ),
    ),
  ]
}

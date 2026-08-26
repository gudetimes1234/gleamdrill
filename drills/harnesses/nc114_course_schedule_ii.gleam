import gleam/list
import gleam/string
import solution

/// Any valid order is acceptable, so the harness checks the order rather than
/// comparing it: every course appears exactly once, and every prerequisite
/// comes before the course that needs it.
fn valid(num_courses: Int, prerequisites: List(#(Int, Int))) -> Bool {
  let order = solution.find_order(num_courses, prerequisites)
  let positions = list.index_map(order, fn(course, i) { #(course, i) })

  list.length(order) == num_courses
  && list.length(list.unique(order)) == num_courses
  && list.all(prerequisites, fn(pair: #(Int, Int)) {
    case position(positions, pair.1), position(positions, pair.0) {
      Ok(before), Ok(after) -> before < after
      _, _ -> False
    }
  })
}

fn position(positions: List(#(Int, Int)), course: Int) -> Result(Int, Nil) {
  case list.find(positions, fn(pair: #(Int, Int)) { pair.0 == course }) {
    Ok(#(_, i)) -> Ok(i)
    Error(Nil) -> Error(Nil)
  }
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "find_order(2, [#(1, 0)]) is a valid order",
      string.inspect(True),
      string.inspect(valid(2, [#(1, 0)])),
    ),
    #(
      "find_order(4, [#(1,0), #(2,0), #(3,1), #(3,2)]) is a valid order",
      string.inspect(True),
      string.inspect(valid(4, [#(1, 0), #(2, 0), #(3, 1), #(3, 2)])),
    ),
    #(
      "find_order(1, []) is a valid order",
      string.inspect(True),
      string.inspect(valid(1, [])),
    ),
    #(
      "find_order(2, [#(0,1), #(1,0)]) \u{2014} a cycle, so no order",
      string.inspect([]),
      string.inspect(solution.find_order(2, [#(0, 1), #(1, 0)])),
    ),
    #(
      "find_order(3, []) covers every course",
      string.inspect(3),
      string.inspect(list.length(solution.find_order(3, []))),
    ),
    #(
      "find_order(0, [])",
      string.inspect([]),
      string.inspect(solution.find_order(0, [])),
    ),
  ]
}

import gleam/int
import gleam/list
import gleam/order

pub fn min_meeting_rooms(intervals: List(#(Int, Int))) -> Int {
  // Rooms needed is the most meetings ever running at once, so the meetings
  // themselves stop mattering \u{2014} only their edges do. Walk the edges in time
  // order and watch how high the count gets.
  intervals
  |> list.flat_map(fn(i) { [#(i.0, 1), #(i.1, -1)] })
  |> list.sort(fn(a, b) {
    // A room freed at the same moment another meeting starts can be reused, so
    // closes come before opens here \u{2014} the opposite of merging intervals.
    case int.compare(a.0, b.0) {
      order.Eq -> int.compare(a.1, b.1)
      other -> other
    }
  })
  |> list.fold(#(0, 0), fn(state, edge) {
    let depth = state.0 + edge.1
    #(depth, int.max(state.1, depth))
  })
  |> fn(state) { state.1 }
}

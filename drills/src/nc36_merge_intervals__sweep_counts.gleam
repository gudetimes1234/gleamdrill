import gleam/int
import gleam/list
import gleam/order

pub fn merge(intervals: List(#(Int, Int))) -> List(#(Int, Int)) {
  // Forget the intervals and keep only their edges: +1 where one opens, -1
  // where one closes. A merged interval runs from the edge that lifts the
  // running count off zero to the edge that drops it back.
  intervals
  |> list.flat_map(fn(i) { [#(i.0, 1), #(i.1, -1)] })
  |> list.sort(fn(a, b) {
    // Opens before closes at the same coordinate, so touching intervals join.
    case int.compare(a.0, b.0) {
      order.Eq -> int.compare(b.1, a.1)
      other -> other
    }
  })
  |> list.fold(#([], 0, 0), fn(state, edge) {
    let #(done, depth, start) = state
    let depth_after = depth + edge.1
    case depth, depth_after {
      0, _ -> #(done, depth_after, edge.0)
      _, 0 -> #([#(start, edge.0), ..done], 0, start)
      _, _ -> #(done, depth_after, start)
    }
  })
  |> fn(state) { list.reverse(state.0) }
}

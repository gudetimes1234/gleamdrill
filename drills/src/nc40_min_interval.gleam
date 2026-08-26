import gleam/int
import gleam/list

pub fn min_interval(
  intervals: List(#(Int, Int)),
  queries: List(Int),
) -> List(Int) {
  list.map(queries, fn(query) {
    intervals
    |> list.filter(fn(i) { i.0 <= query && query <= i.1 })
    |> list.map(fn(i) { i.1 - i.0 + 1 })
    |> list.reduce(int.min)
    |> fn(smallest) {
      case smallest {
        Ok(length) -> length
        Error(Nil) -> -1
      }
    }
  })
}

import gleam/int
import gleam/list

pub fn min_interval(
  intervals: List(#(Int, Int)),
  queries: List(Int),
) -> List(Int) {
  // Answer each query once, and never revisit it. Taking the intervals shortest
  // first means the first interval to cover a query is already its answer, so
  // every query leaves the pool the moment it is settled and the pool only ever
  // shrinks.
  let numbered = list.index_map(queries, fn(query, index) { #(index, query) })

  let #(answered, unanswered) =
    intervals
    |> list.sort(fn(a, b) { int.compare(a.1 - a.0, b.1 - b.0) })
    |> list.fold(#([], numbered), fn(state, interval) {
      let #(answered, waiting) = state
      let #(covered, still_waiting) =
        list.partition(waiting, fn(entry) {
          interval.0 <= entry.1 && entry.1 <= interval.1
        })
      let length = interval.1 - interval.0 + 1
      #(
        list.append(
          answered,
          list.map(covered, fn(entry) { #(entry.0, length) }),
        ),
        still_waiting,
      )
    })

  let settled =
    list.append(answered, list.map(unanswered, fn(entry) { #(entry.0, -1) }))

  settled
  |> list.sort(fn(a, b) { int.compare(a.0, b.0) })
  |> list.map(fn(entry) { entry.1 })
}

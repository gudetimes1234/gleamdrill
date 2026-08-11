import gleam/list

/// No set: keep what has been accepted and ask that list directly. O(n²)
/// instead of O(n), but it needs nothing of the element type — and for a
/// handful of items it is the shorter, plainer code.
pub fn dedupe(items: List(a)) -> List(a) {
  list.fold(items, [], fn(kept, item) {
    case list.contains(kept, item) {
      True -> kept
      False -> [item, ..kept]
    }
  })
  |> list.reverse
}

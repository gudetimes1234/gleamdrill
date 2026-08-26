import gleam/list

pub fn dedupe(items: List(a)) -> List(a) {
  list.fold(items, [], fn(kept, item) {
    case list.contains(kept, item) {
      True -> kept
      False -> [item, ..kept]
    }
  })
  |> list.reverse
}

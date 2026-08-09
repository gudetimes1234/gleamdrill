import gleam/list
import gleam/set

pub fn dedupe(items: List(a)) -> List(a) {
  let #(kept, _) =
    list.fold(items, #([], set.new()), fn(acc, item) {
      let #(kept, seen) = acc
      case set.contains(seen, item) {
        True -> #(kept, seen)
        False -> #([item, ..kept], set.insert(seen, item))
      }
    })
  list.reverse(kept)
}

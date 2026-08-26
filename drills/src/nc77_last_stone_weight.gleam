import gleam/int
import gleam/list

pub fn last_stone_weight(stones: List(Int)) -> Int {
  smash(list.sort(stones, fn(a, b) { int.compare(b, a) }))
}

/// Always the two heaviest, so the collection has to give up its maximum over
/// and over \u{2014} which is what a heap is for. Kept sorted descending here, so the
/// two heaviest are the first two and the remainder goes back in order.
fn smash(descending: List(Int)) -> Int {
  case descending {
    [] -> 0
    [only] -> only
    [heaviest, next, ..rest] ->
      case heaviest - next {
        0 -> smash(rest)
        remainder ->
          smash(list.sort([remainder, ..rest], fn(a, b) { int.compare(b, a) }))
      }
  }
}

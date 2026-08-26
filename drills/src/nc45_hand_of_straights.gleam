import gleam/dict.{type Dict}
import gleam/int
import gleam/list

pub fn is_n_straight_hand(hand: List(Int), group_size: Int) -> Bool {
  case group_size <= 0 {
    True -> False
    False ->
      case list.length(hand) % group_size {
        0 -> {
          let counts =
            list.fold(hand, dict.new(), fn(acc, card) {
              dict.insert(acc, card, count(acc, card) + 1)
            })
          // The smallest card left has no smaller neighbour to hide behind, so
          // whatever group it belongs to must start with it. That removes all
          // choice, which is what makes the greedy correct.
          consume(counts, list.sort(list.unique(hand), int.compare), group_size)
        }
        _ -> False
      }
  }
}

fn consume(
  counts: Dict(Int, Int),
  ascending: List(Int),
  group_size: Int,
) -> Bool {
  case ascending {
    [] -> True
    [smallest, ..rest] ->
      case count(counts, smallest) {
        0 -> consume(counts, rest, group_size)
        copies ->
          case take_run(counts, smallest, group_size, copies) {
            Ok(counts) -> consume(counts, rest, group_size)
            Error(Nil) -> False
          }
      }
  }
}

/// Removes `copies` groups starting at `from`, all at once: every copy of the
/// smallest card needs its own group, and they all look identical.
fn take_run(
  counts: Dict(Int, Int),
  from: Int,
  remaining: Int,
  copies: Int,
) -> Result(Dict(Int, Int), Nil) {
  case remaining {
    0 -> Ok(counts)
    _ ->
      case count(counts, from) >= copies {
        False -> Error(Nil)
        True ->
          take_run(
            dict.insert(counts, from, count(counts, from) - copies),
            from + 1,
            remaining - 1,
            copies,
          )
      }
  }
}

fn count(counts: Dict(Int, Int), key: Int) -> Int {
  case dict.get(counts, key) {
    Ok(n) -> n
    Error(Nil) -> 0
  }
}

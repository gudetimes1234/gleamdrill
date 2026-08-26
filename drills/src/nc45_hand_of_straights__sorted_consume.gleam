import gleam/int
import gleam/list

pub fn is_n_straight_hand(hand: List(Int), group_size: Int) -> Bool {
  case group_size <= 0 {
    True -> False
    False ->
      case list.length(hand) % group_size {
        0 -> build(list.sort(hand, int.compare), group_size)
        _ -> False
      }
  }
}

/// No counts: sort, then peel one full run off the front at a time, removing
/// each card as it is used. Slower \u{2014} every removal is a list walk \u{2014} but the
/// only thing to believe is that a group must begin with the smallest card
/// left.
fn build(sorted: List(Int), group_size: Int) -> Bool {
  case sorted {
    [] -> True
    [smallest, ..] ->
      case peel(sorted, smallest, group_size) {
        Ok(remaining) -> build(remaining, group_size)
        Error(Nil) -> False
      }
  }
}

fn peel(
  sorted: List(Int),
  wanted: Int,
  remaining: Int,
) -> Result(List(Int), Nil) {
  case remaining {
    0 -> Ok(sorted)
    _ ->
      case list.contains(sorted, wanted) {
        False -> Error(Nil)
        True ->
          peel(remove_first(sorted, wanted, []), wanted + 1, remaining - 1)
      }
  }
}

fn remove_first(sorted: List(Int), wanted: Int, seen: List(Int)) -> List(Int) {
  case sorted {
    [] -> list.reverse(seen)
    [first, ..rest] ->
      case first == wanted {
        True -> list.append(list.reverse(seen), rest)
        False -> remove_first(rest, wanted, [first, ..seen])
      }
  }
}

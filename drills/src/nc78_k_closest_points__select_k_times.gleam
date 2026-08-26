import gleam/list

pub fn k_closest(points: List(#(Int, Int)), k: Int) -> List(#(Int, Int)) {
  take(points, k, [])
}

/// Pull the nearest point out k times rather than ordering everything. O(n\u{b7}k)
/// against a full sort's O(n log n), so it wins exactly when k is small \u{2014} which
/// is the same reason a bounded heap beats a sort on this problem.
fn take(
  points: List(#(Int, Int)),
  remaining: Int,
  taken: List(#(Int, Int)),
) -> List(#(Int, Int)) {
  case remaining <= 0, points {
    True, _ -> list.reverse(taken)
    _, [] -> list.reverse(taken)
    _, [first, ..] -> {
      let nearest =
        list.fold(points, first, fn(best, point) {
          case squared(point) < squared(best) {
            True -> point
            False -> best
          }
        })
      take(remove_first(points, nearest, []), remaining - 1, [nearest, ..taken])
    }
  }
}

fn squared(point: #(Int, Int)) -> Int {
  point.0 * point.0 + point.1 * point.1
}

fn remove_first(
  points: List(#(Int, Int)),
  wanted: #(Int, Int),
  seen: List(#(Int, Int)),
) -> List(#(Int, Int)) {
  case points {
    [] -> list.reverse(seen)
    [first, ..rest] ->
      case first == wanted {
        True -> list.append(list.reverse(seen), rest)
        False -> remove_first(rest, wanted, [first, ..seen])
      }
  }
}

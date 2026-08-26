import gleam/int
import gleam/list

pub fn min_eating_speed(piles: List(Int), h: Int) -> Int {
  search(piles, h, 1, list.fold(piles, 1, int.max))
}

/// The search space is the answer, not the input. Feasibility is monotone \u{2014}
/// if a speed finishes in time then so does every faster one \u{2014} which is
/// exactly the property halving needs.
fn search(piles: List(Int), h: Int, low: Int, high: Int) -> Int {
  case low >= high {
    True -> low
    False -> {
      let mid = { low + high } / 2
      case hours(piles, mid) <= h {
        True -> search(piles, h, low, mid)
        False -> search(piles, h, mid + 1, high)
      }
    }
  }
}

/// A pile never shares an hour with another, so each costs ceil(pile / speed).
fn hours(piles: List(Int), speed: Int) -> Int {
  list.fold(piles, 0, fn(total, pile) { total + { pile + speed - 1 } / speed })
}

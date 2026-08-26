import gleam/int
import gleam/list

pub fn min_eating_speed(piles: List(Int), h: Int) -> Int {
  climb(piles, h, 1, list.fold(piles, 1, int.max))
}

fn climb(piles: List(Int), h: Int, speed: Int, highest: Int) -> Int {
  case speed >= highest || hours(piles, speed) <= h {
    True -> speed
    False -> climb(piles, h, speed + 1, highest)
  }
}

fn hours(piles: List(Int), speed: Int) -> Int {
  list.fold(piles, 0, fn(total, pile) { total + { pile + speed - 1 } / speed })
}

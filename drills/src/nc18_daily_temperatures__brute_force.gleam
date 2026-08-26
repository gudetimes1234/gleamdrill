import gleam/list

pub fn daily_temperatures(temps: List(Int)) -> List(Int) {
  list.index_map(temps, fn(temp, i) {
    days_until_warmer(list.drop(temps, i + 1), temp, 1)
  })
}

fn days_until_warmer(later: List(Int), temp: Int, days: Int) -> Int {
  case later {
    [] -> 0
    [next, ..rest] ->
      case next > temp {
        True -> days
        False -> days_until_warmer(rest, temp, days + 1)
      }
  }
}

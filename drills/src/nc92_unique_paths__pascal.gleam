import gleam/list

pub fn unique_paths(m: Int, n: Int) -> Int {
  case m <= 0 || n <= 0 {
    True -> 0
    False -> {
      // Every path is exactly m\u{2212}1 downs and n\u{2212}1 rights in some order, so the
      // count is the number of ways to choose which of the m+n\u{2212}2 moves are
      // downs \u{2014} a binomial coefficient, and no grid at all. Multiplying and
      // dividing in step keeps every intermediate an exact integer.
      let downs = m - 1
      let total = m + n - 2
      list.index_map(list.repeat(Nil, downs), fn(_, i) { i + 1 })
      |> list.fold(1, fn(acc, i) { acc * { total - downs + i } / i })
    }
  }
}

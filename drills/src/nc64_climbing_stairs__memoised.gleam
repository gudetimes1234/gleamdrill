import gleam/dict.{type Dict}

pub fn climb_stairs(n: Int) -> Int {
  let #(answer, _) = ways(n, dict.new())
  answer
}

/// The same recurrence from the top down, with a cache carried through the
/// recursion. Slower and heavier than the rolling pair, but it is the shape you
/// reach for first when the recurrence is not obviously a straight line \u{2014} and
/// the memo is the whole difference between O(n) and O(2\u{207f}).
fn ways(n: Int, memo: Dict(Int, Int)) -> #(Int, Dict(Int, Int)) {
  case n <= 1 {
    True -> #(1, memo)
    False ->
      case dict.get(memo, n) {
        Ok(cached) -> #(cached, memo)
        Error(Nil) -> {
          let #(a, memo) = ways(n - 1, memo)
          let #(b, memo) = ways(n - 2, memo)
          #(a + b, dict.insert(memo, n, a + b))
        }
      }
  }
}

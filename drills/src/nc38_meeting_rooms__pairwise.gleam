import gleam/list

pub fn can_attend_meetings(intervals: List(#(Int, Int))) -> Bool {
  // Every pair, checked. Two intervals overlap when each starts before the
  // other ends \u{2014} the condition worth being able to write from memory, since
  // it is easier to get right than its negation.
  list.combination_pairs(intervals)
  |> list.all(fn(pair) {
    let #(a, b) = pair
    !{ a.0 < b.1 && b.0 < a.1 }
  })
}

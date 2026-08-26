import gleam/list

pub fn climb_stairs(n: Int) -> Int {
  // The last move was either one step or two, so the ways to reach step n are
  // the ways to reach n-1 plus the ways to reach n-2 \u{2014} Fibonacci with a
  // staircase painted on it. Only the last two values matter, so two variables
  // replace the whole table.
  let #(_, current) =
    list.fold(list.repeat(Nil, n), #(0, 1), fn(state, _) {
      let #(previous, current) = state
      #(current, previous + current)
    })
  current
}

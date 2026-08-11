import gleam/list

/// The same two answers straight from the standard library. Writing the
/// recursion by hand is how you learn the shape; reaching for these is what you
/// actually do afterwards.
pub fn length(items: List(a)) -> Int {
  list.length(items)
}

pub fn last(items: List(a)) -> Result(a, Nil) {
  list.last(items)
}

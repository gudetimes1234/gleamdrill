import gleam/list

pub fn reorder_list(values: List(Int)) -> List(Int) {
  // Three separate steps, each of which is its own drill: find the middle,
  // reverse the back half, then interleave. That decomposition is the whole
  // trick — none of the three needs to know about the others.
  let half = { list.length(values) + 1 } / 2
  let front = list.take(values, half)
  let back = list.reverse(list.drop(values, half))
  interleave(front, back)
}

fn interleave(front: List(Int), back: List(Int)) -> List(Int) {
  case front, back {
    [], rest -> rest
    rest, [] -> rest
    [a, ..a_rest], [b, ..b_rest] -> [a, b, ..interleave(a_rest, b_rest)]
  }
}

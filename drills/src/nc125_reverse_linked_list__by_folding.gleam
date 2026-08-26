import gleam/list

pub fn reverse_list(values: List(Int)) -> List(Int) {
  // The same accumulator, named by the standard library instead of written out.
  // Worth putting next to the hand-written loop: a left fold that prepends is
  // the definition of reversing, which is why list.reverse exists at all.
  list.fold(values, [], fn(reversed, value) { [value, ..reversed] })
}

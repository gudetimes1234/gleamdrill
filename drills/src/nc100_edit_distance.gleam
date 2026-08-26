import gleam/int
import gleam/list
import gleam/result
import gleam/string

pub fn min_distance(word1: String, word2: String) -> Int {
  let b = string.to_graphemes(word2)

  // Three edits, three neighbours in the table: replace comes from the
  // diagonal, delete from above, insert from the left. Equal characters cost
  // nothing and take the diagonal outright \u{2014} the whole algorithm is those
  // four lines. The first row and column are the cost of building a string from
  // nothing, which is its length.
  string.to_graphemes(word1)
  |> list.index_fold(first_row(list.length(b)), fn(previous, from_a, i) {
    row(previous, b, from_a, i + 1)
  })
  |> list.last
  |> result.unwrap(0)
}

fn first_row(width: Int) -> List(Int) {
  list.index_map(list.repeat(Nil, width + 1), fn(_, j) { j })
}

fn row(
  previous: List(Int),
  b: List(String),
  from_a: String,
  cost_so_far: Int,
) -> List(Int) {
  let #(_, built) =
    list.index_fold(b, #(cost_so_far, [cost_so_far]), fn(state, from_b, j) {
      let #(left, built) = state
      let diagonal = nth(previous, j)
      let above = nth(previous, j + 1)
      let here = case from_a == from_b {
        True -> diagonal
        False -> 1 + int.min(diagonal, int.min(above, left))
      }
      #(here, [here, ..built])
    })
  list.reverse(built)
}

fn nth(values: List(Int), index: Int) -> Int {
  values |> list.drop(index) |> list.first |> result.unwrap(0)
}

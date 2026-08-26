import gleam/list

pub fn rotate(matrix: List(List(Int))) -> List(List(Int)) {
  // A quarter turn is a reflection through the main diagonal followed by a
  // reflection through the vertical centre line. Two easy operations instead of
  // one four-way element cycle, and neither needs any index arithmetic.
  matrix
  |> list.transpose
  |> list.map(list.reverse)
}

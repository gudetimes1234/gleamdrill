import gleam/list

pub fn spiral_order(matrix: List(List(Int))) -> List(Int) {
  // Take the top row, then turn the problem ninety degrees and do it again.
  // Rotating what is left anticlockwise puts the column you would have walked
  // down next along the top, so there is only ever one move to make.
  case matrix {
    [] -> []
    [top, ..rest] -> list.append(top, spiral_order(rotate_anticlockwise(rest)))
  }
}

fn rotate_anticlockwise(matrix: List(List(Int))) -> List(List(Int)) {
  case matrix {
    [] -> []
    _ ->
      matrix
      |> list.transpose
      |> list.reverse
  }
}

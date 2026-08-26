import gleam/int
import gleam/list

pub fn trap(height: List(Int)) -> Int {
  let left = running_max(height)
  let right =
    height
    |> list.reverse
    |> running_max
    |> list.reverse

  list.zip(list.zip(left, right), height)
  |> list.map(fn(cell) {
    let #(#(l, r), h) = cell
    int.min(l, r) - h
  })
  |> int.sum
}

fn running_max(values: List(Int)) -> List(Int) {
  list.scan(values, 0, int.max)
}

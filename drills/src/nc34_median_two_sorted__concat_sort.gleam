import gleam/int
import gleam/list

pub fn find_median_sorted_arrays(nums1: List(Int), nums2: List(Int)) -> Float {
  let merged =
    nums1
    |> list.append(nums2)
    |> list.sort(int.compare)
  let total = list.length(merged)

  case total, at(merged, total / 2), at(merged, { total - 1 } / 2) {
    0, _, _ -> 0.0
    _, upper, lower -> int.to_float(lower + upper) /. 2.0
  }
}

fn at(values: List(Int), index: Int) -> Int {
  case values |> list.drop(index) |> list.first {
    Ok(value) -> value
    Error(Nil) -> 0
  }
}

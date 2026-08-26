import gleam/int
import gleam/list
import gleam/result

pub type MedianFinder {
  MedianFinder(values: List(Int))
}

pub fn new() -> MedianFinder {
  MedianFinder([])
}

/// One sorted list, kept in order on insertion. Simpler to believe than two
/// halves, and the median is then just a lookup \u{2014} at the cost of an O(n)
/// insert where the two-heap version pays O(log n).
pub fn add_num(finder: MedianFinder, value: Int) -> MedianFinder {
  MedianFinder(list.sort([value, ..finder.values], int.compare))
}

pub fn find_median(finder: MedianFinder) -> Float {
  let n = list.length(finder.values)
  case n {
    0 -> 0.0
    _ -> {
      let high = at(finder.values, n / 2)
      let low = at(finder.values, { n - 1 } / 2)
      int.to_float(low + high) /. 2.0
    }
  }
}

fn at(values: List(Int), index: Int) -> Int {
  values |> list.drop(index) |> list.first |> result.unwrap(0)
}

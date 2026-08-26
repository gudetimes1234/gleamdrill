import gleam/int
import gleam/list

pub type MedianFinder {
  /// `lower` is the smaller half, largest first; `upper` is the larger half,
  /// smallest first. The median is always at one or both of those two heads.
  MedianFinder(lower: List(Int), upper: List(Int))
}

pub fn new() -> MedianFinder {
  MedianFinder([], [])
}

/// Two halves, each of which only ever has to give up its extreme value \u{2014}
/// which is exactly what a pair of heaps provides. Gleam has no heap, so these
/// are sorted lists: same invariant, worse insertion cost.
pub fn add_num(finder: MedianFinder, value: Int) -> MedianFinder {
  let lower = insert_desc(finder.lower, value)
  rebalance(MedianFinder(lower, finder.upper))
}

pub fn find_median(finder: MedianFinder) -> Float {
  case finder.lower, finder.upper {
    [], [] -> 0.0
    [low, ..], [high, ..] ->
      case list.length(finder.lower) == list.length(finder.upper) {
        True -> int.to_float(low + high) /. 2.0
        False -> int.to_float(low)
      }
    [low, ..], [] -> int.to_float(low)
    [], [high, ..] -> int.to_float(high)
  }
}

/// The smaller half may hold one more than the larger half, never fewer, and
/// its largest must not exceed the larger half's smallest.
fn rebalance(finder: MedianFinder) -> MedianFinder {
  case finder.lower, finder.upper {
    [low, ..lower_rest], [high, ..] if low > high ->
      rebalance(MedianFinder(lower_rest, insert_asc(finder.upper, low)))
    _, _ ->
      case
        list.length(finder.lower) - list.length(finder.upper) > 1,
        list.length(finder.upper) > list.length(finder.lower)
      {
        True, _ ->
          case finder.lower {
            [low, ..rest] -> MedianFinder(rest, insert_asc(finder.upper, low))
            [] -> finder
          }
        _, True ->
          case finder.upper {
            [high, ..rest] ->
              MedianFinder(insert_desc(finder.lower, high), rest)
            [] -> finder
          }
        _, _ -> finder
      }
  }
}

fn insert_desc(values: List(Int), value: Int) -> List(Int) {
  list.sort([value, ..values], fn(a, b) { int.compare(b, a) })
}

fn insert_asc(values: List(Int), value: Int) -> List(Int) {
  list.sort([value, ..values], int.compare)
}

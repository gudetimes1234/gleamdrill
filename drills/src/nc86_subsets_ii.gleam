import gleam/int
import gleam/list

pub fn subsets_with_dup(nums: List(Int)) -> List(List(Int)) {
  build(list.sort(nums, int.compare))
}

/// Sorting puts equal values next to each other, which is what makes the
/// duplicate rule expressible: when the head is skipped, skip *every* copy of
/// it at once. Skipping one copy and keeping the next would rebuild the same
/// subset by a different route.
fn build(sorted: List(Int)) -> List(List(Int)) {
  case sorted {
    [] -> [[]]
    [first, ..rest] -> {
      let with_first = list.map(build(rest), fn(subset) { [first, ..subset] })
      let past_duplicates = list.drop_while(rest, fn(n) { n == first })
      list.append(with_first, build(past_duplicates))
    }
  }
}

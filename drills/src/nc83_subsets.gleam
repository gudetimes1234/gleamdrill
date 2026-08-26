import gleam/list

pub fn subsets(nums: List(Int)) -> List(List(Int)) {
  // Every element is either in or out, independently, so the subsets of a list
  // are the subsets of its tail twice over: once with the head added and once
  // without. That is the whole recursion, and it is why there are 2\u{207f} of them.
  case nums {
    [] -> [[]]
    [first, ..rest] -> {
      let without = subsets(rest)
      list.append(list.map(without, fn(subset) { [first, ..subset] }), without)
    }
  }
}

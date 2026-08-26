import gleam/int
import gleam/list

pub fn combination_sum2(candidates: List(Int), target: Int) -> List(List(Int)) {
  // Generate every subset that hits the target and collapse the repeats
  // afterwards. Correct, and exponentially wasteful on inputs with many equal
  // values \u{2014} which is exactly why the skipping rule is worth getting right.
  candidates
  |> list.sort(int.compare)
  |> every_subset
  |> list.filter(fn(subset) { int.sum(subset) == target })
  |> list.unique
}

fn every_subset(sorted: List(Int)) -> List(List(Int)) {
  case sorted {
    [] -> [[]]
    [first, ..rest] -> {
      let without = every_subset(rest)
      list.append(list.map(without, fn(subset) { [first, ..subset] }), without)
    }
  }
}

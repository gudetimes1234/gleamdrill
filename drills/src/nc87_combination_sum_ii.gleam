import gleam/int
import gleam/list

pub fn combination_sum2(candidates: List(Int), target: Int) -> List(List(Int)) {
  build(list.sort(candidates, int.compare), target)
}

/// Each candidate is used at most once, so taking one moves past it. The
/// duplicate rule is the same as in Subsets II: skipping a value means skipping
/// every copy of it, otherwise the same combination is rebuilt from a different
/// copy of the same number.
fn build(sorted: List(Int), target: Int) -> List(List(Int)) {
  case target, sorted {
    0, _ -> [[]]
    _, [] -> []
    _, [first, ..rest] ->
      case first > target {
        True -> []
        False ->
          list.append(
            list.map(build(rest, target - first), fn(combination) {
              [first, ..combination]
            }),
            build(list.drop_while(rest, fn(n) { n == first }), target),
          )
      }
  }
}

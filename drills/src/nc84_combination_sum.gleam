import gleam/list

pub fn combination_sum(candidates: List(Int), target: Int) -> List(List(Int)) {
  build(candidates, target)
}

/// Each step either takes the current candidate again \u{2014} reuse is allowed \u{2014}
/// or drops it for good. Never going back to a dropped candidate is what stops
/// the same combination appearing in several orders, so no deduplication is
/// needed anywhere.
fn build(candidates: List(Int), target: Int) -> List(List(Int)) {
  case target, candidates {
    0, _ -> [[]]
    _, [] -> []
    _, [first, ..rest] ->
      case first > target || first <= 0 {
        True -> build(rest, target)
        False ->
          list.append(
            list.map(build(candidates, target - first), fn(combination) {
              [first, ..combination]
            }),
            build(rest, target),
          )
      }
  }
}

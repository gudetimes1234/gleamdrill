import gleam/list

pub fn can_jump(nums: List(Int)) -> Bool {
  let n = list.length(nums)
  case n {
    0 -> True
    _ -> {
      // Walk backwards carrying the leftmost index known to reach the end. Any
      // index that can reach *that* can reach the end, so it becomes the new
      // goal. Reachable exactly when the goal walks all the way back to 0.
      let goal =
        nums
        |> list.index_map(fn(jump, i) { #(i, jump) })
        |> list.reverse
        |> list.fold(n - 1, fn(goal, cell) {
          let #(i, jump) = cell
          case i + jump >= goal {
            True -> i
            False -> goal
          }
        })
      goal == 0
    }
  }
}

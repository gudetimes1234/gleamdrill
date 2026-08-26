import gleam/int
import gleam/list

pub fn can_jump(nums: List(Int)) -> Bool {
  // Only one number matters: the furthest index reachable so far. Walk forward
  // and extend it; the moment the walk gets past it, nothing further is
  // reachable and the value stops changing.
  let reach =
    list.index_fold(nums, 0, fn(reach, jump, i) {
      case i > reach {
        True -> reach
        False -> int.max(reach, i + jump)
      }
    })
  reach >= list.length(nums) - 1
}

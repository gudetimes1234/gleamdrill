import gleam/int
import gleam/list

pub fn max_sub_array(nums: List(Int)) -> Int {
  case nums {
    [] -> 0
    _ -> {
      // The sum from i to j is prefix[j] - prefix[i-1], so the best subarray
      // ending at j is prefix[j] minus the smallest prefix before it. One pass
      // carrying that minimum answers the whole thing.
      let #(_, _, best) =
        list.fold(nums, #(0, 0, -2_147_483_648), fn(state, n) {
          let #(running, smallest, best) = state
          let running = running + n
          #(
            running,
            int.min(smallest, running),
            int.max(best, running - smallest),
          )
        })
      best
    }
  }
}

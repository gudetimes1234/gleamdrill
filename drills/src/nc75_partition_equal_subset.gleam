import gleam/int
import gleam/list
import gleam/set

pub fn can_partition(nums: List(Int)) -> Bool {
  let total = int.sum(nums)
  case total % 2 {
    0 -> {
      // Subset sum in disguise: an equal split exists exactly when some subset
      // adds up to half the total. Carry the set of sums reachable so far and
      // widen it by each number \u{2014} no ordering, no table, and duplicates cost
      // nothing because a set collapses them.
      let half = total / 2
      let reachable =
        list.fold(nums, set.from_list([0]), fn(sums, n) {
          set.to_list(sums)
          |> list.filter_map(fn(sum) {
            case sum + n <= half {
              True -> Ok(sum + n)
              False -> Error(Nil)
            }
          })
          |> list.fold(sums, set.insert)
        })
      set.contains(reachable, half)
    }
    _ -> False
  }
}

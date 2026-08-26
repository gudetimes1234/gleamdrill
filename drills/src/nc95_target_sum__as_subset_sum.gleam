import gleam/dict.{type Dict}
import gleam/int
import gleam/list
import gleam/result

pub fn find_target_sum_ways(nums: List(Int), target: Int) -> Int {
  // Rewrite the problem. If P is the set given a plus and N the set given a
  // minus, then P \u{2212} N = target and P + N = total, so P = (total + target) / 2.
  // That turns a sign-assignment question into "how many subsets sum to a
  // fixed value" \u{2014} a knapsack, with no negative totals to track at all.
  let total = int.sum(nums)
  let wanted = total + target

  case wanted < 0 || wanted % 2 != 0 || total < int.absolute_value(target) {
    True -> 0
    False -> {
      let goal = wanted / 2
      nums
      |> list.fold(dict.from_list([#(0, 1)]), fn(counts, n) {
        dict.fold(counts, counts, fn(next, sum, ways) {
          case sum + n <= goal {
            True -> dict.insert(next, sum + n, at(next, sum + n) + ways)
            False -> next
          }
        })
      })
      |> at(goal)
    }
  }
}

fn at(counts: Dict(Int, Int), sum: Int) -> Int {
  result.unwrap(dict.get(counts, sum), 0)
}

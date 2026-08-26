import gleam/dict.{type Dict}
import gleam/int
import gleam/list

pub fn can_partition(nums: List(Int)) -> Bool {
  let total = int.sum(nums)
  case total % 2 {
    0 -> {
      let #(answer, _) = from(nums, total / 2, dict.new())
      answer
    }
    _ -> False
  }
}

/// Take this number or leave it, keyed by how much is still owed and how much
/// of the list is left. Written as a recursion it is obviously a search over
/// subsets; the cache is what stops it enumerating all 2\u{207f} of them.
fn from(
  rest: List(Int),
  owed: Int,
  memo: Dict(#(Int, Int), Bool),
) -> #(Bool, Dict(#(Int, Int), Bool)) {
  case owed, rest {
    0, _ -> #(True, memo)
    _, [] -> #(False, memo)
    _, [n, ..tail] -> {
      let key = #(owed, list.length(rest))
      case dict.get(memo, key) {
        Ok(cached) -> #(cached, memo)
        Error(Nil) -> {
          let #(taken, memo) = case n <= owed {
            True -> from(tail, owed - n, memo)
            False -> #(False, memo)
          }
          case taken {
            True -> #(True, dict.insert(memo, key, True))
            False -> {
              let #(skipped, memo) = from(tail, owed, memo)
              #(skipped, dict.insert(memo, key, skipped))
            }
          }
        }
      }
    }
  }
}

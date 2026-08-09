import gleam/dict

pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil) {
  find_pair(nums, target, 0, dict.new())
}

fn find_pair(
  nums: List(Int),
  target: Int,
  i: Int,
  seen: dict.Dict(Int, Int),
) -> Result(#(Int, Int), Nil) {
  case nums {
    [] -> Error(Nil)
    [n, ..rest] ->
      case dict.get(seen, target - n) {
        Ok(j) -> Ok(#(j, i))
        Error(Nil) -> find_pair(rest, target, i + 1, dict.insert(seen, n, i))
      }
  }
}

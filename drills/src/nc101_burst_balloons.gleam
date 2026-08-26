import gleam/dict.{type Dict}
import gleam/int
import gleam/list
import gleam/result

pub fn max_coins(nums: List(Int)) -> Int {
  // Padding with a 1 at each end removes the edge cases: every balloon then has
  // a neighbour on both sides whatever happens.
  let balloons =
    [1, ..list.append(nums, [1])]
    |> list.index_map(fn(v, i) { #(i, v) })
    |> dict.from_list
  let n = list.length(nums) + 2

  // The trick is to ask which balloon is burst *last* in a span rather than
  // first. The last one still has both span boundaries as neighbours \u{2014} they
  // are untouched by definition \u{2014} so its value is known, and the two sides
  // become independent subproblems. Asking "first" leaves neighbours that
  // depend on the other side, and the recursion does not close.
  let #(best, _) = span(0, n - 1, balloons, dict.new())
  best
}

fn span(
  left: Int,
  right: Int,
  balloons: Dict(Int, Int),
  memo: Dict(#(Int, Int), Int),
) -> #(Int, Dict(#(Int, Int), Int)) {
  case right - left < 2 {
    True -> #(0, memo)
    False ->
      case dict.get(memo, #(left, right)) {
        Ok(cached) -> #(cached, memo)
        Error(Nil) -> {
          let #(best, memo) =
            list.index_map(list.repeat(Nil, right - left - 1), fn(_, i) {
              left + 1 + i
            })
            |> list.fold(#(0, memo), fn(state, last) {
              let #(best, memo) = state
              let #(before, memo) = span(left, last, balloons, memo)
              let #(after, memo) = span(last, right, balloons, memo)
              let value =
                at(balloons, left) * at(balloons, last) * at(balloons, right)
              #(int.max(best, value + before + after), memo)
            })
          #(best, dict.insert(memo, #(left, right), best))
        }
      }
  }
}

fn at(balloons: Dict(Int, Int), index: Int) -> Int {
  result.unwrap(dict.get(balloons, index), 1)
}

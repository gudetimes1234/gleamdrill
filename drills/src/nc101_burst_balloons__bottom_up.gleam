import gleam/dict.{type Dict}
import gleam/int
import gleam/list
import gleam/result

pub fn max_coins(nums: List(Int)) -> Int {
  let balloons =
    [1, ..list.append(nums, [1])]
    |> list.index_map(fn(v, i) { #(i, v) })
    |> dict.from_list
  let n = list.length(nums) + 2

  // The same "which balloon goes last" recurrence filled by hand, shortest
  // spans first \u{2014} because a span's answer needs both of the shorter spans
  // that a chosen last balloon splits it into. Writing the loop order out makes
  // that dependency visible where the recursion leaves it implicit.
  let table =
    widths(n)
    |> list.flat_map(fn(width) {
      list.index_map(list.repeat(Nil, n - width), fn(_, left) {
        #(left, left + width)
      })
    })
    |> list.fold(dict.new(), fn(table, bounds) {
      let #(left, right) = bounds
      let best =
        list.index_map(list.repeat(Nil, right - left - 1), fn(_, i) {
          left + 1 + i
        })
        |> list.fold(0, fn(best, last) {
          let value =
            at(balloons, left) * at(balloons, last) * at(balloons, right)
          int.max(
            best,
            value + score(table, left, last) + score(table, last, right),
          )
        })
      dict.insert(table, bounds, best)
    })

  score(table, 0, n - 1)
}

/// Spans of width two upwards: anything narrower encloses no balloon.
fn widths(n: Int) -> List(Int) {
  case n < 2 {
    True -> []
    False -> list.index_map(list.repeat(Nil, n - 1), fn(_, i) { i + 2 })
  }
}

fn score(table: Dict(#(Int, Int), Int), left: Int, right: Int) -> Int {
  result.unwrap(dict.get(table, #(left, right)), 0)
}

fn at(balloons: Dict(Int, Int), index: Int) -> Int {
  result.unwrap(dict.get(balloons, index), 1)
}

import gleam/int
import gleam/list

pub fn largest_rectangle_area(heights: List(Int)) -> Int {
  let n = list.length(heights)
  let #(stack, best) =
    heights
    |> list.index_map(fn(h, i) { #(i, h) })
    |> list.fold(#([], 0), fn(state, cell) {
      let #(stack, best) = state
      let #(i, h) = cell
      // Anything taller than the new bar can never extend past it, so its
      // rectangle is finished here. Whatever it reached back to becomes this
      // bar's own starting point.
      let #(stack, best, start) = close_taller(stack, h, i, best, i)
      #([#(start, h), ..stack], best)
    })

  // Whatever survives was never cut off, so it runs to the far end.
  list.fold(stack, best, fn(best, entry) {
    int.max(best, entry.1 * { n - entry.0 })
  })
}

fn close_taller(
  stack: List(#(Int, Int)),
  height: Int,
  index: Int,
  best: Int,
  start: Int,
) -> #(List(#(Int, Int)), Int, Int) {
  case stack {
    [#(from, tall), ..rest] if tall > height ->
      close_taller(
        rest,
        height,
        index,
        int.max(best, tall * { index - from }),
        from,
      )
    _ -> #(stack, best, start)
  }
}

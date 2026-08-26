import gleam/int
import gleam/list
import gleam/string

pub fn character_replacement(s: String, k: Int) -> Int {
  let graphemes = string.to_graphemes(s)
  graphemes
  |> list.unique
  |> list.fold(0, fn(best, target) {
    int.max(best, sweep(graphemes, graphemes, 0, 0, 0, target, k))
  })
}

/// `from_left` is the window's left edge, `upcoming` its right; `others` counts
/// the characters inside it that are not `target` and would need replacing.
fn sweep(
  from_left: List(String),
  upcoming: List(String),
  size: Int,
  others: Int,
  best: Int,
  target: String,
  k: Int,
) -> Int {
  case upcoming {
    [] -> best
    [g, ..rest] -> {
      let others = case g == target {
        True -> others
        False -> others + 1
      }
      let #(from_left, size, others) =
        shrink(from_left, size + 1, others, target, k)
      sweep(from_left, rest, size, others, int.max(best, size), target, k)
    }
  }
}

fn shrink(
  from_left: List(String),
  size: Int,
  others: Int,
  target: String,
  k: Int,
) -> #(List(String), Int, Int) {
  case others > k, from_left {
    True, [oldest, ..rest] ->
      shrink(
        rest,
        size - 1,
        case oldest == target {
          True -> others
          False -> others - 1
        },
        target,
        k,
      )
    _, _ -> #(from_left, size, others)
  }
}

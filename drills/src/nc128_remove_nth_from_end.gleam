import gleam/list

pub fn remove_nth_from_end(values: List(Int), n: Int) -> List(Int) {
  // Two walkers n apart. When the leading one runs off the end, the trailing
  // one is sitting on the node to drop — the length is never computed, which is
  // the point: one pass instead of two. Opening the gap can fail, and that
  // failure is exactly the "n is longer than the list" case.
  case skip(values, n) {
    Error(Nil) -> values
    Ok(ahead) -> advance(values, ahead, [])
  }
}

fn skip(values: List(Int), n: Int) -> Result(List(Int), Nil) {
  case n, values {
    0, rest -> Ok(rest)
    _, [] -> Error(Nil)
    _, [_, ..rest] -> skip(rest, n - 1)
  }
}

fn advance(behind: List(Int), ahead: List(Int), kept: List(Int)) -> List(Int) {
  case ahead, behind {
    [_, ..ahead_rest], [value, ..behind_rest] ->
      advance(behind_rest, ahead_rest, [value, ..kept])
    // The leading walker is spent, so the trailing one is on the doomed node.
    [], [_dropped, ..rest] -> list.append(list.reverse(kept), rest)
    _, [] -> list.reverse(kept)
  }
}

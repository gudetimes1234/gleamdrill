import gleam/string

pub fn is_valid(s: String) -> Bool {
  check(string.to_graphemes(s), [])
}

fn check(graphemes: List(String), stack: List(String)) -> Bool {
  case graphemes, stack {
    [], [] -> True
    [], _ -> False
    ["(", ..rest], _ -> check(rest, [")", ..stack])
    ["[", ..rest], _ -> check(rest, ["]", ..stack])
    ["{", ..rest], _ -> check(rest, ["}", ..stack])
    [close, ..rest], [expected, ..stack_rest] ->
      close == expected && check(rest, stack_rest)
    _, _ -> False
  }
}

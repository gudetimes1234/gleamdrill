import gleam/string

/// No stack: strip every matched pair, over and over, until nothing more can
/// go. Whatever survives is unmatched, so the string was balanced exactly when
/// nothing survives. This is why "([)]" fails — neither pair is ever adjacent.
pub fn is_valid(s: String) -> Bool {
  reduce(s) == ""
}

fn reduce(s: String) -> String {
  let smaller =
    s
    |> string.replace("()", "")
    |> string.replace("[]", "")
    |> string.replace("{}", "")
  case smaller == s {
    True -> s
    False -> reduce(smaller)
  }
}

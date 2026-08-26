import gleam/string

pub fn is_match(s: String, p: String) -> Bool {
  matches(string.to_graphemes(s), string.to_graphemes(p))
}

/// The same rules with no table at all \u{2014} just pattern matching on the two
/// lists. Shorter and easier to trust, and exponential on patterns like
/// "a*a*a*a*b" where the same suffix is reached along many different splits.
/// Worth writing first, then adding the cache once it is right.
fn matches(text: List(String), pattern: List(String)) -> Bool {
  case pattern {
    [] -> text == []
    [symbol, "*", ..rest] ->
      matches(text, rest)
      || case text {
        [first, ..tail] if first == symbol || symbol == "." ->
          matches(tail, pattern)
        _ -> False
      }
    [symbol, ..rest] ->
      case text {
        [first, ..tail] if first == symbol || symbol == "." ->
          matches(tail, rest)
        _ -> False
      }
  }
}

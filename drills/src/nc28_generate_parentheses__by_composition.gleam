import gleam/list

pub fn generate_parenthesis(n: Int) -> List(String) {
  compose(n)
}

/// Every non-empty balanced string is "(" <> A <> ")" <> B for exactly one
/// split: A is whatever the first bracket encloses, B is whatever follows it.
/// Enumerating the splits enumerates the strings, with no validity rule to
/// check at all \u{2014} the shape of the recursion is the rule.
fn compose(n: Int) -> List(String) {
  case n <= 0 {
    True -> [""]
    False ->
      indices(n)
      |> list.flat_map(fn(inner_pairs) {
        let inner = compose(inner_pairs)
        let rest = compose(n - 1 - inner_pairs)
        list.flat_map(inner, fn(a) {
          list.map(rest, fn(b) { "(" <> a <> ")" <> b })
        })
      })
  }
}

fn indices(n: Int) -> List(Int) {
  list.index_map(list.repeat(Nil, n), fn(_, i) { i })
}

import gleam/list
import gleam/result
import gleam/string

pub fn is_interleave(s1: String, s2: String, s3: String) -> Bool {
  case string.length(s1) + string.length(s2) == string.length(s3) {
    False -> False
    True -> {
      let a = string.to_graphemes(s1)
      let b = string.to_graphemes(s2)
      let c = string.to_graphemes(s3)

      // Bottom-up over the same two-index state. Row i says which prefixes of
      // s2 can pair with the first i characters of s1; each row depends only on
      // the one above and on itself to the left, so one row suffices.
      let start = first_row(b, c)
      let final =
        list.index_fold(a, start, fn(previous, from_a, i) {
          next_row(previous, b, c, from_a, i)
        })

      result.unwrap(list.last(final), False)
    }
  }
}

/// Nothing taken from s1 yet, so s2 has to match the target outright.
fn first_row(b: List(String), c: List(String)) -> List(Bool) {
  let #(_, row) =
    list.fold(b, #(True, [True]), fn(state, from_b) {
      let #(ok, row) = state
      let ok = ok && from_b == nth(c, list.length(row) - 1)
      #(ok, [ok, ..row])
    })
  list.reverse(row)
}

fn next_row(
  previous: List(Bool),
  b: List(String),
  c: List(String),
  from_a: String,
  i: Int,
) -> List(Bool) {
  let head = flag(previous, 0) && from_a == nth(c, i)
  let #(_, row) =
    list.index_fold(b, #(head, [head]), fn(state, from_b, j) {
      let #(left, row) = state
      let target = nth(c, i + j + 1)
      let here =
        { flag(previous, j + 1) && from_a == target }
        || { left && from_b == target }
      #(here, [here, ..row])
    })
  list.reverse(row)
}

fn nth(values: List(String), index: Int) -> String {
  values |> list.drop(index) |> list.first |> result.unwrap("")
}

fn flag(values: List(Bool), index: Int) -> Bool {
  values |> list.drop(index) |> list.first |> result.unwrap(False)
}

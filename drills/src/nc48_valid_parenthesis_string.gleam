import gleam/int
import gleam/list
import gleam/string

pub fn check_valid_string(s: String) -> Bool {
  // Rather than guessing what each star should be, carry the *range* of open
  // counts still possible: low if every star so far were a closer, high if
  // every one were an opener. High going negative means even the most generous
  // reading has too many closers; low is clamped at zero because a star can
  // always be nothing.
  let #(low, _high, ok) =
    list.fold(string.to_graphemes(s), #(0, 0, True), fn(state, c) {
      let #(low, high, ok) = state
      case ok {
        False -> state
        True -> {
          let #(low, high) = case c {
            "(" -> #(low + 1, high + 1)
            ")" -> #(int.max(low - 1, 0), high - 1)
            _ -> #(int.max(low - 1, 0), high + 1)
          }
          #(low, high, high >= 0)
        }
      }
    })

  ok && low == 0
}

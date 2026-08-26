import gleam/int
import gleam/list
import gleam/result
import gleam/string

pub fn num_decodings(s: String) -> Int {
  case string.to_graphemes(s) {
    [] -> 0
    chars -> {
      // Two rolling counts. The ways to decode up to here are the ways up to
      // the previous character (if this one can stand alone) plus the ways up
      // to the one before that (if this one and its predecessor form a legal
      // pair). A leading zero kills the first branch; anything outside 10..26
      // kills the second.
      let #(_, ways, _) =
        list.index_fold(chars, #(1, 1, ""), fn(state, c, i) {
          let #(two_back, one_back, previous) = state
          let alone = case c == "0" {
            True -> 0
            False -> one_back
          }
          let paired = case i > 0 && legal_pair(previous, c) {
            True -> two_back
            False -> 0
          }
          #(one_back, alone + paired, c)
        })
      ways
    }
  }
}

fn legal_pair(first: String, second: String) -> Bool {
  let value = result.unwrap(int.parse(first <> second), 0)
  value >= 10 && value <= 26
}

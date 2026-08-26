import gleam/dict.{type Dict}
import gleam/list
import gleam/set.{type Set}
import gleam/string

pub fn word_break(s: String, word_dict: List(String)) -> Bool {
  let #(answer, _) =
    from(0, string.length(s), s, set.from_list(word_dict), dict.new())
  answer
}

/// Top-down: from this position, does any dictionary word start here and leave
/// a suffix that also breaks? Without the cache the same suffix is asked about
/// once per way of reaching it, which is where the exponential blow-up on
/// inputs like "aaaa\u{2026}b" comes from.
fn from(
  start: Int,
  n: Int,
  s: String,
  words: Set(String),
  memo: Dict(Int, Bool),
) -> #(Bool, Dict(Int, Bool)) {
  case start >= n {
    True -> #(True, memo)
    False ->
      case dict.get(memo, start) {
        Ok(cached) -> #(cached, memo)
        Error(Nil) -> {
          let #(found, memo) =
            list.fold(ends(start, n), #(False, memo), fn(state, end) {
              let #(found, memo) = state
              case found {
                True -> state
                False ->
                  case
                    set.contains(words, string.slice(s, start, end - start))
                  {
                    False -> #(False, memo)
                    True -> from(end, n, s, words, memo)
                  }
              }
            })
          #(found, dict.insert(memo, start, found))
        }
      }
  }
}

fn ends(start: Int, n: Int) -> List(Int) {
  list.index_map(list.repeat(Nil, n - start), fn(_, i) { start + i + 1 })
}

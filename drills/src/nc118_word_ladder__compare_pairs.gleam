import gleam/list
import gleam/set.{type Set}
import gleam/string

pub fn ladder_length(
  begin_word: String,
  end_word: String,
  word_list: List(String),
) -> Int {
  let words = set.from_list(word_list)

  case set.contains(words, end_word) {
    False -> 0
    True ->
      spread(
        set.to_list(words),
        [begin_word],
        set.from_list([begin_word]),
        end_word,
        1,
      )
  }
}

/// Neighbours found by comparing against every remaining word. Simpler to state
/// and O(n) comparisons per expansion rather than a constant number of lookups
/// \u{2014} which is the cost the wildcard buckets remove.
fn spread(
  words: List(String),
  frontier: List(String),
  seen: Set(String),
  target: String,
  steps: Int,
) -> Int {
  case list.contains(frontier, target) {
    True -> steps
    False -> {
      let next =
        words
        |> list.filter(fn(word) {
          !set.contains(seen, word)
          && list.any(frontier, fn(from) { differs_by_one(from, word) })
        })

      case next {
        [] -> 0
        _ ->
          spread(
            words,
            next,
            list.fold(next, seen, set.insert),
            target,
            steps + 1,
          )
      }
    }
  }
}

fn differs_by_one(a: String, b: String) -> Bool {
  case string.length(a) == string.length(b) {
    False -> False
    True ->
      list.zip(string.to_graphemes(a), string.to_graphemes(b))
      |> list.count(fn(pair: #(String, String)) { pair.0 != pair.1 })
      == 1
  }
}

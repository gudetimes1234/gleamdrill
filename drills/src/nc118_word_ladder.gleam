import gleam/dict.{type Dict}
import gleam/list
import gleam/result
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
    True -> {
      // The graph is never built: "hot" and "dot" are neighbours because they
      // share the pattern "*ot", so bucketing every word under each of its
      // wildcard patterns gives the adjacency for free. Comparing every pair
      // instead costs O(n\u{b2}) comparisons before the search even starts.
      let buckets =
        list.fold(set.to_list(words), dict.new(), fn(acc, word) {
          list.fold(patterns(word), acc, fn(acc, pattern) {
            dict.insert(acc, pattern, [
              word,
              ..result.unwrap(dict.get(acc, pattern), [])
            ])
          })
        })

      spread(buckets, [begin_word], set.from_list([begin_word]), end_word, 1)
    }
  }
}

fn spread(
  buckets: Dict(String, List(String)),
  frontier: List(String),
  seen: Set(String),
  target: String,
  steps: Int,
) -> Int {
  case list.contains(frontier, target) {
    True -> steps
    False -> {
      let next =
        frontier
        |> list.flat_map(patterns)
        |> list.flat_map(fn(pattern) {
          result.unwrap(dict.get(buckets, pattern), [])
        })
        |> list.filter(fn(word) { !set.contains(seen, word) })
        |> list.unique

      case next {
        [] -> 0
        _ ->
          spread(
            buckets,
            next,
            list.fold(next, seen, set.insert),
            target,
            steps + 1,
          )
      }
    }
  }
}

/// One pattern per position, with that letter replaced by a wildcard.
fn patterns(word: String) -> List(String) {
  string.to_graphemes(word)
  |> list.index_map(fn(_, i) {
    string.slice(word, 0, i)
    <> "*"
    <> string.slice(word, i + 1, string.length(word))
  })
}

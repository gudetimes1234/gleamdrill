import gleam/dict.{type Dict}
import gleam/list
import gleam/result
import gleam/set
import gleam/string

pub fn alien_order(words: List(String)) -> String {
  let letters =
    list.fold(words, set.new(), fn(acc, word) {
      list.fold(string.to_graphemes(word), acc, set.insert)
    })

  case edges(words) {
    Error(Nil) -> ""
    Ok(pairs) -> {
      let waiting =
        list.fold(pairs, dict.new(), fn(acc, pair: #(String, String)) {
          dict.insert(acc, pair.1, result.unwrap(dict.get(acc, pair.1), 0) + 1)
        })
      let unlocks =
        list.fold(pairs, dict.new(), fn(acc, pair: #(String, String)) {
          dict.insert(acc, pair.0, [
            pair.1,
            ..result.unwrap(dict.get(acc, pair.0), [])
          ])
        })
      let ready =
        set.to_list(letters)
        |> list.filter(fn(letter) {
          result.unwrap(dict.get(waiting, letter), 0) == 0
        })
      let order = take(ready, waiting, unlocks, [])
      // Short means the leftovers all depend on each other: the ordering the
      // words describe is contradictory, so no alphabet satisfies it.
      case list.length(order) == set.size(letters) {
        True -> string.join(order, "")
        False -> ""
      }
    }
  }
}

// Two adjacent words agree up to their first difference, and that difference is
// the only thing they say about the alphabet — everything after it is unordered.
// The one case with no letters to compare is a word followed by a prefix of
// itself, which no alphabet can explain.
fn edges(words: List(String)) -> Result(List(#(String, String)), Nil) {
  case words {
    [first, second, ..rest] ->
      case difference(string.to_graphemes(first), string.to_graphemes(second)) {
        Error(Nil) -> Error(Nil)
        Ok(found) ->
          case edges([second, ..rest]) {
            Ok(more) -> Ok(list.append(found, more))
            Error(Nil) -> Error(Nil)
          }
      }
    _ -> Ok([])
  }
}

fn difference(
  first: List(String),
  second: List(String),
) -> Result(List(#(String, String)), Nil) {
  case first, second {
    [a, ..a_rest], [b, ..b_rest] ->
      case a == b {
        True -> difference(a_rest, b_rest)
        False -> Ok([#(a, b)])
      }
    [_, ..], [] -> Error(Nil)
    _, _ -> Ok([])
  }
}

fn take(
  ready: List(String),
  waiting: Dict(String, Int),
  unlocks: Dict(String, List(String)),
  order: List(String),
) -> List(String) {
  case ready {
    [] -> list.reverse(order)
    [letter, ..rest] -> {
      let #(waiting, freed) =
        result.unwrap(dict.get(unlocks, letter), [])
        |> list.fold(#(waiting, []), fn(state, following) {
          let #(waiting, freed) = state
          let left = result.unwrap(dict.get(waiting, following), 0) - 1
          let waiting = dict.insert(waiting, following, left)
          case left == 0 {
            True -> #(waiting, [following, ..freed])
            False -> #(waiting, freed)
          }
        })
      take(list.append(rest, freed), waiting, unlocks, [letter, ..order])
    }
  }
}

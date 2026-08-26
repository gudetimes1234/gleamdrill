import gleam/dict.{type Dict}
import gleam/list
import gleam/result
import gleam/set.{type Set}
import gleam/string

pub fn alien_order(words: List(String)) -> String {
  let letters =
    list.fold(words, set.new(), fn(acc, word) {
      list.fold(string.to_graphemes(word), acc, set.insert)
    })

  case edges(words) {
    Error(Nil) -> ""
    Ok(pairs) -> {
      let after =
        list.fold(pairs, dict.new(), fn(acc, pair: #(String, String)) {
          dict.insert(acc, pair.0, [
            pair.1,
            ..result.unwrap(dict.get(acc, pair.0), [])
          ])
        })
      // Depth-first, recording a letter only once everything that must follow
      // it has been recorded — and recording it by prepending, which is what
      // puts it back in front of them. The in-progress set is the cycle check:
      // a letter met again on the current path contradicts itself.
      case
        list.fold(set.to_list(letters), Ok(#(set.new(), [])), fn(state, letter) {
          case state {
            Error(Nil) -> Error(Nil)
            Ok(#(done, order)) -> visit(after, letter, set.new(), done, order)
          }
        })
      {
        Error(Nil) -> ""
        Ok(#(_, order)) -> string.join(order, "")
      }
    }
  }
}

fn visit(
  after: Dict(String, List(String)),
  letter: String,
  on_path: Set(String),
  done: Set(String),
  order: List(String),
) -> Result(#(Set(String), List(String)), Nil) {
  case set.contains(on_path, letter), set.contains(done, letter) {
    True, _ -> Error(Nil)
    _, True -> Ok(#(done, order))
    _, _ -> {
      let on_path = set.insert(on_path, letter)
      case
        list.fold(
          result.unwrap(dict.get(after, letter), []),
          Ok(#(done, order)),
          fn(state, following) {
            case state {
              Error(Nil) -> Error(Nil)
              Ok(#(done, order)) ->
                visit(after, following, on_path, done, order)
            }
          },
        )
      {
        Error(Nil) -> Error(Nil)
        Ok(#(done, order)) -> Ok(#(set.insert(done, letter), [letter, ..order]))
      }
    }
  }
}

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

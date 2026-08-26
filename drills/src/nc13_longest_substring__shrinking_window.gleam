import gleam/int
import gleam/list
import gleam/string

pub fn length_of_longest_substring(s: String) -> Int {
  string.to_graphemes(s)
  |> list.fold(#([], 0), fn(acc, g) {
    let #(window, best) = acc
    let window = case list.contains(window, g) {
      True -> drop_through(window, g)
      False -> window
    }
    let window = list.append(window, [g])
    #(window, int.max(best, list.length(window)))
  })
  |> fn(state) { state.1 }
}

fn drop_through(window: List(String), g: String) -> List(String) {
  case window {
    [] -> []
    [first, ..rest] ->
      case first == g {
        True -> rest
        False -> drop_through(rest, g)
      }
  }
}

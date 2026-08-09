import gleam/dict
import gleam/list
import gleam/option
import gleam/string

pub fn check_inclusion(s1: String, s2: String) -> Bool {
  let needle = counts(string.to_graphemes(s1))
  let size = string.length(s1)
  let graphemes = string.to_graphemes(s2)
  slide(
    graphemes,
    list.drop(graphemes, size),
    counts(list.take(graphemes, size)),
    needle,
  )
}

fn counts(graphemes: List(String)) -> dict.Dict(String, Int) {
  list.fold(graphemes, dict.new(), fn(acc, g) {
    dict.upsert(acc, g, fn(n) { option.unwrap(n, 0) + 1 })
  })
}

fn slide(
  window_start: List(String),
  upcoming: List(String),
  window: dict.Dict(String, Int),
  needle: dict.Dict(String, Int),
) -> Bool {
  case window == needle {
    True -> True
    False ->
      case window_start, upcoming {
        [oldest, ..rest_start], [next, ..rest_upcoming] ->
          slide(
            rest_start,
            rest_upcoming,
            window
              |> remove_one(oldest)
              |> dict.upsert(next, fn(n) { option.unwrap(n, 0) + 1 }),
            needle,
          )
        _, _ -> False
      }
  }
}

fn remove_one(
  window: dict.Dict(String, Int),
  g: String,
) -> dict.Dict(String, Int) {
  case dict.get(window, g) {
    Ok(1) -> dict.delete(window, g)
    Ok(n) -> dict.insert(window, g, n - 1)
    Error(Nil) -> window
  }
}

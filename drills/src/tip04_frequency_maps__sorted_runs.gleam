import gleam/dict
import gleam/list
import gleam/string

pub fn word_frequencies(text: String) -> dict.Dict(String, Int) {
  text
  |> string.lowercase
  |> string.split(" ")
  |> list.filter(fn(word) { word != "" })
  |> list.sort(string.compare)
  |> runs([])
  |> dict.from_list
}

fn runs(
  words: List(String),
  acc: List(#(String, Int)),
) -> List(#(String, Int)) {
  case words, acc {
    [], _ -> acc
    [word, ..rest], [#(current, count), ..tail] if word == current ->
      runs(rest, [#(current, count + 1), ..tail])
    [word, ..rest], _ -> runs(rest, [#(word, 1), ..acc])
  }
}

import gleam/dict
import gleam/list
import gleam/option
import gleam/string

pub fn word_frequencies(text: String) -> dict.Dict(String, Int) {
  text
  |> string.lowercase
  |> string.split(" ")
  |> list.filter(fn(word) { word != "" })
  |> list.fold(dict.new(), fn(counts, word) {
    dict.upsert(counts, word, fn(n) { option.unwrap(n, 0) + 1 })
  })
}

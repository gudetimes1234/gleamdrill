import gleam/list
import gleam/string

pub fn slug(title: String) -> String {
  title
  |> string.trim
  |> string.lowercase
  |> string.split(" ")
  |> list.filter(fn(word) { word != "" })
  |> string.join("-")
}

import gleam/list
import gleam/string

pub fn slug(title: String) -> String {
  string.join(
    list.filter(
      string.split(string.lowercase(string.trim(title)), " "),
      fn(word) { word != "" },
    ),
    "-",
  )
}

import gleam/list
import gleam/string

/// The same steps without the pipe, and therefore inside out: to read the order
/// of operations you start at `title` in the middle and work outwards. Identical
/// output — the pipe only changes which end you read from.
pub fn slug(title: String) -> String {
  string.join(
    list.filter(
      string.split(string.lowercase(string.trim(title)), " "),
      fn(word) { word != "" },
    ),
    "-",
  )
}

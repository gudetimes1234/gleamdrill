import gleam/dict
import gleam/list
import gleam/option
import gleam/string

pub fn group_anagrams(strs: List(String)) -> List(List(String)) {
  strs
  |> list.fold(dict.new(), fn(acc, s) {
    let key =
      string.to_graphemes(s)
      |> list.sort(string.compare)
      |> string.concat
    dict.upsert(acc, key, fn(group) {
      case group {
        option.Some(members) -> [s, ..members]
        option.None -> [s]
      }
    })
  })
  |> dict.values
  |> list.map(list.reverse)
}

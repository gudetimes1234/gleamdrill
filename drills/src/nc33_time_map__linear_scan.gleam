import gleam/dict.{type Dict}
import gleam/list

pub type TimeMap {
  TimeMap(entries: Dict(String, List(#(Int, String))))
}

pub fn new() -> TimeMap {
  TimeMap(dict.new())
}

pub fn set(
  store: TimeMap,
  key: String,
  value: String,
  timestamp: Int,
) -> TimeMap {
  let history = case dict.get(store.entries, key) {
    Ok(history) -> history
    Error(Nil) -> []
  }
  TimeMap(dict.insert(store.entries, key, [#(timestamp, value), ..history]))
}

/// Newest first, so the first entry old enough is the answer. O(n) per lookup
/// against the halving version's O(log n), but there is no split arithmetic to
/// get wrong, and for a key with a handful of versions it wins on constants.
pub fn get(store: TimeMap, key: String, timestamp: Int) -> String {
  case dict.get(store.entries, key) {
    Error(Nil) -> ""
    Ok(history) ->
      case list.find(history, fn(entry) { entry.0 <= timestamp }) {
        Ok(#(_, value)) -> value
        Error(Nil) -> ""
      }
  }
}

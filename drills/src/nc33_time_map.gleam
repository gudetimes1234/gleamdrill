import gleam/dict.{type Dict}
import gleam/list

pub type TimeMap {
  TimeMap(entries: Dict(String, List(#(Int, String))))
}

pub fn new() -> TimeMap {
  TimeMap(dict.new())
}

/// Timestamps only ever increase, so prepending keeps each key's history sorted
/// newest first for free.
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

pub fn get(store: TimeMap, key: String, timestamp: Int) -> String {
  case dict.get(store.entries, key) {
    Ok(history) -> newest_at_most(history, timestamp)
    Error(Nil) -> ""
  }
}

/// The history is sorted, so the newest entry at or before a timestamp is a
/// halving question, not a walk. Everything before the split point is newer.
fn newest_at_most(history: List(#(Int, String)), timestamp: Int) -> String {
  case history {
    [] -> ""
    _ -> {
      let half = list.length(history) / 2
      let #(newer, rest) = list.split(history, half)
      case rest {
        [] -> ""
        [#(stamp, value), ..older] ->
          case stamp <= timestamp {
            True ->
              case newest_at_most(newer, timestamp) {
                "" -> value
                found -> found
              }
            False -> newest_at_most(older, timestamp)
          }
      }
    }
  }
}

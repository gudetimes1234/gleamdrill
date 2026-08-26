import gleam/list
import gleam/set
import gleam/string

pub fn word_break(s: String, word_dict: List(String)) -> Bool {
  let words = set.from_list(word_dict)
  let n = string.length(s)

  // Reachable positions rather than a table of booleans: start at 0, and a
  // position is reachable when some word in the dictionary bridges the gap from
  // a position already reached. The answer is whether the end is reachable.
  let reached =
    list.fold(ends(n), set.from_list([0]), fn(reached, end) {
      let bridged =
        list.any(starts(end), fn(start) {
          set.contains(reached, start)
          && set.contains(words, string.slice(s, start, end - start))
        })
      case bridged {
        True -> set.insert(reached, end)
        False -> reached
      }
    })

  set.contains(reached, n)
}

fn ends(n: Int) -> List(Int) {
  list.index_map(list.repeat(Nil, n), fn(_, i) { i + 1 })
}

fn starts(end: Int) -> List(Int) {
  list.index_map(list.repeat(Nil, end), fn(_, i) { i })
}

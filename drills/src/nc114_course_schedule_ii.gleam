import gleam/dict.{type Dict}
import gleam/list
import gleam/result

pub fn find_order(
  num_courses: Int,
  prerequisites: List(#(Int, Int)),
) -> List(Int) {
  // The same Kahn's algorithm as deciding whether it is possible \u{2014} except
  // the order courses come off the ready list *is* the answer. Detecting the
  // cycle and producing the schedule are the same computation.
  let waiting =
    list.fold(prerequisites, dict.new(), fn(acc, pair) {
      dict.insert(acc, pair.0, count(acc, pair.0) + 1)
    })
  let unlocks =
    list.fold(prerequisites, dict.new(), fn(acc, pair) {
      dict.insert(acc, pair.1, [pair.0, ..unlocked(acc, pair.1)])
    })

  let ready =
    courses(num_courses) |> list.filter(fn(c) { count(waiting, c) == 0 })
  let order = take(ready, waiting, unlocks, [])

  case list.length(order) == num_courses {
    True -> order
    // Stalled with courses left, so no order exists at all.
    False -> []
  }
}

fn take(
  ready: List(Int),
  waiting: Dict(Int, Int),
  unlocks: Dict(Int, List(Int)),
  order: List(Int),
) -> List(Int) {
  case ready {
    [] -> list.reverse(order)
    [course, ..rest] -> {
      let #(waiting, freed) =
        list.fold(unlocked(unlocks, course), #(waiting, []), fn(state, next) {
          let #(waiting, freed) = state
          let remaining = count(waiting, next) - 1
          #(dict.insert(waiting, next, remaining), case remaining {
            0 -> [next, ..freed]
            _ -> freed
          })
        })
      take(list.append(rest, freed), waiting, unlocks, [course, ..order])
    }
  }
}

fn courses(n: Int) -> List(Int) {
  list.index_map(list.repeat(Nil, n), fn(_, i) { i })
}

fn count(counts: Dict(Int, Int), key: Int) -> Int {
  result.unwrap(dict.get(counts, key), 0)
}

fn unlocked(unlocks: Dict(Int, List(Int)), key: Int) -> List(Int) {
  result.unwrap(dict.get(unlocks, key), [])
}

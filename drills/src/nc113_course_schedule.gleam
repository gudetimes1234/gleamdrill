import gleam/dict.{type Dict}
import gleam/list
import gleam/result

pub fn can_finish(num_courses: Int, prerequisites: List(#(Int, Int))) -> Bool {
  // Kahn's algorithm. Courses with nothing outstanding can be taken now; taking
  // one releases whatever depended on it. If the process stalls with courses
  // left, those courses depend on each other in a circle \u{2014} a cycle is exactly
  // what "cannot be finished" means.
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

  take(ready, waiting, unlocks, 0) == num_courses
}

fn take(
  ready: List(Int),
  waiting: Dict(Int, Int),
  unlocks: Dict(Int, List(Int)),
  taken: Int,
) -> Int {
  case ready {
    [] -> taken
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
      take(list.append(rest, freed), waiting, unlocks, taken + 1)
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

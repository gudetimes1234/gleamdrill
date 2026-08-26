import gleam/dict.{type Dict}
import gleam/list
import gleam/result
import gleam/set.{type Set}

pub fn can_finish(num_courses: Int, prerequisites: List(#(Int, Int))) -> Bool {
  let unlocks =
    list.fold(prerequisites, dict.new(), fn(acc, pair) {
      dict.insert(acc, pair.0, [pair.1, ..needed(acc, pair.0)])
    })

  // Depth-first with three states rather than two. "Seen" is not enough: a node
  // reached twice down *different* branches is fine, while a node reached again
  // while still on the current path is a cycle. The in-progress set is what
  // tells those apart.
  let #(ok, _) =
    list.fold(courses(num_courses), #(True, set.new()), fn(state, course) {
      let #(ok, done) = state
      case ok {
        False -> state
        True ->
          case visit(course, unlocks, set.new(), done) {
            Ok(done) -> #(True, done)
            Error(Nil) -> #(False, done)
          }
      }
    })
  ok
}

fn visit(
  course: Int,
  unlocks: Dict(Int, List(Int)),
  on_path: Set(Int),
  done: Set(Int),
) -> Result(Set(Int), Nil) {
  case set.contains(on_path, course) {
    True -> Error(Nil)
    False ->
      case set.contains(done, course) {
        True -> Ok(done)
        False -> {
          let on_path = set.insert(on_path, course)
          case
            list.try_fold(needed(unlocks, course), done, fn(done, next) {
              visit(next, unlocks, on_path, done)
            })
          {
            Ok(done) -> Ok(set.insert(done, course))
            Error(Nil) -> Error(Nil)
          }
        }
      }
  }
}

fn courses(n: Int) -> List(Int) {
  list.index_map(list.repeat(Nil, n), fn(_, i) { i })
}

fn needed(unlocks: Dict(Int, List(Int)), key: Int) -> List(Int) {
  result.unwrap(dict.get(unlocks, key), [])
}

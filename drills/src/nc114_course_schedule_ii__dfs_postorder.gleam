import gleam/dict.{type Dict}
import gleam/list
import gleam/result
import gleam/set.{type Set}

pub fn find_order(
  num_courses: Int,
  prerequisites: List(#(Int, Int)),
) -> List(Int) {
  let needs =
    list.fold(prerequisites, dict.new(), fn(acc, pair) {
      dict.insert(acc, pair.0, [pair.1, ..needed(acc, pair.0)])
    })

  // Depth-first, recording a course only *after* everything it depends on has
  // been recorded. That post-order is a valid schedule by construction \u{2014} no
  // indegrees to maintain \u{2014} and the in-progress set doubles as the cycle
  // check, which is what makes the impossible case fall out of the same walk.
  case
    list.try_fold(courses(num_courses), #([], set.new()), fn(state, course) {
      let #(order, done) = state
      visit(course, needs, set.new(), done, order)
    })
  {
    Ok(#(order, _)) -> list.reverse(order)
    Error(Nil) -> []
  }
}

fn visit(
  course: Int,
  needs: Dict(Int, List(Int)),
  on_path: Set(Int),
  done: Set(Int),
  order: List(Int),
) -> Result(#(List(Int), Set(Int)), Nil) {
  case set.contains(on_path, course) {
    True -> Error(Nil)
    False ->
      case set.contains(done, course) {
        True -> Ok(#(order, done))
        False -> {
          let on_path = set.insert(on_path, course)
          case
            list.try_fold(
              needed(needs, course),
              #(order, done),
              fn(state, next) {
                let #(order, done) = state
                visit(next, needs, on_path, done, order)
              },
            )
          {
            Ok(#(order, done)) ->
              Ok(#([course, ..order], set.insert(done, course)))
            Error(Nil) -> Error(Nil)
          }
        }
      }
  }
}

fn courses(n: Int) -> List(Int) {
  list.index_map(list.repeat(Nil, n), fn(_, i) { i })
}

fn needed(needs: Dict(Int, List(Int)), key: Int) -> List(Int) {
  result.unwrap(dict.get(needs, key), [])
}

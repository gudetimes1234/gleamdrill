import gleam/dict
import gleam/int
import gleam/list

pub fn least_interval(tasks: List(String), n: Int) -> Int {
  let counts =
    list.fold(tasks, dict.new(), fn(acc, task) {
      dict.insert(acc, task, tally(acc, task) + 1)
    })

  run_rounds(dict.values(counts), n, 0)
}

/// Run the schedule instead of computing it. Each round runs the n + 1 most
/// frequent tasks still outstanding \u{2014} which is the greedy choice, and needs
/// the collection to hand back its largest values over and over, exactly the
/// heap's job. The last round costs only as many ticks as it actually uses.
fn run_rounds(remaining: List(Int), n: Int, elapsed: Int) -> Int {
  let outstanding = list.filter(remaining, fn(count) { count > 0 })
  case outstanding {
    [] -> elapsed
    _ -> {
      let ordered = list.sort(outstanding, fn(a, b) { int.compare(b, a) })
      let running = list.take(ordered, n + 1)
      let idle = list.drop(ordered, n + 1)
      let next = list.append(list.map(running, fn(count) { count - 1 }), idle)

      case list.any(next, fn(count) { count > 0 }) {
        True -> run_rounds(next, n, elapsed + n + 1)
        False -> elapsed + list.length(running)
      }
    }
  }
}

fn tally(counts: dict.Dict(String, Int), key: String) -> Int {
  case dict.get(counts, key) {
    Ok(n) -> n
    Error(Nil) -> 0
  }
}

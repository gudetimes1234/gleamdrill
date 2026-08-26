import gleam/dict
import gleam/int
import gleam/list

pub fn least_interval(tasks: List(String), n: Int) -> Int {
  case tasks {
    [] -> 0
    _ -> {
      let counts =
        list.fold(tasks, dict.new(), fn(acc, task) {
          dict.insert(acc, task, tally(acc, task) + 1)
        })
      let frequencies = dict.values(counts)
      let busiest = list.fold(frequencies, 0, int.max)
      let ties = list.count(frequencies, fn(count) { count == busiest })

      // Lay the most frequent task out first with gaps of n between its copies.
      // That skeleton is (busiest - 1) full frames of n + 1 slots, plus the
      // final row of every task tied for busiest. Everything else either fits
      // into an idle slot or, if there is not room, has already pushed the
      // total past the skeleton \u{2014} in which case no idling happens at all and
      // the answer is simply the number of tasks.
      int.max(list.length(tasks), { busiest - 1 } * { n + 1 } + ties)
    }
  }
}

fn tally(counts: dict.Dict(String, Int), key: String) -> Int {
  case dict.get(counts, key) {
    Ok(n) -> n
    Error(Nil) -> 0
  }
}

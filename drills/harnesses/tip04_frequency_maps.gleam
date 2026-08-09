import gleam/dict
import gleam/list
import gleam/string
import solution

/// Dicts have no meaningful order, so compare a sorted association list.
fn normalise(counts: dict.Dict(String, Int)) -> List(#(String, Int)) {
  counts
  |> dict.to_list
  |> list.sort(fn(a, b) { string.compare(a.0, b.0) })
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "word_frequencies(\"the cat and the hat\")",
      string.inspect([#("and", 1), #("cat", 1), #("hat", 1), #("the", 2)]),
      string.inspect(normalise(solution.word_frequencies("the cat and the hat"))),
    ),
    #(
      "word_frequencies(\"\")",
      string.inspect([]),
      string.inspect(normalise(solution.word_frequencies(""))),
    ),
    #(
      "word_frequencies(\"Go go GO\")",
      string.inspect([#("go", 3)]),
      string.inspect(normalise(solution.word_frequencies("Go go GO"))),
    ),
  ]
}

import algodrill/problem.{
  type Category, type Problem, Category, Gleam, Problem, Solution, Subcategory,
}
import algodrill/problems/approaches
import algodrill/problems/embedded
import gleam/list
import gleam/option.{None, Some}

pub fn category() -> Category {
  Category("Gleam Tips", [
    Subcategory("Idioms", [
      drill(
        "Pattern matching on lists",
        "Implement length and last for List(a) using only case expressions with empty, single-element, and head-tail patterns.",
        embedded.tip01_list_patterns(),
      ),
      drill(
        "Tail recursion with accumulators",
        "Implement reverse and sum as tail-recursive functions: a public wrapper plus a private loop helper carrying an accumulator.",
        embedded.tip02_tail_recursion(),
      ),
      drill(
        "fold is the loop",
        "Implement max, count_if, and running_total using only list.fold and list.scan - no hand-written recursion.",
        embedded.tip03_fold(),
      ),
      drill(
        "Frequency maps with dict.upsert",
        "Build word_frequencies(text) returning a Dict(String, Int) of word counts: lowercase, split on spaces, drop empties, then fold with dict.upsert.",
        embedded.tip04_frequency_maps(),
      ),
      drill(
        "Result chains with use",
        "Define a Config record and parse_config(host, port, timeout) that chains two int.parse calls with use + result.try and rejects an empty host.",
        embedded.tip05_result_chains(),
      ),
      drill(
        "Option ergonomics",
        "Write port_description(config) that reads an optional \"port\" entry from a Dict and produces a display string via option.from_result, option.map, and option.unwrap - no case expression.",
        embedded.tip06_option(),
      ),
      drill(
        "String prefix patterns and graphemes",
        "Implement strip_comment using \"# \" <> rest string-prefix patterns, and initials(name) using string.to_graphemes with list.filter_map.",
        embedded.tip07_string_patterns(),
      ),
      drill(
        "Pipelines",
        "Write slug(title) as a single |> pipeline: trim, lowercase, split on spaces, drop empty words, join with dashes.",
        embedded.tip08_pipelines(),
      ),
      drill(
        "Records: labelled args and update syntax",
        "Define a Player record and write new_player (labelled construction), add_points, and level_up using Player(..player, field: value) update syntax.",
        embedded.tip09_records(),
      ),
      drill(
        "gleam/set for membership and dedupe",
        "Implement dedupe(items) preserving first occurrence: fold carrying #(kept, seen_set), then reverse the kept list.",
        embedded.tip10_set_dedupe(),
      ),
    ]),
  ])
}

fn drill(title: String, prompt: String, e: embedded.Embedded) -> Problem {
  Problem(
    title: title,
    prompt: prompt,
    approach: approaches.for_title(title),
    solutions: list.map(e.solutions, fn(s) {
      Solution(label: s.0, complexity: s.1, note: s.2, code: s.3)
    }),
    language: Gleam,
    check: Some(e.check),
    quiz: None,
  )
}

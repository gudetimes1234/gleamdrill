import algodrill/problem.{type Category, Category, Gleam, Problem, Subcategory}

pub fn category() -> Category {
  Category("Gleam Tips", [
    Subcategory("Idioms", [
      Problem(
        title: "Pattern matching on lists",
        prompt: "Implement length and last for List(a) using only case expressions with empty, single-element, and head-tail patterns.",
        solution: "pub fn length(items: List(a)) -> Int {
  case items {
    [] -> 0
    [_, ..rest] -> 1 + length(rest)
  }
}

pub fn last(items: List(a)) -> Result(a, Nil) {
  case items {
    [] -> Error(Nil)
    [only] -> Ok(only)
    [_, ..rest] -> last(rest)
  }
}",
        language: Gleam,
      ),
      Problem(
        title: "Tail recursion with accumulators",
        prompt: "Implement reverse and sum as tail-recursive functions: a public wrapper plus a private loop helper carrying an accumulator.",
        solution: "pub fn reverse(items: List(a)) -> List(a) {
  reverse_loop(items, [])
}

fn reverse_loop(items: List(a), acc: List(a)) -> List(a) {
  case items {
    [] -> acc
    [first, ..rest] -> reverse_loop(rest, [first, ..acc])
  }
}

pub fn sum(numbers: List(Int)) -> Int {
  sum_loop(numbers, 0)
}

fn sum_loop(numbers: List(Int), acc: Int) -> Int {
  case numbers {
    [] -> acc
    [first, ..rest] -> sum_loop(rest, acc + first)
  }
}",
        language: Gleam,
      ),
      Problem(
        title: "fold is the loop",
        prompt: "Implement max, count_if, and running_total using only list.fold and list.scan - no hand-written recursion.",
        solution: "pub fn max(numbers: List(Int)) -> Result(Int, Nil) {
  case numbers {
    [] -> Error(Nil)
    [first, ..rest] -> Ok(list.fold(rest, first, int.max))
  }
}

pub fn count_if(items: List(a), predicate: fn(a) -> Bool) -> Int {
  list.fold(items, 0, fn(count, item) {
    case predicate(item) {
      True -> count + 1
      False -> count
    }
  })
}

pub fn running_total(numbers: List(Int)) -> List(Int) {
  list.scan(numbers, 0, fn(acc, n) { acc + n })
}",
        language: Gleam,
      ),
      Problem(
        title: "Frequency maps with dict.upsert",
        prompt: "Build word_frequencies(text) returning a Dict(String, Int) of word counts: lowercase, split on spaces, drop empties, then fold with dict.upsert.",
        solution: "pub fn word_frequencies(text: String) -> dict.Dict(String, Int) {
  text
  |> string.lowercase
  |> string.split(\" \")
  |> list.filter(fn(word) { word != \"\" })
  |> list.fold(dict.new(), fn(counts, word) {
    dict.upsert(counts, word, fn(n) { option.unwrap(n, 0) + 1 })
  })
}",
        language: Gleam,
      ),
      Problem(
        title: "Result chains with use",
        prompt: "Define a Config record and parse_config(host, port, timeout) that chains two int.parse calls with use + result.try and rejects an empty host.",
        solution: "pub type Config {
  Config(host: String, port: Int, timeout: Int)
}

pub fn parse_config(
  host: String,
  port: String,
  timeout: String,
) -> Result(Config, Nil) {
  use port <- result.try(int.parse(port))
  use timeout <- result.try(int.parse(timeout))
  case host {
    \"\" -> Error(Nil)
    _ -> Ok(Config(host, port, timeout))
  }
}",
        language: Gleam,
      ),
      Problem(
        title: "Option ergonomics",
        prompt: "Write port_description(config) that reads an optional \"port\" entry from a Dict and produces a display string via option.from_result, option.map, and option.unwrap - no case expression.",
        solution: "pub fn port_description(config: dict.Dict(String, String)) -> String {
  let port =
    dict.get(config, \"port\")
    |> option.from_result
    |> option.map(fn(raw) { raw <> \" (configured)\" })
    |> option.unwrap(\"8080 (default)\")
  \"port: \" <> port
}",
        language: Gleam,
      ),
      Problem(
        title: "String prefix patterns and graphemes",
        prompt: "Implement strip_comment using \"# \" <> rest string-prefix patterns, and initials(name) using string.to_graphemes with list.filter_map.",
        solution: "pub fn strip_comment(line: String) -> String {
  case line {
    \"# \" <> rest -> rest
    \"#\" <> rest -> rest
    _ -> line
  }
}

pub fn initials(name: String) -> String {
  name
  |> string.split(\" \")
  |> list.filter_map(fn(word) { list.first(string.to_graphemes(word)) })
  |> string.concat
  |> string.uppercase
}",
        language: Gleam,
      ),
      Problem(
        title: "Pipelines",
        prompt: "Write slug(title) as a single |> pipeline: trim, lowercase, split on spaces, drop empty words, join with dashes.",
        solution: "pub fn slug(title: String) -> String {
  title
  |> string.trim
  |> string.lowercase
  |> string.split(\" \")
  |> list.filter(fn(word) { word != \"\" })
  |> string.join(\"-\")
}",
        language: Gleam,
      ),
      Problem(
        title: "Records: labelled args and update syntax",
        prompt: "Define a Player record and write new_player (labelled construction), add_points, and level_up using Player(..player, field: value) update syntax.",
        solution: "pub type Player {
  Player(name: String, score: Int, level: Int)
}

pub fn new_player(name: String) -> Player {
  Player(name: name, score: 0, level: 1)
}

pub fn add_points(player: Player, points: Int) -> Player {
  Player(..player, score: player.score + points)
}

pub fn level_up(player: Player) -> Player {
  Player(..player, level: player.level + 1, score: 0)
}",
        language: Gleam,
      ),
      Problem(
        title: "gleam/set for membership and dedupe",
        prompt: "Implement dedupe(items) preserving first occurrence: fold carrying #(kept, seen_set), then reverse the kept list.",
        solution: "pub fn dedupe(items: List(a)) -> List(a) {
  let #(kept, _) =
    list.fold(items, #([], set.new()), fn(acc, item) {
      let #(kept, seen) = acc
      case set.contains(seen, item) {
        True -> #(kept, seen)
        False -> #([item, ..kept], set.insert(seen, item))
      }
    })
  list.reverse(kept)
}",
        language: Gleam,
      ),
    ]),
  ])
}

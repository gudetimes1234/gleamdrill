//// The compare screen's arithmetic: which two problems, which of their
//// solutions, and how the right side moves. Pure, so it can be tested
//// without a browser.

import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/string
import gleamdrill/model.{
  type Compare, type CompareSide, Compare, LeftSide, RightSide,
}
import gleamdrill/problem.{type Problem, type ProblemRef}
import gleamdrill/problems
import wire

/// What Browse's selection compares. Two or more in one language: the first
/// against the rest. One alone: against the rest of its topic, which is
/// where the shared shape of a technique lives. Anything else is a reason
/// not to open the screen.
pub fn open(selected: List(ProblemRef)) -> Result(Compare, String) {
  case selected {
    [] -> Error("Select a problem to compare.")
    [only] -> {
      let siblings =
        problems.problems_in(only.category, only.subcategory)
        |> list.map(fn(found: Problem) {
          wire.ProblemRef(only.category, only.subcategory, found.title)
        })
        |> list.filter(fn(ref) { ref != only })
      case siblings {
        [] -> Error("Nothing else in this topic to compare with.")
        others -> ready(only, others)
      }
    }
    [first, ..rest] ->
      case list.all(rest, fn(ref) { ref.category == first.category }) {
        False -> Error("Pick problems in one language to compare them.")
        True -> ready(first, rest)
      }
  }
}

fn ready(
  anchor: ProblemRef,
  others: List(ProblemRef),
) -> Result(Compare, String) {
  case solutions_of(anchor) {
    [] -> Error("That problem has no solution to compare.")
    _ ->
      Ok(Compare(
        anchor:,
        others:,
        index: 0,
        variant_a: default_variant(anchor),
        variant_b: others |> list.first |> option.from_result |> variant_for,
      ))
  }
}

/// The solution a side opens on: the one named after the problem's topic
/// when there is one (a "Two Pointers" solution under Two Pointers is the
/// shape being compared), else the last, which the catalogue orders best.
pub fn default_variant(ref: ProblemRef) -> Int {
  let solutions = solutions_of(ref)
  let topic = string.lowercase(ref.subcategory)
  let named =
    solutions
    |> list.index_map(fn(solution: problem.Solution, index) {
      #(index, string.lowercase(solution.label))
    })
    |> list.find(fn(entry) { string.contains(entry.1, topic) })
  case named {
    Ok(#(index, _)) -> index
    Error(Nil) -> int.max(list.length(solutions) - 1, 0)
  }
}

fn variant_for(ref: Option(ProblemRef)) -> Int {
  case ref {
    Some(ref) -> default_variant(ref)
    None -> 0
  }
}

/// The problem on the right, if the anchor has company.
pub fn right(c: Compare) -> Option(ProblemRef) {
  c.others |> list.drop(c.index) |> list.first |> option.from_result
}

/// Steps the right side through the others, round the loop, starting again
/// from its first solution.
pub fn moved(c: Compare, delta: Int) -> Compare {
  case list.length(c.others) {
    0 -> c
    count -> {
      let index = { { c.index + delta } % count + count } % count
      let moved = Compare(..c, index:)
      Compare(..moved, variant_b: variant_for(right(moved)))
    }
  }
}

/// One side's solution, held within what that problem has.
pub fn picked(c: Compare, side: CompareSide, index: Int) -> Compare {
  let clamp = fn(ref: Option(ProblemRef), wanted) {
    let count = case ref {
      Some(ref) -> list.length(solutions_of(ref))
      None -> 0
    }
    int.clamp(wanted, 0, int.max(count - 1, 0))
  }
  case side {
    LeftSide -> Compare(..c, variant_a: clamp(Some(c.anchor), index))
    RightSide -> Compare(..c, variant_b: clamp(right(c), index))
  }
}

/// The code each side shows: the chosen solution, or nothing to show.
pub fn code(ref: Option(ProblemRef), variant: Int) -> String {
  case ref {
    Some(ref) ->
      solutions_of(ref)
      |> list.drop(variant)
      |> list.first
      |> result.map(fn(solution: problem.Solution) { solution.code })
      |> result.unwrap("")
    None -> ""
  }
}

pub fn solutions_of(ref: ProblemRef) -> List(problem.Solution) {
  case problems.find(ref.category, ref.subcategory, ref.title) {
    Ok(found) -> found.solutions
    Error(Nil) -> []
  }
}

/// The highlighting mode for the element: both sides share the anchor's
/// language, by construction.
pub fn language(c: Compare) -> String {
  case problems.find(c.anchor.category, c.anchor.subcategory, c.anchor.title) {
    Ok(found) -> problem.language_slug(found.language)
    Error(Nil) -> "gleam"
  }
}

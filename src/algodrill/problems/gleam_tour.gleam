//// The Gleam Language Tour, tour.gleam.run, as a category of read-and-run
//// cards: the prompt is the lesson's prose, the editor opens on the lesson's
//// program, Run shows what it prints. Nothing is graded by the run -- the
//// point of a lesson is to be read and tried, so the four grades are on
//// offer from the moment the card opens, like a reveal-only drill. The
//// lessons are vendored under drills/tour (Apache-2.0; see UPSTREAM there).

import algodrill/problem.{
  type Category, type Problem, type Subcategory, Category, Check, Gleam, Problem,
  Subcategory,
}
import algodrill/problems/embedded_tour.{type Lesson}
import gleam/list
import gleam/option.{None, Some}

pub const name = "Gleam Language Tour"

/// Every card runs the same harness: call the lesson's `main` so its output
/// lands in the Output pane, then report a single case that cannot fail. A
/// harness with no cases would read as a broken run (see model.run_failed),
/// and the card is ungraded anyway.
const harness = "import solution

pub fn run() -> List(#(String, String, String)) {
  solution.main()
  [#(\"main()\", \"ran\", \"ran\")]
}
"

pub fn category() -> Category {
  Category(name, chapters(embedded_tour.lessons(), []))
}

/// Groups consecutive lessons of one chapter into a subcategory, keeping the
/// generated order, which is the tour's own.
fn chapters(
  lessons: List(Lesson),
  acc: List(Subcategory),
) -> List(Subcategory) {
  case lessons {
    [] -> list.reverse(acc)
    [first, ..] -> {
      let #(mine, rest) =
        list.split_while(lessons, fn(lesson) { lesson.chapter == first.chapter })
      chapters(rest, [Subcategory(first.chapter, list.map(mine, card)), ..acc])
    }
  }
}

fn card(lesson: Lesson) -> Problem {
  Problem(
    title: lesson.title,
    prompt: lesson.prose,
    prompt_html: True,
    approach: [],
    // Nothing to reveal: the program is already in the editor.
    solutions: [],
    language: Gleam,
    check: Some(Check(
      signature: "",
      starter: lesson.code,
      harness: harness,
      graded: False,
    )),
    quiz: None,
  )
}

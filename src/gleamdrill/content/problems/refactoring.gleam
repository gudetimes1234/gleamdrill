//// The refactoring decks (Ruby, Python, Go): each drill hands over code that
//// works but reads badly, and asks for it rewritten the idiomatic way. The
//// starter is the "before"; the check tests that the behaviour survived and
//// that the code took the new shape (`uses`, `avoids`). Both versions are
//// solutions, so the original stays one key away after editing. Sources,
//// titles and prompts: drills/<language>/refactor/.

import gleam/list
import gleam/option.{None, Some}
import gleamdrill/content/problem.{
  type Category, type Language, type Problem, Category, Problem, Solution,
  Subcategory,
}
import gleamdrill/content/problems/generated/embedded.{type Embedded}

/// One subcategory per section, in the order the sections first appear.
pub fn category(
  name: String,
  language: Language,
  drills: List(#(String, String, String, Embedded)),
) -> Category {
  let sections =
    list.fold(drills, [], fn(seen, entry) {
      case list.contains(seen, entry.0) {
        True -> seen
        False -> [entry.0, ..seen]
      }
    })
    |> list.reverse
  Category(
    name,
    list.map(sections, fn(section) {
      Subcategory(
        section,
        drills
          |> list.filter(fn(entry) { entry.0 == section })
          |> list.map(fn(entry) { drill(language, entry.1, entry.2, entry.3) }),
      )
    }),
  )
}

fn drill(
  language: Language,
  title: String,
  prompt: String,
  e: Embedded,
) -> Problem {
  Problem(
    title: title,
    prompt_html: False,
    prompt: prompt,
    approach: [],
    patterns: [],
    solutions: list.map(e.solutions, fn(s) {
      Solution(label: s.0, complexity: s.1, note: s.2, code: s.3)
    }),
    language: language,
    check: Some(e.check),
    quiz: None,
    board: None,
    difficulty: None,
  )
}

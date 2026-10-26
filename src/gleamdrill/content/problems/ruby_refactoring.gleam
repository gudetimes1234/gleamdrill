//// Ruby Refactoring: each drill hands over Ruby that works but reads badly,
//// and asks for it rewritten the idiomatic way. The starter is the "before";
//// the check runs on the server like every Ruby drill, testing that the
//// behaviour survived (`tc`) and that the code took the new shape (`uses`,
//// `avoids`). Both versions are solutions, so the original stays one key
//// away after editing. Sources, titles and prompts: drills/ruby/refactor/.

import gleam/list
import gleam/option.{None, Some}
import gleamdrill/content/problem.{
  type Category, type Problem, Category, Problem, Ruby, Solution, Subcategory,
}
import gleamdrill/content/problems/generated/embedded.{type Embedded}
import gleamdrill/content/problems/generated/embedded_ruby_refactor as rf

pub const name = "Ruby Refactoring"

/// One subcategory per section, in the order the sections first appear.
pub fn category() -> Category {
  let drills = rf.drills()
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
          |> list.map(fn(entry) { drill(entry.1, entry.2, entry.3) }),
      )
    }),
  )
}

fn drill(title: String, prompt: String, e: Embedded) -> Problem {
  Problem(
    title: title,
    prompt_html: False,
    prompt: prompt,
    approach: [],
    solutions: list.map(e.solutions, fn(s) {
      Solution(label: s.0, complexity: s.1, note: s.2, code: s.3)
    }),
    language: Ruby,
    check: Some(e.check),
    quiz: None,
    board: None,
    difficulty: None,
  )
}

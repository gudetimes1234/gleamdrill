import gleam/list
import gleam/option.{type Option, None}
import gleam/string
import gleamdrill/problem.{type Category, type Problem, type ProblemRef}
import gleamdrill/problems/neetcode_elixir
import gleamdrill/problems/neetcode_gleam
import gleamdrill/problems/neetcode_go
import gleamdrill/problems/neetcode_haskell
import gleamdrill/problems/neetcode_python
import gleamdrill/problems/neetcode_ts
import gleamdrill/problems/system_design
import gleamdrill/problems/system_design_board
import wire.{ProblemRef}

/// Memoised: see problems_ffi.mjs. Deterministic, so the first call builds and
/// every later one is free.
pub fn all() -> List(Category) {
  ffi_memo(build)
}

fn build() -> List(Category) {
  // Tips categories are deliberately absent: the content is half-baked. The
  // modules stay in the tree and verified; re-adding a line here restores
  // them. Their absence also removes them from `all_refs`, so the study queue
  // stops introducing them and existing tips cards go dormant. The Gleam
  // Language Tour is absent for a different reason: it is played in order
  // from its own screen (see tour.gleam), not scheduled.
  [
    neetcode_python.category(),
    neetcode_gleam.category(),
    neetcode_ts.category(),
    neetcode_elixir.category(),
    neetcode_go.category(),
    neetcode_haskell.category(),
    system_design.category(),
    system_design_board.category(),
  ]
}

@external(javascript, "./problems_ffi.mjs", "memo")
fn ffi_memo(build: fn() -> List(Category)) -> List(Category)

/// Refs for every quiz question in the System Design category, grouped by
/// subcategory. The exam sampler takes a flat number from each group rather
/// than sampling the flattened list, so a thin section still gets the same
/// number of questions as a fat one — equal resolution per section is the
/// whole point of scoring per section.
pub fn quiz_pool() -> List(#(String, List(ProblemRef))) {
  subcategory_names(system_design.name)
  |> list.map(fn(sub) {
    #(
      sub,
      problems_in(system_design.name, sub)
        // The sampler renders a multiple-choice question. Anything without a
        // Quiz is not an exam question whatever category it landed in -- the
        // board drills have their own, but the filter is what makes that a
        // property of the problem rather than a convention about categories.
        |> list.filter(fn(p: Problem) { p.quiz != None })
        |> list.map(fn(p: Problem) {
          ProblemRef(system_design.name, sub, p.title)
        }),
    )
  })
  // Empty sections are dropped, not merely hidden: `sample_exam` divides the
  // forty questions by the number of sections, so a section contributing
  // nothing would shrink every other section's slice.
  |> list.filter(fn(entry: #(String, List(ProblemRef))) { entry.1 != [] })
}

pub fn category_names() -> List(String) {
  list.map(all(), fn(c: Category) { c.name })
}

pub fn subcategory_names(category: String) -> List(String) {
  case list.find(all(), fn(c: Category) { c.name == category }) {
    Ok(cat) ->
      list.map(cat.subcategories, fn(s: problem.Subcategory) { s.name })
    Error(Nil) -> []
  }
}

/// Every distinct subcategory name across the whole catalogue, in catalogue
/// order. The same topics ("Arrays & Hashing") repeat once per language, and
/// the queue screen filters on the topic rather than on one language's copy of
/// it, so the list is deduplicated.
pub fn topic_names() -> List(String) {
  all()
  |> list.flat_map(fn(c: Category) {
    list.map(c.subcategories, fn(s: problem.Subcategory) { s.name })
  })
  |> list.fold([], fn(seen, name) {
    case list.contains(seen, name) {
      True -> seen
      False -> [name, ..seen]
    }
  })
  |> list.reverse
}

pub fn problems_in(category: String, subcategory: String) -> List(Problem) {
  case list.find(all(), fn(c: Category) { c.name == category }) {
    Ok(cat) ->
      case
        list.find(cat.subcategories, fn(s: problem.Subcategory) {
          s.name == subcategory
        })
      {
        Ok(sub) -> sub.problems
        Error(Nil) -> []
      }
    Error(Nil) -> []
  }
}

/// LeetCode's rating of a problem, or `None` for one without (a quiz) and
/// for a ref the catalogue no longer has.
pub fn difficulty_of(ref: ProblemRef) -> Option(problem.Difficulty) {
  case find(ref.category, ref.subcategory, ref.title) {
    Ok(found) -> found.difficulty
    Error(Nil) -> None
  }
}

pub fn find(
  category: String,
  subcategory: String,
  title: String,
) -> Result(Problem, Nil) {
  use cat <- try_find(all(), fn(c: Category) { c.name == category })
  use sub <- try_find(cat.subcategories, fn(s: problem.Subcategory) {
    s.name == subcategory
  })
  list.find(sub.problems, fn(p: Problem) { p.title == title })
}

fn try_find(
  items: List(a),
  predicate: fn(a) -> Bool,
  next: fn(a) -> Result(b, Nil),
) -> Result(b, Nil) {
  case list.find(items, predicate) {
    Ok(item) -> next(item)
    Error(Nil) -> Error(Nil)
  }
}

/// Every drill in the catalogue, in catalogue order.
///
/// The scheduler needs this because the server cannot: it stores cards, not a
/// catalogue, so "what could I queue" is a question only the client — which
/// ships the problems — can answer. Catalogue order is also the order queued
/// new cards are introduced in, which is why it is NeetCode's own ordering and
/// not something derived.
pub fn all_refs() -> List(ProblemRef) {
  use category <- list.flat_map(all())
  use subcategory <- list.flat_map(category.subcategories)
  use problem <- list.map(subcategory.problems)
  ProblemRef(category.name, subcategory.name, problem.title)
}

/// `all_refs` narrowed to one track, in catalogue order.
///
/// Order matters and is why this filters the catalogue rather than rebuilding
/// it: catalogue order is NeetCode's topic progression, and it is the order
/// queued new cards are introduced in.
pub fn refs_in(track: String) -> List(ProblemRef) {
  all_refs() |> list.filter(fn(ref: ProblemRef) { ref.category == track })
}

/// `search_refs` narrowed to one track.
pub fn search_refs_in(track: String, query: String) -> List(ProblemRef) {
  search_refs(query)
  |> list.filter(fn(ref: ProblemRef) { ref.category == track })
}

/// Every problem whose title contains the query, case-insensitively, in
/// catalogue order. Shared by the search view and the keyboard cursor so the
/// row the cursor thinks it is on is the row on screen.
pub fn search_refs(query: String) -> List(ProblemRef) {
  let needle = string.lowercase(query)
  use category <- list.flat_map(all())
  use subcategory <- list.flat_map(category.subcategories)
  use found <- list.filter_map(subcategory.problems)
  case string.contains(string.lowercase(found.title), needle) {
    True -> Ok(ProblemRef(category.name, subcategory.name, found.title))
    False -> Error(Nil)
  }
}

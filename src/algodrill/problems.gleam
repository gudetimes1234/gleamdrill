import algodrill/problem.{type Category, type Problem, type ProblemRef}
import algodrill/problems/neetcode_elixir
import algodrill/problems/neetcode_gleam
import algodrill/problems/neetcode_python
import algodrill/problems/neetcode_ts
import algodrill/problems/system_design
import gleam/list
import gleam/result
import gleam/string
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
  // stops introducing them and existing tips cards go dormant.
  [
    neetcode_python.category(),
    neetcode_gleam.category(),
    neetcode_ts.category(),
    neetcode_elixir.category(),
    system_design.category(),
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
        |> list.map(fn(p: Problem) {
          ProblemRef(system_design.name, sub, p.title)
        }),
    )
  })
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
/// The scheduler needs this because the server cannot: cards are created on
/// first review, so "which problems have I never seen" is a question only the
/// client — which ships the catalogue — can answer. Catalogue order is also
/// the order new cards are introduced in, which is why it is NeetCode's own
/// ordering and not something derived.
pub fn all_refs() -> List(ProblemRef) {
  use category <- list.flat_map(all())
  use subcategory <- list.flat_map(category.subcategories)
  use problem <- list.map(subcategory.problems)
  ProblemRef(category.name, subcategory.name, problem.title)
}

/// The Language pane's rows: display label and the category it opens.
///
/// The label comes from each category's own content — its first problem's
/// language — so a new category slots in with no edit here. A `Concept`
/// category (System Design) is its own label, since "Concept" names nothing.
pub fn language_entries() -> List(#(String, String)) {
  use category <- list.map(all())
  #(label_for(category), category.name)
}

fn label_for(category: Category) -> String {
  case first_language(category) {
    Ok(problem.Concept) | Error(Nil) -> category.name
    Ok(language) -> problem.language_label(language)
  }
}

fn first_language(category: Category) -> Result(problem.Language, Nil) {
  use subcategory <- result.try(list.first(category.subcategories))
  use first <- result.try(list.first(subcategory.problems))
  Ok(first.language)
}

/// The label the Language pane uses for a category, for breadcrumbs.
pub fn language_label(category_name: String) -> String {
  case list.find(all(), fn(c: Category) { c.name == category_name }) {
    Ok(category) -> label_for(category)
    Error(Nil) -> category_name
  }
}

/// Two-letter tag for the Selected pane, where every language can appear at
/// once and the full label would drown the titles.
pub fn language_tag(category_name: String) -> String {
  case list.find(all(), fn(c: Category) { c.name == category_name }) {
    Ok(category) ->
      case first_language(category) {
        Ok(problem.Python) -> "py"
        Ok(problem.Gleam) -> "gl"
        Ok(problem.TypeScript) -> "ts"
        Ok(problem.Elixir) -> "ex"
        Ok(problem.Concept) | Error(Nil) -> "sd"
      }
    Error(Nil) -> "??"
  }
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

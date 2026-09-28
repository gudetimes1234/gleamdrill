//// A track is a top-level category, and its *name* is its identity.
////
//// `ProblemRef(category, subcategory, title)` is what localStorage, the
//// server's `cards` table and the scheduler all agree on, and its `category`
//// already says which track a problem is in -- "NeetCode 150 (Go)",
//// "System Design". So no table needs a language column and no card has to
//// move: this module is a name for a mapping the data has always had, not a
//// new thing stored anywhere.
////
//// It exists so the forty-odd sites that want "which track is this" stop
//// reaching for `ref.category` and saying nothing about why. If tracks ever
//// stop being one-to-one with categories, `of_ref` and `all` are the two
//// functions that change.
////
//// One wart it papers over: Python's category is the bare "NeetCode 150"
//// (`neetcode_python.gleam`), where the other four carry a suffix. `label`
//// fixes that for display while the key never moves -- renaming it would
//// orphan every Python card in Postgres and in every browser, and the undo
//// snapshots in `reviews.card_before` embed the old string besides.

import gleam/list
import gleam/result
import gleamdrill/problem.{type Category, type ProblemRef}
import gleamdrill/problems

pub type Track =
  String

/// Every track in the catalogue, in catalogue order.
pub fn all() -> List(Track) {
  list.map(problems.all(), fn(category: Category) { category.name })
}

/// The whole mapping, in one line, named.
pub fn of_ref(ref: ProblemRef) -> Track {
  ref.category
}

/// Whether the catalogue still has this track. A stored name can outlive the
/// bundle that wrote it -- a renamed category, a stale offline cache -- and a
/// device preference pointing at nothing should fall back rather than empty
/// every screen.
pub fn exists(track: Track) -> Bool {
  list.contains(all(), track)
}

/// What to call a track on screen: the language it drills, or the category's
/// own name where that already says what it is ("System Design").
pub fn label(track: Track) -> String {
  case find(track) {
    Ok(category) -> label_for(category)
    Error(Nil) -> track
  }
}

/// Two-letter tag, for the places every track can appear at once and a full
/// label would drown the titles.
pub fn tag(track: Track) -> String {
  case language(track) {
    Ok(problem.Python) -> "py"
    Ok(problem.Gleam) -> "gl"
    Ok(problem.TypeScript) -> "ts"
    Ok(problem.Elixir) -> "ex"
    Ok(problem.Go) -> "go"
    Ok(problem.Board) -> "bd"
    Ok(problem.Concept) | Error(Nil) ->
      case exists(track) {
        True -> "sd"
        False -> "??"
      }
  }
}

/// Every track with its label, in catalogue order: the switcher's rows.
///
/// Derived from the content rather than a hardcoded list, so a new category
/// appears wherever tracks are offered without an edit here.
pub fn entries() -> List(#(Track, String)) {
  use category <- list.map(problems.all())
  #(category.name, label_for(category))
}

/// What a track drills, taken from its first problem. `Concept` and `Board`
/// are not programming languages; see `problem.Language`.
pub fn language(track: Track) -> Result(problem.Language, Nil) {
  use category <- result.try(find(track))
  use subcategory <- result.try(list.first(category.subcategories))
  use first <- result.try(list.first(subcategory.problems))
  Ok(first.language)
}

fn find(track: Track) -> Result(Category, Nil) {
  list.find(problems.all(), fn(category: Category) { category.name == track })
}

fn label_for(category: Category) -> String {
  case first_language(category) {
    // A concept or board category's name already says what it is ("System
    // Design", "System Design Board"); a language label would only repeat it.
    Ok(problem.Concept) | Ok(problem.Board) | Error(Nil) -> category.name
    Ok(found) -> problem.language_label(found)
  }
}

fn first_language(category: Category) -> Result(problem.Language, Nil) {
  use subcategory <- result.try(list.first(category.subcategories))
  use first <- result.try(list.first(subcategory.problems))
  Ok(first.language)
}

import algodrill/problem.{type Category, type Problem}
import algodrill/problems/gleam_idioms
import algodrill/problems/neetcode_elixir
import algodrill/problems/neetcode_gleam
import algodrill/problems/neetcode_python
import algodrill/problems/neetcode_ts
import algodrill/problems/python_tips
import gleam/list

pub fn all() -> List(Category) {
  [
    neetcode_python.category(),
    neetcode_gleam.category(),
    neetcode_ts.category(),
    neetcode_elixir.category(),
    python_tips.category(),
    gleam_idioms.category(),
  ]
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

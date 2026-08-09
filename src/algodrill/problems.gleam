import algodrill/problem.{type Category, type Problem}
import algodrill/problems/neetcode_python
import algodrill/problems/python_tips
import gleam/list

pub fn all() -> List(Category) {
  [neetcode_python.category(), python_tips.category()]
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

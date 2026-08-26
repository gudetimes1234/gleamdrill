//// The Python mirror of the NeetCode 150 catalogue.
//// Everything but the language and the lookup lives in catalog.gleam.

import algodrill/problem.{type Category, Python}
import algodrill/problems/catalog
import algodrill/problems/embedded_python
import gleam/option.{Some}
import gleam/result

pub fn category() -> Category {
  catalog.category(catalog.name, Python, fn(stem) {
    use drill <- result.map(embedded_python.by_stem(stem))
    #(drill.solutions, Some(drill.check))
  })
}

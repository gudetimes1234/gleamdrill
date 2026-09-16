//// The Python mirror of the NeetCode 150 catalogue.
//// Everything but the language and the lookup lives in catalog.gleam.

import gleam/option.{Some}
import gleam/result
import gleamdrill/problem.{type Category, Python}
import gleamdrill/problems/catalog
import gleamdrill/problems/embedded_python

pub fn category() -> Category {
  catalog.category(catalog.name, Python, fn(stem) {
    use drill <- result.map(embedded_python.by_stem(stem))
    #(drill.solutions, Some(drill.check))
  })
}

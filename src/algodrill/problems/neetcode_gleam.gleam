//// The Gleam mirror of the NeetCode 150 catalogue.
//// Everything but the language and the lookup lives in catalog.gleam.

import algodrill/problem.{type Category, Gleam}
import algodrill/problems/catalog
import algodrill/problems/embedded
import gleam/option.{Some}
import gleam/result

pub fn category() -> Category {
  catalog.category(catalog.name <> " (Gleam)", Gleam, fn(stem) {
    use drill <- result.map(embedded.by_stem(stem))
    #(drill.solutions, Some(drill.check))
  })
}

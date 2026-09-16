//// The Gleam mirror of the NeetCode 150 catalogue.
//// Everything but the language and the lookup lives in catalog.gleam.

import gleam/option.{Some}
import gleam/result
import gleamdrill/problem.{type Category, Gleam}
import gleamdrill/problems/catalog
import gleamdrill/problems/embedded

pub fn category() -> Category {
  catalog.category(catalog.name <> " (Gleam)", Gleam, fn(stem) {
    use drill <- result.map(embedded.by_stem(stem))
    #(drill.solutions, Some(drill.check))
  })
}

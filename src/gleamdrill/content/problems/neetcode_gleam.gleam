//// The Gleam mirror of the NeetCode 150 catalogue.
//// Everything but the language and the lookup lives in catalog.gleam.

import gleam/option.{Some}
import gleam/result
import gleamdrill/content/problem.{type Category, Gleam}
import gleamdrill/content/problems/catalog
import gleamdrill/content/problems/generated/embedded

pub fn category() -> Category {
  catalog.category(catalog.name <> " (Gleam)", Gleam, fn(stem) {
    use drill <- result.map(embedded.by_stem(stem))
    #(drill.solutions, Some(drill.check))
  })
}

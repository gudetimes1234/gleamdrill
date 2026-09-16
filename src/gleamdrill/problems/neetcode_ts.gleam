//// The TypeScript mirror of the NeetCode 150 catalogue.
//// Everything but the language and the lookup lives in catalog.gleam.

import gleam/option.{Some}
import gleam/result
import gleamdrill/problem.{type Category, TypeScript}
import gleamdrill/problems/catalog
import gleamdrill/problems/embedded_ts

pub fn category() -> Category {
  catalog.category(catalog.name <> " (TypeScript)", TypeScript, fn(stem) {
    use drill <- result.map(embedded_ts.by_stem(stem))
    #(drill.solutions, Some(drill.check))
  })
}

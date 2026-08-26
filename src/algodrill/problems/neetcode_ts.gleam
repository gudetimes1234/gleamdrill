//// The TypeScript mirror of the NeetCode 150 catalogue.
//// Everything but the language and the lookup lives in catalog.gleam.

import algodrill/problem.{type Category, TypeScript}
import algodrill/problems/catalog
import algodrill/problems/embedded_ts
import gleam/option.{Some}
import gleam/result

pub fn category() -> Category {
  catalog.category(catalog.name <> " (TypeScript)", TypeScript, fn(stem) {
    use drill <- result.map(embedded_ts.by_stem(stem))
    #(drill.solutions, Some(drill.check))
  })
}

//// The Haskell mirror of the NeetCode 150 catalogue. Like Go, its drills
//// run on the server -- no browser compiles Haskell -- but they carry a
//// Check like every other language, and the app routes the run over HTTP
//// (see runner.gleam and api.post_run). Everything but the language and
//// the lookup lives in catalog.gleam.

import gleam/option.{Some}
import gleam/result
import gleamdrill/problem.{type Category, Haskell}
import gleamdrill/problems/catalog
import gleamdrill/problems/embedded_haskell

pub fn category() -> Category {
  catalog.category(catalog.name <> " (Haskell)", Haskell, fn(stem) {
    use drill <- result.map(embedded_haskell.by_stem(stem))
    #(drill.solutions, Some(drill.check))
  })
}

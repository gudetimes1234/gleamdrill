//// The Ruby mirror of the NeetCode 150 catalogue. Like Go and Haskell, its
//// drills run on the server -- no browser runs Ruby -- but they carry a
//// Check like every other language, and the app routes the run over HTTP
//// (see runner.gleam and api.post_run). Everything but the language and the
//// lookup lives in catalog.gleam.

import gleam/option.{Some}
import gleam/result
import gleamdrill/content/problem.{type Category, Ruby}
import gleamdrill/content/problems/catalog
import gleamdrill/content/problems/generated/embedded_ruby

pub fn category() -> Category {
  catalog.category(catalog.name <> " (Ruby)", Ruby, fn(stem) {
    use drill <- result.map(embedded_ruby.by_stem(stem))
    #(drill.solutions, Some(drill.check))
  })
}

//// The Go mirror of the NeetCode 150 catalogue. Like Elixir, its drills run
//// on the server -- no browser compiles Go -- but they carry a Check like
//// every other language, and the app routes the run over HTTP (see
//// runner.gleam and api.post_run). Everything but the language and the
//// lookup lives in catalog.gleam.

import gleam/option.{Some}
import gleam/result
import gleamdrill/problem.{type Category, Go}
import gleamdrill/problems/catalog
import gleamdrill/problems/embedded_go

pub fn category() -> Category {
  catalog.category(catalog.name <> " (Go)", Go, fn(stem) {
    use drill <- result.map(embedded_go.by_stem(stem))
    #(drill.solutions, Some(drill.check))
  })
}

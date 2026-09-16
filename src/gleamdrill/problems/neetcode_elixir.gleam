//// The Elixir mirror of the NeetCode 150 catalogue. Its drills run on the
//// server rather than in the browser -- no browser can compile Elixir
//// source -- but they carry a Check like every other language, and the app
//// routes the run over HTTP (see runner.gleam and api.post_run).
//// Everything but the language and the lookup lives in catalog.gleam.

import gleam/option.{Some}
import gleam/result
import gleamdrill/problem.{type Category, Elixir}
import gleamdrill/problems/catalog
import gleamdrill/problems/embedded_elixir

pub fn category() -> Category {
  catalog.category(catalog.name <> " (Elixir)", Elixir, fn(stem) {
    use drill <- result.map(embedded_elixir.by_stem(stem))
    #(drill.solutions, Some(drill.check))
  })
}

//// The Elixir mirror of the NeetCode 150 catalogue. Reveal-only: no browser
//// can compile Elixir source, so there is no Check to hand an attempt to.
//// Everything but the language and the lookup lives in catalog.gleam.

import algodrill/problem.{type Category, Elixir}
import algodrill/problems/catalog
import algodrill/problems/embedded_elixir
import gleam/option.{None}
import gleam/result

pub fn category() -> Category {
  catalog.category(catalog.name <> " (Elixir)", Elixir, fn(stem) {
    use solutions <- result.map(embedded_elixir.by_stem(stem))
    #(solutions, None)
  })
}

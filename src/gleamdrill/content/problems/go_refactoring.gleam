//// Go Refactoring: Go that works but reads badly. Runs on the server like every Go drill.
//// The deck itself is built by refactoring.gleam.

import gleamdrill/content/problem.{type Category, Go}
import gleamdrill/content/problems/generated/embedded_go_refactor
import gleamdrill/content/problems/refactoring

pub const name = "Go Refactoring"

pub fn category() -> Category {
  refactoring.category(name, Go, embedded_go_refactor.drills())
}

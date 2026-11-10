//// Ruby Refactoring: Ruby that works but reads badly. Runs on the server like every Ruby drill.
//// The deck itself is built by refactoring.gleam.

import gleamdrill/content/problem.{type Category, Ruby}
import gleamdrill/content/problems/generated/embedded_ruby_refactor
import gleamdrill/content/problems/refactoring

pub const name = "Ruby Refactoring"

pub fn category() -> Category {
  refactoring.category(name, Ruby, embedded_ruby_refactor.drills())
}

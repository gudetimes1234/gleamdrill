//// Python Refactoring: Python that works but reads badly. Runs in the browser (Brython) like every Python drill.
//// The deck itself is built by refactoring.gleam.

import gleamdrill/content/problem.{type Category, Python}
import gleamdrill/content/problems/generated/embedded_python_refactor
import gleamdrill/content/problems/refactoring

pub const name = "Python Refactoring"

pub fn category() -> Category {
  refactoring.category(name, Python, embedded_python_refactor.drills())
}

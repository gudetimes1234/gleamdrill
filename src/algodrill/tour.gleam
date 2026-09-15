//// The Gleam Language Tour, tour.gleam.run, as a sequence of lessons.
////
//// This is the pure side: which lesson is which, in the tour's own order,
//// grouped into its chapters. The lessons are vendored under drills/tour
//// (Apache-2.0; see UPSTREAM there) and generated into `embedded_tour`; the
//// screen that plays them is view/tour.gleam. It is not a category of the
//// study catalogue -- a lesson is read and tried in order, not scheduled.

import algodrill/problems/embedded_tour
import gleam/list

/// One lesson: its chapter, title, prose (trusted HTML) and program.
pub type Lesson =
  embedded_tour.Lesson

/// Every lesson runs the same harness: call the lesson's `main` so what it
/// prints lands in the output pane, then report a single case that cannot
/// fail. The runtime's protocol wants a case list; nothing reads it here.
pub const harness = "import solution

pub fn run() -> List(#(String, String, String)) {
  solution.main()
  [#(\"main()\", \"ran\", \"ran\")]
}
"

/// The lessons in tour order. Memoised for the same reason `problems.all` is:
/// the contents page and the breadcrumb ask on every render.
pub fn lessons() -> List(Lesson) {
  ffi_memo(embedded_tour.lessons)
}

@external(javascript, "./tour_ffi.mjs", "memo")
fn ffi_memo(build: fn() -> List(Lesson)) -> List(Lesson)

pub fn count() -> Int {
  list.length(lessons())
}

/// The lesson at a zero-based position, if there is one.
pub fn at(index: Int) -> Result(Lesson, Nil) {
  lessons()
  |> list.drop(index)
  |> list.first
}

/// The last valid index, for clamping.
pub fn last() -> Int {
  count() - 1
}

/// The chapters in order, each with its lessons as (index, title).
pub fn chapters() -> List(#(String, List(#(Int, String)))) {
  lessons()
  |> list.index_map(fn(lesson, index) { #(lesson.chapter, index, lesson.title) })
  |> list.chunk(fn(entry) { entry.0 })
  |> list.filter_map(fn(chunk) {
    case chunk {
      [first, ..] -> Ok(#(first.0, list.map(chunk, fn(e) { #(e.1, e.2) })))
      [] -> Error(Nil)
    }
  })
}

/// Where a lesson sits: its chapter, its one-based position in that chapter,
/// and the chapter's size. For the "Basics · 5/18" breadcrumb.
pub fn chapter_position(index: Int) -> #(String, Int, Int) {
  case at(index) {
    Error(Nil) -> #("", 0, 0)
    Ok(lesson) -> {
      let siblings =
        lessons()
        |> list.index_map(fn(l, i) { #(l.chapter, i) })
        |> list.filter(fn(entry) { entry.0 == lesson.chapter })
        |> list.map(fn(entry) { entry.1 })
      let nth =
        list.fold_until(siblings, 1, fn(n, i) {
          case i == index {
            True -> list.Stop(n)
            False -> list.Continue(n + 1)
          }
        })
      #(lesson.chapter, nth, list.length(siblings))
    }
  }
}

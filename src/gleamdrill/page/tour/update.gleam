//// The tour: the contents page, opening and stepping lessons, and the
//// edit-pause compile loop. Runs go through the shared run engine.

import gleam/dict
import gleam/int
import gleam/option.{None, Some}
import gleam/result
import gleamdrill/content/tour
import gleamdrill/model as shared_model
import gleamdrill/page/tour/model.{type Model, Contents, Lesson, Model}
import gleamdrill/page/tour/msg.{type Msg}
import gleamdrill/platform/browser
import gleamdrill/shared.{type Change, type Shared}
import lustre/effect.{type Effect}

/// The contents, with the cursor on the last lesson opened.
pub fn init(shared: Shared) -> #(Model, Effect(Msg), List(Change)) {
  #(model.init(shared.tour_lesson), scroll_to(shared.tour_lesson), [
    shared.ResetRun,
  ])
}

pub fn update(
  shared: Shared,
  page: Model,
  msg: Msg,
) -> #(Model, Effect(Msg), List(Change)) {
  case msg {
    msg.UserOpenedLesson(index) -> open_lesson(shared, index)
    msg.UserClickedNext -> {
      let last = tour.last()
      case page.face {
        // Next on the last lesson is Finish: back to the study screen.
        Lesson(index) if index >= last -> #(page, effect.none(), [
          shared.ResetRun,
          shared.Navigate(shared_model.StudyRoute),
        ])
        Lesson(index) -> open_lesson(shared, index + 1)
        Contents -> open_lesson(shared, page.cursor)
      }
    }
    msg.UserClickedPrev ->
      case page.face {
        Lesson(index) if index > 0 -> open_lesson(shared, index - 1)
        _ -> none(page)
      }
    msg.UserClickedContents ->
      case page.face {
        Lesson(index) -> #(
          Model(..page, face: Contents, cursor: index),
          scroll_to(index),
          [shared.ResetRun],
        )
        Contents -> none(page)
      }
    msg.UserResetLesson ->
      case page.face {
        Lesson(index) ->
          case tour.at(index) {
            Ok(lesson) -> {
              let page = Model(..page, draft: lesson.code)
              let #(run, changes) = run(shared, page)
              #(page, run, [shared.TourEdited(index, None), ..changes])
            }
            Error(Nil) -> none(page)
          }
        Contents -> none(page)
      }
    msg.EditorChanged(text) ->
      case page.face {
        Lesson(index) -> #(Model(..page, draft: text), debounce_run(), [
          shared.TourEdited(index, Some(text)),
        ])
        Contents -> none(page)
      }
    msg.EditorResized(height) -> #(page, effect.none(), [
      shared.EditorHeightChanged(height),
    ])
    msg.UserFocusedEditor -> #(page, focus_editor(), [])
    msg.RunTicked ->
      case shared.run {
        // A run already in flight finishes first; the next pause re-runs.
        shared_model.Running(_, _) -> #(page, debounce_run(), [])
        _ -> {
          let #(fx, changes) = run(shared, page)
          #(page, fx, changes)
        }
      }
    msg.CursorMoved(delta) -> {
      let cursor = int.clamp(page.cursor + delta, 0, tour.last())
      #(Model(..page, cursor:), scroll_to(cursor), [])
    }
    msg.Activated ->
      case page.face {
        Contents -> open_lesson(shared, page.cursor)
        Lesson(_) -> none(page)
      }
    // A lesson opened before the compiler was ready runs now.
    msg.RuntimeReady("gleam") ->
      case shared.run {
        shared_model.RunIdle -> {
          let #(fx, changes) = run(shared, page)
          #(page, fx, changes)
        }
        _ -> none(page)
      }
    msg.RuntimeReady(_) -> none(page)
    msg.UserClickedBack -> #(page, effect.none(), [
      shared.Navigate(shared_model.StudyRoute),
    ])
    msg.UserToggledHelp -> #(page, effect.none(), [shared.ToggleHelp])
  }
}

/// Open one lesson: its draft is whatever was typed there this session,
/// else the lesson's own program; the run starts as soon as the compiler
/// allows.
fn open_lesson(
  shared: Shared,
  index: Int,
) -> #(Model, Effect(Msg), List(Change)) {
  let index = int.clamp(index, 0, tour.last())
  case tour.at(index) {
    Error(Nil) -> #(model.init(index), effect.none(), [])
    Ok(lesson) -> {
      let draft =
        dict.get(shared.tour_edits, index) |> result.unwrap(lesson.code)
      let page = Model(face: Lesson(index), draft:, cursor: index)
      let #(fx, changes) = run(shared, page)
      #(page, fx, [
        shared.TourLessonOpened(index),
        shared.ResetRun,
        shared.Prefetch("gleam"),
        ..changes
      ])
    }
  }
}

/// Runs the open lesson if the compiler is ready; otherwise nothing, and
/// `RuntimeReady` calls back here when it is.
fn run(shared: Shared, page: Model) -> #(Effect(Msg), List(Change)) {
  case page.face, shared_model.runtime_for(shared, "gleam") {
    Lesson(_), shared_model.RuntimeReady -> #(effect.none(), [
      shared.RunLocal("gleam", page.draft, tour.harness),
    ])
    _, _ -> #(effect.none(), [])
  }
}

fn none(page: Model) -> #(Model, Effect(Msg), List(Change)) {
  #(page, effect.none(), [])
}

/// Compile on a pause in typing, the way the tour site does, rather than on
/// every keystroke: a run is a whole compiler pass.
fn debounce_run() -> Effect(Msg) {
  use dispatch <- effect.from
  browser.debounce("tour-run", 500, fn() { dispatch(msg.RunTicked) })
}

fn scroll_to(index: Int) -> Effect(Msg) {
  use _dispatch <- effect.from
  browser.scroll_into_view("tour-" <> int.to_string(index))
}

fn focus_editor() -> Effect(Msg) {
  use _dispatch <- effect.from
  browser.focus_element("gleam-editor")
}

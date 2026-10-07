//// The Gleam Language Tour's actions: the contents page, opening and
//// stepping lessons, the edit-pause compile loop, and the reset.

import gleam/dict
import gleam/int
import gleam/result
import gleamdrill/browser
import gleamdrill/model.{
  type Model, Model, RunIdle, Running, StudyRoute, TourContents, TourLesson,
  TourRoute,
}
import gleamdrill/msg.{type Msg, TourRunTicked}
import gleamdrill/tour
import gleamdrill/update/common
import lustre/effect.{type Effect}

/// Open one lesson: its draft is whatever was typed there this session, else
/// the lesson's own program; the run starts as soon as the compiler allows.
pub fn open_lesson(m: Model, index: Int) -> #(Model, Effect(Msg)) {
  let index = int.clamp(index, 0, tour.last())
  case tour.at(index) {
    Error(Nil) -> #(m, effect.none())
    Ok(lesson) -> {
      let draft =
        dict.get(m.tour_edits, index)
        |> result.unwrap(lesson.code)
      let m =
        Model(
          ..m,
          route: TourRoute,
          tour_page: TourLesson(index),
          tour_draft: draft,
          tour_cursor: index,
          tour_lesson: index,
          run: RunIdle,
        )
      let #(m, run) = common.run_tour_lesson(m)
      common.with_prefetch(#(m, effect.batch([common.save_preferences(m), run])))
    }
  }
}

pub fn open_contents(m: Model) -> #(Model, Effect(Msg)) {
  #(
    Model(
      ..m,
      route: TourRoute,
      tour_page: TourContents,
      tour_cursor: m.tour_lesson,
      run: RunIdle,
    ),
    common.scroll_to("tour-" <> int.to_string(m.tour_lesson)),
  )
}

pub fn next(m: Model) -> #(Model, Effect(Msg)) {
  {
    let last = tour.last()
    case m.tour_page {
      // Next on the last lesson is Finish: back to the study screen.
      TourLesson(index) if index >= last -> #(
        Model(..m, route: StudyRoute, run: RunIdle),
        effect.none(),
      )
      TourLesson(index) -> open_lesson(m, index + 1)
      TourContents -> open_lesson(m, m.tour_cursor)
    }
  }
}

pub fn prev(m: Model) -> #(Model, Effect(Msg)) {
  case m.tour_page {
    TourLesson(index) if index > 0 -> open_lesson(m, index - 1)
    _ -> #(m, effect.none())
  }
}

pub fn to_contents(m: Model) -> #(Model, Effect(Msg)) {
  case m.tour_page {
    TourLesson(index) -> #(
      Model(..m, tour_page: TourContents, tour_cursor: index, run: RunIdle),
      common.scroll_to("tour-" <> int.to_string(index)),
    )
    TourContents -> #(m, effect.none())
  }
}

pub fn reset_lesson(m: Model) -> #(Model, Effect(Msg)) {
  case m.tour_page {
    TourLesson(index) ->
      case tour.at(index) {
        Ok(lesson) -> {
          let m =
            Model(
              ..m,
              tour_draft: lesson.code,
              tour_edits: dict.delete(m.tour_edits, index),
            )
          common.run_tour_lesson(m)
        }
        Error(Nil) -> #(m, effect.none())
      }
    TourContents -> #(m, effect.none())
  }
}

pub fn editor_changed(m: Model, text: String) -> #(Model, Effect(Msg)) {
  case m.tour_page {
    TourLesson(index) -> #(
      Model(
        ..m,
        tour_draft: text,
        tour_edits: dict.insert(m.tour_edits, index, text),
      ),
      // Compile on a pause in typing, the way the tour site does, rather
      // than on every keystroke: a run is a whole compiler pass.
      effect.from(fn(dispatch) {
        browser.debounce("tour-run", 500, fn() { dispatch(TourRunTicked) })
      }),
    )
    TourContents -> #(m, effect.none())
  }
}

pub fn run_ticked(m: Model) -> #(Model, Effect(Msg)) {
  case m.run {
    // A run already in flight finishes first; the next pause re-runs.
    Running(_, _) -> #(
      m,
      effect.from(fn(dispatch) {
        browser.debounce("tour-run", 500, fn() { dispatch(TourRunTicked) })
      }),
    )
    _ -> common.run_tour_lesson(m)
  }
}

pub fn cursor_moved(m: Model, delta: Int) -> #(Model, Effect(Msg)) {
  {
    let cursor = int.clamp(m.tour_cursor + delta, 0, tour.last())
    #(
      Model(..m, tour_cursor: cursor),
      common.scroll_to("tour-" <> int.to_string(cursor)),
    )
  }
}

pub fn activated(m: Model) -> #(Model, Effect(Msg)) {
  case m.tour_page {
    TourContents -> open_lesson(m, m.tour_cursor)
    TourLesson(_) -> #(m, effect.none())
  }
}

//// The Gleam Language Tour, played the way tour.gleam.run plays it: the
//// lesson's prose beside a live editor, the program compiled and run on every
//// pause in typing, and Back · Contents · Next underneath. A table of
//// contents page lists the chapters. Nothing here is graded or scheduled.

import gleam/int
import gleam/list
import gleam/option.{Some}
import gleam/string
import gleamdrill/editor
import gleamdrill/model.{
  type Model, type Msg, Errored, Ran, RunIdle, Running, RuntimeFailed,
  RuntimeLoading, RuntimeNotLoaded, RuntimeReady, TimedOut, TourContents,
  TourEditorChanged, TourLesson, TourRoute, UserClickedBackToStudy,
  UserClickedTourContents, UserClickedTourNext, UserClickedTourPrev,
  UserOpenedLesson, UserResetLesson,
}
import gleamdrill/tour
import gleamdrill/view/nav
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/element/keyed
import lustre/event

pub fn view(m: Model) -> Element(Msg) {
  case m.tour_page {
    TourContents -> contents(m)
    TourLesson(index) ->
      case tour.at(index) {
        Ok(lesson) -> lesson_page(m, index, lesson)
        Error(Nil) -> contents(m)
      }
  }
}

// --- the table of contents -------------------------------------------------

fn contents(m: Model) -> Element(Msg) {
  html.div([attribute.class("tour-screen tour-contents")], [
    html.header([attribute.class("study-header")], [
      html.h1([attribute.class("study-title")], [
        html.text("The Gleam Language Tour"),
      ]),
      nav.bar(m, TourRoute),
    ]),
    nav.notices(m),
    html.p([attribute.class("tour-lede")], [
      html.text(
        "tour.gleam.run, playable here. Every lesson is a short read beside a "
        <> "program you can edit; it compiles and runs as you type. "
        <> "Nothing here is scheduled \u{2014} just read it in order.",
      ),
    ]),
    case m.tour_lesson > 0 {
      True ->
        html.button(
          [
            attribute.class("study-start tour-continue"),
            event.on_click(UserOpenedLesson(m.tour_lesson)),
          ],
          [
            html.text("Continue \u{b7} " <> lesson_title(m.tour_lesson)),
          ],
        )
      False ->
        html.button(
          [
            attribute.class("study-start tour-continue"),
            event.on_click(UserOpenedLesson(0)),
          ],
          [html.text("Start the tour")],
        )
    },
    html.div(
      [attribute.class("tour-chapters")],
      list.map(tour.chapters(), fn(chapter) {
        let #(name, lessons) = chapter
        html.section([attribute.class("tour-chapter")], [
          html.h2([attribute.class("tour-chapter-title")], [html.text(name)]),
          html.ol(
            [attribute.class("tour-toc")],
            list.map(lessons, fn(entry) {
              let #(index, title) = entry
              html.li([], [
                html.button(
                  [
                    attribute.id("tour-" <> int.to_string(index)),
                    attribute.classes([
                      #("tour-toc-item", True),
                      #("current", index == m.tour_lesson),
                      #("cursor", index == m.tour_cursor),
                    ]),
                    event.on_click(UserOpenedLesson(index)),
                  ],
                  [
                    html.span([attribute.class("tour-toc-number")], [
                      html.text(int.to_string(index + 1)),
                    ]),
                    html.text(title),
                  ],
                ),
              ])
            }),
          ),
        ])
      }),
    ),
  ])
}

fn lesson_title(index: Int) -> String {
  case tour.at(index) {
    Ok(lesson) -> lesson.title
    Error(Nil) -> ""
  }
}

// --- one lesson --------------------------------------------------------------

fn lesson_page(m: Model, index: Int, lesson: tour.Lesson) -> Element(Msg) {
  let #(chapter, nth, size) = tour.chapter_position(index)
  html.div([attribute.class("tour-screen tour-lesson")], [
    nav.notices(m),
    html.div([attribute.class("tour-lesson-body")], [
      html.section([attribute.class("tour-prose")], [
        html.div([attribute.class("tour-crumb")], [
          html.button(
            [
              attribute.class("link-button"),
              event.on_click(UserClickedBackToStudy),
            ],
            [html.text("\u{2190} Study")],
          ),
          html.span([attribute.class("tour-crumb-where")], [
            html.text(
              chapter
              <> " \u{b7} "
              <> int.to_string(nth)
              <> "/"
              <> int.to_string(size)
              <> " \u{b7} lesson "
              <> int.to_string(index + 1)
              <> " of "
              <> int.to_string(tour.count()),
            ),
          ]),
        ]),
        html.h2([attribute.class("tour-title")], [html.text(lesson.title)]),
        // Repository-vendored lesson HTML, never user input; the same trust
        // the drill view extends to problem.Problem.prompt_html.
        element.unsafe_raw_html(
          "",
          "div",
          [attribute.class("problem-prompt prose tour-text")],
          lesson.prose,
        ),
      ]),
      html.section([attribute.class("tour-code")], [
        keyed.div([attribute.class("editor-frame tour-editor")], [
          #(
            int.to_string(index),
            editor.view([
              editor.doc(m.tour_draft),
              editor.language("gleam"),
              editor.keymap(m.editor_keymap),
              editor.on_change(TourEditorChanged),
              editor.diagnostics(diagnostics(m)),
            ]),
          ),
        ]),
        html.div([attribute.class("tour-output-head")], [
          html.span([attribute.class("panel-title")], [html.text("Output")]),
          html.button(
            [
              attribute.class("link-button tour-reset"),
              event.on_click(UserResetLesson),
            ],
            [html.text("Reset code")],
          ),
        ]),
        output(m),
      ]),
    ]),
    html.div([attribute.class("tour-nav")], [
      html.button(
        [
          attribute.class("btn-secondary tour-prev"),
          attribute.disabled(index == 0),
          event.on_click(UserClickedTourPrev),
        ],
        [html.text("\u{2190} Back")],
      ),
      html.button(
        [
          attribute.class("btn-secondary tour-contents-link"),
          event.on_click(UserClickedTourContents),
        ],
        [html.text("Contents")],
      ),
      html.button(
        [
          attribute.class("btn-primary tour-next"),
          event.on_click(UserClickedTourNext),
        ],
        [
          html.text(case index >= tour.last() {
            True -> "Finish"
            False -> "Next \u{2192}"
          }),
        ],
      ),
    ]),
  ])
}

/// What the program printed, or why it could not run. Mirrors the site's
/// output pane: stdout, then compile errors and warnings in the same box.
fn output(m: Model) -> Element(Msg) {
  case model.runtime_for(m, "gleam"), m.run {
    RuntimeNotLoaded, _ | RuntimeLoading, _ ->
      html.div([attribute.class("tour-output waiting")], [
        html.text("Loading the Gleam compiler\u{2026}"),
      ])
    RuntimeFailed(message), _ ->
      html.div([attribute.class("tour-output failed")], [
        html.text("The Gleam compiler failed to load: " <> message),
      ])
    RuntimeReady, RunIdle ->
      html.div([attribute.class("tour-output waiting")], [
        html.text("Compiling\u{2026}"),
      ])
    RuntimeReady, Running(_, previous) ->
      html.pre([attribute.class("tour-output stale")], [
        html.text(case string.trim(previous) {
          "" -> "Compiling\u{2026}"
          text -> text
        }),
      ])
    RuntimeReady, Ran(Errored(error), stdout) ->
      html.pre([attribute.class("tour-output error")], [
        html.text(case string.trim(stdout) {
          "" -> error.message
          text -> text <> "\n\n" <> error.message
        }),
      ])
    RuntimeReady, Ran(TimedOut, _) ->
      html.pre([attribute.class("tour-output error")], [
        html.text(
          "The program didn't finish \u{2014} likely an infinite loop. The compiler was restarted.",
        ),
      ])
    RuntimeReady, Ran(_, stdout) ->
      html.pre([attribute.class("tour-output")], [
        html.text(case string.trim(stdout) {
          "" -> "(the program printed nothing)"
          text -> text
        }),
      ])
  }
}

/// Compile errors in the lesson's own module become inline underlines, the
/// same way the drill does it.
fn diagnostics(m: Model) -> List(editor.Diagnostic) {
  case m.run {
    Ran(Errored(error), _) ->
      case error.file, error.line, error.column {
        Some("solution.gleam"), Some(line), Some(column) -> [
          editor.Diagnostic(
            line,
            column,
            error.message
              |> string.split("\n")
              |> list.take(3)
              |> string.join("\n"),
          ),
        ]
        _, _, _ -> []
      }
    _ -> []
  }
}

//// The quiz screen: choices, submit and the verdict.

import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleamdrill/model.{type Model}
import gleamdrill/msg.{
  type Msg, UserClickedNext, UserPickedChoice, UserSubmittedAnswer,
}
import gleamdrill/problem.{type Problem, type ProblemRef, type Quiz}
import gleamdrill/view/results
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

pub fn quiz_main(
  m: Model,
  ref: ProblemRef,
  current: Problem,
  quiz: Quiz,
) -> List(Element(Msg)) {
  let question =
    html.section([attribute.class("read-sheet quiz-question")], [
      html.div([attribute.class("problem-category")], [
        html.text(ref.category <> " \u{203a} " <> ref.subcategory),
      ]),
      results.prompt_block(current),
    ])
  let options =
    html.div(
      [attribute.class("quiz-choices")],
      list.index_map(quiz.choices, fn(text, index) {
        let picked = m.choice == Some(index)
        let is_answer = index == quiz.correct
        html.button(
          [
            attribute.classes([
              #("quiz-choice", True),
              #("picked", picked),
              // Only after grading does the styling say anything true about
              // correctness, otherwise it would give the answer away.
              #("correct", m.graded && is_answer),
              #("wrong", m.graded && picked && !is_answer),
            ]),
            attribute.disabled(m.graded),
            event.on_click(UserPickedChoice(index)),
          ],
          [
            html.span([attribute.class("quiz-marker")], [
              html.text(marker(index)),
            ]),
            html.span([attribute.class("quiz-choice-text")], [html.text(text)]),
          ],
        )
      }),
    )

  let bar =
    html.div([attribute.class("run-bar")], case m.graded {
      False -> [
        html.button(
          [
            attribute.class("btn-primary"),
            attribute.disabled(m.choice == None),
            event.on_click(UserSubmittedAnswer),
          ],
          [html.text("Submit answer")],
        ),
        html.button(
          [
            attribute.class("btn-secondary skip-button"),
            event.on_click(UserClickedNext),
          ],
          [html.text("Skip")],
        ),
      ]
      True -> [
        html.button(
          [
            attribute.class("btn-primary next-button"),
            event.on_click(UserClickedNext),
          ],
          [html.text("Next")],
        ),
      ]
    })

  [question, options, bar, ..quiz_verdict(m, quiz)]
}

fn quiz_verdict(m: Model, quiz: Quiz) -> List(Element(Msg)) {
  case m.graded {
    False -> []
    True -> {
      let right = m.choice == Some(quiz.correct)
      [
        results.results_box(
          m,
          case right {
            True -> "\u{2713} Correct"
            False -> "\u{2717} Not quite"
          },
          right,
          None,
          [
            html.div([attribute.class("quiz-explanation")], [
              html.text(quiz.explanation),
            ]),
            html.div([attribute.class("quiz-page")], [
              html.text("Book reference: " <> quiz.page),
            ]),
          ],
        ),
      ]
    }
  }
}

fn marker(index: Int) -> String {
  case index {
    0 -> "A"
    1 -> "B"
    2 -> "C"
    3 -> "D"
    _ -> int.to_string(index + 1)
  }
}

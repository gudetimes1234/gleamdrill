import algodrill/model.{
  type Model, type Msg, type ProblemRef, UserClickedExitDrill, UserClickedNext,
  UserPressedTab, UserToggledAnswer, UserTypedDraft,
}
import algodrill/problem.{type Problem}
import algodrill/problems
import gleam/dynamic/decode
import gleam/int
import gleam/list
import gleam/result
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/element/keyed
import lustre/event

/// Errors when the drill position points at no problem; the caller falls back
/// to the menu, matching the legacy renderDrill guard.
pub fn view(model: Model) -> Result(Element(Msg), Nil) {
  use ref <- result.try(
    model.selected |> list.drop(model.problem_index) |> list.first,
  )
  use current <- result.try(problems.find(
    ref.category,
    ref.subcategory,
    ref.title,
  ))
  Ok(view_drill(model, ref, current))
}

fn view_drill(model: Model, ref: ProblemRef, current: Problem) -> Element(Msg) {
  let progress =
    "Problem "
    <> int.to_string(model.problem_index + 1)
    <> "/"
    <> int.to_string(list.length(model.selected))
    <> " | Iteration "
    <> int.to_string(model.current_iteration)
    <> "/"
    <> int.to_string(model.iteration_count)

  let body_key =
    ref.category
    <> "|"
    <> ref.subcategory
    <> "|"
    <> ref.title
    <> "|"
    <> int.to_string(model.current_iteration)

  keyed.div([attribute.class("drill-container")], [
    #(
      "header",
      html.div([attribute.class("drill-header")], [
        html.button(
          [
            attribute.id("exitDrill"),
            attribute.class("btn-secondary"),
            event.on_click(UserClickedExitDrill),
          ],
          [html.text("Exit drill")],
        ),
        html.div([attribute.class("progress-text")], [html.text(progress)]),
      ]),
    ),
    #(
      body_key,
      element.fragment([
        html.div([attribute.class("problem-section")], [
          html.h2([], [html.text(current.title)]),
          html.div([attribute.class("problem-category")], [
            html.text(
              ref.category
              <> " \u{203a} "
              <> ref.subcategory
              <> " \u{b7} "
              <> problem.language_label(current.language),
            ),
          ]),
          html.div([attribute.class("problem-prompt")], [
            html.text(current.prompt),
          ]),
        ]),
        html.div([attribute.class("code-section")], [
          html.textarea(
            [
              attribute.id("codeEditor"),
              attribute.placeholder("Write your solution here..."),
              attribute.spellcheck(False),
              attribute.value(model.draft),
              event.on_input(UserTypedDraft),
              on_tab_key(),
            ],
            model.draft,
          ),
        ]),
        html.div([attribute.class("answer-section")], [
          html.button(
            [
              attribute.id("toggleAnswer"),
              attribute.class("btn-secondary"),
              event.on_click(UserToggledAnswer),
            ],
            [
              html.text(case model.answer_revealed {
                True -> "Hide answer"
                False -> "Show answer"
              }),
            ],
          ),
          html.div(
            [
              attribute.id("answerContent"),
              attribute.classes([
                #("answer-content", True),
                #("hidden", !model.answer_revealed),
              ]),
            ],
            [html.pre([], [html.code([], [html.text(current.solution)])])],
          ),
        ]),
        html.div([attribute.class("drill-footer")], [
          html.button(
            [
              attribute.id("nextProblem"),
              attribute.class("btn-primary"),
              event.on_click(UserClickedNext),
            ],
            [html.text("Next")],
          ),
        ]),
      ]),
    ),
  ])
}

fn on_tab_key() -> attribute.Attribute(Msg) {
  event.advanced("keydown", {
    use key <- decode.field("key", decode.string)
    use value <- decode.subfield(["target", "value"], decode.string)
    use start <- decode.subfield(["target", "selectionStart"], decode.int)
    use end <- decode.subfield(["target", "selectionEnd"], decode.int)
    case key {
      "Tab" ->
        decode.success(event.handler(
          dispatch: UserPressedTab(value, start, end),
          prevent_default: True,
          stop_propagation: False,
        ))
      _ ->
        decode.failure(
          event.handler(
            dispatch: UserPressedTab("", 0, 0),
            prevent_default: False,
            stop_propagation: False,
          ),
          "key",
        )
    }
  })
}

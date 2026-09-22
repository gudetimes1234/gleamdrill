//// Two reference solutions side by side, the shared lines lit and the
//// differing lines dimmed, so the shape a technique keeps from problem to
//// problem is what the eye lands on.

import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleamdrill/compare
import gleamdrill/editor
import gleamdrill/model.{
  type Compare, type CompareSide, type Model, type Msg, CompareMoved,
  ComparePickedVariant, LeftSide, RightSide, UserClosedCompare,
}
import gleamdrill/problem.{type ProblemRef, type Solution}
import gleamdrill/problems
import gleamdrill/view/format
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

pub fn view(_m: Model, c: Compare) -> Element(Msg) {
  let right = compare.right(c)
  let language = case
    problems.find(c.anchor.category, c.anchor.subcategory, c.anchor.title)
  {
    Ok(found) -> problem.language_label(found.language)
    Error(Nil) -> ""
  }
  html.div([attribute.class("compare-screen")], [
    html.div([attribute.class("compare-header")], [
      html.button(
        [attribute.class("btn-secondary"), event.on_click(UserClosedCompare)],
        [html.text("\u{2190} Browse")],
      ),
      html.h1([attribute.class("compare-title")], [
        html.text("Compare \u{b7} " <> language),
      ]),
    ]),
    html.div([attribute.class("compare-heads")], [
      head(Some(c.anchor), LeftSide, c.variant_a),
      head(right, RightSide, c.variant_b),
    ]),
    editor.compare_view(
      compare.code(Some(c.anchor), c.variant_a),
      compare.code(right, c.variant_b),
      compare.language(c),
    ),
    html.p([attribute.class("compare-key")], [
      html.text(
        "Lines the two share are lit; what each does on its own is dimmed.",
      ),
    ]),
    others(c),
  ])
}

/// One column's title, rating and choice of solution.
fn head(
  ref: Option(ProblemRef),
  side: CompareSide,
  variant: Int,
) -> Element(Msg) {
  case ref {
    None ->
      html.div([attribute.class("compare-head")], [
        html.h2([attribute.class("compare-problem")], [
          html.text("Nothing to compare with"),
        ]),
      ])
    Some(ref) ->
      html.div([attribute.class("compare-head")], [
        html.h2([attribute.class("compare-problem")], [
          html.text(ref.title),
          format.difficulty_badge(problems.difficulty_of(ref)),
        ]),
        html.div(
          [attribute.class("solution-picker")],
          list.index_map(
            compare.solutions_of(ref),
            fn(solution: Solution, index) {
              html.button(
                [
                  attribute.classes([
                    #("btn-secondary", True),
                    #("solution-button", True),
                    #("revealed", index == variant),
                  ]),
                  attribute.type_("button"),
                  event.on_click(ComparePickedVariant(side, index)),
                ],
                [html.text(solution.label)],
              )
            },
          ),
        ),
      ])
  }
}

/// The other problems, as a strip: the one on the right is lit.
fn others(c: Compare) -> Element(Msg) {
  html.div(
    [attribute.class("compare-others")],
    list.index_map(c.others, fn(ref: ProblemRef, index) {
      html.button(
        [
          attribute.classes([
            #("compare-other", True),
            #("current", index == c.index),
          ]),
          attribute.type_("button"),
          event.on_click(CompareMoved(index - c.index)),
        ],
        [
          html.text(ref.title),
          html.span([attribute.class("compare-other-index")], [
            html.text(
              " "
              <> int.to_string(index + 1)
              <> "/"
              <> int.to_string(list.length(c.others)),
            ),
          ]),
        ],
      )
    }),
  )
}

//// The scored breakdown shown when an exam finishes. A total alone would not
//// tell you where to study, so the sections lead and the total is a footnote.

import algodrill/model.{
  type Model, type Msg, type SectionScore, UserClickedExitReport,
}
import algodrill/problems
import algodrill/problems/system_design
import gleam/int
import gleam/list
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

pub fn view(m: Model) -> Element(Msg) {
  let scores =
    model.section_scores(
      m.exam_answers,
      problems.subcategory_names(system_design.name),
    )
  let total = list.length(m.exam_answers)
  let correct = list.count(m.exam_answers, fn(pair) { pair.1 })
  let weak =
    list.filter(scores, fn(s: SectionScore) {
      model.percent(s.correct, s.total) < model.weak_threshold
    })

  html.div([attribute.class("report-container")], [
    html.div([attribute.class("drill-header")], [
      html.button(
        [
          attribute.class("btn-secondary"),
          event.on_click(UserClickedExitReport),
        ],
        [
          html.text(case m.studying {
            True -> "\u{2190} Study"
            False -> "\u{2190} Menu"
          }),
        ],
      ),
      html.h2([attribute.class("drill-title")], [html.text("Exam result")]),
    ]),
    html.div([attribute.class("report-body")], [
      html.div([attribute.class("report-total")], [
        html.span([attribute.class("report-total-score")], [
          html.text(int.to_string(correct) <> "/" <> int.to_string(total)),
        ]),
        html.span([attribute.class("report-total-percent")], [
          html.text(int.to_string(model.percent(correct, total)) <> "%"),
        ]),
      ]),
      panel("By section \u{2014} weakest first", [
        html.ul(
          [attribute.class("report-sections")],
          list.map(scores, section_row),
        ),
      ]),
      ..verdict(weak)
    ]),
  ])
}

fn section_row(score: SectionScore) -> Element(Msg) {
  let pct = model.percent(score.correct, score.total)
  let weak = pct < model.weak_threshold
  html.li([attribute.classes([#("report-section", True), #("weak", weak)])], [
    html.span([attribute.class("report-section-name")], [
      html.text(score.section),
    ]),
    // The bar is the scannable part; the numbers are for confirming it.
    html.span(
      [
        attribute.class("report-bar"),
        attribute.style("--score", int.to_string(pct) <> "%"),
      ],
      [],
    ),
    html.span([attribute.class("report-section-score")], [
      html.text(
        int.to_string(score.correct) <> "/" <> int.to_string(score.total),
      ),
    ]),
    html.span([attribute.class("report-section-percent")], [
      html.text(int.to_string(pct) <> "%"),
    ]),
  ])
}

fn verdict(weak: List(SectionScore)) -> List(Element(Msg)) {
  case weak {
    [] -> [
      panel("Where to study", [
        html.div([attribute.class("pane-empty")], [
          html.text(
            "Nothing under "
            <> int.to_string(model.weak_threshold)
            <> "%. Widen the pool or raise the bar.",
          ),
        ]),
      ]),
    ]
    _ -> [
      panel("Where to study", [
        html.ul(
          [attribute.class("report-advice")],
          list.map(weak, fn(s: SectionScore) {
            html.li([], [
              html.text(
                s.section
                <> " \u{2014} "
                <> int.to_string(model.percent(s.correct, s.total))
                <> "%",
              ),
            ])
          }),
        ),
      ]),
    ]
  }
}

fn panel(title: String, body: List(Element(Msg))) -> Element(Msg) {
  html.div([attribute.class("panel")], [
    html.div([attribute.class("panel-title")], [html.text(title)]),
    ..body
  ])
}

//// Run results: the verdict box, per-case rows, scratch output, compile
//// errors, and the Output pane.

import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/string
import gleamdrill/model.{
  type CaseResult, type Model, type RunError, Cases, Errored, Ran, RunIdle,
  Running, TimedOut,
}
import gleamdrill/msg.{type Msg, UserToggledResults}
import gleamdrill/problem.{type Problem}
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

pub fn output_panel(m: Model) -> Element(Msg) {
  case m.run {
    Ran(_, stdout) ->
      case string.trim(stdout) {
        "" ->
          html.div([attribute.class("output-empty")], [
            html.text("The last run printed nothing."),
          ])
        text ->
          html.pre([attribute.class("results-stdout output-pane")], [
            html.text(text),
          ])
      }
    // The previous run's output, dimmed rather than blanked: it is still the
    // latest thing the program said.
    Running(_, stdout) ->
      case string.trim(stdout) {
        "" ->
          html.div([attribute.class("output-empty")], [
            html.text("Nothing printed yet."),
          ])
        text ->
          html.pre(
            [attribute.class("results-stdout output-pane output-stale")],
            [
              html.text(text),
            ],
          )
      }
    RunIdle ->
      html.div([attribute.class("output-empty")], [
        html.text("Nothing printed yet."),
      ])
  }
}

pub fn results_only(m: Model, current: Problem) -> List(Element(Msg)) {
  case m.run {
    RunIdle -> []
    Running(_, _) -> [
      html.div([attribute.class("results")], [
        html.div([attribute.class("results-summary running")], [
          html.text(case problem.language_slug(current.language) {
            // Brython interprets; nothing compiles.
            "python" -> "Running\u{2026}"
            _ -> "Compiling and running\u{2026}"
          }),
        ]),
      ]),
    ]
    Ran(Cases(cases), stdout) ->
      case m.run_kind {
        model.ScratchRun -> [scratch_results(stdout)]
        model.TestRun -> [case_results(m, cases)]
      }
    Ran(Errored(error), _) -> [error_results(m, error, current)]
    Ran(TimedOut, _) -> [
      results_box(
        m,
        "Your solution didn't finish \u{2014} likely an infinite loop. The runtime was restarted.",
        False,
        None,
        [],
      ),
    ]
  }
}

/// A scratch run's result is what it printed, in the Output pane; this is
/// the one line that says it ran.
fn scratch_results(stdout: String) -> Element(Msg) {
  let lines =
    stdout
    |> string.split("\n")
    |> list.filter(fn(line) { line != "" })
    |> list.length
  html.div([attribute.class("results")], [
    html.div([attribute.class("results-summary scratch")], [
      html.text(case lines {
        0 -> "Ran \u{b7} nothing printed"
        1 -> "Ran \u{b7} 1 line printed"
        n -> "Ran \u{b7} " <> int.to_string(n) <> " lines printed"
      }),
    ]),
  ])
}

fn case_results(m: Model, cases: List(CaseResult)) -> Element(Msg) {
  let total = list.length(cases)
  let passed = list.count(cases, fn(c) { c.passed })
  let all_passed = passed == total && total > 0
  let failed = list.filter(cases, fn(c: CaseResult) { !c.passed })

  let verdict =
    case all_passed {
      True -> "\u{2713} "
      False -> "\u{2717} "
    }
    <> int.to_string(passed)
    <> "/"
    <> int.to_string(total)
    <> " passed"

  // Folded, the first failing case's name is the one thing worth a glance.
  let preview = case failed {
    [first, ..] -> Some(first.label)
    [] -> None
  }

  let failures =
    failed
    |> list.map(fn(c: CaseResult) {
      html.div([attribute.class("case fail")], [
        html.div([attribute.class("case-label")], [
          html.text("\u{2717} " <> c.label),
        ]),
        html.div([attribute.class("case-diff")], [
          html.div([], [
            html.span([attribute.class("case-diff-tag")], [
              html.text("expected "),
            ]),
            html.code([], [html.text(c.expected)]),
          ]),
          html.div([], [
            html.span([attribute.class("case-diff-tag")], [html.text("got ")]),
            html.code([], [html.text(c.actual)]),
          ]),
        ]),
      ])
    })

  results_box(m, verdict, all_passed, preview, failures)
}

/// Every run verdict: a one-line summary that is also the fold button, over a
/// body that scrolls on its own. Folded, the body is hidden but stays in the
/// DOM, so the failing cases are still there to count.
pub fn results_box(
  m: Model,
  verdict: String,
  passed: Bool,
  preview: Option(String),
  body: List(Element(Msg)),
) -> Element(Msg) {
  let foldable = body != []
  let collapsed = foldable && m.results_collapsed
  let summary_children =
    list.flatten([
      [html.span([attribute.class("results-verdict")], [html.text(verdict)])],
      case collapsed, preview {
        True, Some(line) -> [
          html.span([attribute.class("results-preview")], [
            html.text(first_line(line)),
          ]),
        ]
        _, _ -> []
      },
      case foldable {
        True -> [
          html.span([attribute.class("results-chevron")], [
            html.text(case collapsed {
              True -> "\u{25B8}"
              False -> "\u{25BE}"
            }),
          ]),
        ]
        False -> []
      },
    ])
  let summary_classes =
    attribute.classes([
      #("results-summary", True),
      #("pass", passed),
      #("fail", !passed),
    ])
  let summary = case foldable {
    True ->
      html.button(
        [
          summary_classes,
          attribute.type_("button"),
          attribute.attribute("aria-expanded", case collapsed {
            True -> "false"
            False -> "true"
          }),
          event.on_click(UserToggledResults),
        ],
        summary_children,
      )
    False -> html.div([summary_classes], summary_children)
  }
  html.div(
    [
      attribute.classes([
        #("results", True),
        #("collapsed", collapsed),
      ]),
    ],
    case foldable {
      True -> [summary, html.div([attribute.class("results-body")], body)]
      False -> [summary]
    },
  )
}

/// The first non-empty line, cut to fit beside the verdict.
fn first_line(text: String) -> String {
  let line =
    text
    |> string.split("\n")
    |> list.map(string.trim)
    |> list.find(fn(l) { l != "" })
    |> result.unwrap("")
  case string.length(line) > 90 {
    True -> string.slice(line, 0, 90) <> "\u{2026}"
    False -> line
  }
}

pub fn first_lines(message: String) -> String {
  message
  |> string.split("\n")
  |> list.take(3)
  |> string.join("\n")
}

pub fn error_results(
  m: Model,
  error: RunError,
  current: Problem,
) -> Element(Msg) {
  // An "internal" failure is the drill runner's own bug; even when it names a
  // check file it must not read as "your signature is wrong".
  let is_check_file = case error.file, error.phase {
    _, "internal" -> False
    Some(file), _ -> string.starts_with(file, "check")
    None, _ -> False
  }
  case is_check_file, m.run_kind, current.check {
    // A scratch run's harness is `run() { solution.main() }`: an error
    // located there means the attempt has no main(), not a wrong signature.
    True, model.ScratchRun, _ ->
      results_box(
        m,
        "Scratch runs call your main() \u{2014} add pub fn main() first.",
        False,
        None,
        [
          html.pre([attribute.class("results-message")], [
            html.text(error.message),
          ]),
        ],
      )
    True, _, Some(check) ->
      results_box(
        m,
        "Your solution doesn't match the required signature.",
        False,
        Some(check.signature),
        [
          html.pre([attribute.class("signature")], [
            html.code([], [html.text(check.signature)]),
          ]),
          html.pre([attribute.class("results-message")], [
            html.text(error.message),
          ]),
        ],
      )
    _, _, _ ->
      results_box(
        m,
        case error.phase {
          "compile" -> "Your code doesn't compile."
          "internal" ->
            "The drill runner itself failed on this input \u{2014} a bug in GleamDrill, not your code."
          _ -> "Your code crashed while running."
        },
        False,
        Some(error.message),
        [
          html.pre([attribute.class("results-message")], [
            html.text(error.message),
          ]),
        ],
      )
  }
}

pub fn prompt_block(current: Problem) -> Element(Msg) {
  case current.prompt_html {
    // Repository-vendored lesson HTML, never user input; see
    // problem.Problem.prompt_html.
    True ->
      element.unsafe_raw_html(
        "",
        "div",
        [attribute.class("problem-prompt prose")],
        current.prompt,
      )
    False ->
      html.div([attribute.class("problem-prompt")], [html.text(current.prompt)])
  }
}

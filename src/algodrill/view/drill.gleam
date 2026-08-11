import algodrill/editor
import algodrill/model.{
  type CaseResult, type Model, type Msg, type ProblemRef, type RunError, Cases,
  EditorChanged, Errored, Ran, RunIdle, Running, RuntimeFailed, RuntimeLoading,
  RuntimeNotLoaded, RuntimeReady, TimedOut, UserChangedKeymap,
  UserClickedExitDrill, UserClickedNext, UserClickedRun, UserToggledSolution,
}
import algodrill/problem.{type Problem, type Solution}
import algodrill/problems
import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleam/result
import gleam/string
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/element/keyed
import lustre/event

/// Errors when the drill position points at no problem; the caller falls back
/// to the menu.
pub fn view(m: Model) -> Result(Element(Msg), Nil) {
  use ref <- result.try(model.current_ref(m))
  use current <- result.try(problems.find(
    ref.category,
    ref.subcategory,
    ref.title,
  ))
  Ok(view_drill(m, ref, current))
}

fn view_drill(m: Model, ref: ProblemRef, current: Problem) -> Element(Msg) {
  // An iteration is a pass over the whole selection, not a repeat of one
  // problem, so it reads first.
  let count = list.length(m.selected)
  let progress =
    "Pass "
    <> int.to_string(m.current_iteration)
    <> "/"
    <> int.to_string(m.iteration_count)
    <> " \u{b7} Problem "
    <> int.to_string(m.problem_index + 1)
    <> "/"
    <> int.to_string(count)

  // Position through the whole session, not just this pass, as a percentage
  // for the bar under the progress text. Guarded because an empty selection
  // would divide by zero.
  let total = count * m.iteration_count
  let done = { m.current_iteration - 1 } * count + m.problem_index
  let percent = case total {
    0 -> 0
    _ -> done * 100 / total
  }

  let body_key =
    ref.category
    <> "|"
    <> ref.subcategory
    <> "|"
    <> ref.title
    <> "|"
    <> int.to_string(m.current_iteration)

  html.div([attribute.class("drill-container")], [
    html.div([attribute.class("drill-header")], [
      html.button(
        [
          attribute.class("btn-secondary"),
          event.on_click(UserClickedExitDrill),
        ],
        [html.text("\u{2190} Exit")],
      ),
      html.h2([attribute.class("drill-title")], [html.text(current.title)]),
      keymap_picker(m),
      html.div(
        [
          attribute.class("progress-text"),
          attribute.style("--progress", int.to_string(percent) <> "%"),
        ],
        [html.text(progress)],
      ),
    ]),
    html.div([attribute.class("drill-grid")], [
      html.div([attribute.class("drill-side")], side_panels(m, ref, current)),
      html.div([attribute.class("drill-main")], [
        keyed.div([attribute.class("editor-frame")], [
          #(
            body_key,
            editor.view([
              editor.doc(m.draft),
              editor.language(problem.language_slug(current.language)),
              editor.keymap(m.editor_keymap),
              editor.on_change(EditorChanged),
              editor.diagnostics(editor_diagnostics(m)),
            ]),
          ),
        ]),
        run_bar(m, current),
        ..results_and_answer(m, current)
      ]),
    ]),
  ])
}

fn keymap_picker(m: Model) -> Element(Msg) {
  html.div(
    [attribute.class("keymap-picker")],
    list.map(
      [#("default", "Std"), #("vim", "Vim"), #("emacs", "Emacs")],
      fn(mode) {
        html.button(
          [
            attribute.classes([
              #("keymap-option", True),
              #("active", m.editor_keymap == mode.0),
            ]),
            attribute.attribute("title", mode.1 <> " keybindings"),
            event.on_click(UserChangedKeymap(mode.0)),
          ],
          [html.text(mode.1)],
        )
      },
    ),
  )
}

fn side_panels(
  m: Model,
  ref: ProblemRef,
  current: Problem,
) -> List(Element(Msg)) {
  let prompt =
    panel("Prompt", [
      html.div([attribute.class("problem-category")], [
        html.text(
          ref.category
          <> " \u{203a} "
          <> ref.subcategory
          <> " \u{b7} "
          <> problem.language_label(current.language),
        ),
      ]),
      html.div([attribute.class("problem-prompt")], [html.text(current.prompt)]),
    ])

  let approach = case current.approach {
    "" -> []
    text -> [
      html.details([attribute.class("panel approach")], [
        html.summary([attribute.class("panel-title")], [html.text("Approach")]),
        html.div([attribute.class("approach-text")], [html.text(text)]),
      ]),
    ]
  }

  let checked = case current.check {
    Some(check) -> [
      panel("Signature", [
        html.pre([attribute.class("signature")], [
          html.code([], [html.text(check.signature)]),
        ]),
      ]),
      panel("Tests", [tests_panel(m)]),
    ]
    None -> []
  }

  [prompt, ..list.append(approach, checked)]
}

fn tests_panel(m: Model) -> Element(Msg) {
  case m.run {
    Ran(Cases(cases)) ->
      html.ul(
        [attribute.class("case-list")],
        list.map(cases, fn(c: CaseResult) {
          html.li(
            [
              attribute.classes([
                #("case", True),
                #("pass", c.passed),
                #("fail", !c.passed),
              ]),
            ],
            [
              html.span([attribute.class("case-icon")], [
                html.text(case c.passed {
                  True -> "\u{2713}"
                  False -> "\u{2717}"
                }),
              ]),
              html.text(" " <> c.label),
            ],
          )
        }),
      )
    _ ->
      html.div([attribute.class("pane-empty")], [
        html.text("Run the tests to see the cases."),
      ])
  }
}

fn run_bar(m: Model, current: Problem) -> Element(Msg) {
  let run_control = case current.check {
    None -> [
      html.span([attribute.class("run-unavailable")], [
        html.text(
          "Checking isn't available for this drill \u{2014} compare with a solution.",
        ),
      ]),
    ]
    Some(_) -> [
      case
        model.runtime_for(m, problem.language_slug(current.language)),
        m.run
      {
        _, Running(_) -> run_button("Running\u{2026}", True)
        RuntimeReady, _ -> run_button("\u{25b6} Run tests", False)
        RuntimeLoading, _ -> run_button("Loading runtime\u{2026}", True)
        RuntimeNotLoaded, _ -> run_button("Loading runtime\u{2026}", True)
        RuntimeFailed(_), _ -> run_button("Runtime unavailable", True)
      },
    ]
  }

  html.div(
    [attribute.class("run-bar")],
    list.flatten([
      run_control,
      solution_buttons(m, current),
      [
        html.button(
          [
            attribute.class("btn-primary next-button"),
            event.on_click(UserClickedNext),
          ],
          [html.text("Next")],
        ),
      ],
    ]),
  )
}

fn solution_buttons(m: Model, current: Problem) -> List(Element(Msg)) {
  list.index_map(current.solutions, fn(solution: Solution, index) {
    html.button(
      [
        attribute.classes([
          #("btn-secondary", True),
          #("solution-button", True),
          #("revealed", m.revealed_solution == Some(index)),
        ]),
        event.on_click(UserToggledSolution(index)),
      ],
      [html.text(solution.label)],
    )
  })
}

fn run_button(label: String, disabled: Bool) -> Element(Msg) {
  html.button(
    [
      attribute.class("btn-primary run-button"),
      attribute.disabled(disabled),
      event.on_click(UserClickedRun),
    ],
    [html.text(label)],
  )
}

fn results_and_answer(m: Model, current: Problem) -> List(Element(Msg)) {
  let results = case m.run {
    RunIdle -> []
    Running(_) -> [
      html.div([attribute.class("results")], [
        html.div([attribute.class("results-summary")], [
          html.text("Compiling and running\u{2026}"),
        ]),
      ]),
    ]
    Ran(Cases(cases)) -> [case_results(cases)]
    Ran(Errored(error)) -> [error_results(error, current)]
    Ran(TimedOut) -> [
      html.div([attribute.class("results")], [
        html.div([attribute.class("results-summary fail")], [
          html.text(
            "Your solution didn't finish \u{2014} likely an infinite loop. The runtime was restarted.",
          ),
        ]),
      ]),
    ]
  }

  let answer = case revealed(m, current) {
    Ok(solution) -> [
      html.div([attribute.class("answer-content")], [
        html.div([attribute.class("answer-label")], [
          html.text(solution.label),
        ]),
        html.pre([], [html.code([], [html.text(solution.code)])]),
      ]),
    ]
    Error(Nil) -> []
  }

  list.append(results, answer)
}

fn revealed(m: Model, current: Problem) -> Result(Solution, Nil) {
  case m.revealed_solution {
    Some(index) ->
      current.solutions
      |> list.drop(index)
      |> list.first
    None -> Error(Nil)
  }
}

fn case_results(cases: List(CaseResult)) -> Element(Msg) {
  let total = list.length(cases)
  let passed = list.count(cases, fn(c) { c.passed })
  let all_passed = passed == total && total > 0

  let summary =
    html.div(
      [
        attribute.classes([
          #("results-summary", True),
          #("pass", all_passed),
          #("fail", !all_passed),
        ]),
      ],
      [
        html.text(
          case all_passed {
            True -> "\u{2713} "
            False -> "\u{2717} "
          }
          <> int.to_string(passed)
          <> "/"
          <> int.to_string(total)
          <> " passed",
        ),
      ],
    )

  let failures =
    cases
    |> list.filter(fn(c: CaseResult) { !c.passed })
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

  html.div([attribute.class("results")], [summary, ..failures])
}

fn error_results(error: RunError, current: Problem) -> Element(Msg) {
  let is_check_file = case error.file {
    Some(file) -> string.starts_with(file, "check")
    None -> False
  }
  case is_check_file, current.check {
    True, Some(check) ->
      html.div([attribute.class("results")], [
        html.div([attribute.class("results-summary fail")], [
          html.text("Your solution doesn't match the required signature."),
        ]),
        html.pre([attribute.class("signature")], [
          html.code([], [html.text(check.signature)]),
        ]),
        html.details([attribute.class("results-details")], [
          html.summary([], [html.text("Details")]),
          html.pre([attribute.class("results-message")], [
            html.text(error.message),
          ]),
        ]),
      ])
    _, _ ->
      html.div([attribute.class("results")], [
        html.div([attribute.class("results-summary fail")], [
          html.text(case error.phase {
            "compile" -> "Your code doesn't compile."
            _ -> "Your code crashed while running."
          }),
        ]),
        html.pre([attribute.class("results-message")], [
          html.text(error.message),
        ]),
      ])
  }
}

/// Compile errors inside the user's own module become inline underlines.
fn editor_diagnostics(m: Model) -> List(editor.Diagnostic) {
  case m.run {
    Ran(Errored(error)) ->
      case error.file, error.line, error.column {
        Some("solution.gleam"), Some(line), Some(column) -> [
          editor.Diagnostic(line, column, first_lines(error.message)),
        ]
        Some("solution.py"), Some(line), Some(column) -> [
          editor.Diagnostic(line, column, first_lines(error.message)),
        ]
        Some("solution.ts"), Some(line), Some(column) -> [
          editor.Diagnostic(line, column, first_lines(error.message)),
        ]
        _, _, _ -> []
      }
    _ -> []
  }
}

fn first_lines(message: String) -> String {
  message
  |> string.split("\n")
  |> list.take(3)
  |> string.join("\n")
}

fn panel(title: String, contents: List(Element(Msg))) -> Element(Msg) {
  html.section([attribute.class("panel")], [
    html.h3([attribute.class("panel-title")], [html.text(title)]),
    ..contents
  ])
}

import algodrill/editor
import algodrill/model.{
  type CaseResult, type Model, type Msg, type RunError, AwaitingGrade, Cases,
  EditorChanged, Errored, NotGrading, Ran, RunIdle, Running, RuntimeFailed,
  RuntimeLoading, RuntimeNotLoaded, RuntimeReady, SubmittingGrade, TimedOut,
  UserChangedKeymap, UserClickedExitDrill, UserClickedNext,
  UserClickedRetryRuntime, UserClickedRun, UserClickedStopRun, UserGraded,
  UserPickedChoice, UserRevealedHint, UserSubmittedAnswer, UserToggledSide,
  UserToggledSolution,
}
import algodrill/problem.{
  type Problem, type ProblemRef, type Quiz, type Solution,
}
import algodrill/problems
import algodrill/view/banner
import algodrill/view/format
import fsrs
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
  let progress = case current.quiz {
    // An exam is a single pass, so the repetition counter would only ever read
    // "Pass 1/1".
    Some(_) ->
      "Question "
      <> int.to_string(m.problem_index + 1)
      <> "/"
      <> int.to_string(count)
    None ->
      "Pass "
      <> int.to_string(m.current_iteration)
      <> "/"
      <> int.to_string(m.iteration_count)
      <> " \u{b7} Problem "
      <> int.to_string(m.problem_index + 1)
      <> "/"
      <> int.to_string(count)
  }

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
    banner.storage_warning(m),
    html.div([attribute.class("drill-header")], [
      html.button(
        [
          attribute.class("btn-secondary"),
          event.on_click(UserClickedExitDrill),
        ],
        [html.text("\u{2190} Exit")],
      ),
      html.h2([attribute.class("drill-title")], [html.text(current.title)]),
      // Nothing to type in a quiz, so the keybinding picker is noise.
      case current.quiz {
        Some(_) -> element.none()
        None -> keymap_picker(m)
      },
      html.div(
        [
          attribute.class("progress-text"),
          attribute.style("--progress", int.to_string(percent) <> "%"),
        ],
        [html.text(progress)],
      ),
    ]),
    html.div(
      [
        attribute.classes([
          #("drill-grid", True),
          #("side-collapsed", m.side_collapsed),
        ]),
      ],
      [
        html.div([attribute.class("drill-side")], side_panels(m, ref, current)),
        // The editor's keyed frame stays the permanent first child of
        // .work-row: appending the answer panel after it cannot remount
        // CodeMirror, which would drop undo history and cursor.
        html.div([attribute.class("drill-main")], case current.quiz {
          Some(quiz) -> quiz_main(m, quiz)
          None -> [
            html.div([attribute.class("work-row")], [
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
              ..answer_panel(m, current)
            ]),
            ..list.flatten([
              // Its own pane, right under the code it narrates: watching
              // what your program prints is half of debugging it.
              case current.check {
                Some(_) -> [
                  html.section([attribute.class("panel output-below")], [
                    html.h3([attribute.class("panel-title")], [
                      html.text("Output"),
                    ]),
                    output_panel(m),
                  ]),
                ]
                None -> []
              },
              [run_bar(m, current)],
              results_only(m, current),
            ])
          ]
        }),
      ],
    ),
  ])
}

/// The quiz replaces the editor and the run bar entirely: there is nothing to
/// type and nothing to execute. Options stay clickable until Submit, after
/// which the grading and the explanation are shown and only Next remains.
fn quiz_main(m: Model, quiz: Quiz) -> List(Element(Msg)) {
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

  [options, bar, ..quiz_verdict(m, quiz)]
}

fn quiz_verdict(m: Model, quiz: Quiz) -> List(Element(Msg)) {
  case m.graded {
    False -> []
    True -> {
      let right = m.choice == Some(quiz.correct)
      [
        html.div([attribute.class("results")], [
          html.div(
            [
              attribute.classes([
                #("results-summary", True),
                #("pass", right),
                #("fail", !right),
              ]),
            ],
            [
              html.text(case right {
                True -> "\u{2713} Correct"
                False -> "\u{2717} Not quite"
              }),
            ],
          ),
          html.div([attribute.class("quiz-explanation")], [
            html.text(quiz.explanation),
          ]),
          html.div([attribute.class("quiz-page")], [
            html.text("Book reference: " <> quiz.page),
          ]),
        ]),
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
  let toggle =
    html.button(
      [
        attribute.class("btn-secondary side-toggle"),
        event.on_click(UserToggledSide),
      ],
      [
        html.text(case m.side_collapsed {
          True -> "Prompt \u{27e9}"
          False -> "\u{27e8} Hide prompt"
        }),
      ],
    )
  case m.side_collapsed {
    True -> [toggle]
    False -> [toggle, ..expanded_panels(m, ref, current)]
  }
}

fn expanded_panels(
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
    [] -> []
    stages -> [approach_panel(m, stages)]
  }

  // Output rides with the checkable panes: a drill that cannot run cannot
  // print, and a permanently empty pane is just noise.
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

  [prompt, ..list.flatten([approach, checked])]
}

fn output_panel(m: Model) -> Element(Msg) {
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

fn tests_panel(m: Model) -> Element(Msg) {
  case m.run {
    Ran(Cases(cases), _) ->
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
    Some(_) ->
      case
        model.runtime_for(m, problem.language_slug(current.language)),
        m.run
      {
        _, Running(_, _) -> [
          run_button("Running\u{2026}", True),
          html.button(
            [
              attribute.class("btn-secondary stop-button"),
              event.on_click(UserClickedStopRun),
            ],
            [html.text("Stop")],
          ),
        ]
        RuntimeReady, _ -> [run_button("\u{25b6} Run tests", False)]
        RuntimeLoading, _ -> [run_button("Loading runtime\u{2026}", True)]
        RuntimeNotLoaded, _ -> [run_button("Loading runtime\u{2026}", True)]
        RuntimeFailed(message), _ -> [
          run_button("Runtime unavailable", True),
          html.button(
            [
              attribute.class("btn-secondary retry-button"),
              event.on_click(
                UserClickedRetryRuntime(problem.language_slug(current.language)),
              ),
            ],
            [html.text("Retry")],
          ),
          html.span([attribute.class("run-error")], [
            html.text(first_lines(message)),
          ]),
        ]
      }
  }

  html.div(
    [attribute.class("run-bar")],
    list.flatten([
      run_control,
      solution_buttons(m, current),
      [grade_controls(m, current)],
    ]),
  )
}

/// The grading bar: how a drill turns into a scheduled review.
///
/// The rules, in order of precedence:
///   * A quiz grades itself on submit — plain Next button.
///   * The FIRST encounter of a problem grades freely: all four buttons from
///     the moment it opens. Revealing the solution is how you learn something
///     the first time, so nothing is coerced — flip the card, judge yourself.
///   * A reveal-only drill (no harness exists) is a flashcard proper: all four
///     buttons, every time.
///   * Every later review of a checkable drill must run first; a pass offers
///     all four (Again included — you may know better than the harness), and a
///     failed run or a revealed solution leaves exactly one honest answer.
fn grade_controls(m: Model, current: Problem) -> Element(Msg) {
  case current.quiz {
    Some(_) ->
      html.button(
        [
          attribute.class("btn-primary next-button"),
          event.on_click(UserClickedNext),
        ],
        [html.text("Next")],
      )
    None ->
      case m.grading {
        NotGrading ->
          html.span([attribute.class("grade-hint")], [
            html.text("Run the tests to grade this."),
          ])
        SubmittingGrade ->
          html.span([attribute.class("grade-hint")], [
            html.text("Saving\u{2026}"),
          ])
        AwaitingGrade -> grade_buttons(m, current)
      }
  }
}

fn grade_buttons(m: Model, current: Problem) -> Element(Msg) {
  let free = case model.current_ref(m) {
    Ok(ref) -> model.first_encounter(m, ref) || current.check == None
    Error(Nil) -> True
  }
  let forced =
    m.studying
    && !free
    && { model.run_failed(m.run) || model.answer_revealed(m, current.approach) }

  html.div([attribute.class("grade-bar")], case forced {
    True -> [grade_button(m, fsrs.Again, "Again", "again")]
    False -> [
      grade_button(m, fsrs.Again, "Again", "again"),
      grade_button(m, fsrs.Hard, "Hard", "hard"),
      grade_button(m, fsrs.Good, "Good", "good"),
      grade_button(m, fsrs.Easy, "Easy", "easy"),
    ]
  })
}

/// Each button carries the interval it would actually produce, computed with
/// the same scheduler module the server schedules with — so the number on the
/// button is a promise the server will keep, not an estimate.
fn grade_button(
  m: Model,
  rating: fsrs.Rating,
  label: String,
  kind: String,
) -> Element(Msg) {
  html.button(
    [
      attribute.class("grade-button grade-" <> kind),
      event.on_click(UserGraded(rating)),
    ],
    [
      html.span([attribute.class("grade-label")], [html.text(label)]),
      html.span([attribute.class("grade-interval")], [
        html.text(preview_interval(m, rating)),
      ]),
    ],
  )
}

fn preview_interval(m: Model, rating: fsrs.Rating) -> String {
  let card = case model.current_ref(m) {
    Ok(ref) ->
      case model.card_for(m, ref) {
        Some(state) -> state.card
        None -> fsrs.new_card(m.now)
      }
    Error(Nil) -> fsrs.new_card(m.now)
  }
  let scheduled = fsrs.review(card, rating, m.now, m.settings.scheduler, 0.0)
  format.interval(fsrs.interval_seconds(scheduled, m.now))
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

fn results_only(m: Model, current: Problem) -> List(Element(Msg)) {
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
    Ran(Cases(cases), _) -> [case_results(cases)]
    Ran(Errored(error), _) -> [error_results(error, current)]
    Ran(TimedOut, _) -> [
      html.div([attribute.class("results")], [
        html.div([attribute.class("results-summary fail")], [
          html.text(
            "Your solution didn't finish \u{2014} likely an infinite loop. The runtime was restarted.",
          ),
        ]),
      ]),
    ]
  }
}

/// The revealed solution, rendered beside the editor so code and answer can be
/// compared line by line rather than by scrolling.
fn answer_panel(m: Model, current: Problem) -> List(Element(Msg)) {
  case revealed(m, current) {
    Ok(solution) -> [
      html.div(
        [attribute.class("answer-content answer-side")],
        list.flatten([
          [
            html.div(
              [attribute.class("answer-header")],
              list.flatten([
                [
                  html.div([attribute.class("answer-label")], [
                    html.text(solution.label),
                  ]),
                ],
                // Annotated content carries a Big-O line; older content shows
                // nothing rather than an empty badge.
                case solution.complexity {
                  "" -> []
                  complexity -> [
                    html.span([attribute.class("answer-complexity")], [
                      html.text(complexity),
                    ]),
                  ]
                },
              ]),
            ),
          ],
          // Solutions written before their note exists simply have none; an
          // empty div would still draw its margins.
          case solution.note {
            "" -> []
            note -> [
              html.div([attribute.class("answer-note")], [html.text(note)]),
            ]
          },
          [html.pre([], [html.code([], [html.text(solution.code)])])],
        ]),
      ),
    ]
    Error(Nil) -> []
  }
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
  // An "internal" failure is the drill runner's own bug; even when it names a
  // check file it must not read as "your signature is wrong".
  let is_check_file = case error.file, error.phase {
    _, "internal" -> False
    Some(file), _ -> string.starts_with(file, "check")
    None, _ -> False
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
            "internal" ->
              "The drill runner itself failed on this input \u{2014} a bug in AlgoDrill, not your code."
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
    Ran(Errored(error), _) ->
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

/// The hint ladder: rungs reveal one at a time, vaguest first. The last rung
/// is pseudocode and revealing it counts as seeing the answer, which the
/// button says out loud before it is pressed.
fn approach_panel(
  m: Model,
  stages: List(problem.ApproachStage),
) -> Element(Msg) {
  let total = list.length(stages)
  let shown = int.min(m.hints_revealed, total)
  let revealed =
    stages
    |> list.take(shown)
    |> list.map(approach_stage)

  let control = case list.drop(stages, shown) {
    [] -> []
    [next, ..] -> [
      html.button(
        [
          attribute.class("btn-secondary hint-button"),
          event.on_click(UserRevealedHint),
        ],
        [
          html.text(
            case next {
              problem.Nudge(_) -> "Show hint"
              problem.Steps(_) -> "Show the steps"
              problem.Pseudocode(_) -> "Show pseudocode"
            }
            <> " ("
            <> int.to_string(shown + 1)
            <> "/"
            <> int.to_string(total)
            <> ")",
          ),
        ],
      ),
      ..case next {
        // Fair warning before the rung that gives the answer away.
        problem.Pseudocode(_) -> [
          html.span([attribute.class("hint-warning")], [
            html.text("counts as seeing the answer"),
          ]),
        ]
        _ -> []
      }
    ]
  }

  html.section([attribute.class("panel approach")], [
    html.h3([attribute.class("panel-title")], [html.text("Approach")]),
    ..list.append(revealed, [
      html.div([attribute.class("hint-controls")], control),
    ])
  ])
}

fn approach_stage(stage: problem.ApproachStage) -> Element(Msg) {
  case stage {
    problem.Nudge(text) ->
      html.p([attribute.class("approach-nudge")], [html.text(text)])
    problem.Steps(items) ->
      html.ol(
        [attribute.class("approach-steps")],
        list.map(items, fn(item) { html.li([], [html.text(item)]) }),
      )
    problem.Pseudocode(code) ->
      html.pre([attribute.class("approach-pseudocode")], [
        html.code([], [html.text(code)]),
      ])
  }
}

fn panel(title: String, contents: List(Element(Msg))) -> Element(Msg) {
  html.section([attribute.class("panel")], [
    html.h3([attribute.class("panel-title")], [html.text(title)]),
    ..contents
  ])
}

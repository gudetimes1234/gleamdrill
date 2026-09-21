import fsrs
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/string
import gleamdrill/editor
import gleamdrill/insights
import gleamdrill/model.{
  type CaseResult, type Model, type Msg, type RunError, AwaitingGrade, Cases,
  Coding, EditorChanged, EditorResized, Errored, ExitConfirmed, HintPane, NoPane,
  NotGrading, NoteChanged, NotePane, Ran, Reading, RunIdle, Running,
  RuntimeFailed, RuntimeLoading, RuntimeNotLoaded, RuntimeReady, SolutionPane,
  SubmittingGrade, TimedOut, UserChangedKeymap, UserClickedExitDrill,
  UserClickedNext, UserClickedRetryRuntime, UserClickedRun,
  UserClickedScratchRun, UserClickedStopRun, UserClickedUndo, UserClosedWalk,
  UserDismissedDiff, UserGraded, UserOpenedWalk, UserPickedChoice,
  UserRevealedHint, UserRevealedRecall, UserStartedCoding, UserSubmittedAnswer,
  UserToggledDiff, UserToggledPane, UserToggledRead, UserToggledResults,
  UserToggledSolution, WalkAdvanced, WalkBacked, WalkCodeShown, WalkHintShown,
  WalkPane, WalkWhyShown,
}
import gleamdrill/problem.{
  type Problem, type ProblemRef, type Quiz, type Solution,
}
import gleamdrill/problems
import gleamdrill/runner
import gleamdrill/view/banner
import gleamdrill/view/format
import gleamdrill/view/links
import gleamdrill/view/nav
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
    // Rendered here too, or a review that failed to save, a runtime that
    // never loaded, or an Elixir drill that needs sign-in would only be
    // reported after exiting the drill.
    nav.notices(m),
    html.div([attribute.class("drill-header")], [
      html.button(
        [
          attribute.class("btn-secondary"),
          event.on_click(UserClickedExitDrill),
        ],
        [html.text("\u{2190} Exit")],
      ),
      html.h2(
        [attribute.class("drill-title")],
        list.flatten([
          [html.text(current.title), format.language_chip(current.language)],
          case model.is_leech(m, ref) {
            True -> [
              html.span(
                [
                  attribute.class("leech-badge"),
                  attribute.attribute(
                    "title",
                    "Forgotten "
                      <> int.to_string(model.leech_lapses)
                      <> "+ times: the approach is open. Read it first.",
                  ),
                ],
                [html.text("Leech \u{b7} read the approach first")],
              ),
            ]
            False -> []
          },
        ]),
      ),
      // Nothing to type in a quiz or a recall card, so the keybinding
      // picker is noise; a recall card says what it is instead. The editor
      // page also gets the way back to the problem, for a thumb: `p` is
      // no use on a phone.
      case current.quiz, m.recall {
        Some(_), _ -> element.none()
        None, True ->
          html.span([attribute.class("recall-chip")], [html.text("Recall")])
        None, False ->
          html.div([attribute.class("drill-tools")], [
            html.button(
              [
                attribute.classes([
                  #("btn-secondary", True),
                  #("read-toggle", True),
                  #("active", m.stage == Reading),
                ]),
                attribute.type_("button"),
                event.on_click(UserToggledRead),
              ],
              [
                html.text(case m.stage {
                  Reading -> "Editor"
                  Coding -> "Problem"
                }),
              ],
            ),
            keymap_picker(m),
          ])
      },
      html.div(
        [
          attribute.class("progress-text"),
          attribute.style("--progress", int.to_string(percent) <> "%"),
        ],
        [
          html.text(progress),
          // A quiz is not timed against anything; a drill is timed against
          // the three-minute promise the stats screen measures.
          case current.quiz, m.blitz {
            Some(_), _ -> element.none()
            // A Blitz counts down; every other sitting counts up.
            None, Some(blitz) -> countdown(m, blitz)
            None, None -> clock(m)
          },
        ],
      ),
    ]),
    exit_prompt(m),
    blitz_flash(m),
    case current.quiz, m.recall {
      Some(quiz), _ ->
        html.div(
          [attribute.class("drill-main")],
          quiz_main(m, ref, current, quiz),
        )
      None, True ->
        html.div([attribute.class("drill-main")], recall_main(m, ref, current))
      // The prompt page is a sheet over the editor page, not a route of its
      // own: the editor stays mounted underneath, child 0 of the same
      // parent whichever page is up, so CodeMirror keeps its undo history
      // and cursor. Parked, it is inert so a button under the sheet cannot
      // take the Enter meant to start.
      None, False ->
        keyed.div([attribute.class("drill-body")], [
          #(
            "main",
            html.div(
              [
                attribute.classes([
                  #("drill-main", True),
                  #("parked", m.stage == Reading),
                ]),
                attribute.inert(m.stage == Reading),
              ],
              code_main(m, ref, current, body_key),
            ),
          ),
          ..case m.stage {
            Reading -> [#("read", read_sheet(m, ref, current))]
            Coding -> []
          }
        ])
    },
  ])
}

/// The editor page: the editor with the slot beside it, output, the run
/// bar, the results.
fn code_main(
  m: Model,
  ref: ProblemRef,
  current: Problem,
  body_key: String,
) -> List(Element(Msg)) {
  [
    // The editor's keyed frame stays the permanent first child of
    // .work-row: appending a pane after it cannot remount CodeMirror,
    // which would drop undo history and cursor.
    html.div([attribute.class("work-row")], [
      keyed.div(
        [
          attribute.class("editor-frame"),
          // The frame's top strip names the language (style.css).
          attribute.attribute(
            "data-language",
            problem.language_slug(current.language),
          ),
        ],
        [
          #(
            body_key,
            editor.view([
              editor.doc(m.draft),
              editor.language(problem.language_slug(current.language)),
              editor.keymap(m.editor_keymap),
              editor.height(m.editor_height),
              editor.on_change(EditorChanged),
              editor.on_resize(EditorResized),
              editor.diagnostics(editor_diagnostics(m)),
            ]),
          ),
        ],
      ),
      ..slot_pane(m, ref, current)
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
}

/// The prompt page. Everything there is to read before the first
/// keystroke, and one way forward.
fn read_sheet(m: Model, ref: ProblemRef, current: Problem) -> Element(Msg) {
  html.section(
    [attribute.class("read-sheet")],
    list.append(read_blocks(m, ref, current), [
      html.div([attribute.class("read-actions")], [
        html.button(
          [
            attribute.class("btn-primary read-start"),
            event.on_click(UserStartedCoding),
          ],
          [html.text("Start coding "), html.kbd([], [html.text("\u{21b5}")])],
        ),
      ]),
    ]),
  )
}

/// The problem as a page: title, where it sits, the prompt, the signature,
/// the examples once a run has produced them, the ladder rungs already
/// turned, and the note left last time. Shared with the recall card, which
/// keeps it on screen rather than behind a sheet.
fn read_blocks(
  m: Model,
  ref: ProblemRef,
  current: Problem,
) -> List(Element(Msg)) {
  let note = model.assoc_get(m.notes, ref) |> result.unwrap("")
  list.flatten([
    [
      html.h1([attribute.class("read-title")], [
        html.text(current.title),
        format.language_chip(current.language),
        format.difficulty_badge(current.difficulty),
      ]),
      html.div([attribute.class("problem-category")], [
        html.text(ref.category <> " \u{203a} " <> ref.subcategory),
      ]),
      prompt_block(current),
    ],
    case current.check {
      // A read-and-run card has no function to sign: the whole program
      // is already in the editor.
      Some(check) if check.signature != "" -> [
        html.pre([attribute.class("signature")], [
          html.code([], [html.text(check.signature)]),
        ]),
      ]
      _ -> []
    },
    read_examples(m),
    case current.approach, m.hints_revealed {
      [], _ | _, 0 -> []
      stages, shown -> [
        html.section([attribute.class("read-approach approach")], [
          html.h3([attribute.class("panel-title")], [html.text("Approach")]),
          ..stages
          |> list.take(shown)
          |> list.map(fn(stage) {
            case m.recall {
              True -> recall_stage(stage)
              False -> approach_stage(stage)
            }
          })
        ]),
      ]
    },
    case note != "" && !model.first_encounter(m, ref) {
      True -> [
        html.section([attribute.class("panel note-panel has-note")], [
          html.h3([attribute.class("panel-title")], [
            html.text("Your note from last time"),
          ]),
          html.p([attribute.class("note-text")], [html.text(note)]),
        ]),
      ]
      False -> []
    },
  ])
}

fn prompt_block(current: Problem) -> Element(Msg) {
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

/// The cases as examples: call and expected answer, once a run has produced
/// them. The harness is source, so before a run there is nothing to list.
fn read_examples(m: Model) -> List(Element(Msg)) {
  case m.run {
    Ran(Cases(cases), _) if cases != [] -> [
      html.section([attribute.class("read-examples")], [
        html.h3([attribute.class("panel-title")], [html.text("Examples")]),
        html.ul(
          [attribute.class("case-list")],
          list.map(cases, fn(c: CaseResult) {
            html.li([attribute.class("case")], [
              html.code([], [html.text(c.label)]),
              html.text(" \u{2192} "),
              html.code([], [html.text(c.expected)]),
            ])
          }),
        ),
      ]),
    ]
    _ -> []
  }
}

/// What the slot beside the editor shows: one pane, or nothing.
fn slot_pane(
  m: Model,
  ref: ProblemRef,
  current: Problem,
) -> List(Element(Msg)) {
  case m.slot, m.walk {
    NoPane, _ -> []
    HintPane, _ ->
      case current.approach {
        [] -> []
        stages -> [hint_pane(m, stages)]
      }
    WalkPane, Some(state) -> walk_panel(current, state)
    WalkPane, None -> []
    SolutionPane, _ -> solution_pane(m, current)
    NotePane, _ -> [note_pane(m, ref)]
  }
}

/// A pane's top strip: what it is, and the way to put it away.
fn pane_header(
  children: List(Element(Msg)),
  close: Msg,
  label: String,
) -> Element(Msg) {
  html.div(
    [attribute.class("answer-header")],
    list.append(children, [
      html.button(
        [
          attribute.class("answer-close"),
          attribute.type_("button"),
          attribute.attribute("aria-label", label),
          event.on_click(close),
        ],
        [html.text("\u{00d7}")],
      ),
    ]),
  )
}

/// The quiz replaces the editor and the run bar entirely: there is nothing to
/// type and nothing to execute. Options stay clickable until Submit, after
/// which the grading and the explanation are shown and only Next remains.
/// A recall card: no editor. Think it through, reveal, grade from memory.
/// Every solution is shown on reveal, label and complexity first, because
/// naming the technique is the thing being tested.
fn recall_main(
  m: Model,
  ref: ProblemRef,
  current: Problem,
) -> List(Element(Msg)) {
  // The prompt stays on the page rather than behind a sheet: the card asks
  // you to think it through, and that needs the question in view.
  let reading =
    html.section(
      [attribute.class("read-sheet recall-read")],
      list.append(read_blocks(m, ref, current), [note_pane(m, ref)]),
    )
  case m.revealed_solution {
    None -> [
      reading,
      html.div([attribute.class("recall-card")], [
        html.p([attribute.class("recall-lead")], [
          html.text(
            "Say it, out loud or in your head: which pattern, which data structure, and the time and space complexity. Then reveal.",
          ),
        ]),
        html.div(
          [attribute.class("recall-actions")],
          list.flatten([
            [
              html.button(
                [
                  attribute.class("btn-primary recall-reveal"),
                  event.on_click(UserRevealedRecall),
                ],
                [html.text("Reveal")],
              ),
            ],
            undo_button(m),
          ]),
        ),
      ]),
    ]
    Some(_) -> [
      reading,
      html.div([attribute.class("recall-answers")], case current.solutions {
        [] -> [
          html.div([attribute.class("recall-card")], [
            html.p([attribute.class("recall-lead")], [
              html.text(
                "This drill has no reference solution; the approach is above.",
              ),
            ]),
          ]),
        ]
        solutions -> list.map(solutions, recall_solution)
      }),
      html.div(
        [attribute.class("run-bar recall-bar")],
        list.flatten([
          undo_button(m),
          [
            html.span([attribute.class("grade-hint recall-hint")], [
              html.text("How well did you have it?"),
            ]),
            grade_controls(m, current),
          ],
        ]),
      ),
    ]
  }
}

fn recall_solution(solution: Solution) -> Element(Msg) {
  html.div(
    [attribute.class("answer-content recall-answer")],
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
      case solution.note {
        "" -> []
        note -> [html.div([attribute.class("answer-note")], [html.text(note)])]
      },
      [html.pre([], [html.code([], [html.text(solution.code)])])],
    ]),
  )
}

fn quiz_main(
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
      prompt_block(current),
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
        results_box(
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

/// The note you left yourself last time, and the box to leave the next one.
/// A note from an earlier visit is lit so it cannot be missed. In the slot
/// it has a close button; on the recall card it just sits there.
fn note_pane(m: Model, ref: ProblemRef) -> Element(Msg) {
  let body = model.assoc_get(m.notes, ref) |> result.unwrap("")
  let returning = body != "" && !model.first_encounter(m, ref)
  let title =
    html.div([attribute.class("answer-label")], [
      html.text(case returning {
        True -> "Your note from last time"
        False -> "Note to future me"
      }),
    ])
  html.section(
    [
      attribute.classes([
        #("slot-pane", m.slot == NotePane && !m.recall),
        #("panel", True),
        #("note-pane", True),
        #("note-panel", True),
        #("has-note", returning),
      ]),
    ],
    [
      case m.recall {
        True -> html.div([attribute.class("answer-header")], [title])
        False ->
          pane_header([title], UserToggledPane(NotePane), "Close the note")
      },
      html.textarea(
        [
          attribute.class("note-input"),
          attribute.rows(6),
          attribute.placeholder(
            "What tripped you up, what to try first next time\u{2026}",
          ),
          attribute.attribute("aria-label", "Note on this problem"),
          event.on_input(NoteChanged),
        ],
        body,
      ),
    ],
  )
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

fn run_bar(m: Model, current: Problem) -> Element(Msg) {
  let run_control = case
    current.check,
    model.run_available(m, current.language)
  {
    None, _ -> [
      html.span([attribute.class("run-unavailable")], [
        html.text(
          "Checking isn't available for this drill \u{2014} compare with a solution.",
        ),
      ]),
    ]
    // Elixir and Go run on the server, which needs a session: a guest keeps
    // the flashcard experience every user had before they could run at all.
    Some(_), False -> [
      html.span([attribute.class("run-unavailable")], [
        html.text(
          "This drill runs on the server \u{2014} sign in to run it, or compare with a solution.",
        ),
      ]),
    ]
    Some(_), True ->
      case
        model.runtime_for(m, problem.language_slug(current.language)),
        m.run
      {
        _, Running(_, _) -> [
          run_button(
            case m.run_kind {
              model.ScratchRun -> "Running\u{2026}"
              model.TestRun -> "Testing\u{2026}"
            },
            True,
          ),
          html.button(
            [
              attribute.class("btn-secondary stop-button"),
              event.on_click(UserClickedStopRun),
            ],
            [html.text("Stop")],
          ),
        ]
        RuntimeReady, _ -> [
          scratch_button(current),
          run_button("\u{25b6} Run tests", False),
        ]
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
      undo_button(m),
      [grade_controls(m, current)],
    ]),
  )
}

/// Takes back the grade just given on the previous card. Only while there
/// is one, and only on the card right after it; a new grade replaces it.
fn undo_button(m: Model) -> List(Element(Msg)) {
  case m.undo {
    Some(point) -> [
      html.button(
        [
          attribute.class("btn-secondary undo-button"),
          attribute.type_("button"),
          attribute.attribute(
            "title",
            "Take back the grade on " <> point.problem.title,
          ),
          event.on_click(UserClickedUndo),
        ],
        [html.text("\u{21b6} Undo grade")],
      ),
    ]
    None -> []
  }
}

/// The Blitz clock: what is left on this card, red inside the last thirty
/// seconds. At zero the card is over and the next one opens.
fn countdown(m: Model, blitz: model.Blitz) -> Element(Msg) {
  let left = int.max(0, { blitz.deadline_ms - m.now_ms } / 1000)
  let text =
    int.to_string(left / 60)
    <> ":"
    <> string.pad_start(int.to_string(left % 60), 2, "0")
  let done = list.length(blitz.results)
  let total = list.length(m.selected)
  html.span(
    [
      attribute.classes([
        #("drill-clock", True),
        #("drill-countdown", True),
        #("drill-clock-urgent", left <= 30),
      ]),
      attribute.attribute("aria-label", "Time left on this card"),
    ],
    [
      html.text(
        " \u{b7} \u{23f1} "
        <> text
        <> " \u{b7} "
        <> int.to_string(done)
        <> "/"
        <> int.to_string(total),
      ),
    ],
  )
}

/// One beat of "Time!" as an expired Blitz card gives way to the next.
fn blitz_flash(m: Model) -> Element(Msg) {
  case m.blitz {
    Some(model.Blitz(expired_flash: True, ..)) ->
      html.div([attribute.class("blitz-flash"), attribute.role("status")], [
        html.text("Time!"),
      ])
    _ -> element.none()
  }
}

/// How long this problem has been open, as m:ss, turning accent past the
/// three minutes the stats screen counts a fluent solve against. Shown live so
/// the number in the summary is never a surprise.
fn clock(m: Model) -> Element(Msg) {
  let seconds = int.max(0, { m.now_ms - m.opened_at_ms } / 1000)
  let text =
    int.to_string(seconds / 60)
    <> ":"
    <> string.pad_start(int.to_string(seconds % 60), 2, "0")
  // Your own median on this problem, from the insights loaded at boot: the
  // sittings before this one, which is exactly the pace to beat. Not
  // refreshed per review on purpose; this sitting's solves join it next time.
  let median = case m.insights, model.current_ref(m), m.recall {
    Some(data), Ok(ref), False -> insights.fluency_for(data, ref)
    _, _, _ -> None
  }
  html.span(
    [
      attribute.classes([
        #("drill-clock", True),
        #("over-promise", seconds >= promise_seconds),
        #("over-median", case median {
          Some(ms) -> seconds * 1000 > ms
          None -> False
        }),
      ]),
      attribute.attribute("aria-label", "Time on this problem"),
    ],
    [
      html.text(" \u{b7} " <> text),
      ..case median {
        Some(ms) -> [
          html.span(
            [
              attribute.class("drill-median"),
              attribute.attribute("aria-label", "Your median on this problem"),
            ],
            [html.text(" \u{b7} median " <> insights.duration_label(ms))],
          ),
        ]
        None -> []
      }
    ],
  )
}

/// The "under three minutes" the stats screen measures against.
const promise_seconds = 180

/// The in-app "leave this drill?" question. Replaces `window.confirm`, which
/// froze the page, could not be styled and swallowed the leader key.
fn exit_prompt(m: Model) -> Element(Msg) {
  case m.exit_prompt {
    None -> element.none()
    Some(message) ->
      html.div([attribute.class("exit-overlay")], [
        html.div(
          [
            attribute.class("exit-prompt"),
            attribute.role("dialog"),
            attribute.attribute("aria-modal", "true"),
            attribute.attribute("aria-labelledby", "exit-prompt-title"),
          ],
          [
            html.p(
              [
                attribute.class("exit-prompt-title"),
                attribute.id("exit-prompt-title"),
              ],
              [html.text(message)],
            ),
            html.div([attribute.class("exit-prompt-actions")], [
              html.button(
                [
                  attribute.class("btn-primary exit-prompt-leave"),
                  event.on_click(ExitConfirmed(True)),
                ],
                [html.text("Leave")],
              ),
              html.button(
                [
                  attribute.class("btn-secondary exit-prompt-stay"),
                  event.on_click(ExitConfirmed(False)),
                ],
                [html.text("Stay")],
              ),
            ]),
          ],
        ),
      ])
  }
}

/// The grading bar: how a drill turns into a scheduled review.
///
/// The rules, in order of precedence:
///   * A quiz grades itself on submit — plain Next button.
///   * The FIRST encounter of a problem grades from the moment it opens.
///     Revealing the solution is how you learn something the first time —
///     flip the card, judge yourself.
///   * A reveal-only drill (no harness exists) is a flashcard proper: all four
///     buttons, every time.
///   * Every later review of a checkable drill must run first. After that run
///     the choice is yours, whatever the harness said and whatever you looked
///     at: the grade is a self-assessment of how well you knew it, never a
///     verdict the app hands down. The review log still records the failed
///     run and the reveal, so the stats stay honest without the buttons
///     policing you.
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

fn grade_buttons(m: Model, _current: Problem) -> Element(Msg) {
  html.div([attribute.class("grade-bar")], [
    grade_button(m, fsrs.Again, "Again", "again"),
    grade_button(m, fsrs.Hard, "Hard", "hard"),
    grade_button(m, fsrs.Good, "Good", "good"),
    grade_button(m, fsrs.Easy, "Easy", "easy"),
  ])
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

/// One button per reference, in the solution pane's header. The one showing
/// is lit; choosing another is choosing it, which the log records.
fn solution_picker(current: Problem, shown: Int) -> Element(Msg) {
  html.div(
    [attribute.class("solution-picker")],
    list.index_map(current.solutions, fn(solution: Solution, index) {
      html.button(
        [
          attribute.classes([
            #("btn-secondary", True),
            #("solution-button", True),
            #("revealed", shown == index),
          ]),
          attribute.type_("button"),
          event.on_click(UserToggledSolution(index)),
        ],
        [html.text(solution.label)],
      )
    }),
  )
}

/// The code alone, no harness: for reading what it prints while you work.
fn scratch_button(current: Problem) -> Element(Msg) {
  html.button(
    [
      attribute.class("btn-secondary scratch-button"),
      attribute.attribute(
        "title",
        runner.scratch_hint(problem.language_slug(current.language)),
      ),
      event.on_click(UserClickedScratchRun),
    ],
    [html.text("\u{25b6} Run")],
  )
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

/// The guided walkthrough: the plan one step at a time, beside the editor.
/// Each step has three layers under it -- a hint that points, a why that
/// explains, and its slice of the pseudocode -- turned over on request.
/// Only the code slice is logged as a reveal; the panel says so.
fn walk_panel(current: Problem, state: model.WalkState) -> List(Element(Msg)) {
  let steps = model.walk_steps(current.approach)
  let total = list.length(steps)
  let finished = state.step >= total
  let header =
    html.div([attribute.class("answer-header")], [
      html.div([attribute.class("answer-label")], [
        html.text(case finished {
          True -> "That's the approach"
          False ->
            "Step "
            <> int.to_string(state.step + 1)
            <> " of "
            <> int.to_string(total)
        }),
      ]),
      html.div(
        [
          attribute.class("walk-progress"),
          attribute.attribute("aria-hidden", "true"),
        ],
        list.index_map(steps, fn(_, index) {
          html.span(
            [
              attribute.classes([
                #("walk-dot", True),
                #("done", index < state.step),
                #("current", index == state.step),
              ]),
            ],
            [],
          )
        }),
      ),
      html.button(
        [
          attribute.class("answer-close"),
          attribute.type_("button"),
          attribute.attribute("aria-label", "Close the walkthrough"),
          event.on_click(UserClosedWalk),
        ],
        [html.text("\u{00d7}")],
      ),
    ])
  let done =
    steps
    |> list.take(state.step)
    |> list.index_map(fn(step, index) {
      html.li([attribute.class("walk-step-done")], [
        html.span([attribute.class("walk-step-number")], [
          html.text(int.to_string(index + 1)),
        ]),
        html.text(step.step),
      ])
    })
  let body = case list.drop(steps, state.step) {
    [step, ..] -> [
      html.p([attribute.class("walk-step")], [html.text(step.step)]),
      ..list.flatten([
        layer(state.hint_shown, "walk-hint", "Hint", step.hint),
        layer(state.why_shown, "walk-why", "Why", step.why),
        case step.code {
          "" -> []
          code ->
            case state.code_shown {
              True -> [
                html.pre([attribute.class("approach-pseudocode walk-code")], [
                  html.code([], [html.text(code)]),
                ]),
              ]
              False -> []
            }
        },
        [
          html.div(
            [attribute.class("walk-controls")],
            list.flatten([
              case state.hint_shown {
                True -> []
                False -> [
                  reveal_button("walk-reveal-hint", "Hint", "h", WalkHintShown),
                ]
              },
              case state.why_shown {
                True -> []
                False -> [
                  reveal_button("walk-reveal-why", "Why", "y", WalkWhyShown),
                ]
              },
              case step.code, state.code_shown {
                "", _ | _, True -> []
                _, False -> [
                  reveal_button("walk-reveal-code", "Code", "c", WalkCodeShown),
                  html.span([attribute.class("hint-warning")], [
                    html.text("logged as a reveal"),
                  ]),
                ]
              },
              [
                html.button(
                  [
                    attribute.class("btn-primary walk-next"),
                    attribute.type_("button"),
                    event.on_click(WalkAdvanced),
                  ],
                  [
                    html.text(case state.step + 1 == total {
                      True -> "Done"
                      False -> "Next step"
                    }),
                    html.kbd([], [html.text("\u{21b5}")]),
                  ],
                ),
              ],
            ]),
          ),
        ],
      ])
    ]
    [] -> [
      html.p([attribute.class("walk-step walk-finished")], [
        html.text(
          "Every step is on the left now. Write it, run it, and grade how much of that you had before the walk.",
        ),
      ]),
      html.div([attribute.class("walk-controls")], [
        html.button(
          [
            attribute.class("btn-secondary"),
            attribute.type_("button"),
            event.on_click(WalkBacked),
          ],
          [html.text("Back")],
        ),
        html.button(
          [
            attribute.class("btn-primary walk-next"),
            attribute.type_("button"),
            event.on_click(UserClosedWalk),
          ],
          [html.text("Close"), html.kbd([], [html.text("\u{21b5}")])],
        ),
      ]),
    ]
  }
  [
    html.div(
      [attribute.class("slot-pane answer-content answer-side walk-side")],
      list.flatten([
        [header],
        case done {
          [] -> []
          _ -> [html.ol([attribute.class("walk-done")], done)]
        },
        body,
      ]),
    ),
  ]
}

fn layer(
  shown: Bool,
  class: String,
  label: String,
  text: String,
) -> List(Element(Msg)) {
  case shown {
    False -> []
    True -> [
      html.div([attribute.class("walk-layer " <> class)], [
        html.span([attribute.class("walk-layer-label")], [html.text(label)]),
        html.p([], [html.text(text)]),
      ]),
    ]
  }
}

fn reveal_button(
  class: String,
  label: String,
  key: String,
  msg: Msg,
) -> Element(Msg) {
  html.button(
    [
      attribute.class("btn-secondary walk-reveal " <> class),
      attribute.type_("button"),
      event.on_click(msg),
    ],
    [html.text(label), html.kbd([], [html.text(key)])],
  )
}

/// The revealed solution, rendered beside the editor so code and answer can be
/// compared line by line rather than by scrolling.
fn solution_pane(m: Model, current: Problem) -> List(Element(Msg)) {
  // A passing run opens the pane by itself, as a diff of your code against
  // the closest solution. That is not a reveal -- the answer was already
  // given -- so `revealed_solution` is left alone and the review's
  // `revealed` stays honest.
  let passed =
    model.test_passed(m)
    && string.trim(m.draft) != ""
    && current.solutions != []
  let diffing = passed && m.diff_mode
  let shown = case revealed(m, current), passed {
    Ok(pair), _ -> Ok(#(True, pair))
    Error(Nil), True ->
      closest_solution(m.draft, current.solutions)
      |> result.map(fn(pair) { #(False, pair) })
    Error(Nil), False -> Error(Nil)
  }
  case shown {
    Ok(#(by_choice, #(index, solution))) -> [
      html.div(
        [
          attribute.classes([
            #("slot-pane", True),
            #("answer-content", True),
            #("answer-side", True),
            #("diffing", diffing),
            #("auto", !by_choice),
          ]),
        ],
        list.flatten([
          [
            html.div(
              [attribute.class("answer-header")],
              list.flatten([
                [
                  html.div([attribute.class("answer-label")], [
                    html.text(case diffing {
                      True -> "Yours vs " <> solution.label
                      False -> solution.label
                    }),
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
                case passed {
                  True -> [
                    html.button(
                      [
                        attribute.class("answer-toggle"),
                        attribute.type_("button"),
                        event.on_click(UserToggledDiff),
                      ],
                      [
                        html.text(case diffing {
                          True -> "Show code"
                          False -> "Show diff"
                        }),
                      ],
                    ),
                  ]
                  False -> []
                },
                [
                  html.button(
                    [
                      attribute.class("answer-close"),
                      attribute.type_("button"),
                      attribute.attribute("aria-label", "Hide solution"),
                      event.on_click(case by_choice {
                        True -> UserToggledPane(SolutionPane)
                        False -> UserDismissedDiff
                      }),
                    ],
                    [html.text("\u{00d7}")],
                  ),
                ],
              ]),
            ),
          ],
          // The other references, one press away. Only the chosen one is
          // lit: an auto-opened diff has chosen nothing.
          case current.solutions {
            [_] | [] -> []
            _ -> [
              solution_picker(current, case by_choice {
                True -> index
                False -> -1
              }),
            ]
          },
          // Solutions written before their note exists simply have none; an
          // empty div would still draw its margins.
          case solution.note {
            "" -> []
            note -> [
              html.div([attribute.class("answer-note")], [html.text(note)]),
            ]
          },
          case diffing {
            True -> [
              html.p([attribute.class("answer-diff-key")], [
                html.text(
                  "Your code, with what the reference does instead struck through.",
                ),
              ]),
              editor.diff_view(
                m.draft,
                solution.code,
                problem.language_slug(current.language),
              ),
            ]
            False -> [html.pre([], [html.code([], [html.text(solution.code)])])]
          },
          // Every solution is a file in a public repository. Say so where
          // someone is most likely to disagree with one.
          [
            html.p([attribute.class("answer-suggest")], [
              html.text("Not happy with this one? "),
              links.external(
                "Suggest a better solution \u{2197}",
                links.suggest_solution(
                  problem.language_label(current.language),
                  current.title,
                  solution.label,
                ),
              ),
            ]),
          ],
        ]),
      ),
    ]
    Error(Nil) -> []
  }
}

/// The reference most like what was typed: the one sharing the most lines
/// with it, ties to the first. Diffing a set-based solve against the brute
/// force would mark every line; against the hash-set reference it marks
/// only what actually differs.
fn closest_solution(
  draft: String,
  solutions: List(Solution),
) -> Result(#(Int, Solution), Nil) {
  let lines = fn(code) {
    code
    |> string.split("\n")
    |> list.map(string.trim)
    |> list.filter(fn(line) { line != "" })
  }
  let typed = lines(draft)
  solutions
  |> list.index_map(fn(solution, index) {
    let theirs = lines(solution.code)
    let shared = list.count(typed, fn(line) { list.contains(theirs, line) })
    #(shared, index, solution)
  })
  |> list.fold(Error(Nil), fn(best, candidate) {
    case best {
      Ok(#(score, _, _)) if score >= candidate.0 -> best
      _ -> Ok(candidate)
    }
  })
  |> result.map(fn(found) { #(found.1, found.2) })
}

fn revealed(m: Model, current: Problem) -> Result(#(Int, Solution), Nil) {
  case m.revealed_solution {
    Some(index) ->
      current.solutions
      |> list.drop(index)
      |> list.first
      |> result.map(fn(solution) { #(index, solution) })
    None -> Error(Nil)
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
fn results_box(
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

fn error_results(m: Model, error: RunError, current: Problem) -> Element(Msg) {
  // An "internal" failure is the drill runner's own bug; even when it names a
  // check file it must not read as "your signature is wrong".
  let is_check_file = case error.file, error.phase {
    _, "internal" -> False
    Some(file), _ -> string.starts_with(file, "check")
    None, _ -> False
  }
  case is_check_file, current.check {
    True, Some(check) ->
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
    _, _ ->
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
fn hint_pane(m: Model, stages: List(problem.ApproachStage)) -> Element(Msg) {
  let total = list.length(stages)
  let shown = int.min(m.hints_revealed, total)
  let revealed =
    stages
    |> list.take(shown)
    |> list.map(fn(stage) {
      case m.recall, stage, m.walk {
        True, _, _ -> recall_stage(stage)
        // A walk in progress lists only the steps already walked: the
        // panel is where the next one is read, one at a time.
        False, problem.Walk(steps), Some(state) ->
          walk_summary(list.take(steps, state.step), m.slot != WalkPane)
        False, problem.Walk(steps), None -> walk_summary(steps, True)
        False, _, _ -> approach_stage(stage)
      }
    })

  let control = case list.drop(stages, shown) {
    [] -> []
    [next, ..] -> [
      html.button(
        [
          attribute.class("btn-secondary hint-button"),
          // The walk form of the plan opens the guided panel; the other
          // rungs just unfold in place.
          event.on_click(case next {
            problem.Walk(_) -> UserOpenedWalk
            _ -> UserRevealedHint
          }),
        ],
        [
          html.text(
            case next {
              problem.Nudge(_) -> "Show hint"
              problem.Walk(_) -> "Walk me through it"
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
        // Fair warning before the rung that gives the answer away. It is
        // recorded as a reveal for the stats; it never changes the grades.
        problem.Pseudocode(_) -> [
          html.span([attribute.class("hint-warning")], [
            html.text("logged as a reveal"),
          ]),
        ]
        _ -> []
      }
    ]
  }

  html.section([attribute.class("slot-pane panel approach")], [
    pane_header(
      [
        html.div([attribute.class("answer-label")], [
          html.text(
            "Approach \u{b7} "
            <> int.to_string(shown)
            <> "/"
            <> int.to_string(total),
          ),
        ]),
      ],
      UserToggledPane(HintPane),
      "Close the hints",
    ),
    ..list.append(revealed, [
      html.div([attribute.class("hint-controls")], control),
    ])
  ])
}

fn approach_stage(stage: problem.ApproachStage) -> Element(Msg) {
  case stage {
    problem.Nudge(text) ->
      html.p([attribute.class("approach-nudge")], [html.text(text)])
    // In the ladder a walk reads as the plain list; the hints and whys
    // live in the walkthrough panel, one step at a time.
    problem.Walk(steps) -> walk_summary(steps, True)
    problem.Pseudocode(code) ->
      html.pre([attribute.class("approach-pseudocode")], [
        html.code([], [html.text(code)]),
      ])
  }
}

/// The plan rung as the ladder shows it: the step texts, and a way into the
/// walkthrough unless it is already open beside the editor.
fn walk_summary(steps: List(problem.WalkStep), offer: Bool) -> Element(Msg) {
  html.div(
    [attribute.class("approach-walk")],
    list.flatten([
      case steps {
        [] -> []
        _ -> [
          html.ol(
            [attribute.class("approach-steps")],
            list.map(steps, fn(step) { html.li([], [html.text(step.step)]) }),
          ),
        ]
      },
      case offer {
        True -> [
          html.button(
            [
              attribute.class("link-button approach-walk-open"),
              attribute.type_("button"),
              event.on_click(UserOpenedWalk),
            ],
            [html.text("Walk through the steps \u{2192}")],
          ),
        ]
        False -> []
      },
    ]),
  )
}

/// The same rung in recall mode, where reading is the point: every step
/// with its why underneath.
fn recall_stage(stage: problem.ApproachStage) -> Element(Msg) {
  case stage {
    problem.Walk(steps) ->
      html.ol(
        [attribute.class("approach-steps approach-steps-explained")],
        list.map(steps, fn(step) {
          html.li([], [
            html.text(step.step),
            html.p([attribute.class("approach-why")], [html.text(step.why)]),
          ])
        }),
      )
    other -> approach_stage(other)
  }
}

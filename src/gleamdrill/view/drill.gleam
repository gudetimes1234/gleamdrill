import fsrs
import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleam/result
import gleam/string
import gleamdrill/editor
import gleamdrill/insights
import gleamdrill/model.{
  type CaseResult, type Model, AwaitingGrade, Cases, Errored, NoPane, NotGrading,
  NotePane, Ran, Running, RuntimeFailed, RuntimeLoading, RuntimeNotLoaded,
  RuntimeReady, SolutionPane, SubmittingGrade,
}
import gleamdrill/msg.{
  type Msg, EditorChanged, EditorResized, ExitConfirmed, NoteChanged,
  UserChangedKeymap, UserClickedExitDrill, UserClickedNext,
  UserClickedRetryRuntime, UserClickedRun, UserClickedScratchRun,
  UserClickedStopRun, UserClickedUndo, UserDismissedDiff, UserGraded,
  UserRevealedRecall, UserToggledDiff, UserToggledPane, UserToggledPrompt,
  UserToggledSolution,
}
import gleamdrill/problem.{type Problem, type ProblemRef, type Solution}
import gleamdrill/problems
import gleamdrill/runner
import gleamdrill/view/banner
import gleamdrill/view/blitz
import gleamdrill/view/board as board_view
import gleamdrill/view/format
import gleamdrill/view/links
import gleamdrill/view/nav
import gleamdrill/view/quiz
import gleamdrill/view/rail
import gleamdrill/view/results
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
  let progress = case problem.kind(current) {
    // An exam is a single pass, so the repetition counter would only ever read
    // "Pass 1/1".
    problem.QuizDrill ->
      "Question "
      <> int.to_string(m.problem_index + 1)
      <> "/"
      <> int.to_string(count)
    problem.BoardDrill | problem.CodeDrill ->
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
      // picker is noise; a recall card says what it is instead. The prompt
      // sidebar's toggle is here too, for a thumb: `p` is no use on a
      // phone.
      case problem.kind(current), m.recall {
        problem.QuizDrill, _ -> element.none()
        // A board has nothing to type either, and its prompt is already the
        // first thing on the page rather than a sidebar.
        problem.BoardDrill, _ -> element.none()
        problem.CodeDrill, True ->
          html.span([attribute.class("recall-chip")], [html.text("Recall")])
        problem.CodeDrill, False ->
          html.div([attribute.class("drill-tools")], [
            html.button(
              [
                attribute.classes([
                  #("btn-secondary", True),
                  #("prompt-toggle", True),
                  #("active", m.prompt_open),
                ]),
                attribute.type_("button"),
                event.on_click(UserToggledPrompt),
              ],
              [html.text("Problem")],
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
          case problem.kind(current), m.blitz {
            problem.QuizDrill, _ -> element.none()
            // A board is timed -- the fluent line is what separates an Easy
            // from a Good -- so it keeps the clock the quiz does without.
            problem.BoardDrill, _ -> clock(m)
            // A Blitz counts down; every other sitting counts up.
            problem.CodeDrill, Some(blitz) -> blitz.countdown(m, blitz)
            problem.CodeDrill, None -> clock(m)
          },
        ],
      ),
    ]),
    exit_prompt(m),
    blitz.blitz_flash(m),
    case problem.kind(current), m.recall {
      problem.QuizDrill, _ ->
        case current.quiz {
          Some(quiz) ->
            html.div(
              [attribute.class("drill-main")],
              quiz.quiz_main(m, ref, current, quiz),
            )
          None -> element.none()
        }
      problem.BoardDrill, _ ->
        case current.board {
          Some(answer) ->
            html.div(
              [attribute.class("drill-main")],
              board_view.board_main(m, ref, current, answer),
            )
          None -> element.none()
        }
      problem.CodeDrill, True ->
        html.div([attribute.class("drill-main")], recall_main(m, ref, current))
      // The prompt sidebar comes and goes; the editor column stays child 0
      // of the same parent either way, so CodeMirror keeps its undo history
      // and cursor. The stylesheet puts the sidebar on the left (order: -1).
      problem.CodeDrill, False ->
        keyed.div([attribute.class("drill-body")], [
          #(
            "main",
            html.div(
              [attribute.class("drill-main")],
              code_main(m, ref, current, body_key),
            ),
          ),
          // The rail is the *later* DOM child for the same reason the prompt
          // sidebar used to be: the keyed editor frame has to stay child 0 of
          // its own parent or CodeMirror remounts and drops its undo history
          // and cursor. The stylesheet puts this on the left (order: -1).
          #("rail", rail.plan_rail(m, current)),
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
      // The editor and, above it, the prompt (order: -1 in the stylesheet
      // floats it up while the keyed frame stays the DOM's first child, so
      // CodeMirror keeps its history and cursor). Its own column so the
      // prompt pushes the editor down and nothing else: a revealed solution
      // sits beside it and has to stay readable and clickable.
      html.div([attribute.class("editor-column")], [
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
        ..case m.prompt_open {
          True -> [prompt_side(m, ref, current)]
          False -> []
        }
      ]),
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
            results.output_panel(m),
          ]),
        ]
        None -> []
      },
      [run_bar(m, current)],
      results.results_only(m, current),
    ])
  ]
}

/// The prompt above the editor: everything there is to read, in a column
/// the editor keeps the rest of the width from.
fn prompt_side(m: Model, ref: ProblemRef, current: Problem) -> Element(Msg) {
  html.aside([attribute.class("prompt-side read-sheet")], [
    // A sheet over the editor needs its own way out, the same as every
    // pane: the header's Problem button is across the screen, and `p` is
    // only obvious to someone who has read the cheatsheet.
    html.button(
      [
        attribute.class("answer-close prompt-close"),
        attribute.type_("button"),
        attribute.attribute("aria-label", "Hide the problem"),
        event.on_click(UserToggledPrompt),
      ],
      [html.text("\u{00d7}")],
    ),
    ..read_blocks(m, ref, current)
  ])
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
      results.prompt_block(current),
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
    // Only a recall card reads the approach here. A code drill has the rail,
    // which shows the same plan and cannot be evicted by the solution -- and
    // two copies of it on one screen is how they came to disagree.
    case current.approach, m.recall {
      [], _ | _, False -> []
      stages, True -> [
        html.section([attribute.class("read-approach approach")], [
          html.h3([attribute.class("panel-title")], [html.text("Approach")]),
          ..list.map(stages, recall_stage(_, current.language))
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
  case m.slot {
    NoPane -> []
    SolutionPane -> solution_pane(m, current)
    NotePane -> [note_pane(m, ref)]
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

// --- The system design board ------------------------------------------------

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
            html.text(results.first_lines(message)),
          ]),
        ]
      }
  }

  html.div(
    [attribute.class("run-bar")],
    list.flatten([
      run_control,
      [pane_buttons(m, current)],
      undo_button(m),
      [grade_controls(m, current)],
    ]),
  )
}

/// One button per thing the slot can show, lit while it is showing: the
/// things the keys s and m press, for the mouse. A solution's button is its
/// own, so choosing one is one click.
///
/// The approach is not among them any more: it is on the rail, always, so
/// there is nothing to open.
fn pane_buttons(m: Model, current: Problem) -> Element(Msg) {
  let solutions =
    list.index_map(current.solutions, fn(solution: Solution, index) {
      pane_button(
        solution.label,
        m.slot == SolutionPane && m.revealed_solution == Some(index),
        UserToggledSolution(index),
        True,
      )
    })
  let note = [
    pane_button("Note", m.slot == NotePane, UserToggledPane(NotePane), False),
  ]
  html.div([attribute.class("pane-buttons")], list.flatten([solutions, note]))
}

fn pane_button(
  label: String,
  lit: Bool,
  msg: Msg,
  solution: Bool,
) -> Element(Msg) {
  html.button(
    [
      attribute.classes([
        #("btn-secondary", True),
        #("pane-button", True),
        #("solution-button", solution),
        #("revealed", lit),
      ]),
      attribute.type_("button"),
      event.on_click(msg),
    ],
    [html.text(label)],
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
///   * A quiz or a board grades itself on submit — plain Next button.
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
  case problem.kind(current) {
    problem.QuizDrill | problem.BoardDrill ->
      html.button(
        [
          attribute.class("btn-primary next-button"),
          event.on_click(UserClickedNext),
        ],
        [html.text("Next")],
      )
    problem.CodeDrill ->
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
    Ok(#(by_choice, #(_, solution))) -> [
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

/// Compile errors inside the user's own module become inline underlines.
fn editor_diagnostics(m: Model) -> List(editor.Diagnostic) {
  case m.run {
    Ran(Errored(error), _) ->
      case error.file, error.line, error.column {
        Some("solution.gleam"), Some(line), Some(column) -> [
          editor.Diagnostic(line, column, results.first_lines(error.message)),
        ]
        Some("solution.py"), Some(line), Some(column) -> [
          editor.Diagnostic(line, column, results.first_lines(error.message)),
        ]
        Some("solution.ts"), Some(line), Some(column) -> [
          editor.Diagnostic(line, column, results.first_lines(error.message)),
        ]
        _, _, _ -> []
      }
    _ -> []
  }
}

fn approach_stage(
  stage: problem.ApproachStage,
  language: problem.Language,
) -> Element(Msg) {
  case stage {
    problem.Nudge(text) ->
      html.p([attribute.class("approach-nudge")], [html.text(text)])
    // Reached only by a recall card's Nudge/Pseudocode rungs in practice --
    // `recall_stage` intercepts a walk to put each why under its step -- but
    // kept total so a third caller cannot fall through into nothing.
    problem.Walk(steps) ->
      html.ol(
        [attribute.class("approach-steps")],
        list.map(steps, fn(step) { html.li([], [html.text(step.step)]) }),
      )
    problem.Pseudocode(slices) ->
      html.pre([attribute.class("approach-pseudocode")], [
        html.code([], [html.text(problem.slice_for(slices, language))]),
      ])
  }
}

/// The same rung in recall mode, where reading is the point: every step
/// with its why underneath.
fn recall_stage(
  stage: problem.ApproachStage,
  language: problem.Language,
) -> Element(Msg) {
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
    other -> approach_stage(other, language)
  }
}

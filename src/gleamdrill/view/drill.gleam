import fsrs
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/string
import gleamdrill/board
import gleamdrill/editor
import gleamdrill/insights
import gleamdrill/model.{
  type CaseResult, type Model, type RunError, AwaitingGrade, Cases, Errored,
  NoPane, NotGrading, NotePane, Ran, RunIdle, Running, RuntimeFailed,
  RuntimeLoading, RuntimeNotLoaded, RuntimeReady, SolutionPane, SubmittingGrade,
  TimedOut,
}
import gleamdrill/msg.{
  type Msg, EditorChanged, EditorResized, ExitConfirmed, NoteChanged,
  UserChangedKeymap, UserClickedExitDrill, UserClickedNext,
  UserClickedRetryRuntime, UserClickedRun, UserClickedScratchRun,
  UserClickedStopRun, UserClickedUndo, UserDismissedDiff, UserGraded,
  UserPickedChoice, UserRevealedRecall, UserRevealedWholeThing,
  UserSubmittedAnswer, UserSubmittedBoard, UserToggledDiff, UserToggledNudge,
  UserToggledPane, UserToggledPiece, UserToggledPrompt, UserToggledResults,
  UserToggledSolution, WalkCodeShown, WalkFocused, WalkHintShown, WalkWhyShown,
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
            problem.CodeDrill, Some(blitz) -> countdown(m, blitz)
            problem.CodeDrill, None -> clock(m)
          },
        ],
      ),
    ]),
    exit_prompt(m),
    blitz_flash(m),
    case problem.kind(current), m.recall {
      problem.QuizDrill, _ ->
        case current.quiz {
          Some(quiz) ->
            html.div(
              [attribute.class("drill-main")],
              quiz_main(m, ref, current, quiz),
            )
          None -> element.none()
        }
      problem.BoardDrill, _ ->
        case current.board {
          Some(answer) ->
            html.div(
              [attribute.class("drill-main")],
              board_main(m, ref, current, answer),
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
          #("rail", plan_rail(m, current)),
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

// --- The system design board ------------------------------------------------

/// The board replaces the editor and the run bar entirely, like the quiz. The
/// whole palette is on screen from the moment it opens -- that is the point:
/// a shortlist would turn recall into recognition -- and every piece stays
/// clickable until Submit, after which all thirty-six are annotated and only
/// Next remains.
fn board_main(
  m: Model,
  ref: ProblemRef,
  current: Problem,
  answer: board.Board,
) -> List(Element(Msg)) {
  let question =
    html.section([attribute.class("read-sheet board-question")], [
      html.div([attribute.class("problem-category")], [
        html.text(ref.category <> " \u{203a} " <> ref.subcategory),
      ]),
      prompt_block(current),
    ])

  [question, board_palette(m, answer), board_bar(m), ..board_verdict(m, answer)]
}

/// The palette, six labelled shelves in family order. One flat cursor index
/// walks it: the columns are responsive, so true two-dimensional movement
/// would be a lie about a layout that reflows.
fn board_palette(m: Model, answer: board.Board) -> Element(Msg) {
  html.div(
    [attribute.class("board-palette")],
    list.map(board.families(), fn(family) { board_shelf(m, answer, family) }),
  )
}

fn board_shelf(
  m: Model,
  answer: board.Board,
  family: board.Family,
) -> Element(Msg) {
  html.section(
    [attribute.class("board-shelf board-shelf-" <> board.family_slug(family))],
    [
      html.h3([attribute.class("board-shelf-label")], [
        html.text(board.family_label(family)),
      ]),
      html.div(
        [attribute.class("board-shelf-pieces")],
        list.map(board.pieces_in(family), fn(piece) {
          board_chip(m, answer, piece)
        }),
      ),
    ],
  )
}

fn board_chip(
  m: Model,
  answer: board.Board,
  piece: board.Piece,
) -> Element(Msg) {
  let index = board.index_of(piece)
  let picked = list.contains(m.board_picks, piece.id)
  let verdict = board.verdict(answer, piece, m.board_picks)
  html.button(
    [
      attribute.id(model.board_chip_id(index)),
      attribute.type_("button"),
      attribute.classes([
        #("board-chip", True),
        #("picked", picked),
        #("cursor", m.board_cursor == index),
        // Only after grading does the styling say anything true about the
        // answer, otherwise the board would give itself away.
        #("hit", m.graded && verdict == board.Hit),
        #("missed", m.graded && verdict == board.Missed),
        #("wrong", m.graded && verdict == board.WrongPick),
        #("neutral", m.graded && verdict == board.NeutralPick),
      ]),
      attribute.disabled(m.graded),
      event.on_click(UserToggledPiece(piece.id)),
    ],
    [
      html.span([attribute.class("board-chip-label")], [html.text(piece.label)]),
      html.span([attribute.class("board-chip-why")], [html.text(piece.why)]),
    ],
  )
}

fn board_bar(m: Model) -> Element(Msg) {
  html.div([attribute.class("run-bar")], case m.graded {
    False -> [
      html.button(
        [
          attribute.class("btn-primary"),
          // Submitting nothing is not an answer; it is a way to mark a card
          // Again without reading it.
          attribute.disabled(m.board_picks == []),
          event.on_click(UserSubmittedBoard),
        ],
        [html.text("Submit board")],
      ),
      html.button(
        [
          attribute.class("btn-secondary skip-button"),
          event.on_click(UserClickedNext),
        ],
        [html.text("Skip")],
      ),
      html.span([attribute.class("board-count")], [
        html.text(case list.length(m.board_picks) {
          1 -> "1 piece on the board"
          n -> int.to_string(n) <> " pieces on the board"
        }),
      ]),
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
}

/// After submitting: the score, then what was missed and what was spurious,
/// each with the line that says why. Pieces answered correctly are not listed
/// -- they are already green on the board, and the list is for reading what
/// you got wrong.
fn board_verdict(m: Model, answer: board.Board) -> List(Element(Msg)) {
  case m.graded {
    False -> []
    True -> {
      let graded = board.grade(m.board_picks, answer, 0)
      let headline =
        int.to_string(list.length(graded.hit))
        <> "/"
        <> int.to_string(list.length(answer.required))
        <> case list.length(graded.wrong) {
          0 -> ""
          1 -> " \u{b7} 1 you do not need"
          n -> " \u{b7} " <> int.to_string(n) <> " you do not need"
        }
      [
        results_box(
          m,
          headline,
          graded.rating != fsrs.Again,
          None,
          list.flatten([
            board_list("Missing", "board-missed", graded.missed, fn(piece) {
              board.why(answer, piece)
            }),
            board_list(
              "Not needed here",
              "board-wrong",
              graded.wrong,
              fn(piece) { piece.why },
            ),
            case graded.neutral {
              [] -> []
              picked ->
                board_list(
                  "Defensible, not required",
                  "board-neutral",
                  picked,
                  fn(piece) { board.why(answer, piece) },
                )
            },
          ]),
        ),
      ]
    }
  }
}

fn board_list(
  title: String,
  class: String,
  pieces: List(board.Piece),
  line: fn(board.Piece) -> String,
) -> List(Element(Msg)) {
  case pieces {
    [] -> []
    _ -> [
      html.div([attribute.class("board-verdict-group " <> class)], [
        html.h4([attribute.class("board-verdict-title")], [html.text(title)]),
        html.ul(
          [attribute.class("board-verdict-list")],
          list.map(pieces, fn(piece) {
            html.li([], [
              html.span([attribute.class("board-verdict-piece")], [
                html.text(piece.label),
              ]),
              html.span([attribute.class("board-verdict-why")], [
                html.text(line(piece)),
              ]),
            ])
          }),
        ),
      ]),
    ]
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

/// The step rail: the plan, on the left, for the whole drill.
///
/// Every step's *title* is listed from the moment the problem opens. That is
/// the whole point of it, and it is why moving the focus reveals nothing --
/// nobody chose to see a list that was already there. Only what sits *under* a
/// step is gated: its hint, its why, and its slice of the code. Nothing the
/// solution pane does can take this away, which is the difference from the
/// pane it replaced.
fn plan_rail(m: Model, current: Problem) -> Element(Msg) {
  let steps = model.walk_steps(current.approach)
  let total = list.length(steps)
  html.aside(
    [attribute.class("plan-rail")],
    list.flatten([
      [
        html.div([attribute.class("rail-header")], [
          html.h3([attribute.class("panel-title")], [html.text("Approach")]),
          ..case total {
            0 -> []
            _ -> [
              html.span([attribute.class("rail-count")], [
                html.text(
                  int.to_string(int.min(m.walk.focus + 1, total))
                  <> "/"
                  <> int.to_string(total),
                ),
              ]),
            ]
          }
        ]),
      ],
      rail_nudge(m, current),
      case steps {
        [] -> [
          html.p([attribute.class("rail-empty")], [
            html.text("No plan written for this one yet."),
          ]),
        ]
        _ -> [
          html.ol(
            [attribute.class("rail-steps")],
            list.index_map(steps, fn(step, index) {
              rail_step(m, current, step, index)
            }),
          ),
        ]
      },
      rail_whole_thing(m, current),
    ]),
  )
}

/// The nudge, folded away until asked for. Not a reveal: it is a question
/// about the problem, not a piece of the answer, so it carries no warning.
fn rail_nudge(m: Model, current: Problem) -> List(Element(Msg)) {
  case model.nudge_text(current.approach) {
    None -> []
    Some(text) -> [
      html.div([attribute.class("rail-nudge")], [
        html.button(
          [
            attribute.classes([
              #("link-button", True),
              #("rail-nudge-toggle", True),
              #("open", m.nudge_shown),
            ]),
            attribute.type_("button"),
            event.on_click(UserToggledNudge),
          ],
          [
            html.text(case m.nudge_shown {
              True -> "Nudge"
              False -> "Nudge \u{2026}"
            }),
            html.kbd([], [html.text("a")]),
          ],
        ),
        ..case m.nudge_shown {
          False -> []
          True -> [
            html.p([attribute.class("approach-nudge")], [html.text(text)]),
          ]
        }
      ]),
    ]
  }
}

/// One step: its number and its title always, whatever is turned over
/// underneath it, and -- only while it has the focus -- the buttons to turn
/// over the rest.
fn rail_step(
  m: Model,
  current: Problem,
  step: problem.WalkStep,
  index: Int,
) -> Element(Msg) {
  let open = model.layers_at(m.walk, index)
  let focused = index == m.walk.focus
  // This drill's language, or the shared slice where it has none of its own
  // written yet. A Go drill showing Python is showing the wrong thing.
  let slice = problem.slice_for(step.code, current.language)
  html.li(
    [
      attribute.classes([
        #("rail-step", True),
        #("current", focused),
        #("opened", open != model.no_layers),
      ]),
    ],
    list.flatten([
      [
        html.button(
          [
            attribute.class("link-button rail-step-title"),
            attribute.type_("button"),
            event.on_click(WalkFocused(index)),
          ],
          [
            html.span([attribute.class("rail-step-number")], [
              html.text(int.to_string(index + 1)),
            ]),
            html.span([attribute.class("rail-step-text")], [
              html.text(step.step),
            ]),
          ],
        ),
      ],
      layer(open.hint, "walk-hint", "Hint", step.hint),
      layer(open.why, "walk-why", "Why", step.why),
      case slice, open.code {
        "", _ | _, False -> []
        code, True -> [
          html.pre([attribute.class("approach-pseudocode walk-code")], [
            html.code([], [html.text(code)]),
          ]),
        ]
      },
      case focused {
        False -> []
        True -> {
          let buttons =
            list.flatten([
              case open.hint {
                True -> []
                False -> [
                  reveal_button("walk-reveal-hint", "Hint", "h", WalkHintShown),
                ]
              },
              case open.why {
                True -> []
                False -> [
                  reveal_button("walk-reveal-why", "Why", "y", WalkWhyShown),
                ]
              },
              case slice, open.code {
                "", _ | _, True -> []
                _, False -> [
                  reveal_button("walk-reveal-code", "Code", "c", WalkCodeShown),
                  html.span([attribute.class("hint-warning")], [
                    html.text("logged as a reveal"),
                  ]),
                ]
              },
            ])
          case buttons {
            [] -> []
            _ -> [html.div([attribute.class("rail-step-layers")], buttons)]
          }
        }
      },
    ]),
  )
}

/// The whole plan at once, at the foot of the rail. This one is the answer,
/// and it says so before it is pressed.
fn rail_whole_thing(m: Model, current: Problem) -> List(Element(Msg)) {
  case model.whole_thing(current.approach, current.language) {
    None -> []
    Some(code) ->
      case m.whole_thing_shown {
        True -> [
          html.pre([attribute.class("approach-pseudocode rail-whole")], [
            html.code([], [html.text(code)]),
          ]),
        ]
        False -> [
          html.div([attribute.class("rail-foot")], [
            html.button(
              [
                attribute.class("btn-secondary rail-whole-open"),
                attribute.type_("button"),
                event.on_click(UserRevealedWholeThing),
              ],
              [
                html.text("Show the whole thing"),
                html.kbd([], [html.text("w")]),
              ],
            ),
            html.span([attribute.class("hint-warning")], [
              html.text("logged as a reveal"),
            ]),
          ]),
        ]
      }
  }
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

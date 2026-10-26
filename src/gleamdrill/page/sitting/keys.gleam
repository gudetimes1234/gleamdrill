//// The sitting's keys: a code drill's (grades, runs, the rail, the panes),
//// a recall card's, a quiz's and a board's, the exit prompt's, and the
//// summary's and report's.

import fsrs
import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleam/result
import gleam/string
import gleamdrill/content/problem
import gleamdrill/domain/walk
import gleamdrill/model as shared_model
import gleamdrill/page/sitting/model.{
  type Model, AwaitingGrade, CodePanel, NoPane, NotePane, SolutionPanel,
}
import gleamdrill/page/sitting/msg.{
  type Msg, BoardJumped, BoardMoved, BoardShelfMoved, BoardToggledAtCursor,
  EditorFocusRequested, ExitConfirmed, NoteFocusRequested, PanesNumberPicked,
  QuizMoved, UserClickedExitDrill, UserClickedExitReport, UserClickedNext,
  UserClickedRun, UserClickedScratchRun, UserClickedUndo, UserGraded,
  UserPickedChoice, UserPickedPanel, UserRevealedRecall, UserRevealedWholeThing,
  UserSubmittedAnswer, UserSubmittedBoard, UserToggledDiff, UserToggledHelp,
  UserToggledNudge, UserToggledPane, UserToggledPrompt, UserToggledResults,
  UserToggledSolutionPanel, WalkAdvanced, WalkBacked, WalkCodeShown,
  WalkHintShown, WalkWhyShown,
}
import gleamdrill/shared.{type Shared}
import gleamdrill/ui/binding.{type Binding, Binding}

const help = Binding(["?"], "keys", "This cheatsheet", UserToggledHelp)

pub fn bindings(shared: Shared, page: Model) -> List(Binding(Msg)) {
  case page.exit_prompt, shared.route {
    // The exit prompt owns the keyboard: Enter leaves, Escape stays.
    Some(_), _ -> [
      Binding(["Enter"], "leave", "Leave the drill", ExitConfirmed(True)),
      Binding(["Escape"], "stay", "Stay in the drill", ExitConfirmed(False)),
    ]
    None, shared_model.SummaryRoute ->
      list.flatten([
        undo_binding(page),
        [
          Binding(
            ["Enter", "Escape", "b"],
            "done",
            "Leave the summary",
            UserClickedExitReport,
          ),
          help,
        ],
      ])
    None, shared_model.ReportRoute -> [
      Binding(
        ["Enter", "Escape", "b"],
        "back",
        "Leave the report",
        UserClickedExitReport,
      ),
      help,
    ]
    None, _ -> working(shared, page)
  }
}

/// j/k and h/l share one row each on a quiz or a board, so the second key
/// of a pair goes the other way.
pub fn dispatch(shared: Shared, page: Model, key: String) -> Result(Msg, Nil) {
  let drilling =
    page.exit_prompt == None && shared.route == shared_model.DrillRoute
  case page.numbered, key, drilling, current_kind(page) {
    // C-b q is up: the next key is a pane's number, or puts them away.
    True, _, _, _ -> Ok(PanesNumberPicked(option.from_result(int.parse(key))))
    False, _, _, _ -> drilling_key(shared, page, key, drilling)
  }
}

fn drilling_key(
  shared: Shared,
  page: Model,
  key: String,
  drilling: Bool,
) -> Result(Msg, Nil) {
  case key, drilling, current_kind(page) {
    "k", True, Ok(problem.QuizDrill) -> Ok(QuizMoved(-1))
    "j", True, Ok(problem.QuizDrill) -> Ok(QuizMoved(1))
    "k", True, Ok(problem.BoardDrill) -> Ok(BoardMoved(-1))
    "j", True, Ok(problem.BoardDrill) -> Ok(BoardMoved(1))
    "h", True, Ok(problem.BoardDrill) -> Ok(BoardShelfMoved(-1))
    "l", True, Ok(problem.BoardDrill) -> Ok(BoardShelfMoved(1))
    "G", True, Ok(problem.BoardDrill) -> Ok(BoardJumped(False))
    _, _, _ -> binding.find(bindings(shared, page), key)
  }
}

/// The status bar's label, tmux style.
pub fn label(shared: Shared, page: Model) -> String {
  case shared.route {
    shared_model.SummaryRoute -> "SUMMARY"
    shared_model.ReportRoute -> "REPORT"
    _ ->
      case current_kind(page), page.recall {
        Ok(problem.QuizDrill), _ -> "QUIZ"
        Ok(problem.BoardDrill), _ -> "BOARD"
        _, True -> "RECALL"
        // The language rides in the context, since Elixir and Python are
        // different sittings and the title alone does not say which.
        _, False ->
          case model.current_problem(page) {
            Ok(current) ->
              case page.blitz {
                Some(_) -> "BLITZ"
                None -> "DRILL"
              }
              <> " \u{b7} "
              <> string.uppercase(problem.language_label(current.language))
            Error(Nil) -> "DRILL"
          }
      }
  }
}

/// What the open drill is, or `Error` when nothing is open. Every branch
/// that asks "is there a quiz?" asks this, so a kind the table has no arm
/// for is a compile error rather than a drill with the editor's keys.
fn current_kind(page: Model) -> Result(problem.Kind, Nil) {
  model.current_problem(page) |> result.map(problem.kind)
}

/// The current problem's check, if this browser can run it: a check it
/// cannot run binds no keys.
fn runnable_check(shared: Shared, page: Model) -> Result(problem.Check, Nil) {
  use found <- result.try(model.current_problem(page))
  case shared_model.run_available(shared, found.language) {
    True -> option.to_result(found.check, Nil)
    False -> Error(Nil)
  }
}

fn working(shared: Shared, page: Model) -> List(Binding(Msg)) {
  case current_kind(page), page.recall {
    Ok(problem.QuizDrill), _ -> quiz_bindings(shared, page)
    Ok(problem.BoardDrill), _ -> board_bindings(shared, page)
    _, True -> recall_bindings(page)
    // The walkthrough no longer owns the keyboard, because it is no longer a
    // pane that opens: the rail is always up, and its keys live alongside the
    // editor's in `code_bindings`.
    _, False -> code_bindings(shared, page)
  }
}

/// The prompt sidebar's key: the same one shows it and hides it.
fn prompt_binding(shared: Shared) -> Binding(Msg) {
  Binding(
    ["p"],
    "prompt",
    case shared.prompt_open {
      True -> "Hide the problem"
      False -> "Show the problem"
    },
    UserToggledPrompt,
  )
}

/// A recall card has two moments: before the reveal, and grading after it.
fn recall_bindings(page: Model) -> List(Binding(Msg)) {
  let step = case page.revealed_solution {
    None -> [
      Binding(
        [" ", "s"],
        "reveal",
        "Show the approach and solutions",
        UserRevealedRecall,
      ),
    ]
    Some(_) ->
      case page.grading {
        AwaitingGrade -> [
          Binding(["1"], "again", "Grade: Again", UserGraded(fsrs.Again)),
          Binding(["2"], "hard", "Grade: Hard", UserGraded(fsrs.Hard)),
          Binding(["3"], "good", "Grade: Good", UserGraded(fsrs.Good)),
          Binding(["4"], "easy", "Grade: Easy", UserGraded(fsrs.Easy)),
        ]
        _ -> []
      }
  }
  list.flatten([
    step,
    undo_binding(page),
    [
      Binding(["m"], "note", "Write a note to future you", NoteFocusRequested),
      Binding(["n"], "skip", "Skip to the next card", UserClickedNext),
      Binding(["Escape"], "exit", "Exit the sitting", UserClickedExitDrill),
      help,
    ],
  ])
}

fn code_bindings(shared: Shared, page: Model) -> List(Binding(Msg)) {
  let grades = case page.grading {
    AwaitingGrade -> [
      Binding(["1"], "again", "Grade: Again", UserGraded(fsrs.Again)),
      Binding(["2"], "hard", "Grade: Hard", UserGraded(fsrs.Hard)),
      Binding(["3"], "good", "Grade: Good", UserGraded(fsrs.Good)),
      Binding(["4"], "easy", "Grade: Easy", UserGraded(fsrs.Easy)),
    ]
    _ -> []
  }
  let runnable = case runnable_check(shared, page) {
    Ok(_) -> [
      Binding(
        ["r"],
        "run",
        "Run your code alone and read its output",
        UserClickedScratchRun,
      ),
      Binding(["t"], "test", "Run the tests", UserClickedRun),
    ]
    Error(Nil) -> []
  }

  list.flatten([
    grades,
    undo_binding(page),
    runnable,
    [Binding(["i", "e"], "edit", "Focus the editor", EditorFocusRequested)],
    solution_binding(page),
    [
      Binding(["m"], "note", "Write a note to future you", case page.slot {
        NotePane -> UserToggledPane(NotePane)
        _ -> NoteFocusRequested
      }),
      prompt_binding(shared),
    ],
    // After the panes, not before: the status bar shows the first eight
    // bindings, and the rail advertises its own keys inline -- every step
    // carries "Hint h", "Why y", "Code c" on the button itself. Putting it
    // first pushed the solution, the note and the prompt off the bar, which
    // is exactly backwards: those have no label anywhere else.
    rail_bindings(page),
    results_binding(shared, page),
    diff_binding(shared),
    [
      Binding(
        ["n"],
        "skip",
        "Skip without grading; it stays due",
        UserClickedNext,
      ),
      // Escape brings the code back up first, then puts away whatever is in
      // the slot; only the code with an empty slot makes it the way out.
      case page.panel, page.slot {
        CodePanel, NoPane ->
          Binding(["Escape"], "exit", "Exit the sitting", UserClickedExitDrill)
        CodePanel, pane ->
          Binding(["Escape"], "close", "Close the pane", UserToggledPane(pane))
        _, _ ->
          Binding(
            ["Escape"],
            "code",
            "Back to your code",
            UserPickedPanel(CodePanel),
          )
      },
      help,
    ],
  ])
}

/// The step rail's keys.
///
/// Every step's title is listed from the moment the problem opens, so there is
/// nothing here that opens or closes a walkthrough: `j` and `k` move the focus,
/// and `h`/`y`/`c` turn over what is under whichever step has it. Only `c` and
/// `w` are reveals, and both say so.
fn rail_bindings(page: Model) -> List(Binding(Msg)) {
  case model.current_problem(page) {
    Error(Nil) -> []
    Ok(current) -> {
      let steps = walk.walk_steps(current.approach)
      let nudge = case walk.nudge_text(current.approach) {
        None -> []
        Some(_) -> [
          Binding(
            ["a"],
            "nudge",
            case page.nudge_shown {
              True -> "Fold the nudge away"
              False -> "Unfold the nudge"
            },
            UserToggledNudge,
          ),
        ]
      }
      let walk = case steps {
        [] -> []
        _ -> {
          let open = walk.layers_at(page.walk, page.walk.focus)
          let has_code = case focused_step(steps, page.walk.focus) {
            Ok(step) -> problem.slice_for(step.code, current.language) != ""
            Error(Nil) -> False
          }
          list.flatten([
            [
              Binding(["j"], "next step", "Focus the next step", WalkAdvanced),
              Binding(["k"], "prev step", "Focus the previous step", WalkBacked),
            ],
            case open.hint {
              True -> []
              False -> [
                Binding(["h"], "hint", "Show this step's hint", WalkHintShown),
              ]
            },
            case open.why {
              True -> []
              False -> [
                Binding(["y"], "why", "Explain this step", WalkWhyShown),
              ]
            },
            case has_code, open.code {
              True, False -> [
                Binding(
                  ["c"],
                  "code",
                  "Show this step's code (a reveal)",
                  WalkCodeShown,
                ),
              ]
              _, _ -> []
            },
          ])
        }
      }
      let whole = case
        walk.whole_thing(current.approach, current.language),
        page.whole_thing_shown
      {
        Some(_), False -> [
          Binding(
            ["w"],
            "whole thing",
            "Show the whole approach at once (a reveal)",
            UserRevealedWholeThing,
          ),
        ]
        _, _ -> []
      }
      list.flatten([nudge, walk, whole])
    }
  }
}

fn focused_step(
  steps: List(problem.WalkStep),
  index: Int,
) -> Result(problem.WalkStep, Nil) {
  list.drop(steps, index) |> list.first
}

/// Only for problems with a reference solution. Same key to close.
fn solution_binding(page: Model) -> List(Binding(Msg)) {
  case model.current_problem(page) {
    Ok(current) if current.solutions != [] -> [
      case page.panel {
        SolutionPanel ->
          Binding(["s"], "code", "Back to your code", UserToggledSolutionPanel)
        _ ->
          Binding(
            ["s"],
            "solution",
            "Show the reference solution",
            UserToggledSolutionPanel,
          )
      },
    ]
    _ -> []
  }
}

fn quiz_bindings(shared: Shared, page: Model) -> List(Binding(Msg)) {
  case page.graded {
    False -> [
      Binding(["j", "k"], "move", "Move between choices", QuizMoved(1)),
      Binding(["1"], "A", "Pick choice A", UserPickedChoice(0)),
      Binding(["2"], "B", "Pick choice B", UserPickedChoice(1)),
      Binding(["3"], "C", "Pick choice C", UserPickedChoice(2)),
      Binding(["4"], "D", "Pick choice D", UserPickedChoice(3)),
      Binding(["Enter"], "submit", "Submit the answer", UserSubmittedAnswer),
      Binding(["n"], "skip", "Skip to the next question", UserClickedNext),
      Binding(["Escape"], "exit", "Exit the exam", UserClickedExitDrill),
      help,
    ]
    True ->
      list.flatten([
        [Binding(["Enter", "n"], "next", "Next question", UserClickedNext)],
        results_binding(shared, page),
        [
          Binding(["Escape"], "exit", "Exit the exam", UserClickedExitDrill),
          help,
        ],
      ])
  }
}

/// Thirty-six pieces is far too many for number keys, and 1-4 are the grade
/// keys in every other context. The board borrows the queue screen's cursor
/// shape instead, so the muscle memory transfers.
fn board_bindings(shared: Shared, page: Model) -> List(Binding(Msg)) {
  case page.graded {
    False ->
      list.flatten([
        [
          Binding(["j", "k"], "move", "Move between pieces", BoardMoved(1)),
          Binding(
            ["h", "l"],
            "shelf",
            "Previous/next shelf",
            BoardShelfMoved(1),
          ),
          Binding(["g", "G"], "ends", "First/last piece", BoardJumped(True)),
          Binding(
            [" "],
            "place",
            "Put the piece on the board, or take it off",
            BoardToggledAtCursor,
          ),
        ],
        // Submitting nothing is not an answer, so the key is absent until
        // something is on the board rather than present and inert.
        case page.board_picks {
          [] -> []
          _ -> [
            Binding(["Enter"], "submit", "Submit the board", UserSubmittedBoard),
          ]
        },
        [
          Binding(["n"], "skip", "Skip to the next drill", UserClickedNext),
          Binding(["Escape"], "exit", "Exit the drill", UserClickedExitDrill),
          help,
        ],
      ])
    True ->
      list.flatten([
        [Binding(["Enter", "n"], "next", "Next drill", UserClickedNext)],
        results_binding(shared, page),
        [
          Binding(["Escape"], "exit", "Exit the drill", UserClickedExitDrill),
          help,
        ],
      ])
  }
}

/// Only after a passing run, when there is a diff to flip to.
fn diff_binding(shared: Shared) -> List(Binding(Msg)) {
  case shared_model.run_passed(shared.run) {
    True -> [
      Binding(
        ["d"],
        "diff",
        "Flip the solution between the diff and the code",
        UserToggledDiff,
      ),
    ]
    False -> []
  }
}

/// Only while the latest grade can still be taken back.
fn undo_binding(page: Model) -> List(Binding(Msg)) {
  case page.undo {
    Some(_) -> [
      Binding(["u"], "undo", "Take back the last grade", UserClickedUndo),
    ]
    None -> []
  }
}

/// Only once there is a verdict on screen to fold.
fn results_binding(shared: Shared, page: Model) -> List(Binding(Msg)) {
  case shared.run, page.graded {
    shared_model.Ran(_, _), _ | _, True -> [
      Binding(
        ["x"],
        "results",
        "Fold or unfold the run results",
        UserToggledResults,
      ),
    ]
    _, _ -> []
  }
}

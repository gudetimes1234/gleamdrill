//// The keybinding table, and the one place a keystroke becomes a message.
////
//// One table, three consumers: the dispatcher here, the status bar's hints,
//// and the `?` help overlay. Because all three read the same rows, a binding
//// can never drift from its own documentation.
////
//// The table is a function of the model, not a constant: which keys exist —
//// and what Enter means — depends on where you are and what state that
//// screen is in, exactly like a modal editor.

import fsrs
import gleam/list
import gleam/option.{None, Some}
import gleam/string
import gleamdrill/model.{
  type Key, type Model, type Msg, AuthRoute, AwaitingGrade, DrillRoute,
  EditorFocusRequested, ExitConfirmed, HelpToggled, MenuActivated,
  MenuCursorJumped, MenuCursorMoved, MenuPaneFocused, MenuRoute,
  MenuSuspendedAtCursor, MenuToggledAtCursor, NoteFocusRequested,
  PickerConfirmed, PickerConfirmedWithStarter, PickerRoute, QueueCursorJumped,
  QueueCursorMoved, QueueRoute, QueueToggledAtCursor, QuizMoved, Ran,
  ReportRoute, SearchFocusRequested, SettingsRoute, StatsActivated,
  StatsCursorMoved, StatsRoute, StudyRoute, SummaryRoute, TourActivated,
  TourContents, TourCursorMoved, TourLesson, TourRoute, TourRunTicked,
  UserAddedAllShown, UserClickedBackToStudy, UserClickedBrowse,
  UserClickedClearSelection, UserClickedExitDrill, UserClickedExitReport,
  UserClickedNext, UserClickedQueue, UserClickedRecall, UserClickedRun,
  UserClickedSelectAll, UserClickedStartDrill, UserClickedStartExam,
  UserClickedStats, UserClickedStudy, UserClickedTour, UserClickedTourContents,
  UserClickedTourNext, UserClickedTourPrev, UserClickedUndo, UserClosedDetail,
  UserFilteredQueue, UserGraded, UserPickedChoice, UserRemovedAllShown,
  UserRevealedHint, UserRevealedRecall, UserSearched, UserSubmittedAnswer,
  UserToggledDiff, UserToggledResults, UserToggledSide, UserToggledSolution,
}
import gleamdrill/problem
import gleamdrill/problems

/// One row of the keymap. `keys` are `KeyboardEvent.key` values; `hint` is the
/// short form the status bar shows; `help` the sentence the overlay shows.
pub type Binding {
  Binding(keys: List(String), hint: String, help: String, msg: Msg)
}

/// The bindings live in this context, in the order the status bar shows them.
pub fn bindings(m: Model) -> List(Binding) {
  case m.help_open, m.exit_prompt {
    // While the cheatsheet is up it owns the keyboard.
    True, _ -> [
      Binding(["Escape", "?"], "close", "Close this cheatsheet", HelpToggled),
    ]
    // So does the exit prompt: Enter leaves, Escape stays.
    False, Some(_) -> [
      Binding(["Enter"], "leave", "Leave the drill", ExitConfirmed(True)),
      Binding(["Escape"], "stay", "Stay in the drill", ExitConfirmed(False)),
    ]
    False, None ->
      case m.route {
        StudyRoute -> study_bindings()
        MenuRoute -> menu_bindings(m)
        DrillRoute -> drill_bindings(m)
        StatsRoute ->
          case m.detail {
            Some(_) -> [
              Binding(
                ["Escape"],
                "close",
                "Close the problem detail",
                UserClosedDetail,
              ),
              help_binding(),
            ]
            None -> [
              Binding(
                ["j", "k"],
                "move",
                "Move through the problem lists",
                StatsCursorMoved(1),
              ),
              Binding(
                ["Enter"],
                "detail",
                "Open the problem's review history",
                StatsActivated,
              ),
              Binding(
                ["Escape", "b"],
                "back",
                "Back to the study screen",
                UserClickedBackToStudy,
              ),
              help_binding(),
            ]
          }
        ReportRoute -> [
          Binding(
            ["Enter", "Escape", "b"],
            "back",
            "Leave the report",
            UserClickedExitReport,
          ),
          help_binding(),
        ]
        // The picker is a single deliberate choice, so it gets Enter to
        // confirm and nothing else. No Escape: there is nowhere to escape to
        // yet, and dismissing it would leave the queue unanswered.
        PickerRoute -> [
          Binding(
            ["Enter"],
            "start",
            "Start with a starter set",
            PickerConfirmedWithStarter,
          ),
          Binding(["c"], "choose", "Choose my own problems", PickerConfirmed),
          help_binding(),
        ]
        SettingsRoute -> [
          Binding(
            ["Escape", "b"],
            "back",
            "Back to study",
            UserClickedBackToStudy,
          ),
          help_binding(),
        ]
        SummaryRoute ->
          list.flatten([
            undo_binding(m),
            [
              Binding(
                ["Enter", "Escape", "b"],
                "done",
                "Leave the summary",
                UserClickedExitReport,
              ),
              help_binding(),
            ],
          ])
        QueueRoute -> queue_bindings(m)
        TourRoute -> tour_bindings(m)
        // A guest can always walk away from the form; the link at its foot
        // says so, and Escape should mean the same thing.
        AuthRoute ->
          case m.mode {
            model.Guest -> [
              Binding(
                ["Escape"],
                "back",
                "Keep studying without an account",
                UserClickedBackToStudy,
              ),
            ]
            _ -> []
          }
      }
  }
}

fn study_bindings() -> List(Binding) {
  [
    Binding(
      ["Enter", "s"],
      "study",
      "Start studying what is due",
      UserClickedStudy,
    ),
    Binding(["c"], "recall", "Recall what is due, no editor", UserClickedRecall),
    Binding(["q"], "queue", "Manage the study queue", UserClickedQueue),
    Binding(["b"], "browse", "Browse problems by hand", UserClickedBrowse),
    Binding(["t"], "stats", "Statistics", UserClickedStats),
    Binding(["x"], "exam", "System design exam", UserClickedStartExam),
    Binding(["g"], "tour", "Play the Gleam Language Tour", UserClickedTour),
    help_binding(),
  ]
}

/// The tour: one set of keys for the contents page, another for a lesson.
/// Inside the editor nothing is claimed; `Escape` then `Tab` leaves it.
fn tour_bindings(m: Model) -> List(Binding) {
  case m.tour_page {
    TourContents -> [
      Binding(
        ["j", "k"],
        "move",
        "Move through the lessons",
        TourCursorMoved(1),
      ),
      Binding(["Enter"], "open", "Open the lesson", TourActivated),
      Binding(
        ["Escape", "b"],
        "back",
        "Back to the study screen",
        UserClickedBackToStudy,
      ),
      help_binding(),
    ]
    TourLesson(_) -> [
      Binding(["n", "l"], "next", "Next lesson", UserClickedTourNext),
      Binding(["p", "h"], "prev", "Previous lesson", UserClickedTourPrev),
      Binding(["c"], "contents", "Table of contents", UserClickedTourContents),
      Binding(["i", "e"], "edit", "Focus the editor", EditorFocusRequested),
      Binding(["r"], "run", "Run the program now", TourRunTicked),
      Binding(
        ["Escape", "b"],
        "back",
        "Back to the study screen",
        UserClickedBackToStudy,
      ),
      help_binding(),
    ]
  }
}

/// The queue screen. `space`/`x` is the same "toggle the cursor row" verb the
/// browser uses, so the two lists feel like one keyboard.
fn queue_bindings(m: Model) -> List(Binding) {
  [
    Binding(
      ["j", "k"],
      "move",
      "Move the cursor down / up",
      QueueCursorMoved(1),
    ),
    Binding(
      [" ", "x"],
      "toggle",
      "Add the cursor row to the queue, or take it out",
      QueueToggledAtCursor,
    ),
    Binding(
      ["a"],
      "add all",
      "Add every problem currently listed",
      UserAddedAllShown,
    ),
    Binding(
      ["r"],
      "remove all",
      "Remove every problem currently listed",
      UserRemovedAllShown,
    ),
    Binding(["/"], "search", "Search problems", SearchFocusRequested),
    Binding(["g"], "top", "Jump to the first row", QueueCursorJumped(True)),
    Binding(["G"], "bottom", "Jump to the last row", QueueCursorJumped(False)),
    Binding(
      ["Escape"],
      "study",
      "Back to the study screen",
      UserClickedBackToStudy,
    ),
    help_binding(),
    ..case m.queue_status == model.AnyStatus {
      True -> []
      False -> [
        Binding(
          ["c"],
          "clear",
          "Clear the status filter",
          UserFilteredQueue(model.AnyStatus),
        ),
      ]
    }
  ]
}

fn menu_bindings(m: Model) -> List(Binding) {
  case string.trim(m.search) {
    "" -> [
      Binding(
        ["j", "k"],
        "move",
        "Move the cursor down / up",
        MenuCursorMoved(1),
      ),
      Binding(
        ["h", "l"],
        "pane",
        "Focus the pane left / right",
        MenuPaneFocused(1),
      ),
      Binding(
        [" ", "x"],
        "select",
        "Select or deselect the cursor row",
        MenuToggledAtCursor,
      ),
      Binding(["Enter"], "open", "Descend into the cursor row", MenuActivated),
      Binding(
        ["a"],
        "all",
        "Select every problem in the subcategory",
        UserClickedSelectAll,
      ),
      Binding(["c"], "clear", "Clear the selection", UserClickedClearSelection),
      Binding(
        ["z"],
        "pause",
        "Pause or resume the cursor row's card",
        MenuSuspendedAtCursor,
      ),
      Binding(
        ["d"],
        "drill",
        "Start drilling the selection",
        UserClickedStartDrill,
      ),
      Binding(["/"], "search", "Search problems", SearchFocusRequested),
      Binding(["g"], "top", "Jump to the first row", MenuCursorJumped(True)),
      Binding(["G"], "bottom", "Jump to the last row", MenuCursorJumped(False)),
      Binding(
        ["Escape"],
        "study",
        "Back to the study screen",
        UserClickedBackToStudy,
      ),
      help_binding(),
    ]
    _ -> [
      Binding(
        ["j", "k"],
        "move",
        "Move through the results",
        MenuCursorMoved(1),
      ),
      Binding(
        ["Enter", " "],
        "select",
        "Select or deselect the result",
        MenuActivated,
      ),
      Binding(
        ["d"],
        "drill",
        "Start drilling the selection",
        UserClickedStartDrill,
      ),
      Binding(["/"], "search", "Back to the search box", SearchFocusRequested),
      Binding(["Escape"], "clear", "Clear the search", UserSearched("")),
      help_binding(),
    ]
  }
}

fn drill_bindings(m: Model) -> List(Binding) {
  case current_quiz(m), m.recall {
    Ok(_), _ -> quiz_bindings(m)
    Error(Nil), True -> recall_bindings(m)
    Error(Nil), False -> code_bindings(m)
  }
}

/// A recall card has two moments: before the reveal, and grading after it.
fn recall_bindings(m: Model) -> List(Binding) {
  let step = case m.revealed_solution {
    None -> [
      Binding(
        [" ", "s"],
        "reveal",
        "Show the approach and solutions",
        UserRevealedRecall,
      ),
    ]
    Some(_) ->
      case m.grading {
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
    undo_binding(m),
    [
      Binding(["m"], "note", "Write a note to future you", NoteFocusRequested),
      Binding(["a"], "hint", "Reveal the next approach hint", UserRevealedHint),
      Binding(
        ["p"],
        "prompt",
        "Hide or show the problem prompt",
        UserToggledSide,
      ),
      Binding(["n"], "skip", "Skip to the next card", UserClickedNext),
      Binding(["Escape"], "exit", "Exit the sitting", UserClickedExitDrill),
      help_binding(),
    ],
  ])
}

fn code_bindings(m: Model) -> List(Binding) {
  let grades = case m.grading {
    AwaitingGrade -> [
      Binding(["1"], "again", "Grade: Again", UserGraded(fsrs.Again)),
      Binding(["2"], "hard", "Grade: Hard", UserGraded(fsrs.Hard)),
      Binding(["3"], "good", "Grade: Good", UserGraded(fsrs.Good)),
      Binding(["4"], "easy", "Grade: Easy", UserGraded(fsrs.Easy)),
    ]
    _ -> []
  }
  let runnable = case current_check(m) {
    Ok(_) -> [Binding(["r"], "run", "Run the tests", UserClickedRun)]
    Error(Nil) -> []
  }

  list.flatten([
    grades,
    undo_binding(m),
    runnable,
    [
      Binding(["i", "e"], "edit", "Focus the editor", EditorFocusRequested),
      Binding(["m"], "note", "Write a note to future you", NoteFocusRequested),
      Binding(["a"], "hint", "Reveal the next approach hint", UserRevealedHint),
      Binding(
        ["p"],
        "prompt",
        "Hide or show the problem prompt",
        UserToggledSide,
      ),
      Binding(
        ["s"],
        "solution",
        "Toggle the first solution",
        UserToggledSolution(0),
      ),
    ],
    results_binding(m),
    diff_binding(m),
    [
      Binding(["n"], "next", "Next problem", UserClickedNext),
      Binding(["Escape"], "exit", "Exit the sitting", UserClickedExitDrill),
      help_binding(),
    ],
  ])
}

fn quiz_bindings(m: Model) -> List(Binding) {
  case m.graded {
    False -> [
      Binding(["j", "k"], "move", "Move between choices", QuizMoved(1)),
      Binding(["1"], "A", "Pick choice A", UserPickedChoice(0)),
      Binding(["2"], "B", "Pick choice B", UserPickedChoice(1)),
      Binding(["3"], "C", "Pick choice C", UserPickedChoice(2)),
      Binding(["4"], "D", "Pick choice D", UserPickedChoice(3)),
      Binding(["Enter"], "submit", "Submit the answer", UserSubmittedAnswer),
      Binding(["Escape"], "exit", "Exit the exam", UserClickedExitDrill),
      help_binding(),
    ]
    True ->
      list.flatten([
        [Binding(["Enter", "n"], "next", "Next question", UserClickedNext)],
        results_binding(m),
        [
          Binding(["Escape"], "exit", "Exit the exam", UserClickedExitDrill),
          help_binding(),
        ],
      ])
  }
}

/// Only after a passing run, when there is a diff to flip to.
fn diff_binding(m: Model) -> List(Binding) {
  case model.run_passed(m.run) {
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
fn undo_binding(m: Model) -> List(Binding) {
  case m.undo {
    Some(_) -> [
      Binding(["u"], "undo", "Take back the last grade", UserClickedUndo),
    ]
    None -> []
  }
}

/// Only once there is a verdict on screen to fold.
fn results_binding(m: Model) -> List(Binding) {
  case m.run, m.graded {
    Ran(_, _), _ | _, True -> [
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

fn help_binding() -> Binding {
  Binding(["?"], "keys", "This cheatsheet", HelpToggled)
}

/// Resolves one keystroke against the current context, or nothing.
///
/// Direction-paired bindings share a table row for display but the actual
/// message depends on which of the pair was pressed, so those are special-
/// cased here rather than duplicated as near-identical rows.
pub fn dispatch(m: Model, key: Key) -> Result(Msg, Nil) {
  case key.key, m.route, m.help_open, string.trim(m.search) != "" {
    // Paired directions.
    "k", MenuRoute, False, _ -> Ok(MenuCursorMoved(-1))
    "j", MenuRoute, False, _ -> Ok(MenuCursorMoved(1))
    "h", MenuRoute, False, False -> Ok(MenuPaneFocused(-1))
    "l", MenuRoute, False, False -> Ok(MenuPaneFocused(1))
    "k", QueueRoute, False, _ -> Ok(QueueCursorMoved(-1))
    "j", QueueRoute, False, _ -> Ok(QueueCursorMoved(1))
    "k", TourRoute, False, _ ->
      case m.tour_page {
        TourContents -> Ok(TourCursorMoved(-1))
        TourLesson(_) -> lookup(m, key)
      }
    "j", TourRoute, False, _ ->
      case m.tour_page {
        TourContents -> Ok(TourCursorMoved(1))
        TourLesson(_) -> lookup(m, key)
      }
    "k", StatsRoute, False, _ ->
      case m.detail {
        None -> Ok(StatsCursorMoved(-1))
        Some(_) -> Error(Nil)
      }
    "j", StatsRoute, False, _ ->
      case m.detail {
        None -> Ok(StatsCursorMoved(1))
        Some(_) -> Error(Nil)
      }
    "k", DrillRoute, False, _ ->
      case current_quiz(m) {
        Ok(_) -> Ok(QuizMoved(-1))
        Error(Nil) -> lookup(m, key)
      }
    "j", DrillRoute, False, _ ->
      case current_quiz(m) {
        Ok(_) -> Ok(QuizMoved(1))
        Error(Nil) -> lookup(m, key)
      }
    _, _, _, _ -> lookup(m, key)
  }
}

fn lookup(m: Model, key: Key) -> Result(Msg, Nil) {
  bindings(m)
  |> list.find(fn(binding) { list.contains(binding.keys, key.key) })
  |> result_map_msg
}

fn result_map_msg(found: Result(Binding, Nil)) -> Result(Msg, Nil) {
  case found {
    Ok(binding) -> Ok(binding.msg)
    Error(Nil) -> Error(Nil)
  }
}

/// The context label the status bar leads with, tmux style.
pub fn context_label(m: Model) -> String {
  case m.route {
    StudyRoute -> "STUDY"
    MenuRoute -> "BROWSE"
    QueueRoute -> "QUEUE"
    DrillRoute ->
      case current_quiz(m), m.recall {
        Ok(_), _ -> "QUIZ"
        Error(Nil), True -> "RECALL"
        Error(Nil), False -> "DRILL"
      }
    StatsRoute -> "STATS"
    ReportRoute -> "REPORT"
    PickerRoute -> "SETUP"
    SettingsRoute -> "SETTINGS"
    SummaryRoute -> "SUMMARY"
    TourRoute -> "TOUR"
    AuthRoute -> "SIGN IN"
  }
}

fn current_quiz(m: Model) -> Result(problem.Quiz, Nil) {
  case model.current_ref(m) {
    Ok(ref) ->
      case problems.find(ref.category, ref.subcategory, ref.title) {
        Ok(found) -> option.to_result(found.quiz, Nil)
        Error(Nil) -> Error(Nil)
      }
    Error(Nil) -> Error(Nil)
  }
}

/// The current problem's check, if it has one this browser can run.
fn current_check(m: Model) -> Result(problem.Check, Nil) {
  case model.current_ref(m) {
    Ok(ref) ->
      case problems.find(ref.category, ref.subcategory, ref.title) {
        Ok(found) ->
          case model.run_available(m, found.language) {
            True -> option.to_result(found.check, Nil)
            False -> Error(Nil)
          }
        Error(Nil) -> Error(Nil)
      }
    Error(Nil) -> Error(Nil)
  }
}

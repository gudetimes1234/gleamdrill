//// A sitting: one pass (or several) over a list of problems, from the first
//// card to the summary or the exam report.
////
//// Everything the drill screen, the summary and the report show about the
//// sitting lives here -- which problem, what is typed, what was revealed,
//// where grading stands, the clock, the Blitz deadline, the answers so far.
//// The cards, drafts, notes and the run engine are shared: a run is one per
//// app, and a grade changes the card every other screen reads.

import fsrs
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/order
import gleam/result
import gleam/string
import gleamdrill/content/problem.{type ProblemRef}
import gleamdrill/content/problems
import gleamdrill/domain/walk
import gleamdrill/model as shared_model
import wire

/// Where the current drill sits in the grade-and-move-on cycle.
pub type Grading {
  /// The drill has not reached a gradeable state yet.
  NotGrading
  /// Waiting for the user to press one of the grade buttons.
  AwaitingGrade
  /// The review is in flight; the buttons are disabled so one answer cannot be
  /// recorded twice.
  SubmittingGrade
}

/// What the last run was for. A test run is the harness, and is what
/// gates grading; a scratch run is the code alone, for reading what it
/// prints, and counts for nothing.
pub type RunKind {
  TestRun
  ScratchRun
}

/// What the slot beside the editor can show.
///
/// The hint ladder and the walkthrough used to be in here too, and taking
/// them out is the point of the rail: the plan is no longer something the
/// solution can evict. The solution left too: it is never on screen beside
/// the code being typed, so it is a `Panel` of its own.
pub type Pane {
  NoPane
  NotePane
}

/// Which face of a code drill is up. The solution and the editor are never
/// on screen together: on a desktop they are two tabs over the same space,
/// on a phone two of three panels swiped between. The problem panel (the
/// prompt and the step rail) only exists on a phone; a desktop shows those
/// beside the code at all times.
pub type Panel {
  ProblemPanel
  CodePanel
  SolutionPanel
}

/// A region of the code drill screen, as tmux's panes: what C-b o, the
/// arrows, z and x act on. `panes.regions` lists the ones up, in order.
pub type Region {
  EditorRegion
  PromptRegion
  SolutionRegion
  NoteRegion
  OutputRegion
  RailRegion
}

/// One panel along from `panel` in swipe order (problem, code, solution),
/// `by` -1 for left or +1 for right, stopping at either end rather than
/// wrapping: a swipe past the last panel does nothing, the way a phone's own
/// pages behave.
pub fn step_panel(panel: Panel, by: Int) -> Panel {
  let index = case panel {
    ProblemPanel -> 0
    CodePanel -> 1
    SolutionPanel -> 2
  }
  case int.clamp(index + by, 0, 2) {
    0 -> ProblemPanel
    1 -> CodePanel
    _ -> SolutionPanel
  }
}

/// `clean` is a solve with nothing given away: no rung past the nudge, no
/// solution, no walk code, and the harness passed. `passed` is the harness
/// alone. Both are read off the model at grade time, since after that the
/// next card has reset them.
pub type SittingEntry {
  SittingEntry(
    problem: ProblemRef,
    pressed: fsrs.Rating,
    duration_ms: Int,
    passed: Bool,
    clean: Bool,
  )
}

/// A timed sitting. `deadline_ms` is the wall clock at which the current
/// card expires; `results` accumulate newest first, one per card, whether
/// it was solved or ran out of time.
pub type Blitz {
  Blitz(
    per_card_ms: Int,
    deadline_ms: Int,
    results: List(BlitzResult),
    /// True for the beat after a card expires, so the drill can flash
    /// "Time!" before the next card is on screen.
    expired_flash: Bool,
  )
}

pub type BlitzResult {
  BlitzResult(
    problem: ProblemRef,
    passed: Bool,
    duration_ms: Int,
    /// The clock ran out: no grade was asked, nothing was scheduled.
    expired: Bool,
  )
}

/// The five tiers a Blitz score lands in, by share of cards passed.
pub fn blitz_rank(passed: Int, total: Int) -> String {
  case total {
    0 -> "Warmup"
    _ -> {
      let share = passed * 100 / total
      case share {
        100 -> "Perfect"
        s if s >= 80 -> "Blazing"
        s if s >= 60 -> "Sharp"
        s if s >= 40 -> "Steady"
        _ -> "Warmup"
      }
    }
  }
}

/// Enough of the moment before the latest grade to go back to it: which
/// problem in which sitting, what was on screen, and what the card was.
/// Only the most recent grade can be undone, so there is at most one.
pub type UndoPoint {
  UndoPoint(
    problem: ProblemRef,
    problems: List(ProblemRef),
    problem_index: Int,
    current_iteration: Int,
    iteration_count: Int,
    studying: Bool,
    recall: Bool,
    draft: String,
    run: shared_model.RunState,
    revealed_solution: Option(Int),
    nudge_shown: Bool,
    whole_thing_shown: Bool,
    /// The rail as it stood. Restored with the rest, so undoing a grade puts
    /// back the steps that were open rather than folding them all away.
    walk: walk.WalkState,
    walk_code_seen: Bool,
    duration_ms: Int,
    /// None when the grade is what put the card in the queue.
    card_before: Option(wire.CardState),
  )
}

/// One bucket of the exam report: how many of this section's questions were
/// answered correctly.
pub type SectionScore {
  SectionScore(section: String, correct: Int, total: Int)
}

/// Group this sitting's answers by the subcategory each question belongs to,
/// weakest section first. Ties break on the section name so the order is stable
/// between renders.
pub fn section_scores(
  answers: List(#(ProblemRef, Bool)),
  sections: List(String),
) -> List(SectionScore) {
  sections
  |> list.map(fn(section) {
    let in_section =
      list.filter(answers, fn(pair) { { pair.0 }.subcategory == section })
    SectionScore(
      section: section,
      correct: list.count(in_section, fn(pair) { pair.1 }),
      total: list.length(in_section),
    )
  })
  |> list.filter(fn(score) { score.total > 0 })
  |> list.sort(fn(a, b) {
    case int.compare(percent(a.correct, a.total), percent(b.correct, b.total)) {
      order.Eq -> string.compare(a.section, b.section)
      other -> other
    }
  })
}

/// Rounded down, so 27/40 reads 67% and never flatters the result.
pub fn percent(correct: Int, total: Int) -> Int {
  case total {
    0 -> 0
    _ -> correct * 100 / total
  }
}

/// What is up once a test run is in: a pass turns to the reference, as a
/// diff against your code; a fail takes away a diff that was only there
/// because of the last pass, and leaves a solution chosen by hand alone.
pub fn panel_after_run(
  panel: Panel,
  revealed_solution: Option(Int),
  passed: Bool,
) -> Panel {
  case passed, panel, revealed_solution {
    True, _, _ -> SolutionPanel
    False, SolutionPanel, None -> CodePanel
    False, _, _ -> panel
  }
}

pub type Model {
  Model(
    /// The problems this sitting walks, in order. Its own list: the
    /// browser's selection is shared, and a scheduled sitting must not
    /// overwrite it.
    problems: List(ProblemRef),
    problem_index: Int,
    /// Passes over the list. A scheduled sitting, a Blitz and an exam are
    /// one pass.
    iteration_count: Int,
    current_iteration: Int,
    /// True when this sitting was started from the study queue, as opposed
    /// to hand-picked from the menu. Reviews are recorded either way; this
    /// only decides where exiting returns to.
    studying: Bool,
    /// A recall-only sitting: no editor. The prompt is read, the approach
    /// and solutions are revealed, and the grade is given from memory.
    recall: Bool,
    /// A Blitz: N random problems against a clock, scored pass or fail.
    blitz: Option(Blitz),
    /// The latest grade, while it can still be taken back.
    undo: Option(UndoPoint),
    /// The in-app "leave this drill?" question, with its message.
    exit_prompt: Option(String),
    /// Which kind of run the shared run engine is doing for this sitting.
    run_kind: RunKind,
    grading: Grading,
    /// Wall-clock milliseconds when the current problem was opened, for the
    /// review log's `duration_ms`.
    opened_at_ms: Int,
    /// Wall-clock milliseconds as of the last clock tick, for the clock on
    /// the drill header.
    now_ms: Int,
    /// When the clock was paused, or `None` while it runs. Pausing is
    /// arithmetic, not a stopped timer.
    clock_paused_at: Option(Int),
    /// Paused time already banked for this problem.
    clock_paused_ms: Int,
    draft: String,
    /// What the slot beside the editor shows, if anything.
    slot: Pane,
    /// Which face is up: the code, the solution, or (on a phone) the problem.
    panel: Panel,
    /// tmux's active pane, and the one before it (`C-b ;`).
    active: Region,
    last_active: Region,
    /// `C-b z`: the active pane fills the screen.
    zoomed: Bool,
    /// `C-b q`: the panes wear their numbers until the next key.
    numbered: Bool,
    /// The solution chosen by hand on this problem: the review log's reveal.
    revealed_solution: Option(Int),
    /// Whether the rail's nudge is unfolded. Never a reveal.
    nudge_shown: Bool,
    /// Whether the whole pseudocode has been shown at once. A reveal.
    whole_thing_shown: Bool,
    /// The step rail: which step has the keyboard, and which layers of each
    /// step have been turned over.
    walk: walk.WalkState,
    /// Whether any step's code slice has been shown. A reveal.
    walk_code_seen: Bool,
    /// Quiz option currently picked, before Submit is pressed.
    choice: Option(Int),
    /// Whether the current quiz question or board has been submitted.
    graded: Bool,
    /// Pieces currently on the board, by id, before Submit is pressed.
    board_picks: List(String),
    /// Where the keyboard cursor sits in the flattened palette.
    board_cursor: Int,
    /// This sitting's exam answers, in the order given.
    exam_answers: List(#(ProblemRef, Bool)),
    /// This sitting's answered problems, newest first, for the summary.
    sitting: List(SittingEntry),
  )
}

/// A sitting on `problems`, before its first problem is opened.
pub fn new(problems: List(ProblemRef)) -> Model {
  Model(
    problems:,
    problem_index: 0,
    iteration_count: 1,
    current_iteration: 1,
    studying: False,
    recall: False,
    blitz: None,
    undo: None,
    exit_prompt: None,
    run_kind: TestRun,
    grading: NotGrading,
    opened_at_ms: 0,
    now_ms: 0,
    clock_paused_at: None,
    clock_paused_ms: 0,
    draft: "",
    slot: NoPane,
    panel: CodePanel,
    active: EditorRegion,
    last_active: EditorRegion,
    zoomed: False,
    numbered: False,
    revealed_solution: None,
    nudge_shown: False,
    whole_thing_shown: False,
    walk: walk.fresh_walk(),
    walk_code_seen: False,
    choice: None,
    graded: False,
    board_picks: [],
    board_cursor: 0,
    exam_answers: [],
    sitting: [],
  )
}

/// The problem the drill is currently showing.
pub fn current_ref(page: Model) -> Result(ProblemRef, Nil) {
  page.problems |> list.drop(page.problem_index) |> list.first
}

/// The problem the drill is showing, out of the catalogue.
pub fn current_problem(page: Model) -> Result(problem.Problem, Nil) {
  current_ref(page)
  |> result.try(fn(ref) {
    problems.find(ref.category, ref.subcategory, ref.title)
  })
}

/// The open problem's check, whether or not this browser can run it.
pub fn current_check(page: Model) -> Result(problem.Check, Nil) {
  current_problem(page)
  |> result.try(fn(found) { option.to_result(found.check, Nil) })
}

/// A pass that counts: a test run whose every case passed. A scratch run
/// has no cases and never passes anything.
pub fn test_passed(shared: shared_model.Model, page: Model) -> Bool {
  page.run_kind == TestRun && shared_model.run_passed(shared.run)
}

/// The view state a problem opens with, whichever way it was reached: every
/// step's title listed on the rail, and nothing revealed. A leech opens with
/// its nudge unfolded as well, so there is something to read before the first
/// keystroke; neither costs a reveal.
pub fn open_problem_view(
  shared: shared_model.Model,
  page: Model,
  problem: ProblemRef,
) -> Model {
  Model(
    ..page,
    slot: NoPane,
    panel: CodePanel,
    active: EditorRegion,
    last_active: EditorRegion,
    zoomed: False,
    numbered: False,
    revealed_solution: None,
    nudge_shown: shared_model.opens_with_nudge(shared, problem),
    whole_thing_shown: False,
    walk: walk.fresh_walk(),
    walk_code_seen: False,
    // Reset here rather than at each call site, so a board cannot open
    // carrying the last one's picks.
    board_picks: [],
    board_cursor: 0,
  )
}

/// The pane's key pressed again closes it; any other pane replaces it.
pub fn toggle_pane(page: Model, pane: Pane) -> Model {
  Model(..page, slot: case page.slot == pane {
    True -> NoPane
    False -> pane
  })
}

/// Whether the whole pseudocode has been shown. Guarded on the ladder
/// actually having that rung, so a problem without one can never be recorded
/// as having given it away.
pub fn pseudocode_revealed(
  page: Model,
  stages: List(problem.ApproachStage),
) -> Bool {
  page.whole_thing_shown
  && list.any(stages, fn(stage) {
    case stage {
      problem.Pseudocode(_) -> True
      _ -> False
    }
  })
}

/// The one definition of "the answer was seen": a flipped solution, a code
/// slice, or the pseudocode. Feeds the review's `revealed` flag.
pub fn answer_revealed(
  page: Model,
  stages: List(problem.ApproachStage),
) -> Bool {
  page.revealed_solution != None
  || page.walk_code_seen
  || pseudocode_revealed(page, stages)
}

/// Milliseconds the current problem has been open, with paused time taken
/// out. `now_ms` is passed in so the view (with the tick's `now_ms`) and the
/// update (with the clock) share one definition.
pub fn elapsed_ms(page: Model, now_ms: Int) -> Int {
  let paused =
    page.clock_paused_ms
    + case page.clock_paused_at {
      Some(at) -> now_ms - at
      None -> 0
    }
  int.max(0, now_ms - page.opened_at_ms - paused)
}

/// Sections at or below this are called out as worth studying.
pub const weak_threshold = 70

import gleam/int
import gleam/list
import gleam/option.{type Option, None}
import gleam/order
import gleam/string

pub type Route {
  MenuRoute
  DrillRoute
  /// The scored breakdown shown after an exam finishes.
  ReportRoute
}

pub type ProblemRef {
  ProblemRef(category: String, subcategory: String, title: String)
}

/// The compile-and-run backend (worker + 4.7MB wasm), loaded lazily when a
/// Gleam drill is opened.
pub type RuntimeState {
  RuntimeNotLoaded
  RuntimeLoading
  RuntimeReady
  RuntimeFailed(String)
}

pub type CaseResult {
  CaseResult(label: String, expected: String, actual: String, passed: Bool)
}

pub type RunError {
  RunError(
    phase: String,
    file: Option(String),
    line: Option(Int),
    column: Option(Int),
    message: String,
  )
}

pub type RunOutcome {
  Cases(List(CaseResult))
  Errored(RunError)
  TimedOut
}

pub type RunState {
  RunIdle
  Running(id: Int)
  /// `stdout` is whatever the attempt printed, captured by the worker. It hangs
  /// off `Ran` rather than off `Cases` so a crash carries it too — code that
  /// printed and *then* blew up is exactly when it is worth reading.
  Ran(outcome: RunOutcome, stdout: String)
}

/// Best result so far for a problem; drives the status badges in the menu.
pub type Attempt {
  Passed
  Failed
}

pub type Model {
  Model(
    route: Route,
    selected_category: Option(String),
    selected_subcategory: Option(String),
    selected: List(ProblemRef),
    problem_index: Int,
    iteration_count: Int,
    current_iteration: Int,
    draft: String,
    revealed_solution: Option(Int),
    runtimes: List(#(String, RuntimeState)),
    run: RunState,
    drafts: List(#(ProblemRef, String)),
    attempts: List(#(ProblemRef, Attempt)),
    search: String,
    next_run_id: Int,
    editor_keymap: String,
    /// Quiz option currently picked, before Submit is pressed.
    choice: Option(Int),
    /// Whether the current quiz question has been submitted and graded.
    graded: Bool,
    /// This sitting's answers, in the order given. The report is computed from
    /// this rather than from `attempts`, because `attempts` is deliberately
    /// sticky (a pass is never downgraded) and a score must not be.
    exam_answers: List(#(ProblemRef, Bool)),
  )
}

pub fn default() -> Model {
  Model(
    route: MenuRoute,
    selected_category: None,
    selected_subcategory: None,
    selected: [],
    problem_index: 0,
    iteration_count: 3,
    current_iteration: 1,
    draft: "",
    revealed_solution: None,
    runtimes: [],
    run: RunIdle,
    drafts: [],
    attempts: [],
    search: "",
    next_run_id: 1,
    editor_keymap: "default",
    choice: None,
    graded: False,
    exam_answers: [],
  )
}

pub fn assoc_get(assoc: List(#(k, a)), key: k) -> Result(a, Nil) {
  list.find_map(assoc, fn(pair) {
    case pair.0 == key {
      True -> Ok(pair.1)
      False -> Error(Nil)
    }
  })
}

/// Runtime state for one language's grading worker ("gleam"/"python"/...).
pub fn runtime_for(model: Model, language: String) -> RuntimeState {
  case assoc_get(model.runtimes, language) {
    Ok(state) -> state
    Error(Nil) -> RuntimeNotLoaded
  }
}

pub fn assoc_put(assoc: List(#(k, a)), key: k, value: a) -> List(#(k, a)) {
  [#(key, value), ..list.filter(assoc, fn(pair) { pair.0 != key })]
}

/// The problem the drill is currently showing.
pub fn current_ref(model: Model) -> Result(ProblemRef, Nil) {
  model.selected
  |> list.drop(model.problem_index)
  |> list.first
}

pub type Msg {
  UserClickedCategory(String)
  UserClickedSubcategory(String)
  UserClickedBreadcrumb(Int)
  UserToggledProblem(ProblemRef)
  UserClickedSelectAll
  UserClickedClearSelection
  UserChangedIterations(String)
  UserClickedStartDrill
  UserClickedExitDrill
  ExitConfirmed(Bool)
  UserToggledSolution(Int)
  UserClickedNext
  UserSearched(String)
  UserChangedKeymap(String)
  EditorChanged(String)
  DraftSaveTicked
  UserClickedRun
  RunnerReady(language: String)
  RunnerFailed(language: String, message: String)
  RunFinished(id: Int, outcome: RunOutcome, stdout: String)
  RunTimedOut(id: Int)
  UserPickedChoice(Int)
  UserSubmittedAnswer
  UserClickedStartExam
  ExamSampled(List(ProblemRef))
  UserClickedExitReport
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

/// Sections at or below this are called out as worth studying.
pub const weak_threshold = 70

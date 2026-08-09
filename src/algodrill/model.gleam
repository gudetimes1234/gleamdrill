import gleam/list
import gleam/option.{type Option, None}

pub type Route {
  MenuRoute
  DrillRoute
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
  Ran(RunOutcome)
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
    runtime: RuntimeState,
    run: RunState,
    drafts: List(#(ProblemRef, String)),
    attempts: List(#(ProblemRef, Attempt)),
    search: String,
    next_run_id: Int,
    editor_keymap: String,
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
    runtime: RuntimeNotLoaded,
    run: RunIdle,
    drafts: [],
    attempts: [],
    search: "",
    next_run_id: 1,
    editor_keymap: "default",
  )
}

pub fn assoc_get(
  assoc: List(#(ProblemRef, a)),
  ref: ProblemRef,
) -> Result(a, Nil) {
  list.find_map(assoc, fn(pair) {
    case pair.0 == ref {
      True -> Ok(pair.1)
      False -> Error(Nil)
    }
  })
}

pub fn assoc_put(
  assoc: List(#(ProblemRef, a)),
  ref: ProblemRef,
  value: a,
) -> List(#(ProblemRef, a)) {
  [#(ref, value), ..list.filter(assoc, fn(pair) { pair.0 != ref })]
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
  RunnerReady
  RunnerFailed(String)
  RunFinished(id: Int, outcome: RunOutcome)
  RunTimedOut(id: Int)
}

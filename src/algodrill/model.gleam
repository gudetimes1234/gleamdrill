import algodrill/api.{type ApiError, type CardState, type Settings, type User}
import algodrill/problem.{type ProblemRef}
import fsrs
import gleam/dict.{type Dict}
import gleam/int
import gleam/list
import gleam/option.{type Option, None}
import gleam/order
import gleam/string
import gleam/time/timestamp.{type Timestamp}

pub type Route {
  /// Shown whenever there is no valid session. Everything else is behind it.
  AuthRoute
  /// The one-off first-run language choice. Shown instead of the study screen
  /// until it is answered, and never again afterwards.
  PickerRoute
  /// The scheduler's home: what is due, what is new, and a button to begin.
  StudyRoute
  /// The manual three-pane browser, kept for picking problems by hand.
  MenuRoute
  DrillRoute
  /// The scored breakdown shown after an exam finishes.
  ReportRoute
  StatsRoute
}

/// Whether this browser is signed in, and therefore where study data lives.
///
/// The two are separate stores with a one-way migration between them, not two
/// views of one store. That is deliberate: it is what means there is no sync
/// and no conflict resolution anywhere in this app.
pub type Mode {
  /// No account. Everything lives in this browser and nowhere else.
  Guest
  /// Signed in; the server is authoritative.
  Account(token: String)
}

pub fn is_guest(mode: Mode) -> Bool {
  mode == Guest
}

/// Progress of the one blocking network call the app makes at boot.
pub type Sync {
  /// No token, so nothing to load.
  NotStarted
  Syncing
  Synced
  SyncFailed(String)
}

/// One keystroke, as the document-level listener reports it.
///
/// `editing` is where the key landed: `"editor"` (inside the code editor,
/// whose own keymaps must never be fought), `"input"` (search or a form
/// field), `"control"` (a focused button or link — native activation wins),
/// or `"none"` (the app owns it).
pub type Key {
  Key(key: String, ctrl: Bool, shift: Bool, editing: String)
}

/// Which pane of the browser holds the keyboard cursor.
pub type MenuPane {
  LanguagesPane
  SubcategoriesPane
  ProblemsPane
  SelectedPane
}

/// The TUI cursor: a focused pane plus a remembered row per pane, and a row
/// for the search-results list, which replaces the panes while searching.
pub type MenuNav {
  MenuNav(
    focus: MenuPane,
    language: Int,
    subcategory: Int,
    problem: Int,
    selected: Int,
    search: Int,
    /// Cursor in the stats screen's problem list.
    stats: Int,
  )
}

/// Stable row ids, shared by the menu's renderer and the scroll effect so the
/// cursor always scrolls to the row it highlights.
pub fn menu_row_id(pane: MenuPane, index: Int) -> String {
  let prefix = case pane {
    LanguagesPane -> "lang"
    SubcategoriesPane -> "sub"
    ProblemsPane -> "prob"
    SelectedPane -> "sel"
  }
  prefix <> "-" <> int.to_string(index)
}

pub fn default_nav() -> MenuNav {
  MenuNav(
    focus: LanguagesPane,
    language: 0,
    subcategory: 0,
    problem: 0,
    selected: 0,
    search: 0,
    stats: 0,
  )
}

/// Where the guest is in the one-time upgrade nudge.
pub type UpgradePrompt {
  /// Not yet earned: too little progress for the warning to mean anything.
  PromptUnseen
  PromptShowing
  PromptDismissed
}

pub type AuthMode {
  SigningIn
  Registering
}

pub type AuthForm {
  AuthForm(
    mode: AuthMode,
    email: String,
    password: String,
    busy: Bool,
    error: Option(String),
  )
}

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
  /// `stdout` is the previous run's output, carried so the Output panel does
  /// not blank the moment a new run starts.
  Running(id: Int, stdout: String)
  /// `stdout` is whatever the attempt printed, captured by the worker. It hangs
  /// off `Ran` rather than off `Cases` so a crash carries it too — code that
  /// printed and *then* blew up is exactly when it is worth reading.
  Ran(outcome: RunOutcome, stdout: String)
}

pub type Model {
  Model(
    // --- session and server state ---
    mode: Mode,
    /// Known only once `/api/state` answers, which is why it is separate from
    /// the token in `Account` -- on a reload the token comes straight back
    /// from localStorage but the user does not.
    user: Option(User),
    boot: Sync,
    /// The server's clock as of the last response. Due dates are compared
    /// against this rather than the device clock, so a wrong system time
    /// cannot make cards look due when they are not.
    now: Timestamp,
    settings: Settings,
    /// Every card the account has, keyed by problem. A `Dict` rather than the
    /// association lists used elsewhere here: the menu looks up a badge for
    /// every visible problem on every render, and this can hold a thousand
    /// entries.
    cards: Dict(ProblemRef, CardState),
    today: api.Today,
    stats: Option(api.Stats),
    /// The raw insight payload; `insights.analyse` turns it into tiers and
    /// calibration at render time.
    insights: Option(api.Insights),
    /// The problem whose review timeline is open on the stats screen, and its
    /// rows once they arrive.
    detail: Option(#(ProblemRef, Option(List(api.ReviewRow)))),
    auth: AuthForm,
    /// A transient banner for whatever last went wrong with the server.
    notice: Option(String),
    /// The keyboard cursor in the problem browser.
    nav: MenuNav,
    /// Whether the `?` cheatsheet overlay is up.
    help_open: Bool,
    /// Set when a local write has failed, which as a guest means progress is
    /// silently not being saved. Unlike `notice` this is not dismissible --
    /// it is the one situation where an account genuinely matters.
    storage_full: Bool,
    /// Whether the stronger "your progress is at risk" prompt has already been
    /// shown. Escalating with stake is honest; nagging from review one is not.
    upgrade_prompt: UpgradePrompt,
    /// Set after signing in to an existing account while this browser still
    /// holds guest progress. Merging is offered rather than done, because
    /// folding scratch progress into an established account unasked would be
    /// surprising.
    merge_offer: Bool,
    // --- the current sitting ---
    route: Route,
    selected_category: Option(String),
    selected_subcategory: Option(String),
    selected: List(ProblemRef),
    problem_index: Int,
    iteration_count: Int,
    current_iteration: Int,
    /// True when this sitting was started from the study queue, as opposed to
    /// hand-picked from the menu. Reviews are recorded either way; this only
    /// decides where exiting returns to.
    studying: Bool,
    grading: Grading,
    /// Wall-clock milliseconds when the current problem was opened, for the
    /// review log's `duration_ms`.
    opened_at_ms: Int,
    draft: String,
    revealed_solution: Option(Int),
    /// How many rungs of the approach hint ladder are shown, top down.
    hints_revealed: Int,
    runtimes: List(#(String, RuntimeState)),
    run: RunState,
    drafts: List(#(ProblemRef, String)),
    search: String,
    next_run_id: Int,
    editor_keymap: String,
    /// Whether the drill's prompt column is collapsed to a slim rail.
    side_collapsed: Bool,
    /// One-shot leader: `,` was pressed, so the next key dispatches through
    /// the app's key table even if a button holds focus.
    leader_armed: Bool,
    /// Language tags excluded from today's study queue (device preference).
    muted_languages: List(String),
    /// Whether the first-run picker has been answered on this device.
    languages_chosen: Bool,
    /// Language tags ticked in the first-run picker, before it is confirmed.
    /// Separate from `muted_languages` because the picker collects what you
    /// want and the queue stores what you do not.
    picked_languages: List(String),
    /// Quiz option currently picked, before Submit is pressed.
    choice: Option(Int),
    /// Whether the current quiz question has been submitted and graded.
    graded: Bool,
    /// This sitting's answers, in the order given. The report is computed from
    /// this rather than from card history, because a score must reflect one
    /// sitting and card state deliberately does not.
    exam_answers: List(#(ProblemRef, Bool)),
  )
}

pub fn default() -> Model {
  Model(
    mode: Guest,
    user: None,
    boot: NotStarted,
    now: timestamp.from_unix_seconds(0),
    settings: api.default_settings(),
    cards: dict.new(),
    today: api.empty_today(),
    stats: None,
    insights: None,
    detail: None,
    auth: AuthForm(
      mode: SigningIn,
      email: "",
      password: "",
      busy: False,
      error: None,
    ),
    notice: None,
    nav: default_nav(),
    help_open: False,
    storage_full: False,
    upgrade_prompt: PromptUnseen,
    merge_offer: False,
    route: StudyRoute,
    selected_category: None,
    selected_subcategory: None,
    selected: [],
    problem_index: 0,
    iteration_count: 3,
    current_iteration: 1,
    studying: False,
    grading: NotGrading,
    opened_at_ms: 0,
    draft: "",
    revealed_solution: None,
    hints_revealed: 0,
    runtimes: [],
    run: RunIdle,
    drafts: [],
    search: "",
    next_run_id: 1,
    editor_keymap: "default",
    side_collapsed: False,
    leader_armed: False,
    muted_languages: [],
    languages_chosen: False,
    picked_languages: [],
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

pub fn card_for(model: Model, problem: ProblemRef) -> Option(CardState) {
  dict.get(model.cards, problem) |> option.from_result
}

/// Whether this problem has never actually been reviewed — no card, or a card
/// that was created but never answered.
///
/// This is the boundary the grading rules turn on: the first encounter is the
/// learning step, where revealing the solution is how you learn and nothing is
/// coerced. From the second review onward the honesty rules apply. One
/// definition, used by the view, the local store and (mirrored) the server.
pub fn first_encounter(model: Model, problem: ProblemRef) -> Bool {
  case card_for(model, problem) {
    None -> True
    option.Some(state) -> state.card.memory == None
  }
}

/// Whether the most recent run failed. Strictly "a run happened and said no":
/// no run at all is not a failure — for checkable drills the grade bar does
/// not appear until a run lands, and reveal-only drills have nothing to run.
///
/// Lives here because both the update loop (what to send the server) and the
/// drill view (which buttons to offer) need it, and two copies drifted once.
/// Whether the revealed hint rungs include the pseudocode stage — the point
/// past which the hints have given the answer away.
pub fn pseudocode_revealed(
  m: Model,
  stages: List(problem.ApproachStage),
) -> Bool {
  stages
  |> list.take(m.hints_revealed)
  |> list.any(fn(stage) {
    case stage {
      problem.Pseudocode(_) -> True
      _ -> False
    }
  })
}

/// The one definition of "the answer was seen": a flipped solution or the
/// pseudocode hint. Feeds the review's `revealed` flag (which both stores
/// coerce on) and the grade bar's forced-Again rule.
pub fn answer_revealed(m: Model, stages: List(problem.ApproachStage)) -> Bool {
  m.revealed_solution != option.None || pseudocode_revealed(m, stages)
}

pub fn run_failed(run: RunState) -> Bool {
  case run {
    Ran(Cases(cases), _) -> cases == [] || !list.all(cases, fn(c) { c.passed })
    Ran(Errored(_), _) | Ran(TimedOut, _) -> True
    RunIdle | Running(_, _) -> False
  }
}

/// Whether a card is due as of the server's clock. A card the account has
/// never seen is not "due" — it is new, and new cards are introduced against
/// the daily budget rather than because a date passed.
pub fn is_due(model: Model, problem: ProblemRef) -> Bool {
  case card_for(model, problem) {
    // A suspended card is parked: not due, not queued, not counted. The
    // schema always had the flag; every reader goes through here.
    option.Some(state) -> !state.suspended && fsrs.is_due(state.card, model.now)
    None -> False
  }
}

/// Whether the study filter mutes a language today (tag as produced by
/// problems.language_tag). Muting is a device preference, not schedule state:
/// the card keeps its due date and FSRS reschedules from real elapsed time
/// whenever it is finally reviewed.
pub fn language_muted(model: Model, tag: String) -> Bool {
  list.contains(model.muted_languages, tag)
}

// The queue these counts used to describe -- and their three separate copies
// of its filter -- now live in `algodrill/queue`, so what the dashboard shows
// and what "Study now" serves cannot drift apart.

pub type Msg {
  // --- keyboard ---
  KeyPressed(Key)
  HelpToggled
  /// Move the pane focus left (-1) or right (+1).
  MenuPaneFocused(Int)
  /// Move the cursor within the focused pane by a delta.
  MenuCursorMoved(Int)
  /// Jump the cursor to the first (True) or last row.
  MenuCursorJumped(Bool)
  /// Enter on the cursor row: descend into a pane, or toggle a problem.
  MenuActivated
  /// Space/x on the cursor row: toggle membership, or remove from Selected.
  MenuToggledAtCursor
  /// Move the quiz choice cursor by a delta.
  QuizMoved(Int)
  EditorFocusRequested
  SearchFocusRequested
  // --- session ---
  UserChangedAuthEmail(String)
  UserChangedAuthPassword(String)
  UserToggledAuthMode
  UserSubmittedAuth
  AuthCompleted(Result(api.Session, ApiError))
  StateLoaded(Result(api.BootState, ApiError))
  StateImported(Result(Nil, ApiError))
  UserClickedMergeGuest
  UserClickedSignOut
  SignOutCompleted(Result(Nil, ApiError))
  UserDismissedNotice
  UserDismissedUpgradePrompt
  UserClickedSignIn(AuthMode)
  // --- the scheduler ---
  UserClickedStudy
  UserClickedBrowse
  UserClickedBackToStudy
  UserGraded(fsrs.Rating)
  ReviewRecorded(Result(api.ReviewOutcome, ApiError))
  DraftSynced(Result(Nil, ApiError))
  UserClickedStats
  StatsLoaded(Result(api.Stats, ApiError))
  InsightsLoaded(Result(api.Insights, ApiError))
  StatsCursorMoved(Int)
  StatsActivated
  UserOpenedDetail(ProblemRef)
  UserClosedDetail
  HistoryLoaded(ProblemRef, Result(List(api.ReviewRow), ApiError))
  // --- browsing and drilling ---
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
  UserRevealedHint
  UserClickedNext
  UserSearched(String)
  UserChangedKeymap(String)
  EditorChanged(String)
  DraftSaveTicked
  UserClickedRun
  UserClickedStopRun
  UserClickedRetryRuntime(String)
  UserToggledSide
  UserToggledLanguage(String)
  /// Tick or untick one language in the first-run picker.
  PickerToggledLanguage(String)
  /// Accept the picker's selection and go study.
  PickerConfirmed
  UserToggledSuspend(ProblemRef)
  MenuSuspendedAtCursor
  CardSuspended(Result(api.ReviewOutcome, ApiError))
  RunnerReady(language: String)
  RunnerFailed(language: String, message: String)
  RunFinished(id: Int, outcome: RunOutcome, stdout: String)
  RunTimedOut(id: Int)
  RuntimeLoadTimedOut(language: String)
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

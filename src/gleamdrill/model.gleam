import fsrs
import gleam/dict.{type Dict}
import gleam/int
import gleam/list
import gleam/option.{type Option, None}
import gleam/order
import gleam/result
import gleam/string
import gleam/time/timestamp.{type Timestamp}
import gleamdrill/problem.{type ProblemRef}
import gleamdrill/walk

import wire.{type CardState, type Settings, type User}

pub type Route {
  /// Shown whenever there is no valid session. Everything else is behind it.
  AuthRoute
  /// Every track and where it stands. The app's landing page: Study, Queue
  /// and Stats are all *inside* a track, so this is where one is chosen. It
  /// doubles as the first-run screen -- a browser with no track yet lands
  /// here, which is the same question the picker used to ask and one fewer
  /// screen to answer it on.
  TracksRoute
  /// The scheduler knobs, plus the device preferences that sit beside them.
  SettingsRoute
  /// What a finished sitting did. Replaces the alert that used to be the whole
  /// completion experience.
  SummaryRoute
  /// The scheduler's home: what is due, what is new, and a button to begin.
  StudyRoute
  /// The manual three-pane browser, kept for picking problems by hand.
  MenuRoute
  /// The queue manager: every problem in the catalogue, which of them are in
  /// the study queue, and the controls to put them in or take them out.
  QueueRoute
  DrillRoute
  /// The scored breakdown shown after an exam finishes.
  ReportRoute
  StatsRoute
  /// The Gleam Language Tour, played in order from its own screen.
  TourRoute
  /// Two problems' reference solutions side by side, reached from Browse.
  CompareRoute
}

/// The queue screen's name box: a queue being made, or one being renamed.
pub type QueueNaming {
  NewQueue(text: String)
  RenameQueue(from: String, text: String)
}

/// The compare screen: an anchor on the left and, on the right, one of the
/// others at a time. Each side shows one of its problem's solutions.
pub type Compare {
  Compare(
    anchor: ProblemRef,
    others: List(ProblemRef),
    index: Int,
    variant_a: Int,
    variant_b: Int,
  )
}

pub type CompareSide {
  LeftSide
  RightSide
}

/// Which face of the tour screen is up: the table of contents, or one lesson.
pub type TourPage {
  TourContents
  TourLesson(Int)
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

/// Whether this browser can run a check in that language at all. Elixir and
/// Go run on the server, which only a signed-in user may ask; a guest gets
/// the reveal-only experience for them, exactly as every user did before.
pub fn run_available(model: Model, language: problem.Language) -> Bool {
  case language {
    problem.Elixir | problem.Go | problem.Haskell -> !is_guest(model.mode)
    _ -> True
  }
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
/// Which pane of the browser holds the keyboard cursor.
/// Three panes, not four: the first used to choose a language, and the track
/// switcher is where that happens now.
pub type MenuPane {
  SubcategoriesPane
  ProblemsPane
  SelectedPane
}

/// The TUI cursor: a focused pane plus a remembered row per pane, and a row
/// for the search-results list, which replaces the panes while searching.
pub type MenuNav {
  MenuNav(
    focus: MenuPane,
    subcategory: Int,
    problem: Int,
    selected: Int,
    search: Int,
    /// Cursor in the stats screen's problem list.
    stats: Int,
    /// Cursor in the queue screen's problem list.
    queue: Int,
  )
}

/// Stable row ids, shared by the menu's renderer and the scroll effect so the
/// cursor always scrolls to the row it highlights.
pub fn menu_row_id(pane: MenuPane, index: Int) -> String {
  let prefix = case pane {
    SubcategoriesPane -> "sub"
    ProblemsPane -> "prob"
    SelectedPane -> "sel"
  }
  prefix <> "-" <> int.to_string(index)
}

/// The queue screen's row ids, shared by its renderer and the scroll effect
/// for the same reason `menu_row_id` is.
pub fn queue_row_id(index: Int) -> String {
  "queue-" <> int.to_string(index)
}

/// The board chip ids, shared by its renderer and the scroll effect for the
/// same reason `queue_row_id` is.
pub fn board_chip_id(index: Int) -> String {
  "board-" <> int.to_string(index)
}

pub fn default_nav() -> MenuNav {
  MenuNav(
    focus: SubcategoriesPane,
    subcategory: 0,
    problem: 0,
    selected: 0,
    search: 0,
    stats: 0,
    queue: 0,
  )
}

/// One topic's bulk action on the queue screen: the rows of that
/// (category, subcategory) currently listed, added or removed, and for adding
/// optionally only the Easy ones. The rows are resolved in the update loop
/// from the same listing the screen renders.
pub type GroupChange {
  GroupChange(category: String, subcategory: String, easy_only: Bool, add: Bool)
}

/// The queue screen's status lens. A view filter, not stored state: it says
/// which rows to render, never what the scheduler will do.
pub type QueueFilter {
  AnyStatus
  /// In the queue, whatever its schedule says.
  Queued
  /// Queued and never answered -- the New pile.
  QueuedNew
  QueuedDue
  QueuedPaused
  /// Not in the queue at all: the catalogue's remainder.
  Unqueued
}

pub fn queue_filter_slug(filter: QueueFilter) -> String {
  case filter {
    AnyStatus -> "all"
    Queued -> "queued"
    QueuedNew -> "new"
    QueuedDue -> "due"
    QueuedPaused -> "paused"
    Unqueued -> "unqueued"
  }
}

pub fn queue_filter_label(filter: QueueFilter) -> String {
  case filter {
    AnyStatus -> "All"
    Queued -> "In queue"
    QueuedNew -> "New"
    QueuedDue -> "Due"
    QueuedPaused -> "Paused"
    Unqueued -> "Not queued"
  }
}

/// The order the filter chips are shown in, widest lens first.
pub fn queue_filters() -> List(QueueFilter) {
  [AnyStatus, Queued, QueuedNew, QueuedDue, QueuedPaused, Unqueued]
}

pub fn queue_filter_from_slug(slug: String) -> QueueFilter {
  case list.find(queue_filters(), fn(f) { queue_filter_slug(f) == slug }) {
    Ok(filter) -> filter
    Error(Nil) -> AnyStatus
  }
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

/// What the last run was for. A test run is the harness, and is what
/// gates grading; a scratch run is the code alone, for reading what it
/// prints, and counts for nothing.
pub type RunKind {
  TestRun
  ScratchRun
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
    /// A state load after the first: signing in, merging guest progress, a
    /// dead token dropping to guest. The screen stays up and a thin bar at
    /// the top says the server is being asked; only `boot` blanks the app,
    /// and only until the first load has ever succeeded.
    refreshing: Bool,
    /// The server's clock as of the last response. Due dates are compared
    /// against this rather than the device clock, so a wrong system time
    /// cannot make cards look due when they are not.
    now: Timestamp,
    /// The scheduler's knobs. Per track once the store is, which is why the
    /// account-wide ones live beside them rather than inside them.
    settings: Settings,
    /// The knobs about the person rather than about what they study: the
    /// timezone, the hour the study day rolls over, the reminder. One set,
    /// whatever track is open.
    account: wire.AccountSettings,
    /// The track being studied. Everything below that is keyed by problem --
    /// cards, drafts, notes, queues -- is this track's and no other's.
    active_track: String,
    /// Where every track stands, for the switcher. The whole account.
    tracks: List(wire.TrackStanding),
    /// Every card the account has, keyed by problem. A `Dict` rather than the
    /// association lists used elsewhere here: the menu looks up a badge for
    /// every visible problem on every render, and this can hold a thousand
    /// entries.
    cards: Dict(ProblemRef, CardState),
    today: wire.Today,
    stats: Option(wire.Stats),
    /// The raw insight payload; `insights.analyse` turns it into tiers and
    /// calibration at render time.
    insights: Option(wire.Insights),
    /// The problem whose review timeline is open on the stats screen, and its
    /// rows once they arrive.
    detail: Option(#(ProblemRef, Option(List(wire.ReviewRow)))),
    auth: AuthForm,
    /// A transient banner for whatever last went wrong with the server.
    notice: Option(String),
    /// The keyboard cursor in the problem browser.
    nav: MenuNav,
    /// Whether the `?` cheatsheet overlay is up.
    help_open: Bool,
    // --- the Gleam Language Tour ---
    tour_page: TourPage,
    /// The lesson's editor text. Edits are kept per lesson for the session
    /// (`tour_edits`) so Back and Next do not lose work; they are not
    /// persisted, the same as on tour.gleam.run.
    tour_draft: String,
    tour_edits: Dict(Int, String),
    /// The keyboard cursor on the contents page.
    tour_cursor: Int,
    /// The last lesson opened, persisted as a device preference.
    tour_lesson: Int,
    /// The in-app "leave this drill?" question, with its message, while it is
    /// up. An in-app dialog rather than `window.confirm`, which freezes the
    /// page and cannot be styled or reached by the leader key.
    exit_prompt: Option(String),
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
    selected_subcategory: Option(String),
    selected: List(ProblemRef),
    problem_index: Int,
    iteration_count: Int,
    current_iteration: Int,
    /// True when this sitting was started from the study queue, as opposed to
    /// hand-picked from the menu. Reviews are recorded either way; this only
    /// decides where exiting returns to.
    studying: Bool,
    /// The latest grade, while it can still be taken back.
    undo: Option(UndoPoint),
    /// An export file read from disk, waiting for the user to confirm that
    /// it replaces everything.
    import_pending: Option(wire.Archive),
    /// Bytes the offline runtime cache holds, measured when settings opens.
    cache_bytes: Int,
    /// A runtime download in progress: (done, total). None when idle.
    warming: Option(#(Int, Int)),
    /// Whether the solution pane shows your code diffed against the
    /// reference or the plain reference, flipped with `d`.
    diff_mode: Bool,
    /// A recall-only sitting: no editor. The prompt is read, the approach
    /// and solutions are revealed, and the grade is given from memory. Set
    /// alongside `studying`, cleared with it.
    recall: Bool,
    /// Which kind of run `run` describes. Set as a run starts.
    run_kind: RunKind,
    /// A Blitz: N random problems against a clock, scored pass or fail.
    /// Practice as far as the schedule is concerned; the game is the clock.
    blitz: Option(Blitz),
    /// The chooser is open on the study screen.
    blitz_chooser: Bool,
    grading: Grading,
    /// Wall-clock milliseconds when the current problem was opened, for the
    /// review log's `duration_ms`.
    opened_at_ms: Int,
    /// Wall-clock milliseconds as of the last clock tick, so the drill header
    /// can show how long this problem has been open. Only advances while a
    /// drill is on screen.
    now_ms: Int,
    draft: String,
    /// Whether the prompt sidebar is beside the editor, on this device.
    prompt_open: Bool,
    /// What the slot beside the editor shows, if anything. One thing at a
    /// time: opening a pane replaces whatever was there.
    slot: Pane,
    /// The solution chosen by hand on this problem, sticky until the next
    /// problem. It is the review log's reveal, not the pane's visibility:
    /// the diff a passing run opens by itself leaves it `None`.
    revealed_solution: Option(Int),
    /// Whether the rail's nudge is unfolded. Never a reveal: it is the
    /// vaguest rung, and the only thing on the rail that is prose about the
    /// problem rather than a piece of the plan.
    nudge_shown: Bool,
    /// Whether the whole pseudocode has been shown at once, from the foot of
    /// the rail. A reveal.
    whole_thing_shown: Bool,
    /// The step rail: which step has the keyboard, and which of each step's
    /// three layers have been turned over. Every step's *title* is on screen
    /// from the moment the problem opens, so this is only ever about the
    /// layers underneath them.
    walk: walk.WalkState,
    /// Whether any step's code slice has been shown on this problem. A
    /// slice is a piece of the pseudocode, so it counts as a reveal.
    walk_code_seen: Bool,
    runtimes: List(#(String, RuntimeState)),
    run: RunState,
    drafts: List(#(ProblemRef, String)),
    /// The user's note on each problem, shown beside the prompt on every
    /// visit after the first. Written from the drill screen, saved like a
    /// draft.
    notes: List(#(ProblemRef, String)),
    search: String,
    next_run_id: Int,
    editor_keymap: String,
    /// Whether the run results are folded to their one-line verdict. Lives for
    /// the session only: a new run keeps whatever you chose.
    results_collapsed: Bool,
    /// The editor height the user dragged to, in px, on this device. `None`
    /// is the stylesheet's default.
    editor_height: Option(Int),
    /// One-shot prefix: Ctrl+b (or the `,` leader) was pressed, so the next
    /// key resolves against the prefix table -- and, when the table does not
    /// hold it, through the app's key table even if a button holds focus.
    prefix_armed: Bool,
    /// The queue screen's lens: a search box and a status, neither persisted.
    /// They decide which rows are listed, and "add all shown" acts on exactly
    /// that list, which is what makes bulk queueing precise.
    ///
    /// There is no language lens any more: the screen is one track's, and the
    /// track switcher is that lens now.
    queue_search: String,
    queue_status: QueueFilter,
    /// Named lists to study from. A card is the memory of one problem,
    /// whichever queues list it; every listed problem has a card.
    queues: List(wire.Queue),
    /// Every track's remembered queue, as the device stored it. The active
    /// track's is lifted into `active_queue`; the rest are carried so that
    /// switching away and back does not forget where you were.
    remembered_queues: List(#(String, String)),
    /// The queue the study screen serves today, in the active track: None is
    /// everything with a card. A device preference.
    active_queue: Option(String),
    /// The queue the queue screen is editing: None is everything, where a
    /// row toggle adds or removes the card itself.
    queue_editing: Option(String),
    queue_naming: Option(QueueNaming),
    compare: Option(Compare),
    /// Problems whose queue change is in flight, so their row can be disabled
    /// rather than accepting a second click that would race the first.
    queue_pending: List(ProblemRef),
    /// Quiz option currently picked, before Submit is pressed.
    choice: Option(Int),
    /// Whether the current quiz question or board has been submitted and
    /// graded.
    graded: Bool,
    /// Pieces currently on the board, by id, before Submit is pressed. A list
    /// rather than a set: there are thirty-six of them, and a list is what the
    /// view maps over and what a test can write out literally.
    board_picks: List(String),
    /// Where the keyboard cursor sits in the flattened palette. The columns
    /// reflow with the viewport, so the cursor walks the list rather than
    /// pretending to be two-dimensional.
    board_cursor: Int,
    /// This sitting's answers, in the order given. The report is computed from
    /// this rather than from card history, because a score must reflect one
    /// sitting and card state deliberately does not.
    exam_answers: List(#(ProblemRef, Bool)),
    /// This sitting's answered problems, newest first. Kept for the summary,
    /// which is owed one the moment a sitting ends -- and unlike the card
    /// store, this deliberately resets between sittings.
    sitting: List(SittingEntry),
  )
}

pub fn default() -> Model {
  Model(
    mode: Guest,
    user: None,
    boot: NotStarted,
    refreshing: False,
    now: timestamp.from_unix_seconds(0),
    settings: wire.default_settings(),
    account: wire.default_account(),
    active_track: "",
    tracks: [],
    cards: dict.new(),
    today: wire.empty_today(),
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
    tour_page: TourContents,
    tour_draft: "",
    tour_edits: dict.new(),
    tour_cursor: 0,
    tour_lesson: 0,
    exit_prompt: None,
    storage_full: False,
    upgrade_prompt: PromptUnseen,
    merge_offer: False,
    route: StudyRoute,
    selected_subcategory: None,
    selected: [],
    problem_index: 0,
    iteration_count: 3,
    current_iteration: 1,
    studying: False,
    grading: NotGrading,
    opened_at_ms: 0,
    now_ms: 0,
    draft: "",
    prompt_open: True,
    slot: NoPane,
    revealed_solution: None,
    nudge_shown: False,
    whole_thing_shown: False,
    walk: walk.fresh_walk(),
    walk_code_seen: False,
    runtimes: [],
    run: RunIdle,
    drafts: [],
    notes: [],
    search: "",
    next_run_id: 1,
    editor_keymap: "default",
    results_collapsed: False,
    editor_height: None,
    undo: None,
    import_pending: None,
    cache_bytes: 0,
    warming: None,
    diff_mode: True,
    recall: False,
    run_kind: TestRun,
    blitz: None,
    blitz_chooser: False,
    prefix_armed: False,
    queue_search: "",
    queue_status: AnyStatus,
    queues: [],
    remembered_queues: [],
    active_queue: None,
    queue_editing: None,
    queue_naming: None,
    compare: None,
    queue_pending: [],
    choice: None,
    graded: False,
    board_picks: [],
    board_cursor: 0,
    exam_answers: [],
    sitting: [],
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
/// This is the boundary the run gate turns on: the first encounter is the
/// learning step, where revealing the solution is how you learn, so grading is
/// open from the moment the drill opens. From the second review onward a
/// checkable drill must be run once before the grade bar appears.
pub fn first_encounter(model: Model, problem: ProblemRef) -> Bool {
  case card_for(model, problem) {
    None -> True
    option.Some(state) -> state.card.memory == None
  }
}

/// Whether the most recent run passed every case. Only a harness verdict
/// counts: a reveal-only drill never "passes".
/// A pass that counts: a test run whose every case passed. A scratch run
/// has no cases and never passes anything.
pub fn test_passed(model: Model) -> Bool {
  model.run_kind == TestRun && run_passed(model.run)
}

pub fn run_passed(run: RunState) -> Bool {
  case run {
    Ran(Cases(cases), _) -> cases != [] && list.all(cases, fn(c) { c.passed })
    _ -> False
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
/// Forgotten this many times from Review, the card is a leech: reading the
/// approach again before typing beats another blind attempt.
pub const leech_lapses = 4

pub fn is_leech(m: Model, problem: ProblemRef) -> Bool {
  case card_for(m, problem) {
    option.Some(state) -> state.lapses >= leech_lapses
    None -> False
  }
}

/// Whether a problem opens with its nudge already unfolded: a leech does, so
/// there is something to read before the first keystroke. The steps
/// themselves need no such rule -- the rail always lists them -- and the
/// nudge is not a reveal, so this cannot cost anyone an honest grade.
pub fn opens_with_nudge(m: Model, problem: ProblemRef) -> Bool {
  is_leech(m, problem)
}

/// Whether the whole pseudocode has been shown. Guarded on the ladder
/// actually having that rung, so a problem without one can never be recorded
/// as having given it away.
pub fn pseudocode_revealed(
  m: Model,
  stages: List(problem.ApproachStage),
) -> Bool {
  m.whole_thing_shown
  && list.any(stages, fn(stage) {
    case stage {
      problem.Pseudocode(_) -> True
      _ -> False
    }
  })
}

/// What the slot beside the editor can show.
///
/// The hint ladder and the walkthrough used to be in here too, and taking
/// them out is the point of the rail: the plan is no longer something the
/// solution can evict.
pub type Pane {
  NoPane
  SolutionPane
  NotePane
}

/// The view state a problem opens with, whichever way it was reached: every
/// step's title listed on the rail, and nothing revealed. A leech opens with
/// its nudge unfolded as well, so there is something to read before the first
/// keystroke; neither costs a reveal.
pub fn open_problem_view(m: Model, problem: ProblemRef) -> Model {
  Model(
    ..m,
    slot: NoPane,
    revealed_solution: None,
    nudge_shown: opens_with_nudge(m, problem),
    whole_thing_shown: False,
    walk: walk.fresh_walk(),
    walk_code_seen: False,
    // Reset here rather than at each call site: this is the one function both
    // `open_first` and `advance_inner` go through with a ref, so a board
    // cannot open carrying the last one's picks.
    board_picks: [],
    board_cursor: 0,
  )
}

/// The pane's key pressed again closes it; any other pane replaces it.
pub fn toggle_pane(m: Model, pane: Pane) -> Model {
  Model(..m, slot: case m.slot == pane {
    True -> NoPane
    False -> pane
  })
}

/// What the slot shows once a test run is in: a pass opens the reference
/// beside your code, as a diff; a fail takes away a diff that was only there
/// because of the last pass, and leaves anything chosen by hand alone.
pub fn pane_after_run(
  slot: Pane,
  revealed_solution: Option(Int),
  passed: Bool,
) -> Pane {
  case passed, slot, revealed_solution {
    True, _, _ -> SolutionPane
    False, SolutionPane, None -> NoPane
    False, _, _ -> slot
  }
}

/// The one definition of "the answer was seen": a flipped solution or the
/// pseudocode hint. Feeds the review's `revealed` flag, which the log records
/// for insights; it never changes which grades are offered.
pub fn answer_revealed(m: Model, stages: List(problem.ApproachStage)) -> Bool {
  m.revealed_solution != option.None
  || m.walk_code_seen
  || pseudocode_revealed(m, stages)
}

pub fn run_failed(run: RunState) -> Bool {
  case run {
    Ran(Cases(cases), _) -> cases == [] || !list.all(cases, fn(c) { c.passed })
    Ran(Errored(_), _) | Ran(TimedOut, _) -> True
    RunIdle | Running(_, _) -> False
  }
}

/// Whether a card is due as of the server's clock. A card that has never been
/// answered is not "due" — it is new, and new cards are introduced against the
/// daily budget rather than because a date passed. A queued card is created
/// due immediately, so `reps` is what tells the two apart, not the date.
pub fn is_due(model: Model, problem: ProblemRef) -> Bool {
  case card_for(model, problem) {
    // A suspended card is parked: not due, not queued, not counted. The
    // schema always had the flag; every reader goes through here.
    option.Some(state) ->
      state.reps > 0 && !state.suspended && fsrs.is_due(state.card, model.now)
    None -> False
  }
}

/// Whether a problem is in the study queue at all -- in Everything.
/// Membership *is* the card: queueing a problem creates one, removing it
/// deletes it. Nothing else in the app decides what may be introduced; a
/// named queue only chooses among problems that have one.
pub fn is_queued(model: Model, problem: ProblemRef) -> Bool {
  card_for(model, problem) != None
}

pub fn queue_named(m: Model, name: String) -> Result(wire.Queue, Nil) {
  list.find(m.queues, fn(queue) { queue.name == name })
}

/// Cards gone are gone from every list: a queue never names a problem
/// without one.
pub fn drop_from_queues(
  queues: List(wire.Queue),
  removed: List(ProblemRef),
) -> List(wire.Queue) {
  case removed {
    [] -> queues
    _ ->
      list.map(queues, fn(queue) {
        wire.Queue(
          ..queue,
          problems: list.filter(queue.problems, fn(ref) {
            !list.contains(removed, ref)
          }),
        )
      })
  }
}

/// The queue after the active one, round the loop that starts and ends at
/// everything: what `n` on the study screen steps through.
pub fn next_queue(m: Model) -> Option(String) {
  let names = list.map(m.queues, fn(queue) { option.Some(queue.name) })
  let ring = [None, ..names]
  case ring {
    [] | [_] -> None
    _ ->
      ring
      |> list.drop_while(fn(name) { name != m.active_queue })
      |> list.drop(1)
      |> list.first
      |> result.unwrap(None)
  }
}

/// A queued problem that has never been answered — what the New pile is drawn
/// from. Not the same question as `card.memory == None`, which stays true
/// through the learning steps of a card already being studied.
pub fn is_new(model: Model, problem: ProblemRef) -> Bool {
  case card_for(model, problem) {
    option.Some(state) -> state.reps == 0 && !state.suspended
    None -> False
  }
}

/// Cards with at least one review behind them.
///
/// The count that means "progress". `dict.size(model.cards)` counts queue
/// membership now -- a problem put in line and never opened has a card too --
/// so anything asking "has this person actually studied" asks this instead.
pub fn answered_count(model: Model) -> Int {
  dict.fold(model.cards, 0, fn(count, _problem, state: CardState) {
    case state.reps > 0 {
      True -> count + 1
      False -> count
    }
  })
}

// The queue these counts used to describe -- and their three separate copies
// of its filter -- now live in `gleamdrill/queue`, so what the dashboard shows
// and what "Study now" serves cannot drift apart.

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
    selected: List(ProblemRef),
    problem_index: Int,
    current_iteration: Int,
    iteration_count: Int,
    studying: Bool,
    recall: Bool,
    draft: String,
    run: RunState,
    revealed_solution: Option(Int),
    nudge_shown: Bool,
    whole_thing_shown: Bool,
    /// The rail as it stood. Restored with the rest, so undoing a grade puts
    /// back the steps that were open rather than folding them all away.
    walk: walk.WalkState,
    walk_code_seen: Bool,
    duration_ms: Int,
    /// None when the grade is what put the card in the queue.
    card_before: Option(CardState),
  )
}

pub type SettingField {
  NewPerDay
  ReviewsPerDay
  DayStartHour
  DesiredRetention
  /// "off" or an hour 0-23, from the reminder select.
  ReminderHour
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

import fsrs
import gleam/dict.{type Dict}
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/time/timestamp.{type Timestamp}
import gleamdrill/content/problem.{type ProblemRef}
import gleamdrill/store/remote

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

/// Where the guest is in the one-time upgrade nudge.
pub type UpgradePrompt {
  /// Not yet earned: too little progress for the warning to mean anything.
  PromptUnseen
  PromptShowing
  PromptDismissed
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

/// Which one-shot prefix is armed, if any: tmux's Ctrl+b, or the `,`
/// leader that only rescues page keys from a focused button.
pub type Prefix {
  NoPrefix
  Leader
  Tmux
}

/// tmux's choose-tree, over windows (screens) or sessions (tracks).
pub type Chooser {
  Chooser(sessions: Bool, cursor: Int)
}

/// The command line: what is typed, and how far back into the history Up
/// has walked (-1 is the line being typed).
pub type CommandPrompt {
  CommandPrompt(text: String, back: Int)
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
    stats: remote.Data(wire.Stats),
    /// The raw insight payload; `insights.analyse` turns it into tiers and
    /// calibration at render time.
    insights: remote.Data(wire.Insights),
    /// A transient banner for whatever last went wrong with the server.
    notice: Option(String),
    /// Whether the `?` cheatsheet overlay is up.
    help_open: Bool,
    // --- the Gleam Language Tour ---
    tour_edits: Dict(Int, String),
    /// The last lesson opened, persisted as a device preference.
    tour_lesson: Int,
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
    // --- the manual selection and the run engine ---
    route: Route,
    selected: List(ProblemRef),
    iteration_count: Int,
    /// Whether the solution pane shows your code diffed against the
    /// reference or the plain reference, flipped with `d`.
    diff_mode: Bool,
    /// Whether the prompt sidebar is beside the editor, on this device.
    prompt_open: Bool,
    runtimes: List(#(String, RuntimeState)),
    run: RunState,
    drafts: List(#(ProblemRef, String)),
    /// The user's note on each problem, shown beside the prompt on every
    /// visit after the first. Written from the drill screen, saved like a
    /// draft.
    notes: List(#(ProblemRef, String)),
    next_run_id: Int,
    /// The language of the run in flight, so a timeout knows which worker
    /// to replace.
    run_language: String,
    editor_keymap: String,
    /// Whether the run results are folded to their one-line verdict. Lives for
    /// the session only: a new run keeps whatever you chose.
    results_collapsed: Bool,
    /// The editor height the user dragged to, in px, on this device. `None`
    /// is the stylesheet's default.
    editor_height: Option(Int),
    /// One-shot prefix: Ctrl+b or the `,` leader was pressed, so the next
    /// key resolves against the prefix table (Ctrl+b only) and, when the
    /// table does not hold it, through the app's key table even if a button
    /// holds focus.
    prefix: Prefix,
    /// The screen and the track before the current ones, for tmux's
    /// `last-window` and `switch-client -l`.
    last_route: Option(Route),
    last_track: Option(String),
    /// The `C-b w` / `C-b s` tree, while it is up. It owns the keyboard.
    chooser: Option(Chooser),
    /// The `C-b :` command line, while it is open.
    command_prompt: Option(CommandPrompt),
    /// Lines run at the prompt, newest first, for Up and Down.
    command_history: List(String),
    /// tmux's display-message: a line the status bar shows in place of its
    /// hints until the next key.
    status_message: Option(String),
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
    stats: remote.NotAsked,
    insights: remote.NotAsked,
    notice: None,
    help_open: False,
    tour_edits: dict.new(),
    tour_lesson: 0,
    storage_full: False,
    upgrade_prompt: PromptUnseen,
    merge_offer: False,
    route: StudyRoute,
    selected: [],
    iteration_count: 3,
    prompt_open: True,
    runtimes: [],
    run: RunIdle,
    drafts: [],
    notes: [],
    next_run_id: 1,
    run_language: "",
    editor_keymap: "default",
    results_collapsed: False,
    editor_height: None,
    diff_mode: True,
    prefix: NoPrefix,
    last_route: None,
    last_track: None,
    chooser: None,
    command_prompt: None,
    command_history: [],
    status_message: None,
    queues: [],
    remembered_queues: [],
    active_queue: None,
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

pub fn run_failed(run: RunState) -> Bool {
  case run {
    Ran(Cases(cases), _) -> cases == [] || !list.all(cases, fn(c) { c.passed })
    Ran(Errored(_), _) | Ran(TimedOut, _) -> True
    RunIdle | Running(_, _) -> False
  }
}

/// The per-track queue map as it should be persisted: every other track's
/// remembered queue untouched, the active track's entry replaced by what is
/// active now (or dropped when nothing is).
pub fn remembered_queues(model: Model) -> List(#(String, String)) {
  let others =
    list.filter(model.remembered_queues, fn(entry) {
      entry.0 != model.active_track
    })
  case model.active_queue {
    Some(name) -> [#(model.active_track, name), ..others]
    None -> others
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

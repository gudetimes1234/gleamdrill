import fsrs
import gleam/bool
import gleam/dict
import gleam/float
import gleam/int
import gleam/json
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/string
import gleam/time/calendar
import gleam/time/timestamp
import gleamdrill/api
import gleamdrill/browser
import gleamdrill/editor
import gleamdrill/insights
import gleamdrill/keys
import gleamdrill/legacy
import gleamdrill/local
import gleamdrill/model.{
  type Model, type Msg, Account, ArchiveReady, ArchiveRestored, AuthCompleted,
  AuthForm, AuthRoute, AwaitingGrade, BlitzExpired, CacheMeasured, CacheWarmed,
  CardSuspended, CaseResult, Cases, ClockTicked, Coding, DayStartHour,
  DesiredRetention, DraftSaveTicked, DraftSynced, DrillRoute, EditorChanged,
  EditorFocusRequested, EditorResized, Errored, ExamSampled, ExitConfirmed,
  Guest, HelpToggled, HintPane, HistoryLoaded, ImportConfirmed, ImportPicked,
  InsightsLoaded, KeyPressed, MenuActivated, MenuCursorJumped, MenuCursorMoved,
  MenuPaneFocused, MenuRoute, MenuSuspendedAtCursor, MenuToggledAtCursor, Model,
  NewPerDay, NoPane, NotGrading, NotStarted, NoteChanged, NoteFocusRequested,
  NotePane, NoteSaveTicked, NoteSynced, PickerConfirmed,
  PickerConfirmedWithStarter, PickerRoute, PickerToggledLanguage,
  PromptDismissed, QueueChanged, QueueCursorJumped, QueueCursorMoved, QueueRoute,
  QueueToggledAtCursor, QuizMoved, Ran, Reading, Registering, ReminderHour,
  RemoteRunFinished, ReportRoute, ReviewRecorded, ReviewsPerDay, RunError,
  RunFinished, RunIdle, RunTimedOut, RunnerFailed, RunnerReady, Running,
  RuntimeFailed, RuntimeLoadTimedOut, RuntimeLoading, RuntimeNotLoaded,
  RuntimeReady, SearchFocusRequested, SettingsRoute, SettingsSaved,
  SignOutCompleted, SigningIn, SolutionPane, StateImported, StateLoaded,
  StatsActivated, StatsCursorMoved, StatsLoaded, StatsRoute, StudyRoute,
  SubmittingGrade, SummaryRoute, SyncFailed, Synced, Syncing, TimedOut,
  TourActivated, TourContents, TourCursorMoved, TourEditorChanged, TourLesson,
  TourRoute, TourRunTicked, UndoRecorded, UserAddedAllShown, UserAddedStarterSet,
  UserChangedAuthEmail, UserChangedAuthPassword, UserChangedGroup,
  UserChangedIterations, UserChangedKeymap, UserChangedSetting,
  UserClickedBackToStudy, UserClickedBreadcrumb, UserClickedBrowse,
  UserClickedCategory, UserClickedClearSelection, UserClickedDeviceTimezone,
  UserClickedExitDrill, UserClickedExitReport, UserClickedExport,
  UserClickedImport, UserClickedMergeGuest, UserClickedNext, UserClickedQueue,
  UserClickedRecall, UserClickedRetryRuntime, UserClickedRetrySync,
  UserClickedRun, UserClickedScratchRun, UserClickedSelectAll,
  UserClickedSettings, UserClickedSignIn, UserClickedSignOut,
  UserClickedStartDrill, UserClickedStartExam, UserClickedStats,
  UserClickedStopRun, UserClickedStudy, UserClickedSubcategory, UserClickedTour,
  UserClickedTourContents, UserClickedTourNext, UserClickedTourPrev,
  UserClickedUndo, UserClickedWarmCache, UserClosedDetail, UserClosedWalk,
  UserDismissedDiff, UserDismissedMergeOffer, UserDismissedNotice,
  UserDismissedUpgradePrompt, UserFilteredQueue, UserGraded, UserOpenedDetail,
  UserOpenedLesson, UserOpenedWalk, UserPickedChoice, UserPickedQueueLanguage,
  UserRemovedAllShown, UserResetLesson, UserRevealedHint, UserRevealedRecall,
  UserSearched, UserSearchedQueue, UserStartedBlitz, UserStartedCoding,
  UserSubmittedAnswer, UserSubmittedAuth, UserToggledAuthMode, UserToggledBlitz,
  UserToggledDiff, UserToggledPane, UserToggledProblem, UserToggledQueued,
  UserToggledRead, UserToggledResults, UserToggledSolution, UserToggledSuspend,
  WalkAdvanced, WalkBacked, WalkCodeShown, WalkHintShown, WalkPane, WalkWhyShown,
}
import gleamdrill/problem.{type ProblemRef}
import gleamdrill/problems
import gleamdrill/queue
import gleamdrill/runner
import gleamdrill/session
import gleamdrill/store
import gleamdrill/tour
import gleamdrill/view/auth
import gleamdrill/view/drill
import gleamdrill/view/help
import gleamdrill/view/manage
import gleamdrill/view/menu
import gleamdrill/view/picker
import gleamdrill/view/report
import gleamdrill/view/settings
import gleamdrill/view/stats
import gleamdrill/view/statusbar
import gleamdrill/view/study
import gleamdrill/view/summary
import gleamdrill/view/tour as tour_view
import lustre
import lustre/attribute
import lustre/effect.{type Effect}
import lustre/element.{type Element}
import lustre/element/html
import wire.{ProblemRef}

pub fn main() {
  editor.register()
  browser.register_service_worker()
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
  Nil
}

fn init(_flags) -> #(Model, Effect(Msg)) {
  session.migrate_storage_keys()
  let preferences = session.load_preferences()
  let base = model.default()
  let m =
    Model(
      ..base,
      editor_keymap: preferences.editor_keymap,
      editor_height: preferences.editor_height,
      languages_chosen: preferences.languages_chosen,
      tour_lesson: preferences.tour_lesson,
    )

  case session.load_token() {
    // Signed in: study state lives on the server, so there is nothing to
    // restore from disk and we block on fetching it.
    Some(token) -> {
      let m = Model(..m, mode: Account(token), boot: Syncing)
      #(m, effect.batch([keyboard_effect(), store.load_state(m)]))
    }
    // No account. The app is fully usable anyway -- guest progress lives in
    // this browser. A pre-account `algoDrillState` blob is folded in here, so
    // a returning user keeps their work without being made to sign up first.
    None -> {
      let m = Model(..m, mode: Guest, boot: Syncing)
      #(
        m,
        effect.batch([keyboard_effect(), adopt_legacy(), store.load_state(m)]),
      )
    }
  }
}

/// Seeds the guest store from the pre-account localStorage format, once.
///
/// Solved problems become review cards with the memory state a `Good` first
/// answer earns -- the same seed the server uses for this migration, because
/// the old format recorded a sticky boolean and no dates at all.
fn adopt_legacy() -> Effect(Msg) {
  case legacy.pending() {
    None -> effect.none()
    Some(old) ->
      case legacy.is_empty(old) {
        True -> legacy.mark_imported()
        False -> {
          use _dispatch <- effect.from
          local.seed_from_legacy(old.solved, old.drafts)
          Nil
        }
      }
  }
}

/// Raises the stronger upgrade prompt once a guest has enough at stake for
/// the warning to mean something. Escalating with stake is honest; nagging
/// from review one is noise.
///
/// A prompt already dismissed stays dismissed -- `local.prompt_state` reads the
/// persisted flag, so it does not reappear on the next reload.
fn escalate(m: Model) -> model.UpgradePrompt {
  case m.mode, m.upgrade_prompt {
    Guest, PromptDismissed -> PromptDismissed
    Guest, _ -> local.prompt_state(local.current_day(m.settings))
    _, current -> current
  }
}

fn local_dismiss_prompt() -> Effect(Msg) {
  use _dispatch <- effect.from
  let _ = local.dismiss_prompt()
  Nil
}

/// The rows the keyboard cursor can sit on in a pane, as toggle targets.
type PaneRows {
  /// Language and subcategory rows *choose*; the payload is what clicking
  /// them would dispatch.
  ChoiceRows(List(Msg))
  /// Problem and Selected rows *toggle* a ProblemRef.
  ToggleRows(List(ProblemRef))
}

fn pane_rows(m: Model, pane: model.MenuPane) -> PaneRows {
  case pane {
    model.LanguagesPane ->
      ChoiceRows(
        problems.language_entries()
        |> list.map(fn(entry) { UserClickedCategory(entry.1) }),
      )
    model.SubcategoriesPane ->
      ChoiceRows(case m.selected_category {
        Some(category) ->
          problems.subcategory_names(category)
          |> list.map(UserClickedSubcategory)
        None -> []
      })
    model.ProblemsPane ->
      ToggleRows(case m.selected_category, m.selected_subcategory {
        Some(category), Some(subcategory) ->
          problems.problems_in(category, subcategory)
          |> list.map(fn(found) {
            ProblemRef(category, subcategory, found.title)
          })
        _, _ -> []
      })
    model.SelectedPane -> ToggleRows(m.selected)
  }
}

fn rows_length(rows: PaneRows) -> Int {
  case rows {
    ChoiceRows(msgs) -> list.length(msgs)
    ToggleRows(refs) -> list.length(refs)
  }
}

/// The cursor index for a pane, clamped into the pane's current list — lists
/// change under the cursor (switching language shrinks the problem list), and
/// clamping on read beats chasing every mutation site.
pub fn cursor_in(m: Model, pane: model.MenuPane) -> Int {
  let raw = case pane {
    model.LanguagesPane -> m.nav.language
    model.SubcategoriesPane -> m.nav.subcategory
    model.ProblemsPane -> m.nav.problem
    model.SelectedPane -> m.nav.selected
  }
  int.clamp(raw, 0, int.max(0, rows_length(pane_rows(m, pane)) - 1))
}

fn set_cursor(m: Model, pane: model.MenuPane, index: Int) -> Model {
  let nav = case pane {
    model.LanguagesPane -> model.MenuNav(..m.nav, language: index)
    model.SubcategoriesPane -> model.MenuNav(..m.nav, subcategory: index)
    model.ProblemsPane -> model.MenuNav(..m.nav, problem: index)
    model.SelectedPane -> model.MenuNav(..m.nav, selected: index)
  }
  Model(..m, nav: nav)
}

fn searching(m: Model) -> Bool {
  string.trim(m.search) != ""
}

fn move_cursor(m: Model, next: fn(Int, Int) -> Int) -> #(Model, Effect(Msg)) {
  case searching(m) {
    True -> {
      let hits = problems.search_refs(string.trim(m.search))
      let last = int.max(0, list.length(hits) - 1)
      let index = next(int.clamp(m.nav.search, 0, last), last)
      #(
        Model(..m, nav: model.MenuNav(..m.nav, search: index)),
        scroll_to("hit-" <> int.to_string(index)),
      )
    }
    False -> {
      let pane = m.nav.focus
      let last = int.max(0, rows_length(pane_rows(m, pane)) - 1)
      let index = next(cursor_in(m, pane), last)
      #(set_cursor(m, pane, index), scroll_to(row_id(pane, index)))
    }
  }
}

/// h/l between panes. Moving right through an unmade choice makes it: `l` on a
/// language selects that language and lands in its subcategories, which is how
/// a TUI drills down.
fn focus_pane(m: Model, direction: Int) -> #(Model, Effect(Msg)) {
  let order = [
    model.LanguagesPane,
    model.SubcategoriesPane,
    model.ProblemsPane,
    model.SelectedPane,
  ]
  let position =
    list.fold(list.index_map(order, fn(p, i) { #(p, i) }), 0, fn(acc, pair) {
      case pair.0 == m.nav.focus {
        True -> pair.1
        False -> acc
      }
    })
  let target = int.clamp(position + direction, 0, 3)

  case direction > 0, m.nav.focus {
    // Descending picks the cursor row if that level has no pick yet.
    True, model.LanguagesPane ->
      case m.selected_category {
        None -> {
          let #(chosen, fx) = activate_cursor(m)
          #(
            Model(
              ..chosen,
              nav: model.MenuNav(..chosen.nav, focus: model.SubcategoriesPane),
            ),
            fx,
          )
        }
        Some(_) -> #(
          Model(
            ..m,
            nav: model.MenuNav(..m.nav, focus: model.SubcategoriesPane),
          ),
          effect.none(),
        )
      }
    True, model.SubcategoriesPane ->
      case m.selected_subcategory {
        None -> {
          let #(chosen, fx) = activate_cursor(m)
          #(
            Model(
              ..chosen,
              nav: model.MenuNav(..chosen.nav, focus: model.ProblemsPane),
            ),
            fx,
          )
        }
        Some(_) -> #(
          Model(..m, nav: model.MenuNav(..m.nav, focus: model.ProblemsPane)),
          effect.none(),
        )
      }
    _, _ -> {
      let focus = case list.drop(order, target) {
        [pane, ..] -> pane
        [] -> model.LanguagesPane
      }
      #(Model(..m, nav: model.MenuNav(..m.nav, focus: focus)), effect.none())
    }
  }
}

/// Enter or Space on the cursor row.
/// The ProblemRef under the menu cursor, when the focused pane holds one.
fn cursor_ref(m: Model) -> Result(ProblemRef, Nil) {
  case searching(m) {
    True -> {
      let hits = problems.search_refs(string.trim(m.search))
      case list.drop(hits, int.clamp(m.nav.search, 0, list.length(hits) - 1)) {
        [ref, ..] -> Ok(ref)
        [] -> Error(Nil)
      }
    }
    False ->
      case pane_rows(m, m.nav.focus) {
        ToggleRows(refs) ->
          case list.drop(refs, cursor_in(m, m.nav.focus)) {
            [ref, ..] -> Ok(ref)
            [] -> Error(Nil)
          }
        ChoiceRows(_) -> Error(Nil)
      }
  }
}

/// The queue screen's cursor. Its own mover rather than a fifth pane in
/// `move_cursor`: that one walks the browser's panes and its search override,
/// and this list has neither.
fn move_queue_cursor(
  m: Model,
  next: fn(Int, Int) -> Int,
) -> #(Model, Effect(Msg)) {
  let last = int.max(0, list.length(queue.listed(m)) - 1)
  let index = next(int.clamp(m.nav.queue, 0, last), last)
  #(
    Model(..m, nav: model.MenuNav(..m.nav, queue: index)),
    scroll_to(model.queue_row_id(index)),
  )
}

fn queue_cursor_ref(m: Model) -> Result(ProblemRef, Nil) {
  let rows = queue.listed(m)
  case list.drop(rows, int.clamp(m.nav.queue, 0, list.length(rows) - 1)) {
    [ref, ..] -> Ok(ref)
    [] -> Error(Nil)
  }
}

/// Marks rows whose queue change is in flight, so a second click cannot race
/// the first. Cleared wholesale when the response lands: the requests are
/// bulk and sequential from one user, so there is never a second one to keep.
fn pending(m: Model, refs: List(ProblemRef)) -> Model {
  Model(..m, queue_pending: list.append(refs, m.queue_pending))
}

/// Leave the first-run picker. With `starter`, a starter set is queued on the
/// way out and the study screen is the destination; without it, the queue
/// screen, because "which languages" is only half the setup and a study
/// screen with an empty queue is a dead end to land a first-time user on.
/// Somebody who already has cards (an upgrade, a returning guest) goes to the
/// study screen either way.
fn confirm_picker(m: Model, starter starter: Bool) -> #(Model, Effect(Msg)) {
  case m.picked_languages {
    // The buttons are disabled in this state; the guard is here so the
    // keyboard cannot get past it either.
    [] -> #(m, effect.none())
    picked -> {
      let m =
        Model(
          ..m,
          languages_chosen: True,
          route: case starter || !dict.is_empty(m.cards) {
            True -> StudyRoute
            False -> QueueRoute
          },
          // The picker's language choice is the obvious first lens on a
          // catalogue of five copies of the same 150 problems.
          queue_language: case picked {
            [only] -> Some(only)
            _ -> None
          },
        )
      case starter, starter_refs(m, picked) {
        True, [_, ..] as refs -> #(
          pending(m, refs),
          effect.batch([save_preferences(m), store.add_to_queue(m, refs)]),
        )
        _, _ -> #(m, save_preferences(m))
      }
    }
  }
}

fn activate_cursor(m: Model) -> #(Model, Effect(Msg)) {
  case searching(m) {
    True -> {
      let hits = problems.search_refs(string.trim(m.search))
      case list.drop(hits, int.clamp(m.nav.search, 0, list.length(hits) - 1)) {
        [ref, ..] -> handle(m, UserToggledProblem(ref))
        [] -> #(m, effect.none())
      }
    }
    False -> {
      let pane = m.nav.focus
      let index = cursor_in(m, pane)
      case pane_rows(m, pane) {
        ChoiceRows(msgs) ->
          case list.drop(msgs, index) {
            [msg, ..] -> handle(m, msg)
            [] -> #(m, effect.none())
          }
        ToggleRows(refs) ->
          case list.drop(refs, index) {
            [ref, ..] -> handle(m, UserToggledProblem(ref))
            [] -> #(m, effect.none())
          }
      }
    }
  }
}

fn row_id(pane: model.MenuPane, index: Int) -> String {
  model.menu_row_id(pane, index)
}

fn scroll_to(id: String) -> Effect(Msg) {
  run_effect(fn() { browser.scroll_into_view(id) })
}

fn run_effect(action: fn() -> Nil) -> Effect(Msg) {
  use _dispatch <- effect.from
  action()
}

/// Focus something the same message puts on screen. `effect.from` runs
/// before the render, when the element is not there yet to focus.
fn focus_after_render(selector: String) -> Effect(Msg) {
  use _dispatch, _root <- effect.before_paint
  browser.focus_element(selector)
}

fn keyboard_effect() -> Effect(Msg) {
  use dispatch <- effect.from
  browser.on_keys(fn(key, ctrl, shift, editing) {
    dispatch(KeyPressed(model.Key(key:, ctrl:, shift:, editing:)))
  })
}

fn guest_has_progress() -> Bool {
  local.has_data()
}

fn api_base() -> String {
  browser.api_base()
}

/// The token for the current session, or "" when signed out. Callers that need
/// one are only reachable from behind the auth gate, so the empty case is a
/// belt-and-braces default rather than a real path.
fn token(m: Model) -> String {
  case m.mode {
    Account(token) -> token
    Guest -> ""
  }
}

/// Opening a checkable drill starts that language's (lazy) runtime download so
/// it is usually ready before the first Run click. Drills without checks never
/// load anything.
/// The language whose runtime the screen on the way in will need, if any: a
/// checkable drill's, or Gleam's for a tour lesson.
fn runtime_wanted(m: Model) -> Result(String, Nil) {
  case m.route, m.tour_page {
    DrillRoute, _ ->
      case current_check(m) {
        Ok(_) -> current_language(m)
        Error(Nil) -> Error(Nil)
      }
    TourRoute, TourLesson(_) -> Ok("gleam")
    _, _ -> Error(Nil)
  }
}

fn with_prefetch(pair: #(Model, Effect(Msg))) -> #(Model, Effect(Msg)) {
  let #(m, fx) = pair
  case runtime_wanted(m) {
    Ok(language) ->
      case model.runtime_for(m, language) {
        RuntimeNotLoaded -> #(
          Model(
            ..m,
            runtimes: model.assoc_put(m.runtimes, language, RuntimeLoading),
          ),
          effect.batch([fx, runner.ensure(language)]),
        )
        // A failed load gets one fresh chance per drill open; without this
        // the only recovery was a page reload.
        RuntimeFailed(_) -> #(
          Model(
            ..m,
            runtimes: model.assoc_put(m.runtimes, language, RuntimeLoading),
          ),
          effect.batch([fx, runner.restart(language)]),
        )
        _ -> pair
      }
    Error(Nil) -> pair
  }
}

/// Post one run to a local runtime that is known to be ready. The previous
/// run's output is carried into the Running state so the pane can keep
/// showing it, dimmed, until the new result lands.
fn start_local_run(
  m: Model,
  language: String,
  solution: String,
  harness: String,
) -> #(Model, Effect(Msg)) {
  let id = m.next_run_id
  let previous = case m.run {
    Ran(_, stdout) -> stdout
    _ -> ""
  }
  #(
    Model(..m, run: Running(id, previous), next_run_id: id + 1),
    runner.run(language, id, solution, harness),
  )
}

/// Run the tour lesson in the editor if the compiler is ready; otherwise do
/// nothing, and `RunnerReady` will call back here when it is.
fn run_tour_lesson(m: Model) -> #(Model, Effect(Msg)) {
  case m.route, m.tour_page, model.runtime_for(m, "gleam") {
    TourRoute, TourLesson(_), RuntimeReady ->
      start_local_run(m, "gleam", m.tour_draft, tour.harness)
    _, _, _ -> #(m, effect.none())
  }
}

/// Open one lesson: its draft is whatever was typed there this session, else
/// the lesson's own program; the run starts as soon as the compiler allows.
fn open_lesson(m: Model, index: Int) -> #(Model, Effect(Msg)) {
  let index = int.clamp(index, 0, tour.last())
  case tour.at(index) {
    Error(Nil) -> #(m, effect.none())
    Ok(lesson) -> {
      let draft =
        dict.get(m.tour_edits, index)
        |> result.unwrap(lesson.code)
      let m =
        Model(
          ..m,
          route: TourRoute,
          tour_page: TourLesson(index),
          tour_draft: draft,
          tour_cursor: index,
          tour_lesson: index,
          run: RunIdle,
        )
      let #(m, run) = run_tour_lesson(m)
      with_prefetch(#(m, effect.batch([save_preferences(m), run])))
    }
  }
}

fn current_problem(m: Model) -> Result(problem.Problem, Nil) {
  case model.current_ref(m) {
    Ok(ref) -> problems.find(ref.category, ref.subcategory, ref.title)
    Error(Nil) -> Error(Nil)
  }
}

fn current_language(m: Model) -> Result(String, Nil) {
  case model.current_ref(m) {
    Ok(ref) ->
      case problems.find(ref.category, ref.subcategory, ref.title) {
        Ok(p) -> Ok(problem.language_slug(p.language))
        Error(Nil) -> Error(Nil)
      }
    Error(Nil) -> Error(Nil)
  }
}

fn current_check(m: Model) -> Result(problem.Check, Nil) {
  case model.current_ref(m) {
    Ok(ref) ->
      case problems.find(ref.category, ref.subcategory, ref.title) {
        Ok(p) ->
          case p.check {
            Some(check) -> Ok(check)
            None -> Error(Nil)
          }
        Error(Nil) -> Error(Nil)
      }
    Error(Nil) -> Error(Nil)
  }
}

fn update(m: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  let #(next, effect) = handle(m, msg)
  // The drill clock starts on the way into a drill, wherever that came
  // from, and `ClockTicked` keeps it going only while the drill is up.
  case m.route != DrillRoute && next.route == DrillRoute {
    True -> #(
      Model(..next, now_ms: browser.now_ms()),
      effect.batch([effect, tick()]),
    )
    False -> #(next, effect)
  }
}

/// One clock tick, a second out. Keyed through the same debounce as the
/// draft save so a drill reopened within the second does not start a second
/// chain of ticks.
fn tick() -> Effect(Msg) {
  effect.from(fn(dispatch) {
    browser.debounce("drill-clock", 1000, fn() { dispatch(ClockTicked) })
  })
}

/// The first twenty Easy problems of each chosen language, in catalogue
/// order, skipping any already queued. Catalogue order is the topic
/// curriculum, not a difficulty ramp -- its first twenty include Trapping Rain
/// Water -- so the starter set filters by rating first and only falls back to
/// plain catalogue order for a category with no ratings (System Design).
fn starter_refs(m: Model, tags: List(String)) -> List(ProblemRef) {
  use tag <- list.flat_map(tags)
  let unqueued =
    problems.all_refs()
    |> list.filter(fn(ref) {
      problems.language_tag(ref.category) == tag && !model.is_queued(m, ref)
    })
  let easy =
    list.filter(unqueued, fn(ref) {
      problems.difficulty_of(ref) == Some(problem.Easy)
    })
  case easy {
    [] -> list.take(unqueued, starter_size)
    _ -> list.take(easy, starter_size)
  }
}

const starter_size = 20

fn handle(m: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  case msg {
    // --- keyboard ---
    KeyPressed(key) -> {
      // The `,` leader: one-shot rescue for keys a focused button would
      // otherwise swallow. Arms from anywhere but the editor and inputs;
      // the next key routes through the app's table regardless of focus.
      let leader_capable = key.editing != "editor" && key.editing != "input"
      case m.leader_armed, key.key == "," && leader_capable {
        False, True -> #(Model(..m, leader_armed: True), effect.none())
        True, _ -> {
          let m = Model(..m, leader_armed: False)
          case leader_capable && key.key != "," && key.key != "Escape" {
            True ->
              case keys.dispatch(m, model.Key(..key, editing: "none")) {
                Ok(resolved) -> handle(m, resolved)
                Error(Nil) -> #(m, effect.none())
              }
            False -> #(m, effect.none())
          }
        }
        False, False -> handle_key(m, key)
      }
    }

    HelpToggled -> #(Model(..m, help_open: !m.help_open), effect.none())

    EditorFocusRequested -> #(
      m,
      run_effect(fn() { browser.focus_element("gleam-editor") }),
    )

    SearchFocusRequested -> #(
      m,
      run_effect(fn() { browser.focus_element(".search") }),
    )

    MenuCursorMoved(delta) ->
      move_cursor(m, fn(index, last) { int.clamp(index + delta, 0, last) })

    MenuCursorJumped(first) ->
      move_cursor(m, fn(_index, last) {
        case first {
          True -> 0
          False -> last
        }
      })

    MenuPaneFocused(direction) -> focus_pane(m, direction)

    MenuActivated -> activate_cursor(m)

    MenuToggledAtCursor -> activate_cursor(m)

    // `z` in the browser: park the cursor row's card. Only rows with a card
    // react — an unseen problem has nothing to suspend.
    MenuSuspendedAtCursor ->
      case cursor_ref(m) {
        Ok(ref) -> handle(m, UserToggledSuspend(ref))
        Error(Nil) -> #(m, effect.none())
      }

    QuizMoved(delta) ->
      case m.graded, current_quiz(m) {
        False, Ok(quiz) -> {
          let last = list.length(quiz.choices) - 1
          let next = case m.choice {
            Some(current) -> int.clamp(current + delta, 0, last)
            // First press lands on an edge, so j starts at the top and k at
            // the bottom.
            None ->
              case delta > 0 {
                True -> 0
                False -> last
              }
          }
          #(Model(..m, choice: Some(next)), effect.none())
        }
        _, _ -> #(m, effect.none())
      }

    // --- session ---
    UserChangedAuthEmail(value) -> #(
      Model(..m, auth: AuthForm(..m.auth, email: value, error: None)),
      effect.none(),
    )

    UserChangedAuthPassword(value) -> #(
      Model(..m, auth: AuthForm(..m.auth, password: value, error: None)),
      effect.none(),
    )

    UserToggledAuthMode -> #(
      Model(
        ..m,
        auth: AuthForm(
          ..m.auth,
          mode: case m.auth.mode {
            SigningIn -> Registering
            Registering -> SigningIn
          },
          error: None,
        ),
      ),
      effect.none(),
    )

    UserSubmittedAuth ->
      case m.auth.busy, m.auth.email, m.auth.password {
        // Ignore a second submit while one is already in flight, so a double
        // click cannot create two accounts.
        True, _, _ -> #(m, effect.none())
        False, "", _ | False, _, "" -> #(
          Model(
            ..m,
            auth: AuthForm(
              ..m.auth,
              error: Some("Enter an email and a password."),
            ),
          ),
          effect.none(),
        )
        False, email, password -> #(
          Model(..m, auth: AuthForm(..m.auth, busy: True, error: None)),
          case m.auth.mode {
            SigningIn -> api.login(api_base(), email, password, AuthCompleted)
            Registering ->
              api.signup(
                api_base(),
                email,
                password,
                browser.time_zone(),
                AuthCompleted,
              )
          },
        )
      }

    AuthCompleted(Ok(session)) -> {
      // Straight back to the study screen, which stays on screen while the
      // account's state loads behind the sync bar: signing in is not a
      // reboot, and the loading card is for the one load before anything
      // exists to show.
      let signed_in =
        Model(
          ..m,
          mode: Account(session.token),
          user: Some(session.user),
          refreshing: True,
          route: StudyRoute,
          // The password leaves the model the moment it is no longer needed.
          auth: AuthForm(..m.auth, password: "", busy: False, error: None),
        )

      // Whatever this browser was holding as a guest goes up first, and the
      // state is loaded once it has landed (StateImported), so the state that
      // comes back already includes it -- in sequence, not in a race. On a
      // brand new account there is nothing to lose by merging; signing in to
      // an existing one is handled by `UserClickedMergeGuest`, because
      // folding scratch progress into an established account unasked would
      // be surprising.
      let upgrading = m.auth.mode == Registering && guest_has_progress()

      #(
        Model(..signed_in, merge_offer: !upgrading && guest_has_progress()),
        effect.batch([
          session.save_token(session.token),
          case upgrading {
            True -> store.upgrade(session.token, [], StateImported)
            False -> store.load_state(signed_in)
          },
        ]),
      )
    }

    AuthCompleted(Error(failure)) -> #(
      Model(
        ..m,
        auth: AuthForm(
          ..m.auth,
          busy: False,
          error: Some(api.error_message(failure)),
        ),
      ),
      effect.none(),
    )

    StateLoaded(Ok(state)) -> {
      let loaded = apply_state(m, state)
      // An account with cards has answered the language question, on some
      // device; this one remembers that now rather than asking again.
      let loaded = case
        loaded.languages_chosen,
        dict.is_empty(loaded.cards),
        loaded.mode
      {
        False, False, Account(_) -> Model(..loaded, languages_chosen: True)
        _, _, _ -> loaded
      }
      let remembered = case loaded.languages_chosen && !m.languages_chosen {
        True -> save_preferences(loaded)
        False -> effect.none()
      }
      // Guest progress left in this browser is offered on every account
      // load, not only the sign-in that stranded it.
      let loaded = case loaded.mode {
        Account(_) -> Model(..loaded, merge_offer: guest_has_progress())
        Guest -> loaded
      }
      // The dashboard reports a streak and an estimate of how long today's
      // queue will take, both of which need the stats and insights payloads.
      // Fetched after the screen is already up rather than before it, so a
      // slow round trip delays a tile and not the first paint.
      let dashboard =
        effect.batch([store.load_stats(loaded), store.load_insights(loaded)])
      case m.mode, legacy.pending() {
        // A guest adopts the pre-account blob locally at boot instead; there
        // is nothing to send anywhere.
        Guest, _ | _, None -> #(loaded, effect.batch([dashboard, remembered]))
        Account(token), Some(old) ->
          case legacy.is_empty(old) {
            True -> #(
              loaded,
              effect.batch([dashboard, remembered, legacy.mark_imported()]),
            )
            False -> #(
              loaded,
              effect.batch([
                dashboard,
                remembered,
                api.import_legacy(
                  api_base(),
                  token,
                  old.solved,
                  [],
                  old.drafts,
                  [],
                  StateImported,
                ),
                legacy.mark_imported(),
              ]),
            )
          }
      }
    }

    // The token is dead. Drop it and fall back to guest, which is at least a
    // usable app rather than an error screen.
    StateLoaded(Error(api.Unauthorised)) -> {
      let guest =
        Model(
          ..model.default(),
          editor_keymap: m.editor_keymap,
          editor_height: m.editor_height,
          // An expired session drops you to guest; it does not un-ask the
          // language question this browser has already answered.
          languages_chosen: m.languages_chosen,
          // Mid-session this is a refresh, not a reboot: whatever was on
          // screen stays there. At boot the loading card stays up.
          boot: m.boot,
          refreshing: True,
        )
      #(guest, effect.batch([session.clear_token(), store.load_state(guest)]))
    }

    // The first load failing is a wall (there is nothing to show); a later
    // one failing is a notice, because what is on screen is still good.
    StateLoaded(Error(failure)) ->
      case m.boot {
        Synced -> #(
          Model(
            ..m,
            refreshing: False,
            notice: Some(
              "Couldn't refresh from the server: " <> api.error_message(failure),
            ),
          ),
          effect.none(),
        )
        _ -> #(
          Model(..m, boot: SyncFailed(api.error_message(failure))),
          effect.none(),
        )
      }

    UserClickedRetrySync -> #(Model(..m, boot: Syncing), store.load_state(m))

    // Progress merged. Wipe the local copy so signing out later cannot
    // resurrect a stale duplicate, and reload so the screen shows the
    // authoritative state.
    StateImported(Ok(Nil)) -> #(
      Model(..m, merge_offer: False, refreshing: True),
      effect.batch([store.clear_guest(), store.load_state(m)]),
    )

    // The upload failed: the guest data is still in this browser, so the
    // merge is offered again rather than left as a spinning sync bar with
    // no way to retry.
    StateImported(Error(failure)) -> #(
      Model(
        ..m,
        refreshing: False,
        merge_offer: True,
        notice: Some(
          "Your progress could not be moved to this account: "
          <> api.error_message(failure)
          <> " It is still in this browser \u{2014} use Merge it to try again.",
        ),
      ),
      effect.none(),
    )

    UserClickedMergeGuest -> #(
      Model(..m, merge_offer: False, refreshing: True),
      store.upgrade(token(m), [], StateImported),
    )

    UserDismissedMergeOffer -> #(Model(..m, merge_offer: False), effect.none())

    UserClickedSignOut -> {
      let signed_out =
        Model(
          ..model.default(),
          editor_keymap: m.editor_keymap,
          // Signing out is not a factory reset of this browser. Without this
          // it sends someone who has already chosen their languages back to
          // the first-run picker.
          languages_chosen: m.languages_chosen,
          tour_lesson: m.tour_lesson,
          boot: Syncing,
        )
      #(
        signed_out,
        effect.batch([
          api.logout(api_base(), token(m), SignOutCompleted),
          session.clear_token(),
          // Back to guest rather than to a sign-in wall. The guest store was
          // cleared on upgrade, so this loads empty.
          store.load_state(signed_out),
        ]),
      )
    }

    // The local session is already gone; whether the server agreed is not
    // worth telling the user about.
    SignOutCompleted(_) -> #(m, effect.none())

    UserDismissedNotice -> #(Model(..m, notice: None), effect.none())

    UserDismissedUpgradePrompt -> #(
      Model(..m, upgrade_prompt: PromptDismissed),
      local_dismiss_prompt(),
    )

    UserClickedSignIn(mode) -> #(
      Model(
        ..m,
        route: AuthRoute,
        auth: AuthForm(..m.auth, mode:, error: None, busy: False),
      ),
      effect.none(),
    )

    // --- the scheduler ---
    UserClickedStudy ->
      case queue.build(m) {
        [] -> #(
          Model(
            ..m,
            notice: Some(
              "Nothing to study right now. Come back when cards are due, or pick problems by hand.",
            ),
          ),
          effect.none(),
        )
        queue ->
          with_prefetch(#(
            Model(
              ..open_first(Model(..m, studying: True), queue),
              // A scheduled sitting is one pass: FSRS decides when a card comes
              // back, so repeating it three times now would just be three
              // same-day reviews.
              iteration_count: 1,
            ),
            effect.none(),
          ))
      }

    // The same queue as Study, opened without an editor: each card is read,
    // revealed and graded from memory. Nothing to run, so no runtime is
    // fetched.
    UserClickedRecall ->
      case queue.build(m) {
        [] -> #(
          Model(
            ..m,
            notice: Some(
              "Nothing to recall right now. Come back when cards are due.",
            ),
          ),
          effect.none(),
        )
        queue -> #(
          Model(
            ..open_first(Model(..m, studying: True, recall: True), queue),
            iteration_count: 1,
          ),
          effect.none(),
        )
      }

    UserRevealedRecall -> #(
      Model(
        ..m,
        revealed_solution: Some(0),
        hints_revealed: case current_problem(m) {
          Ok(current) -> list.length(current.approach)
          Error(Nil) -> 0
        },
        grading: AwaitingGrade,
      ),
      effect.none(),
    )

    UserClickedBrowse -> #(Model(..m, route: MenuRoute), effect.none())

    UserClickedBackToStudy -> #(Model(..m, route: StudyRoute), effect.none())

    UserClickedStats -> #(
      Model(..m, route: StatsRoute, detail: None),
      effect.batch([store.load_stats(m), store.load_insights(m)]),
    )

    StatsLoaded(Ok(loaded)) -> #(Model(..m, stats: Some(loaded)), effect.none())

    StatsLoaded(Error(failure)) -> #(
      Model(..m, notice: Some(api.error_message(failure))),
      effect.none(),
    )

    InsightsLoaded(Ok(loaded)) -> #(
      Model(..m, insights: Some(loaded)),
      effect.none(),
    )

    InsightsLoaded(Error(failure)) -> #(
      Model(..m, notice: Some(api.error_message(failure))),
      effect.none(),
    )

    StatsCursorMoved(delta) ->
      case m.insights {
        Some(data) -> {
          let rows = insights.listed(insights.analyse(data, m.cards, m.now))
          let last = int.max(0, list.length(rows) - 1)
          #(
            Model(
              ..m,
              nav: model.MenuNav(
                ..m.nav,
                stats: int.clamp(m.nav.stats + delta, 0, last),
              ),
            ),
            effect.none(),
          )
        }
        None -> #(m, effect.none())
      }

    StatsActivated ->
      case m.insights {
        Some(data) -> {
          let rows = insights.listed(insights.analyse(data, m.cards, m.now))
          case
            list.drop(rows, int.clamp(m.nav.stats, 0, list.length(rows) - 1))
          {
            [row, ..] -> handle(m, UserOpenedDetail(row.problem))
            [] -> #(m, effect.none())
          }
        }
        None -> #(m, effect.none())
      }

    UserOpenedDetail(problem) -> #(
      Model(..m, detail: Some(#(problem, None))),
      store.load_history(m, problem),
    )

    UserClosedDetail -> #(Model(..m, detail: None), effect.none())

    HistoryLoaded(problem, Ok(rows)) ->
      case m.detail {
        // Only fill the panel still being looked at; a slow response for a
        // closed panel is dropped.
        Some(#(open, None)) if open == problem -> #(
          Model(..m, detail: Some(#(problem, Some(rows)))),
          effect.none(),
        )
        _ -> #(m, effect.none())
      }

    HistoryLoaded(_, Error(failure)) -> #(
      Model(..m, detail: None, notice: Some(api.error_message(failure))),
      effect.none(),
    )

    UserGraded(rating) ->
      case m.grading, model.current_ref(m) {
        // Guard against a second press while the first is in flight: a review
        // must not be recorded twice.
        SubmittingGrade, _ -> #(m, effect.none())
        _, Error(Nil) -> #(m, effect.none())
        _, Ok(ref) -> {
          // The review deletes this problem's draft; a save still queued
          // from the last keystroke must not put it back.
          browser.cancel_debounce("draft-save")
          #(
            Model(
              ..m,
              grading: SubmittingGrade,
              sitting: [
                model.SittingEntry(
                  problem: ref,
                  pressed: rating,
                  duration_ms: browser.now_ms() - m.opened_at_ms,
                  passed: model.test_passed(m),
                  clean: model.test_passed(m) && !answer_given_away(m),
                ),
                ..m.sitting
              ],
              // Everything needed to stand here again if the grade was a slip.
              undo: Some(model.UndoPoint(
                problem: ref,
                selected: m.selected,
                problem_index: m.problem_index,
                current_iteration: m.current_iteration,
                iteration_count: m.iteration_count,
                studying: m.studying,
                recall: m.recall,
                draft: m.draft,
                run: m.run,
                revealed_solution: m.revealed_solution,
                hints_revealed: m.hints_revealed,
                duration_ms: browser.now_ms() - m.opened_at_ms,
                card_before: model.card_for(m, ref),
              )),
            ),
            store.record_review(m, case m.recall {
              // Revealing is the mechanism here, not a peek, and there was no
              // code to time: the row says "recall" and nothing else.
              True ->
                wire.Review(
                  problem: ref,
                  rating:,
                  duration_ms: None,
                  auto_failed: False,
                  revealed: False,
                  practice: !m.studying,
                  recall: True,
                )
              False ->
                wire.Review(
                  problem: ref,
                  rating:,
                  duration_ms: Some(browser.now_ms() - m.opened_at_ms),
                  // An ungraded card's run is a demonstration, not a test, so
                  // it is never logged as a failure.
                  auto_failed: case current_problem(m) {
                    Ok(current) ->
                      problem.graded(current) && model.run_failed(m.run)
                    Error(Nil) -> model.run_failed(m.run)
                  },
                  revealed: case current_problem(m) {
                    Ok(current) -> model.answer_revealed(m, current.approach)
                    Error(Nil) -> m.revealed_solution != None
                  },
                  // A hand-picked sitting is practice, not a scheduled review.
                  practice: !m.studying,
                  recall: False,
                )
            }),
          )
        }
      }

    ReviewRecorded(Ok(outcome)) -> {
      let cards = dict.insert(m.cards, outcome.card.problem, outcome.card)
      let recorded =
        Model(
          ..m,
          now: outcome.now,
          today: outcome.today,
          cards:,
          // The store dropped the draft with the review; so does the copy
          // in memory, or a reopen this session would still restore it.
          drafts: local.drop_draft(m.drafts, outcome.card.problem),
          upgrade_prompt: escalate(m),
        )
      case m.grading {
        // A graded drill moves on by itself; a quiz waits for Next, because
        // the explanation is worth reading first.
        SubmittingGrade -> {
          // A Blitz card that was graded was solved in time: its result is
          // the sitting entry just recorded, and the next card's clock
          // starts from now.
          let recorded = case m.blitz, m.sitting {
            Some(blitz), [entry, ..] ->
              Model(
                ..recorded,
                blitz: Some(
                  model.Blitz(
                    ..blitz,
                    results: [
                      model.BlitzResult(
                        problem: entry.problem,
                        passed: entry.passed,
                        duration_ms: entry.duration_ms,
                        expired: False,
                      ),
                      ..blitz.results
                    ],
                    deadline_ms: browser.now_ms() + blitz.per_card_ms,
                    expired_flash: False,
                  ),
                ),
              )
            _, _ -> recorded
          }
          advance(Model(..recorded, grading: NotGrading))
        }
        _ -> #(recorded, effect.none())
      }
    }

    ReviewRecorded(Error(failure)) -> #(
      Model(
        ..m,
        undo: None,
        grading: case m.grading {
          SubmittingGrade -> AwaitingGrade
          other -> other
        },
        storage_full: m.mode == Guest || m.storage_full,
        notice: Some(api.error_message(failure)),
      ),
      effect.none(),
    )

    UserToggledDiff -> #(Model(..m, diff_mode: !m.diff_mode), effect.none())

    UserDismissedDiff -> #(Model(..m, slot: NoPane), effect.none())

    UserClickedUndo ->
      case m.undo, m.grading {
        // Not while a grade is still being saved: the point would be stale.
        Some(point), NotGrading | Some(point), AwaitingGrade -> #(
          Model(..m, undo: None),
          store.undo_review(m, point),
        )
        _, _ -> #(m, effect.none())
      }

    UndoRecorded(point, Ok(outcome)) -> {
      let cards = case outcome.card {
        Some(card) -> dict.insert(m.cards, card.problem, card)
        None -> dict.delete(m.cards, point.problem)
      }
      // Back on the problem as it was when the grade was pressed, with the
      // clock where it stood, waiting for the grade you meant.
      #(
        Model(
          ..m,
          now: outcome.now,
          today: outcome.today,
          cards:,
          route: DrillRoute,
          selected: point.selected,
          problem_index: point.problem_index,
          current_iteration: point.current_iteration,
          iteration_count: point.iteration_count,
          studying: point.studying,
          recall: point.recall,
          draft: point.draft,
          run: point.run,
          revealed_solution: point.revealed_solution,
          hints_revealed: point.hints_revealed,
          stage: Coding,
          slot: case point.revealed_solution {
            Some(_) -> SolutionPane
            None -> NoPane
          },
          grading: AwaitingGrade,
          opened_at_ms: browser.now_ms() - point.duration_ms,
          sitting: case m.sitting {
            [_, ..rest] -> rest
            [] -> []
          },
          exam_answers: [],
          choice: None,
          graded: False,
          notice: None,
        ),
        effect.none(),
      )
    }

    // The point is handed back so the undo can be tried again.
    UndoRecorded(point, Error(failure)) -> #(
      Model(..m, undo: Some(point), notice: Some(api.error_message(failure))),
      effect.none(),
    )

    DraftSynced(Ok(Nil)) -> #(m, effect.none())
    // A failed sync is silent data loss: the typing looked saved and was not.
    // Same surfacing as a failed review write; the next keystroke retries.
    DraftSynced(Error(failure)) -> #(
      Model(
        ..m,
        storage_full: m.mode == Guest || m.storage_full,
        notice: Some(api.error_message(failure)),
      ),
      effect.none(),
    )

    UserClickedCategory(name) -> #(
      Model(..m, selected_category: Some(name), selected_subcategory: None),
      effect.none(),
    )

    UserClickedSubcategory(name) -> #(
      Model(..m, selected_subcategory: Some(name)),
      effect.none(),
    )

    UserClickedBreadcrumb(level) ->
      case level {
        0 -> #(
          Model(..m, selected_category: None, selected_subcategory: None),
          effect.none(),
        )
        _ -> #(Model(..m, selected_subcategory: None), effect.none())
      }

    UserToggledProblem(ref) -> #(
      Model(..m, selected: toggle_selection(m.selected, ref)),
      effect.none(),
    )

    UserClickedSelectAll ->
      case m.selected_category, m.selected_subcategory {
        Some(cat), Some(sub) -> {
          let refs =
            problems.problems_in(cat, sub)
            |> list.map(fn(p) { ProblemRef(cat, sub, p.title) })
            |> list.filter(fn(ref) { !list.contains(m.selected, ref) })
          #(Model(..m, selected: list.append(m.selected, refs)), effect.none())
        }
        _, _ -> #(m, effect.none())
      }

    UserClickedClearSelection -> #(Model(..m, selected: []), effect.none())

    UserChangedIterations(raw) -> {
      let count = case int.parse(raw) {
        Ok(value) if value > 0 -> value
        _ -> 1
      }
      #(Model(..m, iteration_count: count), effect.none())
    }

    UserClickedStartDrill ->
      case m.selected {
        [] -> #(m, effect.none())
        [first, ..] ->
          with_prefetch(#(
            Model(
              ..model.open_problem_view(m, first),
              route: DrillRoute,
              problem_index: 0,
              current_iteration: 1,
              // A hand-picked sitting still ends where it started.
              studying: False,
              draft: draft_for(m, first),
              run: RunIdle,
              // Without this a reveal-only drill -- Elixir has no harness at
              // all -- would sit forever on "run the tests to grade this" with
              // no tests to run, and could never be scheduled.
              grading: initial_grading(m, first),
              opened_at_ms: browser.now_ms(),
              // Clearing the log is what distinguishes a drill from an exam at
              // the end of the run: a non-empty log means a report is owed.
              exam_answers: [],
              sitting: [],
              choice: None,
              graded: False,
            ),
            effect.none(),
          ))
      }

    UserClickedStartExam -> #(
      m,
      effect.from(fn(dispatch) { dispatch(ExamSampled(sample_exam())) }),
    )

    ExamSampled(refs) ->
      case refs {
        [] -> #(m, effect.none())
        _ -> #(
          Model(
            ..m,
            route: DrillRoute,
            selected: refs,
            problem_index: 0,
            // The exam is reachable from both the study screen and the menu,
              // and finishing it should hand you back to whichever you came
              // from rather than always to the menu.
              studying: m.route == StudyRoute,
            // An exam is one pass over the questions; repeating it inside the
            // sitting would score the same question twice.
            iteration_count: 1,
            current_iteration: 1,
            exam_answers: [],
            sitting: [],
            choice: None,
            graded: False,
            revealed_solution: None,
            hints_revealed: 0,
            slot: NoPane,
            run: RunIdle,
            draft: "",
          ),
          effect.none(),
        )
      }

    UserClickedExitReport -> #(
      Model(
        ..m,
        route: case m.studying {
          True -> StudyRoute
          False -> MenuRoute
        },
        studying: False,
        recall: False,
        undo: None,
      ),
      effect.none(),
    )

    UserPickedChoice(index) ->
      case m.graded {
        True -> #(m, effect.none())
        False -> #(Model(..m, choice: Some(index)), effect.none())
      }

    UserSubmittedAnswer ->
      case m.graded, m.choice, current_quiz(m), model.current_ref(m) {
        False, Some(picked), Ok(quiz), Ok(ref) -> {
          let right = picked == quiz.correct
          #(
            Model(
              ..m,
              graded: True,
              // Appended at the head; the report only groups and counts, so
              // the order does not matter.
              exam_answers: [#(ref, right), ..m.exam_answers],
            ),
            // A quiz grades itself: the answer is either right or it is not,
            // so there is no Hard/Good/Easy judgement to ask for. The review
            // is recorded now and the user still presses Next, because the
            // explanation is worth reading before moving on.
            store.record_review(
              m,
              wire.Review(
                problem: ref,
                rating: case right {
                  True -> fsrs.Good
                  False -> fsrs.Again
                },
                duration_ms: Some(browser.now_ms() - m.opened_at_ms),
                auto_failed: !right,
                revealed: False,
                // The exam is an assessment, not practice.
                practice: False,
                recall: False,
              ),
            ),
          )
        }
        _, _, _, _ -> #(m, effect.none())
      }

    UserClickedExitDrill -> #(
      Model(
        ..m,
        exit_prompt: Some(case current_quiz(m), m.studying {
          Ok(_), _ -> "Exit the exam? You will not get a score for it."
          // Study-rep typing is deliberately not persisted; a manual
          // drill's draft was saved moments after the last keystroke.
          Error(Nil), True -> "Exit the drill? Your typed code will be lost."
          Error(Nil), False -> "Exit the drill? Your code is saved as a draft."
        }),
      ),
      // Whatever button was clicked last (a grade, a reveal) still has focus,
      // and a focused button swallows Enter. Drop it so Enter and Escape
      // reach the prompt's bindings.
      run_effect(browser.blur_active),
    )

    // `reset_home`, not `reset_to_menu`: a sitting started from the study
    // queue must end back on the study screen. Landing in the manual browser
    // is disorienting when that is not where you came from.
    ExitConfirmed(True) -> {
      let #(m, abandoned) = abandon_run(Model(..m, exit_prompt: None))
      #(reset_home(m), abandoned)
    }
    ExitConfirmed(False) -> #(Model(..m, exit_prompt: None), effect.none())

    ClockTicked -> {
      let now_ms = browser.now_ms()
      case m.route, m.blitz {
        // A Blitz card past its deadline is over: recorded as a miss and
        // the next one opens. Grading is skipped -- nothing was solved.
        DrillRoute, Some(blitz) if now_ms >= blitz.deadline_ms ->
          handle(Model(..m, now_ms:), BlitzExpired)
        DrillRoute, _ -> #(Model(..m, now_ms:), tick())
        _, _ -> #(m, effect.none())
      }
    }

    UserToggledBlitz -> #(
      Model(..m, blitz_chooser: !m.blitz_chooser),
      effect.none(),
    )

    UserStartedBlitz(count, per_card_ms) ->
      case blitz_pool(m) {
        [] -> #(
          Model(
            ..m,
            blitz_chooser: False,
            notice: Some(
              "Nothing to blitz: queue some problems this browser can run.",
            ),
          ),
          effect.none(),
        )
        pool -> {
          let picked = sample(pool, count)
          with_prefetch(#(
            Model(
              ..open_first(
                Model(
                  ..m,
                  studying: False,
                  recall: False,
                  blitz_chooser: False,
                  blitz: Some(model.Blitz(
                    per_card_ms:,
                    deadline_ms: browser.now_ms() + per_card_ms,
                    results: [],
                    expired_flash: False,
                  )),
                ),
                picked,
              ),
              iteration_count: 1,
            ),
            effect.none(),
          ))
        }
      }

    BlitzExpired ->
      case m.blitz, model.current_ref(m) {
        Some(blitz), Ok(ref) -> {
          let expired =
            model.BlitzResult(
              problem: ref,
              passed: False,
              duration_ms: blitz.per_card_ms,
              expired: True,
            )
          // No review to carry the draft away, so it is dropped here: an
          // expired card is a miss, not work in progress.
          browser.cancel_debounce("draft-save")
          let #(next, fx) =
            advance(
              Model(
                ..m,
                drafts: local.drop_draft(m.drafts, ref),
                blitz: Some(
                  model.Blitz(
                    ..blitz,
                    results: [expired, ..blitz.results],
                    expired_flash: True,
                  ),
                ),
              ),
            )
          let fx = effect.batch([store.delete_draft(m, ref), fx])
          // The flash clears on the next tick; the deadline restarts with
          // the card. An ended Blitz keeps its results for the summary.
          #(
            case next.route, next.blitz {
              DrillRoute, Some(b) ->
                Model(
                  ..next,
                  blitz: Some(
                    model.Blitz(
                      ..b,
                      deadline_ms: browser.now_ms() + b.per_card_ms,
                    ),
                  ),
                )
              _, _ -> next
            },
            effect.batch([fx, tick()]),
          )
        }
        _, _ -> #(m, tick())
      }

    UserRevealedHint -> {
      let cap = case current_problem(m) {
        Ok(current) -> list.length(current.approach)
        Error(Nil) -> 0
      }
      #(
        Model(..m, hints_revealed: int.min(m.hints_revealed + 1, cap)),
        effect.none(),
      )
    }

    // Opening the walkthrough is the plan rung, just read one step at a
    // time; it counts as that rung revealed, never as the pseudocode.
    UserOpenedWalk ->
      case current_problem(m) {
        Ok(current) ->
          case model.plan_rung(current.approach) {
            Some(rung) -> #(
              Model(
                ..m,
                stage: Coding,
                slot: WalkPane,
                walk: Some(case m.walk {
                  Some(state) -> state
                  None ->
                    model.WalkState(
                      step: 0,
                      hint_shown: False,
                      why_shown: False,
                      code_shown: False,
                    )
                }),
                hints_revealed: int.max(m.hints_revealed, rung + 1),
              ),
              effect.none(),
            )
            None -> #(m, effect.none())
          }
        Error(Nil) -> #(m, effect.none())
      }

    UserClosedWalk -> #(Model(..m, slot: NoPane), effect.none())

    WalkHintShown -> #(
      Model(
        ..m,
        walk: option.map(m.walk, fn(w) {
          model.WalkState(..w, hint_shown: True)
        }),
      ),
      effect.none(),
    )

    WalkWhyShown -> #(
      Model(
        ..m,
        walk: option.map(m.walk, fn(w) { model.WalkState(..w, why_shown: True) }),
      ),
      effect.none(),
    )

    WalkCodeShown -> #(
      Model(
        ..m,
        walk: option.map(m.walk, fn(w) {
          model.WalkState(..w, code_shown: True)
        }),
        walk_code_seen: True,
      ),
      effect.none(),
    )

    WalkAdvanced ->
      case m.walk, current_problem(m) {
        Some(w), Ok(current) -> {
          let total = list.length(model.walk_steps(current.approach))
          #(
            Model(
              ..m,
              walk: Some(model.WalkState(
                step: int.min(w.step + 1, total),
                hint_shown: False,
                why_shown: False,
                code_shown: False,
              )),
            ),
            effect.none(),
          )
        }
        _, _ -> #(m, effect.none())
      }

    WalkBacked ->
      case m.walk {
        Some(w) -> #(
          Model(
            ..m,
            walk: Some(model.WalkState(
              step: int.max(w.step - 1, 0),
              hint_shown: False,
              why_shown: False,
              code_shown: False,
            )),
          ),
          effect.none(),
        )
        None -> #(m, effect.none())
      }

    // The solution shown is chosen; its button again closes the pane, but
    // the choice stands -- the log records that it was seen.
    UserToggledSolution(index) ->
      case m.slot, m.revealed_solution {
        SolutionPane, Some(current) if current == index -> #(
          Model(..m, slot: NoPane),
          effect.none(),
        )
        _, _ -> #(
          Model(
            ..m,
            stage: Coding,
            slot: SolutionPane,
            revealed_solution: Some(index),
          ),
          effect.none(),
        )
      }

    UserStartedCoding -> #(
      Model(..m, stage: Coding),
      focus_after_render("gleam-editor"),
    )

    UserToggledRead -> #(
      Model(..m, stage: case m.stage {
        Reading -> Coding
        Coding -> Reading
      }),
      effect.none(),
    )

    UserToggledPane(pane) ->
      case pane, m.slot == pane {
        WalkPane, True -> handle(m, UserClosedWalk)
        WalkPane, False -> handle(m, UserOpenedWalk)
        // Opening the note is focusing it; closing is just closing.
        NotePane, True -> #(Model(..m, slot: NoPane), effect.none())
        NotePane, False -> handle(m, NoteFocusRequested)
        // Every ladder starts with a nudge, so an open pane always has a
        // rung to show; the nudge is not a reveal.
        HintPane, _ -> #(
          Model(
            ..model.toggle_pane(m, HintPane),
            hints_revealed: int.max(m.hints_revealed, 1),
          ),
          effect.none(),
        )
        // With no passing run there is no diff to show instead of the
        // reference, so opening the pane is choosing the first solution.
        SolutionPane, False ->
          case m.revealed_solution, model.test_passed(m) {
            None, False -> handle(m, UserToggledSolution(0))
            _, _ -> #(model.toggle_pane(m, SolutionPane), effect.none())
          }
        SolutionPane, True -> #(Model(..m, slot: NoPane), effect.none())
        NoPane, _ -> #(m, effect.none())
      }

    UserClickedNext -> advance(m)

    UserSearched(query) -> #(Model(..m, search: query), effect.none())

    UserChangedKeymap(mode) -> {
      let m = Model(..m, editor_keymap: mode)
      #(m, save_preferences(m))
    }

    UserToggledResults -> #(
      Model(..m, results_collapsed: !m.results_collapsed),
      effect.none(),
    )

    EditorResized(height) -> {
      let m =
        Model(..m, editor_height: case height > 0 {
          True -> Some(height)
          False -> None
        })
      #(m, save_preferences(m))
    }

    UserClickedSettings -> #(Model(..m, route: SettingsRoute), measure_cache())

    // --- the offline cache ---
    UserClickedWarmCache ->
      case m.warming {
        Some(_) -> #(m, effect.none())
        None -> #(
          Model(..m, warming: Some(#(0, 0))),
          effect.from(fn(dispatch) {
            browser.warm_runtime_cache(fn(ok, done, total, finished) {
              dispatch(CacheWarmed(ok, done, total, finished))
            })
          }),
        )
      }

    CacheWarmed(ok, done, total, finished) ->
      case ok, finished {
        False, _ -> #(
          Model(
            ..m,
            warming: None,
            notice: Some(
              "The download stopped partway. Whatever arrived is kept; try again when you are back online.",
            ),
          ),
          measure_cache(),
        )
        True, True -> #(Model(..m, warming: None), measure_cache())
        True, False -> #(
          Model(..m, warming: Some(#(done, total))),
          effect.none(),
        )
      }

    CacheMeasured(bytes) -> #(Model(..m, cache_bytes: bytes), effect.none())

    // --- the Gleam Language Tour ---
    UserClickedTour -> #(
      Model(
        ..m,
        route: TourRoute,
        tour_page: TourContents,
        tour_cursor: m.tour_lesson,
        run: RunIdle,
      ),
      scroll_to("tour-" <> int.to_string(m.tour_lesson)),
    )

    UserOpenedLesson(index) -> open_lesson(m, index)

    UserClickedTourNext -> {
      let last = tour.last()
      case m.tour_page {
        // Next on the last lesson is Finish: back to the study screen.
        TourLesson(index) if index >= last -> #(
          Model(..m, route: StudyRoute, run: RunIdle),
          effect.none(),
        )
        TourLesson(index) -> open_lesson(m, index + 1)
        TourContents -> open_lesson(m, m.tour_cursor)
      }
    }

    UserClickedTourPrev ->
      case m.tour_page {
        TourLesson(index) if index > 0 -> open_lesson(m, index - 1)
        _ -> #(m, effect.none())
      }

    UserClickedTourContents ->
      case m.tour_page {
        TourLesson(index) -> #(
          Model(..m, tour_page: TourContents, tour_cursor: index, run: RunIdle),
          scroll_to("tour-" <> int.to_string(index)),
        )
        TourContents -> #(m, effect.none())
      }

    UserResetLesson ->
      case m.tour_page {
        TourLesson(index) ->
          case tour.at(index) {
            Ok(lesson) -> {
              let m =
                Model(
                  ..m,
                  tour_draft: lesson.code,
                  tour_edits: dict.delete(m.tour_edits, index),
                )
              run_tour_lesson(m)
            }
            Error(Nil) -> #(m, effect.none())
          }
        TourContents -> #(m, effect.none())
      }

    TourEditorChanged(text) ->
      case m.tour_page {
        TourLesson(index) -> #(
          Model(
            ..m,
            tour_draft: text,
            tour_edits: dict.insert(m.tour_edits, index, text),
          ),
          // Compile on a pause in typing, the way the tour site does, rather
          // than on every keystroke: a run is a whole compiler pass.
          effect.from(fn(dispatch) {
            browser.debounce("tour-run", 500, fn() { dispatch(TourRunTicked) })
          }),
        )
        TourContents -> #(m, effect.none())
      }

    TourRunTicked ->
      case m.run {
        // A run already in flight finishes first; the next pause re-runs.
        Running(_, _) -> #(
          m,
          effect.from(fn(dispatch) {
            browser.debounce("tour-run", 500, fn() { dispatch(TourRunTicked) })
          }),
        )
        _ -> run_tour_lesson(m)
      }

    TourCursorMoved(delta) -> {
      let cursor = int.clamp(m.tour_cursor + delta, 0, tour.last())
      #(
        Model(..m, tour_cursor: cursor),
        scroll_to("tour-" <> int.to_string(cursor)),
      )
    }

    TourActivated ->
      case m.tour_page {
        TourContents -> open_lesson(m, m.tour_cursor)
        TourLesson(_) -> #(m, effect.none())
      }

    // Committed on blur or Enter, so this fires once per edit rather than per
    // keystroke, and saving immediately is affordable.
    UserChangedSetting(field, raw) -> {
      let settings = apply_setting(m.settings, field, raw)
      let m = Model(..m, settings:)
      #(m, store.save_settings(m, settings))
    }

    UserClickedDeviceTimezone -> {
      let settings = wire.Settings(..m.settings, timezone: browser.time_zone())
      let m = Model(..m, settings:)
      #(m, store.save_settings(m, settings))
    }

    // The server answers with what it stored, so this is the authoritative
    // copy -- it may differ from what was sent if a bound was hit.
    SettingsSaved(Ok(settings)) -> #(Model(..m, settings:), effect.none())

    SettingsSaved(Error(error)) -> #(
      Model(..m, notice: Some(api.error_message(error))),
      effect.none(),
    )

    // --- export and import ---
    UserClickedExport -> #(m, store.export_archive(m))

    ArchiveReady(Ok(archive)) -> #(
      m,
      run_effect(fn() {
        browser.download_text(
          "gleamdrill-"
            <> string.slice(
            timestamp.to_rfc3339(archive.exported_at, calendar.utc_offset),
            0,
            10,
          )
            <> ".json",
          json.to_string(wire.archive_to_json(archive)),
        )
      }),
    )

    ArchiveReady(Error(error)) -> #(
      Model(..m, notice: Some(api.error_message(error))),
      effect.none(),
    )

    UserClickedImport -> #(
      m,
      effect.from(fn(dispatch) {
        browser.pick_file(fn(text) { dispatch(ImportPicked(text)) })
      }),
    )

    // Parsed here, before the question is asked, so a file that is not an
    // export is refused without ever offering to replace anything with it.
    ImportPicked(text) ->
      case json.parse(text, wire.archive_decoder()) {
        Ok(archive) if archive.version == wire.archive_version -> #(
          Model(..m, import_pending: Some(archive)),
          effect.none(),
        )
        Ok(_) -> #(
          Model(
            ..m,
            notice: Some("This export was made by a newer GleamDrill."),
          ),
          effect.none(),
        )
        Error(_) -> #(
          Model(..m, notice: Some("That file is not a GleamDrill export.")),
          effect.none(),
        )
      }

    ImportConfirmed(False) -> #(Model(..m, import_pending: None), effect.none())

    ImportConfirmed(True) ->
      case m.import_pending {
        Some(archive) -> #(
          Model(..m, import_pending: None, refreshing: True),
          store.restore_archive(m, archive),
        )
        None -> #(m, effect.none())
      }

    // Everything on screen came from the old data, so the boot state is
    // fetched again rather than patched.
    ArchiveRestored(Ok(Nil)) -> #(
      Model(..m, notice: Some("Restored. Everything is as the file had it.")),
      store.load_state(m),
    )

    ArchiveRestored(Error(error)) -> #(
      Model(..m, refreshing: False, notice: Some(api.error_message(error))),
      effect.none(),
    )

    PickerToggledLanguage(tag) -> {
      let picked = case list.contains(m.picked_languages, tag) {
        True -> list.filter(m.picked_languages, fn(t) { t != tag })
        False -> [tag, ..m.picked_languages]
      }
      #(Model(..m, picked_languages: picked), effect.none())
    }

    PickerConfirmed -> confirm_picker(m, starter: False)
    PickerConfirmedWithStarter -> confirm_picker(m, starter: True)

    // The picker is the starter-set chooser: which languages, then twenty
    // easy problems in each.
    UserAddedStarterSet -> #(
      Model(..m, route: PickerRoute, picked_languages: []),
      effect.none(),
    )

    UserToggledSuspend(ref) ->
      case model.card_for(m, ref) {
        None -> #(m, effect.none())
        Some(state) -> #(m, store.set_suspended(m, ref, !state.suspended))
      }

    CardSuspended(Ok(outcome)) -> #(
      Model(
        ..m,
        now: outcome.now,
        today: outcome.today,
        cards: dict.insert(m.cards, outcome.card.problem, outcome.card),
      ),
      effect.none(),
    )
    CardSuspended(Error(failure)) -> #(
      Model(..m, notice: Some(api.error_message(failure))),
      effect.none(),
    )

    // --- managing the queue ---
    UserClickedQueue -> #(Model(..m, route: QueueRoute), effect.none())

    UserSearchedQueue(text) -> #(
      Model(..m, queue_search: text, nav: model.MenuNav(..m.nav, queue: 0)),
      effect.none(),
    )

    // Every filter resets the cursor to the top. Keeping the row index across
    // a filter change would leave the highlight on whatever now happens to sit
    // at that position, which is a different problem than the one it was on.
    UserFilteredQueue(filter) -> #(
      Model(..m, queue_status: filter, nav: model.MenuNav(..m.nav, queue: 0)),
      effect.none(),
    )

    // From a select: the empty option is "all languages".
    UserPickedQueueLanguage(tag) -> #(
      Model(
        ..m,
        queue_language: case tag {
          "" -> None
          _ -> Some(tag)
        },
        nav: model.MenuNav(..m.nav, queue: 0),
      ),
      effect.none(),
    )

    UserChangedGroup(change) ->
      case queue.group_rows(m, change), change.add {
        [], _ -> #(m, effect.none())
        refs, True -> #(pending(m, refs), store.add_to_queue(m, refs))
        refs, False -> #(pending(m, refs), store.remove_from_queue(m, refs))
      }

    // One verb for both directions, because the row shows one control. A card
    // with review history is parked rather than deleted -- the server refuses
    // to delete it either way, and asking it to is a round trip that can only
    // end in `refused`.
    UserToggledQueued(ref) ->
      case model.card_for(m, ref) {
        None -> #(pending(m, [ref]), store.add_to_queue(m, [ref]))
        Some(state) ->
          case state.reps == 0 {
            True -> #(pending(m, [ref]), store.remove_from_queue(m, [ref]))
            False -> #(m, store.set_suspended(m, ref, !state.suspended))
          }
      }

    UserAddedAllShown ->
      case list.filter(queue.listed(m), fn(ref) { !model.is_queued(m, ref) }) {
        [] -> #(m, effect.none())
        refs -> #(pending(m, refs), store.add_to_queue(m, refs))
      }

    // Only the ones it can actually remove. Sending the studied rows too would
    // get them back as `refused` and raise a notice about cards the user never
    // asked to touch -- they are not in this list because they cannot leave the
    // queue, only be paused.
    UserRemovedAllShown ->
      case list.filter(queue.listed(m), fn(ref) { model.is_new(m, ref) }) {
        [] -> #(m, effect.none())
        refs -> #(pending(m, refs), store.remove_from_queue(m, refs))
      }

    QueueCursorMoved(delta) ->
      move_queue_cursor(m, fn(index, last) { int.clamp(index + delta, 0, last) })

    QueueCursorJumped(first) ->
      move_queue_cursor(m, fn(_index, last) {
        case first {
          True -> 0
          False -> last
        }
      })

    QueueToggledAtCursor ->
      case queue_cursor_ref(m) {
        Ok(ref) -> handle(m, UserToggledQueued(ref))
        Error(Nil) -> #(m, effect.none())
      }

    QueueChanged(Ok(change)) -> {
      let cards =
        list.fold(change.cards, m.cards, fn(cards, card: api.CardState) {
          dict.insert(cards, card.problem, card)
        })
      #(
        Model(
          ..m,
          now: change.now,
          today: change.today,
          cards: list.fold(change.removed, cards, dict.delete),
          queue_pending: [],
          // Refusals are the server declining to destroy a review log, not a
          // failure: say what happened and leave the cards parked-or-not as
          // they were.
          notice: case change.refused {
            [] -> m.notice
            refused ->
              Some(
                int.to_string(list.length(refused))
                <> " problem(s) have review history and stay in the queue. "
                <> "Pause them instead.",
              )
          },
        ),
        effect.none(),
      )
    }
    QueueChanged(Error(failure)) -> #(
      Model(..m, queue_pending: [], notice: Some(api.error_message(failure))),
      effect.none(),
    )

    EditorChanged(text) -> {
      // Study-rep typing is throwaway in memory as well as on disk: updating
      // the assoc here would let a manual open minutes later restore the
      // answer you just typed from memory, which is the leak the study reset
      // exists to prevent.
      let drafts = case model.current_ref(m), m.studying {
        Ok(ref), False -> model.assoc_put(m.drafts, ref, text)
        _, _ -> m.drafts
      }
      #(Model(..m, draft: text, drafts: drafts), schedule_draft_save())
    }

    NoteChanged(text) ->
      case model.current_ref(m) {
        Ok(ref) -> #(
          Model(..m, notes: model.assoc_put(m.notes, ref, text)),
          effect.from(fn(dispatch) {
            browser.debounce("note-save", 600, fn() { dispatch(NoteSaveTicked) })
          }),
        )
        Error(Nil) -> #(m, effect.none())
      }

    NoteSaveTicked ->
      case model.current_ref(m) {
        Ok(ref) -> #(
          m,
          store.save_note(
            m,
            ref,
            model.assoc_get(m.notes, ref) |> result.unwrap(""),
          ),
        )
        Error(Nil) -> #(m, effect.none())
      }

    NoteSynced(Ok(Nil)) -> #(m, effect.none())
    NoteSynced(Error(failure)) -> #(
      Model(
        ..m,
        storage_full: m.mode == Guest || m.storage_full,
        notice: Some(api.error_message(failure)),
      ),
      effect.none(),
    )

    NoteFocusRequested -> #(
      Model(..m, stage: Coding, slot: NotePane),
      focus_after_render(".note-input"),
    )

    DraftSaveTicked ->
      case model.current_ref(m), m.studying {
        // A study rep is throwaway typing; persisting it would clobber the
        // draft saved from a real working session on the same problem.
        _, True -> #(m, effect.none())
        Ok(ref), False -> #(m, store.save_draft(m, ref, m.draft))
        Error(Nil), _ -> #(m, effect.none())
      }

    UserClickedRun -> request_run(m, model.TestRun)

    UserClickedScratchRun -> request_run(m, model.ScratchRun)

    UserClickedStopRun -> abandon_run(m)

    UserClickedRetryRuntime(language) -> #(
      Model(
        ..m,
        runtimes: model.assoc_put(m.runtimes, language, RuntimeLoading),
      ),
      runner.restart(language),
    )

    RunnerReady(language) -> {
      let m =
        Model(
          ..m,
          runtimes: model.assoc_put(m.runtimes, language, RuntimeReady),
        )
      // A Blitz card whose runtime was still downloading has not had a
      // fair clock: it restarts now that a run is actually possible.
      let m = case m.blitz, m.route, current_language(m) {
        Some(blitz), DrillRoute, Ok(current) if current == language ->
          Model(
            ..m,
            blitz: Some(
              model.Blitz(
                ..blitz,
                deadline_ms: browser.now_ms() + blitz.per_card_ms,
              ),
            ),
          )
        _, _, _ -> m
      }
      case language, m.run {
        // A tour lesson opened before the compiler was ready runs now.
        "gleam", RunIdle -> run_tour_lesson(m)
        _, _ -> #(m, effect.none())
      }
    }
    RunnerFailed(language, message) -> #(
      Model(
        ..m,
        runtimes: model.assoc_put(m.runtimes, language, RuntimeFailed(message)),
        // A dead runtime cannot finish the in-flight run; clearing it here
        // stops the still-armed timeout from reporting a bogus infinite loop.
        run: case m.run {
          Running(_, _) -> RunIdle
          other -> other
        },
      ),
      effect.none(),
    )

    RunFinished(id, outcome, stdout) ->
      case m.run {
        Running(current, _) if current == id -> {
          let run = Ran(outcome, stdout)
          // A pass opens the reference beside your code, as a diff. Only a
          // real answer counts: something typed, on a problem with a
          // reference, from the test run and not a scratch one.
          let passed =
            m.run_kind == model.TestRun
            && model.run_passed(run)
            && string.trim(m.draft) != ""
            && case current_problem(m) {
              Ok(current) -> current.solutions != []
              Error(Nil) -> False
            }
          #(
            // Whatever the harness said, the drill is now answerable: the
            // grading bar decides what the buttons offer. A scratch run is
            // not an answer, though; it leaves the gate where it was.
            Model(
              ..m,
              run:,
              grading: case m.run_kind {
                model.TestRun -> AwaitingGrade
                model.ScratchRun -> m.grading
              },
              slot: model.pane_after_run(m.slot, m.revealed_solution, passed),
            ),
            // Blur the editor so 1-4 grade immediately: the whole rep is
            // type, Ctrl+Enter, digit. Not on the tour, where a run follows
            // every pause in typing and must not take the cursor away.
            case m.route {
              DrillRoute -> run_effect(browser.blur_active)
              _ -> effect.none()
            },
          )
        }
        _ -> #(m, effect.none())
      }

    // The server answered, or the request failed. A failed request is not
    // a failed run: the attempt never executed, so the run goes back to idle
    // and the reason is shown as a notice, where a lost connection belongs.
    RemoteRunFinished(id, result) ->
      case m.run, result {
        Running(current, _), Ok(wire.RunResult(cases, stdout, error))
          if current == id
        -> {
          let outcome = case error {
            None ->
              Cases(
                list.map(cases, fn(c) {
                  CaseResult(c.label, c.expected, c.actual, c.passed)
                }),
              )
            Some(wire.RunError(phase, line, message)) ->
              Errored(RunError(phase, None, line, None, message))
          }
          handle(m, RunFinished(id, outcome, stdout))
        }
        Running(current, _), Error(api.Unauthorised) if current == id ->
          handle(Model(..m, run: RunIdle), StateLoaded(Error(api.Unauthorised)))
        Running(current, _), Error(failure) if current == id -> #(
          Model(..m, run: RunIdle, notice: Some(api.error_message(failure))),
          effect.none(),
        )
        _, _ -> #(m, effect.none())
      }

    RunTimedOut(id) ->
      case m.run {
        Running(current, _) if current == id -> {
          let timed_out =
            Model(..m, run: Ran(TimedOut, ""), grading: case m.run_kind {
              model.TestRun -> AwaitingGrade
              model.ScratchRun -> m.grading
            })
          // The worker cannot be interrupted, only replaced. A server-side
          // run has no worker: the server has already killed it.
          case m.route, current_language(m) {
            TourRoute, _ -> Ok("gleam")
            _, other -> other
          }
          |> fn(language) {
            case language {
              Ok(language) ->
                case runner.is_remote(language) {
                  True -> #(timed_out, effect.none())
                  False -> #(
                    Model(
                      ..timed_out,
                      runtimes: model.assoc_put(
                        m.runtimes,
                        language,
                        RuntimeLoading,
                      ),
                    ),
                    runner.restart(language),
                  )
                }
              Error(Nil) -> #(timed_out, effect.none())
            }
          }
        }
        _ -> #(m, effect.none())
      }

    // Armed alongside every spawn; a stale timer for a runtime that made it
    // to ready (or already failed loudly) is a no-op.
    RuntimeLoadTimedOut(language) ->
      case model.runtime_for(m, language) {
        RuntimeLoading -> #(
          Model(
            ..m,
            runtimes: model.assoc_put(
              m.runtimes,
              language,
              RuntimeFailed("The runtime took too long to load."),
            ),
          ),
          effect.none(),
        )
        _ -> #(m, effect.none())
      }
  }
}

/// Folds a fresh `/api/state` into the model.
///
/// Note the route: a signed-in user lands on the study screen, not the manual
/// browser. The browser is still there, but what to study today is the
/// question the app now answers first.
fn apply_state(m: Model, state: api.BootState) -> Model {
  Model(
    ..m,
    user: Some(state.user),
    boot: Synced,
    refreshing: False,
    now: state.now,
    settings: state.settings,
    cards: dict.from_list(
      list.map(state.cards, fn(card) { #(card.problem, card) }),
    ),
    today: state.today,
    drafts: state.drafts,
    notes: state.notes,
    // The one place that decides where boot lands. A browser that has never
    // answered the language question goes to the picker instead of the study
    // screen, because the queue it would otherwise build is one language deep
    // by accident rather than by choice -- unless the account already has a
    // queue, in which case the question was answered on another device and
    // asking again would only stand between the user and their cards.
    route: case m.languages_chosen || state.cards != [] {
      True -> StudyRoute
      False -> PickerRoute
    },
    // Evaluated on every load, not only after a review: a guest who crossed
    // the threshold in a previous session should still be told.
    upgrade_prompt: escalate(m),
  )
}

/// Parse one settings input and clamp it into range.
///
/// The bounds mirror `validate_settings` in the server's routes/study.gleam.
/// Clamping rather than rejecting is deliberate: these come from a number
/// input whose own min/max the browser already shows, so a value outside them
/// is a typo, and snapping it is friendlier than an error. Unparseable text
/// leaves the setting alone.
fn apply_setting(
  settings: api.Settings,
  field: model.SettingField,
  raw: String,
) -> api.Settings {
  case field {
    NewPerDay ->
      case int.parse(raw) {
        Ok(value) ->
          wire.Settings(..settings, new_per_day: int.clamp(value, 0, 100))
        Error(Nil) -> settings
      }
    ReviewsPerDay ->
      case int.parse(raw) {
        Ok(value) ->
          wire.Settings(..settings, reviews_per_day: int.clamp(value, 0, 500))
        Error(Nil) -> settings
      }
    DayStartHour ->
      case int.parse(raw) {
        Ok(value) ->
          wire.Settings(..settings, day_start_hour: int.clamp(value, 0, 23))
        Error(Nil) -> settings
      }
    ReminderHour ->
      case int.parse(raw) {
        Ok(hour) ->
          wire.Settings(..settings, reminder_hour: Some(int.clamp(hour, 0, 23)))
        // The select's "off" option, or anything else: no mail.
        Error(Nil) -> wire.Settings(..settings, reminder_hour: None)
      }
    DesiredRetention ->
      case float.parse(raw) {
        Ok(value) ->
          wire.Settings(
            ..settings,
            scheduler: fsrs.Config(
              ..settings.scheduler,
              desired_retention: float.clamp(value, 0.7, 0.99),
            ),
          )
        // An integer in a step-0.01 field: "1" should mean 1.0, not nothing.
        Error(Nil) ->
          case int.parse(raw) {
            Ok(whole) ->
              wire.Settings(
                ..settings,
                scheduler: fsrs.Config(
                  ..settings.scheduler,
                  desired_retention: float.clamp(int.to_float(whole), 0.7, 0.99),
                ),
              )
            Error(Nil) -> settings
          }
      }
  }
}

/// Starts a sitting on the given list of problems.
fn open_first(m: Model, queue: List(ProblemRef)) -> Model {
  case queue {
    [] -> m
    [first, ..] ->
      Model(
        ..model.open_problem_view(m, first),
        route: DrillRoute,
        selected: queue,
        problem_index: 0,
        current_iteration: 1,
        // A study rep starts from the stub: retyping from memory is the whole
        // product. A manual sitting restores a draft only if one survived --
        // grading deletes it, so what comes back is work left unfinished.
        draft: case m.studying {
          True -> starter_for(first)
          False -> draft_for(m, first)
        },
        run: RunIdle,
        grading: initial_grading(m, first),
        opened_at_ms: browser.now_ms(),
        exam_answers: [],
        sitting: [],
        choice: None,
        graded: False,
      )
  }
}

/// A drill with no harness has nothing to run, so it is gradeable the moment
/// it opens. One with a harness waits for a result.
/// What the grade bar starts as when a problem opens.
///
/// Gradeable from the first moment when either there is nothing to run (a
/// reveal-only drill is a flashcard proper) or this is the problem's first
/// encounter — the learning step, where you reveal, study, and self-grade like
/// flipping a card. Otherwise a run is required before grading.
fn initial_grading(m: Model, ref: ProblemRef) -> model.Grading {
  use <- bool.guard(m.recall, NotGrading)
  // A Blitz is scored on the run, so the grade waits for one: pressing
  // Good on a card never attempted is not a solve.
  use <- bool.guard(m.blitz != None, NotGrading)
  case problem_kind(m, ref) {
    // Quizzes grade themselves on submit.
    QuizProblem -> NotGrading
    CheckableProblem ->
      case model.first_encounter(m, ref) {
        True -> AwaitingGrade
        False -> NotGrading
      }
    RevealOnlyProblem -> AwaitingGrade
  }
}

type ProblemKind {
  CheckableProblem
  QuizProblem
  RevealOnlyProblem
}

fn problem_kind(m: Model, ref: ProblemRef) -> ProblemKind {
  case problems.find(ref.category, ref.subcategory, ref.title) {
    Ok(found) ->
      case found.check, found.quiz {
        _, Some(_) -> QuizProblem
        // A read-and-run card (Check present, graded: False) is gradeable
        // from the moment it opens, like a reveal-only one -- and so is a
        // check this browser cannot run (Elixir, signed out).
        Some(check), None ->
          case check.graded && model.run_available(m, found.language) {
            True -> CheckableProblem
            False -> RevealOnlyProblem
          }
        None, None -> RevealOnlyProblem
      }
    Error(Nil) -> RevealOnlyProblem
  }
}

/// Persist the settings that belong to this browser rather than the account.
///
/// Written whole every time, so every caller must pass a model that already
/// holds the change it wants saved.
fn save_preferences(m: Model) -> Effect(Msg) {
  session.save_preferences(session.Preferences(
    editor_keymap: m.editor_keymap,
    editor_height: m.editor_height,
    tour_lesson: m.tour_lesson,
    languages_chosen: m.languages_chosen,
  ))
}

fn handle_key(m: Model, key: model.Key) -> #(Model, Effect(Msg)) {
  case key.editing {
    // The editor's own keymaps own the keyboard; the one thing the app
    // claims there is Ctrl+Enter, so write -> run -> grade needs no mouse.
    "editor" ->
      case key.ctrl && key.key == "Enter" && m.route == DrillRoute {
        True -> handle(m, UserClickedRun)
        False -> #(m, effect.none())
      }
    // Inputs keep their keys; Escape hands focus back to the app.
    "input" ->
      case key.key {
        "Escape" -> #(m, run_effect(browser.blur_active))
        _ -> #(m, effect.none())
      }
    // A focused button activates natively; stay out of its way — except
    // for Escape, which activates nothing and would otherwise die on
    // whichever button was clicked last (grade, reveal, run).
    "control" ->
      case key.key {
        "Escape" ->
          case keys.dispatch(m, key) {
            Ok(resolved) -> handle(m, resolved)
            Error(Nil) -> #(m, effect.none())
          }
        _ -> #(m, effect.none())
      }
    _ ->
      case keys.dispatch(m, key) {
        Ok(resolved) -> handle(m, resolved)
        Error(Nil) -> #(m, effect.none())
      }
  }
}

/// A run the button or keyboard asked for, once the runtime is ready: posted
/// to the server for a remote language, spawned in a worker otherwise.
/// A run of either kind, with every reason it cannot start said out loud:
/// the button is disabled in those states, but `r`, `t` and Ctrl+Enter
/// land here too and silence reads as a broken key.
fn request_run(m: Model, kind: model.RunKind) -> #(Model, Effect(Msg)) {
  case m.run {
    // One run at a time: a queued second run just doubles the wait.
    Running(_, _) -> #(m, effect.none())
    _ ->
      case current_language(m), current_check(m) {
        Ok(language), Ok(check) -> {
          let harness = case kind {
            model.TestRun -> check.harness
            model.ScratchRun -> runner.scratch_harness(language)
          }
          case model.runtime_for(m, language) {
            // Elixir and Go run on the server, and the server wants a
            // session.
            RuntimeReady if m.mode == Guest ->
              case runner.is_remote(language) {
                True -> #(
                  Model(
                    ..m,
                    notice: Some(
                      "This drill runs on the server \u{2014} sign in to run it.",
                    ),
                  ),
                  effect.none(),
                )
                False -> start_run(m, language, harness, kind)
              }
            RuntimeReady -> start_run(m, language, harness, kind)
            RuntimeLoading | RuntimeNotLoaded -> #(
              Model(
                ..m,
                notice: Some(
                  "The runtime is still loading \u{2014} the Run button enables when it's ready.",
                ),
              ),
              effect.none(),
            )
            RuntimeFailed(_) -> #(
              Model(
                ..m,
                notice: Some(
                  "The runtime failed to load \u{2014} use Retry next to the Run button.",
                ),
              ),
              effect.none(),
            )
          }
        }
        _, _ -> #(m, effect.none())
      }
  }
}

fn start_run(
  m: Model,
  language: String,
  harness: String,
  kind: model.RunKind,
) -> #(Model, Effect(Msg)) {
  let id = m.next_run_id
  let previous = case m.run {
    Ran(_, stdout) -> stdout
    _ -> ""
  }
  let started =
    Model(..m, run: Running(id, previous), run_kind: kind, next_run_id: id + 1)
  case runner.is_remote(language), m.mode {
    True, Account(token) -> #(
      started,
      effect.batch([
        api.post_run(
          api_base(),
          token,
          wire.RunRequest(language, m.draft, harness),
          RemoteRunFinished(id, _),
        ),
        runner.arm_remote_timeout(id),
      ]),
    )
    // Unreachable: request_run catches a guest first.
    True, Guest -> #(m, effect.none())
    False, _ -> {
      let #(next, fx) = start_local_run(m, language, m.draft, harness)
      #(Model(..next, run_kind: kind), fx)
    }
  }
}

fn abandon_run(m: Model) -> #(Model, Effect(Msg)) {
  case m.run, current_language(m) {
    // Nothing to restart for a server-side run; its late answer is ignored
    // by the id guard.
    Running(_, _), Ok(language) ->
      case runner.is_remote(language) {
        True -> #(Model(..m, run: RunIdle), effect.none())
        False -> #(
          Model(
            ..m,
            run: RunIdle,
            runtimes: model.assoc_put(m.runtimes, language, RuntimeLoading),
          ),
          runner.restart(language),
        )
      }
    Running(_, _), Error(Nil) -> #(Model(..m, run: RunIdle), effect.none())
    _, _ -> #(m, effect.none())
  }
}

fn advance(m: Model) -> #(Model, Effect(Msg)) {
  // Before anything else: `m` still points at the problem whose run may be
  // in flight, which is the only moment its language can be resolved.
  let #(m, abandoned) = abandon_run(m)
  let #(next, fx) = advance_inner(m)
  // The grade button just pressed is still under the next problem's prompt
  // page; focused, it would take the Enter meant to start coding.
  #(next, effect.batch([abandoned, fx, run_effect(browser.blur_active)]))
}

fn advance_inner(m: Model) -> #(Model, Effect(Msg)) {
  // Round-robin: walk the whole selection, then come back around for the
  // next pass. Drilling one problem N times in a row before moving on is
  // the thing this deliberately avoids.
  let #(index, iteration) = case m.problem_index + 1 < list.length(m.selected) {
    True -> #(m.problem_index + 1, m.current_iteration)
    False -> #(0, m.current_iteration + 1)
  }

  case iteration > m.iteration_count, m.exam_answers {
    // An exam ends in the report rather than an alert — the score is the
    // entire reason the sitting happened.
    True, [_, ..] -> #(
      // `reset_home` clears `studying`, but the report still needs to know
      // where the sitting began so its back button returns there.
      Model(..reset_home(m), route: ReportRoute, studying: m.studying),
      effect.none(),
    )
    // A drill sitting earns a report too. `reset_home` clears `studying`, so
    // like the exam arm this puts it back for the sake of the back button.
    True, [] -> #(
      Model(
        ..reset_home(m),
        route: SummaryRoute,
        studying: m.studying,
        recall: m.recall,
        blitz: m.blitz,
        sitting: m.sitting,
        undo: m.undo,
      ),
      effect.none(),
    )
    False, _ -> {
      let advanced =
        Model(
          ..m,
          current_iteration: iteration,
          problem_index: index,
          revealed_solution: None,
          hints_revealed: 0,
          slot: NoPane,
          run: RunIdle,
          grading: NotGrading,
          opened_at_ms: browser.now_ms(),
          choice: None,
          graded: False,
        )
      // Retyping is the drill, so a repeat pass starts from the stub. The
      // first time a problem comes up in a manual sitting, a draft is
      // restored if one survived: grading deletes it, so only work you left
      // without grading ever comes back.
      let advanced = case model.current_ref(advanced) {
        Ok(ref) ->
          Model(
            ..model.open_problem_view(advanced, ref),
            draft: case iteration == 1 && !m.studying {
              True -> draft_for(advanced, ref)
              False -> starter_for(ref)
            },
            grading: initial_grading(m, ref),
          )
        Error(Nil) -> Model(..advanced, draft: "")
      }
      case m.recall {
        True -> #(advanced, effect.none())
        False -> with_prefetch(#(advanced, effect.none()))
      }
    }
  }
}

/// Ends a sitting, returning to wherever it started from.
///
/// A scheduled sitting also clears the selection: the study queue was never
/// something the user picked, and leaving it behind would make the next manual
/// drill drag along ten problems they never chose. A manual selection is
/// theirs and survives.
fn reset_home(m: Model) -> Model {
  Model(
    ..reset_to_menu(m),
    route: case m.studying {
      True -> StudyRoute
      False -> MenuRoute
    },
    selected: case m.studying {
      True -> []
      False -> m.selected
    },
    studying: False,
    recall: False,
    blitz: None,
    grading: NotGrading,
    undo: None,
  )
}

/// Which of the queued cards a Blitz may draw from: anything this browser
/// can actually run against the clock. Concept cards have no code, and a
/// guest cannot run the server-side languages, so neither can pass.
fn blitz_pool(m: Model) -> List(ProblemRef) {
  dict.keys(m.cards)
  |> list.filter(fn(ref) {
    case problems.find(ref.category, ref.subcategory, ref.title) {
      Ok(current) ->
        current.quiz == None
        && current.check != None
        && model.run_available(m, current.language)
      Error(Nil) -> False
    }
  })
}

/// `count` refs drawn without replacement, in a random order. Fewer if
/// the pool is smaller.
fn sample(pool: List(ProblemRef), count: Int) -> List(ProblemRef) {
  do_sample(pool, list.length(pool), count, [])
}

fn do_sample(
  pool: List(ProblemRef),
  size: Int,
  remaining: Int,
  acc: List(ProblemRef),
) -> List(ProblemRef) {
  case remaining <= 0 || size <= 0 {
    True -> list.reverse(acc)
    False -> {
      let index = browser.random_int(size)
      let #(before, rest) = list.split(pool, index)
      case rest {
        [chosen, ..after] ->
          do_sample(list.append(before, after), size - 1, remaining - 1, [
            chosen,
            ..acc
          ])
        [] -> list.reverse(acc)
      }
    }
  }
}

/// A solve is clean when nothing was given away: no ladder rung past the
/// nudge, no solution shown, no walk code. The nudge is a question, not an
/// answer, which is why it is allowed.
fn answer_given_away(m: Model) -> Bool {
  case current_problem(m) {
    Ok(current) ->
      model.answer_revealed(m, current.approach) || m.hints_revealed > 1
    Error(Nil) -> False
  }
}

fn draft_for(m: Model, ref: ProblemRef) -> String {
  case model.assoc_get(m.drafts, ref) {
    Ok(text) -> text
    Error(Nil) -> starter_for(ref)
  }
}

fn starter_for(ref: ProblemRef) -> String {
  case problems.find(ref.category, ref.subcategory, ref.title) {
    Ok(p) ->
      case p.check {
        Some(check) -> check.starter
        None -> ""
      }
    Error(Nil) -> ""
  }
}

fn measure_cache() -> Effect(Msg) {
  effect.from(fn(dispatch) {
    browser.runtime_cache_size(fn(bytes) { dispatch(CacheMeasured(bytes)) })
  })
}

fn schedule_draft_save() -> Effect(Msg) {
  effect.from(fn(dispatch) {
    browser.debounce("draft-save", 400, fn() { dispatch(DraftSaveTicked) })
  })
}

fn reset_to_menu(m: Model) -> Model {
  Model(
    ..m,
    route: MenuRoute,
    problem_index: 0,
    current_iteration: 1,
    draft: "",
    revealed_solution: None,
    hints_revealed: 0,
    run: RunIdle,
    choice: None,
    graded: False,
  )
}

/// Questions per sitting, spread flat across the sections rather than in
/// proportion to how many questions each one has. Equal resolution per section
/// is the point: a section sampled twice cannot tell you anything about
/// whether you know it.
const exam_size = 40

/// Take an equal slice of each section, shuffled, then shuffle the result so
/// the questions do not arrive grouped by section. Sections thinner than the
/// slice contribute everything they have, so the exam is smaller than
/// `exam_size` while the pool is still being written.
fn sample_exam() -> List(ProblemRef) {
  let pool = problems.quiz_pool()
  let per_section = case list.length(pool) {
    0 -> 0
    sections -> int.max(1, exam_size / sections)
  }
  pool
  |> list.flat_map(fn(entry) { list.take(shuffle(entry.1), per_section) })
  |> shuffle
}

fn shuffle(items: List(a)) -> List(a) {
  shuffle_loop(items, list.length(items), [])
}

fn shuffle_loop(remaining: List(a), count: Int, acc: List(a)) -> List(a) {
  case count {
    n if n <= 0 -> acc
    _ -> {
      let #(before, rest) = list.split(remaining, browser.random_int(count))
      case rest {
        [picked, ..after] ->
          shuffle_loop(list.append(before, after), count - 1, [picked, ..acc])
        [] -> list.append(acc, remaining)
      }
    }
  }
}

fn current_quiz(m: Model) -> Result(problem.Quiz, Nil) {
  case model.current_ref(m) {
    Ok(ref) ->
      case problems.find(ref.category, ref.subcategory, ref.title) {
        Ok(p) ->
          case p.quiz {
            Some(quiz) -> Ok(quiz)
            None -> Error(Nil)
          }
        Error(Nil) -> Error(Nil)
      }
    Error(Nil) -> Error(Nil)
  }
}

fn toggle_selection(
  selected: List(ProblemRef),
  ref: ProblemRef,
) -> List(ProblemRef) {
  case list.contains(selected, ref) {
    True -> list.filter(selected, fn(r) { r != ref })
    False -> list.append(selected, [ref])
  }
}

fn view(m: Model) -> Element(Msg) {
  case m.boot {
    // The one blocking load. A guest resolves it locally and instantly; an
    // account waits on the network, and a failure there is a dead end worth
    // saying out loud, because the app is online-only once signed in.
    NotStarted | Syncing | SyncFailed(_) -> auth.loading(m)
    Synced -> {
      let screen = case m.route {
        AuthRoute -> auth.view(m)
        PickerRoute -> picker.view(m)
        SettingsRoute -> settings.view(m)
        SummaryRoute -> summary.view(m)
        StudyRoute -> study.view(m)
        StatsRoute -> stats.view(m)
        DrillRoute ->
          case drill.view(m) {
            Ok(el) -> el
            Error(Nil) -> menu.view(m)
          }
        ReportRoute -> report.view(m)
        MenuRoute -> menu.view(m)
        QueueRoute -> manage.view(m)
        TourRoute -> tour_view.view(m)
      }
      // A state load after the first is a thin bar at the top, over
      // whatever is on screen; only the first load gets the loading card.
      let syncing = case m.refreshing {
        True -> [
          html.div(
            [
              attribute.class("sync-bar"),
              attribute.role("progressbar"),
              attribute.attribute("aria-label", "Loading from the server"),
            ],
            [],
          ),
        ]
        False -> []
      }
      case m.route {
        // The sign-in form keeps its focused, chrome-free layout.
        AuthRoute -> element.fragment([screen, ..syncing])
        _ ->
          element.fragment([
            screen,
            statusbar.view(m),
            help.button(m),
            help.view(m),
            ..syncing
          ])
      }
    }
  }
}

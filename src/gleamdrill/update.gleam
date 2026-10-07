//// The controller: update(), the exhaustive message dispatch, and -- for
//// now -- every handler it delegates to. The feature split carves this
//// file next; the entrypoint already only wires init, update and view.

import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleam/result
import gleam/string
import gleamdrill/api
import gleamdrill/browser
import gleamdrill/keys
import gleamdrill/model.{
  type Model, Account, AwaitingGrade, CaseResult, Cases, DrillRoute, Errored,
  Guest, MenuRoute, Model, NoPane, NotePane, Ran, RunError, RunIdle, Running,
  RuntimeFailed, RuntimeLoading, RuntimeNotLoaded, RuntimeReady, SettingsRoute,
  SolutionPane, StudyRoute, TimedOut, TourRoute,
}
import gleamdrill/msg.{
  type Msg, ArchiveReady, ArchiveRestored, AuthCompleted, BlitzExpired,
  BoardJumped, BoardMoved, BoardShelfMoved, BoardToggledAtCursor, CacheMeasured,
  CacheWarmed, CardSuspended, ClockTicked, CompareMoved, ComparePickedVariant,
  DraftSaveTicked, DraftSynced, EditorChanged, EditorFocusRequested,
  EditorResized, ExamSampled, ExitConfirmed, HelpToggled, HistoryLoaded,
  ImportConfirmed, ImportPicked, InsightsLoaded, KeyPressed, MenuActivated,
  MenuCursorJumped, MenuCursorMoved, MenuPaneFocused, MenuSuspendedAtCursor,
  MenuToggledAtCursor, NoteChanged, NoteFocusRequested, NoteSaveTicked,
  NoteSynced, QueueChanged, QueueCursorJumped, QueueCursorMoved,
  QueueToggledAtCursor, QueuesSaved, QuizMoved, RemoteRunFinished,
  ReviewRecorded, RunFinished, RunTimedOut, RunnerFailed, RunnerReady,
  RuntimeLoadTimedOut, SearchFocusRequested, SettingsSaved, SignOutCompleted,
  StateImported, StateLoaded, StatsActivated, StatsCursorMoved, StatsLoaded,
  TourActivated, TourCursorMoved, TourEditorChanged, TourRunTicked, UndoRecorded,
  UserAddedAllShown, UserAddedSelectionToQueue, UserAddedStarterSet,
  UserCancelledQueueName, UserChangedAuthEmail, UserChangedAuthPassword,
  UserChangedGroup, UserChangedIterations, UserChangedKeymap,
  UserChangedQueueName, UserChangedSetting, UserClickedBackToStudy,
  UserClickedBreadcrumb, UserClickedBrowse, UserClickedClearSelection,
  UserClickedCompare, UserClickedDeviceTimezone, UserClickedExitDrill,
  UserClickedExitReport, UserClickedExport, UserClickedImport,
  UserClickedMergeGuest, UserClickedNext, UserClickedQueue, UserClickedRecall,
  UserClickedRetryRuntime, UserClickedRetrySync, UserClickedRun,
  UserClickedScratchRun, UserClickedSelectAll, UserClickedSettings,
  UserClickedSignIn, UserClickedSignOut, UserClickedStartDrill,
  UserClickedStartExam, UserClickedStats, UserClickedStopRun, UserClickedStudy,
  UserClickedSubcategory, UserClickedTour, UserClickedTourContents,
  UserClickedTourNext, UserClickedTourPrev, UserClickedTracks, UserClickedUndo,
  UserClickedWarmCache, UserClosedCompare, UserClosedDetail, UserDeletedQueue,
  UserDismissedDiff, UserDismissedMergeOffer, UserDismissedNotice,
  UserDismissedUpgradePrompt, UserFilteredQueue, UserGraded, UserOpenedDetail,
  UserOpenedLesson, UserPickedActiveQueue, UserPickedChoice, UserPickedTrack,
  UserPickedTrackWithStarter, UserRemovedAllShown, UserResetLesson,
  UserRevealedRecall, UserRevealedWholeThing, UserSearched, UserSearchedQueue,
  UserSelectedQueue, UserStartedBlitz, UserStartedNewQueue,
  UserStartedRenameQueue, UserSubmittedAnswer, UserSubmittedAuth,
  UserSubmittedBoard, UserSubmittedQueueName, UserToggledAuthMode,
  UserToggledBlitz, UserToggledDiff, UserToggledNudge, UserToggledPane,
  UserToggledPiece, UserToggledProblem, UserToggledPrompt, UserToggledQueued,
  UserToggledResults, UserToggledSolution, UserToggledSuspend, WalkAdvanced,
  WalkBacked, WalkCodeShown, WalkFocused, WalkHintShown, WalkWhyShown,
}
import gleamdrill/remote
import gleamdrill/runner
import gleamdrill/store
import gleamdrill/update/blitz as blitz_update
import gleamdrill/update/board as board_update
import gleamdrill/update/common
import gleamdrill/update/compare as compare_update
import gleamdrill/update/menu as menu_update
import gleamdrill/update/queues as queues_update
import gleamdrill/update/review as review_update
import gleamdrill/update/session as session_update
import gleamdrill/update/stats
import gleamdrill/update/tour as tour_update
import gleamdrill/update/transfer
import gleamdrill/walk
import lustre/effect.{type Effect}
import wire

fn focus_walk(m: Model, index: Int) -> Model {
  let total = case common.current_problem(m) {
    Ok(current) -> list.length(walk.walk_steps(current.approach))
    Error(Nil) -> 0
  }
  Model(..m, walk: walk.focus_step(m.walk, index, total))
}

pub fn update(m: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  let #(next, effect) = handle(m, msg)
  // The drill clock starts on the way into a drill, wherever that came
  // from, and `ClockTicked` keeps it going only while the drill is up.
  case m.route != DrillRoute && next.route == DrillRoute {
    True -> #(
      Model(..next, now_ms: browser.now_ms()),
      effect.batch([effect, common.tick()]),
    )
    False -> #(next, effect)
  }
}

fn handle(m: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  case msg {
    // --- keyboard ---
    KeyPressed(key) -> {
      // The `,` leader: one-shot rescue for keys a focused button would
      // otherwise swallow. Arms from anywhere but the editor and inputs;
      // the next key routes through the app's table regardless of focus.
      let leader_capable = key.editing != "editor" && key.editing != "input"
      case m.prefix_armed, key.key == "," && leader_capable {
        False, True -> #(Model(..m, prefix_armed: True), effect.none())
        True, _ -> {
          let m = Model(..m, prefix_armed: False)
          case leader_capable && key.key != "," && key.key != "Escape" {
            True ->
              case keys.dispatch(m, msg.Key(..key, editing: "none")) {
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
      common.run_effect(fn() { browser.focus_element("gleam-editor") }),
    )

    SearchFocusRequested -> menu_update.focus_search(m)

    MenuCursorMoved(delta) -> menu_update.cursor_moved(m, delta)

    MenuCursorJumped(first) -> menu_update.cursor_jumped(m, first)

    MenuPaneFocused(direction) -> menu_update.focus_pane(m, direction)

    MenuActivated -> menu_update.activate_cursor(m)

    MenuToggledAtCursor -> menu_update.activate_cursor(m)

    // `z` in the browser: park the cursor row's card. Only rows with a card
    // react — an unseen problem has nothing to suspend.
    MenuSuspendedAtCursor ->
      case menu_update.cursor_ref(m) {
        Ok(ref) -> handle(m, UserToggledSuspend(ref))
        Error(Nil) -> #(m, effect.none())
      }

    QuizMoved(delta) -> board_update.quiz_moved(m, delta)
    BoardMoved(delta) -> board_update.moved(m, delta)
    BoardShelfMoved(delta) -> board_update.shelf_moved(m, delta)
    BoardJumped(to_top) -> board_update.jumped(m, to_top)
    BoardToggledAtCursor -> board_update.toggled_at_cursor(m)

    // --- session ---
    UserChangedAuthEmail(value) -> session_update.auth_email(m, value)
    UserChangedAuthPassword(value) -> session_update.auth_password(m, value)
    UserToggledAuthMode -> session_update.toggle_auth_mode(m)
    UserSubmittedAuth -> session_update.submit_auth(m)
    AuthCompleted(result) -> session_update.auth_completed(m, result)
    StateLoaded(result) -> session_update.state_loaded(m, result)
    UserClickedRetrySync -> session_update.retry_sync(m)
    StateImported(result) -> session_update.state_imported(m, result)
    UserClickedMergeGuest -> session_update.merge_guest(m)
    UserDismissedMergeOffer -> session_update.dismiss_merge_offer(m)
    UserClickedSignOut -> session_update.sign_out(m)
    SignOutCompleted(_) -> #(m, effect.none())
    UserDismissedNotice -> #(Model(..m, notice: None), effect.none())
    UserDismissedUpgradePrompt -> session_update.dismiss_upgrade_prompt(m)
    UserClickedSignIn(mode) -> session_update.sign_in(m, mode)

    // --- the scheduler ---
    UserClickedStudy -> review_update.start_study(m)
    UserClickedRecall -> review_update.start_recall(m)
    UserRevealedRecall -> review_update.reveal_recall(m)

    UserClickedBrowse -> #(Model(..m, route: MenuRoute), effect.none())

    UserClickedBackToStudy -> #(Model(..m, route: StudyRoute), effect.none())

    UserClickedStats -> stats.open(m)
    StatsLoaded(result) -> stats.loaded(m, result)
    InsightsLoaded(result) -> stats.insights_loaded(m, result)
    StatsCursorMoved(delta) -> stats.cursor_moved(m, delta)
    StatsActivated -> stats.activated(m)
    UserOpenedDetail(problem) -> stats.open_detail(m, problem)
    UserClosedDetail -> stats.close_detail(m)
    HistoryLoaded(problem, result) -> stats.history_loaded(m, problem, result)

    UserGraded(rating) -> review_update.graded(m, rating)
    ReviewRecorded(result) -> review_update.recorded(m, result)

    UserToggledDiff -> #(Model(..m, diff_mode: !m.diff_mode), effect.none())

    UserDismissedDiff -> #(Model(..m, slot: NoPane), effect.none())

    UserClickedUndo -> review_update.undo(m)
    UndoRecorded(point, result) -> review_update.undo_recorded(m, point, result)

    DraftSynced(Ok(Nil)) -> #(m, effect.none())
    // A failed sync is silent data loss: the typing looked saved and was not.
    // Same surfacing as a failed review write; the next keystroke retries.
    DraftSynced(Error(failure)) -> #(
      Model(
        ..m,
        storage_full: m.mode == Guest || m.storage_full,
        notice: Some(remote.error_message(failure)),
      ),
      effect.none(),
    )

    UserClickedSubcategory(name) -> menu_update.clicked_subcategory(m, name)

    UserClickedBreadcrumb(level) ->
      // One crumb deep now: the track is the root, and it is changed on the
      // switcher rather than here.
      case level {
        _ -> #(Model(..m, selected_subcategory: None), effect.none())
      }

    UserToggledProblem(ref) -> menu_update.toggle_problem(m, ref)

    UserClickedSelectAll -> menu_update.select_all(m)

    UserClickedClearSelection -> menu_update.clear_selection(m)

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
          common.with_prefetch(#(
            Model(
              ..model.open_problem_view(m, first),
              route: DrillRoute,
              problem_index: 0,
              current_iteration: 1,
              // A hand-picked sitting still ends where it started.
              studying: False,
              draft: common.draft_for(m, first),
              run: RunIdle,
              // Without this a reveal-only drill -- Elixir has no harness at
              // all -- would sit forever on "run the tests to grade this" with
              // no tests to run, and could never be scheduled.
              grading: common.initial_grading(m, first),
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

    UserClickedStartExam -> blitz_update.start_exam(m)
    ExamSampled(refs) -> blitz_update.exam_sampled(m, refs)
    UserClickedExitReport -> blitz_update.exit_report(m)

    UserPickedChoice(index) -> board_update.picked_choice(m, index)
    UserSubmittedAnswer -> board_update.submitted_answer(m)
    UserToggledPiece(id) -> board_update.toggle_piece(m, id)
    UserSubmittedBoard -> board_update.submitted_board(m)

    UserClickedExitDrill -> #(
      Model(
        ..m,
        exit_prompt: Some(case common.current_quiz(m), m.studying {
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
      common.run_effect(browser.blur_active),
    )

    // `common.reset_home`, not `common.reset_to_menu`: a sitting started from the study
    // queue must end back on the study screen. Landing in the manual browser
    // is disorienting when that is not where you came from.
    ExitConfirmed(True) -> {
      let #(m, abandoned) = common.abandon_run(Model(..m, exit_prompt: None))
      #(common.reset_home(m), abandoned)
    }
    ExitConfirmed(False) -> #(Model(..m, exit_prompt: None), effect.none())

    ClockTicked -> {
      let now_ms = browser.now_ms()
      case m.route, m.blitz {
        // A Blitz card past its deadline is over: recorded as a miss and
        // the next one opens. Grading is skipped -- nothing was solved.
        DrillRoute, Some(blitz) if now_ms >= blitz.deadline_ms ->
          blitz_update.expired(Model(..m, now_ms:))
        DrillRoute, _ -> #(Model(..m, now_ms:), common.tick())
        _, _ -> #(m, effect.none())
      }
    }

    UserToggledBlitz -> blitz_update.toggle_chooser(m)
    UserStartedBlitz(count, per_card_ms) ->
      blitz_update.start(m, count, per_card_ms)
    BlitzExpired -> blitz_update.expired(m)

    UserToggledNudge -> #(
      Model(..m, nudge_shown: !m.nudge_shown),
      effect.none(),
    )

    // Moving the focus reveals nothing: every step's title is on the rail
    // from the moment the problem opens, so walking them is free. Which is
    // why this clamps rather than counting how far anyone has got.
    WalkFocused(index) -> #(focus_walk(m, index), effect.none())
    WalkAdvanced -> #(focus_walk(m, m.walk.focus + 1), effect.none())
    WalkBacked -> #(focus_walk(m, m.walk.focus - 1), effect.none())

    WalkHintShown -> #(
      Model(..m, walk: walk.reveal_layer(m.walk, walk.HintLayer)),
      effect.none(),
    )

    WalkWhyShown -> #(
      Model(..m, walk: walk.reveal_layer(m.walk, walk.WhyLayer)),
      effect.none(),
    )

    // A slice is a piece of the pseudocode, so this is the one layer that
    // goes on the review log.
    WalkCodeShown -> #(
      Model(
        ..m,
        walk: walk.reveal_layer(m.walk, walk.CodeLayer),
        walk_code_seen: True,
      ),
      effect.none(),
    )

    UserRevealedWholeThing -> #(
      Model(..m, whole_thing_shown: True),
      effect.none(),
    )

    // The solution shown is chosen; its button again closes the pane, but
    // the choice stands -- the log records that it was seen.
    UserToggledSolution(index) ->
      case m.slot, m.revealed_solution {
        SolutionPane, Some(current) if current == index -> #(
          Model(..m, slot: NoPane),
          effect.none(),
        )
        _, _ -> #(
          Model(..m, slot: SolutionPane, revealed_solution: Some(index)),
          effect.none(),
        )
      }

    UserToggledPrompt -> {
      let m = Model(..m, prompt_open: !m.prompt_open)
      #(m, common.save_preferences(m))
    }

    UserToggledPane(pane) ->
      case pane, m.slot == pane {
        // Opening the note is focusing it; closing is just closing.
        NotePane, True -> #(Model(..m, slot: NoPane), effect.none())
        NotePane, False -> handle(m, NoteFocusRequested)
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

    UserClickedNext -> common.advance(m)

    UserSearched(query) -> menu_update.searched(m, query)

    UserChangedKeymap(mode) -> {
      let m = Model(..m, editor_keymap: mode)
      #(m, common.save_preferences(m))
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
      #(m, common.save_preferences(m))
    }

    UserClickedSettings -> #(
      Model(..m, route: SettingsRoute),
      common.measure_cache(),
    )

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
          common.measure_cache(),
        )
        True, True -> #(Model(..m, warming: None), common.measure_cache())
        True, False -> #(
          Model(..m, warming: Some(#(done, total))),
          effect.none(),
        )
      }

    CacheMeasured(bytes) -> #(Model(..m, cache_bytes: bytes), effect.none())

    // --- the Gleam Language Tour ---
    UserClickedTour -> tour_update.open_contents(m)
    UserOpenedLesson(index) -> tour_update.open_lesson(m, index)
    UserClickedTourNext -> tour_update.next(m)
    UserClickedTourPrev -> tour_update.prev(m)
    UserClickedTourContents -> tour_update.to_contents(m)
    UserResetLesson -> tour_update.reset_lesson(m)
    TourEditorChanged(text) -> tour_update.editor_changed(m, text)
    TourRunTicked -> tour_update.run_ticked(m)
    TourCursorMoved(delta) -> tour_update.cursor_moved(m, delta)
    TourActivated -> tour_update.activated(m)

    UserChangedSetting(field, raw) ->
      session_update.changed_setting(m, field, raw)
    UserClickedDeviceTimezone -> session_update.device_timezone(m)
    SettingsSaved(result) -> session_update.settings_saved(m, result)

    // --- export and import ---
    UserClickedExport -> transfer.export(m)
    ArchiveReady(result) -> transfer.archive_ready(m, result)
    UserClickedImport -> transfer.pick_import(m)
    ImportPicked(text) -> transfer.import_picked(m, text)
    ImportConfirmed(replace) -> transfer.import_confirmed(m, replace)
    ArchiveRestored(result) -> transfer.restored(m, result)

    UserClickedTracks -> menu_update.open_tracks(m)
    UserPickedTrack(name) -> menu_update.enter_track(m, name, starter: False)
    UserPickedTrackWithStarter(name) ->
      menu_update.enter_track(m, name, starter: True)

    // From the study screen's empty state: twenty easy problems in the track
    // already open, no screen in between.
    UserAddedStarterSet -> queues_update.add_starter_set(m)

    UserToggledSuspend(ref) -> review_update.toggle_suspend(m, ref)
    CardSuspended(result) -> review_update.card_suspended(m, result)

    // --- managing the queue ---
    UserClickedQueue -> queues_update.open(m)
    UserPickedActiveQueue(name) -> queues_update.pick_active(m, name)
    UserSelectedQueue(name) -> queues_update.select(m, name)
    UserStartedNewQueue -> queues_update.start_new(m)
    UserStartedRenameQueue -> queues_update.start_rename(m)
    UserChangedQueueName(text) -> queues_update.name_changed(m, text)
    UserCancelledQueueName -> queues_update.cancel_naming(m)
    UserSubmittedQueueName -> queues_update.submit_name(m)
    UserDeletedQueue -> queues_update.delete(m)
    UserAddedSelectionToQueue(target) -> queues_update.add_selection(m, target)
    QueuesSaved(result) -> queues_update.saved(m, result)

    // --- compare ---
    UserClickedCompare -> compare_update.open(m)
    CompareMoved(delta) -> compare_update.moved(m, delta)
    ComparePickedVariant(side, index) ->
      compare_update.picked_variant(m, side, index)
    UserClosedCompare -> compare_update.close(m)

    UserSearchedQueue(text) -> queues_update.searched(m, text)
    UserFilteredQueue(filter) -> queues_update.filtered(m, filter)
    UserChangedGroup(change) -> queues_update.group_changed(m, change)
    UserToggledQueued(ref) -> queues_update.toggle_queued(m, ref)
    UserAddedAllShown -> queues_update.add_all_shown(m)
    UserRemovedAllShown -> queues_update.remove_all_shown(m)
    QueueCursorMoved(delta) -> queues_update.cursor_moved(m, delta)
    QueueCursorJumped(first) -> queues_update.cursor_jumped(m, first)
    QueueToggledAtCursor -> queues_update.toggled_at_cursor(m)
    QueueChanged(result) -> queues_update.changed(m, result)

    EditorChanged(text) -> {
      // Study-rep typing is throwaway in memory as well as on disk: updating
      // the assoc here would let a manual open minutes later restore the
      // answer you just typed from memory, which is the leak the study reset
      // exists to prevent.
      let drafts = case model.current_ref(m), m.studying {
        Ok(ref), False -> model.assoc_put(m.drafts, ref, text)
        _, _ -> m.drafts
      }
      #(Model(..m, draft: text, drafts: drafts), common.schedule_draft_save())
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
        notice: Some(remote.error_message(failure)),
      ),
      effect.none(),
    )

    NoteFocusRequested -> #(
      Model(..m, slot: NotePane),
      common.focus_after_render(".note-input"),
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

    UserClickedStopRun -> common.abandon_run(m)

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
      let m = case m.blitz, m.route, common.current_language(m) {
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
        "gleam", RunIdle -> common.run_tour_lesson(m)
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
            && case common.current_problem(m) {
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
              DrillRoute -> common.run_effect(browser.blur_active)
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
        Running(current, _), Error(remote.Unauthorised) if current == id ->
          handle(
            Model(..m, run: RunIdle),
            StateLoaded(Error(remote.Unauthorised)),
          )
        Running(current, _), Error(failure) if current == id -> #(
          Model(..m, run: RunIdle, notice: Some(remote.error_message(failure))),
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
          case m.route, common.current_language(m) {
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

fn handle_key(m: Model, key: msg.Key) -> #(Model, Effect(Msg)) {
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
        "Escape" -> #(m, common.run_effect(browser.blur_active))
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
      case common.current_language(m), common.current_check(m) {
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
          common.api_base(),
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
      let #(next, fx) = common.start_local_run(m, language, m.draft, harness)
      #(Model(..next, run_kind: kind), fx)
    }
  }
}
/// Move the board cursor, clamped, and scroll the chip into view -- the
/// palette is taller than the viewport on a phone, so a cursor that moved
/// without scrolling would leave the keyboard driving something off screen.

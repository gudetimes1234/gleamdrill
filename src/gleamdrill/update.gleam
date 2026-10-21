//// The controller: update() and the exhaustive message dispatch. Every arm
//// delegates to a named handler in an `update/` feature module; there is no
//// catch-all, so a new Msg variant does not compile until it is routed.
////
//// A handler that hands off to another feature takes `handle` back as
//// `dispatch` and re-enters with a message, so no `update/` module imports
//// another (`update/common` aside).

import gleamdrill/model.{type Model, DrillRoute, Model}
import gleamdrill/msg.{
  type Msg, AuthMsg, BlitzExpired, BoardJumped, BoardMoved, BoardShelfMoved,
  BoardToggledAtCursor, CardSuspended, ClockTicked, CompareMoved,
  ComparePickedVariant, DraftSaveTicked, DraftSynced, EditorChanged,
  EditorFocusRequested, EditorResized, ExamSampled, ExitConfirmed, HelpToggled,
  HistoryLoaded, InsightsLoaded, KeyPressed, MenuActivated, MenuCursorJumped,
  MenuCursorMoved, MenuPaneFocused, MenuSuspendedAtCursor, MenuToggledAtCursor,
  NoteChanged, NoteFocusRequested, NoteSaveTicked, NoteSynced, QueueChanged,
  QueueCursorJumped, QueueCursorMoved, QueueToggledAtCursor, QueuesSaved,
  QuizMoved, RemoteRunFinished, ReviewRecorded, RunFinished, RunTimedOut,
  RunnerFailed, RunnerReady, RuntimeLoadTimedOut, SearchFocusRequested,
  SettingsMsg, SignOutCompleted, StateImported, StateLoaded, StatsActivated,
  StatsCursorMoved, StatsLoaded, TourActivated, TourCursorMoved,
  TourEditorChanged, TourRunTicked, TracksMsg, UndoRecorded, UserAddedAllShown,
  UserAddedSelectionToQueue, UserAddedStarterSet, UserCancelledQueueName,
  UserChangedGroup, UserChangedIterations, UserChangedKeymap,
  UserChangedQueueName, UserClickedBackToStudy, UserClickedBreadcrumb,
  UserClickedBrowse, UserClickedClearSelection, UserClickedCompare,
  UserClickedExitDrill, UserClickedExitReport, UserClickedMergeGuest,
  UserClickedNext, UserClickedQueue, UserClickedRecall, UserClickedRetryRuntime,
  UserClickedRetrySync, UserClickedRun, UserClickedScratchRun,
  UserClickedSelectAll, UserClickedSettings, UserClickedSignIn,
  UserClickedSignOut, UserClickedStartDrill, UserClickedStartExam,
  UserClickedStats, UserClickedStopRun, UserClickedStudy, UserClickedSubcategory,
  UserClickedTour, UserClickedTourContents, UserClickedTourNext,
  UserClickedTourPrev, UserClickedTracks, UserClickedUndo, UserClosedCompare,
  UserClosedDetail, UserDeletedQueue, UserDismissedDiff, UserDismissedMergeOffer,
  UserDismissedNotice, UserDismissedUpgradePrompt, UserFilteredQueue, UserGraded,
  UserOpenedDetail, UserOpenedLesson, UserPickedActiveQueue, UserPickedChoice,
  UserRemovedAllShown, UserResetLesson, UserRevealedRecall,
  UserRevealedWholeThing, UserSearched, UserSearchedQueue, UserSelectedQueue,
  UserStartedBlitz, UserStartedNewQueue, UserStartedRenameQueue,
  UserSubmittedAnswer, UserSubmittedBoard, UserSubmittedQueueName,
  UserToggledBlitz, UserToggledDiff, UserToggledNudge, UserToggledPane,
  UserToggledPiece, UserToggledProblem, UserToggledPrompt, UserToggledQueued,
  UserToggledResults, UserToggledSolution, UserToggledSuspend, UserToggledTimer,
  WalkAdvanced, WalkBacked, WalkCodeShown, WalkFocused, WalkHintShown,
  WalkWhyShown,
}
import gleamdrill/platform/browser
import gleamdrill/update/blitz as blitz_update
import gleamdrill/update/board as board_update
import gleamdrill/update/common
import gleamdrill/update/compare as compare_update
import gleamdrill/update/drill as drill_update
import gleamdrill/update/keyboard
import gleamdrill/update/menu as menu_update
import gleamdrill/update/queues as queues_update
import gleamdrill/update/review as review_update
import gleamdrill/update/run as run_update
import gleamdrill/update/session as session_update
import gleamdrill/update/stats
import gleamdrill/update/tour as tour_update
import lustre/effect.{type Effect}

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
    // Pages and the navigation into them belong to `app`, which routes
    // these before the flat model ever sees them.
    AuthMsg(_)
    | SettingsMsg(_)
    | TracksMsg(_)
    | UserClickedSignIn(_)
    | UserClickedSettings -> #(m, effect.none())

    // --- keyboard ---
    KeyPressed(key) -> keyboard.pressed(m, key, handle)
    HelpToggled -> keyboard.toggle_help(m)

    EditorFocusRequested -> drill_update.focus_editor(m)

    SearchFocusRequested -> menu_update.focus_search(m)

    MenuCursorMoved(delta) -> menu_update.cursor_moved(m, delta)

    MenuCursorJumped(first) -> menu_update.cursor_jumped(m, first)

    MenuPaneFocused(direction) -> menu_update.focus_pane(m, direction)

    MenuActivated -> menu_update.activate_cursor(m)

    MenuToggledAtCursor -> menu_update.activate_cursor(m)

    MenuSuspendedAtCursor -> menu_update.suspend_at_cursor(m, handle)

    QuizMoved(delta) -> board_update.quiz_moved(m, delta)
    BoardMoved(delta) -> board_update.moved(m, delta)
    BoardShelfMoved(delta) -> board_update.shelf_moved(m, delta)
    BoardJumped(to_top) -> board_update.jumped(m, to_top)
    BoardToggledAtCursor -> board_update.toggled_at_cursor(m)

    // --- session ---
    StateLoaded(result) -> session_update.state_loaded(m, result)
    UserClickedRetrySync -> session_update.retry_sync(m)
    StateImported(result) -> session_update.state_imported(m, result)
    UserClickedMergeGuest -> session_update.merge_guest(m)
    UserDismissedMergeOffer -> session_update.dismiss_merge_offer(m)
    UserClickedSignOut -> session_update.sign_out(m)
    SignOutCompleted(_) -> session_update.sign_out_completed(m)
    UserDismissedNotice -> session_update.dismiss_notice(m)
    UserDismissedUpgradePrompt -> session_update.dismiss_upgrade_prompt(m)

    // --- the scheduler ---
    UserClickedStudy -> review_update.start_study(m)
    UserClickedRecall -> review_update.start_recall(m)
    UserRevealedRecall -> review_update.reveal_recall(m)

    UserClickedBrowse -> menu_update.browse(m)

    UserClickedBackToStudy -> review_update.back_to_study(m)

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

    UserToggledDiff -> drill_update.toggle_diff(m)
    UserDismissedDiff -> drill_update.dismiss_diff(m)

    UserClickedUndo -> review_update.undo(m)
    UndoRecorded(point, result) -> review_update.undo_recorded(m, point, result)

    DraftSynced(result) -> drill_update.draft_synced(m, result)

    UserClickedSubcategory(name) -> menu_update.clicked_subcategory(m, name)

    UserClickedBreadcrumb(_) -> menu_update.clicked_breadcrumb(m)

    UserToggledProblem(ref) -> menu_update.toggle_problem(m, ref)

    UserClickedSelectAll -> menu_update.select_all(m)

    UserClickedClearSelection -> menu_update.clear_selection(m)

    UserChangedIterations(raw) -> drill_update.changed_iterations(m, raw)
    UserClickedStartDrill -> drill_update.start_drill(m)

    UserClickedStartExam -> blitz_update.start_exam(m)
    ExamSampled(refs) -> blitz_update.exam_sampled(m, refs)
    UserClickedExitReport -> blitz_update.exit_report(m)

    UserPickedChoice(index) -> board_update.picked_choice(m, index)
    UserSubmittedAnswer -> board_update.submitted_answer(m)
    UserToggledPiece(id) -> board_update.toggle_piece(m, id)
    UserSubmittedBoard -> board_update.submitted_board(m)

    UserClickedExitDrill -> drill_update.exit_requested(m)
    ExitConfirmed(leave) -> drill_update.exit_confirmed(m, leave)
    ClockTicked -> drill_update.clock_ticked(m, handle)

    UserToggledBlitz -> blitz_update.toggle_chooser(m)
    UserStartedBlitz(count, per_card_ms) ->
      blitz_update.start(m, count, per_card_ms)
    BlitzExpired -> blitz_update.expired(m)

    UserToggledNudge -> drill_update.toggle_nudge(m)
    UserToggledTimer -> drill_update.toggle_timer(m)
    WalkFocused(index) -> drill_update.walk_focused(m, index)
    WalkAdvanced -> drill_update.walk_advanced(m)
    WalkBacked -> drill_update.walk_backed(m)
    WalkHintShown -> drill_update.walk_hint(m)
    WalkWhyShown -> drill_update.walk_why(m)
    WalkCodeShown -> drill_update.walk_code(m)
    UserRevealedWholeThing -> drill_update.reveal_whole_thing(m)
    UserToggledSolution(index) -> drill_update.toggle_solution(m, index)
    UserToggledPrompt -> drill_update.toggle_prompt(m)
    UserToggledPane(pane) -> drill_update.toggle_pane(m, pane)
    UserClickedNext -> common.advance(m)

    UserSearched(query) -> menu_update.searched(m, query)

    UserChangedKeymap(mode) -> drill_update.changed_keymap(m, mode)
    UserToggledResults -> drill_update.toggle_results(m)
    EditorResized(height) -> drill_update.editor_resized(m, height)

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

    // --- export and import ---
    UserClickedTracks -> menu_update.open_tracks(m)

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

    EditorChanged(text) -> drill_update.editor_changed(m, text)
    NoteChanged(text) -> drill_update.note_changed(m, text)
    NoteSynced(result) -> drill_update.note_synced(m, result)
    NoteFocusRequested -> drill_update.focus_note(m)
    DraftSaveTicked -> drill_update.draft_save_ticked(m)
    NoteSaveTicked -> drill_update.note_save_ticked(m)

    UserClickedRun -> run_update.request(m, model.TestRun)
    UserClickedScratchRun -> run_update.request(m, model.ScratchRun)
    UserClickedStopRun -> common.abandon_run(m)
    UserClickedRetryRuntime(language) -> run_update.retry_runtime(m, language)
    RunnerReady(language) -> run_update.runner_ready(m, language)
    RunnerFailed(language, message) ->
      run_update.runner_failed(m, language, message)
    RunFinished(id, outcome, stdout) ->
      run_update.finished(m, id, outcome, stdout)
    RemoteRunFinished(id, result) ->
      run_update.remote_finished(m, id, result, handle)
    RunTimedOut(id) -> run_update.timed_out(m, id)
    RuntimeLoadTimedOut(language) ->
      run_update.runtime_load_timed_out(m, language)
  }
}

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
  BoardToggledAtCursor, BrowseMsg, CardSuspended, ClockTicked, DraftSaveTicked,
  DraftSynced, EditorChanged, EditorFocusRequested, EditorResized, ExamSampled,
  ExitConfirmed, HelpToggled, InsightsLoaded, KeyPressed, NoteChanged,
  NoteFocusRequested, NoteSaveTicked, NoteSynced, QueueChanged, QueueMsg,
  QueuesSaved, QuizMoved, RemoteRunFinished, ReviewRecorded, RunFinished,
  RunTimedOut, RunnerFailed, RunnerReady, RuntimeLoadTimedOut, SettingsMsg,
  SignOutCompleted, StateImported, StateLoaded, StatsLoaded, StatsMsg, StudyMsg,
  TourMsg, TracksMsg, UndoRecorded, UserAddedSelectionToQueue,
  UserAddedStarterSet, UserChangedIterations, UserChangedKeymap,
  UserClickedBackToStudy, UserClickedBrowse, UserClickedExitDrill,
  UserClickedExitReport, UserClickedMergeGuest, UserClickedNext,
  UserClickedQueue, UserClickedRecall, UserClickedRetryRuntime,
  UserClickedRetrySync, UserClickedRun, UserClickedScratchRun,
  UserClickedSettings, UserClickedSignIn, UserClickedSignOut,
  UserClickedStartDrill, UserClickedStartExam, UserClickedStats,
  UserClickedStopRun, UserClickedStudy, UserClickedTour, UserClickedTracks,
  UserClickedUndo, UserDismissedDiff, UserDismissedMergeOffer,
  UserDismissedNotice, UserDismissedUpgradePrompt, UserGraded, UserPickedChoice,
  UserRevealedRecall, UserRevealedWholeThing, UserStartedBlitz,
  UserSubmittedAnswer, UserSubmittedBoard, UserToggledDiff, UserToggledNudge,
  UserToggledPane, UserToggledPiece, UserToggledPrompt, UserToggledResults,
  UserToggledSolution, UserToggledSuspend, UserToggledTimer, WalkAdvanced,
  WalkBacked, WalkCodeShown, WalkFocused, WalkHintShown, WalkWhyShown,
}
import gleamdrill/platform/browser
import gleamdrill/update/blitz as blitz_update
import gleamdrill/update/board as board_update
import gleamdrill/update/common
import gleamdrill/update/drill as drill_update
import gleamdrill/update/keyboard
import gleamdrill/update/menu as menu_update
import gleamdrill/update/queues as queues_update
import gleamdrill/update/review as review_update
import gleamdrill/update/run as run_update
import gleamdrill/update/session as session_update
import gleamdrill/update/stats
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
    | StatsMsg(_)
    | QueueMsg(_)
    | BrowseMsg(_)
    | StudyMsg(_)
    | TourMsg(_)
    | UserClickedTour
    | UserClickedBrowse
    | UserClickedQueue
    | UserClickedStats
    | UserClickedSignIn(_)
    | UserClickedSettings -> #(m, effect.none())

    // --- keyboard ---
    KeyPressed(key) -> keyboard.pressed(m, key, handle)
    HelpToggled -> keyboard.toggle_help(m)

    EditorFocusRequested -> drill_update.focus_editor(m)

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

    UserClickedBackToStudy -> review_update.back_to_study(m)

    StatsLoaded(result) -> stats.loaded(m, result)
    InsightsLoaded(result) -> stats.insights_loaded(m, result)

    UserGraded(rating) -> review_update.graded(m, rating)
    ReviewRecorded(result) -> review_update.recorded(m, result)

    UserToggledDiff -> drill_update.toggle_diff(m)
    UserDismissedDiff -> drill_update.dismiss_diff(m)

    UserClickedUndo -> review_update.undo(m)
    UndoRecorded(point, result) -> review_update.undo_recorded(m, point, result)

    DraftSynced(result) -> drill_update.draft_synced(m, result)

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

    UserChangedKeymap(mode) -> drill_update.changed_keymap(m, mode)
    UserToggledResults -> drill_update.toggle_results(m)
    EditorResized(height) -> drill_update.editor_resized(m, height)

    // --- the Gleam Language Tour ---
    // --- export and import ---
    UserClickedTracks -> menu_update.open_tracks(m)

    // From the study screen's empty state: twenty easy problems in the track
    // already open, no screen in between.
    UserAddedStarterSet -> queues_update.add_starter_set(m)

    UserToggledSuspend(ref) -> review_update.toggle_suspend(m, ref)
    CardSuspended(result) -> review_update.card_suspended(m, result)

    // --- managing the queue ---
    UserAddedSelectionToQueue(target) -> queues_update.add_selection(m, target)
    QueuesSaved(result) -> queues_update.saved(m, result)

    // --- compare ---
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

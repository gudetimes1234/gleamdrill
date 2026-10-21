//// The shared state's own messages: the session, the loads every screen
//// reads, the queue and card answers several screens cause, and the run
//// engine. One exhaustive case with no catch-all, so a new message does not
//// compile until it is routed.
////
//// Page messages, navigation into pages and starting a sitting belong to
//// `app`, which routes them before they reach here; they are named below
//// only to keep the case exhaustive.

import gleam/int
import gleamdrill/model.{type Model, Model}
import gleamdrill/msg.{
  type Msg, AuthMsg, BrowseMsg, CardSuspended, ExamSampled, HelpToggled,
  InsightsLoaded, KeyPressed, QueueChanged, QueueMsg, QueuesSaved,
  RemoteRunFinished, RunFinished, RunTimedOut, RunnerFailed, RunnerReady,
  RuntimeLoadTimedOut, SettingsMsg, SignOutCompleted, SittingMsg, StateImported,
  StateLoaded, StatsLoaded, StatsMsg, StudyMsg, TourMsg, TracksMsg,
  UserAddedSelectionToQueue, UserAddedStarterSet, UserChangedIterations,
  UserClickedBackToStudy, UserClickedBrowse, UserClickedMergeGuest,
  UserClickedQueue, UserClickedRecall, UserClickedRetrySync, UserClickedSettings,
  UserClickedSignIn, UserClickedSignOut, UserClickedStartDrill,
  UserClickedStartExam, UserClickedStats, UserClickedStudy, UserClickedTour,
  UserClickedTracks, UserDismissedMergeOffer, UserDismissedNotice,
  UserDismissedUpgradePrompt, UserStartedBlitz, UserToggledSuspend,
}
import gleamdrill/update/keyboard
import gleamdrill/update/menu as menu_update
import gleamdrill/update/queues as queues_update
import gleamdrill/update/review as review_update
import gleamdrill/update/run as run_update
import gleamdrill/update/session as session_update
import gleamdrill/update/stats
import lustre/effect.{type Effect}

pub fn update(m: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  case msg {
    AuthMsg(_)
    | SettingsMsg(_)
    | TracksMsg(_)
    | StatsMsg(_)
    | QueueMsg(_)
    | BrowseMsg(_)
    | StudyMsg(_)
    | TourMsg(_)
    | SittingMsg(_)
    | KeyPressed(_)
    | UserClickedTour
    | UserClickedBrowse
    | UserClickedQueue
    | UserClickedStats
    | UserClickedSignIn(_)
    | UserClickedSettings
    | UserClickedStudy
    | UserClickedRecall
    | UserStartedBlitz(_, _)
    | UserClickedStartDrill
    | UserClickedStartExam
    | ExamSampled(_) -> #(m, effect.none())

    HelpToggled -> keyboard.toggle_help(m)

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
    UserClickedBackToStudy -> review_update.back_to_study(m)
    UserClickedTracks -> menu_update.open_tracks(m)

    // --- loads several screens read ---
    StatsLoaded(result) -> stats.loaded(m, result)
    InsightsLoaded(result) -> stats.insights_loaded(m, result)

    // --- cards and queues ---
    // The browser's repetitions box: how many passes a hand-picked sitting
    // makes. Anything unreadable is one pass.
    UserChangedIterations(raw) -> #(
      Model(..m, iteration_count: case int.parse(raw) {
        Ok(value) if value > 0 -> value
        _ -> 1
      }),
      effect.none(),
    )
    // From the study screen's empty state: twenty easy problems in the track
    // already open, no screen in between.
    UserAddedStarterSet -> queues_update.add_starter_set(m)
    UserToggledSuspend(ref) -> review_update.toggle_suspend(m, ref)
    CardSuspended(result) -> review_update.card_suspended(m, result)
    UserAddedSelectionToQueue(target) -> queues_update.add_selection(m, target)
    QueuesSaved(result) -> queues_update.saved(m, result)
    QueueChanged(result) -> queues_update.changed(m, result)

    // --- the run engine ---
    RunnerReady(language) -> run_update.runner_ready(m, language)
    RunnerFailed(language, message) ->
      run_update.runner_failed(m, language, message)
    RunFinished(id, outcome, stdout) ->
      run_update.finished(m, id, outcome, stdout)
    RemoteRunFinished(id, result) ->
      run_update.remote_finished(m, id, result, update)
    RunTimedOut(id) -> run_update.timed_out(m, id)
    RuntimeLoadTimedOut(language) ->
      run_update.runtime_load_timed_out(m, language)
  }
}

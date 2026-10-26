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
  type Msg, AuthMsg, BrowseMsg, CardSuspended, ChooserClosed, ChooserMoved,
  ChooserPicked, CommandRun, ExamSampled, HelpToggled, InsightsLoaded,
  KeyPressed, PromptClosed, PromptEdited, PromptKey, QueueChanged, QueueMsg,
  QueuesSaved, RemoteRunFinished, RunFinished, RunTimedOut, RunnerFailed,
  RunnerReady, RuntimeLoadTimedOut, SettingsMsg, SignOutCompleted, SittingMsg,
  StateImported, StateLoaded, StatsLoaded, StatsMsg, StudyMsg, Swiped, TourMsg,
  TracksMsg, UrlChanged, UserAddedSelectionToQueue, UserAddedStarterSet,
  UserChangedIterations, UserClickedBrowse, UserClickedMergeGuest,
  UserClickedQueue, UserClickedRecall, UserClickedRetrySync, UserClickedSignIn,
  UserClickedSignOut, UserClickedStartDrill, UserClickedStartExam,
  UserClickedStats, UserClickedStudy, UserClickedTour, UserClickedTracks,
  UserDismissedMergeOffer, UserDismissedNotice, UserDismissedUpgradePrompt,
  UserStartedBlitz, UserToggledSuspend,
}
import gleamdrill/shared/cards
import gleamdrill/shared/queues
import gleamdrill/shared/run
import gleamdrill/shared/session
import gleamdrill/shared/stats
import gleamdrill/shared/tracks
import gleamdrill/ui/keyboard
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
    | UrlChanged(_)
    | Swiped(_)
    | UserClickedTour
    | UserClickedBrowse
    | UserClickedQueue
    | UserClickedStats
    | UserClickedSignIn(_)
    | UserClickedStudy
    | UserClickedRecall
    | UserStartedBlitz(_, _)
    | UserClickedStartDrill
    | UserClickedStartExam
    | ExamSampled(_)
    | CommandRun(_)
    | ChooserMoved(_)
    | ChooserPicked(_)
    | ChooserClosed
    | PromptEdited(_)
    | PromptKey(_)
    | PromptClosed -> #(m, effect.none())

    HelpToggled -> keyboard.toggle_help(m)

    // --- session ---
    StateLoaded(result) -> session.state_loaded(m, result)
    UserClickedRetrySync -> session.retry_sync(m)
    StateImported(result) -> session.state_imported(m, result)
    UserClickedMergeGuest -> session.merge_guest(m)
    UserDismissedMergeOffer -> session.dismiss_merge_offer(m)
    UserClickedSignOut -> session.sign_out(m)
    SignOutCompleted(_) -> session.sign_out_completed(m)
    UserDismissedNotice -> session.dismiss_notice(m)
    UserDismissedUpgradePrompt -> session.dismiss_upgrade_prompt(m)
    UserClickedTracks -> tracks.open_tracks(m)

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
    UserAddedStarterSet -> queues.add_starter_set(m)
    UserToggledSuspend(ref) -> cards.toggle_suspend(m, ref)
    CardSuspended(result) -> cards.card_suspended(m, result)
    UserAddedSelectionToQueue(target) -> queues.add_selection(m, target)
    QueuesSaved(result) -> queues.saved(m, result)
    QueueChanged(result) -> queues.changed(m, result)

    // --- the run engine ---
    RunnerReady(language) -> run.runner_ready(m, language)
    RunnerFailed(language, message) -> run.runner_failed(m, language, message)
    RunFinished(id, outcome, stdout) -> run.finished(m, id, outcome, stdout)
    RemoteRunFinished(id, result) -> run.remote_finished(m, id, result, update)
    RunTimedOut(id) -> run.timed_out(m, id)
    RuntimeLoadTimedOut(language) -> run.runtime_load_timed_out(m, language)
  }
}

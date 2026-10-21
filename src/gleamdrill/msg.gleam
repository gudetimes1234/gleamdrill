//// Every message the app can receive: the controller's vocabulary.
////
//// Split out of `model` so the state record and the event language can be
//// read -- and grown -- separately. `Model` holds no `Msg`, so the two
//// never cycle; everything a variant carries is either a wire payload, a
//// scheduler rating, or one of the model's own small state types.

import gleam/option.{type Option}
import gleam/uri.{type Uri}
import gleamdrill/content/problem.{type ProblemRef}
import gleamdrill/model.{type RunOutcome}
import gleamdrill/page/auth/model as auth_model
import gleamdrill/page/auth/msg as auth_msg
import gleamdrill/page/browse/msg as browse_msg
import gleamdrill/page/queue/msg as queue_msg
import gleamdrill/page/settings/msg as settings_msg
import gleamdrill/page/sitting/msg as sitting_msg
import gleamdrill/page/stats/msg as stats_msg
import gleamdrill/page/study/msg as study_msg
import gleamdrill/page/tour/msg as tour_msg
import gleamdrill/page/tracks/msg as tracks_msg
import gleamdrill/store/remote.{type ApiError}
import wire

/// `editing` is where the key landed: `"editor"` (inside the code editor,
/// whose own keymaps must never be fought), `"input"` (search or a form
/// field), `"control"` (a focused button or link — native activation wins),
/// or `"none"` (the app owns it).
pub type Key {
  Key(key: String, ctrl: Bool, shift: Bool, editing: String)
}

pub type Msg {
  // --- pages: each migrated page's own messages, routed by `app` ---
  AuthMsg(auth_msg.Msg)
  SettingsMsg(settings_msg.Msg)
  TracksMsg(tracks_msg.Msg)
  StatsMsg(stats_msg.Msg)
  QueueMsg(queue_msg.Msg)
  BrowseMsg(browse_msg.Msg)
  StudyMsg(study_msg.Msg)
  TourMsg(tour_msg.Msg)
  SittingMsg(sitting_msg.Msg)
  /// The address bar moved: Back, Forward, or the echo of the app's own
  /// push. Handled by the app, which owns the URL.
  UrlChanged(Uri)
  // --- keyboard ---
  KeyPressed(Key)
  HelpToggled
  // --- session ---
  StateLoaded(Result(wire.BootState, ApiError))
  StateImported(Result(Nil, ApiError))
  UserClickedMergeGuest
  UserDismissedMergeOffer
  /// The first load failed and the user asked for another go.
  UserClickedRetrySync
  UserClickedSignOut
  SignOutCompleted(Result(Nil, ApiError))
  UserDismissedNotice
  UserDismissedUpgradePrompt
  /// Open the sign-in page in a mode. Handled by `app`, which owns pages.
  UserClickedSignIn(auth_model.Mode)
  // --- the scheduler ---
  UserClickedStudy
  UserClickedBrowse
  UserClickedStats
  StatsLoaded(Result(wire.Stats, ApiError))
  InsightsLoaded(Result(wire.Insights, ApiError))
  // --- browsing and drilling ---
  UserChangedIterations(String)
  UserClickedStartDrill
  // --- the Gleam Language Tour ---
  /// Open the tour on its table of contents.
  UserClickedTour
  /// Start a recall-only sitting over the study queue.
  UserClickedRecall
  /// Start a Blitz: this many problems, this many milliseconds each.
  UserStartedBlitz(Int, Int)
  /// Open the track switcher.
  UserClickedTracks
  /// Queue a starter set from the study screen's empty state.
  UserAddedStarterSet
  UserToggledSuspend(ProblemRef)
  CardSuspended(Result(wire.ReviewOutcome, ApiError))
  // --- managing the queue ---
  UserClickedQueue
  // --- named queues ---
  /// Browse: the selection into a queue (None: just give them cards).
  UserAddedSelectionToQueue(Option(String))
  QueuesSaved(Result(Nil, ApiError))
  // --- compare ---
  QueueChanged(Result(wire.QueueChange, ApiError))
  RunnerReady(language: String)
  RunnerFailed(language: String, message: String)
  RunFinished(id: Int, outcome: RunOutcome, stdout: String)
  /// A server-side run (Elixir, Go) came back, or failed to. See api.post_run.
  RemoteRunFinished(id: Int, result: Result(wire.RunResult, ApiError))
  RunTimedOut(id: Int)
  RuntimeLoadTimedOut(language: String)
  UserClickedStartExam
  ExamSampled(List(ProblemRef))
}

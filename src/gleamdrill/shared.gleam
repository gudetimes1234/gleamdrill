//// What every page reads: the session, the active track and its data, the
//// device preferences and the chrome. Pages get it read-only and ask for
//// changes by returning `Change`s, which the app applies (Elm's "OutMsg").
////
//// While pages move out of the flat model one by one, `Shared` is that
//// model: each migrated page takes its own fields with it, and what is left
//// at the end is exactly the shared state, renamed into a record of its own.

import gleam/option.{type Option}
import gleamdrill/content/problem.{type ProblemRef}
import gleamdrill/model
import gleamdrill/msg
import gleamdrill/store/remote.{type ApiError}
import wire

pub type Shared =
  model.Model

/// What a page asks of the shared state. The app applies these after the
/// page's own update, so a page never writes shared state directly.
pub type Change {
  /// Go to another screen.
  Navigate(model.Route)
  /// A session was created. `registered` is a brand-new account, whose guest
  /// progress moves into it automatically.
  SignedIn(session: wire.Session, registered: Bool)
  /// A banner for whatever just went wrong (or right).
  Notice(String)
  /// The scheduler settings and the account knobs, as now shown.
  ProfileChanged(wire.Profile)
  /// The editor keymap, a device preference.
  KeymapChanged(String)
  /// The sync bar, on or off, while something reloads.
  Refreshing(Bool)
  /// Fetch the boot state again: the data on screen is out of date.
  Reload
  /// Open or close the `?` cheatsheet.
  ToggleHelp
  /// Enter a track, optionally with twenty easy problems queued in it.
  EnterTrack(track: String, starter: Bool)
  /// Fetch the stats and insights again.
  LoadStats
  /// The manual selection: what a hand-picked drill, compare, an exam start
  /// and "add to queue" act on.
  SelectionChanged(List(ProblemRef))
  /// The named queues, edited: shown at once and saved whole.
  QueuesEdited(List(wire.Queue))
  /// The queue the study screen draws from (`None` is everything).
  ActiveQueueChanged(Option(String))
  /// The store's answer to putting problems in the queue or taking them out.
  QueueChangeLanded(Result(wire.QueueChange, ApiError))
  /// Clear the run engine's last result: a new screen starts clean.
  ResetRun
  /// Run code in a local runtime (the run engine is shared: one run at a
  /// time, one worker per language).
  RunLocal(language: String, code: String, harness: String)
  /// Start loading a runtime before it is needed.
  Prefetch(language: String)
  /// The editor height, a device preference.
  EditorHeightChanged(Int)
  /// The last tour lesson opened, a device preference.
  TourLessonOpened(Int)
  /// A tour lesson's edited program, or `None` to drop the edit.
  TourEdited(lesson: Int, code: Option(String))
  /// A review was recorded: the card, the day's counts and the clock move.
  ReviewLanded(wire.ReviewOutcome)
  /// The latest review was taken back.
  UndoLanded(problem: ProblemRef, outcome: wire.UndoOutcome)
  /// A save failed. Said as a notice; for a guest it also means storage is
  /// full, which is the one warning that does not go away.
  WriteFailed(ApiError)
  /// The text typed for a problem, kept for this session.
  DraftChanged(problem: ProblemRef, text: String)
  /// A problem's draft is gone: graded, or a Blitz card that ran out.
  DraftDropped(ProblemRef)
  /// A problem's note, as typed.
  NoteChanged(problem: ProblemRef, text: String)
  /// The prompt sidebar shown or hidden, a device preference.
  PromptToggled
  /// The run results folded or unfolded, for the session.
  ResultsToggled
  /// The solution pane flipped between diff and plain reference.
  DiffToggled
  /// Run code on the server (Elixir, Go, Haskell).
  RunRemote(language: String, code: String, harness: String)
  /// Stop the run in flight, replacing a local worker.
  AbandonRun(language: String)
  /// Boot a language's runtime again after it failed.
  RestartRuntime(language: String)
  /// Put the run engine back as it was (an undo restores the run too).
  RunRestored(model.RunState)
  /// Take down the notice banner.
  NoticeCleared
  /// Hand a message to the app, for a screen that is not a page yet. Goes
  /// once the last of them has moved.
  Dispatch(msg.Msg)
}

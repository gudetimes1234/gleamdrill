//// Every message the app can receive: the controller's vocabulary.
////
//// Split out of `model` so the state record and the event language can be
//// read -- and grown -- separately. `Model` holds no `Msg`, so the two
//// never cycle; everything a variant carries is either a wire payload, a
//// scheduler rating, or one of the model's own small state types.

import fsrs
import gleam/option.{type Option}
import gleamdrill/model.{
  type AuthMode, type CompareSide, type GroupChange, type Pane, type QueueFilter,
  type RunOutcome, type SettingField, type UndoPoint,
}
import gleamdrill/problem.{type ProblemRef}
import gleamdrill/remote.{type ApiError}
import wire

/// `editing` is where the key landed: `"editor"` (inside the code editor,
/// whose own keymaps must never be fought), `"input"` (search or a form
/// field), `"control"` (a focused button or link — native activation wins),
/// or `"none"` (the app owns it).
pub type Key {
  Key(key: String, ctrl: Bool, shift: Bool, editing: String)
}

pub type Msg {
  // --- keyboard ---
  KeyPressed(Key)
  HelpToggled
  /// Move the pane focus left (-1) or right (+1).
  MenuPaneFocused(Int)
  /// Move the cursor within the focused pane by a delta.
  MenuCursorMoved(Int)
  /// Jump the cursor to the first (True) or last row.
  MenuCursorJumped(Bool)
  /// Enter on the cursor row: descend into a pane, or toggle a problem.
  MenuActivated
  /// Space/x on the cursor row: toggle membership, or remove from Selected.
  MenuToggledAtCursor
  /// Move the quiz choice cursor by a delta.
  QuizMoved(Int)
  /// Move the board cursor by a delta, within the flattened palette.
  BoardMoved(Int)
  /// Jump the board cursor to the first piece of the previous/next shelf.
  BoardShelfMoved(Int)
  /// Jump the board cursor to the first (True) or last piece.
  BoardJumped(Bool)
  /// Space on the cursor: put the piece on the board, or take it off.
  BoardToggledAtCursor
  EditorFocusRequested
  SearchFocusRequested
  // --- session ---
  UserChangedAuthEmail(String)
  UserChangedAuthPassword(String)
  UserToggledAuthMode
  UserSubmittedAuth
  AuthCompleted(Result(wire.Session, ApiError))
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
  UserClickedSignIn(AuthMode)
  // --- the scheduler ---
  UserClickedStudy
  UserClickedBrowse
  UserClickedBackToStudy
  UserGraded(fsrs.Rating)
  ReviewRecorded(Result(wire.ReviewOutcome, ApiError))
  DraftSynced(Result(Nil, ApiError))
  UserClickedStats
  StatsLoaded(Result(wire.Stats, ApiError))
  InsightsLoaded(Result(wire.Insights, ApiError))
  StatsCursorMoved(Int)
  StatsActivated
  UserOpenedDetail(ProblemRef)
  UserClosedDetail
  HistoryLoaded(ProblemRef, Result(List(wire.ReviewRow), ApiError))
  // --- browsing and drilling ---
  UserClickedSubcategory(String)
  UserClickedBreadcrumb(Int)
  UserToggledProblem(ProblemRef)
  UserClickedSelectAll
  UserClickedClearSelection
  UserChangedIterations(String)
  UserClickedStartDrill
  /// Ask before leaving a drill; opens the in-app exit prompt.
  UserClickedExitDrill
  /// The answer to that prompt.
  ExitConfirmed(Bool)
  /// One second of drill time has passed; only scheduled while a drill is up.
  ClockTicked
  // --- the Gleam Language Tour ---
  /// Open the tour on its table of contents.
  UserClickedTour
  UserOpenedLesson(Int)
  UserClickedTourNext
  UserClickedTourPrev
  UserClickedTourContents
  /// Put the lesson's original program back in the editor.
  UserResetLesson
  TourEditorChanged(String)
  /// The typing pause is over: compile and run what is in the editor.
  TourRunTicked
  TourCursorMoved(Int)
  TourActivated
  UserToggledSolution(Int)
  /// Unfold or fold the rail's nudge. Not a reveal.
  UserToggledNudge
  /// The step rail. Focus moves freely -- the titles were always on screen --
  /// and the three layer messages act on whichever step has the focus.
  WalkFocused(Int)
  WalkAdvanced
  WalkBacked
  WalkHintShown
  WalkWhyShown
  WalkCodeShown
  /// The whole pseudocode, from the foot of the rail. A reveal.
  UserRevealedWholeThing
  UserClickedNext
  UserSearched(String)
  UserChangedKeymap(String)
  EditorChanged(String)
  DraftSaveTicked
  /// The note on the current problem changed; saved after a pause.
  NoteChanged(String)
  NoteSaveTicked
  NoteSynced(Result(Nil, ApiError))
  /// `m` on the drill screen: put the cursor in the note.
  NoteFocusRequested
  UserClickedRun
  UserClickedStopRun
  UserClickedRetryRuntime(String)
  /// `p` or the header button: the prompt sidebar, shown or hidden.
  UserToggledPrompt
  /// A pane's key: open it in the slot, or close it if it is the one shown.
  UserToggledPane(Pane)
  UserToggledResults
  /// Fetch every runtime file into the offline cache.
  UserClickedWarmCache
  /// Progress from the worker: ok, done, total, finished.
  CacheWarmed(Bool, Int, Int, Bool)
  CacheMeasured(Int)
  /// Download everything as one file.
  UserClickedExport
  ArchiveReady(Result(wire.Archive, ApiError))
  /// Pick an export file to restore from.
  UserClickedImport
  /// The chosen file's text.
  ImportPicked(String)
  /// The "replace everything?" answer.
  ImportConfirmed(Bool)
  ArchiveRestored(Result(Nil, ApiError))
  /// Flip the solution panel between the diff and the plain reference.
  UserToggledDiff
  /// Close the panel a passing run opened.
  UserDismissedDiff
  /// Take back the latest grade and reopen that problem.
  UserClickedUndo
  UndoRecorded(UndoPoint, Result(wire.UndoOutcome, ApiError))
  /// Start a recall-only sitting over the study queue.
  UserClickedRecall
  /// Run the code alone, no harness: for reading what it prints.
  UserClickedScratchRun
  /// Open the Blitz chooser on the study screen, or close it.
  UserToggledBlitz
  /// Start a Blitz: this many problems, this many milliseconds each.
  UserStartedBlitz(Int, Int)
  /// The Blitz clock passed the current card's deadline.
  BlitzExpired
  /// Show the approach and solutions for the current recall card.
  UserRevealedRecall
  /// The editor's resize handle was released at this many px; 0 resets.
  EditorResized(Int)
  UserClickedSettings
  /// A settings input committed (on blur or Enter), carrying its raw text.
  UserChangedSetting(SettingField, String)
  /// Adopt the timezone this browser reports, which is the only way to change
  /// it after signup.
  UserClickedDeviceTimezone
  SettingsSaved(Result(wire.Profile, ApiError))
  /// Open the track switcher.
  UserClickedTracks
  /// Enter a track: everything the app shows becomes that track's.
  UserPickedTrack(String)
  /// Enter a track and queue a starter set in it, so the first sitting is one
  /// click away rather than a trip to the queue screen.
  UserPickedTrackWithStarter(String)
  /// Queue a starter set from the study screen's empty state.
  UserAddedStarterSet
  UserToggledSuspend(ProblemRef)
  MenuSuspendedAtCursor
  CardSuspended(Result(wire.ReviewOutcome, ApiError))
  // --- managing the queue ---
  UserClickedQueue
  UserSearchedQueue(String)
  UserFilteredQueue(QueueFilter)
  /// Add or remove one topic's listed rows, optionally just its Easy ones.
  UserChangedGroup(GroupChange)
  /// Put one problem in the queue, or take it out -- whichever it is not.
  UserToggledQueued(ProblemRef)
  UserAddedAllShown
  UserRemovedAllShown
  // --- named queues ---
  /// The study screen's pick: which queue today serves from.
  UserPickedActiveQueue(Option(String))
  /// The queue screen's pick: which queue the rows edit.
  UserSelectedQueue(Option(String))
  UserStartedNewQueue
  UserStartedRenameQueue
  UserChangedQueueName(String)
  UserSubmittedQueueName
  UserCancelledQueueName
  UserDeletedQueue
  /// Browse: the selection into a queue (None: just give them cards).
  UserAddedSelectionToQueue(Option(String))
  QueuesSaved(Result(Nil, ApiError))
  // --- compare ---
  UserClickedCompare
  CompareMoved(Int)
  ComparePickedVariant(CompareSide, Int)
  UserClosedCompare
  QueueCursorMoved(Int)
  QueueCursorJumped(Bool)
  QueueToggledAtCursor
  QueueChanged(Result(wire.QueueChange, ApiError))
  RunnerReady(language: String)
  RunnerFailed(language: String, message: String)
  RunFinished(id: Int, outcome: RunOutcome, stdout: String)
  /// A server-side run (Elixir, Go) came back, or failed to. See api.post_run.
  RemoteRunFinished(id: Int, result: Result(wire.RunResult, ApiError))
  RunTimedOut(id: Int)
  RuntimeLoadTimedOut(language: String)
  UserPickedChoice(Int)
  UserSubmittedAnswer
  /// A board chip was clicked. Carries the piece id rather than its index, so
  /// the click path does not depend on how the palette is ordered.
  UserToggledPiece(String)
  UserSubmittedBoard
  UserClickedStartExam
  ExamSampled(List(ProblemRef))
  UserClickedExitReport
}

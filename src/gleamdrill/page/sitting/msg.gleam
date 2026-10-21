import fsrs
import gleamdrill/page/sitting/model.{type Pane, type UndoPoint}
import gleamdrill/store/remote.{type ApiError}
import wire

pub type Msg {
  // --- the clock and the way out ---
  /// One second of drill time has passed; only scheduled while a drill is up.
  ClockTicked
  /// Pause or resume the drill clock. The paused span is subtracted from the
  /// recorded duration, so stepping away does not inflate the review log.
  UserToggledTimer
  /// The Blitz clock passed the current card's deadline.
  BlitzExpired
  /// Ask before leaving a drill; opens the in-app exit prompt.
  UserClickedExitDrill
  /// The answer to that prompt.
  ExitConfirmed(Bool)
  /// Leave the summary or the exam report.
  UserClickedExitReport
  // --- grading ---
  UserGraded(fsrs.Rating)
  ReviewRecorded(Result(wire.ReviewOutcome, ApiError))
  UserClickedNext
  /// Take back the latest grade and reopen that problem.
  UserClickedUndo
  UndoRecorded(UndoPoint, Result(wire.UndoOutcome, ApiError))
  /// Show the approach and solutions for the current recall card.
  UserRevealedRecall
  // --- the editor and the note ---
  EditorChanged(String)
  EditorResized(Int)
  EditorFocusRequested
  UserChangedKeymap(String)
  DraftSaveTicked
  DraftSynced(Result(Nil, ApiError))
  NoteChanged(String)
  NoteSaveTicked
  NoteSynced(Result(Nil, ApiError))
  NoteFocusRequested
  // --- runs ---
  UserClickedRun
  UserClickedScratchRun
  UserClickedStopRun
  UserClickedRetryRuntime(String)
  /// The shared run engine settled this sitting's run.
  RunLanded
  /// A runtime finished loading.
  RuntimeReady(String)
  // --- the rail, the panes and the toggles ---
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
  /// `p` or the header button: the prompt sidebar, shown or hidden.
  UserToggledPrompt
  /// A pane's key: open it in the slot, or close it if it is the one shown.
  UserToggledPane(Pane)
  UserToggledResults
  /// Flip the solution panel between the diff and the plain reference.
  UserToggledDiff
  /// Close the panel a passing run opened.
  UserDismissedDiff
  // --- quizzes and boards ---
  /// Move the quiz choice cursor by a delta.
  QuizMoved(Int)
  UserPickedChoice(Int)
  UserSubmittedAnswer
  /// Move the board cursor by a delta, within the flattened palette.
  BoardMoved(Int)
  /// Jump the board cursor to the first piece of the previous/next shelf.
  BoardShelfMoved(Int)
  /// Jump the board cursor to the first (True) or last piece.
  BoardJumped(Bool)
  /// Space on the cursor: put the piece on the board, or take it off.
  BoardToggledAtCursor
  /// A board chip was clicked, by piece id.
  UserToggledPiece(String)
  UserSubmittedBoard
  UserToggledHelp
}

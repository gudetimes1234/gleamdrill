import gleam/option.{type Option}
import gleamdrill/content/problem.{type ProblemRef}
import gleamdrill/domain/compare.{type CompareSide}

pub type Msg {
  CursorMoved(Int)
  /// True for the first row, False for the last.
  CursorJumped(Bool)
  /// Move the pane focus left (-1) or right (+1).
  PaneFocused(Int)
  /// Enter on the cursor row: choose it, or toggle it into the selection.
  Activated
  /// `z`: pause or resume the cursor row's card.
  SuspendedAtCursor
  UserSearched(String)
  UserFocusedSearch
  UserClickedSubcategory(String)
  UserClickedBreadcrumb
  UserToggledProblem(ProblemRef)
  UserToggledSuspend(ProblemRef)
  UserClickedSelectAll
  UserClickedClearSelection
  UserChangedIterations(String)
  UserClickedStartDrill
  UserClickedStartExam
  UserAddedSelectionToQueue(Option(String))
  UserClickedCompare
  CompareMoved(Int)
  ComparePickedVariant(CompareSide, Int)
  UserClosedCompare
  UserClickedBack
  UserToggledHelp
}

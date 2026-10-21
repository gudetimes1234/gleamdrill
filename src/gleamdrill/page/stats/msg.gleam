import gleamdrill/content/problem.{type ProblemRef}
import gleamdrill/store/remote.{type ApiError}
import wire

pub type Msg {
  CursorMoved(Int)
  /// Enter on the cursor row: open its history.
  Activated
  UserOpenedDetail(ProblemRef)
  UserClosedDetail
  HistoryLoaded(ProblemRef, Result(List(wire.ReviewRow), ApiError))
  UserToggledSuspend(ProblemRef)
  UserClickedBack
  UserToggledHelp
}

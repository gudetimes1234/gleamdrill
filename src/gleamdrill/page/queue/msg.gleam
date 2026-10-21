import gleam/option.{type Option}
import gleamdrill/content/problem.{type ProblemRef}
import gleamdrill/domain/queue
import gleamdrill/store/remote.{type ApiError}
import wire

pub type Msg {
  UserSearchedQueue(String)
  UserFilteredQueue(queue.Status)
  /// A topic header's bulk button.
  UserChangedGroup(queue.Group)
  UserToggledQueued(ProblemRef)
  UserAddedAllShown
  UserRemovedAllShown
  /// `None` is the everything queue.
  UserSelectedQueue(Option(String))
  UserStartedNewQueue
  UserStartedRenameQueue
  UserChangedQueueName(String)
  UserSubmittedQueueName
  UserCancelledQueueName
  UserDeletedQueue
  CursorMoved(Int)
  /// True for the first row, False for the last.
  CursorJumped(Bool)
  ToggledAtCursor
  QueueChanged(Result(wire.QueueChange, ApiError))
  UserFocusedSearch
  UserClickedStudy
  UserClickedBack
  UserToggledHelp
}

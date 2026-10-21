import gleam/option.{type Option}
import gleamdrill/page/auth/model as auth

pub type Msg {
  UserClickedStudy
  UserClickedRecall
  UserToggledBlitz
  /// A Blitz of `count` cards, `per_card_ms` each.
  UserStartedBlitz(count: Int, per_card_ms: Int)
  /// The queue to study from; `None` is everything.
  UserPickedActiveQueue(Option(String))
  /// The empty state's one-click start: twenty easy problems.
  UserAddedStarterSet
  UserClickedStartExam
  UserClickedQueue
  UserClickedBrowse
  UserClickedStats
  UserClickedTour
  UserClickedTracks
  UserClickedSignIn(auth.Mode)
  UserDismissedUpgradePrompt
  UserToggledHelp
}

//// The study screen: the Blitz chooser is its own; everything else starts
//// a sitting, opens another screen, or changes the active queue.

import gleamdrill/msg as app_msg
import gleamdrill/page/study/model.{type Model, Model}
import gleamdrill/page/study/msg.{type Msg}
import gleamdrill/shared.{type Change, type Shared}
import lustre/effect.{type Effect}

pub fn init(_shared: Shared) -> #(Model, Effect(Msg), List(Change)) {
  #(model.init(), effect.none(), [])
}

pub fn update(
  _shared: Shared,
  page: Model,
  msg: Msg,
) -> #(Model, Effect(Msg), List(Change)) {
  case msg {
    msg.UserToggledBlitz -> #(
      Model(blitz_chooser: !page.blitz_chooser),
      effect.none(),
      [],
    )
    msg.UserStartedBlitz(count, per_card_ms) ->
      closing(app_msg.UserStartedBlitz(count, per_card_ms))
    msg.UserPickedActiveQueue(name) -> #(
      Model(blitz_chooser: False),
      effect.none(),
      [shared.ActiveQueueChanged(name)],
    )
    msg.UserToggledHelp -> #(page, effect.none(), [shared.ToggleHelp])
    msg.UserClickedStudy -> hand_off(page, app_msg.UserClickedStudy)
    msg.UserClickedRecall -> hand_off(page, app_msg.UserClickedRecall)
    msg.UserAddedStarterSet -> hand_off(page, app_msg.UserAddedStarterSet)
    msg.UserClickedStartExam -> hand_off(page, app_msg.UserClickedStartExam)
    msg.UserClickedQueue -> hand_off(page, app_msg.UserClickedQueue)
    msg.UserClickedBrowse -> hand_off(page, app_msg.UserClickedBrowse)
    msg.UserClickedStats -> hand_off(page, app_msg.UserClickedStats)
    msg.UserClickedTour -> hand_off(page, app_msg.UserClickedTour)
    msg.UserClickedTracks -> hand_off(page, app_msg.UserClickedTracks)
    msg.UserClickedSignIn(mode) ->
      hand_off(page, app_msg.UserClickedSignIn(mode))
    msg.UserDismissedUpgradePrompt ->
      hand_off(page, app_msg.UserDismissedUpgradePrompt)
  }
}

/// An action that belongs to another screen or to a sitting.
fn hand_off(
  page: Model,
  message: app_msg.Msg,
) -> #(Model, Effect(Msg), List(Change)) {
  #(page, effect.none(), [shared.Dispatch(message)])
}

/// The same, closing the Blitz chooser on the way out.
fn closing(message: app_msg.Msg) -> #(Model, Effect(Msg), List(Change)) {
  hand_off(Model(blitz_chooser: False), message)
}

//// The track switcher: every choice here is a change to the shared state.

import gleamdrill/model as shared_model
import gleamdrill/msg as app_msg
import gleamdrill/page/tracks/model.{type Model}
import gleamdrill/page/tracks/model as _
import gleamdrill/page/tracks/msg.{type Msg}
import gleamdrill/shared.{type Change, type Shared}
import lustre/effect.{type Effect}

/// The standings come with the state, so they are as old as the last load:
/// a sitting or a queue edit since then would not show. Opening the switcher
/// fetches them fresh -- except at boot, where the load is already coming.
pub fn init(shared: Shared) -> #(Model, Effect(Msg), List(Change)) {
  #(model.Model, effect.none(), case shared.boot {
    shared_model.Synced -> [shared.Reload]
    _ -> []
  })
}

pub fn update(
  _shared: Shared,
  page: Model,
  msg: Msg,
) -> #(Model, Effect(Msg), List(Change)) {
  let changes = case msg {
    msg.UserPickedTrack(track) -> [shared.EnterTrack(track, starter: False)]
    msg.UserPickedTrackWithStarter(track) -> [
      shared.EnterTrack(track, starter: True),
    ]
    msg.UserClickedStats -> [shared.Dispatch(app_msg.UserClickedStats)]
    msg.UserClickedBack -> [shared.Navigate(shared_model.StudyRoute)]
    msg.UserToggledHelp -> [shared.ToggleHelp]
  }
  #(page, effect.none(), changes)
}

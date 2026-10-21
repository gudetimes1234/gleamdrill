//// Choosing a track: the switcher's route, and entering one. The problem
//// browser itself is page/browse.

import gleamdrill/model.{type Model, Model, StudyRoute, TracksRoute}
import gleamdrill/msg.{type Msg}
import gleamdrill/shared/common
import gleamdrill/store
import lustre/effect.{type Effect}

pub fn open_tracks(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, route: TracksRoute), effect.none())
}

/// Enter a track. With `starter`, twenty easy problems are queued in it so
/// the first sitting is one click away rather than a trip to the queue screen.
///
/// Choosing a track is a device preference, so it is saved here: a reload
/// should land where you were, not back on the switcher.
pub fn enter_track(
  m: Model,
  track: String,
  starter starter: Bool,
) -> #(Model, Effect(Msg)) {
  let m = Model(..m, active_track: track, route: StudyRoute)
  // The track's own cards, queues and settings come from a fresh load: the
  // model holds one track's at a time, and this is the moment it changes.
  let reload =
    effect.batch([
      common.save_preferences(m),
      store.load_state(m, msg.StateLoaded),
    ])
  case starter, common.starter_refs(m, track) {
    True, [_, ..] as refs -> #(
      m,
      effect.batch([reload, store.add_to_queue(m, refs, msg.QueueChanged)]),
    )
    _, _ -> #(m, reload)
  }
}

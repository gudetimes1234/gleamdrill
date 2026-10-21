//// The shared stats and insights: reloading them, and folding a response
//// in. Several screens read them; the progress page itself is page/stats.

import gleam/option.{Some}
import gleamdrill/model.{type Model, Model}
import gleamdrill/msg.{type Msg}
import gleamdrill/store
import gleamdrill/store/remote.{type ApiError}
import lustre/effect.{type Effect}
import wire

pub fn loaded(
  m: Model,
  result: Result(wire.Stats, ApiError),
) -> #(Model, Effect(Msg)) {
  let m = Model(..m, stats: remote.arrived(m.stats, result))
  #(with_failure(m, result), effect.none())
}

pub fn insights_loaded(
  m: Model,
  result: Result(wire.Insights, ApiError),
) -> #(Model, Effect(Msg)) {
  let m = Model(..m, insights: remote.arrived(m.insights, result))
  #(with_failure(m, result), effect.none())
}

/// A failed load is also said out loud: `remote.arrived` keeps an earlier
/// value on screen, so the notice is the only sign it went stale.
fn with_failure(m: Model, result: Result(a, ApiError)) -> Model {
  case result {
    Ok(_) -> m
    Error(failure) -> Model(..m, notice: Some(remote.error_message(failure)))
  }
}

/// Fetch both again, keeping what is shown until the answers land.
pub fn reload(m: Model) -> #(Model, Effect(Msg)) {
  #(
    Model(
      ..m,
      stats: remote.reload(m.stats),
      insights: remote.reload(m.insights),
    ),
    effect.batch([
      store.load_stats(m, msg.StatsLoaded),
      store.load_insights(m, msg.InsightsLoaded),
    ]),
  )
}

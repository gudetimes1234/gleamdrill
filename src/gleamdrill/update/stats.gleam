//// The stats screen's actions: opening it, the loads it fires, the insight
//// list's cursor, and the per-problem detail panel.

import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleamdrill/content/problem.{type ProblemRef}
import gleamdrill/domain/insights
import gleamdrill/model.{type Model, Model, StatsRoute}
import gleamdrill/msg.{type Msg}
import gleamdrill/store
import gleamdrill/store/remote.{type ApiError}
import lustre/effect.{type Effect}
import wire

pub fn open(m: Model) -> #(Model, Effect(Msg)) {
  #(
    Model(
      ..m,
      route: StatsRoute,
      detail: None,
      stats: remote.reload(m.stats),
      insights: remote.reload(m.insights),
    ),
    effect.batch([
      store.load_stats(m, msg.StatsLoaded),
      store.load_insights(m, msg.InsightsLoaded),
    ]),
  )
}

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

pub fn cursor_moved(m: Model, delta: Int) -> #(Model, Effect(Msg)) {
  case remote.value(m.insights) {
    Some(data) -> {
      let rows = insights.listed(insights.analyse(data, m.cards, m.now))
      let last = int.max(0, list.length(rows) - 1)
      #(
        Model(
          ..m,
          nav: model.MenuNav(
            ..m.nav,
            stats: int.clamp(m.nav.stats + delta, 0, last),
          ),
        ),
        effect.none(),
      )
    }
    None -> #(m, effect.none())
  }
}

pub fn activated(m: Model) -> #(Model, Effect(Msg)) {
  case remote.value(m.insights) {
    Some(data) -> {
      let rows = insights.listed(insights.analyse(data, m.cards, m.now))
      case list.drop(rows, int.clamp(m.nav.stats, 0, list.length(rows) - 1)) {
        [row, ..] -> open_detail(m, row.problem)
        [] -> #(m, effect.none())
      }
    }
    None -> #(m, effect.none())
  }
}

pub fn open_detail(m: Model, problem: ProblemRef) -> #(Model, Effect(Msg)) {
  #(
    Model(..m, detail: Some(#(problem, remote.Loading))),
    store.load_history(m, problem, msg.HistoryLoaded(problem, _)),
  )
}

pub fn close_detail(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, detail: None), effect.none())
}

pub fn history_loaded(
  m: Model,
  problem: ProblemRef,
  result: Result(List(wire.ReviewRow), ApiError),
) -> #(Model, Effect(Msg)) {
  case m.detail {
    // Only fill the panel still being looked at; a slow response for a
    // closed panel is dropped. A failure shows in the panel itself.
    Some(#(open, remote.Loading)) if open == problem -> #(
      Model(
        ..m,
        detail: Some(#(problem, remote.arrived(remote.Loading, result))),
      ),
      effect.none(),
    )
    _ -> #(m, effect.none())
  }
}

/// A failed load is also said out loud: `remote.arrived` keeps an earlier
/// value on screen, so the notice is the only sign it went stale.
fn with_failure(m: Model, result: Result(a, ApiError)) -> Model {
  case result {
    Ok(_) -> m
    Error(failure) -> Model(..m, notice: Some(remote.error_message(failure)))
  }
}

//// The stats screen's actions: opening it, the loads it fires, the insight
//// list's cursor, and the per-problem detail panel.

import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleamdrill/insights
import gleamdrill/model.{type Model, Model, StatsRoute}
import gleamdrill/msg.{type Msg}
import gleamdrill/problem.{type ProblemRef}
import gleamdrill/remote.{type ApiError}
import gleamdrill/store
import lustre/effect.{type Effect}
import wire

pub fn open(m: Model) -> #(Model, Effect(Msg)) {
  #(
    Model(..m, route: StatsRoute, detail: None),
    effect.batch([store.load_stats(m), store.load_insights(m)]),
  )
}

pub fn loaded(
  m: Model,
  result: Result(wire.Stats, ApiError),
) -> #(Model, Effect(Msg)) {
  case result {
    Ok(loaded) -> #(Model(..m, stats: Some(loaded)), effect.none())
    Error(failure) -> #(
      Model(..m, notice: Some(remote.error_message(failure))),
      effect.none(),
    )
  }
}

pub fn insights_loaded(
  m: Model,
  result: Result(wire.Insights, ApiError),
) -> #(Model, Effect(Msg)) {
  case result {
    Ok(loaded) -> #(Model(..m, insights: Some(loaded)), effect.none())
    Error(failure) -> #(
      Model(..m, notice: Some(remote.error_message(failure))),
      effect.none(),
    )
  }
}

pub fn cursor_moved(m: Model, delta: Int) -> #(Model, Effect(Msg)) {
  case m.insights {
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
  case m.insights {
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
  #(Model(..m, detail: Some(#(problem, None))), store.load_history(m, problem))
}

pub fn close_detail(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, detail: None), effect.none())
}

pub fn history_loaded(
  m: Model,
  problem: ProblemRef,
  result: Result(List(wire.ReviewRow), ApiError),
) -> #(Model, Effect(Msg)) {
  case result {
    Ok(rows) ->
      case m.detail {
        // Only fill the panel still being looked at; a slow response for a
        // closed panel is dropped.
        Some(#(open, None)) if open == problem -> #(
          Model(..m, detail: Some(#(problem, Some(rows)))),
          effect.none(),
        )
        _ -> #(m, effect.none())
      }
    Error(failure) -> #(
      Model(..m, detail: None, notice: Some(remote.error_message(failure))),
      effect.none(),
    )
  }
}

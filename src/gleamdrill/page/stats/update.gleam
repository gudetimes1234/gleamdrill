//// The progress page: opening it reloads the shared stats; the rest is its
//// cursor and the per-problem history panel.

import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleamdrill/content/problem.{type ProblemRef}
import gleamdrill/domain/insights
import gleamdrill/model as shared_model
import gleamdrill/msg as app_msg
import gleamdrill/page/stats/model.{type Model, Model}
import gleamdrill/page/stats/msg.{type Msg}
import gleamdrill/shared.{type Change, type Shared}
import gleamdrill/store
import gleamdrill/store/remote
import lustre/effect.{type Effect}

pub fn init(_shared: Shared) -> #(Model, Effect(Msg), List(Change)) {
  #(model.init(), effect.none(), [shared.LoadStats])
}

pub fn update(
  shared: Shared,
  page: Model,
  msg: Msg,
) -> #(Model, Effect(Msg), List(Change)) {
  case msg {
    msg.CursorMoved(delta) -> {
      let last = int.max(0, list.length(rows(shared)) - 1)
      #(
        Model(..page, cursor: int.clamp(page.cursor + delta, 0, last)),
        effect.none(),
        [],
      )
    }
    msg.Activated ->
      case list.drop(rows(shared), page.cursor) {
        [row, ..] -> open_detail(shared, page, row.problem)
        [] -> #(page, effect.none(), [])
      }
    msg.UserOpenedDetail(problem) -> open_detail(shared, page, problem)
    msg.UserClosedDetail -> #(Model(..page, detail: None), effect.none(), [])
    // Only fill the panel still being looked at; a slow response for a
    // closed panel is dropped. A failure shows in the panel itself.
    msg.HistoryLoaded(problem, result) ->
      case page.detail {
        Some(#(open, remote.Loading)) if open == problem -> #(
          Model(
            ..page,
            detail: Some(#(problem, remote.arrived(remote.Loading, result))),
          ),
          effect.none(),
          [],
        )
        _ -> #(page, effect.none(), [])
      }
    msg.UserToggledSuspend(problem) -> #(page, effect.none(), [
      shared.Dispatch(app_msg.UserToggledSuspend(problem)),
    ])
    msg.UserClickedBack -> #(page, effect.none(), [
      shared.Navigate(shared_model.StudyRoute),
    ])
    msg.UserToggledHelp -> #(page, effect.none(), [shared.ToggleHelp])
  }
}

fn open_detail(
  shared: Shared,
  page: Model,
  problem: ProblemRef,
) -> #(Model, Effect(Msg), List(Change)) {
  #(
    Model(..page, detail: Some(#(problem, remote.Loading))),
    store.load_history(shared, problem, msg.HistoryLoaded(problem, _)),
    [],
  )
}

/// The rows the cursor walks: both problem lists, in display order.
pub fn rows(shared: Shared) -> List(insights.CardInsight) {
  case remote.value(shared.insights) {
    Some(data) ->
      insights.listed(insights.analyse(data, shared.cards, shared.now))
    None -> []
  }
}

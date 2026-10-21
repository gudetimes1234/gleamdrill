//// Parking a card: pausing or resuming its schedule from the browser, the
//// queue manager or the progress page. Grading itself is page/sitting.

import gleam/dict
import gleam/option.{None, Some}
import gleamdrill/content/problem.{type ProblemRef}
import gleamdrill/domain/guest
import gleamdrill/model.{type Model, Model}

import gleamdrill/msg.{type Msg}
import gleamdrill/shared/common
import gleamdrill/store
import gleamdrill/store/remote.{type ApiError}
import lustre/effect.{type Effect}
import wire

pub fn toggle_suspend(m: Model, ref: ProblemRef) -> #(Model, Effect(Msg)) {
  case model.card_for(m, ref) {
    None -> #(m, effect.none())
    Some(state) -> #(
      m,
      store.set_suspended(m, ref, !state.suspended, msg.CardSuspended),
    )
  }
}

pub fn card_suspended(
  m: Model,
  result: Result(wire.ReviewOutcome, ApiError),
) -> #(Model, Effect(Msg)) {
  case result {
    Ok(outcome) -> #(
      Model(
        ..m,
        now: outcome.now,
        today: outcome.today,
        cards: common.fold_card(m, m.cards, outcome.card),
      ),
      effect.none(),
    )
    Error(failure) -> #(
      Model(..m, notice: Some(remote.error_message(failure))),
      effect.none(),
    )
  }
}

/// A review landed: the card it rescheduled, the day's counts and the
/// server's clock, the draft the review deleted, and the upgrade prompt,
/// which escalates with what a guest has at stake.
pub fn landed(m: Model, outcome: wire.ReviewOutcome) -> #(Model, Effect(Msg)) {
  #(
    Model(
      ..m,
      now: outcome.now,
      today: outcome.today,
      cards: common.fold_card(m, m.cards, outcome.card),
      drafts: guest.drop_draft(m.drafts, outcome.card.problem),
      upgrade_prompt: common.escalate(m),
    ),
    effect.none(),
  )
}

/// The latest review was taken back. Undoing the review that created the
/// card un-creates it, and a queue never names a problem without one.
pub fn undo_landed(
  m: Model,
  problem: ProblemRef,
  outcome: wire.UndoOutcome,
) -> #(Model, Effect(Msg)) {
  let cards = case outcome.card {
    Some(card) -> common.fold_card(m, m.cards, card)
    None -> dict.delete(m.cards, problem)
  }
  let queues = case outcome.card {
    Some(_) -> m.queues
    None -> model.drop_from_queues(m.queues, [problem])
  }
  let saved = case queues == m.queues {
    True -> effect.none()
    False -> store.save_queues(Model(..m, queues:), msg.QueuesSaved)
  }
  #(Model(..m, now: outcome.now, today: outcome.today, cards:, queues:), saved)
}

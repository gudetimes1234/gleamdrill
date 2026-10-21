//// The shared side of the queues: folding the store's answer to an enqueue
//// or dequeue, saving the named queues, and the queue actions the study
//// and browse screens take. The queue manager itself is page/queue.

import gleam/dict
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleamdrill/content/problem.{type ProblemRef}
import gleamdrill/domain/track
import gleamdrill/model.{type Model, Guest, Model, TracksRoute}
import gleamdrill/msg.{type Msg}
import gleamdrill/shared/queues
import gleamdrill/store
import gleamdrill/store/remote.{type ApiError}
import gleamdrill/update/common
import lustre/effect.{type Effect}
import wire

pub fn add_starter_set(m: Model) -> #(Model, Effect(Msg)) {
  case common.starter_refs(m, m.active_track) {
    [] -> #(Model(..m, route: TracksRoute), effect.none())
    refs -> #(m, store.add_to_queue(m, refs, msg.QueueChanged))
  }
}

pub fn pick_active(m: Model, name: Option(String)) -> #(Model, Effect(Msg)) {
  {
    let m = Model(..m, active_queue: name, blitz_chooser: False)
    #(m, common.save_preferences(m))
  }
}

pub fn add_selection(
  m: Model,
  target: Option(String),
) -> #(Model, Effect(Msg)) {
  case m.selected {
    [] -> #(m, effect.none())
    refs -> {
      let #(m, saved) = case target {
        None -> #(m, effect.none())
        Some(name) -> {
          let m = Model(..m, queues: queues.add_to(m.queues, name, refs))
          #(m, store.save_queues(m, msg.QueuesSaved))
        }
      }
      let carded = enqueue_missing(m, refs)
      #(
        Model(
          ..carded.0,
          notice: Some(
            int.to_string(list.length(refs))
            <> " added to "
            <> option.unwrap(target, "the queue")
            <> ".",
          ),
        ),
        effect.batch([saved, carded.1]),
      )
    }
  }
}

pub fn saved(m: Model, result: Result(Nil, ApiError)) -> #(Model, Effect(Msg)) {
  case result {
    Ok(Nil) -> #(m, effect.none())
    Error(failure) -> #(
      Model(
        ..m,
        storage_full: m.mode == Guest || m.storage_full,
        notice: Some(remote.error_message(failure)),
      ),
      effect.none(),
    )
  }
}

pub fn changed(
  m: Model,
  result: Result(wire.QueueChange, ApiError),
) -> #(Model, Effect(Msg)) {
  case result {
    Ok(change) -> {
      let cards =
        list.fold(change.cards, m.cards, fn(cards, card: wire.CardState) {
          common.fold_card(m, cards, card)
        })
      // A browser with no track yet takes the one it just put something in:
      // choosing problems is choosing a track, and asking twice would be a
      // question with only one possible answer.
      let active_track = case m.active_track, change.cards {
        "", [first, ..] -> track.of_ref(first.problem)
        chosen, _ -> chosen
      }
      let m = Model(..m, active_track:)
      // A card gone is gone from every list too.
      let queues = model.drop_from_queues(m.queues, change.removed)
      let changed = queues != m.queues
      let m = Model(..m, queues:)
      #(
        Model(
          ..m,
          now: change.now,
          today: change.today,
          cards: list.fold(change.removed, cards, dict.delete),
          // Refusals are the server declining to destroy a review log, not a
          // failure: say what happened and leave the cards parked-or-not as
          // they were.
          notice: case change.refused {
            [] -> m.notice
            refused ->
              Some(
                int.to_string(list.length(refused))
                <> " problem(s) have review history and stay in the queue. "
                <> "Pause them instead.",
              )
          },
        ),
        case changed {
          True -> store.save_queues(m, msg.QueuesSaved)
          False -> effect.none()
        },
      )
    }
    Error(failure) -> #(
      Model(..m, notice: Some(remote.error_message(failure))),
      effect.none(),
    )
  }
}

/// Cards for whichever of these problems have none yet.
fn enqueue_missing(m: Model, refs: List(ProblemRef)) -> #(Model, Effect(Msg)) {
  case list.filter(refs, fn(ref) { !model.is_queued(m, ref) }) {
    [] -> #(m, effect.none())
    missing -> #(m, store.add_to_queue(m, missing, msg.QueueChanged))
  }
}

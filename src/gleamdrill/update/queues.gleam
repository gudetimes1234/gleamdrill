//// The queue screens: the everything queue, named queues, the manage
//// screen's cursor, filters and bulk changes, and the server's answers.

import gleam/dict
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/set
import gleam/string
import gleamdrill/model.{type Model, Guest, Model, QueueRoute, TracksRoute}
import gleamdrill/msg.{type Msg}
import gleamdrill/problem.{type ProblemRef}
import gleamdrill/queue
import gleamdrill/remote.{type ApiError}
import gleamdrill/store
import gleamdrill/track
import gleamdrill/update/common
import gleamdrill/view/id
import lustre/effect.{type Effect}
import wire

pub fn add_starter_set(m: Model) -> #(Model, Effect(Msg)) {
  case common.starter_refs(m, m.active_track) {
    [] -> #(Model(..m, route: TracksRoute), effect.none())
    refs -> #(common.pending(m, refs), store.add_to_queue(m, refs))
  }
}

pub fn open(m: Model) -> #(Model, Effect(Msg)) {
  #(
    Model(
      ..m,
      route: QueueRoute,
      // Open on the queue being studied: the one most likely to need a
      // problem added.
      queue_editing: m.active_queue,
      queue_naming: None,
    ),
    effect.none(),
  )
}

pub fn pick_active(m: Model, name: Option(String)) -> #(Model, Effect(Msg)) {
  {
    let m = Model(..m, active_queue: name, blitz_chooser: False)
    #(m, common.save_preferences(m))
  }
}

pub fn select(m: Model, name: Option(String)) -> #(Model, Effect(Msg)) {
  #(
    Model(
      ..m,
      queue_editing: name,
      queue_naming: None,
      nav: model.MenuNav(..m.nav, queue: 0),
    ),
    effect.none(),
  )
}

pub fn start_new(m: Model) -> #(Model, Effect(Msg)) {
  #(
    Model(..m, queue_naming: Some(model.NewQueue(""))),
    common.focus_after_render(".queue-name-input"),
  )
}

pub fn start_rename(m: Model) -> #(Model, Effect(Msg)) {
  case m.queue_editing {
    Some(name) -> #(
      Model(..m, queue_naming: Some(model.RenameQueue(name, name))),
      common.focus_after_render(".queue-name-input"),
    )
    None -> #(m, effect.none())
  }
}

pub fn name_changed(m: Model, text: String) -> #(Model, Effect(Msg)) {
  #(
    Model(..m, queue_naming: case m.queue_naming {
      Some(model.NewQueue(_)) -> Some(model.NewQueue(text))
      Some(model.RenameQueue(from, _)) -> Some(model.RenameQueue(from, text))
      None -> None
    }),
    effect.none(),
  )
}

pub fn cancel_naming(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, queue_naming: None), effect.none())
}

pub fn submit_name(m: Model) -> #(Model, Effect(Msg)) {
  case m.queue_naming {
    None -> #(m, effect.none())
    Some(naming) -> {
      let name =
        string.trim(case naming {
          model.NewQueue(text) -> text
          model.RenameQueue(_, text) -> text
        })
      let taken =
        list.any(m.queues, fn(queue) { queue.name == name })
        && case naming {
          model.RenameQueue(from, _) -> from != name
          model.NewQueue(_) -> True
        }
      case name, taken, naming {
        "", _, _ -> #(
          Model(..m, notice: Some("A queue needs a name.")),
          effect.none(),
        )
        _, True, _ -> #(
          Model(
            ..m,
            notice: Some("There is already a queue called " <> name <> "."),
          ),
          effect.none(),
        )
        _, False, model.NewQueue(_) -> {
          let m =
            Model(
              ..m,
              queues: list.append(m.queues, [
                // In the track it was made in. A queue belongs to one,
                // and "" belongs to none -- it would vanish from the
                // screen that created it the moment anything reloaded.
                wire.Queue(track: m.active_track, name:, problems: []),
              ]),
              queue_editing: Some(name),
              queue_naming: None,
            )
          #(m, store.save_queues(m))
        }
        _, False, model.RenameQueue(from, _) -> {
          let rename = fn(current) {
            case current == Some(from) {
              True -> Some(name)
              False -> current
            }
          }
          let m =
            Model(
              ..m,
              queues: list.map(m.queues, fn(queue) {
                case queue.name == from {
                  True -> wire.Queue(..queue, name:)
                  False -> queue
                }
              }),
              queue_editing: Some(name),
              active_queue: rename(m.active_queue),
              queue_naming: None,
            )
          #(m, effect.batch([store.save_queues(m), common.save_preferences(m)]))
        }
      }
    }
  }
}

pub fn delete(m: Model) -> #(Model, Effect(Msg)) {
  case m.queue_editing {
    None -> #(m, effect.none())
    Some(name) -> {
      let m =
        Model(
          ..m,
          queues: list.filter(m.queues, fn(queue) { queue.name != name }),
          queue_editing: None,
          queue_naming: None,
          active_queue: case m.active_queue == Some(name) {
            True -> None
            False -> m.active_queue
          },
        )
      #(m, effect.batch([store.save_queues(m), common.save_preferences(m)]))
    }
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
          let m = add_to_named_queue(m, name, refs)
          #(m, store.save_queues(m))
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

pub fn searched(m: Model, text: String) -> #(Model, Effect(Msg)) {
  #(
    Model(..m, queue_search: text, nav: model.MenuNav(..m.nav, queue: 0)),
    effect.none(),
  )
}

pub fn filtered(m: Model, filter: model.QueueFilter) -> #(Model, Effect(Msg)) {
  #(
    Model(..m, queue_status: filter, nav: model.MenuNav(..m.nav, queue: 0)),
    effect.none(),
  )
}

pub fn group_changed(
  m: Model,
  change: model.GroupChange,
) -> #(Model, Effect(Msg)) {
  case queue.group_rows(m, change), change.add, m.queue_editing {
    [], _, _ -> #(m, effect.none())
    refs, True, None -> #(common.pending(m, refs), store.add_to_queue(m, refs))
    refs, False, None -> #(
      common.pending(m, refs),
      store.remove_from_queue(m, refs),
    )
    refs, True, Some(name) -> named_queue_add(m, name, refs)
    refs, False, Some(name) -> named_queue_remove(m, name, refs)
  }
}

pub fn toggle_queued(m: Model, ref: ProblemRef) -> #(Model, Effect(Msg)) {
  case m.queue_editing {
    // A named queue is a list: in or out, and the card comes along
    // when a problem joins without one.
    Some(name) ->
      case set.contains(queue.members(m, m.queue_editing), ref) {
        True -> named_queue_remove(m, name, [ref])
        False -> named_queue_add(m, name, [ref])
      }
    None ->
      case model.card_for(m, ref) {
        None -> #(common.pending(m, [ref]), store.add_to_queue(m, [ref]))
        Some(state) ->
          case state.reps == 0 {
            True -> #(
              common.pending(m, [ref]),
              store.remove_from_queue(m, [ref]),
            )
            False -> #(m, store.set_suspended(m, ref, !state.suspended))
          }
      }
  }
}

pub fn add_all_shown(m: Model) -> #(Model, Effect(Msg)) {
  {
    let here = queue.members(m, m.queue_editing)
    case
      list.filter(queue.listed(m), fn(ref) { !set.contains(here, ref) }),
      m.queue_editing
    {
      [], _ -> #(m, effect.none())
      refs, None -> #(common.pending(m, refs), store.add_to_queue(m, refs))
      refs, Some(name) -> named_queue_add(m, name, refs)
    }
  }
}

pub fn remove_all_shown(m: Model) -> #(Model, Effect(Msg)) {
  case m.queue_editing {
    None ->
      case list.filter(queue.listed(m), fn(ref) { model.is_new(m, ref) }) {
        [] -> #(m, effect.none())
        refs -> #(common.pending(m, refs), store.remove_from_queue(m, refs))
      }
    Some(name) -> {
      let here = queue.members(m, m.queue_editing)
      case list.filter(queue.listed(m), fn(ref) { set.contains(here, ref) }) {
        [] -> #(m, effect.none())
        refs -> named_queue_remove(m, name, refs)
      }
    }
  }
}

pub fn cursor_moved(m: Model, delta: Int) -> #(Model, Effect(Msg)) {
  move_queue_cursor(m, fn(index, last) { int.clamp(index + delta, 0, last) })
}

pub fn cursor_jumped(m: Model, first: Bool) -> #(Model, Effect(Msg)) {
  move_queue_cursor(m, fn(_index, last) {
    case first {
      True -> 0
      False -> last
    }
  })
}

pub fn toggled_at_cursor(m: Model) -> #(Model, Effect(Msg)) {
  case queue_cursor_ref(m) {
    Ok(ref) -> toggle_queued(m, ref)
    Error(Nil) -> #(m, effect.none())
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
          queue_pending: [],
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
          True -> store.save_queues(m)
          False -> effect.none()
        },
      )
    }
    Error(failure) -> #(
      Model(..m, queue_pending: [], notice: Some(remote.error_message(failure))),
      effect.none(),
    )
  }
}

/// The rows the keyboard cursor can sit on in a pane, as toggle targets.
/// The queue screen's cursor. Its own mover rather than a fifth pane in
/// `move_cursor`: that one walks the browser's panes and its search override,
/// and this list has neither.
fn move_queue_cursor(
  m: Model,
  next: fn(Int, Int) -> Int,
) -> #(Model, Effect(Msg)) {
  let last = int.max(0, list.length(queue.listed(m)) - 1)
  let index = next(int.clamp(m.nav.queue, 0, last), last)
  #(
    Model(..m, nav: model.MenuNav(..m.nav, queue: index)),
    common.scroll_to(id.queue_row_id(index)),
  )
}

fn queue_cursor_ref(m: Model) -> Result(ProblemRef, Nil) {
  let rows = queue.listed(m)
  case list.drop(rows, int.clamp(m.nav.queue, 0, list.length(rows) - 1)) {
    [ref, ..] -> Ok(ref)
    [] -> Error(Nil)
  }
}

fn named_queue_add(
  m: Model,
  name: String,
  refs: List(ProblemRef),
) -> #(Model, Effect(Msg)) {
  let m = add_to_named_queue(m, name, refs)
  let #(m, carded) = enqueue_missing(m, refs)
  #(m, effect.batch([store.save_queues(m), carded]))
}

fn named_queue_remove(
  m: Model,
  name: String,
  refs: List(ProblemRef),
) -> #(Model, Effect(Msg)) {
  let m =
    Model(
      ..m,
      queues: list.map(m.queues, fn(queue) {
        case queue.name == name {
          True ->
            wire.Queue(
              ..queue,
              problems: list.filter(queue.problems, fn(ref) {
                !list.contains(refs, ref)
              }),
            )
          False -> queue
        }
      }),
    )
  #(m, store.save_queues(m))
}

/// Appends what the queue lacks, in the order given.
fn add_to_named_queue(m: Model, name: String, refs: List(ProblemRef)) -> Model {
  Model(
    ..m,
    queues: list.map(m.queues, fn(queue) {
      case queue.name == name {
        True ->
          wire.Queue(
            ..queue,
            problems: list.append(
              queue.problems,
              list.filter(list.unique(refs), fn(ref) {
                !list.contains(queue.problems, ref)
              }),
            ),
          )
        False -> queue
      }
    }),
  )
}

/// Cards for whichever of these problems have none yet.
fn enqueue_missing(m: Model, refs: List(ProblemRef)) -> #(Model, Effect(Msg)) {
  case list.filter(refs, fn(ref) { !model.is_queued(m, ref) }) {
    [] -> #(m, effect.none())
    missing -> #(common.pending(m, missing), store.add_to_queue(m, missing))
  }
}

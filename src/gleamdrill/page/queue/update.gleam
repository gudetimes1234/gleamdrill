//// The queue manager: its filters, cursor and naming, and every way it puts
//// problems in or takes them out.
////
//// The everything queue is the cards themselves, so adding or removing
//// there is a store call whose answer this page folds (`QueueChanged`) and
//// hands up. A named queue is a list in the shared state: an edit goes up
//// as `QueuesEdited`, and a problem joining one without a card gets one.

import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleam/set
import gleam/string
import gleamdrill/content/problem.{type ProblemRef}
import gleamdrill/domain/queue
import gleamdrill/model as shared_model
import gleamdrill/msg as app_msg
import gleamdrill/page/queue/model.{
  type Model, type Naming, Model, NewQueue, RenameQueue,
}
import gleamdrill/page/queue/msg.{type Msg}
import gleamdrill/platform/browser
import gleamdrill/shared.{type Change, type Shared}
import gleamdrill/shared/queues
import gleamdrill/store
import gleamdrill/view/id
import lustre/effect.{type Effect}

pub fn init(shared: Shared) -> #(Model, Effect(Msg), List(Change)) {
  #(model.init(shared.active_queue), effect.none(), [])
}

pub fn update(
  shared: Shared,
  page: Model,
  msg: Msg,
) -> #(Model, Effect(Msg), List(Change)) {
  // A named queue that is gone (deleted, or dropped by a reload) reads as
  // the everything queue from here on.
  let page = Model(..page, filter: filter(shared, page))
  case msg {
    msg.UserSearchedQueue(text) ->
      refilter(page, queue.Filter(..page.filter, search: text))
    msg.UserFilteredQueue(status) ->
      refilter(page, queue.Filter(..page.filter, status:))
    msg.UserSelectedQueue(name) -> {
      let page = Model(..page, naming: None)
      refilter(page, queue.Filter(..page.filter, editing: name))
    }
    msg.UserChangedGroup(group) ->
      case queue.group_rows(shared, page.filter, group) {
        [] -> none(page)
        refs -> change(shared, page, refs, add: group.add)
      }
    msg.UserToggledQueued(ref) -> toggle(shared, page, ref)
    msg.UserAddedAllShown -> {
      let here = queue.members(shared, page.filter.editing)
      case
        list.filter(listed(shared, page), fn(ref) { !set.contains(here, ref) })
      {
        [] -> none(page)
        refs -> change(shared, page, refs, add: True)
      }
    }
    msg.UserRemovedAllShown -> {
      let removable = case page.filter.editing {
        // Under everything only an unanswered card can be removed: its log
        // is the one thing that cannot be rebuilt.
        None -> fn(ref) { shared_model.is_new(shared, ref) }
        Some(_) -> {
          let here = queue.members(shared, page.filter.editing)
          fn(ref) { set.contains(here, ref) }
        }
      }
      case list.filter(listed(shared, page), removable) {
        [] -> none(page)
        refs -> change(shared, page, refs, add: False)
      }
    }
    msg.UserStartedNewQueue -> #(
      Model(..page, naming: Some(NewQueue(""))),
      focus(".queue-name-input"),
      [],
    )
    msg.UserStartedRenameQueue ->
      case page.filter.editing {
        Some(name) -> #(
          Model(..page, naming: Some(RenameQueue(name, name))),
          focus(".queue-name-input"),
          [],
        )
        None -> none(page)
      }
    msg.UserChangedQueueName(text) ->
      none(
        Model(..page, naming: case page.naming {
          Some(NewQueue(_)) -> Some(NewQueue(text))
          Some(RenameQueue(from, _)) -> Some(RenameQueue(from, text))
          None -> None
        }),
      )
    msg.UserCancelledQueueName -> none(Model(..page, naming: None))
    msg.UserSubmittedQueueName ->
      case page.naming {
        None -> none(page)
        Some(naming) -> submit_name(shared, page, naming)
      }
    msg.UserDeletedQueue ->
      case page.filter.editing {
        None -> none(page)
        Some(name) -> #(
          Model(
            ..page,
            naming: None,
            filter: queue.Filter(..page.filter, editing: None),
          ),
          effect.none(),
          [
            shared.QueuesEdited(queues.delete(shared.queues, name)),
            ..case shared.active_queue == Some(name) {
              True -> [shared.ActiveQueueChanged(None)]
              False -> []
            }
          ],
        )
      }
    msg.CursorMoved(delta) ->
      move_cursor(shared, page, fn(index, last) {
        int.clamp(index + delta, 0, last)
      })
    msg.CursorJumped(first) ->
      move_cursor(shared, page, fn(_index, last) {
        case first {
          True -> 0
          False -> last
        }
      })
    msg.ToggledAtCursor -> {
      let rows = listed(shared, page)
      case list.drop(rows, int.clamp(page.cursor, 0, list.length(rows) - 1)) {
        [ref, ..] -> toggle(shared, page, ref)
        [] -> none(page)
      }
    }
    msg.QueueChanged(result) -> #(Model(..page, pending: []), effect.none(), [
      shared.QueueChangeLanded(result),
    ])
    msg.UserFocusedSearch -> #(page, focus(".search"), [])
    msg.UserClickedStudy -> #(page, effect.none(), [
      shared.Dispatch(app_msg.UserClickedStudy),
    ])
    msg.UserClickedBack -> #(page, effect.none(), [
      shared.Navigate(shared_model.StudyRoute),
    ])
    msg.UserToggledHelp -> #(page, effect.none(), [shared.ToggleHelp])
  }
}

/// The rows the screen shows.
pub fn listed(shared: Shared, page: Model) -> List(ProblemRef) {
  queue.listed(shared, filter(shared, page))
}

/// The filter, with an editing queue that no longer exists dropped.
pub fn filter(shared: Shared, page: Model) -> queue.Filter {
  case page.filter.editing {
    Some(name) ->
      case list.any(shared.queues, fn(queue) { queue.name == name }) {
        True -> page.filter
        False -> queue.Filter(..page.filter, editing: None)
      }
    None -> page.filter
  }
}

fn refilter(
  page: Model,
  filter: queue.Filter,
) -> #(Model, Effect(Msg), List(Change)) {
  none(Model(..page, filter:, cursor: 0))
}

fn none(page: Model) -> #(Model, Effect(Msg), List(Change)) {
  #(page, effect.none(), [])
}

/// One problem in or out of the queue being edited. Under everything, a
/// card with history cannot leave -- it is paused or resumed instead.
fn toggle(
  shared: Shared,
  page: Model,
  ref: ProblemRef,
) -> #(Model, Effect(Msg), List(Change)) {
  case page.filter.editing {
    Some(_) -> {
      let member = set.contains(queue.members(shared, page.filter.editing), ref)
      change(shared, page, [ref], add: !member)
    }
    None ->
      case shared_model.card_for(shared, ref) {
        None -> change(shared, page, [ref], add: True)
        Some(state) ->
          case state.reps == 0 {
            True -> change(shared, page, [ref], add: False)
            False -> #(page, effect.none(), [
              shared.Dispatch(app_msg.UserToggledSuspend(ref)),
            ])
          }
      }
  }
}

/// Puts problems into the queue being edited, or takes them out.
fn change(
  shared: Shared,
  page: Model,
  refs: List(ProblemRef),
  add add: Bool,
) -> #(Model, Effect(Msg), List(Change)) {
  case page.filter.editing, add {
    None, True -> store_call(shared, page, refs, add: True)
    None, False -> store_call(shared, page, refs, add: False)
    Some(name), True -> {
      // A problem joining a list without a card gets one, in the same go.
      let #(page, carded, _) = case
        list.filter(refs, fn(ref) { !shared_model.is_queued(shared, ref) })
      {
        [] -> none(page)
        missing -> store_call(shared, page, missing, add: True)
      }
      #(page, carded, [
        shared.QueuesEdited(queues.add_to(shared.queues, name, refs)),
      ])
    }
    Some(name), False -> #(page, effect.none(), [
      shared.QueuesEdited(queues.remove_from(shared.queues, name, refs)),
    ])
  }
}

fn store_call(
  shared: Shared,
  page: Model,
  refs: List(ProblemRef),
  add add: Bool,
) -> #(Model, Effect(Msg), List(Change)) {
  #(
    Model(..page, pending: list.append(refs, page.pending)),
    case add {
      True -> store.add_to_queue(shared, refs, msg.QueueChanged)
      False -> store.remove_from_queue(shared, refs, msg.QueueChanged)
    },
    [],
  )
}

fn submit_name(
  shared: Shared,
  page: Model,
  naming: Naming,
) -> #(Model, Effect(Msg), List(Change)) {
  let name =
    string.trim(case naming {
      NewQueue(text) -> text
      RenameQueue(_, text) -> text
    })
  let taken =
    list.any(shared.queues, fn(queue) { queue.name == name })
    && case naming {
      RenameQueue(from, _) -> from != name
      NewQueue(_) -> True
    }
  let named = fn(page: Model) {
    Model(
      ..page,
      naming: None,
      filter: queue.Filter(..page.filter, editing: Some(name)),
    )
  }
  case name, taken, naming {
    "", _, _ -> #(page, effect.none(), [shared.Notice("A queue needs a name.")])
    _, True, _ -> #(page, effect.none(), [
      shared.Notice("There is already a queue called " <> name <> "."),
    ])
    _, False, NewQueue(_) -> #(named(page), effect.none(), [
      shared.QueuesEdited(queues.create(
        shared.queues,
        shared.active_track,
        name,
      )),
    ])
    _, False, RenameQueue(from, _) -> #(named(page), effect.none(), [
      shared.QueuesEdited(queues.rename(shared.queues, from, name)),
      ..case shared.active_queue == Some(from) {
        True -> [shared.ActiveQueueChanged(Some(name))]
        False -> []
      }
    ])
  }
}

/// The cursor, clamped to the rows, with its row scrolled into view.
fn move_cursor(
  shared: Shared,
  page: Model,
  next: fn(Int, Int) -> Int,
) -> #(Model, Effect(Msg), List(Change)) {
  let last = int.max(0, list.length(listed(shared, page)) - 1)
  let index = next(int.clamp(page.cursor, 0, last), last)
  #(Model(..page, cursor: index), scroll_to(id.queue_row_id(index)), [])
}

fn focus(selector: String) -> Effect(Msg) {
  use _dispatch, _root <- effect.before_paint
  browser.focus_element(selector)
}

fn scroll_to(row: String) -> Effect(Msg) {
  use _dispatch <- effect.from
  browser.scroll_into_view(row)
}

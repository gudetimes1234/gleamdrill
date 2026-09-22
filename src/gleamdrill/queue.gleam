//// What the scheduler says to drill next, and the counts derived from it.
////
//// This lives outside `gleamdrill.gleam` so the study screen can show what
//// "Study now" is about to serve. While it was private to the update loop the
//// dashboard could only report totals, and the three counts beside it each
//// re-walked the whole catalogue with their own copy of the filter -- three
//// chances for the number shown and the queue built to disagree.
////
//// New problems are chosen here rather than server-side because the server has
//// no catalogue: it knows which problems are queued, but not what order the
//// languages come in.
////
//// Nothing is introduced that the user did not queue. `fresh` draws from
//// cards with no reviews yet, and a card only exists because someone added
//// the problem on the queue screen. This used to be the opposite -- every
//// catalogue entry without a card was a candidate -- which meant the app
//// decided what you studied and the only way to refuse a problem was to
//// answer it once and then suspend it.

import fsrs
import gleam/dict
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/set.{type Set}
import gleam/string
import gleamdrill/model.{type Model}
import gleamdrill/problem.{type ProblemRef}
import gleamdrill/problems

/// Everything due, most overdue first, then new problems -- each capped by the
/// daily budget the server reports.
pub fn build(m: Model) -> List(ProblemRef) {
  list.append(due(m), fresh(m))
}

/// The problems a queue holds: every card for everything (`None`), or the
/// named list. A name nobody has is an empty queue, not everything.
pub fn members(m: Model, name: Option(String)) -> Set(ProblemRef) {
  case name {
    None -> set.from_list(dict.keys(m.cards))
    Some(name) ->
      case model.queue_named(m, name) {
        Ok(queue) -> set.from_list(queue.problems)
        Error(Nil) -> set.new()
      }
  }
}

/// The catalogue narrowed to the active queue, in catalogue order -- the
/// order `fresh` relies on to interleave languages.
pub fn scope(m: Model) -> List(ProblemRef) {
  let here = members(m, m.active_queue)
  problems.all_refs() |> list.filter(fn(ref) { set.contains(here, ref) })
}

/// Due cards the sitting would serve, most overdue first.
pub fn due(m: Model) -> List(ProblemRef) {
  scope(m)
  |> list.filter(fn(ref) { model.is_due(m, ref) })
  |> list.sort(fn(a, b) { int.compare(due_seconds(m, a), due_seconds(m, b)) })
  |> list.take(m.today.reviews_remaining)
}

/// Queued problems the sitting would introduce, never answered yet.
///
/// Round-robin across languages rather than catalogue order. The catalogue is
/// the same 150 problems repeated once per language, listed language by
/// language, so taking a flat prefix means a user who queued two of them gets
/// nothing but the first until its 150 are exhausted -- which is months. One
/// from each in turn is what makes a two-language choice mean anything on day
/// one.
pub fn fresh(m: Model) -> List(ProblemRef) {
  scope(m)
  |> list.filter(fn(ref) { model.is_new(m, ref) })
  |> list.chunk(fn(ref) { ref.category })
  |> interleave
  |> list.take(m.today.new_remaining)
}

/// Everything in the queue regardless of today's budget --
/// what the queue screen manages, as opposed to what this sitting serves.
pub fn queued(m: Model) -> List(ProblemRef) {
  scope(m)
}

/// Queued problems still waiting for their first outing, budget ignored. The
/// study screen needs this to tell "you have nothing queued" apart from
/// "you have queued plenty and spent today's allowance".
pub fn waiting_count(m: Model) -> Int {
  scope(m)
  |> list.count(fn(ref) { model.is_new(m, ref) })
}

pub fn due_count(m: Model) -> Int {
  list.length(due(m))
}

pub fn new_count(m: Model) -> Int {
  list.length(fresh(m))
}

/// The rows the queue screen shows, after its search box and three filters.
///
/// It lives here rather than in the view because "add all shown" acts on
/// exactly this list: if the button and the table disagreed about what "shown"
/// means, a bulk add would queue problems the user never saw. One definition,
/// two callers.
pub fn listed(m: Model) -> List(ProblemRef) {
  let refs = case string.trim(m.queue_search) {
    "" -> problems.all_refs()
    query -> problems.search_refs(query)
  }

  // Membership in the queue being edited: the card itself for everything,
  // the list for a named queue. Built once for the whole walk.
  let here = members(m, m.queue_editing)
  refs
  |> list.filter(fn(ref) {
    case m.queue_language {
      Some(tag) -> problems.language_tag(ref.category) == tag
      None -> True
    }
  })
  |> list.filter(fn(ref) { matches_status(m, here, ref) })
}

/// `listed`, cut into topics: (category, subcategory, its rows), in order.
///
/// Both the catalogue and a search walk category, then subcategory, then
/// problem, so the rows of one topic are always consecutive and chunking on
/// the pair loses nothing. The screen renders these; the cursor still walks
/// the flat `listed`, and the two agree because this is the same list.
pub fn grouped(m: Model) -> List(#(String, String, List(ProblemRef))) {
  listed(m)
  |> list.chunk(fn(ref) { #(ref.category, ref.subcategory) })
  |> list.filter_map(fn(rows) {
    case rows {
      [first, ..] -> Ok(#(first.category, first.subcategory, rows))
      [] -> Error(Nil)
    }
  })
}

/// The rows a topic's bulk button would touch: its listed rows, narrowed to
/// the ones the action can apply to, and to Easy when asked.
pub fn group_rows(m: Model, change: model.GroupChange) -> List(ProblemRef) {
  let here = members(m, m.queue_editing)
  listed(m)
  |> list.filter(fn(ref) {
    ref.category == change.category && ref.subcategory == change.subcategory
  })
  |> list.filter(fn(ref) {
    // Under everything only an unanswered card can be removed (its log
    // is the one thing that cannot be rebuilt); a named queue is a list,
    // and any member can leave it.
    case change.add, m.queue_editing {
      True, _ -> !set.contains(here, ref)
      False, None -> model.is_new(m, ref)
      False, Some(_) -> set.contains(here, ref)
    }
  })
  |> list.filter(fn(ref) {
    case change.easy_only {
      True -> problems.difficulty_of(ref) == Some(problem.Easy)
      False -> True
    }
  })
}

fn matches_status(m: Model, here: Set(ProblemRef), ref: ProblemRef) -> Bool {
  let member = set.contains(here, ref)
  case m.queue_status {
    model.AnyStatus -> True
    model.Queued -> member
    model.QueuedNew -> member && model.is_new(m, ref)
    model.QueuedDue -> member && model.is_due(m, ref)
    model.QueuedPaused ->
      member
      && case model.card_for(m, ref) {
        Some(state) -> state.suspended
        None -> False
      }
    model.Unqueued -> !member
  }
}

/// One from each group in turn, until every group is spent. Groups run dry at
/// different times -- a language with three problems left should not stop the
/// rotation -- so an empty group is dropped rather than ending the round.
fn interleave(groups: List(List(a))) -> List(a) {
  case list.filter(groups, fn(group) { group != [] }) {
    [] -> []
    live -> {
      let heads = list.filter_map(live, list.first)
      let tails = list.filter_map(live, list.rest)
      list.append(heads, interleave(tails))
    }
  }
}

/// How overdue a card is, for ordering. Missing cards sort last; they are
/// filtered out before this is used, so the fallback is only a total-function
/// requirement.
fn due_seconds(m: Model, ref: ProblemRef) -> Int {
  case model.card_for(m, ref) {
    option.Some(state) -> fsrs.interval_seconds(state.card, m.now)
    None -> 0
  }
}

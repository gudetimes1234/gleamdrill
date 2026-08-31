//// What the scheduler says to drill next, and the counts derived from it.
////
//// This lives outside `algodrill.gleam` so the study screen can show what
//// "Study now" is about to serve. While it was private to the update loop the
//// dashboard could only report totals, and the three counts beside it each
//// re-walked the whole catalogue with their own copy of the filter -- three
//// chances for the number shown and the queue built to disagree.
////
//// New problems are chosen here rather than server-side because the server has
//// no catalogue: cards only exist once reviewed, so "never seen" is a question
//// only this bundle can answer.

import algodrill/model.{type Model}
import algodrill/problem.{type ProblemRef}
import algodrill/problems
import fsrs
import gleam/int
import gleam/list
import gleam/option.{None}

/// Everything due, most overdue first, then new problems -- each capped by the
/// daily budget the server reports.
pub fn build(m: Model) -> List(ProblemRef) {
  list.append(due(m), fresh(m))
}

/// Due cards the sitting would serve, most overdue first.
pub fn due(m: Model) -> List(ProblemRef) {
  audible(m)
  |> list.filter(fn(ref) { model.is_due(m, ref) })
  |> list.sort(fn(a, b) { int.compare(due_seconds(m, a), due_seconds(m, b)) })
  |> list.take(m.today.reviews_remaining)
}

/// New problems the sitting would introduce.
///
/// Round-robin across languages rather than catalogue order. The catalogue is
/// the same 150 problems repeated once per language, listed language by
/// language, so taking a flat prefix means a user who picked two of them gets
/// nothing but the first until its 150 are exhausted -- which is months. One
/// from each in turn is what makes a two-language choice mean anything on day
/// one.
pub fn fresh(m: Model) -> List(ProblemRef) {
  audible(m)
  |> list.filter(fn(ref) { model.card_for(m, ref) == None })
  |> list.chunk(fn(ref) { ref.category })
  |> interleave
  |> list.take(m.today.new_remaining)
}

/// Due cards the language filter is currently hiding. Not a failure state:
/// they wait, and FSRS reschedules from real elapsed time whenever they are
/// finally answered.
pub fn hidden(m: Model) -> List(ProblemRef) {
  problems.all_refs()
  |> list.filter(fn(ref) { model.is_due(m, ref) && muted(m, ref) })
}

pub fn due_count(m: Model) -> Int {
  list.length(due(m))
}

pub fn new_count(m: Model) -> Int {
  list.length(fresh(m))
}

pub fn hidden_count(m: Model) -> Int {
  list.length(hidden(m))
}

/// The catalogue minus whatever today's language filter mutes.
fn audible(m: Model) -> List(ProblemRef) {
  problems.all_refs() |> list.filter(fn(ref) { !muted(m, ref) })
}

fn muted(m: Model, ref: ProblemRef) -> Bool {
  model.language_muted(m, problems.language_tag(ref.category))
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

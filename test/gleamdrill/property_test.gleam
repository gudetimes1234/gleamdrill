//// Property tests: rules that must hold for any sequence of answers, not
//// just the handful the example tests spell out. qcheck generates the
//// sequences and shrinks a failure down to the smallest one that breaks.

import fsrs
import gleam/dict
import gleam/list
import gleam/option.{None}
import gleam/order
import gleam/time/duration
import gleam/time/timestamp.{type Timestamp}
import gleamdrill/domain/guest
import qcheck
import wire

/// One answer: which of a few problems, how it went, and how long after the
/// previous answer it came (up to ten days).
type Answer {
  Answer(problem: Int, rating: fsrs.Rating, gap_seconds: Int)
}

fn answer() -> qcheck.Generator(Answer) {
  use problem <- qcheck.bind(qcheck.bounded_int(0, 3))
  use rating <- qcheck.bind(
    qcheck.from_generators(qcheck.constant(fsrs.Again), [
      qcheck.constant(fsrs.Hard),
      qcheck.constant(fsrs.Good),
      qcheck.constant(fsrs.Easy),
    ]),
  )
  use gap_seconds <- qcheck.map(qcheck.bounded_int(0, 10 * 86_400))
  Answer(problem:, rating:, gap_seconds:)
}

fn problem(index: Int) -> wire.ProblemRef {
  let titles = ["Two Sum", "Valid Anagram", "Group Anagrams", "Top K"]
  let assert Ok(title) = list.drop(titles, index) |> list.first
  wire.ProblemRef("NeetCode 150", "Arrays & Hashing", title)
}

fn review(of: wire.ProblemRef, rating: fsrs.Rating) -> wire.Review {
  wire.Review(
    problem: of,
    rating:,
    duration_ms: None,
    auto_failed: False,
    revealed: False,
    practice: False,
    recall: False,
  )
}

const start = 1_800_000_000

/// A store with every answer in it, and the clock after the last.
fn answered(answers: List(Answer)) -> #(guest.Local, Timestamp) {
  list.fold(
    answers,
    #(guest.empty(), timestamp.from_unix_seconds(start)),
    fn(acc, a) {
      let #(store, now) = acc
      let now = timestamp.add(now, duration.seconds(a.gap_seconds))
      let #(store, _) =
        guest.record(
          store,
          wire.default_settings(),
          review(problem(a.problem), a.rating),
          now,
          day(now),
          0.5,
        )
      #(store, now)
    },
  )
}

fn day(now: Timestamp) -> Int {
  let #(seconds, _) = timestamp.to_unix_seconds_and_nanoseconds(now)
  seconds / 86_400
}

/// Undo is exact: recording one more answer and taking it back leaves the
/// cards, the day tallies and the log as they were, whatever came before.
pub fn unrecord_undoes_record_test() {
  use #(history, last) <- qcheck.given(qcheck.tuple2(
    qcheck.list_from(answer()),
    answer(),
  ))
  let #(store, now) = answered(history)
  let target = problem(last.problem)
  let card_before = dict.get(store.cards, target) |> option.from_result
  let now = timestamp.add(now, duration.seconds(last.gap_seconds))
  let #(graded, _) =
    guest.record(
      store,
      wire.default_settings(),
      review(target, last.rating),
      now,
      day(now),
      0.5,
    )
  let assert Ok(undone) = guest.unrecord(graded, target, card_before, day(now))
  assert undone.cards == store.cards
  assert within_a_year(undone, day(now)) == within_a_year(store, day(now))
  assert undone.log == store.log
}

/// The day tallies the heatmap can show from `today`. A day falls out of the
/// stored year when the clock moves past it, and an undo does not bring it
/// back -- nor need to, as nothing reads it.
fn within_a_year(store: guest.Local, today: Int) {
  list.map(store.history, fn(entry) {
    let #(track, history) = entry
    #(
      track,
      guest.History(
        ..history,
        days: list.filter(history.days, fn(d) { today - d.day < 365 }),
      ),
    )
  })
}

/// Every answer counts one rep, never schedules into the past, and costs a
/// lapse exactly when a card that had graduated is forgotten.
pub fn record_counts_reps_and_lapses_test() {
  use #(history, last) <- qcheck.given(qcheck.tuple2(
    qcheck.list_from(answer()),
    answer(),
  ))
  let #(store, now) = answered(history)
  let target = problem(last.problem)
  let now = timestamp.add(now, duration.seconds(last.gap_seconds))
  let before = dict.get(store.cards, target)
  let #(_, after) =
    guest.record(
      store,
      wire.default_settings(),
      review(target, last.rating),
      now,
      day(now),
      0.5,
    )
  let #(reps, lapses, graduated) = case before {
    Ok(card) -> #(card.reps, card.lapses, card.card.state == fsrs.Review)
    Error(Nil) -> #(0, 0, False)
  }
  assert after.reps == reps + 1
  assert after.lapses
    == case graduated && last.rating == fsrs.Again {
      True -> lapses + 1
      False -> lapses
    }
  assert timestamp.compare(after.card.due, now) != order.Lt
}

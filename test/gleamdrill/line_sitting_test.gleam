//// Line Drill inside a sitting: which cards open in it, the `l` toggle, what
//// a grade logs, and that undo puts the blanks back exactly as they were.

import fsrs
import gleam/dict
import gleam/list
import gleam/option.{None, Some}
import gleam/string
import gleamdrill/domain/line_drill
import gleamdrill/model as shared_model
import gleamdrill/page/sitting/keys
import gleamdrill/page/sitting/model as sitting
import gleamdrill/page/sitting/msg
import gleamdrill/page/sitting/update
import wire

fn reverse_list() -> wire.ProblemRef {
  wire.ProblemRef("NeetCode 150", "Linked List", "Reverse Linked List")
}

/// Line Drill is Python only, so the Go track has a problem without it.
fn go_two_sum() -> wire.ProblemRef {
  wire.ProblemRef("NeetCode 150 (Go)", "Arrays & Hashing", "Two Sum")
}

/// The shared state with `ref` selected for a hand-picked sitting, on the
/// drill screen, and its card (if any) in `state`.
fn shared_with(
  ref: wire.ProblemRef,
  state: option.Option(fsrs.State),
) -> shared_model.Model {
  let now = fsrs.from_epoch(1_787_788_818.0)
  let base = shared_model.default()
  let cards = case state {
    None -> dict.new()
    Some(state) ->
      dict.from_list([
        #(
          ref,
          wire.CardState(
            problem: ref,
            card: fsrs.Card(..fsrs.new_card(now), state:),
            reps: 3,
            lapses: 0,
            suspended: False,
            introduced_at: Some(now),
          ),
        ),
      ])
  }
  shared_model.Model(
    ..base,
    route: shared_model.DrillRoute,
    selected: [ref],
    cards:,
  )
}

fn opened(shared: shared_model.Model) -> sitting.Model {
  let assert Ok(#(page, _, _)) = update.start_manual(shared)
  page
}

fn send(shared: shared_model.Model, page: sitting.Model, message: msg.Msg) {
  let #(page, _, _) = update.update(shared, page, message)
  page
}

fn state_of(page: sitting.Model) -> line_drill.LineState {
  let assert Some(state) = page.line_drill
  state
}

pub fn a_new_card_opens_in_line_drill_test() -> Nil {
  let shared = shared_with(reverse_list(), None)
  let page = opened(shared)
  assert page.line_mode
  assert line_drill.position(state_of(page)) == 0
  assert keys.label(shared, page) == "LINE \u{b7} PYTHON"
}

pub fn a_learning_or_relearning_card_opens_in_line_drill_test() -> Nil {
  assert opened(shared_with(reverse_list(), Some(fsrs.Learning(1)))).line_mode
  assert opened(shared_with(reverse_list(), Some(fsrs.Relearning(0)))).line_mode
}

pub fn a_review_card_opens_free_typed_test() -> Nil {
  let shared = shared_with(reverse_list(), Some(fsrs.Review))
  let page = opened(shared)
  assert !page.line_mode
  assert page.line_drill == None
  // The rail still teaches the pattern, guessed from the open draft.
  assert page.rail_pattern == Some("linked-list-pointers")
  assert keys.label(shared, page) == "DRILL \u{b7} PYTHON"
  assert keys.dispatch(shared, page, "l") == Ok(msg.LineModeToggled)
}

pub fn a_problem_without_patterns_is_unchanged_test() -> Nil {
  let shared = shared_with(go_two_sum(), None)
  let page = opened(shared)
  assert !page.line_mode
  assert page.line_drill == None
  assert page.rail_pattern == None
  assert keys.label(shared, page) == "DRILL \u{b7} GO"
  assert keys.dispatch(shared, page, "l") != Ok(msg.LineModeToggled)
  // Toggling anyway changes nothing.
  assert send(shared, page, msg.LineModeToggled) == page
  let review = update.review_for(shared, page, go_two_sum(), fsrs.Good, 1000)
  assert review.mode == wire.Free
}

pub fn l_toggles_both_ways_and_keeps_the_typed_lines_test() -> Nil {
  let shared = shared_with(reverse_list(), None)
  let page = opened(shared)
  assert keys.dispatch(shared, page, "l") == Ok(msg.LineModeToggled)

  let typed =
    page
    |> send(shared, _, msg.LineSubmitted("previous = None"))
    |> send(shared, _, msg.LineSubmitted("while head is not None:"))
  assert line_drill.position(state_of(typed)) == 2

  let free = send(shared, typed, msg.LineModeToggled)
  assert !free.line_mode
  assert string.contains(free.draft, "previous = None")
  assert string.contains(free.draft, "while head is not None:")
  assert keys.dispatch(shared, free, "l") == Ok(msg.LineModeToggled)

  let back = send(shared, free, msg.LineModeToggled)
  assert back.line_mode
  assert line_drill.position(state_of(back)) == 2
}

pub fn a_line_attempt_is_logged_as_line_test() -> Nil {
  let shared = shared_with(reverse_list(), None)
  let page = opened(shared)
  let review = update.review_for(shared, page, reverse_list(), fsrs.Good, 1000)
  assert review.mode == wire.Line

  // Leaving for the free editor after locking a line is still assisted.
  let left =
    page
    |> send(shared, _, msg.LineSubmitted("previous = None"))
    |> send(shared, _, msg.LineModeToggled)
  assert !left.line_mode
  assert update.review_for(shared, left, reverse_list(), fsrs.Good, 1000).mode
    == wire.Line

  // Leaving before typing anything is a free attempt.
  let untouched = send(shared, page, msg.LineModeToggled)
  assert update.review_for(shared, untouched, reverse_list(), fsrs.Good, 1000).mode
    == wire.Free
}

pub fn undo_restores_the_line_state_exactly_test() -> Nil {
  let shared = shared_with(reverse_list(), None)
  let before =
    opened(shared)
    |> send(shared, _, msg.LineSubmitted("previous = None"))
    |> send(shared, _, msg.LineSubmitted("while head"))
    |> send(shared, _, msg.LineHintShown)
    |> send(shared, _, msg.LineRevealed)

  let graded = send(shared, before, msg.UserGraded(fsrs.Hard))
  let assert Some(point) = graded.undo
  // Moved on: the next problem's face has replaced this one's.
  let moved =
    sitting.Model(
      ..graded,
      line_drill: None,
      line_mode: False,
      rail_pattern: None,
    )
  let outcome =
    wire.UndoOutcome(
      now: fsrs.from_epoch(1_787_788_818.0),
      card: None,
      today: shared.today,
    )
  let restored = send(shared, moved, msg.UndoRecorded(point, Ok(outcome)))

  assert restored.line_drill == before.line_drill
  assert restored.line_mode == before.line_mode
  assert restored.rail_pattern == before.rail_pattern
  assert restored.draft == before.draft
  assert list.length(restored.sitting) == list.length(before.sitting)
}

pub fn a_pattern_switch_drops_the_typed_lines_from_the_draft_test() -> Nil {
  let ref =
    wire.ProblemRef("NeetCode 150", "Two Pointers", "Trapping Rain Water")
  let shared = shared_with(ref, None)
  let asked =
    opened(shared)
    |> send(shared, _, msg.LineSubmitted("left, right = 0, len(height) - 1"))
    |> send(shared, _, msg.LinePatternCycled)
  assert state_of(asked).picking != None

  let switched = send(shared, asked, msg.LinePatternConfirmed)
  assert line_drill.position(state_of(switched)) == 0
  let free = send(shared, switched, msg.LineModeToggled)
  assert !string.contains(free.draft, "left, right")
}

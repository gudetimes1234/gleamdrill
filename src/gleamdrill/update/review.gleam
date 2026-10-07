//// Grading and the review log: starting a scheduled sitting (typed or
//// recall), recording a grade with its undo point, undoing it, and
//// parking a card.

import fsrs
import gleam/dict
import gleam/option.{None, Some}
import gleamdrill/browser
import gleamdrill/local
import gleamdrill/model.{
  type Model, AwaitingGrade, DrillRoute, Guest, Model, NoPane, NotGrading,
  SolutionPane, SubmittingGrade,
}
import gleamdrill/msg.{type Msg}
import gleamdrill/problem.{type ProblemRef}
import gleamdrill/queue
import gleamdrill/remote.{type ApiError}
import gleamdrill/store
import gleamdrill/update/common
import lustre/effect.{type Effect}
import wire

pub fn start_study(m: Model) -> #(Model, Effect(Msg)) {
  case queue.build(m) {
    [] -> #(
      Model(
        ..m,
        notice: Some(case m.active_queue, queue.scope(m) {
          Some(name), [] ->
            "\"" <> name <> "\" is empty. Add problems on the queue screen."
          _, _ ->
            "Nothing to study right now. Come back when cards are due, or pick problems by hand."
        }),
      ),
      effect.none(),
    )
    queue ->
      common.with_prefetch(#(
        Model(
          ..common.open_first(Model(..m, studying: True), queue),
          // A scheduled sitting is one pass: FSRS decides when a card comes
          // back, so repeating it three times now would just be three
          // same-day reviews.
          iteration_count: 1,
        ),
        effect.none(),
      ))
  }
}

pub fn start_recall(m: Model) -> #(Model, Effect(Msg)) {
  case queue.build(m) {
    [] -> #(
      Model(
        ..m,
        notice: Some(
          "Nothing to recall right now. Come back when cards are due.",
        ),
      ),
      effect.none(),
    )
    queue -> #(
      Model(
        ..common.open_first(Model(..m, studying: True, recall: True), queue),
        iteration_count: 1,
      ),
      effect.none(),
    )
  }
}

pub fn reveal_recall(m: Model) -> #(Model, Effect(Msg)) {
  #(
    Model(
      ..m,
      revealed_solution: Some(0),
      // A recall card is read, not written: the whole ladder is the card.
      nudge_shown: True,
      whole_thing_shown: True,
      grading: AwaitingGrade,
    ),
    effect.none(),
  )
}

pub fn graded(m: Model, rating: fsrs.Rating) -> #(Model, Effect(Msg)) {
  case m.grading, model.current_ref(m) {
    // Guard against a second press while the first is in flight: a review
    // must not be recorded twice.
    SubmittingGrade, _ -> #(m, effect.none())
    _, Error(Nil) -> #(m, effect.none())
    _, Ok(ref) -> {
      // The review deletes this problem's draft; a save still queued
      // from the last keystroke must not put it back.
      browser.cancel_debounce("draft-save")
      #(
        Model(
          ..m,
          grading: SubmittingGrade,
          sitting: [
            model.SittingEntry(
              problem: ref,
              pressed: rating,
              duration_ms: browser.now_ms() - m.opened_at_ms,
              passed: model.test_passed(m),
              clean: model.test_passed(m) && !common.answer_given_away(m),
            ),
            ..m.sitting
          ],
          // Everything needed to stand here again if the grade was a slip.
          undo: Some(model.UndoPoint(
            problem: ref,
            selected: m.selected,
            problem_index: m.problem_index,
            current_iteration: m.current_iteration,
            iteration_count: m.iteration_count,
            studying: m.studying,
            recall: m.recall,
            draft: m.draft,
            run: m.run,
            revealed_solution: m.revealed_solution,
            nudge_shown: m.nudge_shown,
            whole_thing_shown: m.whole_thing_shown,
            walk: m.walk,
            walk_code_seen: m.walk_code_seen,
            duration_ms: browser.now_ms() - m.opened_at_ms,
            card_before: model.card_for(m, ref),
          )),
        ),
        store.record_review(m, case m.recall {
          // Revealing is the mechanism here, not a peek, and there was no
          // code to time: the row says "recall" and nothing else.
          True ->
            wire.Review(
              problem: ref,
              rating:,
              duration_ms: None,
              auto_failed: False,
              revealed: False,
              practice: !m.studying,
              recall: True,
            )
          False ->
            wire.Review(
              problem: ref,
              rating:,
              duration_ms: Some(browser.now_ms() - m.opened_at_ms),
              // An ungraded card's run is a demonstration, not a test, so
              // it is never logged as a failure.
              auto_failed: case common.current_problem(m) {
                Ok(current) ->
                  problem.graded(current) && model.run_failed(m.run)
                Error(Nil) -> model.run_failed(m.run)
              },
              revealed: case common.current_problem(m) {
                Ok(current) -> model.answer_revealed(m, current.approach)
                Error(Nil) -> m.revealed_solution != None
              },
              // A hand-picked sitting is practice, not a scheduled review.
              practice: !m.studying,
              recall: False,
            )
        }),
      )
    }
  }
}

pub fn recorded(
  m: Model,
  result: Result(wire.ReviewOutcome, ApiError),
) -> #(Model, Effect(Msg)) {
  case result {
    Ok(outcome) -> {
      let cards = common.fold_card(m, m.cards, outcome.card)
      let recorded =
        Model(
          ..m,
          now: outcome.now,
          today: outcome.today,
          cards:,
          // The store dropped the draft with the review; so does the copy
          // in memory, or a reopen this session would still restore it.
          drafts: local.drop_draft(m.drafts, outcome.card.problem),
          upgrade_prompt: common.escalate(m),
        )
      case m.grading {
        // A graded drill moves on by itself; a quiz waits for Next, because
        // the explanation is worth reading first.
        SubmittingGrade -> {
          // A Blitz card that was graded was solved in time: its result is
          // the sitting entry just recorded, and the next card's clock
          // starts from now.
          let recorded = case m.blitz, m.sitting {
            Some(blitz), [entry, ..] ->
              Model(
                ..recorded,
                blitz: Some(
                  model.Blitz(
                    ..blitz,
                    results: [
                      model.BlitzResult(
                        problem: entry.problem,
                        passed: entry.passed,
                        duration_ms: entry.duration_ms,
                        expired: False,
                      ),
                      ..blitz.results
                    ],
                    deadline_ms: browser.now_ms() + blitz.per_card_ms,
                    expired_flash: False,
                  ),
                ),
              )
            _, _ -> recorded
          }
          common.advance(Model(..recorded, grading: NotGrading))
        }
        _ -> #(recorded, effect.none())
      }
    }
    Error(failure) -> #(
      Model(
        ..m,
        undo: None,
        grading: case m.grading {
          SubmittingGrade -> AwaitingGrade
          other -> other
        },
        storage_full: m.mode == Guest || m.storage_full,
        notice: Some(remote.error_message(failure)),
      ),
      effect.none(),
    )
  }
}

pub fn undo(m: Model) -> #(Model, Effect(Msg)) {
  case m.undo, m.grading {
    // Not while a grade is still being saved: the point would be stale.
    Some(point), NotGrading | Some(point), AwaitingGrade -> #(
      Model(..m, undo: None),
      store.undo_review(m, point),
    )
    _, _ -> #(m, effect.none())
  }
}

pub fn undo_recorded(
  m: Model,
  point: model.UndoPoint,
  result: Result(wire.UndoOutcome, ApiError),
) -> #(Model, Effect(Msg)) {
  case result {
    Ok(outcome) -> {
      let cards = case outcome.card {
        Some(card) -> common.fold_card(m, m.cards, card)
        None -> dict.delete(m.cards, point.problem)
      }
      // Undoing the review that created the card un-creates it, and a
      // queue never names a problem without one.
      let queues = case outcome.card {
        Some(_) -> m.queues
        None -> model.drop_from_queues(m.queues, [point.problem])
      }
      let queues_effect = case queues == m.queues {
        True -> effect.none()
        False -> store.save_queues(Model(..m, queues:))
      }
      // Back on the problem as it was when the grade was pressed, with the
      // clock where it stood, waiting for the grade you meant.
      #(
        Model(
          ..m,
          now: outcome.now,
          today: outcome.today,
          cards:,
          queues:,
          route: DrillRoute,
          selected: point.selected,
          problem_index: point.problem_index,
          current_iteration: point.current_iteration,
          iteration_count: point.iteration_count,
          studying: point.studying,
          recall: point.recall,
          draft: point.draft,
          run: point.run,
          revealed_solution: point.revealed_solution,
          nudge_shown: point.nudge_shown,
          whole_thing_shown: point.whole_thing_shown,
          walk: point.walk,
          walk_code_seen: point.walk_code_seen,
          slot: case point.revealed_solution {
            Some(_) -> SolutionPane
            None -> NoPane
          },
          grading: AwaitingGrade,
          opened_at_ms: browser.now_ms() - point.duration_ms,
          sitting: case m.sitting {
            [_, ..rest] -> rest
            [] -> []
          },
          exam_answers: [],
          choice: None,
          graded: False,
          notice: None,
        ),
        queues_effect,
      )
    }
    Error(failure) -> #(
      Model(..m, undo: Some(point), notice: Some(remote.error_message(failure))),
      effect.none(),
    )
  }
}

pub fn toggle_suspend(m: Model, ref: ProblemRef) -> #(Model, Effect(Msg)) {
  case model.card_for(m, ref) {
    None -> #(m, effect.none())
    Some(state) -> #(m, store.set_suspended(m, ref, !state.suspended))
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

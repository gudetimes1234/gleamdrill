//// The system-design board and quiz drills: the cursor over the palette,
//// picks and choices, and the self-grading submits.

import fsrs
import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleam/result
import gleamdrill/board
import gleamdrill/browser
import gleamdrill/model.{type Model, Model}
import gleamdrill/msg.{type Msg}
import gleamdrill/store
import gleamdrill/update/common
import gleamdrill/view/id
import lustre/effect.{type Effect}
import wire

pub fn quiz_moved(m: Model, delta: Int) -> #(Model, Effect(Msg)) {
  case m.graded, common.current_quiz(m) {
    False, Ok(quiz) -> {
      let last = list.length(quiz.choices) - 1
      let next = case m.choice {
        Some(current) -> int.clamp(current + delta, 0, last)
        // First press lands on an edge, so j starts at the top and k at
        // the bottom.
        None ->
          case delta > 0 {
            True -> 0
            False -> last
          }
      }
      #(Model(..m, choice: Some(next)), effect.none())
    }
    _, _ -> #(m, effect.none())
  }
}

pub fn moved(m: Model, delta: Int) -> #(Model, Effect(Msg)) {
  case m.graded {
    True -> #(m, effect.none())
    False -> move_board_cursor(m, m.board_cursor + delta)
  }
}

pub fn shelf_moved(m: Model, delta: Int) -> #(Model, Effect(Msg)) {
  case m.graded, board.at(m.board_cursor) {
    False, Ok(piece) -> {
      // Shelves are six long and laid out in order, so the next one
      // starts at the first piece whose family differs -- found by
      // walking the family list rather than by arithmetic, so a shelf
      // that changes size does not break the jump.
      let shelves = board.families()
      let here = index_of_family(shelves, piece.family, 0)
      let assert Ok(target) =
        list.drop(shelves, int.clamp(here + delta, 0, list.length(shelves) - 1))
        |> list.first
      case list.first(board.pieces_in(target)) {
        Ok(first) -> move_board_cursor(m, board.index_of(first))
        Error(Nil) -> #(m, effect.none())
      }
    }
    _, _ -> #(m, effect.none())
  }
}

pub fn jumped(m: Model, to_top: Bool) -> #(Model, Effect(Msg)) {
  case m.graded {
    True -> #(m, effect.none())
    False ->
      move_board_cursor(m, case to_top {
        True -> 0
        False -> list.length(board.palette()) - 1
      })
  }
}

pub fn toggled_at_cursor(m: Model) -> #(Model, Effect(Msg)) {
  case board.at(m.board_cursor) {
    Ok(piece) -> toggle_piece(m, piece.id)
    Error(Nil) -> #(m, effect.none())
  }
}

pub fn picked_choice(m: Model, index: Int) -> #(Model, Effect(Msg)) {
  case m.graded {
    True -> #(m, effect.none())
    False -> #(Model(..m, choice: Some(index)), effect.none())
  }
}

pub fn submitted_answer(m: Model) -> #(Model, Effect(Msg)) {
  case m.graded, m.choice, common.current_quiz(m), model.current_ref(m) {
    False, Some(picked), Ok(quiz), Ok(ref) -> {
      let right = picked == quiz.correct
      #(
        Model(
          ..m,
          graded: True,
          // Appended at the head; the report only groups and counts, so
          // the order does not matter.
          exam_answers: [#(ref, right), ..m.exam_answers],
        ),
        // A quiz grades itself: the answer is either right or it is not,
        // so there is no Hard/Good/Easy judgement to ask for. The review
        // is recorded now and the user still presses Next, because the
        // explanation is worth reading before moving on.
        store.record_review(
          m,
          wire.Review(
            problem: ref,
            rating: case right {
              True -> fsrs.Good
              False -> fsrs.Again
            },
            duration_ms: Some(browser.now_ms() - m.opened_at_ms),
            auto_failed: !right,
            revealed: False,
            // The exam is an assessment, not practice.
            practice: False,
            recall: False,
          ),
        ),
      )
    }
    _, _, _, _ -> #(m, effect.none())
  }
}

pub fn toggle_piece(m: Model, id: String) -> #(Model, Effect(Msg)) {
  case m.graded, board.find(id) {
    // Once submitted the board is a verdict, not a form.
    True, _ | _, Error(Nil) -> #(m, effect.none())
    False, Ok(piece) -> #(
      Model(
        ..m,
        board_picks: case list.contains(m.board_picks, id) {
          True -> list.filter(m.board_picks, fn(held) { held != id })
          False -> [id, ..m.board_picks]
        },
        // A click moves the cursor to what was clicked, so switching back
        // to the keyboard carries on from where the mouse left off.
        board_cursor: board.index_of(piece),
      ),
      effect.none(),
    )
  }
}

pub fn submitted_board(m: Model) -> #(Model, Effect(Msg)) {
  case m.graded, current_board(m), model.current_ref(m) {
    False, Ok(answer), Ok(ref) -> {
      let duration_ms = browser.now_ms() - m.opened_at_ms
      let graded = board.grade(m.board_picks, answer, duration_ms)
      #(
        Model(
          ..m,
          graded: True,
          // A SittingEntry, not an exam answer: `common.advance_inner` routes a
          // sitting with any exam answers to the exam report, and a board
          // belongs in the summary with every other graded card.
          sitting: [
            model.SittingEntry(
              problem: ref,
              pressed: graded.rating,
              duration_ms: duration_ms,
              passed: graded.rating != fsrs.Again,
              clean: graded.percent == 100 && graded.wrong == [],
            ),
            ..m.sitting
          ],
        ),
        // A board grades itself: the selection either names the system or
        // it does not, so there is no Hard/Good/Easy judgement to ask for.
        // The review is recorded now and the user still presses Next,
        // because the verdict is worth reading before moving on.
        store.record_review(
          m,
          wire.Review(
            problem: ref,
            rating: graded.rating,
            duration_ms: Some(duration_ms),
            auto_failed: graded.rating == fsrs.Again,
            revealed: False,
            practice: !m.studying,
            recall: False,
          ),
        ),
      )
    }
    _, _, _ -> #(m, effect.none())
  }
}

fn move_board_cursor(m: Model, to: Int) -> #(Model, Effect(Msg)) {
  let next = int.clamp(to, 0, list.length(board.palette()) - 1)
  #(Model(..m, board_cursor: next), common.scroll_to(id.board_chip_id(next)))
}

fn index_of_family(
  families: List(board.Family),
  wanted: board.Family,
  seen: Int,
) -> Int {
  case families {
    [] -> seen
    [first, ..rest] ->
      case first == wanted {
        True -> seen
        False -> index_of_family(rest, wanted, seen + 1)
      }
  }
}

fn current_board(m: Model) -> Result(board.Board, Nil) {
  common.current_problem(m)
  |> result.try(fn(found) { option.to_result(found.board, Nil) })
}

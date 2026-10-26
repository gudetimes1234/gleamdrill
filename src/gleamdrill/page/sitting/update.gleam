//// A sitting, from the first card to the summary or the report: starting
//// one, the clock, grading and undo, the editor and the note, runs, the
//// walkthrough rail and panes, quizzes and boards, Blitz and the exam.
////
//// The cards, drafts and notes are shared, so a grade, an undo, a keystroke
//// or a note goes up as a change; the run engine is shared, so a run is
//// asked for (`RunLocal`, `RunRemote`) and its answer arrives as
//// `RunLanded`, once the engine has taken it in.

import fsrs
import gleam/bool
import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleam/result
import gleam/string
import gleamdrill/content/problem.{type ProblemRef}
import gleamdrill/content/problems
import gleamdrill/domain/board
import gleamdrill/domain/queue
import gleamdrill/domain/walk
import gleamdrill/model as shared_model
import gleamdrill/page/sitting/model.{
  type Model, AwaitingGrade, CodePanel, Model, NoPane, NotGrading, NotePane,
  SolutionPanel, SubmittingGrade,
}
import gleamdrill/page/sitting/msg.{type Msg}
import gleamdrill/page/sitting/panes
import gleamdrill/platform/browser
import gleamdrill/runner
import gleamdrill/shared.{type Change, type Shared}
import gleamdrill/store
import gleamdrill/store/remote
import gleamdrill/ui/id
import gleamdrill/ui/tmux/command
import lustre/effect.{type Effect}
import wire

type Step =
  #(Model, Effect(Msg), List(Change))

// --- starting a sitting -------------------------------------------------------

/// A scheduled sitting over what is due and new, typed or recalled.
pub fn start_study(shared: Shared, recall: Bool) -> Result(Step, String) {
  case queue.build(shared) {
    [] ->
      Error(case recall, shared.active_queue, queue.scope(shared) {
        True, _, _ ->
          "Nothing to recall right now. Come back when cards are due."
        False, Some(name), [] ->
          "\"" <> name <> "\" is empty. Add problems on the queue screen."
        False, _, _ ->
          "Nothing to study right now. Come back when cards are due, or pick problems by hand."
      })
    due ->
      // A scheduled sitting is one pass: FSRS decides when a card comes
      // back, so repeating it now would just be same-day reviews.
      Model(..model.new(due), studying: True, recall:)
      |> open_first(shared, _)
      |> prefetched(recall)
      |> Ok
  }
}

/// A hand-picked sitting over the browser's selection, repeated
/// `iterations` times.
pub fn start_manual(shared: Shared) -> Result(Step, String) {
  case shared.selected {
    [] -> Error("Select a problem to drill.")
    selected ->
      Model(..model.new(selected), iteration_count: shared.iteration_count)
      |> open_first(shared, _)
      |> prefetched(False)
      |> Ok
  }
}

/// A Blitz: `count` problems this browser can run, `per_card_ms` each.
pub fn start_blitz(
  shared: Shared,
  count: Int,
  per_card_ms: Int,
) -> Result(Step, String) {
  case blitz_pool(shared) {
    [] -> Error("Nothing to blitz: queue some problems this browser can run.")
    pool ->
      Model(
        ..model.new(sample(pool, count)),
        blitz: Some(model.Blitz(
          per_card_ms:,
          deadline_ms: browser.now_ms() + per_card_ms,
          results: [],
          expired_flash: False,
        )),
      )
      |> open_first(shared, _)
      |> prefetched(False)
      |> Ok
  }
}

/// An exam over `refs`, sampled evenly across the sections. Reachable from
/// the study screen and the browser; finishing it hands you back to
/// whichever you came from.
pub fn start_exam(
  shared: Shared,
  refs: List(ProblemRef),
  from_study from_study: Bool,
) -> Result(Step, String) {
  case refs {
    [] -> Error("There are no exam questions yet.")
    _ -> {
      let page = Model(..model.new(refs), studying: from_study)
      Ok(#(started(shared, page, ""), clock(), [shared.ResetRun]))
    }
  }
}

/// The exam's questions, sampled now. Exams draw at random, so the draw is
/// an effect, answered with the app's `ExamSampled`.
pub fn sample_exam() -> List(ProblemRef) {
  let pool = problems.quiz_pool()
  let per_section = case list.length(pool) {
    0 -> 0
    sections -> int.max(1, exam_size / sections)
  }
  pool
  |> list.flat_map(fn(entry) { list.take(shuffle(entry.1), per_section) })
  |> shuffle
}

/// The first problem opened, the clock started.
fn open_first(shared: Shared, page: Model) -> Model {
  case model.current_ref(page) {
    Error(Nil) -> page
    Ok(first) ->
      // A study rep starts from the stub: retyping from memory is the whole
      // product. A manual sitting restores a draft only if one survived --
      // grading deletes it, so what comes back is work left unfinished.
      started(shared, page, case page.studying {
        True -> starter_for(first)
        False -> draft_for(shared, first)
      })
  }
}

fn started(shared: Shared, page: Model, draft: String) -> Model {
  let now = browser.now_ms()
  let page = Model(..page, draft:, opened_at_ms: now, now_ms: now)
  case model.current_ref(page) {
    Ok(ref) ->
      Model(
        ..model.open_problem_view(shared, page, ref),
        grading: initial_grading(shared, page, ref),
      )
    Error(Nil) -> page
  }
}

/// A fresh sitting starts the run engine clean, and a checkable problem's
/// runtime starts loading so it is usually ready before the first Run. A
/// recall sitting has nothing to run.
fn prefetched(page: Model, recall: Bool) -> Step {
  #(page, clock(), [shared.ResetRun, ..prefetch(page, recall)])
}

fn prefetch(page: Model, recall: Bool) -> List(Change) {
  case recall, model.current_check(page), language_of(page) {
    False, Ok(_), Ok(language) -> [shared.Prefetch(language)]
    _, _, _ -> []
  }
}

// --- the update ---------------------------------------------------------------

pub fn update(shared: Shared, page: Model, msg: Msg) -> Step {
  case msg {
    msg.ClockTicked -> clock_ticked(shared, page)
    msg.UserToggledTimer -> toggle_timer(page)
    msg.BlitzExpired -> blitz_expired(shared, page)
    msg.UserClickedExitDrill -> #(
      Model(
        ..page,
        exit_prompt: Some(case current_quiz(page), page.studying {
          Ok(_), _ -> "Exit the exam? You will not get a score for it."
          // Study-rep typing is deliberately not persisted; a manual
          // drill's draft was saved moments after the last keystroke.
          Error(Nil), True -> "Exit the drill? Your typed code will be lost."
          Error(Nil), False -> "Exit the drill? Your code is saved as a draft."
        }),
      ),
      // Whatever button was clicked last still has focus, and a focused
      // button swallows Enter. Drop it so the prompt's keys reach it.
      blur(),
      [],
    )
    msg.ExitConfirmed(True) -> #(
      Model(..page, exit_prompt: None),
      effect.none(),
      [
        abandon_run(shared, page),
        home(page),
      ],
    )
    msg.ExitConfirmed(False) -> none(Model(..page, exit_prompt: None))
    msg.UserClickedExitReport -> #(page, effect.none(), [home(page)])

    msg.UserGraded(rating) -> graded(shared, page, rating)
    msg.ReviewRecorded(result) -> recorded(shared, page, result)
    msg.UserClickedNext -> advance(shared, page)
    msg.UserClickedUndo ->
      case page.undo, page.grading {
        // Not while a grade is still being saved: the point would be stale.
        Some(point), NotGrading | Some(point), AwaitingGrade -> #(
          Model(..page, undo: None),
          store.undo_review(
            shared,
            point.problem,
            point.card_before,
            msg.UndoRecorded(point, _),
          ),
          [],
        )
        _, _ -> none(page)
      }
    msg.UndoRecorded(point, result) -> undo_recorded(page, point, result)
    msg.UserRevealedRecall ->
      none(
        Model(
          ..page,
          revealed_solution: Some(0),
          // A recall card is read, not written: the whole ladder is the card.
          nudge_shown: True,
          whole_thing_shown: True,
          grading: AwaitingGrade,
        ),
      )

    msg.EditorChanged(text) -> {
      // Study-rep typing is throwaway in memory as well as on disk: keeping
      // it would let a manual open minutes later restore the answer you just
      // typed from memory, which is the leak the study reset prevents.
      let changes = case model.current_ref(page), page.studying {
        Ok(ref), False -> [shared.DraftChanged(ref, text)]
        _, _ -> []
      }
      #(Model(..page, draft: text), debounce_draft_save(), changes)
    }
    msg.EditorResized(height) -> #(page, effect.none(), [
      shared.EditorHeightChanged(height),
    ])
    msg.EditorFocusRequested -> #(page, focus_now("gleam-editor"), [])
    msg.UserChangedKeymap(mode) -> #(page, effect.none(), [
      shared.KeymapChanged(mode),
    ])
    msg.DraftSaveTicked ->
      case model.current_ref(page), page.studying {
        // A study rep is throwaway typing; persisting it would clobber the
        // draft saved from a real working session on the same problem.
        _, True -> none(page)
        Ok(ref), False -> #(
          page,
          store.save_draft(shared, ref, page.draft, msg.DraftSynced),
          [],
        )
        Error(Nil), _ -> none(page)
      }
    // A failed sync is silent data loss: the typing looked saved and was
    // not. Surfaced like a failed review write; the next keystroke retries.
    msg.DraftSynced(result) | msg.NoteSynced(result) ->
      case result {
        Ok(Nil) -> none(page)
        Error(failure) -> #(page, effect.none(), [shared.WriteFailed(failure)])
      }
    msg.NoteChanged(text) ->
      case model.current_ref(page) {
        Ok(ref) -> #(page, debounce_note_save(), [shared.NoteChanged(ref, text)])
        Error(Nil) -> none(page)
      }
    msg.NoteSaveTicked ->
      case model.current_ref(page) {
        Ok(ref) -> #(
          page,
          store.save_note(
            shared,
            ref,
            shared_model.assoc_get(shared.notes, ref) |> result.unwrap(""),
            msg.NoteSynced,
          ),
          [],
        )
        Error(Nil) -> none(page)
      }
    msg.NoteFocusRequested -> focus_note(page)

    msg.UserClickedRun -> request_run(shared, page, model.TestRun)
    msg.UserClickedScratchRun -> request_run(shared, page, model.ScratchRun)
    msg.UserClickedStopRun -> #(page, effect.none(), [abandon_run(shared, page)])
    msg.UserClickedRetryRuntime(language) -> #(page, effect.none(), [
      shared.RestartRuntime(language),
    ])
    msg.RunLanded -> run_landed(shared, page)
    msg.RuntimeReady(language) ->
      // A Blitz card whose runtime was still downloading has not had a fair
      // clock: it restarts now that a run is actually possible.
      case page.blitz, language_of(page) {
        Some(blitz), Ok(current) if current == language ->
          none(
            Model(
              ..page,
              blitz: Some(
                model.Blitz(
                  ..blitz,
                  deadline_ms: browser.now_ms() + blitz.per_card_ms,
                ),
              ),
            ),
          )
        _, _ -> none(page)
      }

    msg.UserToggledSolution(index) -> none(toggle_solution(page, index))
    msg.UserToggledNudge -> none(Model(..page, nudge_shown: !page.nudge_shown))
    msg.WalkFocused(index) -> none(focus_walk(page, index))
    msg.WalkAdvanced -> none(focus_walk(page, page.walk.focus + 1))
    msg.WalkBacked -> none(focus_walk(page, page.walk.focus - 1))
    msg.WalkHintShown ->
      none(Model(..page, walk: walk.reveal_layer(page.walk, walk.HintLayer)))
    msg.WalkWhyShown ->
      none(Model(..page, walk: walk.reveal_layer(page.walk, walk.WhyLayer)))
    msg.WalkCodeShown ->
      none(
        Model(
          ..page,
          walk: walk.reveal_layer(page.walk, walk.CodeLayer),
          walk_code_seen: True,
        ),
      )
    msg.UserRevealedWholeThing -> none(Model(..page, whole_thing_shown: True))
    msg.UserToggledPrompt -> #(page, effect.none(), [shared.PromptToggled])
    msg.UserToggledPane(pane) -> toggle_pane(page, pane)
    msg.UserToggledSolutionPanel -> none(toggle_solution_panel(shared, page))
    msg.UserPickedPanel(panel) -> none(Model(..page, panel:))
    msg.PanelSwiped(by) -> none(swipe(page, by))
    msg.UserToggledResults -> #(page, effect.none(), [shared.ResultsToggled])
    msg.UserToggledDiff -> #(page, effect.none(), [shared.DiffToggled])
    msg.UserDismissedDiff -> none(Model(..page, panel: CodePanel))
    msg.PaneSelected(target) -> pane_selected(shared, page, target)
    msg.PanesNumbered ->
      case panes.regions(shared, page) {
        [] -> none(page)
        // Blurred so the number typed next picks a pane rather than
        // landing in the editor.
        _ -> #(Model(..page, numbered: True), blur(), [])
      }
    msg.PanesNumberPicked(Some(n)) ->
      pane_selected(shared, page, command.PaneIndex(n))
    msg.PanesNumberPicked(None) -> none(Model(..page, numbered: False))
    msg.PaneZoomed ->
      case panes.regions(shared, page) {
        [] -> none(page)
        _ ->
          none(
            Model(
              ..page,
              zoomed: !page.zoomed,
              active: panes.active(shared, page),
            ),
          )
      }
    msg.PaneKilled -> kill_pane(shared, page)

    msg.QuizMoved(delta) -> quiz_moved(page, delta)
    msg.UserPickedChoice(index) ->
      case page.graded {
        True -> none(page)
        False -> none(Model(..page, choice: Some(index)))
      }
    msg.UserSubmittedAnswer -> submitted_answer(shared, page)
    msg.BoardMoved(delta) ->
      case page.graded {
        True -> none(page)
        False -> move_board_cursor(page, page.board_cursor + delta)
      }
    msg.BoardShelfMoved(delta) -> board_shelf_moved(page, delta)
    msg.BoardJumped(to_top) ->
      case page.graded {
        True -> none(page)
        False ->
          move_board_cursor(page, case to_top {
            True -> 0
            False -> list.length(board.palette()) - 1
          })
      }
    msg.BoardToggledAtCursor ->
      case board.at(page.board_cursor) {
        Ok(piece) -> toggle_piece(page, piece.id)
        Error(Nil) -> none(page)
      }
    msg.UserToggledPiece(id) -> toggle_piece(page, id)
    msg.UserSubmittedBoard -> submitted_board(shared, page)
    msg.UserToggledHelp -> #(page, effect.none(), [shared.ToggleHelp])
  }
}

fn none(page: Model) -> Step {
  #(page, effect.none(), [])
}

/// Whether these changes end the sitting, on its summary or report.
fn ends(changes: List(Change)) -> Bool {
  list.any(changes, fn(change) {
    change == shared.Navigate(shared_model.SummaryRoute)
    || change == shared.Navigate(shared_model.ReportRoute)
  })
}

/// Where a finished or abandoned sitting returns: the study screen for a
/// scheduled one, the browser for a hand-picked one.
fn home(page: Model) -> Change {
  shared.Navigate(case page.studying {
    True -> shared_model.StudyRoute
    False -> shared_model.MenuRoute
  })
}

// --- the clock ----------------------------------------------------------------

fn clock_ticked(shared: Shared, page: Model) -> Step {
  let now_ms = browser.now_ms()
  case shared.route, page.blitz {
    // A Blitz card past its deadline is over: recorded as a miss and the
    // next one opens. Grading is skipped -- nothing was solved.
    shared_model.DrillRoute, Some(blitz) if now_ms >= blitz.deadline_ms ->
      blitz_expired(shared, Model(..page, now_ms:))
    shared_model.DrillRoute, _ -> #(Model(..page, now_ms:), clock(), [])
    _, _ -> none(page)
  }
}

/// Pause or resume the drill clock. Pausing banks nothing yet -- it only
/// stamps when; resuming banks the span. A Blitz runs against a deadline the
/// pause must not stop, so there the toggle does nothing.
fn toggle_timer(page: Model) -> Step {
  case page.blitz, page.clock_paused_at {
    Some(_), _ -> none(page)
    None, Some(at) ->
      none(
        Model(
          ..page,
          clock_paused_at: None,
          clock_paused_ms: page.clock_paused_ms + browser.now_ms() - at,
        ),
      )
    None, None -> none(Model(..page, clock_paused_at: Some(browser.now_ms())))
  }
}

fn blitz_expired(shared: Shared, page: Model) -> Step {
  case page.blitz, model.current_ref(page) {
    Some(blitz), Ok(ref) -> {
      let expired =
        model.BlitzResult(
          problem: ref,
          passed: False,
          duration_ms: blitz.per_card_ms,
          expired: True,
        )
      // No review to carry the draft away, so it is dropped here: an
      // expired card is a miss, not work in progress.
      browser.cancel_debounce("draft-save")
      let #(next, fx, changes) =
        advance(
          shared,
          Model(
            ..page,
            blitz: Some(
              model.Blitz(
                ..blitz,
                results: [expired, ..blitz.results],
                expired_flash: True,
              ),
            ),
          ),
        )
      // The flash clears on the next tick; the deadline restarts with the
      // card. An ended Blitz keeps its results for the summary.
      let next = case next.blitz, ends(changes) {
        Some(b), False ->
          Model(
            ..next,
            blitz: Some(
              model.Blitz(..b, deadline_ms: browser.now_ms() + b.per_card_ms),
            ),
          )
        _, _ -> next
      }
      #(
        next,
        effect.batch([
          store.delete_draft(shared, ref, msg.DraftSynced),
          fx,
          clock(),
        ]),
        [shared.DraftDropped(ref), ..changes],
      )
    }
    _, _ -> #(page, clock(), [])
  }
}

// --- grading ------------------------------------------------------------------

fn graded(shared: Shared, page: Model, rating: fsrs.Rating) -> Step {
  case page.grading, model.current_ref(page) {
    // Guard against a second press while the first is in flight: a review
    // must not be recorded twice.
    SubmittingGrade, _ -> none(page)
    _, Error(Nil) -> none(page)
    _, Ok(ref) -> {
      // The review deletes this problem's draft; a save still queued from
      // the last keystroke must not put it back.
      browser.cancel_debounce("draft-save")
      let elapsed = model.elapsed_ms(page, browser.now_ms())
      let passed = model.test_passed(shared, page)
      #(
        Model(
          ..page,
          grading: SubmittingGrade,
          sitting: [
            model.SittingEntry(
              problem: ref,
              pressed: rating,
              duration_ms: elapsed,
              passed:,
              clean: passed && !answer_given_away(page),
            ),
            ..page.sitting
          ],
          // Everything needed to stand here again if the grade was a slip.
          undo: Some(model.UndoPoint(
            problem: ref,
            problems: page.problems,
            problem_index: page.problem_index,
            current_iteration: page.current_iteration,
            iteration_count: page.iteration_count,
            studying: page.studying,
            recall: page.recall,
            draft: page.draft,
            run: shared.run,
            revealed_solution: page.revealed_solution,
            nudge_shown: page.nudge_shown,
            whole_thing_shown: page.whole_thing_shown,
            walk: page.walk,
            walk_code_seen: page.walk_code_seen,
            duration_ms: elapsed,
            card_before: shared_model.card_for(shared, ref),
          )),
        ),
        store.record_review(
          shared,
          case page.recall {
            // Revealing is the mechanism here, not a peek, and there was no
            // code to time: the row says "recall" and nothing else.
            True ->
              wire.Review(
                problem: ref,
                rating:,
                duration_ms: None,
                auto_failed: False,
                revealed: False,
                practice: !page.studying,
                recall: True,
              )
            False ->
              wire.Review(
                problem: ref,
                rating:,
                duration_ms: Some(elapsed),
                // An ungraded card's run is a demonstration, not a test, so
                // it is never logged as a failure.
                auto_failed: case model.current_problem(page) {
                  Ok(current) ->
                    problem.graded(current)
                    && shared_model.run_failed(shared.run)
                  Error(Nil) -> shared_model.run_failed(shared.run)
                },
                revealed: case model.current_problem(page) {
                  Ok(current) -> model.answer_revealed(page, current.approach)
                  Error(Nil) -> page.revealed_solution != None
                },
                // A hand-picked sitting is practice, not a scheduled review.
                practice: !page.studying,
                recall: False,
              )
          },
          msg.ReviewRecorded,
        ),
        [],
      )
    }
  }
}

fn recorded(
  shared: Shared,
  page: Model,
  result: Result(wire.ReviewOutcome, remote.ApiError),
) -> Step {
  case result {
    Ok(outcome) -> {
      let landed = [shared.ReviewLanded(outcome)]
      case page.grading {
        // A graded drill moves on by itself; a quiz waits for Next, because
        // the explanation is worth reading first.
        SubmittingGrade -> {
          // A Blitz card that was graded was solved in time: its result is
          // the sitting entry just recorded, and the next card's clock
          // starts from now.
          let page = case page.blitz, page.sitting {
            Some(blitz), [entry, ..] ->
              Model(
                ..page,
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
            _, _ -> page
          }
          let #(page, fx, changes) =
            advance(shared, Model(..page, grading: NotGrading))
          #(page, fx, list.append(landed, changes))
        }
        _ -> #(page, effect.none(), landed)
      }
    }
    Error(failure) -> #(
      Model(..page, undo: None, grading: case page.grading {
        SubmittingGrade -> AwaitingGrade
        other -> other
      }),
      effect.none(),
      [shared.WriteFailed(failure)],
    )
  }
}

fn undo_recorded(
  page: Model,
  point: model.UndoPoint,
  result: Result(wire.UndoOutcome, remote.ApiError),
) -> Step {
  case result {
    // Back on the problem as it was when the grade was pressed, with the
    // clock where it stood, waiting for the grade you meant.
    Ok(outcome) -> #(
      Model(
        ..page,
        problems: point.problems,
        problem_index: point.problem_index,
        current_iteration: point.current_iteration,
        iteration_count: point.iteration_count,
        studying: point.studying,
        recall: point.recall,
        draft: point.draft,
        revealed_solution: point.revealed_solution,
        nudge_shown: point.nudge_shown,
        whole_thing_shown: point.whole_thing_shown,
        walk: point.walk,
        walk_code_seen: point.walk_code_seen,
        slot: NoPane,
        panel: case point.revealed_solution {
          Some(_) -> SolutionPanel
          None -> CodePanel
        },
        grading: AwaitingGrade,
        opened_at_ms: browser.now_ms() - point.duration_ms,
        sitting: case page.sitting {
          [_, ..rest] -> rest
          [] -> []
        },
        exam_answers: [],
        choice: None,
        graded: False,
      ),
      effect.none(),
      [
        shared.UndoLanded(point.problem, outcome),
        shared.RunRestored(point.run),
        shared.NoticeCleared,
        shared.Navigate(shared_model.DrillRoute),
      ],
    )
    Error(failure) -> #(Model(..page, undo: Some(point)), effect.none(), [
      shared.Notice(remote.error_message(failure)),
    ])
  }
}

/// A solve is clean when nothing was given away: no solution shown, no code
/// slice, no whole pseudocode, and no step opened for its hint or its why.
///
/// The step *titles* do not count, because the rail lists them from the
/// moment the problem opens and nobody chose to see them. That is the
/// difference between this and the review log's `revealed` flag, which only
/// the code counts toward.
fn answer_given_away(page: Model) -> Bool {
  case model.current_problem(page) {
    Ok(current) ->
      model.answer_revealed(page, current.approach)
      || walk.any_layer_shown(page.walk)
    Error(Nil) -> False
  }
}

// --- moving on ------------------------------------------------------------------

fn advance(shared: Shared, page: Model) -> Step {
  // Before anything else: `page` still points at the problem whose run may
  // be in flight, which is the only moment its language can be resolved.
  let abandoned = abandon_run(shared, page)
  let #(next, fx, changes) = advance_inner(shared, page)
  // The grade button just pressed is still under the next problem's prompt
  // page; focused, it would take the Enter meant to start coding.
  #(next, effect.batch([fx, blur()]), [abandoned, ..changes])
}

fn advance_inner(shared: Shared, page: Model) -> Step {
  // Round-robin: walk the whole list, then come back around for the next
  // pass. Drilling one problem N times in a row is what this avoids.
  let #(index, iteration) = case
    page.problem_index + 1 < list.length(page.problems)
  {
    True -> #(page.problem_index + 1, page.current_iteration)
    False -> #(0, page.current_iteration + 1)
  }
  case iteration > page.iteration_count, page.exam_answers {
    // An exam ends in the report: the score is the reason it happened.
    True, [_, ..] -> #(page, effect.none(), [
      shared.Navigate(shared_model.ReportRoute),
    ])
    // A drill sitting earns a summary.
    True, [] -> #(page, effect.none(), [
      shared.Navigate(shared_model.SummaryRoute),
    ])
    False, _ -> {
      let advanced =
        Model(
          ..page,
          current_iteration: iteration,
          problem_index: index,
          revealed_solution: None,
          slot: NoPane,
          panel: CodePanel,
          grading: NotGrading,
          opened_at_ms: browser.now_ms(),
          clock_paused_at: None,
          clock_paused_ms: 0,
          choice: None,
          graded: False,
        )
      // Retyping is the drill, so a repeat pass starts from the stub. The
      // first time a problem comes up in a manual sitting, a draft is
      // restored if one survived.
      let advanced = case model.current_ref(advanced) {
        Ok(ref) ->
          Model(
            ..model.open_problem_view(shared, advanced, ref),
            draft: case iteration == 1 && !page.studying {
              True -> draft_for(shared, ref)
              False -> starter_for(ref)
            },
            grading: initial_grading(shared, page, ref),
          )
        Error(Nil) -> Model(..advanced, draft: "")
      }
      #(advanced, effect.none(), [
        shared.ResetRun,
        ..prefetch(advanced, page.recall)
      ])
    }
  }
}

/// Stops the run in flight, if any: the worker is replaced, a server-side
/// run's late answer is ignored by the engine's id guard.
pub fn abandon_run(shared: Shared, page: Model) -> Change {
  case shared.run, language_of(page) {
    shared_model.Running(_, _), Ok(language) -> shared.AbandonRun(language)
    _, _ -> shared.ResetRun
  }
}

/// What the grade bar starts as when a problem opens.
///
/// Gradeable from the first moment when either there is nothing to run (a
/// reveal-only drill is a flashcard proper) or this is the problem's first
/// encounter -- the learning step, where you reveal, study, and self-grade
/// like flipping a card. Otherwise a run is required before grading.
fn initial_grading(
  shared: Shared,
  page: Model,
  ref: ProblemRef,
) -> model.Grading {
  use <- bool.guard(page.recall, NotGrading)
  // A Blitz is scored on the run, so the grade waits for one: pressing
  // Good on a card never attempted is not a solve.
  use <- bool.guard(page.blitz != None, NotGrading)
  case problem_kind(shared, ref) {
    // Quizzes and boards grade themselves on submit.
    QuizProblem | BoardProblem -> NotGrading
    CheckableProblem ->
      case shared_model.first_encounter(shared, ref) {
        True -> AwaitingGrade
        False -> NotGrading
      }
    RevealOnlyProblem -> AwaitingGrade
  }
}

pub type ProblemKind {
  CheckableProblem
  QuizProblem
  BoardProblem
  RevealOnlyProblem
}

/// `problem.kind` refined by what this browser can actually do: a check it
/// cannot run grades like a reveal-only card.
pub fn problem_kind(shared: Shared, ref: ProblemRef) -> ProblemKind {
  case problems.find(ref.category, ref.subcategory, ref.title) {
    Ok(found) ->
      case problem.kind(found) {
        problem.QuizDrill -> QuizProblem
        problem.BoardDrill -> BoardProblem
        problem.CodeDrill ->
          case found.check {
            // A read-and-run card (graded: False), or a check this browser
            // cannot run, is gradeable from the moment it opens.
            Some(check) ->
              case
                check.graded
                && shared_model.run_available(shared, found.language)
              {
                True -> CheckableProblem
                False -> RevealOnlyProblem
              }
            None -> RevealOnlyProblem
          }
      }
    Error(Nil) -> RevealOnlyProblem
  }
}

fn draft_for(shared: Shared, ref: ProblemRef) -> String {
  case shared_model.assoc_get(shared.drafts, ref) {
    Ok(text) -> text
    Error(Nil) -> starter_for(ref)
  }
}

fn starter_for(ref: ProblemRef) -> String {
  case problems.find(ref.category, ref.subcategory, ref.title) {
    Ok(p) ->
      case p.check {
        Some(check) -> check.starter
        None -> ""
      }
    Error(Nil) -> ""
  }
}

/// The language the current problem runs in.
pub fn language_of(page: Model) -> Result(String, Nil) {
  model.current_problem(page)
  |> result.map(fn(p) { problem.language_slug(p.language) })
}

fn current_quiz(page: Model) -> Result(problem.Quiz, Nil) {
  model.current_problem(page)
  |> result.try(fn(found) { option.to_result(found.quiz, Nil) })
}

// --- runs ---------------------------------------------------------------------

/// A run of either kind, with every reason it cannot start said out loud:
/// the button is disabled in those states, but `r`, `t` and Ctrl+Enter land
/// here too and silence reads as a broken key.
fn request_run(shared: Shared, page: Model, kind: model.RunKind) -> Step {
  case shared.run {
    // One run at a time: a queued second run just doubles the wait.
    shared_model.Running(_, _) -> none(page)
    _ ->
      case language_of(page), model.current_check(page) {
        Ok(language), Ok(check) -> {
          let harness = case kind {
            model.TestRun -> check.harness
            model.ScratchRun -> runner.scratch_harness(language)
          }
          let notice = fn(text) {
            #(page, effect.none(), [shared.Notice(text)])
          }
          let remote = runner.is_remote(language)
          case shared_model.runtime_for(shared, language), shared.mode {
            // Elixir and Go run on the server, and the server wants a
            // session.
            shared_model.RuntimeReady, shared_model.Guest if remote ->
              notice(
                "This drill runs on the server \u{2014} sign in to run it.",
              )
            shared_model.RuntimeReady, _ -> #(
              Model(..page, run_kind: kind),
              effect.none(),
              [
                case remote {
                  True -> shared.RunRemote(language, page.draft, harness)
                  False -> shared.RunLocal(language, page.draft, harness)
                },
              ],
            )
            shared_model.RuntimeLoading, _ | shared_model.RuntimeNotLoaded, _ ->
              notice(
                "The runtime is still loading \u{2014} the Run button enables when it's ready.",
              )
            shared_model.RuntimeFailed(_), _ ->
              notice(
                "The runtime failed to load \u{2014} use Retry next to the Run button.",
              )
          }
        }
        _, _ -> none(page)
      }
  }
}

/// The engine settled this sitting's run. Whatever the harness said, the
/// drill is now answerable: the grade bar decides what the buttons offer. A
/// scratch run is not an answer, though; it leaves the gate where it was.
fn run_landed(shared: Shared, page: Model) -> Step {
  let answered = fn(page: Model) {
    Model(..page, grading: case page.run_kind {
      model.TestRun -> AwaitingGrade
      model.ScratchRun -> page.grading
    })
  }
  case shared.run {
    shared_model.Ran(shared_model.TimedOut, _) -> none(answered(page))
    shared_model.Ran(_, _) -> {
      // A pass opens the reference beside your code, as a diff. Only a real
      // answer counts: something typed, on a problem with a reference, from
      // the test run and not a scratch one.
      let passed =
        model.test_passed(shared, page)
        && string.trim(page.draft) != ""
        && case model.current_problem(page) {
          Ok(current) -> current.solutions != []
          Error(Nil) -> False
        }
      #(
        Model(
          ..answered(page),
          panel: model.panel_after_run(
            page.panel,
            page.revealed_solution,
            passed,
          ),
        ),
        // Blur the editor so 1-4 grade immediately: the whole rep is type,
        // Ctrl+Enter, digit.
        blur(),
        [],
      )
    }
    _ -> none(page)
  }
}

// --- the rail and the panes ---------------------------------------------------

fn toggle_solution(page: Model, index: Int) -> Model {
  case page.panel, page.revealed_solution {
    SolutionPanel, Some(current) if current == index ->
      Model(..page, panel: CodePanel)
    _, _ -> Model(..page, panel: SolutionPanel, revealed_solution: Some(index))
  }
}

/// A drill with no reference solution has no solution panel, so a swipe
/// toward it stays on the code.
fn swipe(page: Model, by: Int) -> Model {
  let next = model.step_panel(page.panel, by)
  let has_solutions = case model.current_problem(page) {
    Ok(current) -> current.solutions != []
    Error(Nil) -> False
  }
  case next, has_solutions {
    SolutionPanel, False -> page
    _, _ -> Model(..page, panel: next)
  }
}

/// With no passing run there is no diff to show instead of the reference,
/// so turning to the solution is choosing the first one.
fn toggle_solution_panel(shared: Shared, page: Model) -> Model {
  case page.panel, page.revealed_solution, model.test_passed(shared, page) {
    SolutionPanel, _, _ -> Model(..page, panel: CodePanel)
    _, None, False -> toggle_solution(page, 0)
    _, _, _ -> Model(..page, panel: SolutionPanel)
  }
}

fn toggle_pane(page: Model, pane: model.Pane) -> Step {
  case pane, page.slot == pane {
    // Opening the note is focusing it; closing is just closing. The note is
    // written against the code, so it brings the code back up.
    NotePane, True -> none(Model(..page, slot: NoPane))
    NotePane, False -> focus_note(Model(..page, panel: CodePanel))
    NoPane, _ -> none(page)
  }
}

/// tmux's select-pane: the pane made active and given the keyboard, the
/// editor and the note by focus, the rest by taking focus away from both
/// so the bare keys reach the app. Moving off a zoomed pane unzooms.
fn pane_selected(
  shared: Shared,
  page: Model,
  target: command.PaneTarget,
) -> Step {
  case panes.regions(shared, page) {
    [] -> none(page)
    _ -> {
      let before = panes.active(shared, page)
      let page = panes.select(shared, page, target)
      let page = case page.active == before {
        True -> page
        False -> Model(..page, zoomed: False)
      }
      #(page, focus_region(page.active), [])
    }
  }
}

fn focus_region(region: model.Region) -> Effect(Msg) {
  case region {
    model.EditorRegion -> focus_now("gleam-editor")
    model.NoteRegion -> focus_now(".note-input")
    _ -> blur()
  }
}

/// tmux's kill-pane: the active pane put away, the way its own close
/// button would. The editor, the output and the rail are the screen
/// itself, so they stay, and say so.
fn kill_pane(shared: Shared, page: Model) -> Step {
  let closed = fn(page: Model) {
    Model(..page, active: model.EditorRegion, zoomed: False)
  }
  case panes.regions(shared, page), panes.active(shared, page) {
    [], _ -> none(page)
    _, model.PromptRegion -> #(closed(page), effect.none(), [
      shared.PromptToggled,
    ])
    _, model.SolutionRegion -> none(closed(Model(..page, panel: CodePanel)))
    _, model.NoteRegion -> none(closed(Model(..page, slot: NoPane)))
    _, region -> #(page, effect.none(), [
      shared.Say("can't kill the " <> panes.name(region) <> " pane"),
    ])
  }
}

fn focus_note(page: Model) -> Step {
  #(Model(..page, slot: NotePane), focus_after_render(".note-input"), [])
}

/// Move the rail's focus, clamped to the steps this problem actually has. A
/// problem with no walkthrough has none, and the focus stays at zero.
fn focus_walk(page: Model, index: Int) -> Model {
  let total = case model.current_problem(page) {
    Ok(current) -> list.length(walk.walk_steps(current.approach))
    Error(Nil) -> 0
  }
  Model(..page, walk: walk.focus_step(page.walk, index, total))
}

// --- quizzes and boards -------------------------------------------------------

fn quiz_moved(page: Model, delta: Int) -> Step {
  case page.graded, current_quiz(page) {
    False, Ok(quiz) -> {
      let last = list.length(quiz.choices) - 1
      let next = case page.choice {
        Some(current) -> int.clamp(current + delta, 0, last)
        // First press lands on an edge, so j starts at the top and k at the
        // bottom.
        None ->
          case delta > 0 {
            True -> 0
            False -> last
          }
      }
      none(Model(..page, choice: Some(next)))
    }
    _, _ -> none(page)
  }
}

fn submitted_answer(shared: Shared, page: Model) -> Step {
  case page.graded, page.choice, current_quiz(page), model.current_ref(page) {
    False, Some(picked), Ok(quiz), Ok(ref) -> {
      let right = picked == quiz.correct
      #(
        Model(
          ..page,
          graded: True,
          // Appended at the head; the report only groups and counts.
          exam_answers: [#(ref, right), ..page.exam_answers],
        ),
        // A quiz grades itself: there is no Hard/Good/Easy judgement to ask
        // for. The review is recorded now and the user still presses Next,
        // because the explanation is worth reading before moving on.
        store.record_review(
          shared,
          wire.Review(
            problem: ref,
            rating: case right {
              True -> fsrs.Good
              False -> fsrs.Again
            },
            duration_ms: Some(model.elapsed_ms(page, browser.now_ms())),
            auto_failed: !right,
            revealed: False,
            // The exam is an assessment, not practice.
            practice: False,
            recall: False,
          ),
          msg.ReviewRecorded,
        ),
        [],
      )
    }
    _, _, _, _ -> none(page)
  }
}

fn toggle_piece(page: Model, id: String) -> Step {
  case page.graded, board.find(id) {
    // Once submitted the board is a verdict, not a form.
    True, _ | _, Error(Nil) -> none(page)
    False, Ok(piece) ->
      none(
        Model(
          ..page,
          board_picks: case list.contains(page.board_picks, id) {
            True -> list.filter(page.board_picks, fn(held) { held != id })
            False -> [id, ..page.board_picks]
          },
          // A click moves the cursor to what was clicked, so switching back
          // to the keyboard carries on from where the mouse left off.
          board_cursor: board.index_of(piece),
        ),
      )
  }
}

fn submitted_board(shared: Shared, page: Model) -> Step {
  let answer =
    model.current_problem(page)
    |> result.try(fn(found) { option.to_result(found.board, Nil) })
  case page.graded, answer, model.current_ref(page) {
    False, Ok(answer), Ok(ref) -> {
      let duration_ms = model.elapsed_ms(page, browser.now_ms())
      let graded = board.grade(page.board_picks, answer, duration_ms)
      #(
        Model(
          ..page,
          graded: True,
          // A sitting entry, not an exam answer: a sitting with exam answers
          // ends in the exam report, and a board belongs in the summary.
          sitting: [
            model.SittingEntry(
              problem: ref,
              pressed: graded.rating,
              duration_ms:,
              passed: graded.rating != fsrs.Again,
              clean: graded.percent == 100 && graded.wrong == [],
            ),
            ..page.sitting
          ],
        ),
        // A board grades itself; the verdict is worth reading before Next.
        store.record_review(
          shared,
          wire.Review(
            problem: ref,
            rating: graded.rating,
            duration_ms: Some(duration_ms),
            auto_failed: graded.rating == fsrs.Again,
            revealed: False,
            practice: !page.studying,
            recall: False,
          ),
          msg.ReviewRecorded,
        ),
        [],
      )
    }
    _, _, _ -> none(page)
  }
}

fn board_shelf_moved(page: Model, delta: Int) -> Step {
  case page.graded, board.at(page.board_cursor) {
    False, Ok(piece) -> {
      // Shelves are laid out in order, so the next one starts at the first
      // piece whose family differs -- found by walking the family list, so
      // a shelf that changes size does not break the jump.
      let shelves = board.families()
      let here = index_of_family(shelves, piece.family, 0)
      case
        list.drop(shelves, int.clamp(here + delta, 0, list.length(shelves) - 1))
        |> list.first
        |> result.try(fn(target) { list.first(board.pieces_in(target)) })
      {
        Ok(first) -> move_board_cursor(page, board.index_of(first))
        Error(Nil) -> none(page)
      }
    }
    _, _ -> none(page)
  }
}

/// Move the board cursor, clamped, and scroll the chip into view -- the
/// palette is taller than the viewport on a phone, so a cursor that moved
/// without scrolling would leave the keyboard driving something off screen.
fn move_board_cursor(page: Model, to: Int) -> Step {
  let next = int.clamp(to, 0, list.length(board.palette()) - 1)
  #(Model(..page, board_cursor: next), scroll_to(id.board_chip_id(next)), [])
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

// --- Blitz and exam sampling --------------------------------------------------

/// Every card in the active queue that a Blitz can time: a problem with a
/// harness, in a language this browser can run.
fn blitz_pool(shared: Shared) -> List(ProblemRef) {
  queue.scope(shared)
  |> list.filter(fn(ref) {
    case problems.find(ref.category, ref.subcategory, ref.title) {
      Ok(current) ->
        current.quiz == None
        && current.check != None
        && shared_model.run_available(shared, current.language)
      Error(Nil) -> False
    }
  })
}

/// `count` refs drawn without replacement, in a random order. Fewer if the
/// pool is smaller.
fn sample(pool: List(ProblemRef), count: Int) -> List(ProblemRef) {
  do_sample(pool, list.length(pool), count, [])
}

fn do_sample(
  pool: List(ProblemRef),
  size: Int,
  remaining: Int,
  acc: List(ProblemRef),
) -> List(ProblemRef) {
  case remaining <= 0 || size <= 0 {
    True -> list.reverse(acc)
    False -> {
      let index = browser.random_int(size)
      let #(before, rest) = list.split(pool, index)
      case rest {
        [chosen, ..after] ->
          do_sample(list.append(before, after), size - 1, remaining - 1, [
            chosen,
            ..acc
          ])
        [] -> list.reverse(acc)
      }
    }
  }
}

fn shuffle(items: List(a)) -> List(a) {
  shuffle_loop(items, list.length(items), [])
}

fn shuffle_loop(remaining: List(a), count: Int, acc: List(a)) -> List(a) {
  case count {
    n if n <= 0 -> acc
    _ -> {
      let #(before, rest) = list.split(remaining, browser.random_int(count))
      case rest {
        [picked, ..after] ->
          shuffle_loop(list.append(before, after), count - 1, [picked, ..acc])
        [] -> list.append(acc, remaining)
      }
    }
  }
}

/// Questions per sitting, spread flat across the sections rather than in
/// proportion to how many questions each one has. Equal resolution per
/// section is the point: a section sampled twice cannot tell you anything
/// about whether you know it.
const exam_size = 40

// --- effects ------------------------------------------------------------------

/// One clock tick, a second out. Keyed through a debounce, so a drill
/// reopened within the second does not start a second chain of ticks.
fn clock() -> Effect(Msg) {
  use dispatch <- effect.from
  browser.debounce("drill-clock", 1000, fn() { dispatch(msg.ClockTicked) })
}

fn debounce_draft_save() -> Effect(Msg) {
  use dispatch <- effect.from
  browser.debounce("draft-save", 400, fn() { dispatch(msg.DraftSaveTicked) })
}

fn debounce_note_save() -> Effect(Msg) {
  use dispatch <- effect.from
  browser.debounce("note-save", 600, fn() { dispatch(msg.NoteSaveTicked) })
}

fn blur() -> Effect(Msg) {
  use _dispatch <- effect.from
  browser.blur_active()
}

fn focus_now(selector: String) -> Effect(Msg) {
  use _dispatch <- effect.from
  browser.focus_element(selector)
}

/// Focus something the same message puts on screen: `effect.from` runs
/// before the render, when the element is not there yet.
fn focus_after_render(selector: String) -> Effect(Msg) {
  use _dispatch, _root <- effect.before_paint
  browser.focus_element(selector)
}

fn scroll_to(row: String) -> Effect(Msg) {
  use _dispatch <- effect.from
  browser.scroll_into_view(row)
}

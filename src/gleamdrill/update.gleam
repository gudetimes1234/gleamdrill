//// The controller: update(), the exhaustive message dispatch, and -- for
//// now -- every handler it delegates to. The feature split carves this
//// file next; the entrypoint already only wires init, update and view.

import gleam/dict
import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleam/result
import gleam/set
import gleam/string
import gleamdrill/api
import gleamdrill/browser
import gleamdrill/keys
import gleamdrill/local
import gleamdrill/model.{
  type Model, Account, AwaitingGrade, CaseResult, Cases, DrillRoute, Errored,
  Guest, MenuRoute, Model, NoPane, NotGrading, NotePane, QueueRoute, Ran,
  RunError, RunIdle, Running, RuntimeFailed, RuntimeLoading, RuntimeNotLoaded,
  RuntimeReady, SettingsRoute, SolutionPane, StudyRoute, SubmittingGrade,
  TimedOut, TourRoute, TracksRoute,
}
import gleamdrill/msg.{
  type Msg, ArchiveReady, ArchiveRestored, AuthCompleted, BlitzExpired,
  BoardJumped, BoardMoved, BoardShelfMoved, BoardToggledAtCursor, CacheMeasured,
  CacheWarmed, CardSuspended, ClockTicked, CompareMoved, ComparePickedVariant,
  DraftSaveTicked, DraftSynced, EditorChanged, EditorFocusRequested,
  EditorResized, ExamSampled, ExitConfirmed, HelpToggled, HistoryLoaded,
  ImportConfirmed, ImportPicked, InsightsLoaded, KeyPressed, MenuActivated,
  MenuCursorJumped, MenuCursorMoved, MenuPaneFocused, MenuSuspendedAtCursor,
  MenuToggledAtCursor, NoteChanged, NoteFocusRequested, NoteSaveTicked,
  NoteSynced, QueueChanged, QueueCursorJumped, QueueCursorMoved,
  QueueToggledAtCursor, QueuesSaved, QuizMoved, RemoteRunFinished,
  ReviewRecorded, RunFinished, RunTimedOut, RunnerFailed, RunnerReady,
  RuntimeLoadTimedOut, SearchFocusRequested, SettingsSaved, SignOutCompleted,
  StateImported, StateLoaded, StatsActivated, StatsCursorMoved, StatsLoaded,
  TourActivated, TourCursorMoved, TourEditorChanged, TourRunTicked, UndoRecorded,
  UserAddedAllShown, UserAddedSelectionToQueue, UserAddedStarterSet,
  UserCancelledQueueName, UserChangedAuthEmail, UserChangedAuthPassword,
  UserChangedGroup, UserChangedIterations, UserChangedKeymap,
  UserChangedQueueName, UserChangedSetting, UserClickedBackToStudy,
  UserClickedBreadcrumb, UserClickedBrowse, UserClickedClearSelection,
  UserClickedCompare, UserClickedDeviceTimezone, UserClickedExitDrill,
  UserClickedExitReport, UserClickedExport, UserClickedImport,
  UserClickedMergeGuest, UserClickedNext, UserClickedQueue, UserClickedRecall,
  UserClickedRetryRuntime, UserClickedRetrySync, UserClickedRun,
  UserClickedScratchRun, UserClickedSelectAll, UserClickedSettings,
  UserClickedSignIn, UserClickedSignOut, UserClickedStartDrill,
  UserClickedStartExam, UserClickedStats, UserClickedStopRun, UserClickedStudy,
  UserClickedSubcategory, UserClickedTour, UserClickedTourContents,
  UserClickedTourNext, UserClickedTourPrev, UserClickedTracks, UserClickedUndo,
  UserClickedWarmCache, UserClosedCompare, UserClosedDetail, UserDeletedQueue,
  UserDismissedDiff, UserDismissedMergeOffer, UserDismissedNotice,
  UserDismissedUpgradePrompt, UserFilteredQueue, UserGraded, UserOpenedDetail,
  UserOpenedLesson, UserPickedActiveQueue, UserPickedChoice, UserPickedTrack,
  UserPickedTrackWithStarter, UserRemovedAllShown, UserResetLesson,
  UserRevealedRecall, UserRevealedWholeThing, UserSearched, UserSearchedQueue,
  UserSelectedQueue, UserStartedBlitz, UserStartedNewQueue,
  UserStartedRenameQueue, UserSubmittedAnswer, UserSubmittedAuth,
  UserSubmittedBoard, UserSubmittedQueueName, UserToggledAuthMode,
  UserToggledBlitz, UserToggledDiff, UserToggledNudge, UserToggledPane,
  UserToggledPiece, UserToggledProblem, UserToggledPrompt, UserToggledQueued,
  UserToggledResults, UserToggledSolution, UserToggledSuspend, WalkAdvanced,
  WalkBacked, WalkCodeShown, WalkFocused, WalkHintShown, WalkWhyShown,
}
import gleamdrill/problem.{type ProblemRef}
import gleamdrill/problems
import gleamdrill/queue
import gleamdrill/remote
import gleamdrill/runner
import gleamdrill/store
import gleamdrill/track
import gleamdrill/update/blitz as blitz_update
import gleamdrill/update/board as board_update
import gleamdrill/update/common
import gleamdrill/update/compare as compare_update
import gleamdrill/update/session as session_update
import gleamdrill/update/stats
import gleamdrill/update/tour as tour_update
import gleamdrill/update/transfer
import gleamdrill/view/id
import gleamdrill/walk
import lustre/effect.{type Effect}
import wire.{ProblemRef}

/// The rows the keyboard cursor can sit on in a pane, as toggle targets.
type PaneRows {
  /// Language and subcategory rows *choose*; the payload is what clicking
  /// them would dispatch.
  ChoiceRows(List(Msg))
  /// Problem and Selected rows *toggle* a ProblemRef.
  ToggleRows(List(ProblemRef))
}

fn pane_rows(m: Model, pane: model.MenuPane) -> PaneRows {
  case pane {
    model.SubcategoriesPane ->
      ChoiceRows(
        problems.subcategory_names(m.active_track)
        |> list.map(UserClickedSubcategory),
      )
    model.ProblemsPane ->
      ToggleRows(case m.selected_subcategory {
        Some(subcategory) ->
          problems.problems_in(m.active_track, subcategory)
          |> list.map(fn(found) {
            ProblemRef(m.active_track, subcategory, found.title)
          })
        None -> []
      })
    model.SelectedPane -> ToggleRows(m.selected)
  }
}

fn rows_length(rows: PaneRows) -> Int {
  case rows {
    ChoiceRows(msgs) -> list.length(msgs)
    ToggleRows(refs) -> list.length(refs)
  }
}

/// The cursor index for a pane, clamped into the pane's current list — lists
/// change under the cursor (switching language shrinks the problem list), and
/// clamping on read beats chasing every mutation site.
pub fn cursor_in(m: Model, pane: model.MenuPane) -> Int {
  let raw = case pane {
    model.SubcategoriesPane -> m.nav.subcategory
    model.ProblemsPane -> m.nav.problem
    model.SelectedPane -> m.nav.selected
  }
  int.clamp(raw, 0, int.max(0, rows_length(pane_rows(m, pane)) - 1))
}

fn set_cursor(m: Model, pane: model.MenuPane, index: Int) -> Model {
  let nav = case pane {
    model.SubcategoriesPane -> model.MenuNav(..m.nav, subcategory: index)
    model.ProblemsPane -> model.MenuNav(..m.nav, problem: index)
    model.SelectedPane -> model.MenuNav(..m.nav, selected: index)
  }
  Model(..m, nav: nav)
}

fn searching(m: Model) -> Bool {
  string.trim(m.search) != ""
}

fn move_cursor(m: Model, next: fn(Int, Int) -> Int) -> #(Model, Effect(Msg)) {
  case searching(m) {
    True -> {
      let hits = problems.search_refs(string.trim(m.search))
      let last = int.max(0, list.length(hits) - 1)
      let index = next(int.clamp(m.nav.search, 0, last), last)
      #(
        Model(..m, nav: model.MenuNav(..m.nav, search: index)),
        common.scroll_to("hit-" <> int.to_string(index)),
      )
    }
    False -> {
      let pane = m.nav.focus
      let last = int.max(0, rows_length(pane_rows(m, pane)) - 1)
      let index = next(cursor_in(m, pane), last)
      #(set_cursor(m, pane, index), common.scroll_to(row_id(pane, index)))
    }
  }
}

/// h/l between panes. Moving right through an unmade choice makes it: `l` on
/// a topic selects it and lands in its problems, which is how a TUI drills
/// down.
///
/// Three panes, not four: the first used to choose a language, and the track
/// switcher is where that happens now.
fn focus_pane(m: Model, direction: Int) -> #(Model, Effect(Msg)) {
  let order = [
    model.SubcategoriesPane,
    model.ProblemsPane,
    model.SelectedPane,
  ]
  let position =
    list.fold(list.index_map(order, fn(p, i) { #(p, i) }), 0, fn(acc, pair) {
      case pair.0 == m.nav.focus {
        True -> pair.1
        False -> acc
      }
    })
  let target = int.clamp(position + direction, 0, 2)

  case direction > 0, m.nav.focus {
    // Descending picks the cursor row if that level has no pick yet.
    True, model.SubcategoriesPane ->
      case m.selected_subcategory {
        None -> {
          let #(chosen, fx) = activate_cursor(m)
          #(
            Model(
              ..chosen,
              nav: model.MenuNav(..chosen.nav, focus: model.ProblemsPane),
            ),
            fx,
          )
        }
        Some(_) -> #(
          Model(..m, nav: model.MenuNav(..m.nav, focus: model.ProblemsPane)),
          effect.none(),
        )
      }
    _, _ -> {
      let focus = case list.drop(order, target) {
        [pane, ..] -> pane
        [] -> model.SubcategoriesPane
      }
      #(Model(..m, nav: model.MenuNav(..m.nav, focus: focus)), effect.none())
    }
  }
}

/// Enter or Space on the cursor row.
/// The ProblemRef under the menu cursor, when the focused pane holds one.
fn cursor_ref(m: Model) -> Result(ProblemRef, Nil) {
  case searching(m) {
    True -> {
      let hits = problems.search_refs(string.trim(m.search))
      case list.drop(hits, int.clamp(m.nav.search, 0, list.length(hits) - 1)) {
        [ref, ..] -> Ok(ref)
        [] -> Error(Nil)
      }
    }
    False ->
      case pane_rows(m, m.nav.focus) {
        ToggleRows(refs) ->
          case list.drop(refs, cursor_in(m, m.nav.focus)) {
            [ref, ..] -> Ok(ref)
            [] -> Error(Nil)
          }
        ChoiceRows(_) -> Error(Nil)
      }
  }
}

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

fn enter_track(
  m: Model,
  track: String,
  starter starter: Bool,
) -> #(Model, Effect(Msg)) {
  let m = Model(..m, active_track: track, route: StudyRoute)
  // The track's own cards, queues and settings come from a fresh load: the
  // model holds one track's at a time, and this is the moment it changes.
  let reload = effect.batch([common.save_preferences(m), store.load_state(m)])
  case starter, common.starter_refs(m, track) {
    True, [_, ..] as refs -> #(
      common.pending(m, refs),
      effect.batch([reload, store.add_to_queue(m, refs)]),
    )
    _, _ -> #(m, reload)
  }
}

fn activate_cursor(m: Model) -> #(Model, Effect(Msg)) {
  case searching(m) {
    True -> {
      let hits = problems.search_refs(string.trim(m.search))
      case list.drop(hits, int.clamp(m.nav.search, 0, list.length(hits) - 1)) {
        [ref, ..] -> handle(m, UserToggledProblem(ref))
        [] -> #(m, effect.none())
      }
    }
    False -> {
      let pane = m.nav.focus
      let index = cursor_in(m, pane)
      case pane_rows(m, pane) {
        ChoiceRows(msgs) ->
          case list.drop(msgs, index) {
            [msg, ..] -> handle(m, msg)
            [] -> #(m, effect.none())
          }
        ToggleRows(refs) ->
          case list.drop(refs, index) {
            [ref, ..] -> handle(m, UserToggledProblem(ref))
            [] -> #(m, effect.none())
          }
      }
    }
  }
}

fn row_id(pane: model.MenuPane, index: Int) -> String {
  id.menu_row_id(pane, index)
}

fn focus_walk(m: Model, index: Int) -> Model {
  let total = case common.current_problem(m) {
    Ok(current) -> list.length(walk.walk_steps(current.approach))
    Error(Nil) -> 0
  }
  Model(..m, walk: walk.focus_step(m.walk, index, total))
}

pub fn update(m: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  let #(next, effect) = handle(m, msg)
  // The drill clock starts on the way into a drill, wherever that came
  // from, and `ClockTicked` keeps it going only while the drill is up.
  case m.route != DrillRoute && next.route == DrillRoute {
    True -> #(
      Model(..next, now_ms: browser.now_ms()),
      effect.batch([effect, common.tick()]),
    )
    False -> #(next, effect)
  }
}

fn handle(m: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  case msg {
    // --- keyboard ---
    KeyPressed(key) -> {
      // The `,` leader: one-shot rescue for keys a focused button would
      // otherwise swallow. Arms from anywhere but the editor and inputs;
      // the next key routes through the app's table regardless of focus.
      let leader_capable = key.editing != "editor" && key.editing != "input"
      case m.prefix_armed, key.key == "," && leader_capable {
        False, True -> #(Model(..m, prefix_armed: True), effect.none())
        True, _ -> {
          let m = Model(..m, prefix_armed: False)
          case leader_capable && key.key != "," && key.key != "Escape" {
            True ->
              case keys.dispatch(m, msg.Key(..key, editing: "none")) {
                Ok(resolved) -> handle(m, resolved)
                Error(Nil) -> #(m, effect.none())
              }
            False -> #(m, effect.none())
          }
        }
        False, False -> handle_key(m, key)
      }
    }

    HelpToggled -> #(Model(..m, help_open: !m.help_open), effect.none())

    EditorFocusRequested -> #(
      m,
      common.run_effect(fn() { browser.focus_element("gleam-editor") }),
    )

    SearchFocusRequested -> #(
      m,
      common.run_effect(fn() { browser.focus_element(".search") }),
    )

    MenuCursorMoved(delta) ->
      move_cursor(m, fn(index, last) { int.clamp(index + delta, 0, last) })

    MenuCursorJumped(first) ->
      move_cursor(m, fn(_index, last) {
        case first {
          True -> 0
          False -> last
        }
      })

    MenuPaneFocused(direction) -> focus_pane(m, direction)

    MenuActivated -> activate_cursor(m)

    MenuToggledAtCursor -> activate_cursor(m)

    // `z` in the browser: park the cursor row's card. Only rows with a card
    // react — an unseen problem has nothing to suspend.
    MenuSuspendedAtCursor ->
      case cursor_ref(m) {
        Ok(ref) -> handle(m, UserToggledSuspend(ref))
        Error(Nil) -> #(m, effect.none())
      }

    QuizMoved(delta) -> board_update.quiz_moved(m, delta)
    BoardMoved(delta) -> board_update.moved(m, delta)
    BoardShelfMoved(delta) -> board_update.shelf_moved(m, delta)
    BoardJumped(to_top) -> board_update.jumped(m, to_top)
    BoardToggledAtCursor -> board_update.toggled_at_cursor(m)

    // --- session ---
    UserChangedAuthEmail(value) -> session_update.auth_email(m, value)
    UserChangedAuthPassword(value) -> session_update.auth_password(m, value)
    UserToggledAuthMode -> session_update.toggle_auth_mode(m)
    UserSubmittedAuth -> session_update.submit_auth(m)
    AuthCompleted(result) -> session_update.auth_completed(m, result)
    StateLoaded(result) -> session_update.state_loaded(m, result)
    UserClickedRetrySync -> session_update.retry_sync(m)
    StateImported(result) -> session_update.state_imported(m, result)
    UserClickedMergeGuest -> session_update.merge_guest(m)
    UserDismissedMergeOffer -> session_update.dismiss_merge_offer(m)
    UserClickedSignOut -> session_update.sign_out(m)
    SignOutCompleted(_) -> #(m, effect.none())
    UserDismissedNotice -> #(Model(..m, notice: None), effect.none())
    UserDismissedUpgradePrompt -> session_update.dismiss_upgrade_prompt(m)
    UserClickedSignIn(mode) -> session_update.sign_in(m, mode)

    // --- the scheduler ---
    UserClickedStudy ->
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

    // The same queue as Study, opened without an editor: each card is read,
    // revealed and graded from memory. Nothing to run, so no runtime is
    // fetched.
    UserClickedRecall ->
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

    UserRevealedRecall -> #(
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

    UserClickedBrowse -> #(Model(..m, route: MenuRoute), effect.none())

    UserClickedBackToStudy -> #(Model(..m, route: StudyRoute), effect.none())

    UserClickedStats -> stats.open(m)
    StatsLoaded(result) -> stats.loaded(m, result)
    InsightsLoaded(result) -> stats.insights_loaded(m, result)
    StatsCursorMoved(delta) -> stats.cursor_moved(m, delta)
    StatsActivated -> stats.activated(m)
    UserOpenedDetail(problem) -> stats.open_detail(m, problem)
    UserClosedDetail -> stats.close_detail(m)
    HistoryLoaded(problem, result) -> stats.history_loaded(m, problem, result)

    UserGraded(rating) ->
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

    ReviewRecorded(Ok(outcome)) -> {
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

    ReviewRecorded(Error(failure)) -> #(
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

    UserToggledDiff -> #(Model(..m, diff_mode: !m.diff_mode), effect.none())

    UserDismissedDiff -> #(Model(..m, slot: NoPane), effect.none())

    UserClickedUndo ->
      case m.undo, m.grading {
        // Not while a grade is still being saved: the point would be stale.
        Some(point), NotGrading | Some(point), AwaitingGrade -> #(
          Model(..m, undo: None),
          store.undo_review(m, point),
        )
        _, _ -> #(m, effect.none())
      }

    UndoRecorded(point, Ok(outcome)) -> {
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

    // The point is handed back so the undo can be tried again.
    UndoRecorded(point, Error(failure)) -> #(
      Model(..m, undo: Some(point), notice: Some(remote.error_message(failure))),
      effect.none(),
    )

    DraftSynced(Ok(Nil)) -> #(m, effect.none())
    // A failed sync is silent data loss: the typing looked saved and was not.
    // Same surfacing as a failed review write; the next keystroke retries.
    DraftSynced(Error(failure)) -> #(
      Model(
        ..m,
        storage_full: m.mode == Guest || m.storage_full,
        notice: Some(remote.error_message(failure)),
      ),
      effect.none(),
    )

    UserClickedSubcategory(name) -> #(
      Model(..m, selected_subcategory: Some(name)),
      effect.none(),
    )

    UserClickedBreadcrumb(level) ->
      // One crumb deep now: the track is the root, and it is changed on the
      // switcher rather than here.
      case level {
        _ -> #(Model(..m, selected_subcategory: None), effect.none())
      }

    UserToggledProblem(ref) -> #(
      Model(..m, selected: toggle_selection(m.selected, ref)),
      effect.none(),
    )

    UserClickedSelectAll ->
      case m.selected_subcategory {
        Some(sub) -> {
          let cat = m.active_track
          let refs =
            problems.problems_in(cat, sub)
            |> list.map(fn(p) { ProblemRef(cat, sub, p.title) })
            |> list.filter(fn(ref) { !list.contains(m.selected, ref) })
          #(Model(..m, selected: list.append(m.selected, refs)), effect.none())
        }
        None -> #(m, effect.none())
      }

    UserClickedClearSelection -> #(Model(..m, selected: []), effect.none())

    UserChangedIterations(raw) -> {
      let count = case int.parse(raw) {
        Ok(value) if value > 0 -> value
        _ -> 1
      }
      #(Model(..m, iteration_count: count), effect.none())
    }

    UserClickedStartDrill ->
      case m.selected {
        [] -> #(m, effect.none())
        [first, ..] ->
          common.with_prefetch(#(
            Model(
              ..model.open_problem_view(m, first),
              route: DrillRoute,
              problem_index: 0,
              current_iteration: 1,
              // A hand-picked sitting still ends where it started.
              studying: False,
              draft: common.draft_for(m, first),
              run: RunIdle,
              // Without this a reveal-only drill -- Elixir has no harness at
              // all -- would sit forever on "run the tests to grade this" with
              // no tests to run, and could never be scheduled.
              grading: common.initial_grading(m, first),
              opened_at_ms: browser.now_ms(),
              // Clearing the log is what distinguishes a drill from an exam at
              // the end of the run: a non-empty log means a report is owed.
              exam_answers: [],
              sitting: [],
              choice: None,
              graded: False,
            ),
            effect.none(),
          ))
      }

    UserClickedStartExam -> blitz_update.start_exam(m)
    ExamSampled(refs) -> blitz_update.exam_sampled(m, refs)
    UserClickedExitReport -> blitz_update.exit_report(m)

    UserPickedChoice(index) -> board_update.picked_choice(m, index)
    UserSubmittedAnswer -> board_update.submitted_answer(m)
    UserToggledPiece(id) -> board_update.toggle_piece(m, id)
    UserSubmittedBoard -> board_update.submitted_board(m)

    UserClickedExitDrill -> #(
      Model(
        ..m,
        exit_prompt: Some(case common.current_quiz(m), m.studying {
          Ok(_), _ -> "Exit the exam? You will not get a score for it."
          // Study-rep typing is deliberately not persisted; a manual
          // drill's draft was saved moments after the last keystroke.
          Error(Nil), True -> "Exit the drill? Your typed code will be lost."
          Error(Nil), False -> "Exit the drill? Your code is saved as a draft."
        }),
      ),
      // Whatever button was clicked last (a grade, a reveal) still has focus,
      // and a focused button swallows Enter. Drop it so Enter and Escape
      // reach the prompt's bindings.
      common.run_effect(browser.blur_active),
    )

    // `common.reset_home`, not `common.reset_to_menu`: a sitting started from the study
    // queue must end back on the study screen. Landing in the manual browser
    // is disorienting when that is not where you came from.
    ExitConfirmed(True) -> {
      let #(m, abandoned) = common.abandon_run(Model(..m, exit_prompt: None))
      #(common.reset_home(m), abandoned)
    }
    ExitConfirmed(False) -> #(Model(..m, exit_prompt: None), effect.none())

    ClockTicked -> {
      let now_ms = browser.now_ms()
      case m.route, m.blitz {
        // A Blitz card past its deadline is over: recorded as a miss and
        // the next one opens. Grading is skipped -- nothing was solved.
        DrillRoute, Some(blitz) if now_ms >= blitz.deadline_ms ->
          blitz_update.expired(Model(..m, now_ms:))
        DrillRoute, _ -> #(Model(..m, now_ms:), common.tick())
        _, _ -> #(m, effect.none())
      }
    }

    UserToggledBlitz -> blitz_update.toggle_chooser(m)
    UserStartedBlitz(count, per_card_ms) ->
      blitz_update.start(m, count, per_card_ms)
    BlitzExpired -> blitz_update.expired(m)

    UserToggledNudge -> #(
      Model(..m, nudge_shown: !m.nudge_shown),
      effect.none(),
    )

    // Moving the focus reveals nothing: every step's title is on the rail
    // from the moment the problem opens, so walking them is free. Which is
    // why this clamps rather than counting how far anyone has got.
    WalkFocused(index) -> #(focus_walk(m, index), effect.none())
    WalkAdvanced -> #(focus_walk(m, m.walk.focus + 1), effect.none())
    WalkBacked -> #(focus_walk(m, m.walk.focus - 1), effect.none())

    WalkHintShown -> #(
      Model(..m, walk: walk.reveal_layer(m.walk, walk.HintLayer)),
      effect.none(),
    )

    WalkWhyShown -> #(
      Model(..m, walk: walk.reveal_layer(m.walk, walk.WhyLayer)),
      effect.none(),
    )

    // A slice is a piece of the pseudocode, so this is the one layer that
    // goes on the review log.
    WalkCodeShown -> #(
      Model(
        ..m,
        walk: walk.reveal_layer(m.walk, walk.CodeLayer),
        walk_code_seen: True,
      ),
      effect.none(),
    )

    UserRevealedWholeThing -> #(
      Model(..m, whole_thing_shown: True),
      effect.none(),
    )

    // The solution shown is chosen; its button again closes the pane, but
    // the choice stands -- the log records that it was seen.
    UserToggledSolution(index) ->
      case m.slot, m.revealed_solution {
        SolutionPane, Some(current) if current == index -> #(
          Model(..m, slot: NoPane),
          effect.none(),
        )
        _, _ -> #(
          Model(..m, slot: SolutionPane, revealed_solution: Some(index)),
          effect.none(),
        )
      }

    UserToggledPrompt -> {
      let m = Model(..m, prompt_open: !m.prompt_open)
      #(m, common.save_preferences(m))
    }

    UserToggledPane(pane) ->
      case pane, m.slot == pane {
        // Opening the note is focusing it; closing is just closing.
        NotePane, True -> #(Model(..m, slot: NoPane), effect.none())
        NotePane, False -> handle(m, NoteFocusRequested)
        // With no passing run there is no diff to show instead of the
        // reference, so opening the pane is choosing the first solution.
        SolutionPane, False ->
          case m.revealed_solution, model.test_passed(m) {
            None, False -> handle(m, UserToggledSolution(0))
            _, _ -> #(model.toggle_pane(m, SolutionPane), effect.none())
          }
        SolutionPane, True -> #(Model(..m, slot: NoPane), effect.none())
        NoPane, _ -> #(m, effect.none())
      }

    UserClickedNext -> common.advance(m)

    UserSearched(query) -> #(Model(..m, search: query), effect.none())

    UserChangedKeymap(mode) -> {
      let m = Model(..m, editor_keymap: mode)
      #(m, common.save_preferences(m))
    }

    UserToggledResults -> #(
      Model(..m, results_collapsed: !m.results_collapsed),
      effect.none(),
    )

    EditorResized(height) -> {
      let m =
        Model(..m, editor_height: case height > 0 {
          True -> Some(height)
          False -> None
        })
      #(m, common.save_preferences(m))
    }

    UserClickedSettings -> #(
      Model(..m, route: SettingsRoute),
      common.measure_cache(),
    )

    // --- the offline cache ---
    UserClickedWarmCache ->
      case m.warming {
        Some(_) -> #(m, effect.none())
        None -> #(
          Model(..m, warming: Some(#(0, 0))),
          effect.from(fn(dispatch) {
            browser.warm_runtime_cache(fn(ok, done, total, finished) {
              dispatch(CacheWarmed(ok, done, total, finished))
            })
          }),
        )
      }

    CacheWarmed(ok, done, total, finished) ->
      case ok, finished {
        False, _ -> #(
          Model(
            ..m,
            warming: None,
            notice: Some(
              "The download stopped partway. Whatever arrived is kept; try again when you are back online.",
            ),
          ),
          common.measure_cache(),
        )
        True, True -> #(Model(..m, warming: None), common.measure_cache())
        True, False -> #(
          Model(..m, warming: Some(#(done, total))),
          effect.none(),
        )
      }

    CacheMeasured(bytes) -> #(Model(..m, cache_bytes: bytes), effect.none())

    // --- the Gleam Language Tour ---
    UserClickedTour -> tour_update.open_contents(m)
    UserOpenedLesson(index) -> tour_update.open_lesson(m, index)
    UserClickedTourNext -> tour_update.next(m)
    UserClickedTourPrev -> tour_update.prev(m)
    UserClickedTourContents -> tour_update.to_contents(m)
    UserResetLesson -> tour_update.reset_lesson(m)
    TourEditorChanged(text) -> tour_update.editor_changed(m, text)
    TourRunTicked -> tour_update.run_ticked(m)
    TourCursorMoved(delta) -> tour_update.cursor_moved(m, delta)
    TourActivated -> tour_update.activated(m)

    UserChangedSetting(field, raw) ->
      session_update.changed_setting(m, field, raw)
    UserClickedDeviceTimezone -> session_update.device_timezone(m)
    SettingsSaved(result) -> session_update.settings_saved(m, result)

    // --- export and import ---
    UserClickedExport -> transfer.export(m)
    ArchiveReady(result) -> transfer.archive_ready(m, result)
    UserClickedImport -> transfer.pick_import(m)
    ImportPicked(text) -> transfer.import_picked(m, text)
    ImportConfirmed(replace) -> transfer.import_confirmed(m, replace)
    ArchiveRestored(result) -> transfer.restored(m, result)

    UserClickedTracks -> #(Model(..m, route: TracksRoute), effect.none())
    UserPickedTrack(name) -> enter_track(m, name, starter: False)
    UserPickedTrackWithStarter(name) -> enter_track(m, name, starter: True)

    // From the study screen's empty state: twenty easy problems in the track
    // already open, no screen in between.
    UserAddedStarterSet ->
      case common.starter_refs(m, m.active_track) {
        [] -> #(Model(..m, route: TracksRoute), effect.none())
        refs -> #(common.pending(m, refs), store.add_to_queue(m, refs))
      }

    UserToggledSuspend(ref) ->
      case model.card_for(m, ref) {
        None -> #(m, effect.none())
        Some(state) -> #(m, store.set_suspended(m, ref, !state.suspended))
      }

    CardSuspended(Ok(outcome)) -> #(
      Model(
        ..m,
        now: outcome.now,
        today: outcome.today,
        cards: common.fold_card(m, m.cards, outcome.card),
      ),
      effect.none(),
    )
    CardSuspended(Error(failure)) -> #(
      Model(..m, notice: Some(remote.error_message(failure))),
      effect.none(),
    )

    // --- managing the queue ---
    UserClickedQueue -> #(
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

    // --- named queues ---
    UserPickedActiveQueue(name) -> {
      let m = Model(..m, active_queue: name, blitz_chooser: False)
      #(m, common.save_preferences(m))
    }

    UserSelectedQueue(name) -> #(
      Model(
        ..m,
        queue_editing: name,
        queue_naming: None,
        nav: model.MenuNav(..m.nav, queue: 0),
      ),
      effect.none(),
    )

    UserStartedNewQueue -> #(
      Model(..m, queue_naming: Some(model.NewQueue(""))),
      common.focus_after_render(".queue-name-input"),
    )

    UserStartedRenameQueue ->
      case m.queue_editing {
        Some(name) -> #(
          Model(..m, queue_naming: Some(model.RenameQueue(name, name))),
          common.focus_after_render(".queue-name-input"),
        )
        None -> #(m, effect.none())
      }

    UserChangedQueueName(text) -> #(
      Model(..m, queue_naming: case m.queue_naming {
        Some(model.NewQueue(_)) -> Some(model.NewQueue(text))
        Some(model.RenameQueue(from, _)) -> Some(model.RenameQueue(from, text))
        None -> None
      }),
      effect.none(),
    )

    UserCancelledQueueName -> #(Model(..m, queue_naming: None), effect.none())

    UserSubmittedQueueName ->
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
              #(
                m,
                effect.batch([store.save_queues(m), common.save_preferences(m)]),
              )
            }
          }
        }
      }

    // The list goes; the cards it named stay scheduled in everything.
    UserDeletedQueue ->
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

    UserAddedSelectionToQueue(target) ->
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

    QueuesSaved(Ok(Nil)) -> #(m, effect.none())
    QueuesSaved(Error(failure)) -> #(
      Model(
        ..m,
        storage_full: m.mode == Guest || m.storage_full,
        notice: Some(remote.error_message(failure)),
      ),
      effect.none(),
    )

    // --- compare ---
    UserClickedCompare -> compare_update.open(m)
    CompareMoved(delta) -> compare_update.moved(m, delta)
    ComparePickedVariant(side, index) ->
      compare_update.picked_variant(m, side, index)
    UserClosedCompare -> compare_update.close(m)

    UserSearchedQueue(text) -> #(
      Model(..m, queue_search: text, nav: model.MenuNav(..m.nav, queue: 0)),
      effect.none(),
    )

    // Every filter resets the cursor to the top. Keeping the row index across
    // a filter change would leave the highlight on whatever now happens to sit
    // at that position, which is a different problem than the one it was on.
    UserFilteredQueue(filter) -> #(
      Model(..m, queue_status: filter, nav: model.MenuNav(..m.nav, queue: 0)),
      effect.none(),
    )

    UserChangedGroup(change) ->
      case queue.group_rows(m, change), change.add, m.queue_editing {
        [], _, _ -> #(m, effect.none())
        refs, True, None -> #(
          common.pending(m, refs),
          store.add_to_queue(m, refs),
        )
        refs, False, None -> #(
          common.pending(m, refs),
          store.remove_from_queue(m, refs),
        )
        refs, True, Some(name) -> named_queue_add(m, name, refs)
        refs, False, Some(name) -> named_queue_remove(m, name, refs)
      }

    // One verb for both directions, because the row shows one control. A card
    // with review history is parked rather than deleted -- the server refuses
    // to delete it either way, and asking it to is a round trip that can only
    // end in `refused`.
    UserToggledQueued(ref) ->
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

    UserAddedAllShown -> {
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

    // Only the ones it can actually remove. Sending the studied rows too would
    // get them back as `refused` and raise a notice about cards the user never
    // asked to touch -- they are not in this list because they cannot leave the
    // queue, only be paused.
    UserRemovedAllShown ->
      case m.queue_editing {
        None ->
          case list.filter(queue.listed(m), fn(ref) { model.is_new(m, ref) }) {
            [] -> #(m, effect.none())
            refs -> #(common.pending(m, refs), store.remove_from_queue(m, refs))
          }
        Some(name) -> {
          let here = queue.members(m, m.queue_editing)
          case
            list.filter(queue.listed(m), fn(ref) { set.contains(here, ref) })
          {
            [] -> #(m, effect.none())
            refs -> named_queue_remove(m, name, refs)
          }
        }
      }

    QueueCursorMoved(delta) ->
      move_queue_cursor(m, fn(index, last) { int.clamp(index + delta, 0, last) })

    QueueCursorJumped(first) ->
      move_queue_cursor(m, fn(_index, last) {
        case first {
          True -> 0
          False -> last
        }
      })

    QueueToggledAtCursor ->
      case queue_cursor_ref(m) {
        Ok(ref) -> handle(m, UserToggledQueued(ref))
        Error(Nil) -> #(m, effect.none())
      }

    QueueChanged(Ok(change)) -> {
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
    QueueChanged(Error(failure)) -> #(
      Model(..m, queue_pending: [], notice: Some(remote.error_message(failure))),
      effect.none(),
    )

    EditorChanged(text) -> {
      // Study-rep typing is throwaway in memory as well as on disk: updating
      // the assoc here would let a manual open minutes later restore the
      // answer you just typed from memory, which is the leak the study reset
      // exists to prevent.
      let drafts = case model.current_ref(m), m.studying {
        Ok(ref), False -> model.assoc_put(m.drafts, ref, text)
        _, _ -> m.drafts
      }
      #(Model(..m, draft: text, drafts: drafts), common.schedule_draft_save())
    }

    NoteChanged(text) ->
      case model.current_ref(m) {
        Ok(ref) -> #(
          Model(..m, notes: model.assoc_put(m.notes, ref, text)),
          effect.from(fn(dispatch) {
            browser.debounce("note-save", 600, fn() { dispatch(NoteSaveTicked) })
          }),
        )
        Error(Nil) -> #(m, effect.none())
      }

    NoteSaveTicked ->
      case model.current_ref(m) {
        Ok(ref) -> #(
          m,
          store.save_note(
            m,
            ref,
            model.assoc_get(m.notes, ref) |> result.unwrap(""),
          ),
        )
        Error(Nil) -> #(m, effect.none())
      }

    NoteSynced(Ok(Nil)) -> #(m, effect.none())
    NoteSynced(Error(failure)) -> #(
      Model(
        ..m,
        storage_full: m.mode == Guest || m.storage_full,
        notice: Some(remote.error_message(failure)),
      ),
      effect.none(),
    )

    NoteFocusRequested -> #(
      Model(..m, slot: NotePane),
      common.focus_after_render(".note-input"),
    )

    DraftSaveTicked ->
      case model.current_ref(m), m.studying {
        // A study rep is throwaway typing; persisting it would clobber the
        // draft saved from a real working session on the same problem.
        _, True -> #(m, effect.none())
        Ok(ref), False -> #(m, store.save_draft(m, ref, m.draft))
        Error(Nil), _ -> #(m, effect.none())
      }

    UserClickedRun -> request_run(m, model.TestRun)

    UserClickedScratchRun -> request_run(m, model.ScratchRun)

    UserClickedStopRun -> common.abandon_run(m)

    UserClickedRetryRuntime(language) -> #(
      Model(
        ..m,
        runtimes: model.assoc_put(m.runtimes, language, RuntimeLoading),
      ),
      runner.restart(language),
    )

    RunnerReady(language) -> {
      let m =
        Model(
          ..m,
          runtimes: model.assoc_put(m.runtimes, language, RuntimeReady),
        )
      // A Blitz card whose runtime was still downloading has not had a
      // fair clock: it restarts now that a run is actually possible.
      let m = case m.blitz, m.route, common.current_language(m) {
        Some(blitz), DrillRoute, Ok(current) if current == language ->
          Model(
            ..m,
            blitz: Some(
              model.Blitz(
                ..blitz,
                deadline_ms: browser.now_ms() + blitz.per_card_ms,
              ),
            ),
          )
        _, _, _ -> m
      }
      case language, m.run {
        // A tour lesson opened before the compiler was ready runs now.
        "gleam", RunIdle -> common.run_tour_lesson(m)
        _, _ -> #(m, effect.none())
      }
    }
    RunnerFailed(language, message) -> #(
      Model(
        ..m,
        runtimes: model.assoc_put(m.runtimes, language, RuntimeFailed(message)),
        // A dead runtime cannot finish the in-flight run; clearing it here
        // stops the still-armed timeout from reporting a bogus infinite loop.
        run: case m.run {
          Running(_, _) -> RunIdle
          other -> other
        },
      ),
      effect.none(),
    )

    RunFinished(id, outcome, stdout) ->
      case m.run {
        Running(current, _) if current == id -> {
          let run = Ran(outcome, stdout)
          // A pass opens the reference beside your code, as a diff. Only a
          // real answer counts: something typed, on a problem with a
          // reference, from the test run and not a scratch one.
          let passed =
            m.run_kind == model.TestRun
            && model.run_passed(run)
            && string.trim(m.draft) != ""
            && case common.current_problem(m) {
              Ok(current) -> current.solutions != []
              Error(Nil) -> False
            }
          #(
            // Whatever the harness said, the drill is now answerable: the
            // grading bar decides what the buttons offer. A scratch run is
            // not an answer, though; it leaves the gate where it was.
            Model(
              ..m,
              run:,
              grading: case m.run_kind {
                model.TestRun -> AwaitingGrade
                model.ScratchRun -> m.grading
              },
              slot: model.pane_after_run(m.slot, m.revealed_solution, passed),
            ),
            // Blur the editor so 1-4 grade immediately: the whole rep is
            // type, Ctrl+Enter, digit. Not on the tour, where a run follows
            // every pause in typing and must not take the cursor away.
            case m.route {
              DrillRoute -> common.run_effect(browser.blur_active)
              _ -> effect.none()
            },
          )
        }
        _ -> #(m, effect.none())
      }

    // The server answered, or the request failed. A failed request is not
    // a failed run: the attempt never executed, so the run goes back to idle
    // and the reason is shown as a notice, where a lost connection belongs.
    RemoteRunFinished(id, result) ->
      case m.run, result {
        Running(current, _), Ok(wire.RunResult(cases, stdout, error))
          if current == id
        -> {
          let outcome = case error {
            None ->
              Cases(
                list.map(cases, fn(c) {
                  CaseResult(c.label, c.expected, c.actual, c.passed)
                }),
              )
            Some(wire.RunError(phase, line, message)) ->
              Errored(RunError(phase, None, line, None, message))
          }
          handle(m, RunFinished(id, outcome, stdout))
        }
        Running(current, _), Error(remote.Unauthorised) if current == id ->
          handle(
            Model(..m, run: RunIdle),
            StateLoaded(Error(remote.Unauthorised)),
          )
        Running(current, _), Error(failure) if current == id -> #(
          Model(..m, run: RunIdle, notice: Some(remote.error_message(failure))),
          effect.none(),
        )
        _, _ -> #(m, effect.none())
      }

    RunTimedOut(id) ->
      case m.run {
        Running(current, _) if current == id -> {
          let timed_out =
            Model(..m, run: Ran(TimedOut, ""), grading: case m.run_kind {
              model.TestRun -> AwaitingGrade
              model.ScratchRun -> m.grading
            })
          // The worker cannot be interrupted, only replaced. A server-side
          // run has no worker: the server has already killed it.
          case m.route, common.current_language(m) {
            TourRoute, _ -> Ok("gleam")
            _, other -> other
          }
          |> fn(language) {
            case language {
              Ok(language) ->
                case runner.is_remote(language) {
                  True -> #(timed_out, effect.none())
                  False -> #(
                    Model(
                      ..timed_out,
                      runtimes: model.assoc_put(
                        m.runtimes,
                        language,
                        RuntimeLoading,
                      ),
                    ),
                    runner.restart(language),
                  )
                }
              Error(Nil) -> #(timed_out, effect.none())
            }
          }
        }
        _ -> #(m, effect.none())
      }

    // Armed alongside every spawn; a stale timer for a runtime that made it
    // to ready (or already failed loudly) is a no-op.
    RuntimeLoadTimedOut(language) ->
      case model.runtime_for(m, language) {
        RuntimeLoading -> #(
          Model(
            ..m,
            runtimes: model.assoc_put(
              m.runtimes,
              language,
              RuntimeFailed("The runtime took too long to load."),
            ),
          ),
          effect.none(),
        )
        _ -> #(m, effect.none())
      }
  }
}

fn handle_key(m: Model, key: msg.Key) -> #(Model, Effect(Msg)) {
  case key.editing {
    // The editor's own keymaps own the keyboard; the one thing the app
    // claims there is Ctrl+Enter, so write -> run -> grade needs no mouse.
    "editor" ->
      case key.ctrl && key.key == "Enter" && m.route == DrillRoute {
        True -> handle(m, UserClickedRun)
        False -> #(m, effect.none())
      }
    // Inputs keep their keys; Escape hands focus back to the app.
    "input" ->
      case key.key {
        "Escape" -> #(m, common.run_effect(browser.blur_active))
        _ -> #(m, effect.none())
      }
    // A focused button activates natively; stay out of its way — except
    // for Escape, which activates nothing and would otherwise die on
    // whichever button was clicked last (grade, reveal, run).
    "control" ->
      case key.key {
        "Escape" ->
          case keys.dispatch(m, key) {
            Ok(resolved) -> handle(m, resolved)
            Error(Nil) -> #(m, effect.none())
          }
        _ -> #(m, effect.none())
      }
    _ ->
      case keys.dispatch(m, key) {
        Ok(resolved) -> handle(m, resolved)
        Error(Nil) -> #(m, effect.none())
      }
  }
}

/// A run the button or keyboard asked for, once the runtime is ready: posted
/// to the server for a remote language, spawned in a worker otherwise.
/// A run of either kind, with every reason it cannot start said out loud:
/// the button is disabled in those states, but `r`, `t` and Ctrl+Enter
/// land here too and silence reads as a broken key.
fn request_run(m: Model, kind: model.RunKind) -> #(Model, Effect(Msg)) {
  case m.run {
    // One run at a time: a queued second run just doubles the wait.
    Running(_, _) -> #(m, effect.none())
    _ ->
      case common.current_language(m), common.current_check(m) {
        Ok(language), Ok(check) -> {
          let harness = case kind {
            model.TestRun -> check.harness
            model.ScratchRun -> runner.scratch_harness(language)
          }
          case model.runtime_for(m, language) {
            // Elixir and Go run on the server, and the server wants a
            // session.
            RuntimeReady if m.mode == Guest ->
              case runner.is_remote(language) {
                True -> #(
                  Model(
                    ..m,
                    notice: Some(
                      "This drill runs on the server \u{2014} sign in to run it.",
                    ),
                  ),
                  effect.none(),
                )
                False -> start_run(m, language, harness, kind)
              }
            RuntimeReady -> start_run(m, language, harness, kind)
            RuntimeLoading | RuntimeNotLoaded -> #(
              Model(
                ..m,
                notice: Some(
                  "The runtime is still loading \u{2014} the Run button enables when it's ready.",
                ),
              ),
              effect.none(),
            )
            RuntimeFailed(_) -> #(
              Model(
                ..m,
                notice: Some(
                  "The runtime failed to load \u{2014} use Retry next to the Run button.",
                ),
              ),
              effect.none(),
            )
          }
        }
        _, _ -> #(m, effect.none())
      }
  }
}

fn start_run(
  m: Model,
  language: String,
  harness: String,
  kind: model.RunKind,
) -> #(Model, Effect(Msg)) {
  let id = m.next_run_id
  let previous = case m.run {
    Ran(_, stdout) -> stdout
    _ -> ""
  }
  let started =
    Model(..m, run: Running(id, previous), run_kind: kind, next_run_id: id + 1)
  case runner.is_remote(language), m.mode {
    True, Account(token) -> #(
      started,
      effect.batch([
        api.post_run(
          common.api_base(),
          token,
          wire.RunRequest(language, m.draft, harness),
          RemoteRunFinished(id, _),
        ),
        runner.arm_remote_timeout(id),
      ]),
    )
    // Unreachable: request_run catches a guest first.
    True, Guest -> #(m, effect.none())
    False, _ -> {
      let #(next, fx) = common.start_local_run(m, language, m.draft, harness)
      #(Model(..next, run_kind: kind), fx)
    }
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

/// Move the board cursor, clamped, and scroll the chip into view -- the
/// palette is taller than the viewport on a phone, so a cursor that moved
/// without scrolling would leave the keyboard driving something off screen.
fn toggle_selection(
  selected: List(ProblemRef),
  ref: ProblemRef,
) -> List(ProblemRef) {
  case list.contains(selected, ref) {
    True -> list.filter(selected, fn(r) { r != ref })
    False -> list.append(selected, [ref])
  }
}

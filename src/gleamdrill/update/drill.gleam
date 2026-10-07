//// The drill screen's own actions: starting a manual sitting, the exit
//// prompt and clock, the walkthrough rail, panes and toggles, and the
//// draft and note syncing.

import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleam/result
import gleamdrill/browser
import gleamdrill/model.{
  type Model, DrillRoute, Guest, Model, NoPane, NotePane, RunIdle, SolutionPane,
}
import gleamdrill/msg.{type Msg, NoteSaveTicked}
import gleamdrill/remote.{type ApiError}
import gleamdrill/store
import gleamdrill/update/blitz as blitz_update
import gleamdrill/update/common
import gleamdrill/walk
import lustre/effect.{type Effect}

pub fn changed_iterations(m: Model, raw: String) -> #(Model, Effect(Msg)) {
  {
    let count = case int.parse(raw) {
      Ok(value) if value > 0 -> value
      _ -> 1
    }
    #(Model(..m, iteration_count: count), effect.none())
  }
}

pub fn start_drill(m: Model) -> #(Model, Effect(Msg)) {
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
}

pub fn exit_requested(m: Model) -> #(Model, Effect(Msg)) {
  #(
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
}

pub fn exit_confirmed(m: Model, leave: Bool) -> #(Model, Effect(Msg)) {
  case leave {
    True -> {
      let #(m, abandoned) = common.abandon_run(Model(..m, exit_prompt: None))
      #(common.reset_home(m), abandoned)
    }
    False -> #(Model(..m, exit_prompt: None), effect.none())
  }
}

pub fn clock_ticked(m: Model) -> #(Model, Effect(Msg)) {
  {
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
}

pub fn toggle_nudge(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, nudge_shown: !m.nudge_shown), effect.none())
}

pub fn walk_focused(m: Model, index: Int) -> #(Model, Effect(Msg)) {
  #(focus_walk(m, index), effect.none())
}

pub fn walk_hint(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, walk: walk.reveal_layer(m.walk, walk.HintLayer)), effect.none())
}

pub fn walk_why(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, walk: walk.reveal_layer(m.walk, walk.WhyLayer)), effect.none())
}

pub fn walk_code(m: Model) -> #(Model, Effect(Msg)) {
  #(
    Model(
      ..m,
      walk: walk.reveal_layer(m.walk, walk.CodeLayer),
      walk_code_seen: True,
    ),
    effect.none(),
  )
}

pub fn reveal_whole_thing(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, whole_thing_shown: True), effect.none())
}

pub fn toggle_solution(m: Model, index: Int) -> #(Model, Effect(Msg)) {
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
}

pub fn toggle_prompt(m: Model) -> #(Model, Effect(Msg)) {
  {
    let m = Model(..m, prompt_open: !m.prompt_open)
    #(m, common.save_preferences(m))
  }
}

pub fn toggle_pane(m: Model, pane: model.Pane) -> #(Model, Effect(Msg)) {
  case pane, m.slot == pane {
    // Opening the note is focusing it; closing is just closing.
    NotePane, True -> #(Model(..m, slot: NoPane), effect.none())
    NotePane, False -> focus_note(m)
    // With no passing run there is no diff to show instead of the
    // reference, so opening the pane is choosing the first solution.
    SolutionPane, False ->
      case m.revealed_solution, model.test_passed(m) {
        None, False -> toggle_solution(m, 0)
        _, _ -> #(model.toggle_pane(m, SolutionPane), effect.none())
      }
    SolutionPane, True -> #(Model(..m, slot: NoPane), effect.none())
    NoPane, _ -> #(m, effect.none())
  }
}

pub fn changed_keymap(m: Model, mode: String) -> #(Model, Effect(Msg)) {
  {
    let m = Model(..m, editor_keymap: mode)
    #(m, common.save_preferences(m))
  }
}

pub fn toggle_results(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, results_collapsed: !m.results_collapsed), effect.none())
}

pub fn editor_resized(m: Model, height: Int) -> #(Model, Effect(Msg)) {
  {
    let m =
      Model(..m, editor_height: case height > 0 {
        True -> Some(height)
        False -> None
      })
    #(m, common.save_preferences(m))
  }
}

pub fn editor_changed(m: Model, text: String) -> #(Model, Effect(Msg)) {
  {
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
}

pub fn note_changed(m: Model, text: String) -> #(Model, Effect(Msg)) {
  case model.current_ref(m) {
    Ok(ref) -> #(
      Model(..m, notes: model.assoc_put(m.notes, ref, text)),
      effect.from(fn(dispatch) {
        browser.debounce("note-save", 600, fn() { dispatch(NoteSaveTicked) })
      }),
    )
    Error(Nil) -> #(m, effect.none())
  }
}

pub fn note_synced(
  m: Model,
  result: Result(Nil, ApiError),
) -> #(Model, Effect(Msg)) {
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

pub fn focus_note(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, slot: NotePane), common.focus_after_render(".note-input"))
}

pub fn draft_save_ticked(m: Model) -> #(Model, Effect(Msg)) {
  case model.current_ref(m), m.studying {
    // A study rep is throwaway typing; persisting it would clobber the
    // draft saved from a real working session on the same problem.
    _, True -> #(m, effect.none())
    Ok(ref), False -> #(m, store.save_draft(m, ref, m.draft))
    Error(Nil), _ -> #(m, effect.none())
  }
}

pub fn note_save_ticked(m: Model) -> #(Model, Effect(Msg)) {
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
}

pub fn toggle_diff(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, diff_mode: !m.diff_mode), effect.none())
}

pub fn dismiss_diff(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, slot: NoPane), effect.none())
}

pub fn draft_synced(
  m: Model,
  result: Result(Nil, ApiError),
) -> #(Model, Effect(Msg)) {
  case result {
    Ok(Nil) -> #(m, effect.none())
    // A failed sync is silent data loss: the typing looked saved and was not.
    // Same surfacing as a failed review write; the next keystroke retries.
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

fn focus_walk(m: Model, index: Int) -> Model {
  let total = case common.current_problem(m) {
    Ok(current) -> list.length(walk.walk_steps(current.approach))
    Error(Nil) -> 0
  }
  Model(..m, walk: walk.focus_step(m.walk, index, total))
}

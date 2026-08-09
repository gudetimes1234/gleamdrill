import algodrill/browser
import algodrill/editor
import algodrill/model.{
  type Model, type Msg, type ProblemRef, Cases, DraftSaveTicked, DrillRoute,
  EditorChanged, Errored, ExitConfirmed, MenuRoute, Model, ProblemRef, Ran,
  RunFinished, RunIdle, RunTimedOut, RunnerFailed, RunnerReady, Running,
  RuntimeFailed, RuntimeLoading, RuntimeNotLoaded, RuntimeReady, TimedOut,
  UserChangedIterations, UserChangedKeymap, UserClickedBreadcrumb,
  UserClickedCategory, UserClickedClearSelection, UserClickedExitDrill,
  UserClickedNext, UserClickedRun, UserClickedSelectAll, UserClickedStartDrill,
  UserClickedSubcategory, UserSearched, UserToggledProblem, UserToggledSolution,
}
import algodrill/problem
import algodrill/problems
import algodrill/runner
import algodrill/storage
import algodrill/view/drill
import algodrill/view/menu
import gleam/int
import gleam/list
import gleam/option.{None, Some}
import lustre
import lustre/effect.{type Effect}
import lustre/element.{type Element}

pub fn main() {
  editor.register()
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
  Nil
}

fn init(_flags) -> #(Model, Effect(Msg)) {
  let loaded = storage.load()
  let hydrated = case loaded.route, model.current_ref(loaded) {
    DrillRoute, Ok(ref) -> Model(..loaded, draft: draft_for(loaded, ref))
    _, _ -> loaded
  }
  with_prefetch(#(hydrated, effect.none()))
}

/// Opening a checkable drill starts that language's (lazy) runtime download so
/// it is usually ready before the first Run click. Drills without checks never
/// load anything.
fn with_prefetch(pair: #(Model, Effect(Msg))) -> #(Model, Effect(Msg)) {
  let #(m, fx) = pair
  case
    m.route == DrillRoute && current_check(m) != Error(Nil),
    current_language(m)
  {
    True, Ok(language) ->
      case model.runtime_for(m, language) {
        RuntimeNotLoaded -> #(
          Model(
            ..m,
            runtimes: model.assoc_put(m.runtimes, language, RuntimeLoading),
          ),
          effect.batch([fx, runner.ensure(language)]),
        )
        _ -> pair
      }
    _, _ -> pair
  }
}

fn current_language(m: Model) -> Result(String, Nil) {
  case model.current_ref(m) {
    Ok(ref) ->
      case problems.find(ref.category, ref.subcategory, ref.title) {
        Ok(p) -> Ok(problem.language_slug(p.language))
        Error(Nil) -> Error(Nil)
      }
    Error(Nil) -> Error(Nil)
  }
}

fn current_check(m: Model) -> Result(problem.Check, Nil) {
  case model.current_ref(m) {
    Ok(ref) ->
      case problems.find(ref.category, ref.subcategory, ref.title) {
        Ok(p) ->
          case p.check {
            Some(check) -> Ok(check)
            None -> Error(Nil)
          }
        Error(Nil) -> Error(Nil)
      }
    Error(Nil) -> Error(Nil)
  }
}

fn update(m: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  let #(new_model, fx) = handle(m, msg)
  case should_persist(msg) {
    True -> #(new_model, effect.batch([storage.save(new_model), fx]))
    False -> #(new_model, fx)
  }
}

/// State is written to localStorage after every mutation of persisted fields.
/// Editor keystrokes are debounced: EditorChanged schedules DraftSaveTicked,
/// and only that write hits storage.
fn should_persist(msg: Msg) -> Bool {
  case msg {
    EditorChanged(_) | UserToggledSolution(_) -> False
    UserClickedExitDrill | ExitConfirmed(False) -> False
    UserClickedRun | RunnerReady(_) | RunnerFailed(_, _) -> False
    _ -> True
  }
}

fn handle(m: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  case msg {
    UserClickedCategory(name) -> #(
      Model(..m, selected_category: Some(name), selected_subcategory: None),
      effect.none(),
    )

    UserClickedSubcategory(name) -> #(
      Model(..m, selected_subcategory: Some(name)),
      effect.none(),
    )

    UserClickedBreadcrumb(level) ->
      case level {
        0 -> #(
          Model(..m, selected_category: None, selected_subcategory: None),
          effect.none(),
        )
        _ -> #(Model(..m, selected_subcategory: None), effect.none())
      }

    UserToggledProblem(ref) -> #(
      Model(..m, selected: toggle_selection(m.selected, ref)),
      effect.none(),
    )

    UserClickedSelectAll ->
      case m.selected_category, m.selected_subcategory {
        Some(cat), Some(sub) -> {
          let refs =
            problems.problems_in(cat, sub)
            |> list.map(fn(p) { ProblemRef(cat, sub, p.title) })
            |> list.filter(fn(ref) { !list.contains(m.selected, ref) })
          #(Model(..m, selected: list.append(m.selected, refs)), effect.none())
        }
        _, _ -> #(m, effect.none())
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
          with_prefetch(#(
            Model(
              ..m,
              route: DrillRoute,
              problem_index: 0,
              current_iteration: 1,
              draft: starter_for(first),
              drafts: model.assoc_put(m.drafts, first, starter_for(first)),
              revealed_solution: None,
              run: RunIdle,
            ),
            effect.none(),
          ))
      }

    UserClickedExitDrill -> #(
      m,
      effect.from(fn(dispatch) {
        dispatch(
          ExitConfirmed(browser.confirm(
            "Exit the drill? Your typed code will be lost.",
          )),
        )
      }),
    )

    ExitConfirmed(True) -> #(reset_to_menu(m), effect.none())
    ExitConfirmed(False) -> #(m, effect.none())

    UserToggledSolution(index) -> {
      let revealed = case m.revealed_solution {
        Some(current) if current == index -> None
        _ -> Some(index)
      }
      #(Model(..m, revealed_solution: revealed), effect.none())
    }

    UserClickedNext -> {
      let #(iteration, index) = case m.current_iteration < m.iteration_count {
        True -> #(m.current_iteration + 1, m.problem_index)
        False -> #(1, m.problem_index + 1)
      }
      case index >= list.length(m.selected) {
        True -> #(
          reset_to_menu(m),
          effect.from(fn(_dispatch) { browser.alert("Drill complete.") }),
        )
        False -> {
          let advanced =
            Model(
              ..m,
              current_iteration: iteration,
              problem_index: index,
              revealed_solution: None,
              run: RunIdle,
            )
          // Each repetition starts from the stub: retyping is the drill.
          // The saved draft only survives reloads mid-repetition.
          let advanced = case model.current_ref(advanced) {
            Ok(ref) ->
              Model(
                ..advanced,
                draft: starter_for(ref),
                drafts: model.assoc_put(advanced.drafts, ref, starter_for(ref)),
              )
            Error(Nil) -> Model(..advanced, draft: "")
          }
          with_prefetch(#(advanced, effect.none()))
        }
      }
    }

    UserSearched(query) -> #(Model(..m, search: query), effect.none())

    UserChangedKeymap(mode) -> #(Model(..m, editor_keymap: mode), effect.none())

    EditorChanged(text) -> {
      let drafts = case model.current_ref(m) {
        Ok(ref) -> model.assoc_put(m.drafts, ref, text)
        Error(Nil) -> m.drafts
      }
      #(Model(..m, draft: text, drafts: drafts), schedule_draft_save())
    }

    DraftSaveTicked -> #(m, effect.none())

    UserClickedRun ->
      case current_language(m), current_check(m) {
        Ok(language), Ok(check) ->
          case model.runtime_for(m, language) {
            RuntimeReady -> {
              let id = m.next_run_id
              #(
                Model(..m, run: Running(id), next_run_id: id + 1),
                runner.run(language, id, m.draft, check.harness),
              )
            }
            _ -> #(m, effect.none())
          }
        _, _ -> #(m, effect.none())
      }

    RunnerReady(language) -> #(
      Model(..m, runtimes: model.assoc_put(m.runtimes, language, RuntimeReady)),
      effect.none(),
    )
    RunnerFailed(language, message) -> #(
      Model(
        ..m,
        runtimes: model.assoc_put(m.runtimes, language, RuntimeFailed(message)),
      ),
      effect.none(),
    )

    RunFinished(id, outcome) ->
      case m.run {
        Running(current) if current == id -> {
          let passed = case outcome {
            Cases(cases) -> cases != [] && list.all(cases, fn(c) { c.passed })
            Errored(_) | TimedOut -> False
          }
          let attempts = case model.current_ref(m) {
            Ok(ref) -> record_attempt(m.attempts, ref, passed)
            Error(Nil) -> m.attempts
          }
          #(Model(..m, run: Ran(outcome), attempts: attempts), effect.none())
        }
        _ -> #(m, effect.none())
      }

    RunTimedOut(id) ->
      case m.run {
        Running(current) if current == id -> {
          let attempts = case model.current_ref(m) {
            Ok(ref) -> record_attempt(m.attempts, ref, False)
            Error(Nil) -> m.attempts
          }
          // The worker cannot be interrupted, only replaced.
          case current_language(m) {
            Ok(language) -> #(
              Model(
                ..m,
                run: Ran(TimedOut),
                attempts: attempts,
                runtimes: model.assoc_put(m.runtimes, language, RuntimeLoading),
              ),
              runner.restart(language),
            )
            Error(Nil) -> #(
              Model(..m, run: Ran(TimedOut), attempts: attempts),
              effect.none(),
            )
          }
        }
        _ -> #(m, effect.none())
      }
  }
}

/// A pass is sticky: once a problem has been solved, a later failed rerun
/// keeps the passed badge.
fn record_attempt(
  attempts: List(#(ProblemRef, model.Attempt)),
  ref: ProblemRef,
  passed: Bool,
) -> List(#(ProblemRef, model.Attempt)) {
  case passed, model.assoc_get(attempts, ref) {
    True, _ -> model.assoc_put(attempts, ref, model.Passed)
    False, Ok(model.Passed) -> attempts
    False, _ -> model.assoc_put(attempts, ref, model.Failed)
  }
}

fn draft_for(m: Model, ref: ProblemRef) -> String {
  case model.assoc_get(m.drafts, ref) {
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

fn schedule_draft_save() -> Effect(Msg) {
  effect.from(fn(dispatch) {
    browser.debounce("draft-save", 400, fn() { dispatch(DraftSaveTicked) })
  })
}

fn reset_to_menu(m: Model) -> Model {
  Model(
    ..m,
    route: MenuRoute,
    problem_index: 0,
    current_iteration: 1,
    draft: "",
    revealed_solution: None,
    run: RunIdle,
  )
}

fn toggle_selection(
  selected: List(ProblemRef),
  ref: ProblemRef,
) -> List(ProblemRef) {
  case list.contains(selected, ref) {
    True -> list.filter(selected, fn(r) { r != ref })
    False -> list.append(selected, [ref])
  }
}

fn view(m: Model) -> Element(Msg) {
  case m.route {
    DrillRoute ->
      case drill.view(m) {
        Ok(el) -> el
        Error(Nil) -> menu.view(m)
      }
    MenuRoute -> menu.view(m)
  }
}

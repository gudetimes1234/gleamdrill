//// The transitions and effects more than one feature shares: entering and
//// leaving problems, the run teardown, prefetch, preferences, and the
//// small effect wrappers. Feature modules under update/ may import this;
//// nothing here may import a feature.

import gleam/bool
import gleam/dict
import gleam/list
import gleam/option.{None, Some}
import gleamdrill/browser
import gleamdrill/local
import gleamdrill/model.{
  type Model, Account, Guest, Model, Ran, Running, RuntimeReady, TourLesson,
  TourRoute,
}
import gleamdrill/msg.{type Msg}
import gleamdrill/problem.{type ProblemRef}
import gleamdrill/problems
import gleamdrill/runner
import gleamdrill/session
import gleamdrill/tour
import gleamdrill/track
import gleamdrill/walk
import lustre/effect.{type Effect}
import wire

pub fn run_effect(action: fn() -> Nil) -> Effect(Msg) {
  use _dispatch <- effect.from
  action()
}

/// Focus something the same message puts on screen. `effect.from` runs
/// before the render, when the element is not there yet to focus.
pub fn scroll_to(id: String) -> Effect(Msg) {
  run_effect(fn() { browser.scroll_into_view(id) })
}

/// Focus something the same message puts on screen. `effect.from` runs
/// before the render, when the element is not there yet to focus.
pub fn focus_after_render(selector: String) -> Effect(Msg) {
  use _dispatch, _root <- effect.before_paint
  browser.focus_element(selector)
}

pub fn keyboard_effect() -> Effect(Msg) {
  use dispatch <- effect.from
  browser.on_keys(fn(key, ctrl, shift, editing) {
    dispatch(msg.KeyPressed(msg.Key(key:, ctrl:, shift:, editing:)))
  })
}

/// One clock tick, a second out. Keyed through the same debounce as the
/// draft save so a drill reopened within the second does not start a second
/// chain of ticks.
pub fn tick() -> Effect(Msg) {
  effect.from(fn(dispatch) {
    browser.debounce("drill-clock", 1000, fn() { dispatch(msg.ClockTicked) })
  })
}

/// The first twenty Easy problems of one model.track, in catalogue order, skipping
/// any already queued. Catalogue order is the topic curriculum, not a
/// difficulty ramp -- its first twenty include Trapping Rain Water -- so the
/// starter set filters by rating first and only falls back to plain catalogue
/// order for a model.track with no ratings (System Design).
pub fn measure_cache() -> Effect(Msg) {
  effect.from(fn(dispatch) {
    browser.runtime_cache_size(fn(bytes) { dispatch(msg.CacheMeasured(bytes)) })
  })
}

pub fn schedule_draft_save() -> Effect(Msg) {
  effect.from(fn(dispatch) {
    browser.debounce("draft-save", 400, fn() { dispatch(msg.DraftSaveTicked) })
  })
}

pub fn api_base() -> String {
  browser.api_base()
}

/// The token for the current session, or "" when signed out. Callers that need
/// one are only reachable from behind the auth gate, so the empty case is a
/// belt-and-braces default rather than a real path.
/// The token for the current session, or "" when signed out. Callers that need
/// one are only reachable from behind the auth gate, so the empty case is a
/// belt-and-braces default rather than a real path.
pub fn token(m: Model) -> String {
  case m.mode {
    Account(token) -> token
    Guest -> ""
  }
}

/// Opening a checkable drill starts that language's (lazy) runtime download so
/// it is usually ready before the first Run click. Drills without checks never
/// load anything.
/// The language whose runtime the screen on the way in will need, if any: a
/// checkable drill's, or Gleam's for a tour lesson.
/// Persist the settings that belong to this browser rather than the account.
///
/// Written whole every time, so every caller must pass a model.model that already
/// holds the change it wants saved.
pub fn save_preferences(m: Model) -> Effect(Msg) {
  session.save_preferences(session.Preferences(
    editor_keymap: m.editor_keymap,
    editor_height: m.editor_height,
    prompt_open: m.prompt_open,
    tour_lesson: m.tour_lesson,
    active_track: case m.active_track {
      "" -> None
      name -> Some(name)
    },
    // The model.model holds the active model.track's queue; the rest of the map is left
    // exactly as it was, so switching away does not forget where you were in
    // the model.track you came from.
    active_queue: remembered_queues(m),
  ))
}

pub fn remembered_queues(m: Model) -> List(#(String, String)) {
  let others =
    list.filter(m.remembered_queues, fn(entry) { entry.0 != m.active_track })
  case m.active_queue {
    Some(name) -> [#(m.active_track, name), ..others]
    None -> others
  }
}

pub fn current_problem(m: Model) -> Result(problem.Problem, Nil) {
  case model.current_ref(m) {
    Ok(ref) -> problems.find(ref.category, ref.subcategory, ref.title)
    Error(Nil) -> Error(Nil)
  }
}

/// Folds one card into the store, unless it belongs to another track.
///
/// `m.cards` is the *active model.track's* cards, so a response that arrives after
/// the user has switched must not be folded in: a review recorded in Python
/// answering while the Go model.track is open would otherwise leave a Python card
/// sitting in the Go screens. Free and total, so every fold site can use it.
pub fn current_language(m: Model) -> Result(String, Nil) {
  case model.current_ref(m) {
    Ok(ref) ->
      case problems.find(ref.category, ref.subcategory, ref.title) {
        Ok(p) -> Ok(problem.language_slug(p.language))
        Error(Nil) -> Error(Nil)
      }
    Error(Nil) -> Error(Nil)
  }
}

pub fn current_check(m: Model) -> Result(problem.Check, Nil) {
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

/// Opening a checkable drill starts that language's (lazy) runtime download so
/// it is usually ready before the first Run click. Drills without checks never
/// load anything.
/// The language whose runtime the screen on the way in will need, if any: a
/// checkable drill's, or Gleam's for a tour lesson.
pub fn runtime_wanted(m: Model) -> Result(String, Nil) {
  case m.route, m.tour_page {
    model.DrillRoute, _ ->
      case current_check(m) {
        Ok(_) -> current_language(m)
        Error(Nil) -> Error(Nil)
      }
    model.TourRoute, model.TourLesson(_) -> Ok("gleam")
    _, _ -> Error(Nil)
  }
}

pub fn with_prefetch(pair: #(Model, Effect(Msg))) -> #(Model, Effect(Msg)) {
  let #(m, fx) = pair
  case runtime_wanted(m) {
    Ok(language) ->
      case model.runtime_for(m, language) {
        model.RuntimeNotLoaded -> #(
          Model(
            ..m,
            runtimes: model.assoc_put(
              m.runtimes,
              language,
              model.RuntimeLoading,
            ),
          ),
          effect.batch([fx, runner.ensure(language)]),
        )
        // A failed load gets one fresh chance per drill open; without this
        // the only recovery was a page reload.
        model.RuntimeFailed(_) -> #(
          Model(
            ..m,
            runtimes: model.assoc_put(
              m.runtimes,
              language,
              model.RuntimeLoading,
            ),
          ),
          effect.batch([fx, runner.restart(language)]),
        )
        _ -> pair
      }
    Error(Nil) -> pair
  }
}

/// Post one run to a local runtime that is known to be ready. The previous
/// run's output is carried into the model.Running state so the pane can keep
/// showing it, dimmed, until the new result lands.
pub fn guest_has_progress() -> Bool {
  local.has_data()
}

pub fn draft_for(m: Model, ref: ProblemRef) -> String {
  case model.assoc_get(m.drafts, ref) {
    Ok(text) -> text
    Error(Nil) -> starter_for(ref)
  }
}

pub fn starter_for(ref: ProblemRef) -> String {
  case problems.find(ref.category, ref.subcategory, ref.title) {
    Ok(p) ->
      case p.check {
        Some(check) -> check.starter
        None -> ""
      }
    Error(Nil) -> ""
  }
}

/// A drill with no harness has nothing to run, so it is gradeable the moment
/// it opens. One with a harness waits for a result.
/// What the grade bar starts as when a problem opens.
///
/// Gradeable from the first moment when either there is nothing to run (a
/// reveal-only drill is a flashcard proper) or this is the problem's first
/// encounter — the learning step, where you reveal, study, and self-grade like
/// flipping a card. Otherwise a run is required before grading.
pub fn initial_grading(m: Model, ref: ProblemRef) -> model.Grading {
  use <- bool.guard(m.recall, model.NotGrading)
  // A Blitz is scored on the run, so the grade waits for one: pressing
  // Good on a card never attempted is not a solve.
  use <- bool.guard(m.blitz != None, model.NotGrading)
  case problem_kind(m, ref) {
    // Quizzes and boards grade themselves on submit.
    QuizProblem | BoardProblem -> model.NotGrading
    CheckableProblem ->
      case model.first_encounter(m, ref) {
        True -> model.AwaitingGrade
        False -> model.NotGrading
      }
    RevealOnlyProblem -> model.AwaitingGrade
  }
}

pub type ProblemKind {
  CheckableProblem
  QuizProblem
  BoardProblem
  RevealOnlyProblem
}

/// `problem.kind` refined by what this browser and this sitting can actually
/// do: a check it cannot run grades like a reveal-only card.
/// `problem.kind` refined by what this browser and this sitting can actually
/// do: a check it cannot run grades like a reveal-only card.
pub fn problem_kind(m: Model, ref: ProblemRef) -> ProblemKind {
  case problems.find(ref.category, ref.subcategory, ref.title) {
    Ok(found) ->
      case problem.kind(found) {
        problem.QuizDrill -> QuizProblem
        // Without this arm a board would fall through to RevealOnlyProblem
        // and open with the four self-grade buttons on top of a drill that
        // grades itself.
        problem.BoardDrill -> BoardProblem
        problem.CodeDrill ->
          case found.check {
            // A read-and-run card (Check present, graded: False) is gradeable
            // from the moment it opens, like a reveal-only one -- and so is a
            // check this browser cannot run (Elixir, signed out).
            Some(check) ->
              case check.graded && model.run_available(m, found.language) {
                True -> CheckableProblem
                False -> RevealOnlyProblem
              }
            None -> RevealOnlyProblem
          }
      }
    Error(Nil) -> RevealOnlyProblem
  }
}

/// Persist the settings that belong to this browser rather than the account.
///
/// Written whole every time, so every caller must pass a model.model that already
/// holds the change it wants saved.
/// A solve is clean when nothing was given away: no solution shown, no code
/// slice, no whole pseudocode, and no step opened for its hint or its why.
///
/// The step *titles* do not count, because the rail lists them from the moment
/// the problem opens and nobody chose to see them. That is the difference
/// between this and the review log's `revealed` flag, which only the code
/// counts toward: `clean` is "solved it from nothing", and turning over a
/// step's why is not nothing.
pub fn answer_given_away(m: Model) -> Bool {
  case current_problem(m) {
    Ok(current) ->
      model.answer_revealed(m, current.approach) || walk.any_layer_shown(m.walk)
    Error(Nil) -> False
  }
}

/// Starts a sitting on the given list of problems.
pub fn open_first(m: Model, queue: List(ProblemRef)) -> Model {
  case queue {
    [] -> m
    [first, ..] ->
      Model(
        ..model.open_problem_view(m, first),
        route: model.DrillRoute,
        selected: queue,
        problem_index: 0,
        current_iteration: 1,
        // A study rep starts from the stub: retyping from memory is the whole
        // product. A manual sitting restores a draft only if one survived --
        // grading deletes it, so what comes back is work left unfinished.
        draft: case m.studying {
          True -> starter_for(first)
          False -> draft_for(m, first)
        },
        run: model.RunIdle,
        grading: initial_grading(m, first),
        opened_at_ms: browser.now_ms(),
        exam_answers: [],
        sitting: [],
        choice: None,
        graded: False,
      )
  }
}

/// A drill with no harness has nothing to run, so it is gradeable the moment
/// it opens. One with a harness waits for a result.
/// What the grade bar starts as when a problem opens.
///
/// Gradeable from the first moment when either there is nothing to run (a
/// reveal-only drill is a flashcard proper) or this is the problem's first
/// encounter — the learning step, where you reveal, study, and self-grade like
/// flipping a card. Otherwise a run is required before grading.
pub fn reset_to_menu(m: Model) -> Model {
  Model(
    ..m,
    route: model.MenuRoute,
    problem_index: 0,
    current_iteration: 1,
    draft: "",
    revealed_solution: None,
    nudge_shown: False,
    whole_thing_shown: False,
    walk: walk.fresh_walk(),
    walk_code_seen: False,
    run: model.RunIdle,
    choice: None,
    graded: False,
  )
}

/// Questions per sitting, spread flat across the sections rather than in
/// proportion to how many questions each one has. Equal resolution per section
/// is the point: a section sampled twice cannot tell you anything about
/// whether you know it.
/// Ends a sitting, returning to wherever it started from.
///
/// A scheduled sitting also clears the selection: the study queue was never
/// something the user picked, and leaving it behind would make the next manual
/// drill drag along ten problems they never chose. A manual selection is
/// theirs and survives.
pub fn reset_home(m: Model) -> Model {
  Model(
    ..reset_to_menu(m),
    route: case m.studying {
      True -> model.StudyRoute
      False -> model.MenuRoute
    },
    selected: case m.studying {
      True -> []
      False -> m.selected
    },
    studying: False,
    recall: False,
    blitz: None,
    grading: model.NotGrading,
    undo: None,
  )
}

/// Which of the queued cards a Blitz may draw from: anything this browser
/// can actually run against the clock. Concept cards have no code, and a
/// guest cannot run the server-side languages, so neither can pass.
/// Problems into a named queue, and cards for the ones without. The list
/// is saved whole; the cards go up as one batch, as the queue screen's
/// bulk add does.
pub fn advance(m: Model) -> #(Model, Effect(Msg)) {
  // Before anything else: `m` still points at the problem whose run may be
  // in flight, which is the only moment its language can be resolved.
  let #(m, abandoned) = abandon_run(m)
  let #(next, fx) = advance_inner(m)
  // The grade button just pressed is still under the next problem's prompt
  // page; focused, it would take the Enter meant to start coding.
  #(next, effect.batch([abandoned, fx, run_effect(browser.blur_active)]))
}

pub fn advance_inner(m: Model) -> #(Model, Effect(Msg)) {
  // Round-robin: walk the whole selection, then come back around for the
  // next pass. Drilling one problem N times in a row before moving on is
  // the thing this deliberately avoids.
  let #(index, iteration) = case m.problem_index + 1 < list.length(m.selected) {
    True -> #(m.problem_index + 1, m.current_iteration)
    False -> #(0, m.current_iteration + 1)
  }

  case iteration > m.iteration_count, m.exam_answers {
    // An exam ends in the report rather than an alert — the score is the
    // entire reason the sitting happened.
    True, [_, ..] -> #(
      // `reset_home` clears `studying`, but the report still needs to know
      // where the sitting began so its back button returns there.
      Model(..reset_home(m), route: model.ReportRoute, studying: m.studying),
      effect.none(),
    )
    // A drill sitting earns a report too. `reset_home` clears `studying`, so
    // like the exam arm this puts it back for the sake of the back button.
    True, [] -> #(
      Model(
        ..reset_home(m),
        route: model.SummaryRoute,
        studying: m.studying,
        recall: m.recall,
        blitz: m.blitz,
        sitting: m.sitting,
        undo: m.undo,
      ),
      effect.none(),
    )
    False, _ -> {
      let advanced =
        Model(
          ..m,
          current_iteration: iteration,
          problem_index: index,
          revealed_solution: None,
          slot: model.NoPane,
          run: model.RunIdle,
          grading: model.NotGrading,
          opened_at_ms: browser.now_ms(),
          choice: None,
          graded: False,
        )
      // Retyping is the drill, so a repeat pass starts from the stub. The
      // first time a problem comes up in a manual sitting, a draft is
      // restored if one survived: grading deletes it, so only work you left
      // without grading ever comes back.
      let advanced = case model.current_ref(advanced) {
        Ok(ref) ->
          Model(
            ..model.open_problem_view(advanced, ref),
            draft: case iteration == 1 && !m.studying {
              True -> draft_for(advanced, ref)
              False -> starter_for(ref)
            },
            grading: initial_grading(m, ref),
          )
        Error(Nil) -> Model(..advanced, draft: "")
      }
      case m.recall {
        True -> #(advanced, effect.none())
        False -> with_prefetch(#(advanced, effect.none()))
      }
    }
  }
}

/// Ends a sitting, returning to wherever it started from.
///
/// A scheduled sitting also clears the selection: the study queue was never
/// something the user picked, and leaving it behind would make the next manual
/// drill drag along ten problems they never chose. A manual selection is
/// theirs and survives.
pub fn abandon_run(m: Model) -> #(Model, Effect(Msg)) {
  case m.run, current_language(m) {
    // Nothing to restart for a server-side run; its late answer is ignored
    // by the id guard.
    model.Running(_, _), Ok(language) ->
      case runner.is_remote(language) {
        True -> #(Model(..m, run: model.RunIdle), effect.none())
        False -> #(
          Model(
            ..m,
            run: model.RunIdle,
            runtimes: model.assoc_put(
              m.runtimes,
              language,
              model.RuntimeLoading,
            ),
          ),
          runner.restart(language),
        )
      }
    model.Running(_, _), Error(Nil) -> #(
      Model(..m, run: model.RunIdle),
      effect.none(),
    )
    _, _ -> #(m, effect.none())
  }
}

/// Marks rows whose queue change is in flight, so a second click cannot race
/// the first. Cleared wholesale when the response lands: the requests are
/// bulk and sequential from one user, so there is never a second one to keep.
pub fn pending(m: Model, refs: List(ProblemRef)) -> Model {
  Model(..m, queue_pending: list.append(refs, m.queue_pending))
}

/// Enter a track. With `starter`, twenty easy problems are queued in it so
/// the first sitting is one click away rather than a trip to the queue screen.
///
/// Choosing a model.track is a device preference, so it is saved here: a reload
/// should land where you were, not back on the switcher.
/// The first twenty Easy problems of one model.track, in catalogue order, skipping
/// any already queued. Catalogue order is the topic curriculum, not a
/// difficulty ramp -- its first twenty include Trapping Rain Water -- so the
/// starter set filters by rating first and only falls back to plain catalogue
/// order for a model.track with no ratings (System Design).
pub fn starter_refs(m: Model, in_track: String) -> List(ProblemRef) {
  let unqueued =
    problems.refs_in(in_track)
    |> list.filter(fn(ref) { !model.is_queued(m, ref) })
  let easy =
    list.filter(unqueued, fn(ref) {
      problems.difficulty_of(ref) == Some(problem.Easy)
    })
  case easy {
    [] -> list.take(unqueued, starter_size)
    _ -> list.take(easy, starter_size)
  }
}

/// Folds one card into the store, unless it belongs to another track.
///
/// `m.cards` is the *active model.track's* cards, so a response that arrives after
/// the user has switched must not be folded in: a review recorded in Python
/// answering while the Go model.track is open would otherwise leave a Python card
/// sitting in the Go screens. Free and total, so every fold site can use it.
pub fn fold_card(
  m: Model,
  cards: dict.Dict(ProblemRef, wire.CardState),
  card: wire.CardState,
) -> dict.Dict(ProblemRef, wire.CardState) {
  // The empty string means *no model.track chosen yet* -- a browser with nothing in
  // it -- not "a model.track that matches nothing". Filtering on it would drop the
  // very first card anyone queued and leave the study screen empty forever.
  case m.active_track == "" || track.of_ref(card.problem) == m.active_track {
    True -> dict.insert(cards, card.problem, card)
    False -> cards
  }
}

/// Move the rail's focus, clamped to the steps this problem actually has. A
/// problem with no walkthrough has none, and the focus stays at zero.
pub const starter_size = 20

pub fn start_local_run(
  m: Model,
  language: String,
  solution: String,
  harness: String,
) -> #(Model, Effect(Msg)) {
  let id = m.next_run_id
  let previous = case m.run {
    Ran(_, stdout) -> stdout
    _ -> ""
  }
  #(
    Model(..m, run: Running(id, previous), next_run_id: id + 1),
    runner.run(language, id, solution, harness),
  )
}

/// Run the tour lesson in the editor if the compiler is ready; otherwise do
/// nothing, and `RunnerReady` will call back here when it is.
pub fn run_tour_lesson(m: Model) -> #(Model, Effect(Msg)) {
  case m.route, m.tour_page, model.runtime_for(m, "gleam") {
    TourRoute, TourLesson(_), RuntimeReady ->
      start_local_run(m, "gleam", m.tour_draft, tour.harness)
    _, _, _ -> #(m, effect.none())
  }
}

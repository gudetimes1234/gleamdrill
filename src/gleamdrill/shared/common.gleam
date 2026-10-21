//// What the shared state's handlers have in common: the run engine's local
//// runs and prefetch, preferences, the card fold, the upgrade prompt, and
//// the small effect wrappers.

import gleam/dict
import gleam/list
import gleam/option.{Some}
import gleamdrill/content/problem.{type ProblemRef}
import gleamdrill/content/problems
import gleamdrill/domain/track
import gleamdrill/model.{
  type Model, Account, Guest, Model, PromptDismissed, Ran, Running,
}

import gleamdrill/msg.{type Msg}
import gleamdrill/platform/browser
import gleamdrill/runner
import gleamdrill/store
import gleamdrill/store/remote.{type ApiError}
import lustre/effect.{type Effect}
import wire

pub fn run_effect(action: fn() -> Nil) -> Effect(Msg) {
  use _dispatch <- effect.from
  action()
}

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

/// The token for the current session, or "" when signed out. Callers that need
/// one are only reachable from behind the auth gate, so the empty case is a
/// belt-and-braces default rather than a real path.
pub fn token(m: Model) -> String {
  case m.mode {
    Account(token) -> token
    Guest -> ""
  }
}

/// Persist the settings that belong to this browser rather than the account.
///
/// Written whole every time, so every caller must pass a model that already
/// holds the change it wants saved.
pub fn save_preferences(m: Model) -> Effect(Msg) {
  store.save_device_preferences(m)
}

/// Starts loading one language's runtime unless it is loaded or loading. A
/// failed load gets one fresh chance per open; without this the only
/// recovery was a page reload.
pub fn prefetch(m: Model, language: String) -> #(Model, Effect(Msg)) {
  let loading =
    Model(
      ..m,
      runtimes: model.assoc_put(m.runtimes, language, model.RuntimeLoading),
    )
  case model.runtime_for(m, language) {
    model.RuntimeNotLoaded -> #(loading, runner.ensure(language, runner_msg))
    model.RuntimeFailed(_) -> #(loading, runner.restart(language, runner_msg))
    _ -> #(m, effect.none())
  }
}

pub fn guest_has_progress() -> Bool {
  store.guest_has_data()
}

/// The first twenty Easy problems of one track, in catalogue order, skipping
/// any already queued. Catalogue order is the topic curriculum, not a
/// difficulty ramp -- its first twenty include Trapping Rain Water -- so the
/// starter set filters by rating first and only falls back to plain catalogue
/// order for a track with no ratings (System Design).
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
/// `m.cards` is the *active track's* cards, so a response that arrives after
/// the user has switched must not be folded in: a review recorded in Python
/// answering while the Go track is open would otherwise leave a Python card
/// sitting in the Go screens. Free and total, so every fold site can use it.
pub fn fold_card(
  m: Model,
  cards: dict.Dict(ProblemRef, wire.CardState),
  card: wire.CardState,
) -> dict.Dict(ProblemRef, wire.CardState) {
  // The empty string means *no track chosen yet* -- a browser with nothing in
  // it -- not "a track that matches nothing". Filtering on it would drop the
  // very first card anyone queued and leave the study screen empty forever.
  case m.active_track == "" || track.of_ref(card.problem) == m.active_track {
    True -> dict.insert(cards, card.problem, card)
    False -> cards
  }
}

pub const starter_size = 20

/// Post one run to a local runtime that is known to be ready. The previous
/// run's output is carried into the Running state so the pane can keep
/// showing it, dimmed, until the new result lands.
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
    Model(
      ..m,
      run: Running(id, previous),
      next_run_id: id + 1,
      run_language: language,
    ),
    runner.run(language, id, solution, harness, runner_msg),
  )
}

/// Raises the stronger upgrade prompt once a guest has enough at stake for
/// the warning to mean something. Escalating with stake is honest; nagging
/// from review one is noise.
///
/// A prompt already dismissed stays dismissed -- `store.upgrade_prompt_state` reads the
/// persisted flag, so it does not reappear on the next reload.
pub fn escalate(m: Model) -> model.UpgradePrompt {
  case m.mode, m.upgrade_prompt {
    Guest, PromptDismissed -> PromptDismissed
    Guest, _ -> store.upgrade_prompt_state(m.account)
    _, current -> current
  }
}

/// A runtime's report as the controller's message.
pub fn runner_msg(event: runner.Event) -> Msg {
  case event {
    runner.Ready(language) -> msg.RunnerReady(language)
    runner.Failed(language, message) -> msg.RunnerFailed(language, message)
    runner.Finished(id, outcome, stdout) -> msg.RunFinished(id, outcome, stdout)
    runner.TimedOut(id) -> msg.RunTimedOut(id)
    runner.LoadTimedOut(language) -> msg.RuntimeLoadTimedOut(language)
  }
}

/// A save failed. Said as a notice; for a guest a failed write means the
/// browser's storage is full, the one warning that does not go away.
pub fn write_failed(m: Model, failure: ApiError) -> Model {
  Model(
    ..m,
    storage_full: m.mode == Guest || m.storage_full,
    notice: Some(remote.error_message(failure)),
  )
}

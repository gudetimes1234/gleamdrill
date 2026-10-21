//// The run engine: one run in flight app-wide, the runtime each language
//// needs, server-side runs, timeouts and restarts.
////
//// A page asks for a run (`RunLocal`, `RunRemote`) and reads `run` for the
//// result; what a result means for grading is the sitting's business, told
//// to it by the app once the engine has taken the answer in.

import gleam/list
import gleam/option.{None, Some}
import gleamdrill/model.{
  type Model, Account, CaseResult, Cases, Errored, Guest, Model, Ran, RunError,
  RunIdle, Running, RuntimeFailed, RuntimeLoading, RuntimeReady, TimedOut,
}
import gleamdrill/msg.{type Msg, RemoteRunFinished}
import gleamdrill/runner
import gleamdrill/shared/common
import gleamdrill/store
import gleamdrill/store/remote.{type ApiError}
import lustre/effect.{type Effect}
import wire

pub fn retry_runtime(m: Model, language: String) -> #(Model, Effect(Msg)) {
  #(
    Model(..m, runtimes: model.assoc_put(m.runtimes, language, RuntimeLoading)),
    runner.restart(language, common.runner_msg),
  )
}

pub fn runner_ready(m: Model, language: String) -> #(Model, Effect(Msg)) {
  #(
    Model(..m, runtimes: model.assoc_put(m.runtimes, language, RuntimeReady)),
    effect.none(),
  )
}

pub fn runner_failed(
  m: Model,
  language: String,
  message: String,
) -> #(Model, Effect(Msg)) {
  #(
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
}

/// A worker's verdict. Stale ids are ignored: the run they belong to was
/// abandoned or replaced.
pub fn finished(
  m: Model,
  id: Int,
  outcome: model.RunOutcome,
  stdout: String,
) -> #(Model, Effect(Msg)) {
  case m.run {
    Running(current, _) if current == id -> #(
      Model(..m, run: Ran(outcome, stdout)),
      effect.none(),
    )
    _ -> #(m, effect.none())
  }
}

/// An expired session surfaces as a state reload, not a run verdict: the
/// reply goes back through `dispatch` as the `StateLoaded` failure every
/// other request produces.
pub fn remote_finished(
  m: Model,
  id: Int,
  result: Result(wire.RunResult, ApiError),
  dispatch: fn(Model, Msg) -> #(Model, Effect(Msg)),
) -> #(Model, Effect(Msg)) {
  case m.run, result {
    Running(current, _), Error(remote.Unauthorised) if current == id ->
      dispatch(
        Model(..m, run: RunIdle),
        msg.StateLoaded(Error(remote.Unauthorised)),
      )
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
      finished(m, id, outcome, stdout)
    }
    Running(current, _), Error(failure) if current == id -> #(
      Model(..m, run: RunIdle, notice: Some(remote.error_message(failure))),
      effect.none(),
    )
    _, _ -> #(m, effect.none())
  }
}

/// A run that never answered. The worker cannot be interrupted, only
/// replaced; a server-side run has no worker, and the server has already
/// killed it.
pub fn timed_out(m: Model, id: Int) -> #(Model, Effect(Msg)) {
  case m.run {
    Running(current, _) if current == id -> {
      let timed_out = Model(..m, run: Ran(TimedOut, ""))
      case runner.is_remote(m.run_language) {
        True -> #(timed_out, effect.none())
        False -> replace_worker(timed_out, m.run_language)
      }
    }
    _ -> #(m, effect.none())
  }
}

pub fn runtime_load_timed_out(
  m: Model,
  language: String,
) -> #(Model, Effect(Msg)) {
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

/// A run posted to the server, with its own timeout armed. Only an account
/// can run server-side languages; a guest is turned away before this.
pub fn start_remote(
  m: Model,
  language: String,
  code: String,
  harness: String,
) -> #(Model, Effect(Msg)) {
  case m.mode {
    Guest -> #(m, effect.none())
    Account(token) -> {
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
        effect.batch([
          store.post_run(
            token,
            wire.RunRequest(language, code, harness),
            RemoteRunFinished(id, _),
          ),
          runner.arm_remote_timeout(id, common.runner_msg),
        ]),
      )
    }
  }
}

/// Stops the run in flight. A local worker is replaced so the next run does
/// not queue behind it; a server-side run's late answer is ignored by the id
/// guard.
pub fn abandon(m: Model, language: String) -> #(Model, Effect(Msg)) {
  case m.run {
    Running(_, _) ->
      case runner.is_remote(language) {
        True -> #(Model(..m, run: RunIdle), effect.none())
        False -> replace_worker(Model(..m, run: RunIdle), language)
      }
    _ -> #(m, effect.none())
  }
}

fn replace_worker(m: Model, language: String) -> #(Model, Effect(Msg)) {
  #(
    Model(..m, runtimes: model.assoc_put(m.runtimes, language, RuntimeLoading)),
    runner.restart(language, common.runner_msg),
  )
}

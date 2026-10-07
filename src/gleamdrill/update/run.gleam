//// Running an attempt: local workers, server-side runs, the runtime
//// lifecycle, timeouts and the offline cache.

import gleam/list
import gleam/option.{None, Some}
import gleam/string
import gleamdrill/api
import gleamdrill/browser
import gleamdrill/model.{
  type Model, Account, AwaitingGrade, CaseResult, Cases, DrillRoute, Errored,
  Guest, Model, Ran, RunError, RunIdle, Running, RuntimeFailed, RuntimeLoading,
  RuntimeNotLoaded, RuntimeReady, TimedOut, TourRoute,
}
import gleamdrill/msg.{type Msg, CacheWarmed, RemoteRunFinished}
import gleamdrill/remote.{type ApiError}
import gleamdrill/runner
import gleamdrill/update/common
import lustre/effect.{type Effect}
import wire

pub fn warm_cache(m: Model) -> #(Model, Effect(Msg)) {
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
}

pub fn cache_warmed(
  m: Model,
  ok: Bool,
  done: Int,
  total: Int,
  finished: Bool,
) -> #(Model, Effect(Msg)) {
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
    True, False -> #(Model(..m, warming: Some(#(done, total))), effect.none())
  }
}

pub fn retry_runtime(m: Model, language: String) -> #(Model, Effect(Msg)) {
  #(
    Model(..m, runtimes: model.assoc_put(m.runtimes, language, RuntimeLoading)),
    runner.restart(language),
  )
}

pub fn runner_ready(m: Model, language: String) -> #(Model, Effect(Msg)) {
  {
    let m =
      Model(..m, runtimes: model.assoc_put(m.runtimes, language, RuntimeReady))
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

pub fn finished(
  m: Model,
  id: Int,
  outcome: model.RunOutcome,
  stdout: String,
) -> #(Model, Effect(Msg)) {
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
}

pub fn remote_finished(
  m: Model,
  id: Int,
  result: Result(wire.RunResult, ApiError),
) -> #(Model, Effect(Msg)) {
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
      finished(m, id, outcome, stdout)
    }
    Running(current, _), Error(failure) if current == id -> #(
      Model(..m, run: RunIdle, notice: Some(remote.error_message(failure))),
      effect.none(),
    )
    _, _ -> #(m, effect.none())
  }
}

pub fn timed_out(m: Model, id: Int) -> #(Model, Effect(Msg)) {
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

/// A run the button or keyboard asked for, once the runtime is ready: posted
/// to the server for a remote language, spawned in a worker otherwise.
/// A run of either kind, with every reason it cannot start said out loud:
/// the button is disabled in those states, but `r`, `t` and Ctrl+Enter
/// land here too and silence reads as a broken key.
pub fn request(m: Model, kind: model.RunKind) -> #(Model, Effect(Msg)) {
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

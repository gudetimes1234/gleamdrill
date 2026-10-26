//// Runs each drill's best reference solution through the terminal's
//// runners, to show the harnesses written for the browser hold on the real
//// toolchains. `gleam run -m runners_check -- python [limit] [starters]`:
//// with `starters`, each drill's starter stub instead, every one of which
//// must fail, to show a failure is caught.

import argv
import gleam/int
import gleam/io
import gleam/javascript/promise.{type Promise}
import gleam/list
import gleam/option.{None, Some}
import gleam/result
import gleamdrill/content/problem.{type Problem}
import gleamdrill/content/problems
import gleamdrill/model
import gleamdrill_tui/run

@external(javascript, "./runners_check_ffi.mjs", "exit")
fn exit(code: Int) -> Nil

pub fn main() -> Promise(Nil) {
  let #(language, limit, starters) = case argv.load().arguments {
    [name, limit, "starters", ..] -> #(
      name,
      int.parse(limit) |> result.unwrap(1000),
      True,
    )
    [name, limit, ..] -> #(name, int.parse(limit) |> result.unwrap(1000), False)
    [name] -> #(name, 1000, False)
    [] -> #("python", 1000, False)
  }
  let drills =
    problems.all()
    |> list.flat_map(fn(category) { category.subcategories })
    |> list.flat_map(fn(sub) { sub.problems })
    |> list.filter(fn(p: Problem) {
      problem.language_slug(p.language) == language && option.is_some(p.check)
    })
    |> list.take(limit)
  use failures <- promise.map(check_all(drills, starters, 0))
  io.println(
    int.to_string(list.length(drills))
    <> " "
    <> language
    <> " drills run, "
    <> int.to_string(failures)
    <> " failures",
  )
  case failures {
    0 -> Nil
    _ -> exit(1)
  }
}

fn check_all(
  drills: List(Problem),
  starters: Bool,
  failures: Int,
) -> Promise(Int) {
  case drills {
    [] -> promise.resolve(failures)
    [p, ..rest] -> {
      let assert Some(check) = p.check
      let assert Ok(best) = list.last(p.solutions)
      use state <- promise.await(run.run(
        p.language,
        None,
        best.code,
        check.harness,
      ))
      let ok = model.run_passed(state)
      case ok {
        True -> Nil
        False if starters -> io.println("PASSED ITS STARTER " <> p.title)
        False -> io.println("FAIL " <> p.title <> ": " <> describe(state))
      }
      check_all(rest, starters, case ok {
        True -> failures
        False -> failures + 1
      })
    }
  }
}

fn describe(state: model.RunState) -> String {
  case state {
    model.Ran(model.Cases(cases), _) ->
      cases
      |> list.filter(fn(c) { !c.passed })
      |> list.map(fn(c) {
        c.label <> " expected " <> c.expected <> " got " <> c.actual
      })
      |> list.first
      |> result.unwrap("no cases")
    model.Ran(model.Errored(error), _) -> error.phase <> ": " <> error.message
    model.Ran(model.TimedOut, _) -> "timed out"
    _ -> "never ran"
  }
}

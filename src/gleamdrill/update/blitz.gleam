//// Blitz and the exam: timed sittings over a sampled pool, the chooser,
//// the per-card deadline, and the exam's one-pass sampling.

import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleamdrill/browser
import gleamdrill/local
import gleamdrill/model.{
  type Model, DrillRoute, MenuRoute, Model, NoPane, RunIdle, StudyRoute,
}
import gleamdrill/msg.{type Msg, ExamSampled}
import gleamdrill/problem.{type ProblemRef}
import gleamdrill/problems
import gleamdrill/queue
import gleamdrill/store
import gleamdrill/update/common
import gleamdrill/walk
import lustre/effect.{type Effect}

pub fn start_exam(m: Model) -> #(Model, Effect(Msg)) {
  #(m, effect.from(fn(dispatch) { dispatch(ExamSampled(sample_exam())) }))
}

pub fn exam_sampled(m: Model, refs: List(ProblemRef)) -> #(Model, Effect(Msg)) {
  case refs {
    [] -> #(m, effect.none())
    _ -> #(
      Model(
        ..m,
        route: DrillRoute,
        selected: refs,
        problem_index: 0,
        // The exam is reachable from both the study screen and the menu,
          // and finishing it should hand you back to whichever you came
          // from rather than always to the menu.
          studying: m.route == StudyRoute,
        // An exam is one pass over the questions; repeating it inside the
        // sitting would score the same question twice.
        iteration_count: 1,
        current_iteration: 1,
        exam_answers: [],
        sitting: [],
        choice: None,
        graded: False,
        revealed_solution: None,
        nudge_shown: False,
        whole_thing_shown: False,
        walk: walk.fresh_walk(),
        walk_code_seen: False,
        slot: NoPane,
        run: RunIdle,
        draft: "",
      ),
      effect.none(),
    )
  }
}

pub fn exit_report(m: Model) -> #(Model, Effect(Msg)) {
  #(
    Model(
      ..m,
      route: case m.studying {
        True -> StudyRoute
        False -> MenuRoute
      },
      studying: False,
      recall: False,
      undo: None,
    ),
    effect.none(),
  )
}

pub fn toggle_chooser(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, blitz_chooser: !m.blitz_chooser), effect.none())
}

pub fn start(m: Model, count: Int, per_card_ms: Int) -> #(Model, Effect(Msg)) {
  case blitz_pool(m) {
    [] -> #(
      Model(
        ..m,
        blitz_chooser: False,
        notice: Some(
          "Nothing to blitz: queue some problems this browser can run.",
        ),
      ),
      effect.none(),
    )
    pool -> {
      let picked = sample(pool, count)
      common.with_prefetch(#(
        Model(
          ..common.open_first(
            Model(
              ..m,
              studying: False,
              recall: False,
              blitz_chooser: False,
              blitz: Some(model.Blitz(
                per_card_ms:,
                deadline_ms: browser.now_ms() + per_card_ms,
                results: [],
                expired_flash: False,
              )),
            ),
            picked,
          ),
          iteration_count: 1,
        ),
        effect.none(),
      ))
    }
  }
}

pub fn expired(m: Model) -> #(Model, Effect(Msg)) {
  case m.blitz, model.current_ref(m) {
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
      let #(next, fx) =
        common.advance(
          Model(
            ..m,
            drafts: local.drop_draft(m.drafts, ref),
            blitz: Some(
              model.Blitz(
                ..blitz,
                results: [expired, ..blitz.results],
                expired_flash: True,
              ),
            ),
          ),
        )
      let fx = effect.batch([store.delete_draft(m, ref), fx])
      // The flash clears on the next common.tick; the deadline restarts with
      // the card. An ended Blitz keeps its results for the summary.
      #(
        case next.route, next.blitz {
          DrillRoute, Some(b) ->
            Model(
              ..next,
              blitz: Some(
                model.Blitz(..b, deadline_ms: browser.now_ms() + b.per_card_ms),
              ),
            )
          _, _ -> next
        },
        effect.batch([fx, common.tick()]),
      )
    }
    _, _ -> #(m, common.tick())
  }
}

/// Every card in the active queue that a Blitz can time: a problem with a
/// harness, in a language this browser can run.
fn blitz_pool(m: Model) -> List(ProblemRef) {
  queue.scope(m)
  |> list.filter(fn(ref) {
    case problems.find(ref.category, ref.subcategory, ref.title) {
      Ok(current) ->
        current.quiz == None
        && current.check != None
        && model.run_available(m, current.language)
      Error(Nil) -> False
    }
  })
}

/// `count` refs drawn without replacement, in a random order. Fewer if
/// the pool is smaller.
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

/// Take an equal slice of each section, shuffled, then shuffle the result so
/// the questions do not arrive grouped by section. Sections thinner than the
/// slice contribute everything they have, so the exam is smaller than
/// `exam_size` while the pool is still being written.
fn sample_exam() -> List(ProblemRef) {
  let pool = problems.quiz_pool()
  let per_section = case list.length(pool) {
    0 -> 0
    sections -> int.max(1, exam_size / sections)
  }
  pool
  |> list.flat_map(fn(entry) { list.take(shuffle(entry.1), per_section) })
  |> shuffle
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

const exam_size = 40

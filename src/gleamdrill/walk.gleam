//// The step rail's walkthrough: which step has focus, which layers are
//// turned over, and what the approach ladder offers each rung. Pure state
//// and lookups -- `model` holds a WalkState and imports this module, so
//// nothing here may look back at the model.

import gleam/dict.{type Dict}
import gleam/int
import gleam/list
import gleam/option.{type Option}
import gleam/result
import gleamdrill/problem

/// Which scheduler knob a settings input is editing. One message with a field
/// tag rather than four near-identical variants, because every one of them is
/// the same parse-clamp-save.
/// One answered problem in this sitting.
///
/// `pressed` is what the user chose and what was scheduled. The summary still
/// reads the resulting interval from `Model.cards` rather than recomputing it,
/// so the number shown is the one the store actually produced.
/// The step rail's state.
///
/// `focus` is the step the keyboard is on, not how far a walkthrough has got:
/// every step's title is listed from the moment the problem opens, and moving
/// the focus reveals nothing. `shown` is which of each step's three layers
/// have been turned over -- a dict rather than one step's flags, because every
/// step is on screen at once and any number of them can be open.
pub type WalkState {
  WalkState(focus: Int, shown: Dict(Int, StepLayers))
}

/// Which of one step's three layers are turned over. The hint and the why are
/// free; the code slice is a piece of the pseudocode and is logged as a reveal.
pub type StepLayers {
  StepLayers(hint: Bool, why: Bool, code: Bool)
}

pub const no_layers = StepLayers(hint: False, why: False, code: False)

pub fn fresh_walk() -> WalkState {
  WalkState(focus: 0, shown: dict.new())
}

/// What is turned over on one step. A step nobody has touched has nothing.
pub fn layers_at(state: WalkState, index: Int) -> StepLayers {
  dict.get(state.shown, index) |> result.unwrap(no_layers)
}

/// Turn over one layer of the focused step. Idempotent: a layer already shown
/// stays shown, so a repeated key is not a way to un-reveal a code slice.
pub fn reveal_layer(state: WalkState, layer: Layer) -> WalkState {
  let open = layers_at(state, state.focus)
  let open = case layer {
    HintLayer -> StepLayers(..open, hint: True)
    WhyLayer -> StepLayers(..open, why: True)
    CodeLayer -> StepLayers(..open, code: True)
  }
  WalkState(..state, shown: dict.insert(state.shown, state.focus, open))
}

pub type Layer {
  HintLayer
  WhyLayer
  CodeLayer
}

/// Whether any step has had any of its layers turned over. Feeds the "clean
/// solve" count, which is stricter than the log's `revealed` flag: a hint is
/// not an answer, but a solve that needed one was not from nothing.
pub fn any_layer_shown(state: WalkState) -> Bool {
  dict.values(state.shown)
  |> list.any(fn(open) { open != no_layers })
}

/// Move the rail's focus, clamped to the steps that exist. Revealing nothing
/// is the point: the titles were always visible, so walking them is free.
pub fn focus_step(state: WalkState, index: Int, total: Int) -> WalkState {
  WalkState(
    ..state,
    focus: int.clamp(index, min: 0, max: int.max(total - 1, 0)),
  )
}

/// The plan rung's steps, if the ladder has one in walkthrough form.
pub fn walk_steps(
  stages: List(problem.ApproachStage),
) -> List(problem.WalkStep) {
  list.find_map(stages, fn(stage) {
    case stage {
      problem.Walk(steps) -> Ok(steps)
      _ -> Error(Nil)
    }
  })
  |> result.unwrap([])
}

/// The ladder's nudge, if it has one. The rail unfolds it in place rather
/// than counting rungs, so this is a lookup and not an index.
pub fn nudge_text(stages: List(problem.ApproachStage)) -> Option(String) {
  list.find_map(stages, fn(stage) {
    case stage {
      problem.Nudge(text) -> Ok(text)
      _ -> Error(Nil)
    }
  })
  |> option.from_result
}

/// The whole plan written out, in this drill's language -- or the shared
/// fallback where that language has none of its own yet. `None` when the
/// ladder has no such rung, or when neither is written.
pub fn whole_thing(
  stages: List(problem.ApproachStage),
  language: problem.Language,
) -> Option(String) {
  list.find_map(stages, fn(stage) {
    case stage {
      problem.Pseudocode(slices) ->
        case problem.slice_for(slices, language) {
          "" -> Error(Nil)
          code -> Ok(code)
        }
      _ -> Error(Nil)
    }
  })
  |> option.from_result
}

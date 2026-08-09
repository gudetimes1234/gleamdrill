import algodrill/model.{
  type Model, type Msg, type ProblemRef, DrillRoute, ExitConfirmed, Model, ProblemRef, UserChangedIterations, UserClickedBreadcrumb,
  UserClickedCategory, UserClickedClearSelection, UserClickedExitDrill,
  UserClickedNext, UserClickedSelectAll, UserClickedStartDrill,
  UserClickedSubcategory, UserPressedTab, UserToggledAnswer, UserToggledProblem,
  UserTypedDraft,
}
import algodrill/problems
import algodrill/view/menu
import gleam/int
import gleam/list
import gleam/option.{None, Some}
import lustre
import lustre/effect.{type Effect}
import lustre/element.{type Element}
import lustre/element/html

pub fn main() {
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
  Nil
}

fn init(_flags) -> #(Model, Effect(Msg)) {
  #(model.default(), effect.none())
}

fn update(model: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  case msg {
    UserClickedCategory(name) -> #(
      Model(..model, selected_category: Some(name), selected_subcategory: None),
      effect.none(),
    )

    UserClickedSubcategory(name) -> #(
      Model(..model, selected_subcategory: Some(name)),
      effect.none(),
    )

    UserClickedBreadcrumb(level) ->
      case level {
        0 -> #(
          Model(..model, selected_category: None, selected_subcategory: None),
          effect.none(),
        )
        _ -> #(Model(..model, selected_subcategory: None), effect.none())
      }

    UserToggledProblem(ref) -> #(
      Model(..model, selected: toggle_selection(model.selected, ref)),
      effect.none(),
    )

    UserClickedSelectAll ->
      case model.selected_category, model.selected_subcategory {
        Some(cat), Some(sub) -> {
          let refs =
            problems.problems_in(cat, sub)
            |> list.map(fn(p) { ProblemRef(cat, sub, p.title) })
            |> list.filter(fn(ref) { !list.contains(model.selected, ref) })
          #(
            Model(..model, selected: list.append(model.selected, refs)),
            effect.none(),
          )
        }
        _, _ -> #(model, effect.none())
      }

    UserClickedClearSelection -> #(
      Model(..model, selected: []),
      effect.none(),
    )

    UserChangedIterations(raw) -> {
      let count = case int.parse(raw) {
        Ok(value) if value > 0 -> value
        _ -> 1
      }
      #(Model(..model, iteration_count: count), effect.none())
    }

    UserClickedStartDrill ->
      case model.selected {
        [] -> #(model, effect.none())
        _ -> #(
          Model(
            ..model,
            route: DrillRoute,
            problem_index: 0,
            current_iteration: 1,
            draft: "",
            answer_revealed: False,
          ),
          effect.none(),
        )
      }

    // Drill messages wired in the drill-view step.
    UserClickedExitDrill -> #(model, effect.none())
    ExitConfirmed(_) -> #(model, effect.none())
    UserToggledAnswer -> #(model, effect.none())
    UserClickedNext -> #(model, effect.none())
    UserTypedDraft(text) -> #(Model(..model, draft: text), effect.none())
    UserPressedTab(_, _, _) -> #(model, effect.none())
  }
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

fn view(model: Model) -> Element(Msg) {
  case model.route, model.selected {
    DrillRoute, [_, ..] -> view_drill_stub(model)
    _, _ -> menu.view(model)
  }
}

fn view_drill_stub(model: Model) -> Element(Msg) {
  html.div([], [
    html.text(
      "Drill: " <> int.to_string(list.length(model.selected)) <> " problems",
    ),
  ])
}

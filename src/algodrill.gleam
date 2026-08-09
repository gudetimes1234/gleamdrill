import algodrill/browser
import algodrill/model.{
  type Model, type Msg, type ProblemRef, DrillRoute, ExitConfirmed, MenuRoute,
  Model, ProblemRef, UserChangedIterations, UserClickedBreadcrumb,
  UserClickedCategory, UserClickedClearSelection, UserClickedExitDrill,
  UserClickedNext, UserClickedSelectAll, UserClickedStartDrill,
  UserClickedSubcategory, UserPressedTab, UserToggledAnswer, UserToggledProblem,
  UserTypedDraft,
}
import algodrill/problems
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
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
  Nil
}

fn init(_flags) -> #(Model, Effect(Msg)) {
  #(storage.load(), effect.none())
}

fn update(model: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  let #(new_model, fx) = handle(model, msg)
  case should_persist(msg) {
    True -> #(new_model, effect.batch([storage.save(new_model), fx]))
    False -> #(new_model, fx)
  }
}

/// Mirrors the legacy app: state is written to localStorage after every
/// mutation of persisted fields. Draft text and answer reveal are not saved.
fn should_persist(msg: Msg) -> Bool {
  case msg {
    UserTypedDraft(_) | UserPressedTab(_, _, _) | UserToggledAnswer -> False
    UserClickedExitDrill | ExitConfirmed(False) -> False
    _ -> True
  }
}

fn handle(model: Model, msg: Msg) -> #(Model, Effect(Msg)) {
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

    UserClickedClearSelection -> #(Model(..model, selected: []), effect.none())

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

    UserClickedExitDrill -> #(
      model,
      effect.from(fn(dispatch) {
        dispatch(
          ExitConfirmed(browser.confirm(
            "Exit the drill? Your typed code will be lost.",
          )),
        )
      }),
    )

    ExitConfirmed(True) -> #(reset_to_menu(model), effect.none())
    ExitConfirmed(False) -> #(model, effect.none())

    UserToggledAnswer -> #(
      Model(..model, answer_revealed: !model.answer_revealed),
      effect.none(),
    )

    UserClickedNext -> {
      let #(iteration, index) = case
        model.current_iteration < model.iteration_count
      {
        True -> #(model.current_iteration + 1, model.problem_index)
        False -> #(1, model.problem_index + 1)
      }
      case index >= list.length(model.selected) {
        True -> #(
          reset_to_menu(model),
          effect.from(fn(_dispatch) { browser.alert("Drill complete.") }),
        )
        False -> #(
          Model(
            ..model,
            current_iteration: iteration,
            problem_index: index,
            draft: "",
            answer_revealed: False,
          ),
          effect.none(),
        )
      }
    }

    UserTypedDraft(text) -> #(Model(..model, draft: text), effect.none())

    UserPressedTab(value, start, end) -> #(
      Model(..model, draft: browser.splice_tab(value, start, end)),
      effect.before_paint(fn(_dispatch, _root) {
        browser.set_selection("codeEditor", start + 4)
      }),
    )
  }
}

fn reset_to_menu(model: Model) -> Model {
  Model(
    ..model,
    route: MenuRoute,
    problem_index: 0,
    current_iteration: 1,
    draft: "",
    answer_revealed: False,
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

fn view(model: Model) -> Element(Msg) {
  case model.route {
    DrillRoute ->
      case drill.view(model) {
        Ok(el) -> el
        Error(Nil) -> menu.view(model)
      }
    MenuRoute -> menu.view(model)
  }
}

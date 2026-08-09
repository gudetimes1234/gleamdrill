import algodrill/model.{
  type Model, type Msg, type ProblemRef, type Route, DrillRoute, MenuRoute,
  Model, ProblemRef,
}
import algodrill/problems
import gleam/dynamic/decode.{type Decoder}
import gleam/json
import gleam/list
import gleam/option.{type Option, None}
import gleam/result
import lustre/effect.{type Effect}
import plinth/javascript/storage

const key_v2 = "algoDrillState.v2"

const key_v1 = "algoDrillState"

pub fn load() -> Model {
  case storage.local() {
    Ok(local) ->
      case storage.get_item(local, key_v2) {
        Ok(raw) ->
          json.parse(raw, v2_decoder())
          |> result.map(validate)
          |> result.unwrap(model.default())
        Error(Nil) -> migrate_v1(local)
      }
    Error(Nil) -> model.default()
  }
}

pub fn save(model: Model) -> Effect(Msg) {
  effect.from(fn(_dispatch) {
    case storage.local() {
      Ok(local) -> {
        let _ = storage.set_item(local, key_v2, encode(model))
        Nil
      }
      Error(Nil) -> Nil
    }
  })
}

fn migrate_v1(local: storage.Storage) -> Model {
  case storage.get_item(local, key_v1) {
    Ok(raw) ->
      json.parse(raw, v1_decoder())
      |> result.map(validate)
      |> result.unwrap(model.default())
    Error(Nil) -> model.default()
  }
}

/// Drop refs to problems that no longer exist and reset any drill position
/// that points past the end of the selection.
fn validate(loaded: Model) -> Model {
  let selected =
    list.filter(loaded.selected, fn(ref: ProblemRef) {
      case problems.find(ref.category, ref.subcategory, ref.title) {
        Ok(_) -> True
        Error(Nil) -> False
      }
    })
  let loaded = Model(..loaded, selected: selected)
  case
    loaded.route == DrillRoute && loaded.problem_index >= list.length(selected)
  {
    True ->
      Model(..loaded, route: MenuRoute, problem_index: 0, current_iteration: 1)
    False -> loaded
  }
}

fn encode(model: Model) -> String {
  json.object([
    #(
      "route",
      json.string(case model.route {
        MenuRoute -> "menu"
        DrillRoute -> "drill"
      }),
    ),
    #("selectedCategory", json.nullable(model.selected_category, json.string)),
    #(
      "selectedSubcategory",
      json.nullable(model.selected_subcategory, json.string),
    ),
    #(
      "selected",
      json.array(model.selected, fn(ref: ProblemRef) {
        json.object([
          #("category", json.string(ref.category)),
          #("subcategory", json.string(ref.subcategory)),
          #("title", json.string(ref.title)),
        ])
      }),
    ),
    #("problemIndex", json.int(model.problem_index)),
    #("iterationCount", json.int(model.iteration_count)),
    #("currentIteration", json.int(model.current_iteration)),
  ])
  |> json.to_string
}

fn v2_decoder() -> Decoder(Model) {
  use route <- decode.field("route", route_decoder())
  use category <- optional_string_field("selectedCategory")
  use subcategory <- optional_string_field("selectedSubcategory")
  use selected <- decode.field("selected", decode.list(ref_decoder()))
  use problem_index <- decode.field("problemIndex", decode.int)
  use iteration_count <- decode.field("iterationCount", decode.int)
  use current_iteration <- decode.field("currentIteration", decode.int)
  decode.success(Model(
    route: route,
    selected_category: category,
    selected_subcategory: subcategory,
    selected: selected,
    problem_index: problem_index,
    iteration_count: iteration_count,
    current_iteration: current_iteration,
    draft: "",
    answer_revealed: False,
  ))
}

fn ref_decoder() -> Decoder(ProblemRef) {
  use category <- decode.field("category", decode.string)
  use subcategory <- decode.field("subcategory", decode.string)
  use title <- decode.field("title", decode.string)
  decode.success(ProblemRef(category, subcategory, title))
}

fn route_decoder() -> Decoder(Route) {
  use raw <- decode.then(decode.string)
  case raw {
    "drill" -> decode.success(DrillRoute)
    _ -> decode.success(MenuRoute)
  }
}

/// The legacy app stored full problem copies; only the reference fields are
/// carried over.
fn v1_decoder() -> Decoder(Model) {
  use route <- decode.field("currentView", route_decoder())
  use category <- optional_string_field("selectedCategory")
  use subcategory <- optional_string_field("selectedSubcategory")
  use selected <- decode.field("selectedProblems", decode.list(ref_decoder()))
  use problem_index <- decode.field("currentProblemIndex", decode.int)
  use iteration_count <- decode.field("iterationCount", decode.int)
  use current_iteration <- decode.field("currentIteration", decode.int)
  decode.success(Model(
    route: route,
    selected_category: category,
    selected_subcategory: subcategory,
    selected: selected,
    problem_index: problem_index,
    iteration_count: iteration_count,
    current_iteration: current_iteration,
    draft: "",
    answer_revealed: False,
  ))
}

fn optional_string_field(
  name: String,
  next: fn(Option(String)) -> Decoder(a),
) -> Decoder(a) {
  decode.optional_field(name, None, decode.optional(decode.string), next)
}

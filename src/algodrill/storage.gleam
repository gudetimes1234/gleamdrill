import algodrill/model.{
  type Attempt, type Model, type Msg, type ProblemRef, type Route, DrillRoute,
  Failed, MenuRoute, Model, Passed, ProblemRef,
}
import algodrill/problems
import gleam/dynamic/decode.{type Decoder}
import gleam/json
import gleam/list
import gleam/option.{type Option, None}
import gleam/result
import lustre/effect.{type Effect}
import plinth/javascript/storage

const key_v3 = "algoDrillState.v3"

const key_v2 = "algoDrillState.v2"

const key_v1 = "algoDrillState"

pub fn load() -> Model {
  case storage.local() {
    Ok(local) ->
      case storage.get_item(local, key_v3) {
        Ok(raw) ->
          json.parse(raw, v3_decoder())
          |> result.map(validate)
          |> result.unwrap(model.default())
        Error(Nil) -> migrate_v2(local)
      }
    Error(Nil) -> model.default()
  }
}

pub fn save(model: Model) -> Effect(Msg) {
  effect.from(fn(_dispatch) {
    case storage.local() {
      Ok(local) -> {
        let _ = storage.set_item(local, key_v3, encode(model))
        Nil
      }
      Error(Nil) -> Nil
    }
  })
}

fn migrate_v2(local: storage.Storage) -> Model {
  case storage.get_item(local, key_v2) {
    Ok(raw) ->
      json.parse(raw, v2_decoder())
      |> result.map(validate)
      |> result.unwrap(model.default())
    Error(Nil) -> migrate_v1(local)
  }
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

/// Drop refs to problems that no longer exist — in the selection, drafts and
/// attempts — and reset any drill position that points past the selection.
fn validate(loaded: Model) -> Model {
  let exists = fn(ref: ProblemRef) {
    case problems.find(ref.category, ref.subcategory, ref.title) {
      Ok(_) -> True
      Error(Nil) -> False
    }
  }
  let selected = list.filter(loaded.selected, exists)
  let loaded =
    Model(
      ..loaded,
      selected: selected,
      drafts: list.filter(loaded.drafts, fn(pair) { exists(pair.0) }),
      attempts: list.filter(loaded.attempts, fn(pair) { exists(pair.0) }),
    )
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
    #("selected", json.array(model.selected, encode_ref)),
    #("problemIndex", json.int(model.problem_index)),
    #("iterationCount", json.int(model.iteration_count)),
    #("currentIteration", json.int(model.current_iteration)),
    #(
      "drafts",
      json.array(model.drafts, fn(pair) {
        ref_object(pair.0, [#("draft", json.string(pair.1))])
      }),
    ),
    #(
      "attempts",
      json.array(model.attempts, fn(pair) {
        ref_object(pair.0, [
          #(
            "result",
            json.string(case pair.1 {
              Passed -> "passed"
              Failed -> "failed"
            }),
          ),
        ])
      }),
    ),
    #("search", json.string(model.search)),
    #("editorKeymap", json.string(model.editor_keymap)),
  ])
  |> json.to_string
}

fn encode_ref(ref: ProblemRef) -> json.Json {
  ref_object(ref, [])
}

fn ref_object(ref: ProblemRef, extra: List(#(String, json.Json))) -> json.Json {
  json.object([
    #("category", json.string(ref.category)),
    #("subcategory", json.string(ref.subcategory)),
    #("title", json.string(ref.title)),
    ..extra
  ])
}

fn v3_decoder() -> Decoder(Model) {
  use base <- shared_fields(route_field: "route", selected_field: "selected")
  use drafts <- decode.optional_field(
    "drafts",
    [],
    decode.list(ref_extra_decoder("draft", decode.string)),
  )
  use attempts <- decode.optional_field(
    "attempts",
    [],
    decode.list(ref_extra_decoder("result", attempt_decoder())),
  )
  use search <- decode.optional_field("search", "", decode.string)
  use editor_keymap <- decode.optional_field(
    "editorKeymap",
    "default",
    decode.string,
  )
  decode.success(
    Model(
      ..base,
      drafts: drafts,
      attempts: attempts,
      search: search,
      editor_keymap: editor_keymap,
    ),
  )
}

fn v2_decoder() -> Decoder(Model) {
  use base <- shared_fields(route_field: "route", selected_field: "selected")
  decode.success(base)
}

/// The legacy vanilla-JS app stored full problem copies; only the reference
/// fields carry over.
fn v1_decoder() -> Decoder(Model) {
  use base <- shared_fields(
    route_field: "currentView",
    selected_field: "selectedProblems",
  )
  decode.success(base)
}

/// Fields shared by every schema version, layered onto a default model.
fn shared_fields(
  route_field route_field: String,
  selected_field selected_field: String,
  next next: fn(Model) -> Decoder(Model),
) -> Decoder(Model) {
  use route <- decode.field(route_field, route_decoder())
  use category <- optional_string_field("selectedCategory")
  use subcategory <- optional_string_field("selectedSubcategory")
  use selected <- decode.field(selected_field, decode.list(ref_decoder()))
  use problem_index <- index_field(route_field)
  use iteration_count <- decode.field("iterationCount", decode.int)
  use current_iteration <- decode.field("currentIteration", decode.int)
  next(
    Model(
      ..model.default(),
      route: route,
      selected_category: category,
      selected_subcategory: subcategory,
      selected: selected,
      problem_index: problem_index,
      iteration_count: iteration_count,
      current_iteration: current_iteration,
    ),
  )
}

/// v1 called it currentProblemIndex; v2 and v3 call it problemIndex.
fn index_field(
  route_field: String,
  next: fn(Int) -> Decoder(Model),
) -> Decoder(Model) {
  case route_field {
    "currentView" -> decode.field("currentProblemIndex", decode.int, next)
    _ -> decode.field("problemIndex", decode.int, next)
  }
}

fn ref_decoder() -> Decoder(ProblemRef) {
  use category <- decode.field("category", decode.string)
  use subcategory <- decode.field("subcategory", decode.string)
  use title <- decode.field("title", decode.string)
  decode.success(ProblemRef(category, subcategory, title))
}

fn ref_extra_decoder(
  field: String,
  value_decoder: Decoder(a),
) -> Decoder(#(ProblemRef, a)) {
  use ref <- decode.then(ref_decoder())
  use value <- decode.field(field, value_decoder)
  decode.success(#(ref, value))
}

fn attempt_decoder() -> Decoder(Attempt) {
  use raw <- decode.then(decode.string)
  case raw {
    "passed" -> decode.success(Passed)
    _ -> decode.success(Failed)
  }
}

fn route_decoder() -> Decoder(Route) {
  use raw <- decode.then(decode.string)
  case raw {
    "drill" -> decode.success(DrillRoute)
    _ -> decode.success(MenuRoute)
  }
}

fn optional_string_field(
  name: String,
  next: fn(Option(String)) -> Decoder(a),
) -> Decoder(a) {
  decode.optional_field(name, None, decode.optional(decode.string), next)
}

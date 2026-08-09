import algodrill/model.{
  type Model, type Msg, ProblemRef, UserChangedIterations,
  UserClickedBreadcrumb, UserClickedCategory, UserClickedClearSelection,
  UserClickedSelectAll, UserClickedStartDrill, UserClickedSubcategory,
  UserToggledProblem,
}
import algodrill/problem.{type Problem}
import algodrill/problems
import gleam/dynamic/decode
import gleam/int
import gleam/list
import gleam/option.{None, Some}
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/element/keyed
import lustre/event

pub fn view(model: Model) -> Element(Msg) {
  let listed_problems = case model.selected_category, model.selected_subcategory
  {
    Some(cat), Some(sub) -> problems.problems_in(cat, sub)
    _, _ -> []
  }

  html.div([attribute.class("menu-container")], [
    breadcrumbs(model),
    html.div([attribute.class("panes-container")], [
      category_pane(model),
      subcategory_pane(model),
      problem_pane(model, listed_problems),
    ]),
    html.div([attribute.class("iteration-control")], [
      html.label([attribute.for("iterations")], [
        html.text("Repetitions per problem"),
      ]),
      html.input([
        attribute.type_("number"),
        attribute.id("iterations"),
        attribute.min("1"),
        attribute.max("20"),
        attribute.value(int.to_string(model.iteration_count)),
        event.on_change(UserChangedIterations),
      ]),
      html.span([attribute.class("progress-text")], [
        html.text(int.to_string(list.length(model.selected)) <> " selected"),
      ]),
    ]),
    html.button(
      [
        attribute.id("startDrill"),
        attribute.class("btn-primary"),
        attribute.disabled(model.selected == []),
        event.on_click(UserClickedStartDrill),
      ],
      [html.text("Start drill")],
    ),
    html.text(" "),
    html.button(
      [
        attribute.id("selectAll"),
        attribute.class("btn-secondary"),
        attribute.disabled(listed_problems == []),
        event.on_click(UserClickedSelectAll),
      ],
      [html.text("Select all in subcategory")],
    ),
    html.text(" "),
    html.button(
      [
        attribute.id("clearSelection"),
        attribute.class("btn-secondary"),
        event.on_click(UserClickedClearSelection),
      ],
      [html.text("Clear selection")],
    ),
  ])
}

fn breadcrumbs(model: Model) -> Element(Msg) {
  let crumbs =
    ["Categories"]
    |> list.append(option.values([model.selected_category]))
    |> list.append(option.values([model.selected_subcategory]))
  let last = list.length(crumbs) - 1

  html.div(
    [attribute.class("breadcrumbs")],
    crumbs
      |> list.index_map(fn(crumb, i) {
        case i == last {
          True -> [
            html.span([attribute.class("breadcrumb")], [html.text(crumb)]),
          ]
          False -> [
            html.span(
              [
                attribute.class("breadcrumb clickable"),
                event.on_click(UserClickedBreadcrumb(i)),
              ],
              [html.text(crumb)],
            ),
            html.text(" "),
            html.span([attribute.class("breadcrumb")], [html.text("/")]),
            html.text(" "),
          ]
        }
      })
      |> list.flatten,
  )
}

fn category_pane(model: Model) -> Element(Msg) {
  pane(
    "Category",
    keyed.div(
      [attribute.class("pane-list")],
      list.map(problems.category_names(), fn(name) {
        #(
          name,
          pane_item(
            name,
            model.selected_category == Some(name),
            UserClickedCategory(name),
          ),
        )
      }),
    ),
  )
}

fn subcategory_pane(model: Model) -> Element(Msg) {
  let subcategories = case model.selected_category {
    Some(cat) -> problems.subcategory_names(cat)
    None -> []
  }
  pane("Subcategory", case subcategories {
    [] ->
      html.div([attribute.class("pane-list")], [
        html.div([attribute.class("pane-empty")], [
          html.text("Pick a category first"),
        ]),
      ])
    _ ->
      keyed.div(
        [attribute.class("pane-list")],
        list.map(subcategories, fn(name) {
          #(
            name,
            pane_item(
              name,
              model.selected_subcategory == Some(name),
              UserClickedSubcategory(name),
            ),
          )
        }),
      )
  })
}

fn problem_pane(model: Model, listed_problems: List(Problem)) -> Element(Msg) {
  pane("Problems", case listed_problems {
    [] ->
      html.div([attribute.class("pane-list")], [
        html.div([attribute.class("pane-empty")], [
          html.text("Pick a subcategory first"),
        ]),
      ])
    _ -> {
      let assert Some(cat) = model.selected_category
      let assert Some(sub) = model.selected_subcategory
      keyed.div(
        [attribute.class("pane-list")],
        list.map(listed_problems, fn(p: Problem) {
          let ref = ProblemRef(cat, sub, p.title)
          #(
            p.title,
            pane_item(
              p.title,
              list.contains(model.selected, ref),
              UserToggledProblem(ref),
            ),
          )
        }),
      )
    }
  })
}

fn pane(title: String, contents: Element(Msg)) -> Element(Msg) {
  html.div([attribute.class("pane")], [
    html.h3([], [html.text(title)]),
    contents,
  ])
}

fn pane_item(label: String, selected: Bool, msg: Msg) -> Element(Msg) {
  html.div(
    [
      attribute.classes([#("pane-item", True), #("selected", selected)]),
      attribute.tabindex(0),
      event.on_click(msg),
      on_activate_key(msg),
    ],
    [html.text(label)],
  )
}

fn on_activate_key(msg: Msg) -> attribute.Attribute(Msg) {
  event.advanced("keydown", {
    use key <- decode.field("key", decode.string)
    case key {
      "Enter" | " " ->
        decode.success(event.handler(
          dispatch: msg,
          prevent_default: True,
          stop_propagation: False,
        ))
      _ ->
        decode.failure(
          event.handler(
            dispatch: msg,
            prevent_default: False,
            stop_propagation: False,
          ),
          "key",
        )
    }
  })
}

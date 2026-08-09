import algodrill/model.{
  type Model, type Msg, type ProblemRef, Failed, Passed, ProblemRef,
  UserChangedIterations, UserClickedBreadcrumb, UserClickedCategory,
  UserClickedClearSelection, UserClickedSelectAll, UserClickedStartDrill,
  UserClickedSubcategory, UserSearched, UserToggledProblem,
}
import algodrill/problem.{type Problem}
import algodrill/problems
import gleam/dynamic/decode
import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleam/string
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/element/keyed
import lustre/event

pub fn view(m: Model) -> Element(Msg) {
  let listed_problems = case m.selected_category, m.selected_subcategory {
    Some(cat), Some(sub) -> problems.problems_in(cat, sub)
    _, _ -> []
  }

  html.div([attribute.class("menu-container")], [
    html.div([attribute.class("menu-top")], [
      html.h1([attribute.class("menu-title")], [html.text("Algo Drill")]),
      html.input([
        attribute.type_("search"),
        attribute.class("search"),
        attribute.placeholder("Search problems\u{2026}"),
        attribute.value(m.search),
        event.on_input(UserSearched),
      ]),
    ]),
    ..case string.trim(m.search) {
      "" -> [
        breadcrumbs(m),
        html.div([attribute.class("panes-container")], [
          category_pane(m),
          subcategory_pane(m),
          problem_pane(m, listed_problems),
        ]),
      ]
      query -> [search_results(m, query)]
    }
    |> list.append([
      chips(m),
      html.div([attribute.class("iteration-control")], [
        html.label([attribute.for("iterations")], [
          html.text("Repetitions per problem"),
        ]),
        html.input([
          attribute.type_("number"),
          attribute.id("iterations"),
          attribute.min("1"),
          attribute.max("20"),
          attribute.value(int.to_string(m.iteration_count)),
          event.on_change(UserChangedIterations),
        ]),
        html.span([attribute.class("progress-text")], [
          html.text(int.to_string(list.length(m.selected)) <> " selected"),
        ]),
      ]),
      html.div([attribute.class("menu-actions")], [
        html.button(
          [
            attribute.id("startDrill"),
            attribute.class("btn-primary"),
            attribute.disabled(m.selected == []),
            event.on_click(UserClickedStartDrill),
          ],
          [html.text("Start drill")],
        ),
        html.button(
          [
            attribute.id("selectAll"),
            attribute.class("btn-secondary"),
            attribute.disabled(listed_problems == []),
            event.on_click(UserClickedSelectAll),
          ],
          [html.text("Select all in subcategory")],
        ),
        html.button(
          [
            attribute.id("clearSelection"),
            attribute.class("btn-secondary"),
            event.on_click(UserClickedClearSelection),
          ],
          [html.text("Clear selection")],
        ),
      ]),
    ])
  ])
}

/// Flat list of every problem whose title matches, across all categories.
fn search_results(m: Model, query: String) -> Element(Msg) {
  let needle = string.lowercase(query)
  let hits =
    problems.all()
    |> list.flat_map(fn(category) {
      category.subcategories
      |> list.flat_map(fn(sub) {
        sub.problems
        |> list.filter_map(fn(p: Problem) {
          case string.contains(string.lowercase(p.title), needle) {
            True -> Ok(#(ProblemRef(category.name, sub.name, p.title), p))
            False -> Error(Nil)
          }
        })
      })
    })

  case hits {
    [] ->
      html.div([attribute.class("search-results")], [
        html.div([attribute.class("pane-empty")], [
          html.text("No problems match \u{201c}" <> query <> "\u{201d}"),
        ]),
      ])
    _ ->
      keyed.div(
        [attribute.class("search-results")],
        list.map(hits, fn(hit) {
          let #(ref, _) = hit
          #(ref.category <> "|" <> ref.subcategory <> "|" <> ref.title, {
            let selected = list.contains(m.selected, ref)
            html.div(
              [
                attribute.classes([
                  #("search-hit", True),
                  #("selected", selected),
                ]),
                attribute.tabindex(0),
                event.on_click(UserToggledProblem(ref)),
                on_activate_key(UserToggledProblem(ref)),
              ],
              [
                html.span([attribute.class("search-hit-title")], [
                  html.text(ref.title),
                ]),
                status_badge(m, ref),
                html.span([attribute.class("search-hit-context")], [
                  html.text(ref.category <> " \u{203a} " <> ref.subcategory),
                ]),
              ],
            )
          })
        }),
      )
  }
}

fn chips(m: Model) -> Element(Msg) {
  case m.selected {
    [] -> element.none()
    refs ->
      keyed.div(
        [attribute.class("chips")],
        list.map(refs, fn(ref) {
          #(ref.category <> "|" <> ref.subcategory <> "|" <> ref.title, {
            html.span([attribute.class("chip")], [
              html.text(ref.title <> " "),
              html.button(
                [
                  attribute.class("chip-remove"),
                  attribute.attribute("aria-label", "Remove " <> ref.title),
                  event.on_click(UserToggledProblem(ref)),
                ],
                [html.text("\u{d7}")],
              ),
            ])
          })
        }),
      )
  }
}

fn breadcrumbs(m: Model) -> Element(Msg) {
  let crumbs =
    ["Categories"]
    |> list.append(option.values([m.selected_category]))
    |> list.append(option.values([m.selected_subcategory]))
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

fn category_pane(m: Model) -> Element(Msg) {
  pane(
    "Category",
    keyed.div(
      [attribute.class("pane-list")],
      list.map(problems.category_names(), fn(name) {
        #(
          name,
          nav_item(
            name,
            m.selected_category == Some(name),
            UserClickedCategory(name),
          ),
        )
      }),
    ),
  )
}

fn subcategory_pane(m: Model) -> Element(Msg) {
  let subcategories = case m.selected_category {
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
            nav_item(
              name,
              m.selected_subcategory == Some(name),
              UserClickedSubcategory(name),
            ),
          )
        }),
      )
  })
}

fn problem_pane(m: Model, listed_problems: List(Problem)) -> Element(Msg) {
  pane("Problems", case listed_problems {
    [] ->
      html.div([attribute.class("pane-list")], [
        html.div([attribute.class("pane-empty")], [
          html.text("Pick a subcategory first"),
        ]),
      ])
    _ -> {
      let assert Some(cat) = m.selected_category
      let assert Some(sub) = m.selected_subcategory
      keyed.div(
        [attribute.class("pane-list")],
        list.map(listed_problems, fn(p: Problem) {
          let ref = ProblemRef(cat, sub, p.title)
          #(p.title, problem_item(m, ref))
        }),
      )
    }
  })
}

/// Navigation rows (category/subcategory): "current" highlights where you are.
fn nav_item(label: String, current: Bool, msg: Msg) -> Element(Msg) {
  html.div(
    [
      attribute.classes([#("pane-item", True), #("current", current)]),
      attribute.tabindex(0),
      event.on_click(msg),
      on_activate_key(msg),
    ],
    [html.text(label)],
  )
}

/// Problem rows: "selected" marks membership in the drill selection, plus a
/// pass/fail badge from previous runs.
fn problem_item(m: Model, ref: ProblemRef) -> Element(Msg) {
  html.div(
    [
      attribute.classes([
        #("pane-item", True),
        #("selected", list.contains(m.selected, ref)),
      ]),
      attribute.tabindex(0),
      event.on_click(UserToggledProblem(ref)),
      on_activate_key(UserToggledProblem(ref)),
    ],
    [html.text(ref.title), status_badge(m, ref)],
  )
}

fn status_badge(m: Model, ref: ProblemRef) -> Element(Msg) {
  case model.assoc_get(m.attempts, ref) {
    Ok(attempt) -> {
      let #(class, mark) = case attempt {
        Passed -> #("badge badge-passed", "\u{2713}")
        Failed -> #("badge badge-failed", "\u{2717}")
      }
      html.span([attribute.class(class)], [html.text(mark)])
    }
    Error(Nil) -> element.none()
  }
}

fn pane(title: String, contents: Element(Msg)) -> Element(Msg) {
  html.div([attribute.class("pane")], [
    html.h3([], [html.text(title)]),
    contents,
  ])
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

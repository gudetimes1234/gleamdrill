import gleam/dynamic/decode
import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleam/string
import gleamdrill/content/problem.{type Problem, type ProblemRef}
import gleamdrill/content/problems
import gleamdrill/domain/track
import gleamdrill/model as shared_model
import gleamdrill/page/browse/model.{
  type Model, type Pane, ProblemsPane, SelectedPane, SubcategoriesPane,
}
import gleamdrill/page/browse/msg.{
  type Msg, UserAddedSelectionToQueue, UserChangedIterations,
  UserClickedBreadcrumb, UserClickedClearSelection, UserClickedCompare,
  UserClickedSelectAll, UserClickedStartDrill, UserClickedStartExam,
  UserClickedSubcategory, UserSearched, UserToggledProblem, UserToggledSuspend,
}
import gleamdrill/shared.{type Shared}
import gleamdrill/ui/document.{type Document, Document}
import gleamdrill/view/brand
import gleamdrill/view/format
import gleamdrill/view/id
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/element/keyed
import lustre/event
import wire.{ProblemRef}

pub fn view(shared: Shared, page: Model) -> Document(Msg) {
  let listed_problems = case page.subcategory {
    Some(sub) -> problems.problems_in(shared.active_track, sub)
    None -> []
  }

  Document(
    class: "menu-container",
    header: document.Header(
      tag: document.Div,
      class: "menu-top",
      title_class: "menu-title",
      title: brand.wordmark(),
      extra: [
        html.input([
          attribute.type_("search"),
          attribute.class("search"),
          attribute.placeholder("Search problems\u{2026}"),
          attribute.value(page.search),
          event.on_input(UserSearched),
        ]),
      ],
      nav: False,
    ),
    storage_warning: False,
    lead: [],
    body: case string.trim(page.search) {
      "" -> [
        breadcrumbs(shared, page),
        html.div([attribute.class("panes-container")], [
          subcategory_pane(shared, page),
          problem_pane(shared, page, listed_problems),
          selected_pane(shared, page),
        ]),
      ]
      query -> [search_results(shared, page, query)]
    }
      |> list.append([
        html.div([attribute.class("iteration-control")], [
          html.label([attribute.for("iterations")], [
            html.text("Repetitions per problem"),
          ]),
          html.input([
            attribute.type_("number"),
            attribute.id("iterations"),
            attribute.min("1"),
            attribute.max("20"),
            attribute.value(int.to_string(shared.iteration_count)),
            event.on_change(UserChangedIterations),
          ]),
          html.span([attribute.class("progress-text")], [
            html.text(
              int.to_string(list.length(shared.selected)) <> " selected",
            ),
          ]),
        ]),
        html.div([attribute.class("menu-actions")], [
          html.button(
            [
              attribute.id("startDrill"),
              attribute.class("btn-primary"),
              attribute.disabled(shared.selected == []),
              event.on_click(UserClickedStartDrill),
            ],
            [html.text("Start drill")],
          ),
          // The selected solutions side by side; one alone is compared with
          // the rest of its topic.
          html.button(
            [
              attribute.id("compareSelected"),
              attribute.class("btn-secondary"),
              attribute.disabled(shared.selected == []),
              event.on_click(UserClickedCompare),
            ],
            [html.text("Compare")],
          ),
          add_to_queue(shared),
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
          // Ignores the selection on purpose: an exam samples its own questions
          // evenly across the sections, which is what makes the per-section
          // score comparable.
          html.button(
            [
              attribute.id("startExam"),
              attribute.class("btn-secondary"),
              attribute.disabled(exam_pool_size() == 0),
              event.on_click(UserClickedStartExam),
            ],
            [html.text("System design exam")],
          ),
        ]),
      ]),
  )
}

fn exam_pool_size() -> Int {
  problems.quiz_pool()
  |> list.fold(0, fn(total, entry) { total + list.length(entry.1) })
}

/// Flat list of every problem whose title matches, across all categories.
fn search_results(shared: Shared, page: Model, query: String) -> Element(Msg) {
  let hits = problems.search_refs(query)

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
        list.index_map(hits, fn(ref, index) {
          #(ref.category <> "|" <> ref.subcategory <> "|" <> ref.title, {
            let selected = list.contains(shared.selected, ref)
            let here =
              int.clamp(page.cursor.search, 0, list.length(hits) - 1) == index
            html.div(
              [
                attribute.classes([
                  #("search-hit", True),
                  #("selected", selected),
                  #("cursor", here),
                ]),
                attribute.id("hit-" <> int.to_string(index)),
                attribute.tabindex(0),
                event.on_click(UserToggledProblem(ref)),
                on_activate_key(UserToggledProblem(ref)),
              ],
              [
                html.span([attribute.class("search-hit-title")], [
                  html.text(ref.title),
                ]),
                format.difficulty_badge(problems.difficulty_of(ref)),
                status_badge(shared, ref),
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

/// The running selection as a pane of its own, not chips below the fold: what
/// you are about to drill deserves the same standing as what you are picking
/// from. Cross-language selections are normal here, so each row carries a
/// short language tag.
fn selected_pane(shared: Shared, page: Model) -> Element(Msg) {
  let length = list.length(shared.selected)
  pane("Selected", page.cursor.focus == SelectedPane, case shared.selected {
    [] ->
      html.div([attribute.class("pane-list")], [
        html.div([attribute.class("pane-empty")], [
          html.text("Nothing selected yet"),
        ]),
      ])
    refs ->
      keyed.div(
        [attribute.class("pane-list")],
        list.index_map(refs, fn(ref, index) {
          #(ref.category <> "|" <> ref.subcategory <> "|" <> ref.title, {
            html.div(
              [
                attribute.class("pane-item selected-item"),
                attribute.tabindex(0),
                event.on_click(UserToggledProblem(ref)),
                on_activate_key(UserToggledProblem(ref)),
                ..cursor_attributes(page, SelectedPane, index, length)
              ],
              [
                html.span([attribute.class("selected-title")], [
                  html.text(ref.title),
                ]),
                html.span([attribute.class("lang-tag")], [
                  html.text(track.tag(ref.category)),
                ]),
                html.span(
                  [
                    attribute.class("selected-remove"),
                    attribute.attribute("aria-label", "Remove " <> ref.title),
                  ],
                  [html.text("\u{d7}")],
                ),
              ],
            )
          })
        }),
      )
  })
}

fn breadcrumbs(shared: Shared, page: Model) -> Element(Msg) {
  let crumbs =
    [track.label(shared.active_track)]
    |> list.append(option.values([page.subcategory]))
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
                event.on_click(UserClickedBreadcrumb),
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

/// Topics, the first pane now. The track decides which catalogue these come
/// from, so there is no language to choose first.
fn subcategory_pane(shared: Shared, page: Model) -> Element(Msg) {
  let subcategories = problems.subcategory_names(shared.active_track)
  let length = list.length(subcategories)
  pane(
    "Subcategory",
    page.cursor.focus == SubcategoriesPane,
    case subcategories {
      [] ->
        html.div([attribute.class("pane-list")], [
          html.div([attribute.class("pane-empty")], [
            html.text("Pick a language first"),
          ]),
        ])
      _ ->
        keyed.div(
          [attribute.class("pane-list")],
          list.index_map(subcategories, fn(name, index) {
            #(
              name,
              nav_item(
                name,
                page.subcategory == Some(name),
                cursor_attributes(page, SubcategoriesPane, index, length),
                UserClickedSubcategory(name),
              ),
            )
          }),
        )
    },
  )
}

fn problem_pane(
  shared: Shared,
  page: Model,
  listed_problems: List(Problem),
) -> Element(Msg) {
  let length = list.length(listed_problems)
  pane("Problems", page.cursor.focus == ProblemsPane, case listed_problems {
    [] ->
      html.div([attribute.class("pane-list")], [
        html.div([attribute.class("pane-empty")], [
          html.text("Pick a subcategory first"),
        ]),
      ])
    _ -> {
      let cat = shared.active_track
      let assert Some(sub) = page.subcategory
      keyed.div(
        [attribute.class("pane-list")],
        list.index_map(listed_problems, fn(p: Problem, index) {
          let ref = ProblemRef(cat, sub, p.title)
          #(
            p.title,
            problem_item(
              shared,
              ref,
              cursor_attributes(page, ProblemsPane, index, length),
            ),
          )
        }),
      )
    }
  })
}

/// Navigation rows (category/subcategory): "current" highlights where you are.
fn nav_item(
  label: String,
  current: Bool,
  extra: List(attribute.Attribute(Msg)),
  msg: Msg,
) -> Element(Msg) {
  html.div(
    [
      attribute.classes([#("pane-item", True), #("current", current)]),
      attribute.tabindex(0),
      event.on_click(msg),
      on_activate_key(msg),
      ..extra
    ],
    [html.text(label)],
  )
}

/// Problem rows: "selected" marks membership in the drill selection, plus a
/// pass/fail badge from previous runs.
fn problem_item(
  shared: Shared,
  ref: ProblemRef,
  extra: List(attribute.Attribute(Msg)),
) -> Element(Msg) {
  html.div(
    [
      attribute.classes([
        #("pane-item", True),
        #("selected", list.contains(shared.selected, ref)),
      ]),
      attribute.tabindex(0),
      event.on_click(UserToggledProblem(ref)),
      on_activate_key(UserToggledProblem(ref)),
      ..extra
    ],
    [
      html.text(ref.title),
      format.difficulty_badge(problems.difficulty_of(ref)),
      status_badge(shared, ref),
      suspend_toggle(shared, ref),
    ],
  )
}

/// Park/resume for rows that have a card. stop_propagation: the row's own
/// click is selection, and suspending must not also toggle that.
fn suspend_toggle(shared: Shared, ref: ProblemRef) -> Element(Msg) {
  case shared_model.card_for(shared, ref) {
    None -> element.none()
    Some(state) ->
      html.button(
        [
          attribute.class("suspend-toggle"),
          attribute.title(case state.suspended {
            True -> "Resume scheduling"
            False -> "Pause scheduling"
          }),
          event.on_click(UserToggledSuspend(ref)) |> event.stop_propagation,
        ],
        [
          html.text(case state.suspended {
            True -> "\u{25b8}"
            False -> "\u{23f8}"
          }),
        ],
      )
  }
}

/// The badge reports where a problem sits in the schedule rather than a sticky
/// pass/fail. "Due" is the one that should pull the eye; a scheduled card shows
/// how far out it is, so the menu doubles as a forecast.
///
/// A problem with no card is left blank here rather than labelled "not queued":
/// this pane is for picking problems to drill by hand, which works whether or
/// not the scheduler knows about them. The queue screen is where that
/// distinction is the point, and it renders the label from the same function.
fn status_badge(shared: Shared, ref: ProblemRef) -> Element(Msg) {
  case shared_model.card_for(shared, ref) {
    None -> element.none()
    Some(state) -> {
      let #(class, label) = format.card_badge(Some(state), shared.now)
      html.span([attribute.class(class)], [html.text(label)])
    }
  }
}

fn pane(title: String, focused: Bool, contents: Element(Msg)) -> Element(Msg) {
  html.div([attribute.classes([#("pane", True), #("focused", focused)])], [
    html.h3([], [html.text(title)]),
    contents,
  ])
}

/// The keyboard cursor's row in one pane, clamped against the rendered list —
/// the same clamp the update side applies, so highlight and action agree.
fn cursor_row(page: Model, pane: Pane, length: Int) -> Int {
  let raw = case pane {
    SubcategoriesPane -> page.cursor.subcategory
    ProblemsPane -> page.cursor.problem
    SelectedPane -> page.cursor.selected
  }
  int.clamp(raw, 0, int.max(0, length - 1))
}

fn cursor_attributes(
  page: Model,
  pane: Pane,
  index: Int,
  length: Int,
) -> List(attribute.Attribute(Msg)) {
  let here =
    page.cursor.focus == pane && cursor_row(page, pane, length) == index
  [
    attribute.id(id.menu_row_id(pane, index)),
    attribute.classes([#("cursor", here)]),
  ]
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

/// The selection into a queue. A `<details>` menu rather than a select:
/// after the pick nothing needs resetting, the menu just closes.
fn add_to_queue(shared: Shared) -> Element(Msg) {
  case shared.selected {
    [] -> element.none()
    _ ->
      html.details([attribute.class("add-to-queue")], [
        html.summary([attribute.class("btn-secondary")], [
          html.text("Add to queue \u{25be}"),
        ]),
        html.div([attribute.class("add-to-queue-menu")], [
          html.button(
            [
              attribute.class("add-to-queue-option"),
              attribute.type_("button"),
              event.on_click(UserAddedSelectionToQueue(None)),
            ],
            [html.text("Everything")],
          ),
          ..list.map(shared.queues, fn(queue: wire.Queue) {
            html.button(
              [
                attribute.class("add-to-queue-option"),
                attribute.type_("button"),
                event.on_click(UserAddedSelectionToQueue(Some(queue.name))),
              ],
              [html.text(queue.name)],
            )
          })
        ]),
      ])
  }
}

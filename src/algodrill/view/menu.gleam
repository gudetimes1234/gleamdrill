import algodrill/model.{
  type Model, type Msg, UserChangedIterations, UserClickedBreadcrumb,
  UserClickedCategory, UserClickedClearSelection, UserClickedSelectAll,
  UserClickedStartDrill, UserClickedStartExam, UserClickedSubcategory,
  UserSearched, UserToggledProblem, UserToggledSuspend,
}
import algodrill/problem.{type Problem, type ProblemRef}
import algodrill/problems
import algodrill/view/format
import fsrs
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
import wire.{ProblemRef}

pub fn view(m: Model) -> Element(Msg) {
  let listed_problems = case m.selected_category, m.selected_subcategory {
    Some(cat), Some(sub) -> problems.problems_in(cat, sub)
    _, _ -> []
  }

  html.div([attribute.class("menu-container")], [
    html.div([attribute.class("menu-top")], [
      html.h1([attribute.class("menu-title")], [html.text("AlgoDrill")]),
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
          language_pane(m),
          subcategory_pane(m),
          problem_pane(m, listed_problems),
          selected_pane(m),
        ]),
      ]
      query -> [search_results(m, query)]
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
    ])
  ])
}

fn exam_pool_size() -> Int {
  problems.quiz_pool()
  |> list.fold(0, fn(total, entry) { total + list.length(entry.1) })
}

/// Flat list of every problem whose title matches, across all categories.
fn search_results(m: Model, query: String) -> Element(Msg) {
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
            let selected = list.contains(m.selected, ref)
            let here =
              int.clamp(m.nav.search, 0, list.length(hits) - 1) == index
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

/// The running selection as a pane of its own, not chips below the fold: what
/// you are about to drill deserves the same standing as what you are picking
/// from. Cross-language selections are normal here, so each row carries a
/// short language tag.
fn selected_pane(m: Model) -> Element(Msg) {
  let length = list.length(m.selected)
  pane("Selected", m.nav.focus == model.SelectedPane, case m.selected {
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
                ..cursor_attributes(m, model.SelectedPane, index, length)
              ],
              [
                html.span([attribute.class("selected-title")], [
                  html.text(ref.title),
                ]),
                html.span([attribute.class("lang-tag")], [
                  html.text(problems.language_tag(ref.category)),
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

fn breadcrumbs(m: Model) -> Element(Msg) {
  let crumbs =
    ["Languages"]
    |> list.append(
      option.values([m.selected_category]) |> list.map(problems.language_label),
    )
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

/// The first question is which language you are drilling in, so it is the
/// first pane. Each row opens its category — `selected_category` still stores
/// the real category name, so nothing downstream (cards, refs, the server)
/// changes. The day a language has a second collection, a Category pane
/// re-inserts itself here as a view-only change.
fn language_pane(m: Model) -> Element(Msg) {
  let entries = problems.language_entries()
  let length = list.length(entries)
  pane(
    "Language",
    m.nav.focus == model.LanguagesPane,
    keyed.div(
      [attribute.class("pane-list")],
      list.index_map(entries, fn(entry, index) {
        let #(label, category) = entry
        #(
          category,
          nav_item(
            label,
            m.selected_category == Some(category),
            cursor_attributes(m, model.LanguagesPane, index, length),
            UserClickedCategory(category),
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
  let length = list.length(subcategories)
  pane(
    "Subcategory",
    m.nav.focus == model.SubcategoriesPane,
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
                m.selected_subcategory == Some(name),
                cursor_attributes(m, model.SubcategoriesPane, index, length),
                UserClickedSubcategory(name),
              ),
            )
          }),
        )
    },
  )
}

fn problem_pane(m: Model, listed_problems: List(Problem)) -> Element(Msg) {
  let length = list.length(listed_problems)
  pane("Problems", m.nav.focus == model.ProblemsPane, case listed_problems {
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
        list.index_map(listed_problems, fn(p: Problem, index) {
          let ref = ProblemRef(cat, sub, p.title)
          #(
            p.title,
            problem_item(
              m,
              ref,
              cursor_attributes(m, model.ProblemsPane, index, length),
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
  m: Model,
  ref: ProblemRef,
  extra: List(attribute.Attribute(Msg)),
) -> Element(Msg) {
  html.div(
    [
      attribute.classes([
        #("pane-item", True),
        #("selected", list.contains(m.selected, ref)),
      ]),
      attribute.tabindex(0),
      event.on_click(UserToggledProblem(ref)),
      on_activate_key(UserToggledProblem(ref)),
      ..extra
    ],
    [html.text(ref.title), status_badge(m, ref), suspend_toggle(m, ref)],
  )
}

/// Park/resume for rows that have a card. stop_propagation: the row's own
/// click is selection, and suspending must not also toggle that.
fn suspend_toggle(m: Model, ref: ProblemRef) -> Element(Msg) {
  case model.card_for(m, ref) {
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

/// The badge now reports where a problem sits in the schedule rather than a
/// sticky pass/fail. "Due" is the one that should pull the eye; a scheduled
/// card shows how far out it is, so the menu doubles as a forecast.
fn status_badge(m: Model, ref: ProblemRef) -> Element(Msg) {
  case model.card_for(m, ref) {
    None -> element.none()
    Some(state) -> {
      let #(class, label) = case
        state.suspended,
        fsrs.is_due(state.card, m.now),
        state.card.state
      {
        // Parked: the schedule is on hold, whatever the dates say.
        True, _, _ -> #("badge badge-paused", "paused")
        False, True, _ -> #("badge badge-due", "due")
        False, False, fsrs.Learning(_) -> #("badge badge-learning", "learning")
        False, False, fsrs.Relearning(_) -> #(
          "badge badge-learning",
          "relearning",
        )
        False, False, fsrs.Review -> #(
          "badge badge-scheduled",
          format.interval(fsrs.interval_seconds(state.card, m.now)),
        )
      }
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
fn cursor_row(m: Model, pane: model.MenuPane, length: Int) -> Int {
  let raw = case pane {
    model.LanguagesPane -> m.nav.language
    model.SubcategoriesPane -> m.nav.subcategory
    model.ProblemsPane -> m.nav.problem
    model.SelectedPane -> m.nav.selected
  }
  int.clamp(raw, 0, int.max(0, length - 1))
}

fn cursor_attributes(
  m: Model,
  pane: model.MenuPane,
  index: Int,
  length: Int,
) -> List(attribute.Attribute(Msg)) {
  let here = m.nav.focus == pane && cursor_row(m, pane, length) == index
  [
    attribute.id(model.menu_row_id(pane, index)),
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

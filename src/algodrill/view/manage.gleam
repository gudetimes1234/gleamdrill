//// The queue manager: which problems the scheduler is allowed to serve.
////
//// Nothing enters the study queue on its own. This screen is where a problem
//// is put in or taken out, and queue membership is account state -- it
//// follows a signed-in user between devices, unlike the language chips on the
//// study screen, which are a mood dial for one browser.
////
//// The list is the whole catalogue, not just the queue, because the question
//// being asked here is "what should I be studying" and the answer needs the
//// problems you have *not* picked in front of you. It is grouped by topic,
//// and each topic's header queues that topic where you read it -- all of it,
//// or just its Easy problems. A language and a status narrow the list; the
//// bulk buttons act on exactly what is left, which is why the row list is
//// defined once in `algodrill/queue` and read by both.

import algodrill/api
import algodrill/model.{
  type Model, type Msg, GroupChange, UserAddedAllShown, UserChangedGroup,
  UserFilteredQueue, UserPickedQueueLanguage, UserRemovedAllShown,
  UserSearchedQueue, UserToggledQueued,
}
import algodrill/problem.{type ProblemRef}
import algodrill/problems
import algodrill/queue
import algodrill/view/banner
import algodrill/view/format
import algodrill/view/nav
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/element/keyed
import lustre/event

pub fn view(m: Model) -> Element(Msg) {
  let rows = queue.listed(m)
  let queued = list.length(queue.queued(m))

  // Straight from here to the first card: the queue screen is the second
  // screen a new user sees, and "go back, then press Study now" was the
  // longest stretch of the first run.
  let ready = list.length(queue.build(m))

  html.div([attribute.class("queue-screen")], [
    banner.storage_warning(m),
    nav.notices(m),
    html.header([attribute.class("queue-header")], [
      html.h1([attribute.class("queue-title")], [html.text("Study queue")]),
      html.span([attribute.class("queue-total")], [
        html.text(int.to_string(queued) <> " in queue"),
      ]),
      case ready {
        0 -> element.none()
        n ->
          html.button(
            [
              attribute.class("btn-primary queue-study-now"),
              event.on_click(model.UserClickedStudy),
            ],
            [html.text("Study now \u{00b7} " <> int.to_string(n))],
          )
      },
      nav.bar(m, model.QueueRoute),
    ]),
    html.p([attribute.class("queue-lede")], [
      html.text(
        "Only queued problems are scheduled. Adding one puts it in line to be "
        <> "introduced against your daily new limit; removing one takes it out "
        <> "entirely.",
      ),
    ]),
    controls(m),
    bulk_actions(m, rows),
    groups(m, rows),
  ])
}

/// Search, language and status: three controls, none of them saved. They
/// change what is on screen, never what the scheduler will do.
fn controls(m: Model) -> Element(Msg) {
  html.div([attribute.class("queue-controls")], [
    html.input([
      attribute.type_("search"),
      // The same class the browser's box uses, so `/` focuses this one too --
      // one binding, whichever screen you are on.
      attribute.class("search"),
      attribute.placeholder("Search problems\u{2026}"),
      attribute.value(m.queue_search),
      event.on_input(UserSearchedQueue),
    ]),
    html.label([attribute.class("queue-control")], [
      html.span([attribute.class("queue-control-label")], [
        html.text("Language"),
      ]),
      html.select(
        [
          attribute.class("queue-select queue-language"),
          event.on_change(UserPickedQueueLanguage),
        ],
        [
          option("", "All languages", m.queue_language == None),
          ..list.map(problems.language_options(), fn(entry) {
            option(entry.0, entry.1, m.queue_language == Some(entry.0))
          })
        ],
      ),
    ]),
    html.label([attribute.class("queue-control")], [
      html.span([attribute.class("queue-control-label")], [html.text("Show")]),
      html.select(
        [
          attribute.class("queue-select queue-status"),
          event.on_change(fn(slug) {
            UserFilteredQueue(model.queue_filter_from_slug(slug))
          }),
        ],
        list.map(model.queue_filters(), fn(filter) {
          option(
            model.queue_filter_slug(filter),
            model.queue_filter_label(filter),
            m.queue_status == filter,
          )
        }),
      ),
    ]),
  ])
}

fn option(value: String, label: String, picked: Bool) -> Element(Msg) {
  html.option([attribute.value(value), attribute.selected(picked)], label)
}

/// Bulk add and bulk remove, over exactly the rows on screen.
///
/// Each button says how many it would touch, because "Add all shown" over a
/// cleared search is 1200 problems and that has to be visible before it is
/// pressed rather than after. Removal counts only never-answered cards: a card
/// with review history cannot leave the queue, it can only be paused.
fn bulk_actions(m: Model, rows: List(ProblemRef)) -> Element(Msg) {
  let addable = list.count(rows, fn(ref) { !model.is_queued(m, ref) })
  let removable = list.count(rows, fn(ref) { model.is_new(m, ref) })

  html.div([attribute.class("queue-bulk")], [
    html.span([attribute.class("queue-shown")], [
      html.text(int.to_string(list.length(rows)) <> " shown"),
    ]),
    html.button(
      [
        attribute.class("queue-bulk-add"),
        attribute.disabled(addable == 0),
        event.on_click(UserAddedAllShown),
      ],
      [html.text("Add " <> int.to_string(addable) <> " to queue")],
    ),
    html.button(
      [
        attribute.class("queue-bulk-remove"),
        attribute.disabled(removable == 0),
        event.on_click(UserRemovedAllShown),
      ],
      [html.text("Remove " <> int.to_string(removable))],
    ),
  ])
}

/// The list, one section per topic. Rows keep their index in the flat list
/// so the keyboard cursor (which walks `queue.listed`) lands on the row it
/// thinks it is on.
fn groups(m: Model, rows: List(ProblemRef)) -> Element(Msg) {
  case rows {
    [] ->
      html.div([attribute.class("queue-empty")], [html.text("Nothing matches.")])
    _ -> {
      let length = list.length(rows)
      let #(_, sections) =
        list.map_fold(queue.grouped(m), 0, fn(offset, group) {
          let #(category, subcategory, members) = group
          let section = #(
            category <> "|" <> subcategory,
            group_section(m, category, subcategory, members, offset, length),
          )
          #(offset + list.length(members), section)
        })
      keyed.div([attribute.class("queue-list")], sections)
    }
  }
}

fn group_section(
  m: Model,
  category: String,
  subcategory: String,
  members: List(ProblemRef),
  offset: Int,
  length: Int,
) -> Element(Msg) {
  html.section([attribute.class("queue-group")], [
    group_head(m, category, subcategory, members),
    keyed.div(
      [attribute.class("queue-group-rows")],
      list.index_map(members, fn(ref: ProblemRef, index) {
        #(row_key(ref), row(m, ref, offset + index, length))
      }),
    ),
  ])
}

/// The topic's name, how much of it is queued, and the buttons that change
/// that. A button appears only when it would do something, so a fully queued
/// topic reads as done rather than as a row of disabled controls.
fn group_head(
  m: Model,
  category: String,
  subcategory: String,
  members: List(ProblemRef),
) -> Element(Msg) {
  let total = list.length(members)
  let queued = list.count(members, fn(ref) { model.is_queued(m, ref) })
  let addable = list.filter(members, fn(ref) { !model.is_queued(m, ref) })
  let easy =
    list.count(addable, fn(ref) {
      problems.difficulty_of(ref) == Some(problem.Easy)
    })
  let removable = list.count(members, fn(ref) { model.is_new(m, ref) })
  let change = fn(easy_only, add) {
    UserChangedGroup(GroupChange(category:, subcategory:, easy_only:, add:))
  }

  html.div([attribute.class("queue-group-head")], [
    html.span([attribute.class("queue-group-title")], [
      html.text(case m.queue_language {
        // With every language listed, the same topic repeats once per
        // language, so the header says which.
        None -> subcategory <> " \u{b7} " <> problems.language_label(category)
        Some(_) -> subcategory
      }),
    ]),
    html.span([attribute.class("queue-group-count")], [
      html.text(
        int.to_string(queued) <> "/" <> int.to_string(total) <> " queued",
      ),
    ]),
    html.span([attribute.class("queue-group-actions")], [
      case list.length(addable) {
        0 -> element.none()
        n ->
          html.button(
            [
              attribute.class("queue-action queue-group-add"),
              event.on_click(change(False, True)),
            ],
            [html.text("Add " <> int.to_string(n))],
          )
      },
      // Only when it differs from "Add all": a topic with nothing but Easy
      // left, or nothing Easy left, has no second choice to offer.
      case easy > 0 && easy < list.length(addable) {
        False -> element.none()
        True ->
          html.button(
            [
              attribute.class("queue-action queue-group-add-easy"),
              event.on_click(change(True, True)),
            ],
            [html.text("Add " <> int.to_string(easy) <> " easy")],
          )
      },
      case removable {
        0 -> element.none()
        n ->
          html.button(
            [
              attribute.class("queue-action queue-group-remove"),
              event.on_click(change(False, False)),
            ],
            [html.text("Remove " <> int.to_string(n))],
          )
      },
    ]),
  ])
}

fn row_key(ref: ProblemRef) -> String {
  ref.category <> "|" <> ref.subcategory <> "|" <> ref.title
}

fn row(m: Model, ref: ProblemRef, index: Int, length: Int) -> Element(Msg) {
  let state = model.card_for(m, ref)
  let queued = state != None
  let #(badge_class, badge_text) = format.card_badge(state, m.now)
  let busy = list.contains(m.queue_pending, ref)
  let here = int.clamp(m.nav.queue, 0, int.max(0, length - 1)) == index

  html.div(
    [
      attribute.id(model.queue_row_id(index)),
      attribute.classes([
        #("queue-row", True),
        #("queued", queued),
        #("cursor", here),
      ]),
    ],
    [
      // The group header already names the language when one is chosen.
      case m.queue_language {
        None ->
          html.span([attribute.class("lang-tag")], [
            html.text(problems.language_tag(ref.category)),
          ])
        Some(_) -> element.none()
      },
      html.span([attribute.class("queue-row-title")], [html.text(ref.title)]),
      format.difficulty_badge(problems.difficulty_of(ref)),
      html.span([attribute.class(badge_class)], [html.text(badge_text)]),
      action(ref, state, busy),
    ],
  )
}

/// One control per row, and which one depends on whether the card can leave.
///
/// A card that has been answered keeps its review log, so it is paused rather
/// than removed -- the log is the only thing here that cannot be rebuilt, and
/// deleting the card would take it with it. Saying that on the button is what
/// stops "Remove" from looking broken on exactly the cards you care most about.
fn action(
  ref: ProblemRef,
  state: Option(api.CardState),
  busy: Bool,
) -> Element(Msg) {
  let #(class, label, title) = case state {
    None -> #("queue-add", "Add", "Put this problem in the study queue")
    Some(card) ->
      case card.reps == 0, card.suspended {
        True, _ -> #(
          "queue-remove",
          "Remove",
          "Take this problem out of the study queue",
        )
        False, True -> #(
          "queue-resume",
          "Resume",
          "Resume scheduling this card",
        )
        False, False -> #(
          "queue-pause",
          "Pause",
          "Park this card. It keeps its review history, so it cannot be "
            <> "removed outright.",
        )
      }
  }
  html.button(
    [
      attribute.classes([#("queue-action", True), #(class, True)]),
      attribute.title(title),
      attribute.disabled(busy),
      event.on_click(UserToggledQueued(ref)),
    ],
    [html.text(label)],
  )
}

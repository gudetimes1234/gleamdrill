//// The queue manager: which problems the scheduler is allowed to serve.
////
//// Nothing enters the study queue on its own. This screen is where a problem
//// is put in or taken out, and queue membership is account state -- it
//// follows a signed-in user between devices, unlike the language chips on the
//// study screen, which are a mood dial for one browser.
////
//// The list is the whole catalogue, not just the queue, because the question
//// being asked here is "what should I be studying" and the answer needs the
//// problems you have *not* picked in front of you. The filters narrow it; the
//// bulk buttons act on exactly what the filters left, which is why the row
//// list is defined once in `algodrill/queue` and read by both.

import algodrill/api
import algodrill/model.{
  type Model, type Msg, UserAddedAllShown, UserFilteredQueue,
  UserPickedQueueDifficulty, UserPickedQueueLanguage, UserPickedQueueTopic,
  UserRemovedAllShown, UserSearchedQueue, UserToggledQueued,
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
    filters(m),
    bulk_actions(m, rows),
    table(m, rows),
  ])
}

/// Search, language, topic, difficulty and status. All five are a lens on the list and
/// none of them is saved: they change what is on screen, never what the
/// scheduler will do.
fn filters(m: Model) -> Element(Msg) {
  html.div([attribute.class("queue-filters")], [
    html.input([
      attribute.type_("search"),
      // The same class the browser's box uses, so `/` focuses this one too --
      // one binding, whichever screen you are on.
      attribute.class("search"),
      attribute.placeholder("Search problems\u{2026}"),
      attribute.value(m.queue_search),
      event.on_input(UserSearchedQueue),
    ]),
    chip_row(
      "Language",
      problems.language_options()
        |> list.map(fn(entry) { #(entry.0, entry.1) }),
      m.queue_language,
      UserPickedQueueLanguage,
    ),
    chip_row(
      "Topic",
      problems.topic_names() |> list.map(fn(name) { #(name, name) }),
      m.queue_topic,
      UserPickedQueueTopic,
    ),
    chip_row(
      "Difficulty",
      [#("easy", "Easy"), #("medium", "Medium"), #("hard", "Hard")],
      m.queue_difficulty,
      UserPickedQueueDifficulty,
    ),
    html.div([attribute.class("queue-filter-row")], [
      html.span([attribute.class("queue-filter-label")], [html.text("Status")]),
      html.div(
        [attribute.class("queue-chips")],
        list.map(model.queue_filters(), fn(filter) {
          html.button(
            [
              attribute.classes([
                #("queue-chip", True),
                #("on", m.queue_status == filter),
              ]),
              event.on_click(UserFilteredQueue(filter)),
            ],
            [html.text(model.queue_filter_label(filter))],
          )
        }),
      ),
    ]),
  ])
}

/// A row of toggle chips over one `Option(String)` filter. Pressing the chip
/// already on clears it, so "any language" needs no chip of its own.
fn chip_row(
  label: String,
  entries: List(#(String, String)),
  current: Option(String),
  msg: fn(String) -> Msg,
) -> Element(Msg) {
  html.div([attribute.class("queue-filter-row")], [
    html.span([attribute.class("queue-filter-label")], [html.text(label)]),
    html.div(
      [attribute.class("queue-chips")],
      list.map(entries, fn(entry) {
        let #(value, text) = entry
        html.button(
          [
            attribute.classes([
              #("queue-chip", True),
              #("on", current == Some(value)),
            ]),
            event.on_click(msg(value)),
          ],
          [html.text(text)],
        )
      }),
    ),
  ])
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

fn table(m: Model, rows: List(ProblemRef)) -> Element(Msg) {
  case rows {
    [] ->
      html.div([attribute.class("queue-empty")], [
        html.text("Nothing matches those filters."),
      ])
    _ -> {
      let length = list.length(rows)
      keyed.div(
        [attribute.class("queue-list")],
        list.index_map(rows, fn(ref: ProblemRef, index) {
          #(row_key(ref), row(m, ref, index, length))
        }),
      )
    }
  }
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
      html.span([attribute.class("lang-tag")], [
        html.text(problems.language_tag(ref.category)),
      ]),
      html.span([attribute.class("queue-row-title")], [html.text(ref.title)]),
      format.difficulty_badge(problems.difficulty_of(ref)),
      html.span([attribute.class("queue-row-topic")], [
        html.text(ref.subcategory),
      ]),
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

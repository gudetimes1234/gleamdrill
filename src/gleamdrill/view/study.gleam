//// The study screen: what the scheduler says to do today.
////
//// This is the app's front door now. The three-pane browser is still one
//// click away, but the first question the app answers is "what should I drill
//// right now", which is the whole point of adding a scheduler.

import fsrs
import gleam/dict
import gleam/float
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleamdrill/insights
import gleamdrill/model.{
  type Model, type Msg, Guest, PromptShowing, Registering, StudyRoute,
  UserAddedStarterSet, UserClickedBrowse, UserClickedQueue, UserClickedRecall,
  UserClickedSignIn, UserClickedStartExam, UserClickedStudy, UserClickedTour,
  UserDismissedUpgradePrompt, UserPickedActiveQueue, UserStartedBlitz,
  UserToggledBlitz,
}
import gleamdrill/problem
import gleamdrill/problems
import gleamdrill/queue
import gleamdrill/view/banner
import gleamdrill/view/format
import gleamdrill/view/links
import gleamdrill/view/nav
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/element/svg
import lustre/event
import wire

pub fn view(m: Model) -> Element(Msg) {
  // Counted client-side: the client holds every card, and the budget the
  // server reports is applied here.
  let due = queue.due_count(m)
  let fresh = queue.new_count(m)
  let ready = due + fresh
  // Told apart from "done for today" deliberately: the queue being empty is
  // something only the user can fix, and the fix is one screen away.
  let nothing_queued = dict.size(m.cards) == 0
  // A named queue with nothing in it is the same dead end, one screen away.
  let queue_empty = m.active_queue != None && queue.scope(m) == []

  html.div([attribute.class("study-screen")], [
    banner.storage_warning(m),
    nav.notices(m),
    upgrade_prompt(m),
    guest_strip(m),
    html.header([attribute.class("study-header")], [
      html.h1([attribute.class("study-title")], [html.text("GleamDrill")]),
      nav.bar(m, StudyRoute),
    ]),
    hero(m, ready),
    queue_picker(m),
    html.div([attribute.class("study-counts")], [
      count("Due", due, "due"),
      count("New", fresh, "new"),
      count("Done today", m.today.reviews_done, "done"),
    ]),
    estimate(m),
    html.p([attribute.class("study-summary")], [
      html.text(case ready, m.today.reviews_done {
        // An empty queue is not an empty day: nothing is scheduled because
        // nothing has been queued, and no amount of waiting changes that.
        0, _ if nothing_queued ->
          "Nothing is in your study queue yet. Add problems to start scheduling them."
        0, _ if queue_empty ->
          "This queue is empty. Add problems to it on the queue screen."
        0, 0 ->
          "Nothing due today, and today's new cards are spent. Queue more problems, or come back tomorrow."
        0, _ ->
          "You're done for today. Anything you drill now counts as extra practice."
        1, _ -> "1 card ready."
        _, _ -> int.to_string(ready) <> " cards ready."
      }),
    ]),
    case nothing_queued {
      False -> element.none()
      True ->
        html.div([attribute.class("study-empty-actions")], [
          html.button(
            [
              attribute.class("primary study-start study-starter"),
              event.on_click(UserAddedStarterSet),
            ],
            [html.text("Add a starter set")],
          ),
          html.button(
            [
              attribute.class("study-secondary"),
              event.on_click(UserClickedQueue),
            ],
            [html.text("Choose problems to study")],
          ),
        ])
    },
    html.div([attribute.class("study-actions")], [
      html.button(
        [
          attribute.class("primary study-start"),
          attribute.disabled(False),
          event.on_click(UserClickedStudy),
        ],
        [html.text("Study now")],
      ),
      // The same queue without an editor: read, reveal, grade from memory.
      // Short enough for a phone or a commute, so it earns its own button.
      html.button(
        [
          attribute.class("study-secondary study-recall"),
          event.on_click(UserClickedRecall),
        ],
        [html.text("Recall only")],
      ),
      // The game: random problems against a clock, scored at the end.
      html.button(
        [
          attribute.class("study-secondary study-blitz"),
          event.on_click(UserToggledBlitz),
        ],
        [html.text("\u{26a1} Blitz")],
      ),
      html.button(
        [attribute.class("study-secondary"), event.on_click(UserClickedQueue)],
        [html.text("Manage queue")],
      ),
      html.button(
        [attribute.class("study-secondary"), event.on_click(UserClickedBrowse)],
        [
          html.text("Browse problems"),
        ],
      ),
      html.button(
        [
          attribute.class("study-secondary"),
          event.on_click(UserClickedStartExam),
        ],
        [html.text("System design exam")],
      ),
      html.button(
        [
          attribute.class("study-secondary study-tour"),
          event.on_click(UserClickedTour),
        ],
        [
          html.text(case m.tour_lesson > 0 {
            True -> "Continue the Gleam tour"
            False -> "Gleam tour"
          }),
        ],
      ),
    ]),
    blitz_chooser(m),
    queue_preview(m),
    forecast(m),
    footer(),
  ])
}

/// The next week at a glance, so a heavy day is visible before it arrives.
///
/// Computed here rather than fetched: the client already holds every card's
/// due date, so asking the server for a forecast would be a round trip for
/// arithmetic it can do locally.
fn forecast(m: Model) -> Element(Msg) {
  let counts = list.map(week(), fn(offset) { #(offset, due_on(m, offset)) })
  let busiest = list.fold(counts, 1, fn(peak, entry) { int.max(peak, entry.1) })

  html.section([attribute.class("study-forecast")], [
    html.h2([attribute.class("study-section-title")], [html.text("Next 7 days")]),
    html.div(
      [attribute.class("forecast-bars")],
      list.map(counts, fn(entry) {
        let #(offset, total) = entry
        html.div([attribute.class("forecast-day")], [
          html.div(
            [
              attribute.class("forecast-bar"),
              // Heights are relative to the busiest day rather than absolute,
              // so the shape stays readable whether the peak is 5 or 500.
              attribute.style("height", bar_height(total, busiest)),
            ],
            [],
          ),
          html.span([attribute.class("forecast-count")], [
            html.text(int.to_string(total)),
          ]),
          html.span([attribute.class("forecast-label")], [
            html.text(case offset {
              0 -> "today"
              1 -> "tom"
              _ -> "+" <> int.to_string(offset)
            }),
          ]),
        ])
      }),
    ),
  ])
}

/// The app's outbound links, kept to the last line of the front door: seen by
/// anyone who uses this more than once, in the way of nobody.
fn footer() -> Element(Msg) {
  html.footer([attribute.class("study-footer")], [
    html.span([], [html.text("Free and open source")]),
    separator(),
    links.external("GitHub", links.repo),
    separator(),
    links.external("Sponsor", links.sponsor),
    separator(),
    links.external("Liberapay", links.liberapay),
  ])
}

fn separator() -> Element(Msg) {
  html.span([attribute.class("footer-sep")], [html.text("\u{b7}")])
}

fn week() -> List(Int) {
  [0, 1, 2, 3, 4, 5, 6]
}

/// Cards falling due `offset` days from now. Anything already overdue counts
/// against today, which is where it will actually be studied.
fn due_on(m: Model, offset: Int) -> Int {
  // The active queue's cards, so the week matches the picker above it.
  use total, ref <- list.fold(queue.scope(m), 0)
  case model.card_for(m, ref) {
    None -> total
    Some(state) -> {
      let days = int.max(0, fsrs.interval_seconds(state.card, m.now) / 86_400)
      // A queued card that has never been answered is due immediately by
      // date, but it is not a review -- counting it here would pile the
      // whole New pile onto today's bar and make the week look like a wall.
      case state.reps > 0 && days == offset && !state.suspended {
        True -> total + 1
        False -> total
      }
    }
  }
}

/// Which queue today serves from: everything, or one of the named lists.
/// Absent until a list exists, so a fresh screen is as it always was.
fn queue_picker(m: Model) -> Element(Msg) {
  case m.queues {
    [] -> element.none()
    queues ->
      html.div(
        [
          attribute.class("queue-picker"),
          attribute.attribute(
            "title",
            "Today's cards come from the lit queue. Done today counts every queue.",
          ),
        ],
        [
          queue_pick("Everything", None, m.active_queue),
          ..list.map(queues, fn(queue: wire.Queue) {
            queue_pick(queue.name, Some(queue.name), m.active_queue)
          })
        ],
      )
  }
}

fn queue_pick(
  label: String,
  name: Option(String),
  active: Option(String),
) -> Element(Msg) {
  html.button(
    [
      attribute.classes([#("queue-pick", True), #("current", name == active)]),
      attribute.type_("button"),
      event.on_click(UserPickedActiveQueue(name)),
    ],
    [html.text(label)],
  )
}

/// How long today's queue is likely to take, and the streak it continues.
///
/// A card count is not a workload here: a problem typed from memory is
/// minutes, so "12 cards" is only actionable once it also says "about an
/// How many, how long: the two dials of a Blitz, as buttons so a game is
/// two clicks from the study screen. The chosen pair starts it.
fn blitz_chooser(m: Model) -> Element(Msg) {
  case m.blitz_chooser {
    False -> element.none()
    True ->
      html.div([attribute.class("exit-overlay")], [
        html.div(
          [
            attribute.class("exit-prompt blitz-chooser"),
            attribute.role("dialog"),
            attribute.attribute("aria-modal", "true"),
            attribute.attribute("aria-labelledby", "blitz-title"),
          ],
          [
            html.p(
              [
                attribute.class("exit-prompt-title"),
                attribute.id("blitz-title"),
              ],
              [html.text("\u{26a1} Blitz")],
            ),
            html.p([attribute.class("blitz-blurb")], [
              html.text(
                "Random problems from your queue, each against the clock. Run out of time and the card is a miss; solve it and grade as usual. Practice for the schedule, a score for you.",
              ),
            ]),
            html.div([attribute.class("blitz-grid")], [
              blitz_option("5 problems", "3 min each", 5, 180_000, True),
              blitz_option("10 problems", "3 min each", 10, 180_000, False),
              blitz_option("5 problems", "2 min each", 5, 120_000, False),
              blitz_option("15 problems", "5 min each", 15, 300_000, False),
            ]),
            html.div([attribute.class("exit-prompt-actions")], [
              html.button(
                [
                  attribute.class("btn-secondary blitz-cancel"),
                  event.on_click(UserToggledBlitz),
                ],
                [html.text("Not now")],
              ),
            ]),
          ],
        ),
      ])
  }
}

fn blitz_option(
  count_label: String,
  pace_label: String,
  count: Int,
  per_card_ms: Int,
  default: Bool,
) -> Element(Msg) {
  html.button(
    [
      attribute.class(case default {
        True -> "blitz-option blitz-option-default"
        False -> "blitz-option"
      }),
      event.on_click(UserStartedBlitz(count, per_card_ms)),
    ],
    [
      html.span([attribute.class("blitz-option-count")], [
        html.text(count_label),
      ]),
      html.span([attribute.class("blitz-option-pace")], [
        html.text(pace_label),
      ]),
    ],
  )
}

/// The habit hook: a ring that fills as today's cards get done, and the
/// streak beside it. The goal is what "Study now" would serve today -- what
/// is ready plus what has been done -- so the ring closes exactly when the
/// queue empties, and never asks for more than the daily caps allow.
fn hero(m: Model, ready: Int) -> Element(Msg) {
  let done = m.today.reviews_done
  let goal = int.max(done + ready, 1)
  let complete = ready == 0 && done > 0
  let streak = case m.stats {
    Some(stats) -> stats.streak_days
    None -> 0
  }
  html.div([attribute.class("study-hero")], [
    goal_ring(done, goal, complete),
    streak_tile(streak, done),
  ])
}

/// Circumference of the ring's circle (r = 28), the dash length a full
/// ring needs. Written out rather than computed: Gleam has no pi constant
/// in the stdlib and the radius is fixed by the stylesheet.
const ring_circumference = 176.0

fn goal_ring(done: Int, goal: Int, complete: Bool) -> Element(Msg) {
  let fraction = case done >= goal {
    True -> 1.0
    False -> int.to_float(done) /. int.to_float(goal)
  }
  let dash = float_text(fraction *. ring_circumference)
  html.div(
    [
      attribute.class(case complete {
        True -> "goal-ring ring-complete"
        False -> "goal-ring"
      }),
    ],
    [
      svg.svg(
        [
          attribute.attribute("viewBox", "0 0 72 72"),
          attribute.attribute("width", "72"),
          attribute.attribute("height", "72"),
          attribute.attribute("aria-hidden", "true"),
        ],
        [
          svg.circle([
            attribute.class("goal-ring-track"),
            attribute.attribute("cx", "36"),
            attribute.attribute("cy", "36"),
            attribute.attribute("r", "28"),
          ]),
          svg.circle([
            attribute.class("goal-ring-fill"),
            attribute.attribute("cx", "36"),
            attribute.attribute("cy", "36"),
            attribute.attribute("r", "28"),
            attribute.attribute(
              "stroke-dasharray",
              dash <> " " <> float_text(ring_circumference),
            ),
          ]),
        ],
      ),
      html.div([attribute.class("goal-ring-count")], [
        html.span([attribute.class("goal-ring-done")], [
          html.text(int.to_string(done)),
        ]),
        html.span([attribute.class("goal-ring-goal")], [
          html.text("/" <> int.to_string(goal)),
        ]),
      ]),
      html.span([attribute.class("goal-ring-label")], [
        html.text(case complete {
          True -> "Done for today \u{2713}"
          False -> "Today's goal"
        }),
      ]),
    ],
  )
}

/// The streak, with the one state that matters said out loud: a run that
/// ends tonight unless one card gets done.
fn streak_tile(days: Int, done_today: Int) -> Element(Msg) {
  let at_risk = days > 0 && done_today == 0
  html.div(
    [
      attribute.class(case days, at_risk {
        0, _ -> "streak-tile streak-none"
        _, True -> "streak-tile streak-at-risk"
        _, False -> "streak-tile"
      }),
    ],
    [
      html.span([attribute.class("streak-flame")], [html.text("\u{1f525}")]),
      html.span([attribute.class("streak-days")], [
        html.text(int.to_string(days)),
      ]),
      html.span([attribute.class("streak-label")], [
        html.text(case days, at_risk {
          0, _ -> "Start a streak"
          1, True -> "day \u{b7} keep it alive"
          _, True -> "days \u{b7} keep it alive"
          1, False -> "day streak"
          _, False -> "day streak"
        }),
      ]),
    ],
  )
}

fn float_text(value: Float) -> String {
  // One decimal is plenty for a dash length; more only bloats the DOM.
  let tenths = float.round(value *. 10.0)
  int.to_string(tenths / 10) <> "." <> int.to_string(tenths % 10)
}

/// hour". Both halves need payloads that arrive after boot, so each is omitted
/// until it can be answered rather than shown as a zero.
fn estimate(m: Model) -> Element(Msg) {
  let ready = queue.due_count(m) + queue.new_count(m)
  let minutes = case ready, m.insights {
    0, _ -> None
    _, Some(data) ->
      Some(insights.queue_estimate_ms(
        insights.analyse(data, m.cards, m.now),
        queue.build(m),
      ))
    _, None -> None
  }
  // The streak moved up into the hero row; this is the time alone now.
  case minutes {
    None -> element.none()
    Some(ms) ->
      html.div([attribute.class("study-estimate")], [
        html.span([attribute.class("study-estimate-time")], [
          html.text("about " <> insights.duration_label(ms)),
        ]),
      ])
  }
}

/// What "Study now" is actually about to serve.
///
/// Pressing it used to be a leap of faith. Collapsed by default because the
/// answer is usually "fine" and the list can be long.
fn queue_preview(m: Model) -> Element(Msg) {
  case queue.build(m) {
    [] -> element.none()
    upcoming ->
      html.details([attribute.class("study-preview")], [
        html.summary([attribute.class("study-preview-summary")], [
          html.text(
            "What's in the queue ("
            <> int.to_string(list.length(upcoming))
            <> ")",
          ),
        ]),
        html.ul(
          [attribute.class("study-preview-list")],
          list.map(upcoming, fn(ref: problem.ProblemRef) {
            html.li([attribute.class("study-preview-item")], [
              format.language_tag(ref.category),
              html.span([attribute.class("study-preview-title")], [
                html.text(ref.title),
              ]),
              format.difficulty_badge(problems.difficulty_of(ref)),
              html.span([attribute.class("study-preview-state")], [
                html.text(case model.card_for(m, ref) {
                  Some(_) -> "due"
                  None -> "new"
                }),
              ]),
            ])
          }),
        ),
      ])
  }
}

/// A day with no cards still gets a sliver of bar, so the row reads as seven
/// days rather than as a gap.
fn bar_height(value: Int, peak: Int) -> String {
  case peak {
    0 -> "2%"
    _ -> int.to_string(int.max(2, value * 100 / peak)) <> "%"
  }
}

fn count(label: String, value: Int, kind: String) -> Element(Msg) {
  html.div([attribute.class("study-count study-count-" <> kind)], [
    html.span([attribute.class("study-count-value")], [
      html.text(int.to_string(value)),
    ]),
    html.span([attribute.class("study-count-label")], [html.text(label)]),
  ])
}

/// The standing reminder. Quiet, always present as a guest, and never
/// dismissible -- it is a statement of where the data lives, not an alert.
fn guest_strip(m: Model) -> Element(Msg) {
  case m.mode, m.storage_full, m.upgrade_prompt {
    // The storage warning above already says something strictly worse, and
    // so does the upgrade prompt while it is showing.
    Guest, False, PromptShowing -> element.none()
    Guest, False, _ ->
      html.div([attribute.class("guest-strip")], [
        html.span([attribute.class("guest-strip-text")], [
          html.text("Guest \u{2014} progress lives only in this browser."),
        ]),
        html.button(
          [
            attribute.class("guest-strip-action"),
            event.on_click(UserClickedSignIn(Registering)),
          ],
          [html.text("Save it to an account")],
        ),
      ])
    _, _, _ -> element.none()
  }
}

/// Shown once, when the guest has enough scheduled for the warning to name a
/// real number rather than a hypothetical.
fn upgrade_prompt(m: Model) -> Element(Msg) {
  case m.mode, m.upgrade_prompt {
    Guest, PromptShowing ->
      html.div([attribute.class("upgrade-prompt"), attribute.role("dialog")], [
        html.p([attribute.class("upgrade-prompt-title")], [
          html.text(
            "You have "
            // Answered cards only. A queued card is a click; the ones worth
            // warning about are the ones with review history behind them.
            <> int.to_string(model.answered_count(m))
            <> " cards scheduled.",
          ),
        ]),
        html.p([attribute.class("upgrade-prompt-body")], [
          html.text(
            "They live only in this browser. Clearing site data, or opening "
            <> "GleamDrill anywhere else, and they are gone.",
          ),
        ]),
        html.div([attribute.class("upgrade-prompt-actions")], [
          html.button(
            [
              // Its own class rather than reusing `study-start`: two buttons
              // sharing a class made "the primary action" ambiguous in the
              // DOM, and they are not the same action at all.
              attribute.class("upgrade-prompt-cta"),
              event.on_click(UserClickedSignIn(Registering)),
            ],
            [html.text("Create account")],
          ),
          html.button(
            [
              attribute.class("study-secondary"),
              event.on_click(UserDismissedUpgradePrompt),
            ],
            [html.text("Not now")],
          ),
        ]),
      ])
    _, _ -> element.none()
  }
}

//// The study screen: what the scheduler says to do today.
////
//// This is the app's front door now. The three-pane browser is still one
//// click away, but the first question the app answers is "what should I drill
//// right now", which is the whole point of adding a scheduler.

import algodrill/model.{
  type Model, type Msg, Guest, PromptShowing, Registering, SigningIn,
  UserClickedBrowse, UserClickedMergeGuest, UserClickedSignIn,
  UserClickedSignOut, UserClickedStartExam, UserClickedStats, UserClickedStudy,
  UserDismissedUpgradePrompt,
}
import algodrill/problems
import algodrill/queue
import algodrill/view/banner
import algodrill/view/links
import fsrs
import gleam/dict
import gleam/int
import gleam/list
import gleam/option.{None, Some}
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

pub fn view(m: Model) -> Element(Msg) {
  // Filtered client-side: the server's due_now knows nothing about the
  // device's language filter, and the client holds every card anyway.
  let due = queue.due_count(m)
  let fresh = queue.new_count(m)
  let ready = due + fresh
  let hidden = queue.hidden_count(m)
  let all_filtered = ready == 0 && hidden_everything(m)

  html.div([attribute.class("study-screen")], [
    banner.storage_warning(m),
    merge_offer(m),
    notice(m),
    upgrade_prompt(m),
    guest_strip(m),
    html.header([attribute.class("study-header")], [
      html.h1([attribute.class("study-title")], [html.text("AlgoDrill")]),
      account_controls(m),
    ]),
    html.div([attribute.class("study-counts")], [
      count("Due", due, "due"),
      count("New", fresh, "new"),
      count("Done today", m.today.reviews_done, "done"),
    ]),
    language_chips(m),
    case hidden {
      0 -> element.none()
      _ ->
        html.p([attribute.class("study-hidden-hint")], [
          html.text(
            int.to_string(hidden)
            <> " due card(s) hidden by the language filter \u{2014} they wait without penalty.",
          ),
        ])
    },
    html.p([attribute.class("study-summary")], [
      html.text(case ready, m.today.reviews_done {
        // Filtered-empty is its own state: not "done", just muted away.
        0, _ if all_filtered ->
          "Everything left today is muted \u{2014} unmute a chip to study."
        0, 0 -> "Nothing scheduled today. Pick problems by hand to get started."
        0, _ ->
          "You're done for today. Anything you drill now counts as extra practice."
        1, _ -> "1 card ready."
        _, _ -> int.to_string(ready) <> " cards ready."
      }),
    ]),
    html.div([attribute.class("study-actions")], [
      html.button(
        [
          attribute.class("primary study-start"),
          attribute.disabled(ready == 0),
          event.on_click(UserClickedStudy),
        ],
        [html.text("Study now")],
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
    ]),
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
/// True when the filter alone explains the empty queue: unmuting would serve
/// something today.
fn hidden_everything(m: Model) -> Bool {
  queue.hidden_count(m) > 0
  || { list.length(m.muted_languages) == 5 && m.today.new_remaining > 0 }
}

fn due_on(m: Model, offset: Int) -> Int {
  use total, problem, state <- dict.fold(m.cards, 0)
  let days = int.max(0, fsrs.interval_seconds(state.card, m.now) / 86_400)
  let muted = model.language_muted(m, problems.language_tag(problem.category))
  case days == offset && !state.suspended && !muted {
    True -> total + 1
    False -> total
  }
}

/// One chip per language: pressed = in today's queue, muted = excluded. A
/// mood dial, not schedule state — flipping a chip never touches a card.
fn language_chips(m: Model) -> Element(Msg) {
  let languages = [
    #("py", "Python"),
    #("gl", "Gleam"),
    #("ts", "TypeScript"),
    #("ex", "Elixir"),
    #("sd", "System Design"),
  ]
  html.div(
    [attribute.class("language-chips")],
    list.map(languages, fn(entry) {
      let #(tag, label) = entry
      let muted = model.language_muted(m, tag)
      html.button(
        [
          attribute.classes([
            #("language-chip", True),
            #("muted", muted),
          ]),
          attribute.title(case muted {
            True -> label <> " is excluded from the study queue"
            False -> label <> " is in the study queue"
          }),
          event.on_click(model.UserToggledLanguage(tag)),
        ],
        [html.text(label)],
      )
    }),
  )
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

fn account_controls(m: Model) -> Element(Msg) {
  html.div([attribute.class("study-account")], case m.mode {
    Guest -> [
      html.span([attribute.class("study-email")], [html.text("Guest")]),
      text_button("Stats", UserClickedStats),
      text_button("Sign in", UserClickedSignIn(SigningIn)),
      text_button("Create account", UserClickedSignIn(Registering)),
    ]
    _ -> [
      html.span([attribute.class("study-email")], [
        html.text(case m.user {
          Some(user) -> user.email
          None -> ""
        }),
      ]),
      text_button("Stats", UserClickedStats),
      text_button("Sign out", UserClickedSignOut),
    ]
  })
}

/// The standing reminder. Quiet, always present as a guest, and never
/// dismissible -- it is a statement of where the data lives, not an alert.
fn guest_strip(m: Model) -> Element(Msg) {
  case m.mode, m.storage_full {
    // The storage warning above already says something strictly worse.
    Guest, False ->
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
    _, _ -> element.none()
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
            <> int.to_string(dict.size(m.cards))
            <> " cards scheduled.",
          ),
        ]),
        html.p([attribute.class("upgrade-prompt-body")], [
          html.text(
            "They live only in this browser. Clearing site data, or opening "
            <> "AlgoDrill anywhere else, and they are gone.",
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

/// Offered after signing in to an existing account while this browser still
/// holds guest progress. Merging is not automatic there: folding scratch
/// progress into an established account unasked would be surprising.
fn merge_offer(m: Model) -> Element(Msg) {
  case m.merge_offer {
    False -> element.none()
    True -> merge_banner()
  }
}

fn merge_banner() -> Element(Msg) {
  html.div([attribute.class("notice"), attribute.role("status")], [
    html.span([attribute.class("notice-text")], [
      html.text(
        "This browser has progress saved from before you signed in. "
        <> "Merge it into this account?",
      ),
    ]),
    html.button(
      [
        attribute.class("guest-strip-action"),
        event.on_click(UserClickedMergeGuest),
      ],
      [html.text("Merge it")],
    ),
    html.button(
      [
        attribute.class("notice-dismiss"),
        attribute.attribute("aria-label", "Dismiss"),
        event.on_click(model.UserDismissedNotice),
      ],
      [html.text("\u{00D7}")],
    ),
  ])
}

fn text_button(label: String, msg: Msg) -> Element(Msg) {
  html.button([attribute.class("link-button"), event.on_click(msg)], [
    html.text(label),
  ])
}

/// A dismissible banner for whatever last went wrong with the server.
pub fn notice(m: Model) -> Element(Msg) {
  case m.notice {
    None -> element.none()
    Some(message) ->
      html.div([attribute.class("notice"), attribute.role("status")], [
        html.span([attribute.class("notice-text")], [html.text(message)]),
        html.button(
          [
            attribute.class("notice-dismiss"),
            attribute.attribute("aria-label", "Dismiss"),
            event.on_click(model.UserDismissedNotice),
          ],
          [html.text("\u{00D7}")],
        ),
      ])
  }
}

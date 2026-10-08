//// The step rail: the plan's steps, their three layers, the nudge and
//// the whole-thing reveal.

import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleamdrill/model.{type Model}
import gleamdrill/msg.{
  type Msg, UserRevealedWholeThing, UserToggledNudge, WalkCodeShown, WalkFocused,
  WalkHintShown, WalkWhyShown,
}
import gleamdrill/problem.{type Problem}
import gleamdrill/walk
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

/// The step rail: the plan, on the left, for the whole drill.
///
/// Every step's *title* is listed from the moment the problem opens. That is
/// the whole point of it, and it is why moving the focus reveals nothing --
/// nobody chose to see a list that was already there. Only what sits *under* a
/// step is gated: its hint, its why, and its slice of the code. Nothing the
/// solution pane does can take this away, which is the difference from the
/// pane it replaced.
pub fn plan_rail(m: Model, current: Problem) -> Element(Msg) {
  let steps = walk.walk_steps(current.approach)
  let total = list.length(steps)
  html.aside(
    [attribute.class("plan-rail")],
    list.flatten([
      [
        html.div([attribute.class("rail-header")], [
          html.h3([attribute.class("panel-title")], [html.text("Approach")]),
          ..case total {
            0 -> []
            _ -> [
              html.span([attribute.class("rail-count")], [
                html.text(
                  int.to_string(int.min(m.walk.focus + 1, total))
                  <> "/"
                  <> int.to_string(total),
                ),
              ]),
            ]
          }
        ]),
      ],
      rail_nudge(m, current),
      case steps {
        [] -> [
          html.p([attribute.class("rail-empty")], [
            html.text("No plan written for this one yet."),
          ]),
        ]
        _ -> [
          html.ol(
            [attribute.class("rail-steps")],
            list.index_map(steps, fn(step, index) {
              rail_step(m, current, step, index)
            }),
          ),
        ]
      },
      rail_whole_thing(m, current),
    ]),
  )
}

/// The nudge, folded away until asked for. Not a reveal: it is a question
/// about the problem, not a piece of the answer, so it carries no warning.
fn rail_nudge(m: Model, current: Problem) -> List(Element(Msg)) {
  case walk.nudge_text(current.approach) {
    None -> []
    Some(text) -> [
      html.div([attribute.class("rail-nudge")], [
        html.button(
          [
            attribute.classes([
              #("link-button", True),
              #("rail-nudge-toggle", True),
              #("open", m.nudge_shown),
            ]),
            attribute.type_("button"),
            event.on_click(UserToggledNudge),
          ],
          [
            html.text(case m.nudge_shown {
              True -> "Nudge"
              False -> "Nudge \u{2026}"
            }),
            html.kbd([], [html.text("a")]),
          ],
        ),
        ..case m.nudge_shown {
          False -> []
          True -> [
            html.p([attribute.class("approach-nudge")], [html.text(text)]),
          ]
        }
      ]),
    ]
  }
}

/// One step: its number and its title always, whatever is turned over
/// underneath it, and -- only while it has the focus -- the buttons to turn
/// over the rest.
fn rail_step(
  m: Model,
  current: Problem,
  step: problem.WalkStep,
  index: Int,
) -> Element(Msg) {
  let open = walk.layers_at(m.walk, index)
  let focused = index == m.walk.focus
  // This drill's language, or the shared slice where it has none of its own
  // written yet. A Go drill showing Python is showing the wrong thing.
  let slice = problem.slice_for(step.code, current.language)
  html.li(
    [
      attribute.classes([
        #("rail-step", True),
        #("current", focused),
        #("opened", open != walk.no_layers),
      ]),
    ],
    list.flatten([
      [
        html.button(
          [
            attribute.class("link-button rail-step-title"),
            attribute.type_("button"),
            event.on_click(WalkFocused(index)),
          ],
          [
            html.span([attribute.class("rail-step-number")], [
              html.text(int.to_string(index + 1)),
            ]),
            html.span([attribute.class("rail-step-text")], [
              html.text(step.step),
            ]),
          ],
        ),
      ],
      layer(open.hint, "walk-hint", "Hint", step.hint),
      layer(open.why, "walk-why", "Why", step.why),
      case slice, open.code {
        "", _ | _, False -> []
        code, True -> [
          html.pre([attribute.class("approach-pseudocode walk-code")], [
            html.code([], [html.text(code)]),
          ]),
        ]
      },
      case focused {
        False -> []
        True -> {
          let buttons =
            list.flatten([
              case open.hint {
                True -> []
                False -> [
                  reveal_button("walk-reveal-hint", "Hint", "h", WalkHintShown),
                ]
              },
              case open.why {
                True -> []
                False -> [
                  reveal_button("walk-reveal-why", "Why", "y", WalkWhyShown),
                ]
              },
              case slice, open.code {
                "", _ | _, True -> []
                _, False -> [
                  reveal_button("walk-reveal-code", "Code", "c", WalkCodeShown),
                  html.span([attribute.class("hint-warning")], [
                    html.text("logged as a reveal"),
                  ]),
                ]
              },
            ])
          case buttons {
            [] -> []
            _ -> [html.div([attribute.class("rail-step-layers")], buttons)]
          }
        }
      },
    ]),
  )
}

/// The whole plan at once, at the foot of the rail. This one is the answer,
/// and it says so before it is pressed.
fn rail_whole_thing(m: Model, current: Problem) -> List(Element(Msg)) {
  case walk.whole_thing(current.approach, current.language) {
    None -> []
    Some(code) ->
      case m.whole_thing_shown {
        True -> [
          html.pre([attribute.class("approach-pseudocode rail-whole")], [
            html.code([], [html.text(code)]),
          ]),
        ]
        False -> [
          html.div([attribute.class("rail-foot")], [
            html.button(
              [
                attribute.class("btn-secondary rail-whole-open"),
                attribute.type_("button"),
                event.on_click(UserRevealedWholeThing),
              ],
              [
                html.text("Show the whole thing"),
                html.kbd([], [html.text("w")]),
              ],
            ),
            html.span([attribute.class("hint-warning")], [
              html.text("logged as a reveal"),
            ]),
          ]),
        ]
      }
  }
}

fn layer(
  shown: Bool,
  class: String,
  label: String,
  text: String,
) -> List(Element(Msg)) {
  case shown {
    False -> []
    True -> [
      html.div([attribute.class("walk-layer " <> class)], [
        html.span([attribute.class("walk-layer-label")], [html.text(label)]),
        html.p([], [html.text(text)]),
      ]),
    ]
  }
}

fn reveal_button(
  class: String,
  label: String,
  key: String,
  msg: Msg,
) -> Element(Msg) {
  html.button(
    [
      attribute.class("btn-secondary walk-reveal " <> class),
      attribute.type_("button"),
      event.on_click(msg),
    ],
    [html.text(label), html.kbd([], [html.text(key)])],
  )
}

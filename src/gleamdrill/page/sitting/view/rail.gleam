//// The step rail: the plan's steps, their three layers, the nudge and
//// the whole-thing reveal.

import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleam/string
import gleamdrill/content/problem.{type Pattern, type Problem, Blank, Given}
import gleamdrill/domain/walk
import gleamdrill/page/sitting/model.{type Model}
import gleamdrill/page/sitting/msg.{
  type Msg, LineModeToggled, RailPatternPicked, UserRevealedWholeThing,
  UserToggledNudge, WalkCodeShown, WalkFocused, WalkHintShown, WalkWhyShown,
}
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
pub fn plan_rail(page: Model, current: Problem) -> Element(Msg) {
  case model.rail_pattern(page) {
    Ok(pattern) -> pattern_rail(page, current, pattern)
    // No patterns yet: the ladder this problem always had.
    Error(Nil) -> ladder_rail(page, current)
  }
}

fn ladder_rail(page: Model, current: Problem) -> Element(Msg) {
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
                  int.to_string(int.min(page.walk.focus + 1, total))
                  <> "/"
                  <> int.to_string(total),
                ),
              ]),
            ]
          }
        ]),
      ],
      rail_nudge(page, current),
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
              rail_step(page, current, step, index)
            }),
          ),
        ]
      },
      rail_whole_thing(page, current),
    ]),
  )
}

/// The nudge, folded away until asked for. Not a reveal: it is a question
/// about the problem, not a piece of the answer, so it carries no warning.
fn rail_nudge(page: Model, current: Problem) -> List(Element(Msg)) {
  case walk.nudge_text(current.approach) {
    None -> []
    Some(text) -> [
      html.div([attribute.class("rail-nudge")], [
        html.button(
          [
            attribute.classes([
              #("link-button", True),
              #("rail-nudge-toggle", True),
              #("open", page.nudge_shown),
            ]),
            attribute.type_("button"),
            event.on_click(UserToggledNudge),
          ],
          [
            html.text(case page.nudge_shown {
              True -> "Nudge"
              False -> "Nudge \u{2026}"
            }),
            html.kbd([], [html.text("a")]),
          ],
        ),
        ..case page.nudge_shown {
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
  page: Model,
  current: Problem,
  step: problem.WalkStep,
  index: Int,
) -> Element(Msg) {
  let open = walk.layers_at(page.walk, index)
  let focused = index == page.walk.focus
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
fn rail_whole_thing(page: Model, current: Problem) -> List(Element(Msg)) {
  case walk.whole_thing(current.approach, current.language) {
    None -> []
    Some(code) ->
      case page.whole_thing_shown {
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

// --- the rail of a problem with patterns -------------------------------------

/// The rail for free typing, built on the same lines as Line Drill: a
/// picker for the pattern (guessed once from the editor when the problem
/// opened), that pattern's nudge, and its pseudocode lines under their step
/// titles. Each line's number is listed; its hint and why are free to open
/// and its code -- this language's lines for it -- is a reveal. The whole
/// pseudocode at the foot is a reveal too.
fn pattern_rail(
  page: Model,
  current: Problem,
  pattern: Pattern,
) -> Element(Msg) {
  let total = list.length(pattern.notes)
  html.aside(
    [attribute.class("plan-rail pattern-rail")],
    list.flatten([
      [
        html.div([attribute.class("rail-header")], [
          html.h3([attribute.class("panel-title")], [html.text("Approach")]),
          html.span([attribute.class("rail-count")], [
            html.text(
              int.to_string(int.min(page.walk.focus + 1, total))
              <> "/"
              <> int.to_string(total),
            ),
          ]),
        ]),
      ],
      pattern_picker(current, pattern),
      [
        html.p([attribute.class("rail-complexity")], [
          html.text(pattern.complexity),
        ]),
      ],
      pattern_nudge(page, pattern),
      [
        html.ol(
          [attribute.class("rail-steps pattern-steps")],
          list.index_map(pattern.steps, fn(title, step) {
            html.li([attribute.class("rail-group")], [
              html.div([attribute.class("rail-group-title")], [
                html.span([attribute.class("rail-step-number")], [
                  html.text(int.to_string(step + 1)),
                ]),
                html.span([attribute.class("rail-step-text")], [
                  html.text(title),
                ]),
              ]),
              html.ol(
                [attribute.class("rail-lines")],
                pattern.notes
                  |> list.index_map(fn(note, index) { #(note, index) })
                  |> list.filter(fn(entry) { { entry.0 }.step == step })
                  |> list.map(fn(entry) {
                    rail_line(page, pattern, entry.0, entry.1)
                  }),
              ),
            ])
          }),
        ),
      ],
      pattern_whole_thing(page, pattern),
      [
        html.div([attribute.class("rail-foot")], [
          html.button(
            [
              attribute.class("link-button"),
              attribute.type_("button"),
              event.on_click(LineModeToggled),
            ],
            [
              html.text("Type it line by line"),
              html.kbd([], [html.text("l")]),
            ],
          ),
        ]),
      ],
    ]),
  )
}

fn pattern_picker(current: Problem, pattern: Pattern) -> List(Element(Msg)) {
  case current.patterns {
    [] | [_] -> [
      html.div([attribute.class("rail-patterns")], [
        html.span([attribute.class("rail-pattern active")], [
          html.text(pattern.name),
        ]),
      ]),
    ]
    patterns -> [
      html.div(
        [
          attribute.class("rail-patterns"),
          attribute.role("group"),
          attribute.attribute("aria-label", "Pattern"),
        ],
        list.append(
          list.map(patterns, fn(choice: Pattern) {
            html.button(
              [
                attribute.classes([
                  #("rail-pattern", True),
                  #("active", choice.slug == pattern.slug),
                ]),
                attribute.type_("button"),
                attribute.attribute(
                  "aria-pressed",
                  case choice.slug == pattern.slug {
                    True -> "true"
                    False -> "false"
                  },
                ),
                event.on_click(RailPatternPicked(choice.slug)),
              ],
              [html.text(choice.name)],
            )
          }),
          [html.kbd([attribute.class("rail-pattern-key")], [html.text("o")])],
        ),
      ),
    ]
  }
}

fn pattern_nudge(page: Model, pattern: Pattern) -> List(Element(Msg)) {
  [
    html.div([attribute.class("rail-nudge")], [
      html.button(
        [
          attribute.classes([
            #("link-button", True),
            #("rail-nudge-toggle", True),
            #("open", page.nudge_shown),
          ]),
          attribute.type_("button"),
          event.on_click(UserToggledNudge),
        ],
        [
          html.text(case page.nudge_shown {
            True -> "Nudge"
            False -> "Nudge \u{2026}"
          }),
          html.kbd([], [html.text("a")]),
        ],
      ),
      ..case page.nudge_shown {
        False -> []
        True -> [
          html.p([attribute.class("approach-nudge")], [html.text(pattern.nudge)]),
        ]
      }
    ]),
  ]
}

/// One pseudocode line: its number always; hint, why and code once turned
/// over; the buttons to turn them only while it has the focus.
fn rail_line(
  page: Model,
  pattern: Pattern,
  note: problem.LineNote,
  index: Int,
) -> Element(Msg) {
  let open = walk.layers_at(page.walk, index)
  let focused = index == page.walk.focus
  let code = code_for(pattern, note.id)
  html.li(
    [
      attribute.classes([
        #("rail-step", True),
        #("rail-line", True),
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
            html.span([attribute.class("rail-step-text")], [
              html.text("Line " <> int.to_string(note.id)),
            ]),
          ],
        ),
      ],
      layer(open.hint, "walk-hint", "Hint", note.hint),
      layer(open.why, "walk-why", "Why", note.why),
      case open.code {
        False -> []
        True -> [
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
              case open.code {
                True -> []
                False -> [
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

/// This language's lines for one pseudocode line, at their indentation
/// relative to the least indented of them.
fn code_for(pattern: Pattern, id: Int) -> String {
  let lines =
    list.filter_map(pattern.lines, fn(line) {
      case line {
        Blank(text:, indent:, ids:, ..) ->
          case list.contains(ids, id) {
            True -> Ok(#(indent, text))
            False -> Error(Nil)
          }
        Given(_) -> Error(Nil)
      }
    })
  let base =
    list.fold(lines, 1_000_000, fn(least, line) { int.min(least, line.0) })
  lines
  |> list.map(fn(line) { string.repeat(" ", line.0 - base) <> line.1 })
  |> string.join("\n")
}

fn pattern_whole_thing(page: Model, pattern: Pattern) -> List(Element(Msg)) {
  case page.whole_thing_shown {
    True -> [
      html.pre([attribute.class("approach-pseudocode rail-whole")], [
        html.code([], [html.text(pattern.pseudocode)]),
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
          [html.text("Show the whole thing"), html.kbd([], [html.text("w")])],
        ),
        html.span([attribute.class("hint-warning")], [
          html.text("logged as a reveal"),
        ]),
      ]),
    ]
  }
}

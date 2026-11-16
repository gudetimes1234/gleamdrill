//// Line Drill: the solution as a column of blanks, typed one line at a
//// time, with the line card beside it.
////
//// The code column is plain DOM rather than an editor: given and locked
//// lines are highlighted once into markup by the editor's own tokenizer
//// (`editor.highlight`), and the one blank being typed is an `<input>`.
//// The line card explains the line just locked -- free -- and holds the
//// next line's hint and why folded until asked for, which is help.

import gleam/dynamic/decode
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/set
import gleamdrill/content/problem.{
  type LineNote, type Pattern, type Problem, Blank, Given,
}
import gleamdrill/domain/line_drill.{
  type LineState, type Slot, SlotActive, SlotBlank, SlotGiven, SlotLocked,
}
import gleamdrill/page/sitting/msg.{
  type Msg, LineHintShown, LineInputChanged, LineModeToggled,
  LinePatternConfirmed, LinePatternCycled, LineRevealed, LineSubmitted,
  LineWhyShown,
}
import gleamdrill/platform/editor
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/element/keyed
import lustre/event

/// Misses on one line after which the reveal is offered more strongly. It
/// is always there; this only changes how loudly.
const misses_before_nudge = 3

pub fn view(state: LineState, current: Problem) -> Element(Msg) {
  let language = problem.language_slug(current.language)
  html.div([attribute.class("line-drill")], [
    html.div(
      [
        attribute.class("line-code"),
        attribute.attribute("aria-label", "Line Drill"),
      ],
      code_rows(state, language),
    ),
    html.aside([attribute.class("line-side")], side_panel(state)),
  ])
}

// --- the code column ----------------------------------------------------------

fn code_rows(state: LineState, language: String) -> List(Element(Msg)) {
  let slots = line_drill.skeleton(state)
  let rows =
    list.index_map(slots, fn(slot, index) {
      #(slot_key(state, slot, index), row(state, language, slot, index + 1))
    })
  [keyed.div([attribute.class("line-rows")], rows)]
}

/// The active row's key changes with each miss, so the shake animation
/// replays on every wrong line rather than only the first.
fn slot_key(state: LineState, slot: Slot, index: Int) -> String {
  case slot {
    SlotActive(..) ->
      "active-"
      <> int.to_string(index)
      <> "-"
      <> int.to_string(line_drill.misses_here(state))
    _ -> int.to_string(index)
  }
}

fn row(
  state: LineState,
  language: String,
  slot: Slot,
  number: Int,
) -> Element(Msg) {
  let gutter =
    html.span([attribute.class("line-no")], [html.text(int.to_string(number))])
  case slot {
    SlotGiven(text) ->
      html.div([attribute.class("line-row given")], [
        gutter,
        code(language, text, []),
      ])
    SlotLocked(text:, indent:, revealed:) ->
      html.div(
        [
          attribute.classes([
            #("line-row", True),
            #("locked", True),
            #("revealed", revealed),
          ]),
        ],
        [
          gutter,
          html.span([indented(indent)], []),
          html.span(
            [
              attribute.class("line-box"),
              attribute.title(case revealed {
                True -> "Revealed"
                False -> "Recalled"
              }),
            ],
            [code(language, text, [])],
          ),
        ],
      )
    SlotActive(indent:, width:) -> {
      let missed = line_drill.misses_here(state)
      html.div(
        [
          attribute.classes([
            #("line-row", True),
            #("active", True),
            #("missed", missed > 0),
          ]),
        ],
        [
          gutter,
          html.span([indented(indent)], []),
          html.div([attribute.class("line-active")], [
            html.input([
              attribute.class("line-input"),
              attribute.type_("text"),
              attribute.value(state.input),
              attribute.style("width", int.to_string(width + 2) <> "ch"),
              attribute.attribute("autocomplete", "off"),
              attribute.attribute("autocapitalize", "off"),
              attribute.attribute("autocorrect", "off"),
              attribute.attribute("spellcheck", "false"),
              attribute.attribute(
                "aria-label",
                "Line " <> int.to_string(number),
              ),
              event.on_input(LineInputChanged),
              event.on("keydown", submit_on_enter()),
            ]),
            // On a phone the card rides under the blank being typed, so the
            // problem panel can stay the problem.
            html.div(
              [attribute.class("line-card-inline")],
              next_line_card(state),
            ),
          ]),
        ],
      )
    }
    SlotBlank(indent:, width:) ->
      html.div([attribute.class("line-row blank")], [
        gutter,
        html.span([indented(indent)], []),
        html.span(
          [
            attribute.class("line-box empty"),
            attribute.style("width", int.to_string(width + 2) <> "ch"),
          ],
          [],
        ),
      ])
  }
}

/// Enter or Ctrl+Enter submits what is in the blank; every other key is the
/// input's own.
fn submit_on_enter() -> decode.Decoder(Msg) {
  use key <- decode.field("key", decode.string)
  use value <- decode.subfield(["target", "value"], decode.string)
  case key {
    "Enter" -> decode.success(LineSubmitted(value))
    _ -> decode.failure(LineSubmitted(""), "not Enter")
  }
}

fn indented(indent: Int) -> attribute.Attribute(Msg) {
  attribute.style("padding-left", int.to_string(indent) <> "ch")
}

fn code(
  language: String,
  text: String,
  attributes: List(attribute.Attribute(Msg)),
) -> Element(Msg) {
  // Highlighted by the editor's tokenizer, which escapes every character.
  element.unsafe_raw_html(
    "",
    "code",
    [attribute.class("line-text"), ..attributes],
    editor.highlight(language, text),
  )
}

// --- the side panel -----------------------------------------------------------

fn side_panel(state: LineState) -> List(Element(Msg)) {
  let #(done, total) = line_drill.progress(state)
  list.flatten([
    [progress(done, total)],
    pattern_status(state),
    step_heading(state),
    explanation_card(state),
    case line_drill.complete(state) {
      True -> [
        html.p([attribute.class("line-complete")], [
          html.text(
            "Every line is in. The tests run by themselves; grade when they land.",
          ),
        ]),
      ]
      False -> next_line_card(state)
    },
    [
      html.div([attribute.class("line-foot")], [
        html.button(
          [
            attribute.class("link-button"),
            attribute.type_("button"),
            event.on_click(LineModeToggled),
          ],
          [html.text("Type it freely instead"), html.kbd([], [html.text("l")])],
        ),
      ]),
    ],
  ])
}

fn progress(done: Int, total: Int) -> Element(Msg) {
  let percent = case total {
    0 -> 0
    _ -> done * 100 / total
  }
  html.div([attribute.class("line-progress")], [
    html.div(
      [
        attribute.class("line-progress-bar"),
        attribute.role("progressbar"),
        attribute.attribute("aria-valuenow", int.to_string(done)),
        attribute.attribute("aria-valuemax", int.to_string(total)),
      ],
      [
        html.div(
          [
            attribute.class("line-progress-fill"),
            attribute.style("width", int.to_string(percent) <> "%"),
          ],
          [],
        ),
      ],
    ),
    html.span([attribute.class("line-progress-text")], [
      html.text(
        int.to_string(done)
        <> " of "
        <> int.to_string(total)
        <> " blanks complete",
      ),
    ]),
  ])
}

/// Which pattern the typing is following: locked in, a switch waiting for
/// its confirm, or (with several patterns and nothing decided) the choice.
fn pattern_status(state: LineState) -> List(Element(Msg)) {
  case state.patterns {
    [] | [_] -> []
    _ ->
      case state.picking, line_drill.locked_in(state) {
        Some(slug), _ -> {
          let dropped = line_drill.dropped_by(state, slug)
          [
            html.div([attribute.class("line-pattern picking")], [
              html.text("Switch to " <> name_of(state, slug) <> "?"),
              case dropped {
                0 -> element.none()
                n ->
                  html.span([attribute.class("hint-warning")], [
                    html.text(
                      " drops "
                      <> int.to_string(n)
                      <> " typed line"
                      <> plural(n),
                    ),
                  ])
              },
              html.button(
                [
                  attribute.class("btn-secondary"),
                  attribute.type_("button"),
                  event.on_click(LinePatternConfirmed),
                ],
                [html.text("Switch"), html.kbd([], [html.text("Enter")])],
              ),
            ]),
          ]
        }
        None, Some(pattern) -> [
          html.div([attribute.class("line-pattern locked")], [
            html.text("You're writing: "),
            html.strong([], [html.text(pattern.name)]),
            switch_button(),
          ]),
        ]
        None, None ->
          case line_drill.displayed(state) {
            Ok(pattern) -> [
              html.div([attribute.class("line-pattern")], [
                html.text(
                  int.to_string(list.length(state.alive))
                  <> " patterns fit so far; the blanks follow ",
                ),
                html.strong([], [html.text(pattern.name)]),
                switch_button(),
              ]),
            ]
            Error(Nil) -> []
          }
      }
  }
}

fn switch_button() -> Element(Msg) {
  html.button(
    [
      attribute.class("link-button line-pattern-switch"),
      attribute.type_("button"),
      event.on_click(LinePatternCycled),
    ],
    [html.text("another way"), html.kbd([], [html.text("o")])],
  )
}

fn step_heading(state: LineState) -> List(Element(Msg)) {
  case line_drill.current_step(state) {
    None -> []
    Some(#(index, count, title)) -> [
      html.div([attribute.class("line-step")], [
        html.span([attribute.class("line-step-count")], [
          html.text(
            "Step "
            <> int.to_string(index + 1)
            <> " of "
            <> int.to_string(count),
          ),
        ]),
        html.h3([attribute.class("line-step-title")], [html.text(title)]),
      ]),
    ]
  }
}

/// The line just locked, explained: its hint and why, open, free. This is
/// the reward for getting it right, not help toward it.
fn explanation_card(state: LineState) -> List(Element(Msg)) {
  case line_drill.explanation(state), line_drill.displayed(state) {
    Some(#(index, notes)), Ok(pattern) -> {
      let number = line_number(pattern, index)
      let revealed = set.contains(state.revealed, index)
      [
        html.div([attribute.class("line-card explained")], [
          html.div([attribute.class("line-card-head")], [
            html.span([attribute.class("line-card-mark")], [
              html.text(case revealed {
                True -> "\u{1f441}"
                False -> "\u{2713}"
              }),
            ]),
            html.text(
              "Line "
              <> int.to_string(number)
              <> case revealed {
                True -> " revealed"
                False -> " recalled"
              },
            ),
          ]),
          ..list.map(notes, fn(note: LineNote) {
            html.div([attribute.class("line-note")], [
              html.p([attribute.class("line-note-hint")], [
                html.text(note.hint),
              ]),
              html.div([attribute.class("line-note-why")], [
                html.span([attribute.class("walk-layer-label")], [
                  html.text("Why this works"),
                ]),
                html.p([], [html.text(note.why)]),
              ]),
            ])
          })
        ]),
      ]
    }
    _, _ -> []
  }
}

/// The next line: its hint and why folded until asked for (help), and the
/// reveal (a reveal). With candidates that part ways here, each way's hint
/// is labelled by its pattern.
fn next_line_card(state: LineState) -> List(Element(Msg)) {
  case line_drill.complete(state), line_drill.displayed(state) {
    True, _ | _, Error(Nil) -> []
    False, Ok(pattern) -> {
      let number = case blank_line_number(pattern, line_drill.position(state)) {
        Some(n) -> n
        None -> 0
      }
      let ways = line_drill.current_notes(state)
      let #(hint_open, why_open) = line_drill.shown_here(state)
      let missed = line_drill.misses_here(state)
      [
        html.div([attribute.class("line-card next")], [
          html.div([attribute.class("line-card-head")], [
            html.text("Line " <> int.to_string(number)),
            case ways {
              [_, _, ..] ->
                html.span([attribute.class("line-ways")], [
                  html.text(
                    " \u{b7} "
                    <> int.to_string(list.length(ways))
                    <> " ways from here",
                  ),
                ])
              _ -> element.none()
            },
            case missed {
              0 -> element.none()
              n ->
                html.span([attribute.class("line-misses")], [
                  html.text(
                    " \u{b7} "
                    <> int.to_string(n)
                    <> " miss"
                    <> case n {
                      1 -> ""
                      _ -> "es"
                    },
                  ),
                ])
            },
          ]),
          layer(hint_open, "Hint", "h", LineHintShown, ways, fn(note) {
            note.hint
          }),
          layer(why_open, "Why", "y", LineWhyShown, ways, fn(note) { note.why }),
          html.div([attribute.class("line-reveal")], [
            html.button(
              [
                attribute.classes([
                  #("btn-secondary", True),
                  #("line-reveal-button", True),
                  #("urgent", missed >= misses_before_nudge),
                ]),
                attribute.type_("button"),
                event.on_click(LineRevealed),
              ],
              [html.text("Reveal line"), html.kbd([], [html.text("c")])],
            ),
            html.span([attribute.class("hint-warning")], [
              html.text("logged as a reveal"),
            ]),
          ]),
        ]),
      ]
    }
  }
}

fn layer(
  open: Bool,
  label: String,
  key: String,
  message: Msg,
  ways: List(#(Pattern, List(LineNote))),
  text: fn(LineNote) -> String,
) -> Element(Msg) {
  case open {
    False ->
      html.button(
        [
          attribute.class("btn-secondary walk-reveal line-layer-button"),
          attribute.type_("button"),
          event.on_click(message),
        ],
        [html.text(label), html.kbd([], [html.text(key)])],
      )
    True ->
      html.div(
        [attribute.class("walk-layer line-layer")],
        list.map(ways, fn(way) {
          let #(pattern, notes) = way
          html.div([attribute.class("line-way")], [
            case ways {
              [_, _, ..] ->
                html.span([attribute.class("walk-layer-label")], [
                  html.text(label <> " \u{b7} " <> pattern.name),
                ])
              _ ->
                html.span([attribute.class("walk-layer-label")], [
                  html.text(label),
                ])
            },
            ..list.map(notes, fn(note) { html.p([], [html.text(text(note))]) })
          ])
        }),
      )
  }
}

/// The code column's line number of a pattern's `index`-th blank.
fn blank_line_number(pattern: Pattern, index: Int) -> Option(Int) {
  let #(_, found) =
    list.index_fold(pattern.lines, #(0, None), fn(acc, line, row) {
      let #(seen, found) = acc
      case line, found {
        Blank(..), None if seen == index -> #(seen + 1, Some(row + 1))
        Blank(..), _ -> #(seen + 1, found)
        Given(_), _ -> acc
      }
    })
  found
}

fn line_number(pattern: Pattern, index: Int) -> Int {
  blank_line_number(pattern, index) |> option.unwrap(0)
}

fn name_of(state: LineState, slug: String) -> String {
  case list.find(state.patterns, fn(p) { p.slug == slug }) {
    Ok(pattern) -> pattern.name
    Error(Nil) -> slug
  }
}

fn plural(n: Int) -> String {
  case n {
    1 -> ""
    _ -> "s"
  }
}

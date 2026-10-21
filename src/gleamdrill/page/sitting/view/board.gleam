//// The system-design board screen: palette, shelves, chips, the submit
//// bar and the verdict.

import fsrs
import gleam/int
import gleam/list
import gleam/option.{None}
import gleamdrill/content/problem.{type Problem, type ProblemRef}
import gleamdrill/domain/board
import gleamdrill/page/sitting/model.{type Model}
import gleamdrill/page/sitting/msg.{
  type Msg, UserClickedNext, UserSubmittedBoard, UserToggledPiece,
}
import gleamdrill/page/sitting/view/results
import gleamdrill/shared.{type Shared}
import gleamdrill/view/id
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event

/// The board replaces the editor and the run bar entirely, like the quiz. The
/// whole palette is on screen from the moment it opens -- that is the point:
/// a shortlist would turn recall into recognition -- and every piece stays
/// clickable until Submit, after which all thirty-six are annotated and only
/// Next remains.
pub fn board_main(
  shared: Shared,
  page: Model,
  ref: ProblemRef,
  current: Problem,
  answer: board.Board,
) -> List(Element(Msg)) {
  let question =
    html.section([attribute.class("read-sheet board-question")], [
      html.div([attribute.class("problem-category")], [
        html.text(ref.category <> " \u{203a} " <> ref.subcategory),
      ]),
      results.prompt_block(current),
    ])

  [
    question,
    board_palette(page, answer),
    board_bar(page),
    ..board_verdict(shared, page, answer)
  ]
}

/// The palette, six labelled shelves in family order. One flat cursor index
/// walks it: the columns are responsive, so true two-dimensional movement
/// would be a lie about a layout that reflows.
fn board_palette(page: Model, answer: board.Board) -> Element(Msg) {
  html.div(
    [attribute.class("board-palette")],
    list.map(board.families(), fn(family) { board_shelf(page, answer, family) }),
  )
}

fn board_shelf(
  page: Model,
  answer: board.Board,
  family: board.Family,
) -> Element(Msg) {
  html.section(
    [attribute.class("board-shelf board-shelf-" <> board.family_slug(family))],
    [
      html.h3([attribute.class("board-shelf-label")], [
        html.text(board.family_label(family)),
      ]),
      html.div(
        [attribute.class("board-shelf-pieces")],
        list.map(board.pieces_in(family), fn(piece) {
          board_chip(page, answer, piece)
        }),
      ),
    ],
  )
}

fn board_chip(
  page: Model,
  answer: board.Board,
  piece: board.Piece,
) -> Element(Msg) {
  let index = board.index_of(piece)
  let picked = list.contains(page.board_picks, piece.id)
  let verdict = board.verdict(answer, piece, page.board_picks)
  html.button(
    [
      attribute.id(id.board_chip_id(index)),
      attribute.type_("button"),
      attribute.classes([
        #("board-chip", True),
        #("picked", picked),
        #("cursor", page.board_cursor == index),
        // Only after grading does the styling say anything true about the
        // answer, otherwise the board would give itself away.
        #("hit", page.graded && verdict == board.Hit),
        #("missed", page.graded && verdict == board.Missed),
        #("wrong", page.graded && verdict == board.WrongPick),
        #("neutral", page.graded && verdict == board.NeutralPick),
      ]),
      attribute.disabled(page.graded),
      event.on_click(UserToggledPiece(piece.id)),
    ],
    [
      html.span([attribute.class("board-chip-label")], [html.text(piece.label)]),
      html.span([attribute.class("board-chip-why")], [html.text(piece.why)]),
    ],
  )
}

fn board_bar(page: Model) -> Element(Msg) {
  html.div([attribute.class("run-bar")], case page.graded {
    False -> [
      html.button(
        [
          attribute.class("btn-primary"),
          // Submitting nothing is not an answer; it is a way to mark a card
          // Again without reading it.
          attribute.disabled(page.board_picks == []),
          event.on_click(UserSubmittedBoard),
        ],
        [html.text("Submit board")],
      ),
      html.button(
        [
          attribute.class("btn-secondary skip-button"),
          event.on_click(UserClickedNext),
        ],
        [html.text("Skip")],
      ),
      html.span([attribute.class("board-count")], [
        html.text(case list.length(page.board_picks) {
          1 -> "1 piece on the board"
          n -> int.to_string(n) <> " pieces on the board"
        }),
      ]),
    ]
    True -> [
      html.button(
        [
          attribute.class("btn-primary next-button"),
          event.on_click(UserClickedNext),
        ],
        [html.text("Next")],
      ),
    ]
  })
}

/// After submitting: the score, then what was missed and what was spurious,
/// each with the line that says why. Pieces answered correctly are not listed
/// -- they are already green on the board, and the list is for reading what
/// you got wrong.
fn board_verdict(
  shared: Shared,
  page: Model,
  answer: board.Board,
) -> List(Element(Msg)) {
  case page.graded {
    False -> []
    True -> {
      let graded = board.grade(page.board_picks, answer, 0)
      let headline =
        int.to_string(list.length(graded.hit))
        <> "/"
        <> int.to_string(list.length(answer.required))
        <> case list.length(graded.wrong) {
          0 -> ""
          1 -> " \u{b7} 1 you do not need"
          n -> " \u{b7} " <> int.to_string(n) <> " you do not need"
        }
      [
        results.results_box(
          shared,
          headline,
          graded.rating != fsrs.Again,
          None,
          list.flatten([
            board_list("Missing", "board-missed", graded.missed, fn(piece) {
              board.why(answer, piece)
            }),
            board_list(
              "Not needed here",
              "board-wrong",
              graded.wrong,
              fn(piece) { piece.why },
            ),
            case graded.neutral {
              [] -> []
              picked ->
                board_list(
                  "Defensible, not required",
                  "board-neutral",
                  picked,
                  fn(piece) { board.why(answer, piece) },
                )
            },
          ]),
        ),
      ]
    }
  }
}

fn board_list(
  title: String,
  class: String,
  pieces: List(board.Piece),
  line: fn(board.Piece) -> String,
) -> List(Element(Msg)) {
  case pieces {
    [] -> []
    _ -> [
      html.div([attribute.class("board-verdict-group " <> class)], [
        html.h4([attribute.class("board-verdict-title")], [html.text(title)]),
        html.ul(
          [attribute.class("board-verdict-list")],
          list.map(pieces, fn(piece) {
            html.li([], [
              html.span([attribute.class("board-verdict-piece")], [
                html.text(piece.label),
              ]),
              html.span([attribute.class("board-verdict-why")], [
                html.text(line(piece)),
              ]),
            ])
          }),
        ),
      ]),
    ]
  }
}

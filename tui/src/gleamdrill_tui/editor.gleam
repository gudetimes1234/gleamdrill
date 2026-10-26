//// The editor built into the code pane, for when no `$EDITOR` is installed
//// (a fresh Termux) or `E` asks for it. Lines and a cursor, no more: typing,
//// auto-indent, the arrows, home and end, and pasted text.
////
//// The cursor's column counts graphemes, not cells; the view converts.

import gleam/int
import gleam/list
import gleam/string

pub type Editor {
  Editor(
    lines: List(String),
    row: Int,
    col: Int,
    /// One level of indent: four spaces for Python, two elsewhere.
    indent: String,
  )
}

/// Tabs become `indent`: a cell per character keeps the cursor honest.
pub fn new(text: String, indent: String) -> Editor {
  Editor(
    lines: split(string.replace(text, "\t", indent)),
    row: 0,
    col: 0,
    indent:,
  )
}

pub fn text(e: Editor) -> String {
  string.join(e.lines, "\n")
}

/// etui's key names. Keys it has no use for leave the editor as it was.
pub fn key(e: Editor, raw: String) -> Editor {
  case raw {
    "left" -> left(e)
    "right" -> right(e)
    "up" -> vertical(e, -1)
    "down" -> vertical(e, 1)
    "pageup" -> vertical(e, -10)
    "pagedown" -> vertical(e, 10)
    "home" | "ctrl+a" -> Editor(..e, col: 0)
    "end" | "ctrl+e" -> Editor(..e, col: length(line(e)))
    "enter" -> newline(e)
    "backspace" -> backspace(e)
    "delete" -> delete(e)
    "tab" -> insert(e, e.indent)
    "backtab" -> dedent(e)
    "ctrl+k" -> {
      let #(before, _) = cut(line(e), e.col)
      set_line(e, before)
    }
    " " | "space" -> insert(e, " ")
    _ ->
      case string.length(raw) == 1 {
        True -> insert(e, raw)
        False -> e
      }
  }
}

/// Pasted text goes in as it is: no auto-indent, tabs as the indent.
pub fn paste(e: Editor, pasted: String) -> Editor {
  let pasted = string.replace(pasted, "\t", e.indent)
  case split(pasted) {
    [] -> e
    [one] -> insert(e, one)
    [first, ..rest] -> {
      let #(before, after) = cut(line(e), e.col)
      let assert [last, ..middle] = list.reverse(rest)
      let middle = list.reverse(middle)
      let new = list.flatten([[before <> first], middle, [last <> after]])
      Editor(
        ..e,
        lines: replace(e.lines, e.row, new),
        row: e.row + list.length(new) - 1,
        col: length(last),
      )
    }
  }
}

/// The first row to show in a pane `height` rows tall. The cursor stays in
/// the middle once the code is longer than the pane, as with vim's
/// `scrolloff=999`: the view needs no scroll state of its own that way.
pub fn top(e: Editor, height: Int) -> Int {
  let most = int.max(0, list.length(e.lines) - height)
  int.clamp(e.row - height / 2, 0, most)
}

fn left(e: Editor) -> Editor {
  case e.col, e.row {
    0, 0 -> e
    0, row -> {
      let e = Editor(..e, row: row - 1)
      Editor(..e, col: length(line(e)))
    }
    col, _ -> Editor(..e, col: col - 1)
  }
}

fn right(e: Editor) -> Editor {
  case e.col >= length(line(e)), e.row + 1 < list.length(e.lines) {
    True, True -> Editor(..e, row: e.row + 1, col: 0)
    True, False -> e
    False, _ -> Editor(..e, col: e.col + 1)
  }
}

fn vertical(e: Editor, by: Int) -> Editor {
  let row = int.clamp(e.row + by, 0, list.length(e.lines) - 1)
  let e = Editor(..e, row:)
  Editor(..e, col: int.min(e.col, length(line(e))))
}

/// The line's own indent carries on, one deeper after a line that opens a
/// block (`:` in Python, a bracket, `->`, `do`).
fn newline(e: Editor) -> Editor {
  let #(before, after) = cut(line(e), e.col)
  let indent = leading(before)
  let trimmed = string.trim_end(before)
  let opens =
    list.any([":", "{", "(", "[", "->", " do"], string.ends_with(trimmed, _))
  let indent = case opens {
    True -> indent <> e.indent
    False -> indent
  }
  let after = string.trim_start(after)
  Editor(
    ..e,
    lines: replace(e.lines, e.row, [string.trim_end(before), indent <> after]),
    row: e.row + 1,
    col: length(indent),
  )
}

/// In the indent, a whole level goes at once.
fn backspace(e: Editor) -> Editor {
  let current = line(e)
  case e.col, e.row {
    0, 0 -> e
    0, row -> {
      let above = at(e.lines, row - 1)
      Editor(
        ..e,
        lines: list.flatten([
          list.take(e.lines, row - 1),
          [above <> current],
          list.drop(e.lines, row + 1),
        ]),
        row: row - 1,
        col: length(above),
      )
    }
    col, _ -> {
      let #(before, after) = cut(current, col)
      let width = length(e.indent)
      let drop = case
        string.trim(before) == "" && col % width == 0 && col >= width
      {
        True -> width
        False -> 1
      }
      Editor(
        ..set_line(e, string.drop_end(before, drop) <> after),
        col: col - drop,
      )
    }
  }
}

fn delete(e: Editor) -> Editor {
  let current = line(e)
  case e.col >= length(current), e.row + 1 < list.length(e.lines) {
    True, True -> right(e) |> backspace
    True, False -> e
    False, _ -> {
      let #(before, after) = cut(current, e.col)
      set_line(e, before <> string.drop_start(after, 1))
    }
  }
}

fn dedent(e: Editor) -> Editor {
  let current = line(e)
  let width = int.min(length(e.indent), length(leading(current)))
  Editor(
    ..set_line(e, string.drop_start(current, width)),
    col: int.max(0, e.col - width),
  )
}

fn insert(e: Editor, typed: String) -> Editor {
  let #(before, after) = cut(line(e), e.col)
  Editor(..set_line(e, before <> typed <> after), col: e.col + length(typed))
}

// --- lines ------------------------------------------------------------------

pub fn line(e: Editor) -> String {
  at(e.lines, e.row)
}

fn at(lines: List(String), row: Int) -> String {
  case list.drop(lines, row) {
    [l, ..] -> l
    [] -> ""
  }
}

fn set_line(e: Editor, l: String) -> Editor {
  Editor(..e, lines: replace(e.lines, e.row, [l]))
}

/// Row `row` swapped for `new`, which may be several lines.
fn replace(lines: List(String), row: Int, new: List(String)) -> List(String) {
  list.flatten([list.take(lines, row), new, list.drop(lines, row + 1)])
}

/// The line split at grapheme `col`.
pub fn cut(l: String, col: Int) -> #(String, String) {
  #(string.slice(l, 0, col), string.drop_start(l, col))
}

fn leading(l: String) -> String {
  string.slice(l, 0, length(l) - length(string.trim_start(l)))
}

fn length(s: String) -> Int {
  string.length(s)
}

fn split(text: String) -> List(String) {
  text
  |> string.replace("\r\n", "\n")
  |> string.replace("\r", "\n")
  |> string.split("\n")
}

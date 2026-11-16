//// Line Drill: a solution typed one line at a time into blanks, each line
//// checked as it is submitted, with the hints following whichever pattern
//// the lines so far are writing.
////
//// Pure state and lookups, in the style of `walk`: the sitting model holds a
//// `LineState`, and nothing here looks back at it.
////
//// Every pattern of the problem starts as a candidate. A submitted line is
//// compared against the next blank of each candidate still alive; those it
//// does not match drop out. The blanks on screen are the skeleton of the
//// first alive candidate in the problem's own order, so the canonical
//// pattern leads until the typing says otherwise.

import gleam/dict.{type Dict}
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/order
import gleam/result
import gleam/set.{type Set}
import gleam/string
import gleamdrill/content/problem.{
  type LineNote, type Pattern, type PatternLine, Blank, Given,
}

pub type LineState {
  LineState(
    /// Every pattern of the problem in this language, canonical first.
    patterns: List(Pattern),
    /// The slugs still consistent with every line typed, in `patterns`
    /// order. Never empty while `patterns` is not.
    alive: List(String),
    /// The locked lines, oldest first, as the learner typed them (or as a
    /// reveal filled them in).
    typed: List(String),
    /// Blank indices whose line was revealed rather than typed.
    revealed: Set(Int),
    /// Wrong submissions per blank index.
    misses: Dict(Int, Int),
    /// Blank indices whose hint or why was opened before the line was
    /// locked, as #(hint, why). The explanation shown after a line locks is
    /// never recorded here: it is free.
    shown: Dict(Int, #(Bool, Bool)),
    /// The blank most recently locked, whose explanation the line card shows.
    last: Option(Int),
    /// What is in the active blank's input, not yet submitted.
    input: String,
    /// A pattern proposed by `p`, waiting for a confirm. `None` otherwise.
    picking: Option(String),
  )
}

/// What a submitted line did.
pub type Outcome {
  /// It matched, and every candidate still alive agreed.
  Locked
  /// It matched, and some candidates dropped out on it.
  Narrowed
  /// It matched no candidate's next line. Nothing locked.
  Miss
}

/// One row of the code column.
pub type Slot {
  /// A line shown as it is: never typed.
  SlotGiven(text: String)
  /// A blank already filled in. `text` is the pattern's own line, which the
  /// typing matched once normalized.
  SlotLocked(text: String, indent: Int, revealed: Bool)
  /// The blank being typed now.
  SlotActive(indent: Int, width: Int)
  /// A blank still to come.
  SlotBlank(indent: Int, width: Int)
}

/// Whitespace collapsed to single spaces, trimmed, and a trailing `;` or `,`
/// ignored. Otherwise the text must match exactly.
pub fn normalize(line: String) -> String {
  let collapsed =
    line
    |> string.replace("\t", " ")
    |> string.split(" ")
    |> list.filter(fn(part) { part != "" })
    |> string.join(" ")
  case string.ends_with(collapsed, ";") || string.ends_with(collapsed, ",") {
    True -> collapsed |> string.drop_end(1) |> string.trim_end
    False -> collapsed
  }
}

/// A Line Drill over these patterns, nothing typed.
pub fn start(patterns: List(Pattern)) -> LineState {
  LineState(
    patterns:,
    alive: list.map(patterns, fn(pattern) { pattern.slug }),
    typed: [],
    revealed: set.new(),
    misses: dict.new(),
    shown: dict.new(),
    last: None,
    input: "",
    picking: None,
  )
}

/// The pattern whose skeleton is on screen: the first one still alive.
pub fn displayed(state: LineState) -> Result(Pattern, Nil) {
  list.find(state.patterns, fn(pattern) {
    list.contains(state.alive, pattern.slug)
  })
}

/// Whether the pattern has locked: one candidate left, out of several.
pub fn locked_in(state: LineState) -> Option(Pattern) {
  case state.alive, list.length(state.patterns) > 1 {
    [only], True ->
      list.find(state.patterns, fn(p) { p.slug == only }) |> option.from_result
    _, _ -> None
  }
}

/// The blank lines of a pattern, in order.
fn blank_lines(pattern: Pattern) -> List(#(String, Int, Int, List(Int))) {
  list.filter_map(pattern.lines, fn(line) {
    case line {
      Blank(text:, indent:, step:, ids:) -> Ok(#(text, indent, step, ids))
      Given(_) -> Error(Nil)
    }
  })
}

fn blank_at(
  pattern: Pattern,
  index: Int,
) -> Result(#(String, Int, Int, List(Int)), Nil) {
  blank_lines(pattern) |> list.drop(index) |> list.first
}

/// The index of the blank being typed: how many are locked.
pub fn position(state: LineState) -> Int {
  list.length(state.typed)
}

fn alive_patterns(state: LineState) -> List(Pattern) {
  list.filter(state.patterns, fn(pattern) {
    list.contains(state.alive, pattern.slug)
  })
}

/// Submit the active blank's text.
pub fn submit(state: LineState, text: String) -> #(LineState, Outcome) {
  let wanted = normalize(text)
  let index = position(state)
  let matching =
    list.filter(alive_patterns(state), fn(pattern) {
      case blank_at(pattern, index) {
        Ok(#(expected, _, _, _)) -> normalize(expected) == wanted
        Error(Nil) -> False
      }
    })
  case wanted, matching {
    "", _ -> #(state, Miss)
    _, [] -> #(
      LineState(
        ..state,
        misses: dict.upsert(state.misses, index, fn(count) {
          option.unwrap(count, 0) + 1
        }),
      ),
      Miss,
    )
    _, _ -> {
      let outcome = case list.length(matching) == list.length(state.alive) {
        True -> Locked
        False -> Narrowed
      }
      #(lock(state, text, matching, index), outcome)
    }
  }
}

fn lock(
  state: LineState,
  text: String,
  matching: List(Pattern),
  index: Int,
) -> LineState {
  LineState(
    ..state,
    alive: list.map(matching, fn(pattern) { pattern.slug }),
    typed: list.append(state.typed, [text]),
    last: Some(index),
    input: "",
    picking: None,
  )
}

/// Fill the active blank with the displayed pattern's line. Logged as a
/// reveal. Candidates that would not have written that line drop out.
pub fn reveal_line(state: LineState) -> LineState {
  let index = position(state)
  case displayed(state) |> result.try(blank_at(_, index)) {
    Error(Nil) -> state
    Ok(#(expected, _, _, _)) -> {
      let matching =
        list.filter(alive_patterns(state), fn(pattern) {
          case blank_at(pattern, index) {
            Ok(#(other, _, _, _)) -> normalize(other) == normalize(expected)
            Error(Nil) -> False
          }
        })
      LineState(
        ..lock(state, expected, matching, index),
        revealed: set.insert(state.revealed, index),
      )
    }
  }
}

/// Commit to one pattern by hand. Typed lines that do not fit it are thrown
/// away, from the first that does not on; what fits is kept.
pub fn choose_pattern(state: LineState, slug: String) -> LineState {
  case list.find(state.patterns, fn(pattern) { pattern.slug == slug }) {
    Error(Nil) -> state
    Ok(pattern) -> {
      let kept = fitting(pattern, state.typed)
      let keep = fn(index: Int) { index < kept }
      LineState(
        ..state,
        alive: [slug],
        typed: list.take(state.typed, kept),
        revealed: set.filter(state.revealed, keep),
        misses: dict.filter(state.misses, fn(index, _) { index <= kept }),
        shown: dict.filter(state.shown, fn(index, _) { index <= kept }),
        last: case state.last {
          Some(index) if index < kept -> Some(index)
          _ -> None
        },
        picking: None,
      )
    }
  }
}

/// How many of the typed lines, from the first, `pattern` would also have.
fn fitting(pattern: Pattern, typed: List(String)) -> Int {
  let expected = blank_lines(pattern)
  list.zip(typed, expected)
  |> list.take_while(fn(pair) { normalize(pair.0) == normalize(pair.1.0) })
  |> list.length
}

/// How many typed lines choosing `slug` would throw away.
pub fn dropped_by(state: LineState, slug: String) -> Int {
  case list.find(state.patterns, fn(pattern) { pattern.slug == slug }) {
    Ok(pattern) -> position(state) - fitting(pattern, state.typed)
    Error(Nil) -> 0
  }
}

/// `p`: propose the next pattern after the one proposed (or shown), in the
/// problem's order, wrapping. Nothing changes until `confirm_pick`.
pub fn cycle_pick(state: LineState) -> LineState {
  let slugs = list.map(state.patterns, fn(pattern) { pattern.slug })
  let from = case state.picking, displayed(state) {
    Some(slug), _ -> slug
    None, Ok(pattern) -> pattern.slug
    None, Error(Nil) -> ""
  }
  let next = case list.drop_while(slugs, fn(slug) { slug != from }) {
    [_, next, ..] -> Some(next)
    _ -> list.first(slugs) |> option.from_result
  }
  LineState(..state, picking: next)
}

pub fn confirm_pick(state: LineState) -> LineState {
  case state.picking {
    Some(slug) -> choose_pattern(state, slug)
    None -> state
  }
}

pub fn cancel_pick(state: LineState) -> LineState {
  LineState(..state, picking: None)
}

fn width_bucket(text: String) -> Int {
  let length = string.length(text)
  { { length + 3 } / 4 } * 4
}

/// The code column for the displayed pattern: given lines, locked lines,
/// the active blank and the blanks still to come. A blank is as wide as its
/// line rounded up to four characters, so the shape shows without the exact
/// length.
pub fn skeleton(state: LineState) -> List(Slot) {
  case displayed(state) {
    Error(Nil) -> []
    Ok(pattern) -> {
      let done = position(state)
      let #(_, slots) =
        list.map_fold(pattern.lines, 0, fn(index, line: PatternLine) {
          case line {
            Given(text) -> #(index, SlotGiven(text))
            Blank(text:, indent:, ..) -> {
              let slot = case int.compare(index, done) {
                order.Lt ->
                  SlotLocked(
                    text:,
                    indent:,
                    revealed: set.contains(state.revealed, index),
                  )
                order.Eq -> SlotActive(indent:, width: width_bucket(text))
                order.Gt -> SlotBlank(indent:, width: width_bucket(text))
              }
              #(index + 1, slot)
            }
          }
        })
      slots
    }
  }
}

/// The active blank's notes, one entry per distinct way forward: a pattern
/// and the pseudocode lines its next blank implements. More than one entry
/// is "N ways from here"; candidates whose next lines are the same line are
/// one way, shown under the first of them.
pub fn current_notes(state: LineState) -> List(#(Pattern, List(LineNote))) {
  let index = position(state)
  let #(ways, _) =
    list.fold(alive_patterns(state), #([], []), fn(acc, pattern) {
      let #(ways, seen) = acc
      case blank_at(pattern, index) {
        Error(Nil) -> acc
        Ok(#(text, _, _, ids)) -> {
          let key = normalize(text)
          case list.contains(seen, key) {
            True -> acc
            False -> #([#(pattern, problem.notes_for(pattern, ids)), ..ways], [
              key,
              ..seen
            ])
          }
        }
      }
    })
  list.reverse(ways)
}

/// The line just locked, with its notes: what the line card explains once a
/// line is right. Free, unlike opening the hint for the line to come.
pub fn explanation(state: LineState) -> Option(#(Int, List(LineNote))) {
  case state.last, displayed(state) {
    Some(index), Ok(pattern) ->
      case blank_at(pattern, index) {
        Ok(#(_, _, _, ids)) -> Some(#(index, problem.notes_for(pattern, ids)))
        Error(Nil) -> None
      }
    _, _ -> None
  }
}

/// The step the active blank sits under, as #(index, count, title). The
/// last step once every blank is locked.
pub fn current_step(state: LineState) -> Option(#(Int, Int, String)) {
  case displayed(state) {
    Error(Nil) -> None
    Ok(pattern) -> {
      let blanks = blank_lines(pattern)
      let index = int.min(position(state), list.length(blanks) - 1)
      case blanks |> list.drop(index) |> list.first {
        Error(Nil) -> None
        Ok(#(_, _, step, _)) ->
          pattern.steps
          |> list.drop(step)
          |> list.first
          |> result.map(fn(title) { #(step, list.length(pattern.steps), title) })
          |> option.from_result
      }
    }
  }
}

/// The code so far: given lines and locked lines, in order, at their
/// indentation. Complete, it is the displayed pattern's whole solution.
pub fn assembled(state: LineState) -> String {
  case displayed(state) {
    Error(Nil) -> ""
    Ok(pattern) -> {
      let done = position(state)
      let #(_, lines) =
        list.map_fold(pattern.lines, 0, fn(index, line: PatternLine) {
          case line {
            Given(text) -> #(index, Ok(text))
            Blank(text:, indent:, ..) ->
              case index < done {
                True -> #(index + 1, Ok(string.repeat(" ", indent) <> text))
                False -> #(index + 1, Error(Nil))
              }
          }
        })
      lines |> result.values |> string.join("\n")
    }
  }
}

/// #(locked, total) for the displayed pattern.
pub fn progress(state: LineState) -> #(Int, Int) {
  case displayed(state) {
    Ok(pattern) -> #(position(state), list.length(blank_lines(pattern)))
    Error(Nil) -> #(0, 0)
  }
}

/// Every blank of the displayed pattern is locked.
pub fn complete(state: LineState) -> Bool {
  let #(done, total) = progress(state)
  total > 0 && done >= total
}

/// Misses on the active blank.
pub fn misses_here(state: LineState) -> Int {
  dict.get(state.misses, position(state)) |> result.unwrap(0)
}

/// Open the active blank's hint (`hint: True`) or why. Counts as help.
pub fn show_note(state: LineState, hint hint: Bool) -> LineState {
  let index = position(state)
  let #(had_hint, had_why) =
    dict.get(state.shown, index) |> result.unwrap(#(False, False))
  let open = case hint {
    True -> #(True, had_why)
    False -> #(had_hint, True)
  }
  LineState(..state, shown: dict.insert(state.shown, index, open))
}

/// What is open on the active blank, as #(hint, why).
pub fn shown_here(state: LineState) -> #(Bool, Bool) {
  dict.get(state.shown, position(state)) |> result.unwrap(#(False, False))
}

pub fn set_input(state: LineState, text: String) -> LineState {
  LineState(..state, input: text)
}

/// A hint or a why was opened for some line before it was typed.
pub fn help_used(state: LineState) -> Bool {
  dict.size(state.shown) > 0
}

/// Some line was revealed rather than typed.
pub fn any_revealed(state: LineState) -> Bool {
  set.size(state.revealed) > 0
}

/// The pattern free-typed code is most like: the one with the largest share
/// of its blank lines present in the text, ties going to the earlier
/// (canonical) pattern. `None` when nothing typed matches any line.
pub fn detect(patterns: List(Pattern), editor_text: String) -> Option(String) {
  let typed =
    editor_text
    |> string.split("\n")
    |> list.map(normalize)
    |> list.filter(fn(line) { line != "" })
    |> set.from_list
  let scored =
    list.map(patterns, fn(pattern) {
      let lines = blank_lines(pattern)
      let hits =
        list.count(lines, fn(line) { set.contains(typed, normalize(line.0)) })
      #(pattern.slug, hits, list.length(lines))
    })
  list.fold(scored, None, fn(best, entry) {
    let #(slug, hits, total) = entry
    case hits > 0, best {
      False, _ -> best
      True, None -> Some(#(slug, hits, total))
      // a/b > c/d without floats: a*d > c*b.
      True, Some(#(_, best_hits, best_total)) ->
        case hits * best_total > best_hits * total {
          True -> Some(#(slug, hits, total))
          False -> best
        }
    }
  })
  |> option.map(fn(best) { best.0 })
}
